"use client";

import { MapPin, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { listEvents, EventData } from "@/lib/api";

export default function CoachEvents() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listEvents()
      .then((res) => {
        const today = new Date().toISOString().split("T")[0];
        setEvents(res.events.filter((e) => e.start_date >= today).slice(0, 4));
      })
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm h-full flex flex-col">
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">UPCOMING EVENTS</h3>
      </div>
      <div className="flex-1 flex flex-col">
        {loading && <div className="p-8 text-sm text-gray-400 animate-pulse">Loading events…</div>}
        {!loading && events.length === 0 && (
          <div className="p-8 text-sm text-gray-400">No upcoming events.</div>
        )}
        {!loading && events.map((event, idx) => (
          <div key={event.id} className={`flex gap-5 items-start p-6 md:p-8 ${idx < events.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50/50 transition-colors`}>
            <div className="w-14 h-14 bg-[#111827] rounded-sm flex flex-col items-center justify-center shrink-0">
              <span className="font-heading text-xl font-bold text-white leading-none">{new Date(event.start_date).getDate()}</span>
              <span className="text-[8px] font-bold tracking-widest text-accent uppercase mt-1">
                {new Date(event.start_date).toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-heading text-base font-bold text-primary uppercase mb-1">{event.name}</h4>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-accent" /> {event.location}</div>
                <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-gray-400" /> {event.start_date}</div>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-widest uppercase">{event.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
