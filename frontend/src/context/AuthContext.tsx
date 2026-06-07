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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authUser, setAuthUser] = useState<UserData | null>(null);
  const [meData, setMeData] = useState<MePayload | null>(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on mount
  useEffect(() => {
    getMe()
      .then((res) => {
        const payload = res.user as MePayload;
        setMeData(payload);
        // Extract user from the nested object
        const user =
          "user" in payload ? payload.user : null;
        setAuthUser(user);
      })
      .catch(() => {
        setAuthUser(null);
        setMeData(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await apiLogin(email, password);
      setAuthUser(res.user);
      // Fetch full profile
      try {
        const me = await getMe();
        setMeData(me.user as MePayload);
      } catch {
        // ok
      }
      router.push(roleToPath(res.user.role));
    },
    [router]
  );

  const logout = useCallback(async () => {
    await apiLogout();
    setAuthUser(null);
    setMeData(null);
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
