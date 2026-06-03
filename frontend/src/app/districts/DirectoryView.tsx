"use client";

import React, { useState } from "react";
import DirectoryControls from "./DirectoryControls";
import DirectoryTable from "./DirectoryTable";
import DirectoryGrid from "./DirectoryGrid";

export default function DirectoryView() {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  return (
    <>
      <div className="mt-8 mb-12">
        <DirectoryControls viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-6">
        <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-primary">COMPLETE DIRECTORY</h2>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-2 md:mt-0">
          SHOWING <span className="text-gray-800">ALL 60</span> AFFILIATED DISTRICTS &middot; WITH PRESIDENT & SECRETARY CONTACTS
        </div>
      </div>

      <div className="mb-20">
        {viewMode === 'table' ? <DirectoryTable /> : <DirectoryGrid />}
      </div>
    </>
  );
}
