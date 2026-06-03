import React from "react";

export default function AcademyRecord() {
  return (
    <div className="bg-[#111827] rounded-sm p-8 md:p-10 mb-6 shadow-md relative overflow-hidden border border-blue-500">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 relative z-10 border-b border-gray-800 pb-4">
        <h2 className="font-heading text-xl font-bold text-white uppercase tracking-wider">
          TOURNAMENT RECORD
        </h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          ACADEMY &middot; SINCE <span className="text-accent">2014</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-gray-800 relative z-10">
        
        {/* Stat 1 */}
        <div className="flex flex-col items-center justify-center text-center py-4 lg:py-0">
          <div className="font-heading text-6xl md:text-7xl font-bold text-accent mb-2 tracking-tight">31</div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">TOURNAMENTS ENTERED</div>
          <div className="text-[10px] text-gray-500">teams fielded</div>
        </div>

        {/* Stat 2 */}
        <div className="flex flex-col items-center justify-center text-center py-4 lg:py-0">
          <div className="font-heading text-6xl md:text-7xl font-bold text-accent mb-2 tracking-tight">24</div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">MEDALS WON</div>
          <div className="text-[10px] text-gray-500">across age groups</div>
        </div>

        {/* Stat 3 */}
        <div className="flex flex-col items-center justify-center text-center py-4 lg:py-0">
          <div className="font-heading text-6xl md:text-7xl font-bold text-accent mb-2 tracking-tight">09</div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">STATE SELECTIONS</div>
          <div className="text-[10px] text-gray-500">players advanced</div>
        </div>

        {/* Stat 4 */}
        <div className="flex flex-col items-center justify-center text-center py-4 lg:py-0">
          <div className="font-heading text-6xl md:text-7xl font-bold text-accent mb-2 tracking-tight">12</div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">YEARS ACTIVE</div>
          <div className="text-[10px] text-gray-500">since 2014</div>
        </div>

      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
}
