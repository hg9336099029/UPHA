"use client";

import React, { useEffect, useState } from "react";
import {
  listPlayers,
  listCoaches,
  listReferees,
  listAcademies,
} from "@/lib/api";

export default function AdminDashboardHeader() {
  const [counts, setCounts] = useState({ players: 0, coaches: 0, referees: 0, academies: 0, approved: 0 });
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" }).toUpperCase();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  useEffect(() => {
    Promise.all([listPlayers(), listCoaches(), listReferees(), listAcademies()])
      .then(([p, c, r, a]) => {
        const pendingP = p.players.filter((x) => !x.paid).length;
        const pendingC = c.coaches.filter((x) => !x.paid).length;
        const pendingR = r.referees.filter((x) => !x.paid).length;
        const pendingA = a.academies.filter((x) => !x.paid).length;
        const approvedP = p.players.filter((x) => x.paid).length;
        const approvedC = c.coaches.filter((x) => x.paid).length;
        const approvedR = r.referees.filter((x) => x.paid).length;
        const approvedAc = a.academies.filter((x) => x.paid).length;
        setCounts({
          players: pendingP,
          coaches: pendingC,
          referees: pendingR,
          academies: pendingA,
          approved: approvedP + approvedC + approvedR + approvedAc,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPending = counts.players + counts.coaches + counts.referees + counts.academies;

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

      {/* 4 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">TOTAL PENDING</div>
          <div className="font-heading text-4xl font-bold text-primary mb-1">
            {loading ? "—" : totalPending}
          </div>
          <div className="text-[11px] text-gray-500">Across all application types</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">PENDING PLAYERS</div>
          <div className="font-heading text-4xl font-bold text-primary mb-1">
            {loading ? "—" : counts.players}
          </div>
          <div className="text-[11px] text-gray-500">Payment not verified</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">PENDING COACHES</div>
          <div className="font-heading text-4xl font-bold text-primary mb-1">
            {loading ? "—" : counts.coaches}
          </div>
          <div className="text-[11px] text-gray-500">Coaches + Referees: {loading ? "—" : counts.coaches + counts.referees}</div>
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">TOTAL APPROVED</div>
          <div className="font-heading text-4xl font-bold text-emerald-600 mb-1">
            {loading ? "—" : counts.approved}
          </div>
          <div className="text-[11px] text-gray-500">All paid members</div>
        </div>

      </div>
    </div>
  );
}
