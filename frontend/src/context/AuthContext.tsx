"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import {
  login as apiLogin,
  logout as apiLogout,
  getMe,
  PlayerData,
  CoachData,
  RefereeData,
  AcademyData,
  UserData,
} from "@/lib/api";

export type MePayload = PlayerData | CoachData | RefereeData | AcademyData;

const SESSION_KEY = "upha_auth_user";

interface AuthContextValue {
  authUser: UserData | null;
  meData: MePayload | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function roleToPath(role: string): string {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "coach":
      return "/dashboard/coach";
    case "academy":
      return "/dashboard/academy";
    case "player":
    default:
      return "/dashboard/player";
  }
}

/** Read cached user from sessionStorage (avoids loading flicker on page load) */
function readCachedUser(): UserData | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UserData) : null;
  } catch {
    return null;
  }
}

/** Persist user to sessionStorage so next page-load is instant */
function writeCachedUser(user: UserData | null): void {
  try {
    if (user) {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // sessionStorage unavailable (private mode, etc.) — ignore
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  // Initialise from cache so the UI renders instantly on every page load
  const [authUser, setAuthUser] = useState<UserData | null>(readCachedUser);
  const [meData, setMeData] = useState<MePayload | null>(null);
  // If we already have a cached user, start as NOT loading so pages render immediately
  const [loading, setLoading] = useState<boolean>(() => readCachedUser() === null);

  // Silently validate / rehydrate the session in the background on mount
  useEffect(() => {
    getMe()
      .then((res) => {
        const payload = res.user as MePayload;
        setMeData(payload);
        const user =
          "user" in payload
            ? (payload as { user: UserData }).user
            : (payload as unknown as UserData);
        setAuthUser(user);
        writeCachedUser(user);
      })
      .catch(() => {
        // Session expired or not authenticated — clear cached state
        setAuthUser(null);
        setMeData(null);
        writeCachedUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      // ── FIX: Single request only ───────────────────────────────────────────
      // apiLogin() already returns { user: { id, email, name, role } }.
      // We do NOT call getMe() here — that was an unnecessary second round-trip
      // that doubled the perceived latency on every sign-in.
      const res = await apiLogin(email, password);
      const user = res.user;

      setAuthUser(user);
      writeCachedUser(user);

      // Navigate immediately — dashboard will lazily load full profile
      router.push(roleToPath(user.role));

      // Fetch full profile in the background (non-blocking)
      getMe()
        .then((me) => {
          const payload = me.user as MePayload;
          setMeData(payload);
          const fullUser =
            "user" in payload
              ? (payload as { user: UserData }).user
              : (payload as unknown as UserData);
          setAuthUser(fullUser);
          writeCachedUser(fullUser);
        })
        .catch(() => {
          // Fine — user is already set from login response
        });
    },
    [router]
  );

  const logout = useCallback(async () => {
    await apiLogout();
    setAuthUser(null);
    setMeData(null);
    writeCachedUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ authUser, meData, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
