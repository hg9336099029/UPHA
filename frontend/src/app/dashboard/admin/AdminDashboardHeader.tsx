"use client";

import React, { useEffect, useState } from "react";
import { getAdminStats, AdminStatsData } from "@/lib/api";

export default function AdminDashboardHeader() {
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" }).toUpperCase();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        if (res.success) {
          setStats(res.stats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-8">
      {/* Welcome Title area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-[10px] font-bold tracking-widest text-accent uppercase">ADMIN DASHBOARD</div>
            <div className="bg-[#111827] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
              FEDERATION OFFICE
            </div>
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide text-primary">
            PENDING <span className="text-accent">REVIEWS</span>
          </h1>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-4 md:mt-0 md:text-right">
          {dayName}<br />
          <span className="text-gray-800">{dateStr}</span>
        </div>
      </div>

      {/* Row 1: Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">TOTAL PENDING</div>
          <div className="font-heading text-4xl font-bold text-primary mb-1">
            {loading ? "—" : stats?.total_pending ?? 0}
          </div>
          <div className="text-[11px] text-gray-500">Across all application types</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">APPROVED TODAY</div>
          <div className="font-heading text-4xl font-bold text-emerald-600 mb-1">
            {loading ? "—" : stats?.approved_today ?? 0}
          </div>
          <div className="text-[11px] text-emerald-600/80">Since midnight today</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">APPROVED THIS WEEK</div>
          <div className="font-heading text-4xl font-bold text-emerald-600 mb-1">
            {loading ? "—" : stats?.approved_this_week ?? 0}
          </div>
          <div className="text-[11px] text-emerald-600/80">Since Monday</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">REJECTED THIS MONTH</div>
          <div className="font-heading text-4xl font-bold text-red-600 mb-1">
            {loading ? "—" : stats?.rejected_this_month ?? 0}
          </div>
          <div className="text-[11px] text-red-600/80">Applications declined</div>
        </div>
      </div>

      {/* Row 2: Type Breakdown Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col items-center text-center">
          <div className="font-heading text-2xl font-bold text-primary mb-1">
            {loading ? "—" : (stats as any)?.pending_players ?? 0}
          </div>
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">PLAYERS</div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col items-center text-center">
          <div className="font-heading text-2xl font-bold text-primary mb-1">
            {loading ? "—" : (stats as any)?.pending_coaches ?? 0}
          </div>
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">COACHES</div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col items-center text-center">
          <div className="font-heading text-2xl font-bold text-primary mb-1">
            {loading ? "—" : (stats as any)?.pending_referees ?? 0}
          </div>
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">REFEREES</div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col items-center text-center">
          <div className="font-heading text-2xl font-bold text-primary mb-1">
            {loading ? "—" : (stats as any)?.pending_academies ?? 0}
          </div>
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">ACADEMIES</div>
        </div>

        <div className="bg-gray-50 border border-gray-100 rounded-sm p-4 flex flex-col items-center text-center">
          <div className="font-heading text-2xl font-bold text-primary mb-1">0</div>
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">DISTRICTS</div>
        </div>
      </div>
    </div>
  );
}
