"use client";

import { User, CheckCircle, Shield, Building2, Users, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

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

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          
          {/* Card 1 */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-6">
            <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
              <div>
                <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 01</div>
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                  <User className="text-accent w-5 h-5" />
                </div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Player Registration</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  Open to all athletes between 12-35 years. Get your official UPHA player ID, district affiliation, and eligibility to compete in state and national tournaments.
                </p>
              </div>
              <Link href="/register/player" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Register as Player &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-6">
            <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
              <div>
                <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 02</div>
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                  <CheckCircle className="text-accent w-5 h-5" />
                </div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Coach Certification</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  For aspiring and certified handball coaches. Submit credentials, complete the UPHA accreditation process, and gain entry to nationally recognized coaching panels.
                </p>
              </div>
              <Link href="/register/coach" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Apply as Coach &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-6">
            <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
              <div>
                <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 03</div>
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                  <Shield className="text-accent w-5 h-5" />
                </div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Referee Accreditation</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  For licensed match officials. Register, take the annual qualifier, and join the UPHA officiating roster for state, zonal, and national-level matches.
                </p>
              </div>
              <Link href="/register/referee" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Apply as Referee &rarr;
              </Link>
            </div>
          </div>
          
          {/* Card 4 */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-6">
            <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
              <div>
                <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 04</div>
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                  <Building2 className="text-accent w-5 h-5" />
                </div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">District Affiliation</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  For district handball associations. File for official affiliation, submit committee details, and become a recognized unit under UPHA's state-wide network.
                </p>
              </div>
              <Link href="/register/district" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Apply as District &rarr;
              </Link>
            </div>
          </div>

          {/* Card 5 */}
          <div className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] min-w-0 pl-6">
            <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between h-full min-h-[400px]">
              <div>
                <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 05</div>
                <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
                  <Users className="text-accent w-5 h-5" />
                </div>
                <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Council Member</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-12">
                  For elected or appointed members of the UPHA executive council. Register to manage official duties, view documents, and access council privileges.
                </p>
              </div>
              <Link href="/register/council" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
                Register as Council Member &rarr;
              </Link>
            </div>
          </div>

        </div>
      </div>
      
      {/* Mobile scroll controls */}
      <div className="flex gap-2 mt-8 md:hidden justify-center">
        <button 
          onClick={scrollPrev} 
          disabled={!prevBtnEnabled}
          className={`w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center transition text-gray-600 ${!prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={scrollNext} 
          disabled={!nextBtnEnabled}
          className={`w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center transition text-gray-600 ${!nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
