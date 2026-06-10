"use client";

import { useEffect, useState } from "react";
import { getGlobalStats, GlobalStatsData } from "@/lib/api";

export default function StatsBanner() {
  const [stats, setStats] = useState<GlobalStatsData | null>(null);

  useEffect(() => {
    getGlobalStats()
      .then((res) => {
        if (res.success) {
          setStats(res.stats);
        }
      })
      .catch(console.error);
  }, []);

  // Use dynamic stats or fallback to 0
  const districts = stats?.districts || 0;
  const players = stats?.players || 0;
  const coaches = stats?.coaches || 0;
  const tournaments = stats?.tournaments || 0;

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-[#151e2b] border-t-4 border-accent shadow-2xl mt-12 rounded-sm overflow-hidden">
          
          <div className="p-8 md:p-12 border-b md:border-b-0 border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2">
              {districts}
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              AFFILIATED DISTRICTS
            </div>
          </div>
          
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              {players.toLocaleString()}<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              REGISTERED PLAYERS
            </div>
          </div>
          
          <div className="p-8 md:p-12 border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              {coaches.toLocaleString()}<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              CERTIFIED COACHES
            </div>
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              {tournaments.toLocaleString()}<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              ANNUAL TOURNAMENTS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
