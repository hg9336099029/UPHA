import { Check, X, Clock } from "lucide-react";
import React from "react";

export default function RecentDecisionsLog() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">RECENT DECISIONS</h3>
        <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
          FULL AUDIT LOG &nearr;
        </button>
      </div>

      {/* Decisions Feed */}
      <div className="flex flex-col">
        
        {/* Decision 1 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-6">
          <div className="flex gap-4 items-start w-full md:w-3/4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm text-gray-800 leading-relaxed mb-1">
                <span className="font-bold">Approved</span> &middot; Rohit Kashyap (APP-PLR-00231) &middot; Player ID PLR-2026-00421 issued
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                Approved by Dr. M. Pandey
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
            27 May &middot; 10:32 AM
          </div>
        </div>

        {/* Decision 2 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-6">
          <div className="flex gap-4 items-start w-full md:w-3/4">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <X className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm text-gray-800 leading-relaxed mb-1">
                <span className="font-bold">Rejected</span> &middot; Pinky Devi (APP-PLR-00229) &middot; Aadhar scan illegible &mdash; applicant notified
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                Rejected by Dr. M. Pandey
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
            27 May &middot; 10:18 AM
          </div>
        </div>

        {/* Decision 3 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-6">
          <div className="flex gap-4 items-start w-full md:w-3/4">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-accent flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm text-gray-800 leading-relaxed mb-1">
                <span className="font-bold">More info requested</span> &middot; Devraj Mishra (APP-CCH-00078) &middot; Awaiting coaching certificate upload
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                Action by Dr. M. Pandey
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
            27 May &middot; 09:54 AM
          </div>
        </div>

        {/* Decision 4 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 border-b border-gray-50 hover:bg-gray-50/50 transition-colors gap-6">
          <div className="flex gap-4 items-start w-full md:w-3/4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm text-gray-800 leading-relaxed mb-1">
                <span className="font-bold">Approved</span> &middot; Vajra Sports Academy (APP-ACA-00031) &middot; Academy ID ACA-2026-00031 issued
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                Approved by Dr. M. Pandey
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
            26 May &middot; 04:48 PM
          </div>
        </div>

        {/* Decision 5 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 hover:bg-gray-50/50 transition-colors gap-6">
          <div className="flex gap-4 items-start w-full md:w-3/4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm text-gray-800 leading-relaxed mb-1">
                <span className="font-bold">Approved</span> &middot; Priya Gupta (APP-PLR-00227) &middot; Player ID PLR-2026-00433 issued
              </div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                Approved by Dr. M. Pandey
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
            26 May &middot; 03:22 PM
          </div>
        </div>

      </div>
    </div>
  );
}
