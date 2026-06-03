import CoachCertificationHero from "./CoachCertificationHero";
import CoachCertificationSidebar from "./CoachCertificationSidebar";
import CoachCertificationForm from "./CoachCertificationForm";

export default function CoachCertificationPage() {
  return (
    <main className="flex-1 bg-[#fcfbf9]">
      <CoachCertificationHero />
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        {/* Left Main Form Column */}
        <div className="w-full lg:w-2/3">
          <CoachCertificationForm />
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-1/3 relative">
          <div className="sticky top-28 space-y-6">
            <CoachCertificationSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
