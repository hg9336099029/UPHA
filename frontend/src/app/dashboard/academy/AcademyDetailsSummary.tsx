import React from "react";

export default function AcademyDetailsSummary() {
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
          <div className="text-sm font-medium text-gray-800">Vajra Sports Academy</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">DIRECTOR</div>
          <div className="text-sm font-medium text-gray-800">R. K. Trivedi</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">HEAD COACH</div>
          <div className="text-sm font-medium text-gray-800">Anil Sharma</div>
        </div>

        {/* Row 2 */}
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">DISTRICT</div>
          <div className="text-sm font-medium text-gray-800">Lucknow</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">FOUNDED</div>
          <div className="text-sm font-medium text-gray-800">2014</div>
        </div>
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">TYPE</div>
          <div className="text-sm font-medium text-gray-800">Co-ed &middot; Boys &amp; Girls</div>
        </div>

        {/* Row 3 */}
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">PLAYERS</div>
          <div className="text-sm font-medium text-gray-800">42 registered</div>
        </div>
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">AFFILIATED COACHES</div>
          <div className="text-sm font-medium text-gray-800">4 coaches</div>
        </div>
        <div className="p-6 md:p-8">
          <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">ADDRESS</div>
          <div className="text-sm font-medium text-gray-800">Gomti Nagar, Lucknow</div>
          <div className="text-xs text-gray-500 mt-1">Uttar Pradesh &mdash; 226010</div>
        </div>

      </div>
    </div>
  );
}
