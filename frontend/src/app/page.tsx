
import HeroSection from "@/components/HeroSection";
import StatsBanner from "@/components/StatsBanner";
import AboutSection from "@/components/AboutSection";
import MandateSection from "@/components/MandateSection";
import EventsSection from "@/components/EventsSection";
import RegistrationCards from "@/components/RegistrationCards";
import AchievementsSection from "@/components/AchievementsSection";
import LeadershipSection from "@/components/LeadershipSection";
import CTABanner from "@/components/CTABanner";


export default function Home() {
  return (
    <main className="flex-1 bg-background text-foreground flex flex-col">

      <HeroSection />
      <StatsBanner />
      <AboutSection />
      <MandateSection />
      <EventsSection />
      <RegistrationCards />
      <AchievementsSection />
      <LeadershipSection />
      <CTABanner />

    </main>
  );
}
