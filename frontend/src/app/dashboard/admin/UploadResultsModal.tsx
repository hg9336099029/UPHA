"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { EventData, listEvents } from "@/lib/api";

export default function UploadResultsModal() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    listEvents().then((res) => {
      if (res.success) setEvents(res.events);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="bg-white w-full rounded shadow-sm border border-gray-200 relative mb-12">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-100">
        <div>
          <div className="text-[9px] font-bold tracking-widest text-[#3c8c7c] uppercase mb-1">
            ADMIN &middot; RESULTS
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#111827]">
            UPLOAD TOURNAMENT <span className="text-[#3c8c7c]">RESULTS</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-8">
          {/* 01 TOURNAMENT */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#3c8c7c]">01</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                TOURNAMENT
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                  SELECT TOURNAMENT *
                </label>
                <select
                  required
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c] text-gray-800 appearance-none"
                >
                  <option value="">Select a completed event...</option>
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {ev.name} ({ev.location})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    FINAL DATE PLAYED
                  </label>
                  <input
                    type="date"
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c] text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    TOTAL MATCHES PLAYED
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 24"
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c] text-gray-800"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 02 FINAL STANDINGS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#3c8c7c]">02</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                FINAL STANDINGS *
              </h3>
            </div>
            <div className="space-y-3">
              {/* 1st Place */}
              <div className="flex gap-3 items-center">
                <div className="w-16 bg-[#d97c55] text-white text-center py-2.5 rounded text-sm font-bold tracking-widest">
                  1ST
                </div>
                <input
                  type="text"
                  placeholder="e.g. Lucknow"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <input
                  type="text"
                  placeholder="e.g. District Champion - 5 wins 1 loss"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 2nd Place */}
              <div className="flex gap-3 items-center">
                <div className="w-16 bg-[#a7a29e] text-white text-center py-2.5 rounded text-sm font-bold tracking-widest">
                  2ND
                </div>
                <input
                  type="text"
                  placeholder="e.g. Varanasi"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <input
                  type="text"
                  placeholder="e.g. Runner-up - 4 wins 2 losses"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 3rd Place */}
              <div className="flex gap-3 items-center opacity-70 focus-within:opacity-100 transition-opacity">
                <div className="w-16 bg-[#c49272] text-white text-center py-2.5 rounded text-sm font-bold tracking-widest">
                  3RD
                </div>
                <input
                  type="text"
                  placeholder="District / Team Name"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <input
                  type="text"
                  placeholder="Additional notes"
                  className="flex-1 bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#3c8c7c]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-gray-400 font-mono">
            Results sync to public website & affected member dashboards on publish
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              type="button"
              className="flex-1 sm:flex-none border border-gray-300 text-gray-800 px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors"
            >
              SAVE DRAFT
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none bg-[#3c8c7c] text-white px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#2c6b5d] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {loading ? "PUBLISHING..." : "PUBLISH RESULTS"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
