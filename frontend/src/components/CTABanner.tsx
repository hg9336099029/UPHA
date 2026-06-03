import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-[#cd8562] rounded-md overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Graphic */}
        <div className="lg:w-1/2 p-8 lg:p-12 relative flex items-center justify-center min-h-[400px]">
          <div className="bg-[#fdfaf5] w-full max-w-md aspect-[4/3] rounded-sm shadow-xl p-8 relative flex flex-col items-center justify-center overflow-hidden border border-gray-200">
             {/* Schematic text */}
             <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-bold text-gray-500 tracking-widest uppercase">
               <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> UPHA / SCHEMATIC
             </div>
             
             {/* Court Graphic */}
             <div className="w-full h-full relative flex flex-col items-center justify-center mt-4">
               <div className="w-20 h-20 rounded-full bg-primary mb-8 relative z-10 border border-gray-800 shadow-inner flex items-center justify-center">
                 <div className="w-full h-[1px] bg-white/20"></div>
                 <div className="absolute h-full w-[1px] bg-white/20"></div>
               </div>
               
               <div className="relative z-10 font-heading text-8xl font-bold tracking-tighter text-primary">07</div>
               
               {/* Court semi-circle arch */}
               <div className="absolute bottom-0 w-[120%] h-[70%] border-t border-l border-r border-dashed border-gray-400 rounded-t-full opacity-60"></div>
               <div className="absolute bottom-0 w-[90%] h-[45%] border-t-2 border-l-2 border-r-2 border-accent rounded-t-full"></div>
             </div>
             
             {/* Bottom established */}
             <div className="absolute bottom-4 left-4 text-left">
               <div className="text-accent text-[8px] font-bold tracking-widest uppercase">ESTABLISHED</div>
               <div className="font-heading text-xl font-bold leading-none text-primary mt-1">1972</div>
             </div>
          </div>
        </div>

        {/* Right Side: Text & Actions */}
        <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center text-white bg-[#cd8562]">
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide leading-tight mb-6">
            READY TO TAKE THE COURT?
          </h2>
          <p className="text-white/90 text-lg md:text-xl leading-relaxed max-w-lg mb-10">
            Whether you&apos;re a player, coach, or referee, your journey with UPHA starts with a single registration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register" className="bg-white text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors inline-flex items-center justify-center rounded-sm">
              REGISTER NOW &rarr;
            </Link>
            <Link href="/contact" className="bg-transparent border border-white text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-colors inline-flex items-center justify-center rounded-sm">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
