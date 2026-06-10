import DashboardHeader from "./DashboardHeader";
import TournamentRecord from "./TournamentRecord";
import DigitalIdCard from "./DigitalIdCard";
import ProfileStatus from "./ProfileStatus";
import ProfileSummary from "./ProfileSummary";
import DashboardEvents from "./DashboardEvents";
import DashboardNotices from "./DashboardNotices";
import MyCertificates from "@/components/MyCertificates";

export default function PlayerDashboardPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header & Main Stats */}
        <DashboardHeader />
        
        {/* Tournament Banner */}
        <TournamentRecord />
        
        {/* ID Card & Profile Status */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-full lg:w-7/12">
            <DigitalIdCard />
          </div>
          <div className="w-full lg:w-5/12">
            <ProfileStatus />
          </div>
        </div>
        
        {/* Certificates */}
        <div className="mb-6">
          <MyCertificates />
        </div>
        
        {/* Profile Summary */}
        <div className="mb-6">
          <ProfileSummary />
        </div>
        
        {/* Events & Announcements */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-7/12">
            <DashboardEvents />
          </div>
          <div className="w-full lg:w-5/12">
            <DashboardNotices />
          </div>
        </div>
        
      </div>
    </main>
  );
}
