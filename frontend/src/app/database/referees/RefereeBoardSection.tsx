import React from "react";

export default function RefereeBoardSection() {
  return (
    <div className="mb-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-12">
        <h2 className="font-heading text-4xl font-bold uppercase tracking-wide">
          REFEREE <span className="text-accent">BOARD</span>
        </h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          OFFICIATING LEADERSHIP &middot; SESSION 2025-26
        </div>
      </div>

      {/* Board Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Chairman Card */}
        <div className="bg-white border border-[#d97c55]/30 rounded-sm p-6 shadow-sm hover:shadow-md hover:border-[#d97c55]/50 transition-all flex items-center gap-6 relative overflow-hidden group">
          {/* Subtle glow effect behind card content */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
          
          <div className="w-24 h-24 bg-[#111827] flex items-center justify-center shrink-0 rounded-sm relative z-10">
            <span className="font-heading text-3xl font-bold text-white tracking-wider">PS</span>
          </div>
          
          <div className="relative z-10">
            <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">REFEREE BOARD</div>
            <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">CHAIRMAN</div>
            <h3 className="font-heading text-2xl font-bold uppercase text-primary">PARMENDER SINGH</h3>
          </div>
        </div>

        {/* Convenor Card */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow flex items-center gap-6">
          <div className="w-24 h-24 bg-[#111827] flex items-center justify-center shrink-0 rounded-sm">
            <span className="font-heading text-3xl font-bold text-white tracking-wider">ST</span>
          </div>
          
          <div>
            <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">REFEREE BOARD</div>
            <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">CONVENOR</div>
            <h3 className="font-heading text-2xl font-bold uppercase text-primary">SHAMPS TABREJ</h3>
          </div>
        </div>

      </div>
    </div>
  );
}
