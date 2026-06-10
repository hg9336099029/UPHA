"use client";

import { MapPin, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { listEvents, EventData } from "@/lib/api";

export default function CoachEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await listEvents();
        if (res.success && res.events) {
          // Get future events, sort by date
          const futureEvents = res.events
            .filter(e => new Date(e.start_date) >= new Date())
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
            .slice(0, 3);
          setEvents(futureEvents);
        }
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm h-full flex flex-col">
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">UPCOMING TOURNAMENTS</h3>
        <button className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase hover:text-primary transition-colors">
          VIEW ALL &nearr;
        </button>
      </div>
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500 animate-pulse">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No upcoming tournaments found.
          </div>
        ) : (
          events.map((event, idx) => {
            const dateObj = new Date(event.start_date);
            const dateDay = dateObj.getDate().toString().padStart(2, "0");
            const dateMonth = dateObj.toLocaleString("en-IN", { month: "short" }).toUpperCase();
            
            return (
              <div key={event.id} className={`flex gap-5 items-center p-6 md:p-8 ${idx < events.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50/50 transition-colors`}>
                <div className="w-14 h-14 bg-[#111827] rounded-sm flex flex-col items-center justify-center shrink-0">
                  <span className="font-heading text-xl font-bold text-white leading-none">{dateDay}</span>
                  <span className="text-[8px] font-bold tracking-widest text-[#d97c55] uppercase mt-1">
                    {dateMonth}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-base font-bold text-primary uppercase mb-1">{event.name}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#d97c55]" /> {event.location}</div>
                  </div>
                </div>
                <div className="shrink-0 ml-4">
                  <div className="bg-[#e8c69f] text-[#8e5c2b] px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase">
                    COACH
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
