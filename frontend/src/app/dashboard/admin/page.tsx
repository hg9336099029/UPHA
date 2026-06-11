"use client";

import { useState } from "react";
import AdminDashboardHeader from "./AdminDashboardHeader";
import PendingReviewsTable from "./PendingReviewsTable";
import RecentDecisionsLog from "./RecentDecisionsLog";

import InviteAdminModal from "./InviteAdminModal";
import PublishNoticeModal from "./PublishNoticeModal";
import CreateEventModal from "./CreateEventModal";
import UploadResultsModal from "./UploadResultsModal";
import UploadGalleryModal from "./UploadGalleryModal";
import CouncilMembersTable from "./CouncilMembersTable";
import ManageAchievements from "./ManageAchievements";
import { AdminTabType } from "./AdminDashboardHeader";

import { createEvent, CreateEventPayload } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";



export default function AdminDashboardPage() {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<AdminTabType>("applications");
  const [toast, setToast] = useState<string | null>(null);

  const handleTabChange = (tab: AdminTabType) => {
    setActiveTab(tab);
  };

  const handleCreateEvent = async (form: CreateEventPayload) => {
    try {
      await createEvent(form);
      setToast("Event created successfully!");
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      setToast(`Error: ${err.message || "Failed to create event"}`);
      setTimeout(() => setToast(null), 4000);
    }
  };

  useEffect(() => {
    if (!loading && (!authUser || authUser.role !== "admin")) {
      router.push("/login");
    }
  }, [loading, authUser, router]);

  if (loading || !authUser || authUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d97c55]"></div>
      </div>
    );
  }

  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pt-12 pb-24 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 right-6 z-50 bg-[#111827] text-white px-6 py-3 rounded text-xs font-bold tracking-widest shadow-xl">
          {toast}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Main Stats */}
        <AdminDashboardHeader activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab Content Area */}
        <div className="mt-8">
          {/* Always show the main dashboard content */}
          <div id="recent-applications" className="mb-12">
            <PendingReviewsTable />
          </div>
          <div className="mb-12">
            <RecentDecisionsLog />
          </div>

          {/* Render active tab as a popup modal if it's not the main dashboard view */}
          {activeTab !== "applications" && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/60 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
              <div className="relative w-full max-w-4xl my-auto">
                {/* Close Button */}
                <button
                  onClick={() => setActiveTab("applications")}
                  className="absolute top-6 right-6 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors shadow"
                  aria-label="Close modal"
                >
                  ✕
                </button>
                
                <div className="w-full max-h-[90vh] overflow-y-auto rounded shadow-2xl relative z-10 bg-white">
                  {activeTab === "invite_admin" && <InviteAdminModal onClose={() => setActiveTab("applications")} />}
                  {activeTab === "publish_notice" && <PublishNoticeModal />}
                  {activeTab === "create_event" && <CreateEventModal onSubmit={async (form) => {
                      await handleCreateEvent(form);
                      setActiveTab("applications");
                  }} />}
                  {activeTab === "upload_results" && <UploadResultsModal />}
                  {activeTab === "upload_gallery" && <UploadGalleryModal />}
                  {activeTab === "council_members" && <CouncilMembersTable />}
                  {activeTab === "manage_achievements" && <ManageAchievements />}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
