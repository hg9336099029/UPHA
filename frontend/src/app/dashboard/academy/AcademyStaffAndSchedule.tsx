"use client";
import React, { useEffect, useState } from "react";
import { listEvents, EventData } from "@/lib/api";

export default function AcademyStaffAndSchedule() {
  const [sessions, setSessions] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  // We are omitting coaches because there is no Academy-Coach relationship in the backend.

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await listEvents();
        if (res.success && res.events) {
          const upcoming = res.events
            .filter((e) => new Date(e.start_date) >= new Date())
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
            .slice(0, 3);
          setSessions(upcoming);
        }
      } catch (error) {
        console.error("Failed to load sessions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      
      {/* Our Coaches Column */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col">
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
          <h3 className="font-heading text-xl font-bold uppercase text-primary">OUR COACHES</h3>
          <button className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase hover:text-primary transition-colors">
            MANAGE &nearr;
          </button>
        </div>
        
        <div className="flex-1 flex flex-col p-8 text-center text-sm text-gray-500 justify-center">
          No coaches registered yet.
        </div>
      </div>

      {/* Upcoming Sessions Column */}
      <div className="w-full lg:w-1/2 bg-white border border-gray-200 shadow-sm rounded-sm flex flex-col">
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
          <h3 className="font-heading text-xl font-bold uppercase text-primary">UPCOMING SESSIONS</h3>
          <button className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase hover:text-primary transition-colors">
            FULL SCHEDULE &nearr;
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          {loading ? (
            <div className="p-8 text-center text-sm text-gray-500 animate-pulse">Loading sessions...</div>
          ) : sessions.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">No upcoming sessions.</div>
          ) : (
            sessions.map((session, index) => {
              const dateObj = new Date(session.start_date);
              const dateDay = dateObj.toLocaleDateString("en-IN", { weekday: "short" }).toUpperCase();
              const dateMonth = dateObj.toLocaleDateString("en-IN", { month: "short", day: "2-digit" }).toUpperCase();

              return (
                <div key={session.id} className={`flex items-center gap-6 p-6 border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${index === sessions.length - 1 ? 'border-b-0' : ''}`}>
                  
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-sm flex flex-col items-center justify-center shrink-0">
                    <span className="font-heading text-lg font-bold text-gray-800 leading-none">{dateDay}</span>
                    <span className="text-[8px] font-bold tracking-widest text-[#d97c55] uppercase mt-1">{dateMonth}</span>
                  </div>
                  
                  <div className="flex-1 truncate">
                    <h4 className="font-bold text-sm text-gray-800 mb-1 truncate">{session.name}</h4>
                    <div className="text-[10px] font-mono tracking-wider text-gray-500 truncate">
                      {session.location}
                    </div>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
}
