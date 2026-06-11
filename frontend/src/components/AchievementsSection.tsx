"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { listAchievements, NationalMedalData, PlayerAchievementData } from "@/lib/api";

export default function AchievementsSection() {
  const [medals, setMedals] = useState<NationalMedalData[]>([]);
  const [players, setPlayers] = useState<any[]>([]);
  const [coaches, setCoaches] = useState<any[]>([]);
  const [awards, setAwards] = useState<any[]>([]);
  const [featured, setFeatured] = useState<NationalMedalData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await listAchievements();
        if (res.success) {
          if (res.medals) setMedals(res.medals);
          if (res.players) setPlayers(res.players);
          if (res.coaches) setCoaches(res.coaches);
          if (res.awards) setAwards(res.awards);
          // Set the most recent GOLD medal as the featured story, or just the most recent medal
          const goldMedals = (res.medals || []).filter(m => m.medal_type === 'GOLD');
          if (goldMedals.length > 0) {
            setFeatured(goldMedals[0]);
          } else if (res.medals && res.medals.length > 0) {
            setFeatured(res.medals[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load achievements:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate actual tallies
  const goldCount = medals.filter(m => m.medal_type === 'GOLD').length;
  const silverCount = medals.filter(m => m.medal_type === 'SILVER').length;
  const bronzeCount = medals.filter(m => m.medal_type === 'BRONZE').length;

  return (
    <section id="achievements" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> HONOUR ROLL
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            ACHIEVEMENTS & <span className="text-accent">MEDAL TALLY</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            A legacy built one match at a time. UPHA athletes have brought honours to Uttar Pradesh on every stage — from district leagues to international podiums.
          </p>
        </div>
        <Link href="/achievements" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          ALL ACHIEVEMENTS &rarr;
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
          {/* Left Side: Medal Tally */}
          <div className="bg-primary p-10 rounded-sm text-white relative">
            <div className="absolute top-0 left-0 right-0 h-1 flex">
              <div className="flex-1 bg-gold"></div>
              <div className="flex-1 bg-silver"></div>
              <div className="flex-1 bg-bronze"></div>
            </div>
            <div className="flex justify-between items-center mb-16">
              <div>
                <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">NATIONAL CHAMPIONSHIP</div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide">UTTAR PRADESH TALLY</h3>
              </div>
              <div className="font-heading text-5xl font-bold text-accent">ALL</div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
              <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-bold text-primary mb-4 text-xl">G</div>
                <div className="font-heading text-4xl font-bold mb-2">{goldCount < 10 && goldCount > 0 ? `0${goldCount}` : goldCount}</div>
                <div className="text-xs tracking-widest text-gray-400 uppercase">GOLD</div>
              </div>
              <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-silver flex items-center justify-center font-bold text-primary mb-4 text-xl">S</div>
                <div className="font-heading text-4xl font-bold mb-2">{silverCount < 10 && silverCount > 0 ? `0${silverCount}` : silverCount}</div>
                <div className="text-xs tracking-widest text-gray-400 uppercase">SILVER</div>
              </div>
              <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-bronze flex items-center justify-center font-bold text-white mb-4 text-xl">B</div>
                <div className="font-heading text-4xl font-bold mb-2">{bronzeCount < 10 && bronzeCount > 0 ? `0${bronzeCount}` : bronzeCount}</div>
                <div className="text-xs tracking-widest text-gray-400 uppercase">BRONZE</div>
              </div>
            </div>
          </div>

          {/* Right Side: Featured Story */}
          {featured ? (
            <div className="flex flex-col justify-center lg:pl-8">
              <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-accent inline-block"></span> FEATURED STORY ({featured.year})
              </div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-8">
                {featured.title}
              </h3>
              <div className="border-l-4 border-accent pl-6 mb-6">
                <p className="text-gray-600 text-xl md:text-2xl italic font-serif leading-relaxed">
                  &quot;{featured.description}&quot;
                </p>
              </div>
              <p className="text-sm">
                <strong>Result:</strong> <span className="text-gray-500 uppercase">{featured.result} ({featured.category})</span>
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center lg:pl-8">
               <div className="text-gray-400 italic">More achievements coming soon...</div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
