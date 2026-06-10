"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, ChevronDown, LogOut, User, Phone, Mail, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const { authUser, logout, loading } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dashboardPath =
    authUser?.role === "admin"
      ? "/dashboard/admin"
      : authUser?.role === "coach"
      ? "/dashboard/coach"
      : authUser?.role === "referee"
      ? "/dashboard/player"
      : "/dashboard/player";

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="hidden sm:block bg-[#111827] text-gray-300 py-2.5 border-b border-gray-800 text-[10px] md:text-xs font-medium">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-gray-400" />
              <span className="tracking-wide">+91 75700 99990</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span className="tracking-wide">upha2024@gmail.com</span>
            </div>
          </div>
          
          {/* Right: Links */}
          <div className="flex items-center gap-4">
            <Link href="/database" className="hover:text-white transition-colors tracking-wide">Affiliated Districts</Link>
            <span className="text-gray-600 text-[10px]">■</span>
            <Link href="/#press" className="hover:text-white transition-colors tracking-wide">Press Releases</Link>
            <span className="text-gray-600 text-[10px]">■</span>
            {loading ? (
              <div className="w-24 h-4 bg-gray-700 animate-pulse rounded-sm"></div>
            ) : authUser ? (
              <span className="text-gray-300 tracking-wide font-bold">
                Welcome, {authUser.name?.split(' ')[0] || "User"}
              </span>
            ) : (
              <Link href="/login" className="hover:text-white transition-colors tracking-wide font-bold">Login / Register</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shrink-0">
              <Image src="/upha.png" alt="UPHA Logo" width={72} height={72} className="object-contain" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-wide leading-none text-primary">UPHA</h1>
              <div className="text-[9px] tracking-widest text-gray-500 uppercase mt-1">UTTAR PRADESH HANDBALL ASSN.</div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-primary">
            <Link href="/" className="text-accent border-b-2 border-accent pb-1">Home</Link>
            <Link href="/about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/#events" className="hover:text-accent transition-colors">Events</Link>
            <Link href="/database" className="hover:text-accent transition-colors">Database</Link>
            <Link href="/achievements" className="hover:text-accent transition-colors">Achievements</Link>
            <Link href="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
            <Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>

          {/* CTA / User actions */}
          <div className="hidden sm:flex items-center gap-3">
            {loading ? (
              <div className="w-[140px] h-[36px] bg-gray-200 animate-pulse rounded-sm"></div>
            ) : authUser ? (
              /* ── Logged-in: Dashboard dropdown ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-sm"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  MY DASHBOARD
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown panel */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-sm shadow-lg py-1 z-50">
                    {/* User info pill */}
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Signed in as</p>
                      <p className="text-xs font-semibold text-primary truncate mt-0.5">{authUser.name || authUser.email}</p>
                      <p className="text-[10px] text-gray-400 capitalize">{authUser.role}</p>
                    </div>

                    {/* Dashboard link */}
                    <Link
                      href={dashboardPath}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Dashboard
                    </Link>

                    {/* Change Password link */}
                    <Link
                      href="/change-password"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-accent transition-colors"
                    >
                      <Key className="w-3.5 h-3.5" />
                      Change Password
                    </Link>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1" />

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged-out: Register Now button ── */
              <Link
                href="/register"
                className="bg-accent text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors rounded-sm"
              >
                REGISTER NOW &rarr;
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

