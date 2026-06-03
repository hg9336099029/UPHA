import { Check, Plus } from "lucide-react";
import React from "react";

export default function CoachProfileStatus() {
  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8 h-full flex flex-col">
      
      <div className="mb-6">
        <h3 className="font-heading text-xl font-bold uppercase text-primary mb-1">COACHING SUMMARY</h3>
        <p className="text-xs text-gray-500">A snapshot of this season&apos;s coaching activity.</p>
      </div>

      {/* Circular Progress & Text */}
      <div className="flex items-center gap-6 mb-8">
        <div className="relative w-16 h-16 shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            {/* Background Circle */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="3" />
            {/* Progress Circle (70%) */}
            <circle cx="18" cy="18" r="15.915" fill="none" stroke="#d97c55" strokeWidth="3" strokeDasharray="70, 100" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-heading text-lg font-bold text-primary">70%</span>
          </div>
        </div>
        <div>
          <div className="font-bold text-sm text-gray-800 mb-1">Profile completeness</div>
          <div className="text-xs text-gray-500">Add coaching documentation to reach 100%</div>
        </div>
      </div>

      {/* Checklist */}
      <div className="flex-1 flex flex-col gap-4">
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">Personal details</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">DONE</span>
        </div>
        
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">Aadhar verified</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">DONE</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-600">Annual fee paid</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-emerald-600 uppercase">DONE</span>
        </div>

        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
              <Plus className="w-3 h-3 text-accent" />
            </div>
            <span className="text-sm font-medium text-gray-800">Coaching certificate</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-accent uppercase">PENDING</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
              <Plus className="w-3 h-3 text-accent" />
            </div>
            <span className="text-sm font-medium text-gray-800">Posting confirmation</span>
          </div>
          <span className="text-[9px] font-bold tracking-widest text-accent uppercase">PENDING</span>
        </div>
        
      </div>
    </div>
  );
}
