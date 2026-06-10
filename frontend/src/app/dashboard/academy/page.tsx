import AcademyDashboardHeader from "./AcademyDashboardHeader";
import AcademyRecord from "./AcademyRecord";
import AcademyIdCard from "./AcademyIdCard";
import AcademyProfileStatus from "./AcademyProfileStatus";
import AcademyDetailsSummary from "./AcademyDetailsSummary";
import AcademyPlayersGrid from "./AcademyPlayersGrid";
import AcademyStaffAndSchedule from "./AcademyStaffAndSchedule";
import AcademyNotices from "./AcademyNotices";
import MyCertificates from "@/components/MyCertificates";

export default function AcademyDashboardPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Main Stats */}
        <AcademyDashboardHeader />
        
        {/* Tournament Banner */}
        <AcademyRecord />
        
        {/* ID Card & Profile Status */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-7/12">
            <AcademyIdCard />
          </div>
          <div className="w-full lg:w-5/12">
            <AcademyProfileStatus />
          </div>
        </div>
        
        {/* Certificates */}
        <div className="mb-6">
          <MyCertificates />
        </div>
        
        {/* Academy Details Summary */}
        <div className="mb-6">
          <AcademyDetailsSummary />
        </div>

        {/* Players Grid */}
        <div className="mb-6">
          <AcademyPlayersGrid />
        </div>
        
        {/* Staff & Schedule */}
        <div className="mb-6">
          <AcademyStaffAndSchedule />
        </div>

        {/* Announcements */}
        <div>
          <AcademyNotices />
        </div>
        
      </div>
    </main>
  );
}
