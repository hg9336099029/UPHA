import Link from "next/link";

export default function RegisteredRefereesHero() {
  return (
    <div className="bg-[#111827] text-white pt-12 pb-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Breadcrumbs */}
        <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <span className="hover:text-white transition-colors cursor-pointer">DATABASE</span>
          <span>/</span>
          <span className="text-white">REGISTERED REFEREES</span>
        </div>
        
        {/* Title */}
        <h1 className="font-heading text-6xl md:text-7xl font-bold uppercase tracking-wide mb-6">
          REGISTERED <span className="text-accent">REFEREES</span>
        </h1>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="border border-white/20 px-3 py-1.5 rounded-sm bg-white/5">
            <span className="text-[9px] font-bold tracking-widest text-accent uppercase">SESSION 2025-26</span>
          </div>
          <div className="flex items-center gap-2 border border-white/20 px-3 py-1.5 rounded-sm bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-[9px] font-bold tracking-widest text-white uppercase">32 ACCREDITED</span>
          </div>
          <div className="border border-transparent px-3 py-1.5 text-[9px] font-bold tracking-widest text-gray-400 uppercase">
            OFFICIATING PANEL OF THE UPHA REFEREE BOARD
          </div>
        </div>
        
      </div>

      {/* Overlapping Stat Cards */}
      <div className="absolute left-0 right-0 -bottom-16 w-full z-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-gray-200 border border-gray-200 shadow-xl shadow-black/5 rounded-sm overflow-hidden">
          
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-accent uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> REGISTERED REFEREES
            </div>
            <div className="font-heading text-6xl font-bold text-primary mb-2">32</div>
            <div className="text-xs text-gray-500">Accredited officials on the panel for 2025-26</div>
          </div>
          
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-accent uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> DISTRICTS REPRESENTED
            </div>
            <div className="font-heading text-6xl font-bold text-primary mb-2">19</div>
            <div className="text-xs text-gray-500">Districts of Uttar Pradesh with registered referees</div>
          </div>
          
          <div className="bg-white p-8">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-accent uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> REFEREE BOARD
            </div>
            <div className="font-heading text-6xl font-bold text-primary mb-2">2</div>
            <div className="text-xs text-gray-500">Board members overseeing officiating standards</div>
          </div>

        </div>
      </div>
    </div>
  );
}
