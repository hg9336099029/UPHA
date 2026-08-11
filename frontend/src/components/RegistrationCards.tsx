"use client";

import { User, CheckCircle, Shield, Building2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const registrationData = [
  {
    id: "01",
    icon: <User className="text-accent w-5 h-5" />,
    title: "Player Registration",
    description: "Open to all athletes between 12-35 years. Get your official UPHA player ID, district affiliation, and eligibility to compete in state and national tournaments.",
    href: "/register/player",
    linkText: "Register as Player",
  },
  {
    id: "02",
    icon: <CheckCircle className="text-accent w-5 h-5" />,
    title: "Coach Certification",
    description: "For aspiring and certified handball coaches. Submit credentials, complete the UPHA accreditation process, and gain entry to nationally recognized coaching panels.",
    href: "/register/coach",
    linkText: "Apply as Coach",
  },
  {
    id: "03",
    icon: <Shield className="text-accent w-5 h-5" />,
    title: "Referee Accreditation",
    description: "For licensed match officials. Register, take the annual qualifier, and join the UPHA officiating roster for state, zonal, and national-level matches.",
    href: "/register/referee",
    linkText: "Apply as Referee",
  },
  {
    id: "04",
    icon: <Building2 className="text-accent w-5 h-5" />,
    title: "District Affiliation",
    description: "For district handball associations. File for official affiliation, submit committee details, and become a recognized unit under UPHA's state-wide network.",
    href: "/register/district",
    linkText: "Apply as District",
  },
  {
    id: "05",
    icon: <Building2 className="text-accent w-5 h-5" />,
    title: "Academy Affiliation",
    description: "For sports academies and clubs. File for official affiliation, submit committee details, and become a recognized unit under UPHA's network.",
    href: "/register/academy",
    linkText: "Apply as Academy",
  },
];

function RegistrationCard({ data }: { data: typeof registrationData[0] }) {
  return (
    <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
      <div>
        <div className="text-accent text-sm font-semibold tracking-widest mb-6">— {data.id}</div>
        <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
          {data.icon}
        </div>
        <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">{data.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-12">
          {data.description}
        </p>
      </div>
      <Link href={data.href} className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
        {data.linkText} &rarr;
      </Link>
    </div>
  );
}

export default function RegistrationCards() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps' });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="database" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
          <p className="text-gray-500 text-lg leading-relaxed">
            Join the official roster of Uttar Pradesh's handball community. Whether you play, coach, officiate, or manage a district unit — your registration unlocks access to events, accreditation, and grant programs.
          </p>
        </div>
        
        {/* Desktop Carousel Controls */}
        <div className="flex gap-2 shrink-0 hidden md:flex">
          <button
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
            className={`w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center transition text-gray-600 ${!prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
            className={`w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center transition text-gray-600 ${!nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* MOBILE LAYOUT: Vertical Stack (Hidden on Desktop) */}
      <div className="flex flex-col gap-6 md:hidden">
        {registrationData.map((data) => (
          <div key={data.id} className="w-full">
            <RegistrationCard data={data} />
          </div>
        ))}
      </div>

      {/* DESKTOP LAYOUT: Embla Carousel (Hidden on Mobile) */}
      <div className="hidden md:block">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {registrationData.map((data) => (
              <div key={data.id} className="flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] xl:flex-[0_0_calc(25%-18px)] min-w-0">
                <RegistrationCard data={data} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
