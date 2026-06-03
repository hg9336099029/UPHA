import React from "react";

export default function AcademyDashboardHeader() {
  return (
    <div className="mb-8">
      
      {/* Welcome Title area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 border-b border-gray-200 pb-4">
        <div>
          <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">ACADEMY DASHBOARD</div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide text-primary">
            WELCOME BACK, <span className="text-accent">VAJRA</span> SPORTS ACADEMY
          </h1>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-4 md:mt-0 md:text-right">
          WEDNESDAY<br />
          <span className="text-gray-800">20 MAY 2026</span>
        </div>
      </div>

      {/* 4 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Affiliation Status */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">AFFILIATION STATUS</div>
          <div className="font-heading text-2xl font-bold uppercase text-emerald-600 mb-1">
            &bull; ACTIVE
          </div>
          <div className="text-[11px] text-gray-500">Fee paid &middot; ₹ 2,500</div>
        </div>

        {/* Academy ID */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">ACADEMY ID</div>
          <div className="font-heading text-xl font-bold uppercase text-primary mb-1">
            ACA-2026-00031
          </div>
          <div className="text-[11px] text-gray-500">Lucknow District</div>
        </div>

        {/* Registered Players */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">REGISTERED PLAYERS</div>
          <div className="font-heading text-2xl font-bold uppercase text-primary mb-1">
            42
          </div>
          <div className="text-[11px] text-gray-500">8 added this season</div>
        </div>

        {/* Valid Through */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6 flex flex-col justify-center">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">VALID THROUGH</div>
          <div className="font-heading text-2xl font-bold uppercase text-primary mb-1">
            31 MAR 2027
          </div>
          <div className="text-[11px] text-gray-500">Renews annually</div>
        </div>

      </div>
    </div>
  );
}
