"use client";

import { LayoutGrid, List } from "lucide-react";

interface DirectoryControlsProps {
  viewMode: 'table' | 'grid';
  onViewChange: (mode: 'table' | 'grid') => void;
}

export default function DirectoryControls({ viewMode, onViewChange }: DirectoryControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-32">
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search by district, president, or secretary name..." 
        className="flex-1 bg-white border border-gray-200 shadow-sm rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-800 placeholder:text-gray-400"
      />
      
      {/* Filters & Toggles */}
      <div className="flex gap-4">
        <select className="bg-white border border-gray-200 shadow-sm rounded-sm px-6 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-gray-600 min-w-[150px] appearance-none">
          <option value="">All Regions</option>
          <option value="western">Western UP</option>
          <option value="eastern">Eastern UP</option>
          <option value="central">Central UP</option>
          <option value="bundelkhand">Bundelkhand</option>
        </select>
        
        <div className="flex border border-gray-200 rounded-sm shadow-sm bg-white overflow-hidden p-1 gap-1">
          <button 
            onClick={() => onViewChange('table')}
            className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors ${
              viewMode === 'table' ? 'bg-[#111827] text-white' : 'bg-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            TABLE
          </button>
          <button 
            onClick={() => onViewChange('grid')}
            className={`flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase rounded-sm transition-colors ${
              viewMode === 'grid' ? 'bg-[#111827] text-white' : 'bg-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            GRID
          </button>
        </div>
      </div>
    </div>
  );
}
