import React from "react";
import Image from "next/image";
import { DistrictData } from "@/lib/api";

export default function DirectoryGrid({ districts }: { districts: DistrictData[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {districts.map((row, index) => (
        <div key={row.id} className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
          {row.logo ? (
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 mb-4 shadow-sm relative">
              <Image src={row.logo} alt={`${row.district} Logo`} fill className="object-cover" />
            </div>
          ) : (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm ${index % 2 === 0 ? 'bg-[#111827] text-white' : 'bg-[#d97c55] text-white'}`}>
              <span className="font-heading font-bold tracking-wider">{row.district.substring(0, 2).toUpperCase()}</span>
            </div>
          )}
          <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-[#111827] mb-1">{row.district}</h3>
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">REF - {String(index + 1).padStart(2, '0')}</div>
        </div>
      ))}
      {districts.length === 0 && (
        <div className="col-span-full py-12 text-center text-gray-500 italic">No affiliated districts found.</div>
      )}
    </div>
  );
}
