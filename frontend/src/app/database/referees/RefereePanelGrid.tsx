"use client";

import React, { useEffect, useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";
import { listReferees, RefereeData } from "@/lib/api";

export default function RefereePanelGrid() {
  const [referees, setReferees] = useState<RefereeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listReferees();
        if (res.success) {
          setReferees(res.referees.filter((r) => r.paid));
        } else {
          setError("Failed to load referees.");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching referees.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredReferees = referees.filter(
    (r) =>
      r.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-8">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-wide">
          THE <span className="text-accent">PANEL</span>
        </h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          SHOWING <span className="text-gray-800">ALL {filteredReferees.length}</span> REGISTERED REFEREES
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-12 bg-white border border-gray-100 p-2 rounded-sm shadow-sm">
        <input
          type="text"
          placeholder="Search by referee name or district..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-50 border-none px-6 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-gray-800 placeholder:text-gray-400 rounded-sm w-full"
        />
        <div className="hidden md:block shrink-0 px-6 py-3 border-l border-gray-100 text-[9px] font-bold tracking-widest text-gray-500 uppercase">
          {filteredReferees.length} REFEREES
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-6 rounded-sm border border-red-100 flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-10 h-10 mb-4 text-red-500" />
          <p className="font-semibold">{error}</p>
        </div>
      ) : filteredReferees.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-sm p-12 text-center text-gray-500">
          <p className="text-lg">No approved referees found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredReferees.map((referee) => {
            // Get initials
            const initials = referee.user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (
              <div
                key={referee.id}
                className="bg-white border border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full"
              >
                {/* Top Dark Graphic */}
                <div className="h-64 bg-[#111827] flex items-center justify-center relative rounded-t-sm m-[1px] mb-0 overflow-hidden">
                  <span className="font-heading text-6xl font-bold text-white tracking-wider z-10 group-hover:scale-110 transition-transform duration-500">
                    {initials}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/40 to-transparent"></div>
                </div>

                {/* Bottom Content */}
                <div className="p-6 pt-5 bg-white border-t border-gray-100 flex-1 flex flex-col justify-between">
                  <h3 className="font-heading text-lg font-bold uppercase text-primary mb-2 line-clamp-1">
                    {referee.user.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1 uppercase">Grade: {referee.grade_applying_for}</p>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest text-accent uppercase">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{referee.district}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
