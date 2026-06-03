import Link from "next/link";

export default function AffiliationCTA() {
  return (
    <div className="bg-gradient-to-br from-[#d97c55] to-[#c16744] rounded-sm p-12 md:p-16 mb-24 relative overflow-hidden shadow-lg">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="text-white max-w-2xl">
          <div className="text-[10px] font-bold tracking-widest uppercase mb-4 opacity-80">
            &mdash; IS YOUR DISTRICT MISSING?
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide mb-6 leading-tight">
            15 DISTRICTS OF UP ARE NOT YET ON THIS LIST.
          </h2>
          <p className="text-white/90 text-lg leading-relaxed font-serif">
            If your district has a registered handball association, file for affiliation today. UPHA&apos;s network is open to every district committee that meets the federation&apos;s eligibility requirements.
          </p>
        </div>
        
        <div className="shrink-0 flex flex-col items-center md:items-end w-full md:w-auto">
          <Link href="/register/district" className="w-full md:w-auto bg-[#111827] text-white px-8 py-5 text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors rounded-sm text-center shadow-md">
            APPLY FOR AFFILIATION &rarr;
          </Link>
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/70 mt-4">
            ANNUAL FEE - ₹ 1,100 · 12-15 MIN
          </div>
        </div>
      </div>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
    </div>
  );
}
