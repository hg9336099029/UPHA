"use client";

import { Download, RefreshCcw } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/context/AuthContext";
import { RefereeData } from "@/lib/api";

export default function RefereeIdCard() {
  const { authUser, meData, loading } = useAuth();
  const referee = meData as RefereeData | null;

  const initials = authUser?.name
    ? authUser.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase()
    : "VJ";

  if (loading) {
    return (
      <div className="bg-gray-200 rounded-sm animate-pulse h-72" />
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Digital ID Card Graphics */}
      <div className="bg-[#111827] rounded-sm overflow-hidden shadow-lg flex-1 flex flex-col relative">

        {/* Top Header */}
        <div className="p-6 md:p-8 pb-4 flex justify-between items-start border-b border-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shrink-0 shadow-inner">
              <Image src="/upha.png" alt="UPHA" width={32} height={32} className="object-contain" />
            </div>
            <div>
              <div className="font-heading text-lg font-bold text-white uppercase leading-none tracking-wide">UPHA</div>
              <div className="text-[7px] font-bold tracking-widest text-gray-400 uppercase mt-1">UTTAR PRADESH HANDBALL ASSN.</div>
            </div>
          </div>

          <div className="border border-gray-600 rounded-sm px-3 py-1.5">
            <div className="text-[8px] font-bold tracking-widest text-[#d97c55] uppercase">REFEREE ACCREDITATION</div>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 flex-1 relative">
          {/* Avatar Block */}
          {authUser?.passport_image ? (
            <div className="w-28 h-32 bg-[#0f172a] border border-gray-800 rounded-sm overflow-hidden shrink-0 z-10">
              <Image src={authUser.passport_image} alt="Photo" width={112} height={128} className="object-cover w-full h-full" />
            </div>
          ) : (
            <div className="w-28 h-32 bg-[#1e293b] border border-gray-700 rounded-sm flex items-center justify-center shrink-0 shadow-inner z-10">
              <span className="font-heading text-4xl font-bold text-white tracking-wider">{initials}</span>
            </div>
          )}

          {/* Details Grid */}
          <div className="flex-1 flex flex-col justify-center gap-5 z-10">
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">FULL NAME</div>
              <div className="font-heading text-2xl font-bold text-white uppercase tracking-wide">{authUser?.name || "VIKRAM JOSHI"}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mb-1">REFEREE ID</div>
                <div className="text-sm font-medium text-white">UPHA-RFR-{String(referee?.id ?? 45).padStart(5, "0")}</div>
              </div>
              <div>
                <div className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mb-1">DISTRICT</div>
                <div className="text-sm font-medium text-white">{referee?.district || "Varanasi"}</div>
              </div>

              <div>
                <div className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mb-1">SESSION</div>
                <div className="text-sm font-medium text-white capitalize">2025-26</div>
              </div>
              <div>
                <div className="text-[8px] font-bold tracking-widest text-gray-500 uppercase mb-1">BOARD</div>
                <div className="text-sm font-medium text-white">UPHA Referee Panel</div>
              </div>
            </div>
          </div>

          {/* Simulated QR Code */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-sm p-1 z-10 shadow-sm opacity-90 hidden sm:block">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="#111827">
              {/* Top-left marker */}
              <rect x="0" y="0" width="30" height="30" />
              <rect x="5" y="5" width="20" height="20" fill="white" />
              <rect x="10" y="10" width="10" height="10" />
              {/* Top-right marker */}
              <rect x="70" y="0" width="30" height="30" />
              <rect x="75" y="5" width="20" height="20" fill="white" />
              <rect x="80" y="10" width="10" height="10" />
              {/* Bottom-left marker */}
              <rect x="0" y="70" width="30" height="30" />
              <rect x="5" y="75" width="20" height="20" fill="white" />
              <rect x="10" y="80" width="10" height="10" />
              {/* Random blocks for pattern */}
              <rect x="40" y="0" width="10" height="10" />
              <rect x="55" y="0" width="10" height="10" />
              <rect x="45" y="15" width="20" height="10" />
              <rect x="35" y="30" width="35" height="10" />
              <rect x="0" y="40" width="20" height="10" />
              <rect x="25" y="45" width="10" height="20" />
              <rect x="40" y="45" width="20" height="20" />
              <rect x="65" y="40" width="35" height="10" />
              <rect x="80" y="55" width="20" height="10" />
              <rect x="45" y="75" width="15" height="25" />
              <rect x="65" y="70" width="35" height="15" />
              <rect x="70" y="90" width="15" height="10" />
              <rect x="90" y="90" width="10" height="10" />
            </svg>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="bg-[#0f172a] px-6 md:px-8 py-4 flex justify-between items-center border-t border-gray-800 z-10 relative">
          <div className="font-serif italic text-[#d97c55] text-sm">Khelo India Toh Khilega India</div>
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">VALID THROUGH 31 MAR 2027</div>
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-full bg-gradient-to-r from-transparent via-[#1e293b]/20 to-transparent pointer-events-none transform -skew-x-12"></div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => {
            if (!referee?.paid) {
              alert("Not approved by Admin. You can download your ID card after your profile is approved.");
            } else {
              window.print();
            }
          }}
          className="flex-1 bg-[#d97c55] hover:bg-[#c16744] text-white flex items-center justify-center gap-2 py-4 rounded-sm transition-colors shadow-sm border border-[#c16744]"
        >
          <Download className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">DOWNLOAD ID CARD</span>
        </button>
        <button 
          onClick={() => {
            if (!referee?.paid) {
              alert("Not approved by Admin. You can download your certificate after your profile is approved.");
            } else {
              window.print();
            }
          }}
          className="flex-1 bg-[#111827] hover:bg-[#1f2937] text-white flex items-center justify-center gap-2 py-4 rounded-sm transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">DOWNLOAD CERTIFICATE</span>
        </button>
      </div>
    </div>
  );
}
