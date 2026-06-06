import Link from "next/link";
import Image from "next/image";


export default function HeroSection() {
  return (
    <section className="bg-[#151e2b] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col lg:flex-row items-center relative z-10">

        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pr-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            <div className="text-accent text-xs font-semibold tracking-widest uppercase">
              EST. 1972 · AFFILIATED WITH HAI
            </div>
          </div>

          <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-wide leading-[0.9] mb-4">
            KHELEGA INDIA<br />
            <span className="text-accent">KHILEGA INDIA</span>
          </h1>

          <p className="text-gold text-2xl font-serif italic mb-6">
            &quot;When India plays, India blooms.&quot;
          </p>

          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-8">
            The Uttar Pradesh Handball Association is the official governing body for the sport across the state — fostering grassroots talent, world-class athletes, and the spirit of the game in every district.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors inline-flex items-center justify-center rounded-sm">
              BECOME A MEMBER &rarr;
            </Link>
            <Link href="/#events" className="bg-transparent border border-gray-600 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-colors inline-flex items-center justify-center rounded-sm">
              UPCOMING TOURNAMENTS
            </Link>
          </div>

          <div className="w-full max-w-lg h-[1px] bg-white/10 mt-8 mb-6"></div>

          {/* Affiliations */}
          <div className="flex items-start gap-12">
            <div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">AFFILIATED WITH</div>
              <div className="font-bold text-sm">Handball Association of India</div>
              {/* HAI Logo */}
              <div className="mt-2 text-accent text-xl font-heading flex items-center gap-2">
                <Image src="/HAI.png" alt="HAI Logo" width={80} height={80} className="object-contain" />
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">RECOGNIZED BY</div>
              <div className="font-bold text-sm">UP Olympic Association</div>
              {/* UPOA Logo */}
              <div className="mt-2 text-blue-400 text-xl font-heading flex items-center gap-2">
                <Image src="/UPOA.png" alt="UPOA Logo" width={80} height={80} className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Graphic */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center opacity-90">
          {/* Abstract silhouette of handball player */}
          <div className="relative z-10 w-full max-w-lg flex justify-center items-center">
            <Image src="/hero-section.png" alt="Handball Player Silhouette" width={600} height={600} className="object-contain" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
