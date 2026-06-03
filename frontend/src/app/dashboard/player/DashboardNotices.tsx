import { Megaphone, Clock } from "lucide-react";
import React from "react";

export default function DashboardNotices() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm h-full flex flex-col">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">ANNOUNCEMENTS</h3>
        <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
          ALL NOTICES &nearr;
        </button>
      </div>

      {/* Notices List */}
      <div className="flex-1 flex flex-col">
        
        {/* Notice 1 */}
        <div className="flex gap-4 p-6 md:p-8 border-b border-gray-50">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-accent flex items-center justify-center shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-1">State Championship registration now open</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Players affiliated with district units can register for the State Senior Handball Championship until 5 June 2026.
            </p>
            <div className="text-[8px] font-bold tracking-widest text-accent uppercase">
              POSTED 14 MAY 2026
            </div>
          </div>
        </div>

        {/* Notice 2 */}
        <div className="flex gap-4 p-6 md:p-8">
          <div className="w-10 h-10 rounded-full bg-orange-50 text-accent flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-800 mb-1">Annual membership renewal window</h4>
            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Membership for the 2026-27 cycle can be renewed from 1 March 2027.
            </p>
            <div className="text-[8px] font-bold tracking-widest text-accent uppercase">
              POSTED 2 MAY 2026
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
