"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { changePassword } from "@/lib/api";
import { Key, ArrowRight, ShieldCheck } from "lucide-react";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { authUser } = useAuth();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // If not logged in, they shouldn't be here, but let's handle it gracefully
  if (!authUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9] px-6">
        <div className="text-center text-sm text-gray-500">Please log in to change your password.</div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        // Redirect back to dashboard after a short delay
        setTimeout(() => {
          const dashboardPath =
            authUser.role === "admin"
              ? "/dashboard/admin"
              : authUser.role === "coach"
              ? "/dashboard/coach"
              : "/dashboard/player";
          router.push(dashboardPath);
        }, 2000);
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] flex flex-col items-center pt-24 px-6 pb-24">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#111827] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Key className="w-8 h-8" />
          </div>
          <h1 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#111827] mb-2">
            CHANGE <span className="text-accent">PASSWORD</span>
          </h1>
          <p className="text-sm text-gray-500">
            Secure your account by updating your password below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 shadow-sm p-8 rounded-sm">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#111827] mb-2">Password Updated!</h3>
              <p className="text-sm text-gray-500 mb-6">
                Your password has been changed successfully.
              </p>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest animate-pulse">
                Redirecting to dashboard...
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-sm text-xs font-bold uppercase tracking-wide border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Create a new password"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors bg-gray-50 focus:bg-white"
                  placeholder="Retype new password"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#111827] hover:bg-black text-white px-6 py-4 text-xs font-bold tracking-widest uppercase transition-all flex justify-center items-center gap-2 group disabled:opacity-50"
                >
                  {loading ? "UPDATING..." : "UPDATE PASSWORD"}
                  {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
