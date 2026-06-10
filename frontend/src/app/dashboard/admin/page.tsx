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

import { createEvent, CreateEventPayload } from "@/lib/api";

type TabType = "applications" | "create_event" | "upload_results" | "upload_gallery" | "invite_admin" | "publish_notice";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("applications");
  const [toast, setToast] = useState<string | null>(null);

  const handleTabChange = (tab: TabType) => {
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
          {activeTab === "applications" && (
            <>
              <div id="recent-applications" className="mb-12">
                <PendingReviewsTable />
              </div>
              <div className="mb-12">
                <RecentDecisionsLog />
              </div>
            </>
          )}

          {activeTab === "invite_admin" && (
            <InviteAdminModal />
          )}

          {activeTab === "publish_notice" && (
            <PublishNoticeModal />
          )}

          {activeTab === "create_event" && (
            <CreateEventModal onSubmit={handleCreateEvent} />
          )}

          {activeTab === "upload_results" && (
            <UploadResultsModal />
          )}

          {activeTab === "upload_gallery" && (
            <UploadGalleryModal />
          )}
        </div>
      </div>
    </main>
  );
}
