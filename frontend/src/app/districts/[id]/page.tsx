import DistrictProfileHero from "./DistrictProfileHero";
import OfficeBearersSection from "./OfficeBearersSection";
import OfficeDetailsSection from "./OfficeDetailsSection";
import GetInvolvedSection from "./GetInvolvedSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DistrictProfilePage() {
  return (
    <main className="flex-1 bg-[#fcfbf9] min-h-screen pb-24">
      <DistrictProfileHero />
      
      <div className="max-w-7xl mx-auto px-6 mt-32">
        {/* Back Link */}
        <Link href="/districts" className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-primary transition-colors border border-gray-200 bg-white px-4 py-2.5 rounded-sm shadow-sm mb-16">
          <ArrowLeft className="w-3.5 h-3.5" />
          BACK TO ALL DISTRICTS
        </Link>
        
        {/* Sections */}
        <OfficeBearersSection />
        <OfficeDetailsSection />
        <GetInvolvedSection />
      </div>
    </main>
  );
}
