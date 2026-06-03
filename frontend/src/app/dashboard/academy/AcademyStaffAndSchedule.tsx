import React from "react";

const coaches = [
  { id: "01", initials: "AS", name: "Anil Sharma", details: "CCH-00128 · Head Coach", badge: "STATE" },
  { id: "02", initials: "MK", name: "Meena Kapoor", details: "CCH-00204 · Asst. Coach", badge: "DISTRICT" },
  { id: "03", initials: "RV", name: "Rakesh Verma", details: "CCH-00219 · Junior Coach", badge: "DISTRICT" },
  { id: "04", initials: "SH", name: "Sahil Hussain", details: "CCH-00237 · Fitness Coach", badge: "SCHOOL" },
];

const sessions = [
  { id: "1", dateObj: { day: "TUE", d: "MAY 29" }, title: "Senior Squad — Tactical Drills", meta: "06:00 - 08:00 AM · Court 1 · Anil Sharma" },
  { id: "2", dateObj: { day: "WED", d: "MAY 30" }, title: "Junior Squad — Footwork & Passing", meta: "05:00 - 07:00 PM · Court 2 · Meena Kapoor" },
  { id: "3", dateObj: { day: "THU", d: "MAY 31" }, title: "Fitness & Conditioning — All Squads", meta: "06:00 - 08:00 AM · Track · Sahil Hussain" },
];

export default function AcademyStaffAndSchedule() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Our Coaches Column */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col">
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
          <h3 className="font-heading text-xl font-bold uppercase text-primary">OUR COACHES</h3>
          <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
            MANAGE &nearr;
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          {coaches.map((coach, index) => (
            <div key={coach.id} className={`flex items-center gap-4 p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index === coaches.length - 1 ? 'border-b-0' : ''}`}>
              <div className="w-10 h-10 rounded-full bg-[#111827] flex items-center justify-center shrink-0 shadow-inner">
                <span className="font-heading text-sm font-bold text-white tracking-wider">{coach.initials}</span>
              </div>
              
              <div className="flex-1 truncate">
                <div className="font-bold text-sm text-gray-800 truncate">{coach.name}</div>
                <div className="text-[10px] text-gray-500 font-mono tracking-wider truncate mt-0.5">{coach.details}</div>
              </div>
              
              <div className="shrink-0 bg-[#fef3c7] border border-[#fcd34d]/50 px-3 py-1.5 rounded-sm">
                <span className="text-[9px] font-bold tracking-widest text-[#92400e] uppercase">{coach.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Sessions Column */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col">
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
          <h3 className="font-heading text-xl font-bold uppercase text-primary">UPCOMING SESSIONS</h3>
          <button className="text-[9px] font-bold tracking-widest text-accent uppercase hover:text-primary transition-colors">
            FULL SCHEDULE &nearr;
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          {sessions.map((session, index) => (
            <div key={session.id} className={`flex items-center gap-6 p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index === sessions.length - 1 ? 'border-b-0' : ''}`}>
              
              <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-sm flex flex-col items-center justify-center shrink-0">
                <span className="font-heading text-lg font-bold text-gray-800 leading-none">{session.dateObj.day}</span>
                <span className="text-[8px] font-bold tracking-widest text-accent uppercase mt-1">{session.dateObj.d}</span>
              </div>
              
              <div className="flex-1 truncate">
                <h4 className="font-bold text-sm text-gray-800 mb-1 truncate">{session.title}</h4>
                <div className="text-[10px] font-mono tracking-wider text-gray-500 truncate">
                  {session.meta}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
