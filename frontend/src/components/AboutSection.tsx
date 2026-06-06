import Link from "next/link";

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        
        {/* Left Side */}
        <div className="w-full lg:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            <div className="text-accent text-sm font-semibold tracking-widest uppercase">
              ABOUT US - UPHA
            </div>
          </div>
          
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide leading-tight mb-8">
            FIVE DECADES OF <span className="text-accent">INDIAN HANDBALL.</span>
          </h2>
          
          <p className="text-gray-800 text-xl md:text-2xl font-medium leading-relaxed mb-6">
            The Uttar Pradesh Handball Association is the recognised state body for the sport — the bridge between local talent and the national stage.
          </p>
          
          <p className="text-gray-500 leading-relaxed mb-10">
            From the courts of Lucknow&apos;s K.D. Singh Babu Stadium to inter-zonal tournaments across India, UPHA&apos;s mandate is plainspoken: develop players, certify coaches and referees, host competitions, and represent Uttar Pradesh wherever the game is played. Our work spans 75 affiliated districts, thousands of registered athletes, and a growing roster of tournaments that feed directly into the national pipeline.
          </p>
          
          <Link href="/#about" className="text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors">
            READ OUR FULL HISTORY &rarr;
          </Link>
        </div>

        {/* Right Side - Federation Profile Table */}
        <div className="w-full lg:w-1/2 flex items-center">
          <div className="w-full border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            
            <div className="bg-primary text-white p-4 flex items-center gap-3">
               <span className="w-2 h-2 rounded-full bg-accent"></span>
               <h3 className="font-heading text-sm tracking-widest uppercase font-bold">FEDERATION PROFILE</h3>
            </div>
            
            <div className="bg-[#fcfbf9]">
              <div className="flex flex-col sm:flex-row border-b border-gray-200 p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">ESTABLISHED</div>
                <div className="sm:w-2/3 font-medium text-sm">1972</div>
              </div>
              
              <div className="flex flex-col sm:flex-row border-b border-gray-200 p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">HEADQUARTERS</div>
                <div className="sm:w-2/3 font-medium text-sm">K.D. Singh Babu Stadium, Lucknow</div>
              </div>
              
              <div className="flex flex-col sm:flex-row border-b border-gray-200 p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">BRANCH OFFICE</div>
                <div className="sm:w-2/3 font-medium text-sm">Chandpur, Varanasi</div>
              </div>
              
              <div className="flex flex-col sm:flex-row border-b border-gray-200 p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">JURISDICTION</div>
                <div className="sm:w-2/3 font-medium text-sm">State of Uttar Pradesh</div>
              </div>
              
              <div className="flex flex-col sm:flex-row border-b border-gray-200 p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">RECOGNISED BY</div>
                <div className="sm:w-2/3 font-medium text-sm">Handball Association of India</div>
              </div>
              
              <div className="flex flex-col sm:flex-row p-4">
                <div className="sm:w-1/3 text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-1 sm:mb-0">AFFILIATED TO</div>
                <div className="sm:w-2/3 font-medium text-sm">UP Olympic Association</div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </section>
  );
}
