import { Plus } from "lucide-react";
import React from "react";

const samplePlayers = [
  { id: "01", initials: "AV", name: "Arjun Verma", subtext: "PLR-00417 · Senior M", bgColor: "bg-[#111827]" },
  { id: "02", initials: "RK", name: "Rohit Kashyap", subtext: "PLR-00421 · Senior M", bgColor: "bg-[#d97c55]" },
  { id: "03", initials: "PG", name: "Priya Gupta", subtext: "PLR-00433 · Senior W", bgColor: "bg-[#f59e0b]" },
  { id: "04", initials: "VS", name: "Vivek Singh", subtext: "PLR-00447 · Junior B", bgColor: "bg-[#1d4ed8]" },
  { id: "05", initials: "NM", name: "Neha Mishra", subtext: "PLR-00452 · Junior G", bgColor: "bg-[#111827]" },
  { id: "06", initials: "SK", name: "Saurabh Kumar", subtext: "PLR-00461 · Junior B", bgColor: "bg-[#d97c55]" },
  { id: "07", initials: "DM", name: "Deepika Maurya", subtext: "PLR-00478 · Junior G", bgColor: "bg-[#f59e0b]" },
  { id: "08", initials: "AT", name: "Aakash Tiwari", subtext: "PLR-00489 · Senior M", bgColor: "bg-[#1d4ed8]" },
];

export default function AcademyPlayersGrid() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">OUR PLAYERS</h3>
        <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
          VIEW ALL 42 &nearr;
        </button>
      </div>

      {/* Grid List */}
      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {samplePlayers.map((player) => (
            <div key={player.id} className="border border-gray-100 bg-[#f9fafb] p-4 rounded-sm flex items-center gap-4 hover:border-gray-200 transition-colors">
              <div className={`w-10 h-10 rounded-full ${player.bgColor} flex items-center justify-center shrink-0 shadow-inner`}>
                <span className="font-heading text-sm font-bold text-white tracking-wider">{player.initials}</span>
              </div>
              <div className="truncate flex-1">
                <div className="font-bold text-sm text-gray-800 truncate">{player.name}</div>
                <div className="text-[10px] text-gray-500 font-mono tracking-wider truncate mt-0.5">{player.subtext}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Player Action */}
        <div className="border-t border-gray-100 pt-8 flex justify-center">
          <button className="border border-[#d97c55]/30 bg-[#d97c55]/5 hover:bg-[#d97c55]/10 text-accent font-bold tracking-widest uppercase text-[10px] py-4 px-8 rounded-sm flex items-center gap-2 transition-colors w-full md:w-auto md:min-w-[300px] justify-center">
            <Plus className="w-4 h-4" /> REGISTER A NEW PLAYER
          </button>
        </div>
      </div>
      
    </div>
  );
}
