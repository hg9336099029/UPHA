"use client";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { AcademyData } from "@/lib/api";

export default function AcademyDetailsSummary() {
  const { meData, loading } = useAuth();
  const academy = meData as AcademyData | null;

  if (loading) return <div className="animate-pulse bg-gray-100 rounded-sm h-40"></div>;

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">ACADEMY DETAILS</h3>
        <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
          EDIT PROFILE &nearr;
        </button>
      </div>

      {/* Grid Data */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        {/* Row 1 */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">ACADEMY NAME</div>
          <div className="text-sm font-medium text-gray-800">{academy?.name || "—"}</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">DIRECTOR (ADHYAKSH)</div>
          <div className="text-sm font-medium text-gray-800">{academy?.adhyaksha?.name || "—"}</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">SECRETARY (SACHIV)</div>
          <div className="text-sm font-medium text-gray-800">{academy?.sachiv?.name || "—"}</div>
        </div>

        {/* Row 2 */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">DISTRICT</div>
          <div className="text-sm font-medium text-gray-800">{academy?.district || "—"}</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">FOUNDED</div>
          <div className="text-sm font-medium text-gray-800">{academy?.year_of_establishment || "—"}</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">WEBSITE</div>
          <div className="text-sm font-medium text-gray-800 truncate">
            {academy?.website ? (
              <a href={academy.website} target="_blank" rel="noreferrer" className="text-accent hover:underline">
                {academy.website.replace(/^https?:\/\//, '')}
              </a>
            ) : "—"}
          </div>
        </div>

        {/* Row 3 */}
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">PLAYERS</div>
          <div className="text-sm font-medium text-gray-800">{academy?.no_of_players || "0"} registered</div>
        </div>
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">EMAIL</div>
          <div className="text-sm font-medium text-gray-800 truncate">{academy?.email || "—"}</div>
        </div>
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">ADDRESS</div>
          <div className="text-sm font-medium text-gray-800">{academy?.office_address || "—"}</div>
          <div className="text-xs text-gray-500 mt-1">Phone: {academy?.office_phone_number || "—"}</div>
        </div>

      </div>
    </div>
  );
}
