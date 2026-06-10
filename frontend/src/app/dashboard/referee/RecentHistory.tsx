"use client";

import React, { useEffect, useState } from "react";
import { listEvents, EventData } from "@/lib/api";

export default function RecentHistory() {
  const [history, setHistory] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await listEvents();
        if (res.success && res.events) {
          const past = res.events
            .filter((e) => new Date(e.start_date) < new Date())
            .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime())
            .slice(0, 4);
          setHistory(past);
        }
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm h-full flex flex-col">
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">RECENT HISTORY</h3>
        <button className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase hover:text-primary transition-colors">
          FULL RECORD &nearr;
        </button>
      </div>

      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500 animate-pulse">
            Loading history...
          </div>
        ) : history.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500">
            No recent history.
          </div>
        ) : (
          history.map((item, idx) => {
            const dateStr = new Date(item.start_date).toLocaleDateString("en-IN", {
              day: "2-digit", month: "short"
            });
            
            return (
              <div key={item.id} className={`flex items-center justify-between p-6 md:p-8 ${idx < history.length - 1 ? "border-b border-gray-50" : ""} hover:bg-gray-50/50 transition-colors gap-4`}>
                
                <div className="text-[10px] font-mono text-gray-500 w-12 shrink-0">
                  {dateStr}
                </div>
                
                <div className="flex-1">
                  <div className="text-sm font-bold text-gray-800 mb-0.5">{item.name}</div>
                  <div className="text-[10px] text-gray-500">{item.event_type}</div>
                </div>

                <div className="shrink-0">
                  <div className="bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase">
                    COMPLETED
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
