"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo + Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 mb-5">
            <Image src="/upha.png" alt="UPHA Logo" width={96} height={96} className="object-contain w-full h-full" />
          </div>
          <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">
            Member Portal
          </div>
          <h1 className="font-heading text-4xl font-bold uppercase text-primary tracking-wide">
            SIGN IN
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Uttar Pradesh Handball Association
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8">

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full border border-gray-200 bg-gray-50 px-4 py-3 rounded-sm text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#111827] hover:bg-[#1f2937] disabled:opacity-50 text-white py-4 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-colors shadow-sm mt-2"
            >
              {loading ? "SIGNING IN…" : "SIGN IN"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <a href="/register/player" className="text-accent font-bold hover:underline">
                Register here
              </a>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-6 tracking-widest uppercase">
          &copy; 2026 UPHA &middot; All rights reserved
        </p>
      </div>
    </main>
  );
}
