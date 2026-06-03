"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { CoachData } from "@/lib/api";

export default function CoachDashboardHeader() {
  const { authUser, meData, loading } = useAuth();
  const coach = meData as CoachData | null;

  const firstName = authUser?.name?.split(" ")[0]?.toUpperCase() ?? "—";
  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" }).toUpperCase();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
  const createdAt = authUser?.created_at
    ? new Date(authUser.created_at).toLocaleDateString("en-IN", { month: "short", year: "numeric" }).toUpperCase()
    : "—";

  if (loading) {
    return <div className="mb-8 animate-pulse"><div className="h-64 bg-gray-100 rounded-sm" /></div>;
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">COACH DASHBOARD</div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide text-primary">
            WELCOME BACK, <span className="text-accent">{firstName}</span>
          </h1>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-4 md:mt-0 md:text-right">
          {dayName}<br /><span className="text-gray-800">{dateStr}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">MEMBERSHIP STATUS</div>
          <div className={`font-heading text-2xl font-bold uppercase mb-1 ${coach?.paid ? "text-emerald-600" : "text-orange-500"}`}>
            &bull; {coach?.paid ? "ACTIVE" : "PENDING"}
          </div>
          <div className="text-[11px] text-gray-500">{coach?.paid ? "Fee paid" : "Payment pending"}</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">COACH ID</div>
          <div className="font-heading text-xl font-bold uppercase text-primary mb-1">
            CCH-{String(coach?.id ?? 0).padStart(5, "0")}
          </div>
          <div className="text-[11px] text-gray-500">{coach?.district ?? "—"} District</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">MEMBER SINCE</div>
          <div className="font-heading text-2xl font-bold uppercase text-primary mb-1">{createdAt}</div>
          <div className="text-[11px] text-gray-500">Registration date</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">COACHING GRADE</div>
          <div className="font-heading text-2xl font-bold uppercase text-primary mb-1">{coach?.highest_coaching_grade || "—"}</div>
          <div className="text-[11px] text-gray-500 capitalize">{coach?.occupation?.replace("_", " ") ?? "—"}</div>
        </div>
      </div>
    </div>
  );
}
