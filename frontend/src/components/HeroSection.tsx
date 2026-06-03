import Link from "next/link";


export default function HeroSection() {
  return (
    <section className="bg-primary text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center relative z-10">
        
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pr-12">
          <div className="flex items-center gap-4 mb-8">
            <span className="w-8 h-[1px] bg-accent inline-block"></span>
            <div className="text-accent text-xs font-semibold tracking-widest uppercase">
              EST. 1972 · AFFILIATED WITH HAI
            </div>
          </div>
          
          <h1 className="font-heading text-6xl md:text-8xl font-bold uppercase tracking-wide leading-[0.9] mb-6">
            KHELEGA INDIA<br />
            <span className="text-accent">KHILEGA INDIA</span>
          </h1>
          
          <p className="text-accent text-2xl font-serif italic mb-8">
            &quot;When India plays, India blooms.&quot;
          </p>
          
          <p className="text-gray-400 text-lg leading-relaxed max-w-lg mb-12">
            The Uttar Pradesh Handball Association is the official governing body for the sport across the state — fostering grassroots talent, world-class athletes, and the spirit of the game in every district.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
            <Link href="/register" className="bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors inline-flex items-center justify-center rounded-sm">
              BECOME A MEMBER &rarr;
            </Link>
            <Link href="/events" className="bg-transparent border border-gray-600 text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white/5 transition-colors inline-flex items-center justify-center rounded-sm">
              UPCOMING TOURNAMENTS
            </Link>
          </div>
          
          {/* Affiliations */}
          <div className="mt-16 flex items-end gap-12">
            <div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">AFFILIATED WITH</div>
              <div className="font-bold text-sm">Handball Association of India</div>
              {/* HAI Logo Placeholder */}
              <div className="mt-2 text-accent text-xl font-heading flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">HAI</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase mb-3">RECOGNIZED BY</div>
              <div className="font-bold text-sm">UP Olympic Association</div>
              {/* UPOA Logo Placeholder */}
              <div className="mt-2 text-blue-400 text-xl font-heading flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full border border-gray-500 flex items-center justify-center text-[10px]">UPOA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content / Graphic */}
        <div className="w-full lg:w-1/2 mt-16 lg:mt-0 relative flex justify-center opacity-90">
           {/* Abstract silhouette of handball player */}
           <div className="w-[400px] h-[500px] bg-gray-200/10 rounded-[100px] rotate-12 blur-3xl absolute top-0 -right-20"></div>
           <svg viewBox="0 0 500 600" className="w-full max-w-lg h-auto relative z-10 fill-gray-200 drop-shadow-2xl opacity-90" xmlns="http://www.w3.org/2000/svg">
              <path d="M293.4,49.2C296,28,284.5,9.6,263.2,7C241.9,4.4,222.1,19.3,219.5,40.5c-2.6,21.2,8.9,39.6,30.2,42.2 C271,85.3,290.8,70.4,293.4,49.2z M353.4,240.2c-5.7-18-20.9-42.3-33-59l-34.9-46.7c-7.3-9.5-19.1-15.6-31.4-15.6l-50.6,0 c-18,0-35.3,6.5-49,18.4L114.7,171l-14,21.5l38.2,34.2l34.4-23.7l9.4,40.9l-13.8,47.8c-1,3.4-3.5,6-7,6.8L93.7,314.1 c-14.7,3.5-31.5-12.7-27.1-26l10.9-32.9c0,0-17.1-4.7-25-6.8c-1.8-0.5-3.8,0.2-4.9,1.7l-9.1,12.7c-3.1,4.3-1,10.6,4,12.3l20.4,6.8 c-7.6,18.4-18.1,39.9-24,51.8c-3.3,6.6-0.3,14.6,6.5,17.2l20.4,7.8c5.4,2.1,11.5-0.1,14.5-5l16.1-26.6c4.5-7.4,12.5-11.9,21.1-11.9 l57.5,0l12,50l48.5,134.4c5.1,14.1,20.6,21.1,34.7,15.6c13.7-5.4,20-20.6,14.8-34.1L239,363l-20.3-64.8l21.9-63.5l14.6,27.3 c6,11.3,17.2,18.3,29.9,18.3l70.7,0l26.6,5.3l11.6,2.3c7.5,1.5,14.8-3,16.8-10.5l4-14.9C416.7,255.4,411.3,247,403.9,245.5z M449.6,128.8c-18.7,0-33.9,15.2-33.9,33.9s15.2,33.9,33.9,33.9s33.9-15.2,33.9-33.9C483.5,144,468.3,128.8,449.6,128.8z"/>
           </svg>
        </div>
      </div>
    </section>
  );
}
