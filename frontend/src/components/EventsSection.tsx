"use client";

import { useEffect, useState } from "react";
import { Globe, Trophy, Star, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { listEvents, EventData } from "@/lib/api";

export default function EventsSection() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await listEvents();
        if (res.success && res.events) {
          // Take only the first 3 events
          setEvents(res.events.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const getIcon = (index: number) => {
    switch (index % 3) {
      case 0: return <Trophy className="w-16 h-16 text-accent/60 stroke-[1]" />;
      case 1: return <Globe className="w-16 h-16 text-accent/60 stroke-[1]" />;
      case 2: return <Star className="w-16 h-16 text-accent/60 stroke-[1]" />;
      default: return <Trophy className="w-16 h-16 text-accent/60 stroke-[1]" />;
    }
  };

  return (
    <section id="events" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> TOURNAMENT CALENDAR
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            UPCOMING <span className="text-accent">EVENTS</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            From district selections to national qualifiers, follow every fixture on the UPHA calendar and register your participation in time.
          </p>
        </div>
        <Link href="/calendar" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          VIEW FULL CALENDAR &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : (
          Array.from({ length: Math.max(3, events.length) }).map((_, index) => {
            const event = events[index];
            if (event) {
              const startDate = new Date(event.start_date);
              const endDate = new Date(event.end_date);
              const regDate = new Date(event.registration_end_date);
              
              const day = startDate.getDate().toString().padStart(2, '0');
              const month = startDate.toLocaleString('default', { month: 'short' }).toUpperCase();
              
              const formattedDate = `${startDate.toLocaleDateString('default', { month: 'short', day: 'numeric' })} – ${endDate.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' })}`;
              const formattedRegDate = regDate.toLocaleDateString('default', { month: 'short', day: 'numeric' });

              return (
                <div key={event.id} className="border border-gray-200 rounded flex flex-col overflow-hidden">
                  <div className="bg-primary h-48 relative flex items-center justify-center">
                    <div className="absolute top-4 left-4 bg-white/20 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                      UPCOMING
                    </div>
                    {getIcon(index)}
                    <div className="absolute bottom-0 right-4 bg-white text-primary p-3 shadow-md font-heading text-center w-16">
                      <div className="text-3xl font-bold leading-none">{day}</div>
                      <div className="text-accent text-xs tracking-widest">{month}</div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">{event.category || "TOURNAMENT"}</div>
                      <h3 className="font-bold text-xl mb-4 leading-tight">{event.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-4 h-4 text-gray-400" /> {event.location || "TBA"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Calendar className="w-4 h-4 text-gray-400" /> {formattedDate}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">Reg. closes <strong>{formattedRegDate}</strong></span>
                      <Link href={`/events/${event.id}/register`} className="text-accent text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                        REGISTER &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            } else {
              // Placeholder Card
              return (
                <div key={`empty-${index}`} className="border border-dashed border-gray-200 rounded flex flex-col overflow-hidden bg-gray-50 opacity-60">
                  <div className="bg-gray-200 h-48 relative flex items-center justify-center">
                    <div className="absolute top-4 left-4 bg-gray-300 text-gray-500 text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
                      TBA
                    </div>
                    <Calendar className="w-12 h-12 text-gray-300" />
                    <div className="absolute bottom-0 right-4 bg-white text-gray-400 p-3 shadow-sm font-heading text-center w-16">
                      <div className="text-3xl font-bold leading-none">--</div>
                      <div className="text-gray-400 text-xs tracking-widest">---</div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-gray-400 text-xs font-semibold tracking-widest uppercase mb-2">TO BE ANNOUNCED</div>
                      <h3 className="font-bold text-xl mb-4 leading-tight text-gray-400">Upcoming Tournament</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MapPin className="w-4 h-4 text-gray-300" /> Location TBA
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                        <Calendar className="w-4 h-4 text-gray-300" /> Dates TBA
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-xs text-gray-400 font-medium">Registration <strong className="text-gray-400">TBA</strong></span>
                      <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        PENDING
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
    </section>
  );
}
