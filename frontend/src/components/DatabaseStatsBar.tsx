"use client";

import { useEffect, useState } from "react";
import { Shield, Users, Briefcase, MapPin, GraduationCap } from "lucide-react";
import { listReferees, listPlayers, listCoaches, listAcademies, listDistricts } from "@/lib/api";

export default function DatabaseStatsBar() {
  const [counts, setCounts] = useState({
    referees: 0,
    players: 0,
    coaches: 0,
    academies: 0,
    districts: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [refRes, playRes, coachRes, acadRes, distRes] = await Promise.all([
          listReferees().catch(() => ({ referees: [] })),
          listPlayers().catch(() => ({ players: [] })),
          listCoaches().catch(() => ({ coaches: [] })),
          listAcademies().catch(() => ({ academies: [] })),
          listDistricts().catch(() => ({ districts: [] })),
        ]);

        setCounts({
          referees: ((refRes as any).referees || []).filter((p: any) => p.paid).length,
          players: ((playRes as any).players || []).filter((p: any) => p.paid).length,
          coaches: ((coachRes as any).coaches || []).filter((p: any) => p.paid).length,
          academies: ((acadRes as any).academies || []).filter((p: any) => p.paid).length,
          districts: ((distRes as any).districts || []).filter((p: any) => p.paid).length,
        });
      } catch (error) {
        console.error("Failed to load counts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCounts();
  }, []);

  const stats = [
    { label: "Referees", count: counts.referees, icon: <Shield className="w-6 h-6" /> },
    { label: "Players", count: counts.players, icon: <Users className="w-6 h-6" /> },
    { label: "Coaches", count: counts.coaches, icon: <Briefcase className="w-6 h-6" /> },
    { label: "Academies", count: counts.academies, icon: <GraduationCap className="w-6 h-6" /> },
    { label: "Districts", count: counts.districts, icon: <MapPin className="w-6 h-6" /> },
  ];

  return (
    <div className="w-full bg-[#111827] py-8 rounded-sm shadow-sm border border-gray-800">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-800 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className={`flex flex-col items-center justify-center ${idx > 1 ? "pt-6 md:pt-0" : ""}`}>
            <div className="text-[#d97c55] mb-3">{stat.icon}</div>
            <div className="font-heading text-4xl font-bold text-white mb-1">
              {loading ? <span className="text-gray-600 animate-pulse font-mono">---</span> : String(stat.count).padStart(2, "0")}
            </div>
            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
