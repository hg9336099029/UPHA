import { Users, Shield, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function DatabaseCards() {
  const cards = [
    {
      id: "01",
      title: "Referees",
      desc: "View the roster of certified and accredited referees who officiate state, zonal, and national-level matches.",
      href: "/database/referees",
      icon: <Shield className="w-5 h-5 text-[#d97c55]" />
    },
    {
      id: "02",
      title: "Players",
      desc: "Explore the database of registered athletes from various districts, competing in numerous tournaments.",
      href: "/database/players",
      icon: <Users className="w-5 h-5 text-[#d97c55]" />
    },
    {
      id: "03",
      title: "Coaches",
      desc: "Find licensed coaches who train and mentor handball talent across different districts and academies.",
      href: "/database/coaches",
      icon: <Briefcase className="w-5 h-5 text-[#d97c55]" />
    },
    {
      id: "04",
      title: "Academies",
      desc: "Discover registered handball academies fostering grassroots development and specialized training.",
      href: "/database/academies",
      icon: <GraduationCap className="w-5 h-5 text-[#d97c55]" />
    },
    {
      id: "05",
      title: "District Units",
      desc: "Find affiliated district associations and their respective office bearers managing handball at the local level.",
      href: "/districts",
      icon: <MapPin className="w-5 h-5 text-[#d97c55]" />
    }
  ];

  return (
    <section className="pb-16 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <div key={card.id} className={`bg-[#111827] p-8 rounded-sm text-white flex flex-col items-start justify-between ${idx === 4 ? "md:col-span-2 lg:col-span-1" : ""}`}>
            <div>
              <div className="text-[#d97c55] text-sm font-semibold tracking-widest mb-6">— {card.id}</div>
              <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                {card.icon}
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-12">
                {card.desc}
              </p>
            </div>
            <Link href={card.href} className="text-[#d97c55] text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
              View {card.title} &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
