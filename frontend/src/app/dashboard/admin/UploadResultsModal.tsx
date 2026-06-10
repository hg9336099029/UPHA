"use client";

import { X, Upload, FileText } from "lucide-react";
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
    <div className="bg-white w-full rounded shadow-sm border border-gray-200 relative">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-100">
        <div>
          <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1">
            ADMIN &middot; RESULTS
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#111827]">
            UPLOAD TOURNAMENT <span className="text-[#d97c55]">RESULTS</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-8">
          {/* 01 TOURNAMENT */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">01</span>
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
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none"
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
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    TOTAL MATCHES PLAYED
                  </label>
                  <input
                    type="text"
                    defaultValue="24"
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 02 FINAL STANDINGS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">02</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                FINAL STANDINGS *
              </h3>
            </div>
            <div className="space-y-3">
              {/* 1st Place */}
              <div className="flex gap-3 items-center bg-[#fcfbf9] p-2 border border-gray-100 rounded">
                <div className="w-16 bg-[#d19b67] text-[#111827] text-center py-2.5 rounded text-sm font-bold tracking-widest shadow-sm">
                  1ST
                </div>
                <input
                  type="text"
                  defaultValue="Lucknow"
                  className="flex-1 bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <input
                  type="text"
                  defaultValue="District Champion - 5 wins 1 loss"
                  className="flex-[1.5] bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 2nd Place */}
              <div className="flex gap-3 items-center bg-[#fcfbf9] p-2 border border-gray-100 rounded">
                <div className="w-16 bg-[#b3b0a7] text-[#111827] text-center py-2.5 rounded text-sm font-bold tracking-widest shadow-sm">
                  2ND
                </div>
                <input
                  type="text"
                  defaultValue="Varanasi"
                  className="flex-1 bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <input
                  type="text"
                  defaultValue="Runner-up - 4 wins 2 losses"
                  className="flex-[1.5] bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 3rd Place */}
              <div className="flex gap-3 items-center bg-[#fcfbf9] p-2 border border-gray-100 rounded">
                <div className="w-16 bg-[#9e6d4c] text-white text-center py-2.5 rounded text-sm font-bold tracking-widest shadow-sm">
                  3RD
                </div>
                <input
                  type="text"
                  defaultValue="Aligarh"
                  className="flex-1 bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <input
                  type="text"
                  defaultValue="Third place - 3 wins 3 losses"
                  className="flex-[1.5] bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* 4th Place */}
              <div className="flex gap-3 items-center bg-[#fcfbf9] p-2 border border-gray-100 rounded">
                <div className="w-16 bg-[#18202f] text-white text-center py-2.5 rounded text-sm font-bold tracking-widest shadow-sm">
                  4TH
                </div>
                <input
                  type="text"
                  defaultValue="Jhansi"
                  className="flex-1 bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <input
                  type="text"
                  defaultValue="Semi-finalist - 2 wins 4 losses"
                  className="flex-[1.5] bg-white border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55]"
                />
                <button type="button" className="text-gray-400 hover:text-red-500 transition-colors p-2">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Add Standing Button */}
              <div className="pt-2">
                <button type="button" className="border border-dashed border-[#d97c55]/50 text-[#d97c55] px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded hover:bg-[#d97c55]/5 transition-colors">
                  + ADD STANDING
                </button>
              </div>
            </div>
          </section>

          {/* 03 INDIVIDUAL AWARDS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">03</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                INDIVIDUAL AWARDS
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  TOP SCORER
                </label>
                <input
                  type="text"
                  defaultValue="Arjun Verma - Lucknow - 28 goals"
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  BEST PLAYER (MVP)
                </label>
                <input
                  type="text"
                  defaultValue="Rohit Kashyap - Lucknow"
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  BEST GOALKEEPER
                </label>
                <input
                  type="text"
                  defaultValue="Saurabh Kumar - Varanasi"
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                />
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  MOST PROMISING JUNIOR
                </label>
                <input
                  type="text"
                  defaultValue="Vivek Singh - Aligarh"
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                />
              </div>
            </div>
          </section>

          {/* 04 DOCUMENTS & PUBLICATION */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">04</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                DOCUMENTS & PUBLICATION
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  MATCH-BY-MATCH SCORESHEET (PDF / Excel)
                </label>
                <div className="border border-dashed border-gray-300 bg-[#fcfbf9] rounded-md p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 shrink-0 shadow-sm">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#111827] uppercase">UPLOAD OFFICIAL SCORESHEET</div>
                    <div className="text-[9px] font-mono text-gray-500 uppercase mt-0.5">PDF, EXCEL OR CSV &middot; MAX 10 MB</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    STATUS
                  </label>
                  <select className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none">
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    NOTIFY MEMBERS
                  </label>
                  <select className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none">
                    <option>Yes, send notification</option>
                    <option>No, do not notify</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col gap-4">
          <div className="text-[10px] text-gray-500 font-mono">
            Results sync to public website & affected member dashboards on publish
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              className="border border-gray-300 text-gray-800 px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors"
            >
              CANCEL
            </button>
            <button
              type="button"
              className="border border-gray-300 text-gray-800 px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors"
            >
              SAVE DRAFT
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#5ea993] text-white px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#4d907d] disabled:opacity-50 transition-colors flex items-center justify-center gap-2 ml-auto"
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
