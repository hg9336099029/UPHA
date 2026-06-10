"use client";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { listPlayers, PlayerData, AcademyData } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AcademyPlayersGrid() {
  const { meData } = useAuth();
  const academy = meData as AcademyData | null;
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyPlayers() {
      if (!academy?.name) {
        setLoading(false);
        return;
      }
      try {
        const res = await listPlayers();
        if (res.success && res.players) {
          // Attempt to match by club_name
          const myPlayers = res.players.filter(p => p.club_name?.toLowerCase() === academy.name.toLowerCase());
          setPlayers(myPlayers);
        }
      } catch (error) {
        console.error("Failed to load players:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyPlayers();
  }, [academy?.name]);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">OUR PLAYERS</h3>
      </div>

      {/* Grid List */}
      <div className="p-6 md:p-8">
        {loading ? (
          <div className="text-center text-sm text-gray-500 mb-8 py-8 animate-pulse">
            Loading players...
          </div>
        ) : players.length === 0 ? (
          <div className="text-center text-sm text-gray-500 mb-8 py-8">
            No players registered to this academy yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {players.map((player) => {
              const initials = player.user.name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase() || "PL";
              return (
                <div key={player.id} className="border border-gray-100 bg-[#f9fafb] p-4 rounded-sm flex items-center gap-4 hover:border-gray-200 transition-colors">
                  <div className={`w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center shrink-0 shadow-inner`}>
                    <span className="font-heading text-sm font-bold text-white tracking-wider">{initials}</span>
                  </div>
                  <div className="truncate flex-1">
                    <div className="font-bold text-sm text-gray-800 truncate">{player.user.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono tracking-wider truncate mt-0.5">
                      PLR-2026-{String(player.id).padStart(5, "0")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Player Action */}
        <div className="border-t border-gray-100 pt-8 flex justify-center">
          <Link href="/register/player" className="border border-[#d97c55]/30 bg-[#d97c55]/5 hover:bg-[#d97c55]/10 text-accent font-bold tracking-widest uppercase text-[10px] py-4 px-8 rounded-sm flex items-center gap-2 transition-colors w-full md:w-auto md:min-w-[300px] justify-center">
            <Plus className="w-4 h-4" /> REGISTER A NEW PLAYER
          </Link>
        </div>
      </div>
      
    </div>
  );
}
