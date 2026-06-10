"use client";

import { UploadCloud, X, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { EventData, listEvents, createAlbum } from "@/lib/api";

export default function UploadGalleryModal() {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  
  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [coverIndex, setCoverIndex] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listEvents().then((res) => {
      if (res.success) setEvents(res.events);
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...newFiles]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
    if (coverIndex === index) {
      setCoverIndex(0);
    } else if (coverIndex > index) {
      setCoverIndex(coverIndex - 1);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return alert("Title is required.");
    if (photos.length === 0) return alert("Please select at least one photo.");

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    if (eventId) formData.append("event_id", eventId);
    if (date) formData.append("date", date);
    if (description) formData.append("description", description);
    formData.append("cover_index", coverIndex.toString());
    
    photos.forEach(photo => {
      formData.append("photos", photo);
    });

    try {
      const res = await createAlbum(formData);
      if (res.success) {
        alert("Album published successfully!");
        // reset form
        setTitle("");
        setEventId("");
        setDate("");
        setDescription("");
        setPhotos([]);
        setCoverIndex(0);
      } else {
        alert("Failed to publish: " + res.message);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const totalSize = photos.reduce((acc, file) => acc + file.size, 0);
  const sizeMb = (totalSize / (1024 * 1024)).toFixed(1);

  return (
    <div className="bg-white w-full rounded shadow-sm border border-gray-200 relative mb-12">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-100">
        <div>
          <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1">
            ADMIN &middot; GALLERY
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#111827]">
            UPLOAD <span className="text-[#d97c55]">GALLERY</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-8">
          {/* 01 ALBUM DETAILS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">01</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                ALBUM DETAILS
              </h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                  TOURNAMENT
                </label>
                <select
                  value={eventId}
                  onChange={(e) => setEventId(e.target.value)}
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none"
                >
                  <option value="">Select event to associate gallery with (Optional)...</option>
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
                    ALBUM TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Awadh Zone Cup 2026 - Finals"
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    EVENT DATE
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                  ALBUM DESCRIPTION (optional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 resize-none"
                ></textarea>
              </div>
            </div>
          </section>

          {/* 02 PHOTOS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">02</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                PHOTOS <span className="text-gray-400 lowercase tracking-normal font-normal">- {photos.length} selected &middot; click a tile to set as cover</span>
              </h3>
            </div>
            
            {photos.length === 0 ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#d97c55]/30 bg-[#d97c55]/5 rounded-sm p-8 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-[#d97c55]/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-[#d97c55]">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-[#d97c55] mb-1">Click to upload or drag and drop</div>
                <div className="text-xs text-gray-500">JPG, PNG, WebP up to 10MB each</div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                  {photos.map((photo, i) => (
                    <div 
                      key={i} 
                      className={`relative aspect-square rounded overflow-hidden cursor-pointer border-2 ${coverIndex === i ? "border-[#d97c55]" : "border-transparent"}`}
                      onClick={() => setCoverIndex(i)}
                    >
                      <img src={URL.createObjectURL(photo)} alt="" className="w-full h-full object-cover" />
                      {coverIndex === i && (
                        <div className="absolute top-1 left-1 bg-[#d97c55] text-white p-0.5 rounded-full z-10">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); removePhoto(i); }}
                        className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-red-500 transition-colors z-10"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square rounded border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:text-[#d97c55] hover:border-[#d97c55] cursor-pointer transition-colors"
                  >
                    <UploadCloud className="w-6 h-6 mb-1" />
                    <span className="text-[10px] font-bold">ADD MORE</span>
                  </div>
                </div>
              </div>
            )}
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileSelect}
            />
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-gray-400 font-mono">
            {photos.length} photos &middot; {sizeMb} MB total {photos.length > 0 ? "&middot; ready to publish" : ""}
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
              disabled={loading || photos.length === 0}
              className="flex-1 sm:flex-none bg-[#d97c55] text-white px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#c16744] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? "PUBLISHING..." : "PUBLISH ALBUM"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
