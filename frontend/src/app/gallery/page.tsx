"use client";

import React, { useEffect, useState } from "react";
import { AlbumData, listAlbums } from "@/lib/api";
import { Image as ImageIcon, Search } from "lucide-react";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<AlbumData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    listAlbums()
      .then((res) => {
        if (res.success) setAlbums(res.albums);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalPhotos = albums.reduce((acc, album) => acc + album.photo_count, 0);
  const latestAlbum = albums.length > 0 ? albums[0] : null;
  const latestDateStr = latestAlbum?.date
    ? new Date(latestAlbum.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  // Categories extraction
  const albumsByCat = albums.reduce((acc, a) => {
    const cat = a.event?.category?.toUpperCase() || "OTHER";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categories = ["ALL", "TOURNAMENTS", "TRIALS", "WORKSHOPS", "FEDERATION EVENTS"];

  const filteredAlbums = albums.filter((a) => {
    const eventCat = (a.event?.category || "OTHER").toUpperCase();
    if (filter === "ALL") return true;
    if (filter === "TOURNAMENTS" && eventCat.includes("TOURNAMENT")) return true;
    if (filter === "TRIALS" && eventCat.includes("TRIAL")) return true;
    if (filter === "WORKSHOPS" && eventCat.includes("WORKSHOP")) return true;
    if (filter === "FEDERATION EVENTS" && eventCat.includes("FEDERATION")) return true;
    return false;
  }).filter((a) => {
    const searchMatch = !searchQuery || 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.event?.location?.toLowerCase().includes(searchQuery.toLowerCase());
    return searchMatch;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#fcfbf9] w-full">
      {/* Hero Section */}
      <section className="bg-[#111827] text-white pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-[10px] font-bold tracking-widest text-[#d97c55] uppercase mb-4">
            HOME / GALLERY
          </div>
          <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide mb-6">
            PHOTO <span className="text-[#d97c55]">GALLERY</span>
          </h1>
          <p className="text-gray-400 font-serif italic text-lg max-w-2xl mb-12">
            Moments captured from tournaments, selection trials, workshops, and
            federation events across Uttar Pradesh — the U.P. handball season in pictures.
          </p>

          <div className="flex flex-wrap gap-12 border-t border-gray-800 pt-8">
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-1">TOTAL ALBUMS</div>
              <div className="font-bold font-mono text-xl">{albums.length}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-1">TOTAL PHOTOS</div>
              <div className="font-bold font-mono text-xl">{totalPhotos}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-1">LATEST ALBUM</div>
              <div className="font-bold font-mono text-xl">{latestDateStr.toUpperCase()}</div>
            </div>
            <div>
              <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-1">SEASONS COVERED</div>
              <div className="font-bold font-mono text-xl">2024 - 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <div className="border-b border-gray-200 bg-white relative z-40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => {
              let count = 0;
              if (cat === "ALL") count = albums.length;
              else if (cat === "TOURNAMENTS") count = albumsByCat["TOURNAMENT"] || 0;
              else if (cat === "TRIALS") count = albumsByCat["TRIAL"] || 0;
              else if (cat === "WORKSHOPS") count = albumsByCat["WORKSHOP"] || 0;
              else if (cat === "FEDERATION EVENTS") count = albumsByCat["FEDERATION"] || 0;
              
              const isActive = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap ${
                    isActive ? "bg-[#111827] text-white" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${isActive ? "bg-white/20 text-white" : "bg-orange-50 text-orange-600"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-64 shrink-0">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tournaments, year, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#fcfbf9] border border-gray-200 rounded-sm pl-9 pr-3 py-2 text-xs focus:outline-none focus:border-[#d97c55] text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-[#111827]">
            2025 - <span className="text-[#d97c55]">2026 SEASON</span>
          </h2>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
            SHOWING {filteredAlbums.length} ALBUMS &middot; {filteredAlbums.reduce((acc, a) => acc + a.photo_count, 0)} PHOTOS
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white border border-gray-200 rounded-sm h-[320px]"></div>
            ))}
          </div>
        ) : filteredAlbums.length === 0 ? (
          <div className="text-center py-32 text-gray-500 border border-dashed border-gray-300 rounded bg-white min-h-[300px] flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <div className="text-sm font-bold text-[#111827] mb-1">No albums found</div>
            <div className="text-xs">Try adjusting your filters or search query.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlbums.map((album) => {
              const displayCat = album.event?.category || "Federation";
              let catColor = "bg-[#d97c55]";
              if (displayCat.toLowerCase() === "trial") catColor = "bg-emerald-600";
              else if (displayCat.toLowerCase() === "workshop") catColor = "bg-amber-600";
              else if (displayCat.toLowerCase() === "federation") catColor = "bg-[#111827]";

              const formattedDate = album.date 
                ? new Date(album.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) 
                : "TBD";

              return (
                <div key={album.id} className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden group cursor-pointer hover:border-[#d97c55] transition-colors flex flex-col">
                  {/* Image Area */}
                  <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                    {album.cover_photo ? (
                      <img 
                        src={album.cover_photo} 
                        alt={album.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    {/* Category Tag */}
                    <div className={`absolute top-4 left-4 ${catColor} text-white px-2 py-1 text-[8px] font-bold tracking-widest uppercase rounded-sm`}>
                      {displayCat}
                    </div>

                    {/* Photo Count */}
                    <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-2 py-1 text-[9px] font-bold tracking-widest uppercase rounded-sm flex items-center gap-1.5">
                      <ImageIcon className="w-3 h-3" />
                      {album.photo_count} PHOTOS
                    </div>
                  </div>

                  {/* Details Area */}
                  <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-[#111827] line-clamp-2 leading-tight">
                      {album.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-4 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                      <span className="text-[#d97c55]">{displayCat}</span>
                      <span>&middot;</span>
                      <span>{formattedDate}</span>
                      {album.event?.location && (
                        <>
                          <span>&middot;</span>
                          <span className="truncate">{album.event.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
