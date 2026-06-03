"use client";

import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { authUser, logout, loading } = useAuth();

  const dashboardPath =
    authUser?.role === "admin"
      ? "/dashboard/admin"
      : authUser?.role === "coach"
      ? "/dashboard/coach"
      : authUser?.role === "referee"
      ? "/dashboard/player"
      : "/dashboard/player";

  return (
    <header className="w-full">
      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <Image src="/upha.png" alt="UPHA Logo" width={48} height={48} className="object-contain" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold tracking-wide leading-none text-primary">UPHA</h1>
              <div className="text-[8px] tracking-widest text-gray-500 uppercase mt-1">UTTAR PRADESH HANDBALL ASSN.</div>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-primary">
            <Link href="/" className="text-accent border-b-2 border-accent pb-1">Home</Link>
            <Link href="/#about" className="hover:text-accent transition-colors">About</Link>
            <Link href="/#events" className="hover:text-accent transition-colors">Events</Link>
            <Link href="/#database" className="hover:text-accent transition-colors">Database</Link>
            <Link href="/#achievements" className="hover:text-accent transition-colors">Achievements</Link>
            <Link href="/#gallery" className="hover:text-accent transition-colors">Gallery</Link>
            <Link href="/#contact" className="hover:text-accent transition-colors">Contact</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            {authUser && (
              <Link href={dashboardPath} className="border border-gray-200 text-gray-700 px-4 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-sm flex items-center gap-1.5">
                <LayoutDashboard className="w-3.5 h-3.5" />
                MY DASHBOARD
              </Link>
            )}
            <Link href="/register" className="bg-accent text-white px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors rounded-sm">
              REGISTER NOW &rarr;
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
