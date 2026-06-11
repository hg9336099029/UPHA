"use client";

import React, { useEffect, useState } from "react";
import { getAdminStats, AdminStatsData } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { CheckSquare, CalendarDays, Trophy, Image as ImageIcon, UserPlus, Megaphone, Users, Award } from "lucide-react";

export type AdminTabType = "applications" | "create_event" | "upload_results" | "upload_gallery" | "invite_admin" | "publish_notice" | "council_members" | "manage_achievements";

export default function AdminDashboardHeader({
  activeTab,
  onTabChange,
}: {
  activeTab: AdminTabType;
  onTabChange: (tab: AdminTabType) => void;
}) {
  const { authUser } = useAuth();
  const [stats, setStats] = useState<AdminStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const dayName = today.toLocaleDateString("en-IN", { weekday: "long" }).toUpperCase();
  const dateStr = today.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        if (res.success) {
          setStats(res.stats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mb-12">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="text-[10px] font-bold tracking-widest text-[#d97c55] uppercase">ADMIN PANEL</div>
            <div className="bg-[#111827] text-white text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-sm">
              FEDERATION OFFICE
            </div>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide text-[#111827]">
            WELCOME, <span className="text-[#d97c55]">DR. PANDEY</span>
          </h1>
        </div>
        <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-4 md:mt-0 md:text-right">
          {dayName}<br />
          <span className="text-gray-800">{dateStr}</span>
        </div>
      </div>

      {/* Admin Toolkit Grid */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <h2 className="font-heading text-2xl font-bold uppercase tracking-wide text-[#111827]">
            ADMIN <span className="text-[#d97c55]">TOOLKIT</span>
          </h2>
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            SELECT A TAB TO MANAGE
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div 
            onClick={() => onTabChange("applications")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "applications" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">APPROVE APPLICATIONS</h3>
              <p className="text-xs text-gray-500 mb-6">Review pending registrations from players, coaches, referees, academies and districts.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-[#d97c55]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97c55]"></span>
                {stats?.total_pending || 0} PENDING
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "applications" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "applications" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => onTabChange("create_event")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "create_event" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <CalendarDays className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">CREATE / MODIFY EVENT</h3>
              <p className="text-xs text-gray-500 mb-6">Set up tournaments, trials, workshops and selection camps with registration rules.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {stats?.active_events || 0} ACTIVE &middot; {stats?.draft_events || 0} DRAFT
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "create_event" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "create_event" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div 
            onClick={() => onTabChange("upload_results")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "upload_results" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <Trophy className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">UPLOAD TOURNAMENT RESULTS</h3>
              <p className="text-xs text-gray-500 mb-6">Publish final standings, match scores and award winners for completed events.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-[#d97c55]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97c55]"></span>
                {stats?.results_awaiting || 0} AWAITING UPLOAD
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "upload_results" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "upload_results" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div 
            onClick={() => onTabChange("upload_gallery")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "upload_gallery" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">UPLOAD TOURNAMENT GALLERY</h3>
              <p className="text-xs text-gray-500 mb-6">Add photos, highlights and event-day pictures to the public tournament albums.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {stats?.gallery_albums || 0} ALBUMS LIVE
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "upload_gallery" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "upload_gallery" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div 
            onClick={() => onTabChange("invite_admin")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "invite_admin" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">INVITE ADMIN</h3>
              <p className="text-xs text-gray-500 mb-6">Add federation staff with role-based permissions and send them a secure invite link.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {stats?.active_admins || 0} ADMINS ACTIVE
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "invite_admin" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "invite_admin" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div 
            onClick={() => onTabChange("publish_notice")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "publish_notice" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <Megaphone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">PUBLISH NOTICE</h3>
              <p className="text-xs text-gray-500 mb-6">Broadcast federation announcements to all members, dashboards and the public website.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                {stats?.scheduled_notices || 0} SCHEDULED
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "publish_notice" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "publish_notice" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 7 */}
          <div 
            onClick={() => onTabChange("council_members")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "council_members" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">MANAGE COUNCIL MEMBERS</h3>
              <p className="text-xs text-gray-500 mb-6">Add, edit, or remove office bearers that appear on the council page and homepage.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                OFFICE BEARERS
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "council_members" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "council_members" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>

          {/* Card 8 */}
          <div 
            onClick={() => onTabChange("manage_achievements")}
            className={`cursor-pointer border rounded shadow-sm p-6 flex flex-col justify-between group transition-colors ${activeTab === "manage_achievements" ? "bg-[#fff8f6] border-[#d97c55]" : "bg-white border-gray-200 hover:border-gray-300"}`}
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center mb-4 text-[#d97c55]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm tracking-widest uppercase text-[#111827] mb-2">MANAGE ACHIEVEMENTS</h3>
              <p className="text-xs text-gray-500 mb-6">Add, edit, or remove national medals, player milestones, and federation awards.</p>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-gray-500">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                ACHIEVEMENTS
              </div>
              <div className={`text-[9px] font-bold tracking-widest uppercase flex items-center gap-1 ${activeTab === "manage_achievements" ? "text-[#d97c55]" : "text-[#111827] group-hover:text-[#d97c55]"}`}>
                {activeTab === "manage_achievements" ? "ACTIVE TAB" : "OPEN ↘"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 border-l-4 border-l-gray-400 shadow-sm rounded-sm p-5">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">TOTAL PENDING</div>
          <div className="font-heading text-3xl font-bold text-[#111827] mb-1">
            {loading ? "—" : stats?.total_pending ?? 0}
          </div>
          <div className="text-[10px] text-gray-400">Applications across all types</div>
        </div>

        <div className="bg-white border border-gray-200 border-l-4 border-l-[#3c8c7c] shadow-sm rounded-sm p-5">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">APPROVED TODAY</div>
          <div className="font-heading text-3xl font-bold text-[#111827] mb-1">
            {loading ? "—" : stats?.approved_today ?? 0}
          </div>
          <div className="text-[10px] text-gray-400">+3 from yesterday</div>
        </div>

        <div className="bg-white border border-gray-200 border-l-4 border-l-[#d97c55] shadow-sm rounded-sm p-5">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">ACTIVE EVENTS</div>
          <div className="font-heading text-3xl font-bold text-[#111827] mb-1">
            {loading ? "—" : (stats?.active_events || 0).toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-400">{stats?.draft_events || 0} draft in progress</div>
        </div>

        <div className="bg-white border border-gray-200 border-l-4 border-l-[#d97c55] shadow-sm rounded-sm p-5">
          <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-2">GALLERY ALBUMS</div>
          <div className="font-heading text-3xl font-bold text-[#111827] mb-1">
            {loading ? "—" : (stats?.gallery_albums || 0).toString().padStart(2, "0")}
          </div>
          <div className="text-[10px] text-gray-400">Across 2025-26 season</div>
        </div>
      </div>
    </div>
  );
}
