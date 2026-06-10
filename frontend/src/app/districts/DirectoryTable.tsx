import React from "react";
import Image from "next/image";
import { DistrictData } from "@/lib/api";

export default function DirectoryTable({ districts }: { districts: DistrictData[] }) {
  return (
    <div className="w-full overflow-x-auto shadow-sm border border-gray-200 rounded-sm">
      <table className="w-full text-left bg-white whitespace-nowrap min-w-[900px]">
        <thead>
          <tr className="bg-[#111827] text-white text-[10px] font-bold tracking-widest uppercase">
            <th className="py-4 px-6 w-16">#</th>
            <th className="py-4 px-6 w-20">LOGO</th>
            <th className="py-4 px-6 w-1/4">DISTRICT</th>
            <th className="py-4 px-6 w-1/3">PRESIDENT &mdash; NAME & ADDRESS</th>
            <th className="py-4 px-6 w-1/3">SECRETARY &mdash; NAME & ADDRESS</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {districts.map((row, index) => {
            const rowNumber = String(index + 1).padStart(2, '0');
            const president = row.adhyaksha;
            const secretary = row.sachiv;

            return (
              <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'} border-b border-gray-100 hover:bg-gray-50 transition-colors`}>
                <td className="py-6 px-6 align-middle">
                  <span className="text-[#d97c55] font-mono font-bold text-xs">{rowNumber}</span>
                </td>
                <td className="py-6 px-6 align-middle">
                  {row.logo ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200 shadow-sm relative shrink-0">
                      <Image src={row.logo} alt={`${row.district} Logo`} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center font-heading font-bold shadow-sm shrink-0">
                      {row.district.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </td>
                <td className="py-6 px-6 align-middle">
                  <span className="font-heading font-bold text-[#111827] uppercase tracking-wide">{row.district}</span>
                </td>
                <td className="py-6 px-6 align-middle">
                  {!president ? (
                    <span className="text-gray-400 italic text-xs">&mdash; Vacant &mdash;</span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-[#111827] uppercase text-sm tracking-wide">{president.name}</span>
                      <span className="text-[11px] text-gray-400 whitespace-normal uppercase font-mono tracking-widest">{row.office_address || row.district}</span>
                      {president.phone_number && (
                        <span className="text-[11px] font-bold tracking-widest text-[#d97c55] mt-1">{president.phone_number}</span>
                      )}
                    </div>
                  )}
                </td>
                <td className="py-6 px-6 align-middle">
                  {!secretary ? (
                    <span className="text-gray-400 italic text-xs">&mdash; Vacant &mdash;</span>
                  ) : (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-[#111827] uppercase text-sm tracking-wide">{secretary.name}</span>
                      <span className="text-[11px] text-gray-400 whitespace-normal uppercase font-mono tracking-widest">{row.office_address || row.district}</span>
                      {secretary.phone_number && (
                        <span className="text-[11px] font-bold tracking-widest text-[#d97c55] mt-1">{secretary.phone_number}</span>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
          {districts.length === 0 && (
            <tr>
              <td colSpan={5} className="py-12 text-center text-gray-500 italic">No affiliated districts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
