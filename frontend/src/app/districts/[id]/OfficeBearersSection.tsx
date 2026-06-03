import React from "react";

export default function OfficeBearersSection() {
  return (
    <div className="mb-24">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-12">
        <h2 className="font-heading text-4xl font-bold uppercase tracking-wide">
          OFFICE <span className="text-accent">BEARERS</span>
        </h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          3 POSITIONS &middot; CURRENTLY ACTIVE
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Card 1: President */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow relative">
          {/* Top Graphic */}
          <div className="h-64 bg-[#1e293b] flex items-center justify-center relative rounded-t-sm m-2">
            <span className="font-heading text-7xl font-bold text-white tracking-wider">KS</span>
            {/* Corner Details */}
            <div className="absolute top-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent"></div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-[256px] left-8 transform -translate-y-1/2">
            <div className="bg-[#d97c55] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-sm border border-[#c16744]">
              PRESIDENT - ADHYAKSH
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 pt-10">
            <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">POSITION 01 / 03</div>
            <h3 className="font-heading text-xl font-bold uppercase text-primary mb-3">KULDEEP SINGH</h3>
            <p className="text-[9px] font-bold tracking-widest text-accent uppercase">ALIGARH HANDBALL ASSN.</p>
          </div>
        </div>

        {/* Card 2: Secretary */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow relative">
          {/* Top Graphic */}
          <div className="h-64 bg-[#1e293b] flex items-center justify-center relative rounded-t-sm m-2">
            <span className="font-heading text-7xl font-bold text-white tracking-wider">SS</span>
            {/* Corner Details */}
            <div className="absolute top-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent"></div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-[256px] left-8 transform -translate-y-1/2">
            <div className="bg-[#111827] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-sm border border-black">
              SECRETARY - SACHIV
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 pt-10">
            <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">POSITION 02 / 03</div>
            <h3 className="font-heading text-xl font-bold uppercase text-primary mb-3">SUDHISH KUMAR SINGH</h3>
            <p className="text-[9px] font-bold tracking-widest text-accent uppercase">ALIGARH HANDBALL ASSN.</p>
          </div>
        </div>

        {/* Card 3: Treasurer */}
        <div className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow relative">
          {/* Top Graphic */}
          <div className="h-64 bg-[#1e293b] flex items-center justify-center relative rounded-t-sm m-2">
            <span className="font-heading text-7xl font-bold text-white tracking-wider">PV</span>
            {/* Corner Details */}
            <div className="absolute top-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute top-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 border border-white/20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 to-transparent"></div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-[256px] left-8 transform -translate-y-1/2">
            <div className="bg-[#d97c55] text-white text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 shadow-sm border border-[#c16744]">
              TREASURER - KOSHADHYAKSH
            </div>
          </div>
          
          {/* Content */}
          <div className="p-8 pt-10">
            <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">POSITION 03 / 03</div>
            <h3 className="font-heading text-xl font-bold uppercase text-primary mb-3">PRASHANT KUMAR VERMA</h3>
            <p className="text-[9px] font-bold tracking-widest text-accent uppercase">ALIGARH HANDBALL ASSN.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
