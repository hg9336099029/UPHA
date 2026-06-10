"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { listOfficeBearers, OfficeBearerData } from "@/lib/api";

export default function LeadershipSection() {
  const [leaders, setLeaders] = useState<OfficeBearerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaders() {
      try {
        const res = await listOfficeBearers();
        if (res.success && res.office_bearers) {
          setLeaders(res.office_bearers.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to load office bearers:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaders();
  }, []);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> LEADERSHIP
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            OFFICE <span className="text-accent">BEARERS</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            Meet the team steering UPHA&apos;s mission across the state — from grassroots outreach to international representation.
          </p>
        </div>
        <Link href="/council" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          FULL COUNCIL &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        ) : (
          Array.from({ length: Math.max(5, leaders.length) }).map((_, index) => {
            const leader = leaders[index];
            if (leader) {
              return (
                <div key={index} className="border border-gray-100 rounded bg-white shadow-sm overflow-hidden flex flex-col">
                  <div className="h-48 bg-gray-200 w-full relative flex items-center justify-center">
                    <div className="w-full h-full relative">
                      {leader.image ? (
                        <Image src={leader.image} alt={leader.name} fill className="object-cover object-center" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">No Image</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                    <div>
                      <div className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1">{leader.role}</div>
                      <h3 className="font-heading text-lg font-bold uppercase tracking-wide leading-tight mb-4">{leader.name}</h3>
                    </div>
                    <div className="text-gray-500 text-xs opacity-0">
                      &nbsp;
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={`empty-${index}`} className="border border-dashed border-gray-200 rounded bg-gray-50 shadow-sm overflow-hidden flex flex-col opacity-60">
                  <div className="h-48 bg-gray-100 w-full relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                    <div>
                      <div className="text-gray-400 text-[10px] font-bold tracking-widest uppercase mb-1">POSITION VACANT</div>
                      <h3 className="font-heading text-lg font-bold uppercase tracking-wide leading-tight mb-4 text-gray-400">TO BE APPOINTED</h3>
                    </div>
                    <div className="text-gray-500 text-xs opacity-0">
                      &nbsp;
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>
    </section>
  );
}
