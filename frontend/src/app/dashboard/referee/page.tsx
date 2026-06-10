import RefereeDashboardHeader from "./RefereeDashboardHeader";
import OfficiatingRecord from "./OfficiatingRecord";
import RefereeIdCard from "./RefereeIdCard";
import RefereeProfileStatus from "./RefereeProfileStatus";
import RefereeProfileSummary from "./RefereeProfileSummary";
import UpcomingAssignments from "./UpcomingAssignments";
import RecentHistory from "./RecentHistory";
import RefereeNotices from "./RefereeNotices";
import MyCertificates from "@/components/MyCertificates";

export default function RefereeDashboardPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Main Stats */}
        <RefereeDashboardHeader />
        
        {/* Record Banner */}
        <OfficiatingRecord />
        
        {/* ID Card & Profile Status */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-7/12">
            <RefereeIdCard />
          </div>
          <div className="w-full lg:w-5/12">
            <RefereeProfileStatus />
          </div>
        </div>
        
        {/* Certificates */}
        <div className="mb-6">
          <MyCertificates />
        </div>
        
        {/* Profile Summary */}
        <div className="mb-6">
          <RefereeProfileSummary />
        </div>
        
        {/* Upcoming Assignments */}
        <div className="mb-6">
          <UpcomingAssignments />
        </div>
        
        {/* History & Announcements */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12">
            <RecentHistory />
          </div>
          <div className="w-full lg:w-5/12">
            <RefereeNotices />
          </div>
        </div>
        
      </div>
    </main>
  );
}
