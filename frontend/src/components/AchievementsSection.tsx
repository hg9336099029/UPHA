import Link from "next/link";

export default function AchievementsSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> HONOUR ROLL
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            ACHIEVEMENTS & <span className="text-accent">MEDAL TALLY</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            A legacy built one match at a time. UPHA athletes have brought honours to Uttar Pradesh on every stage — from district leagues to international podiums.
          </p>
        </div>
        <Link href="/achievements" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          ALL ACHIEVEMENTS &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
        {/* Left Side: Medal Tally */}
        <div className="bg-primary p-10 rounded-sm text-white relative">
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-gold"></div>
            <div className="flex-1 bg-silver"></div>
            <div className="flex-1 bg-bronze"></div>
          </div>
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">NATIONAL CHAMPIONSHIP</div>
              <h3 className="font-heading text-3xl font-bold uppercase tracking-wide">UTTAR PRADESH TALLY</h3>
            </div>
            <div className="font-heading text-5xl font-bold text-accent">2025</div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 md:gap-6 text-center">
            <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-bold text-primary mb-4 text-xl">G</div>
              <div className="font-heading text-4xl font-bold mb-2">14</div>
              <div className="text-xs tracking-widest text-gray-400 uppercase">GOLD</div>
            </div>
            <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-silver flex items-center justify-center font-bold text-primary mb-4 text-xl">S</div>
              <div className="font-heading text-4xl font-bold mb-2">21</div>
              <div className="text-xs tracking-widest text-gray-400 uppercase">SILVER</div>
            </div>
            <div className="bg-primary-light p-4 md:p-6 rounded flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-bronze flex items-center justify-center font-bold text-white mb-4 text-xl">B</div>
              <div className="font-heading text-4xl font-bold mb-2">28</div>
              <div className="text-xs tracking-widest text-gray-400 uppercase">BRONZE</div>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Story */}
        <div className="flex flex-col justify-center lg:pl-8">
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> FEATURED STORY
          </div>
          <h3 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide leading-tight mb-8">
            JUNIOR SQUAD CLINCHES GOLD AT THE 49TH NATIONAL CHAMPIONSHIP
          </h3>
          <div className="border-l-4 border-accent pl-6 mb-6">
            <p className="text-gray-600 text-xl md:text-2xl italic font-serif leading-relaxed">
              &quot;Years of grassroots work in our districts paid off on the national stage. This is just the beginning for UP handball.&quot;
            </p>
          </div>
          <p className="text-sm">
            <strong>— Dr. Anandeshwar Pandey</strong>, <span className="text-gray-500">Secretary General, UPHA</span>
          </p>
        </div>
      </div>
    </section>
  );
}
