import AdminDashboardHeader from "./AdminDashboardHeader";
import PendingReviewsTable from "./PendingReviewsTable";
import AdminEventsManager from "./AdminEventsManager";
import RecentDecisionsLog from "./RecentDecisionsLog";

export default function AdminDashboardPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header & Main Stats */}
        <AdminDashboardHeader />

        {/* Main Data Table */}
        <div className="mb-12">
          <PendingReviewsTable />
        </div>

        {/* Recent Decisions Log */}
        <div className="mb-12">
          <RecentDecisionsLog />
        </div>

        {/* Events Management */}
        <div>
          <AdminEventsManager />
        </div>

      </div>
    </main>
  );
}
