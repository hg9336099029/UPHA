"use client";

import React, { useState, useEffect } from "react";
import DirectoryControls from "./DirectoryControls";
import DirectoryTable from "./DirectoryTable";
import DirectoryGrid from "./DirectoryGrid";
import { listDistricts, DistrictData } from "@/lib/api";

export default function DirectoryView() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [districts, setDistricts] = useState<DistrictData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listDistricts()
      .then(res => {
        if (res.success) {
          setDistricts(res.districts);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mt-8 mb-12">
        <DirectoryControls viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-6">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-primary">COMPLETE DIRECTORY</h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          SHOWING <span className="text-gray-800">{loading ? "..." : `ALL ${districts.length}`}</span> AFFILIATED DISTRICTS &middot; WITH PRESIDENT & SECRETARY CONTACTS
        </div>
      </div>

      <div className="mb-20">
        {loading ? (
          <div className="py-12 text-center text-gray-500 italic animate-pulse">Loading directory...</div>
        ) : viewMode === 'table' ? (
          <DirectoryTable districts={districts} />
        ) : (
          <DirectoryGrid districts={districts} />
        )}
      </div>
    </>
  );
}
