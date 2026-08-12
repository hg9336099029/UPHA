"use client";

import { useEffect, useState } from "react";
import { CreateEventPayload, EventData, listEvents, deleteEvent } from "@/lib/api";

const UP_DISTRICTS = [
  "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat", "Bahraich",
  "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", "Bulandshahr",
  "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar",
  "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi",
  "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow",
  "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit",
  "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur",
  "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
];

export default function CreateEventModal({
  onSubmit,
}: {
  onSubmit: (form: CreateEventPayload) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState("TOURNAMENT");
  const [form, setForm] = useState<CreateEventPayload>({
    name: "",
    location: "",
    start_date: "",
    end_date: "",
    registration_end_date: "",
    category: "senior",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const finalForm = { ...form, category: `${eventType} - ${form.category}` };
    await onSubmit(finalForm);
    setLoading(false);
    fetchEvents();
  }

  const [events, setEvents] = useState<EventData[]>([]);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchEvents = async () => {
    try {
      const res = await listEvents();
      if (res.success) setEvents(res.events);
    } catch (e) {
      console.error("Failed to load events", e);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId: number, eventName: string) => {
    if (!window.confirm(`Are you sure you want to delete the event "${eventName}"? This cannot be undone.`)) return;
    setDeleting(eventId);
    try {
      const res = await deleteEvent(eventId);
      if (res.success) {
        alert("Event deleted successfully.");
        fetchEvents();
      }
    } catch (err: any) {
      alert(err?.message || "Failed to delete event.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white w-full rounded shadow-sm border border-gray-200 relative mb-12">
      {/* Header */}
      <div className="flex justify-between items-start p-6 border-b border-gray-100">
        <div>
          <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1">
            ADMIN &middot; CREATE
          </div>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-wide text-[#111827]">
            NEW <span className="text-[#d97c55]">EVENT</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-8">
          {/* 01 EVENT DETAILS */}
          <section>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
              <span className="text-[10px] font-bold text-[#d97c55]">01</span>
              <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
                EVENT DETAILS
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                  EVENT NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Senior Handball Championship 2026"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                  EVENT TYPE *
                </label>
                <div className="flex flex-wrap gap-2">
                  {["TOURNAMENT", "TRIAL", "WORKSHOP", "MEET", "CLINIC / CAMP"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEventType(type)}
                      className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded transition-colors ${
                        eventType === type
                          ? "bg-[#d97c55]/10 border border-[#d97c55] text-[#d97c55]"
                          : "bg-[#fcfbf9] border border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                    CATEGORY *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none"
                  >
                    <option value="senior">Senior</option>
                    <option value="junior">Junior</option>
                    <option value="sub-junior">Sub-Junior</option>
                    <option value="open">Open</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    DISCIPLINE
                  </label>
                  <select className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none">
                    <option>Indoor Handball</option>
                    <option>Beach Handball</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                    START DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                    END DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.end_date}
                    onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>
                <div className="sm:col-span-2 mt-4 pt-4 border-t border-dashed border-gray-200">
                  <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                    REGISTRATION END DATE *
                  </label>
                  <input
                    type="date"
                    required
                    value={form.registration_end_date}
                    onChange={(e) => setForm({ ...form, registration_end_date: e.target.value })}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1.5">
                    DISTRICT *
                  </label>
                  <select
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 appearance-none"
                  >
                    <option value="">Select district...</option>
                    {UP_DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] font-bold tracking-widest text-gray-800 uppercase mb-1.5">
                    VENUE (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. K.D. Singh Babu Stadium"
                    className="w-full bg-[#fcfbf9] border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-[#d97c55] text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[10px] text-gray-400 font-mono">
            Advanced custom fields available in the full editor
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
              className="flex-1 sm:flex-none bg-[#d97c55] text-white px-6 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#c16744] disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {loading ? "PUBLISHING..." : "PUBLISH EVENT"}
            </button>
          </div>
        </div>
      </form>

      {/* 04 PUBLISHED EVENTS (DELETE SECTION) */}
      <div className="p-6 border-t border-gray-100 bg-[#fcfbf9] rounded-b">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-dashed border-gray-200">
          <span className="text-[10px] font-bold text-[#d97c55]">04</span>
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#111827]">
            PUBLISHED EVENTS
          </h3>
        </div>
        
        <div className="space-y-3">
          {events.length === 0 ? (
            <div className="text-center py-6 text-gray-400 text-xs border border-dashed border-gray-200 rounded">
              No events have been published yet.
            </div>
          ) : (
            events.map((ev) => (
              <div key={ev.id} className="flex justify-between items-center bg-white p-4 border border-gray-200 rounded shadow-sm">
                <div>
                  <div className="font-bold text-sm text-[#111827]">{ev.name}</div>
                  <div className="text-xs text-gray-500">{ev.location} &middot; {ev.category.toUpperCase()}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{ev.start_date} to {ev.end_date}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(ev.id, ev.name)}
                  disabled={deleting === ev.id}
                  className="border border-red-200 text-red-500 hover:bg-red-50 disabled:opacity-50 px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase transition-colors"
                >
                  {deleting === ev.id ? "DELETING..." : "DELETE EVENT"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
