import React from "react";

const samplePlayers = [
  { id: "01", initials: "AV", name: "Arjun Verma", plrId: "PLR-2026-00417", category: "SENIOR - MEN", district: "Lucknow" },
  { id: "02", initials: "RK", name: "Rohit Kashyap", plrId: "PLR-2026-00421", category: "SENIOR - MEN", district: "Lucknow", bgColor: "bg-[#d97c55]" },
  { id: "03", initials: "PG", name: "Priya Gupta", plrId: "PLR-2026-00433", category: "SENIOR - WOMEN", district: "Lucknow", bgColor: "bg-[#f59e0b]" },
  { id: "04", initials: "VS", name: "Vivek Singh", plrId: "PLR-2026-00447", category: "JUNIOR - BOYS", district: "Lucknow", bgColor: "bg-[#1d4ed8]" },
  { id: "05", initials: "NM", name: "Neha Mishra", plrId: "PLR-2026-00452", category: "JUNIOR - GIRLS", district: "Lucknow" },
  { id: "06", initials: "SK", name: "Saurabh Kumar", plrId: "PLR-2026-00461", category: "JUNIOR - BOYS", district: "Lucknow", bgColor: "bg-[#d97c55]" },
];

export default function PlayersRoster() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">PLAYERS I COACH</h3>
        <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
          VIEW ALL 12 &nearr;
        </button>
      </div>

      {/* Roster List */}
      <div className="flex flex-col">
        {samplePlayers.map((player) => (
          <div key={player.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-6">
            
            {/* Player Info */}
            <div className="flex items-center gap-4 min-w-[250px]">
              <div className={`w-10 h-10 rounded-full ${player.bgColor || 'bg-[#111827]'} flex items-center justify-center shrink-0 shadow-inner`}>
                <span className="font-heading text-sm font-bold text-white">{player.initials}</span>
              </div>
              <div>
                <div className="font-bold text-sm text-gray-800">{player.name}</div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mt-0.5">{player.plrId}</div>
              </div>
            </div>

            {/* Category */}
            <div className="flex-1 md:text-center w-full md:w-auto">
              <div className="text-[10px] font-bold tracking-widest text-gray-600 uppercase font-mono">{player.category}</div>
            </div>

            {/* District */}
            <div className="flex-1 md:text-center w-full md:w-auto">
              <div className="text-sm text-gray-600">{player.district}</div>
            </div>

            {/* Status */}
            <div className="shrink-0 w-full md:w-auto flex md:justify-end">
              <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1.5 rounded-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] font-bold tracking-widest uppercase">ACTIVE</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
