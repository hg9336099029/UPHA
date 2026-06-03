import React from "react";
import { MapPin } from "lucide-react";

const sampleReferees = [
  { id: "01", initials: "SS", name: "SANJAY SINGH", district: "MAU" },
  { id: "02", initials: "BY", name: "BAIJNATH YADAV", district: "VINDHYACHAL" },
  { id: "03", initials: "PP", name: "PREM PRAKASH", district: "MEERUT" },
  { id: "04", initials: "NA", name: "NAFEES AHMAD", district: "GORAKHPUR" },
  { id: "05", initials: "PY", name: "PANKAJ YADAV", district: "AYODHYA" },
  { id: "06", initials: "GN", name: "GOVIND NISHAD", district: "PRAYAGRAJ" },
  { id: "07", initials: "AP", name: "AMIT KUMAR PANDEY", district: "CHANDAULI" },
  { id: "08", initials: "SB", name: "SURYA BHAN", district: "VARANASI" },
  { id: "09", initials: "MY", name: "MOHIT YADAV", district: "FATEHPUR" },
  { id: "10", initials: "JS", name: "JAI SINGH", district: "LUCKNOW" },
  { id: "11", initials: "NS", name: "NAVNEET SINGH", district: "VARANASI" },
  { id: "12", initials: "SS", name: "SACHIN SHARMA", district: "LUCKNOW" },
  { id: "13", initials: "VD", name: "VIMLESH DRUV", district: "SANT KABIR NAGAR" },
  { id: "14", initials: "TK", name: "TARUN KUMAR", district: "VARANASI" },
  { id: "15", initials: "BK", name: "BRIJESH KHARWAR", district: "VARANASI" },
  { id: "16", initials: "MY", name: "MANOJ KR. SINGH YADAV", district: "SANT RAVIDAS NAGAR" },
  { id: "17", initials: "AM", name: "ALOK MISHRA", district: "LUCKNOW" },
  { id: "18", initials: "AS", name: "ATUL SINGH", district: "PRAYAGRAJ" },
  { id: "19", initials: "SS", name: "SACHIN SHUKLA", district: "PRATAPGARH" },
  { id: "20", initials: "PM", name: "PRAVEEN MISHRA", district: "SULTANPUR" },
];

export default function RefereePanelGrid() {
  return (
    <div className="mb-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-8">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-wide">
          THE <span className="text-accent">PANEL</span>
        </h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          SHOWING <span className="text-gray-800">ALL 32</span> REGISTERED REFEREES
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-12 bg-white border border-gray-100 p-2 rounded-sm shadow-sm">
        <input 
          type="text" 
          placeholder="Search by referee name or district..." 
          className="flex-1 bg-gray-50 border-none px-6 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-gray-800 placeholder:text-gray-400 rounded-sm w-full"
        />
        <select className="bg-white border border-gray-200 px-6 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all text-gray-600 appearance-none min-w-[150px] rounded-sm w-full md:w-auto">
          <option value="">All Regions</option>
          <option value="western">Western UP</option>
          <option value="eastern">Eastern UP</option>
          <option value="central">Central UP</option>
        </select>
        <div className="hidden md:block shrink-0 px-6 py-3 border-l border-gray-100 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
          32 REFEREES &middot; 19 DISTRICTS
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleReferees.map((referee) => (
          <div key={referee.id} className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full">
            
            {/* Top Dark Graphic */}
            <div className="h-64 bg-[#111827] flex items-center justify-center relative rounded-t-sm m-[1px] mb-0 overflow-hidden">
              <span className="font-heading text-6xl font-bold text-white tracking-wider z-10 group-hover:scale-110 transition-transform duration-500">
                {referee.initials}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent"></div>
            </div>
            
            {/* Bottom Content */}
            <div className="p-6 pt-5 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
              <h3 className="font-heading text-lg font-bold uppercase text-primary mb-2 line-clamp-1">
                {referee.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-accent uppercase">
                <MapPin className="w-3 h-3 shrink-0" />
                <span className="truncate">{referee.district}</span>
              </div>
            </div>
            
          </div>
        ))}
      </div>
      
    </div>
  );
}
