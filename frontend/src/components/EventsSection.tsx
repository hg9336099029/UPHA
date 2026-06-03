import { Globe, Trophy, Star, MapPin, Calendar } from "lucide-react";
import Link from "next/link";

export default function EventsSection() {
  return (
    <section id="events" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> TOURNAMENT CALENDAR
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            UPCOMING <span className="text-accent">EVENTS</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            From district selections to national qualifiers, follow every fixture on the UPHA calendar and register your participation in time.
          </p>
        </div>
        <Link href="/calendar" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          VIEW FULL CALENDAR &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
        
        {/* Card 1 */}
        <div className="border border-gray-200 rounded flex flex-col overflow-hidden">
          <div className="bg-primary h-48 relative flex items-center justify-center">
            <div className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-2 py-1 flex items-center gap-1 uppercase tracking-wider rounded-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span> LIVE NOW
            </div>
            <Globe className="w-16 h-16 text-accent/60 stroke-[1]" />
            <div className="absolute bottom-0 right-4 bg-white text-primary p-3 shadow-md font-heading text-center w-16">
              <div className="text-3xl font-bold leading-none">04</div>
              <div className="text-accent text-xs tracking-widest">MAY</div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">STATE CHAMPIONSHIP</div>
              <h3 className="font-bold text-xl mb-4 leading-tight">52nd UP State Senior Handball Championship</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" /> K.D. Singh Babu Stadium, Lucknow
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="w-4 h-4 text-gray-400" /> May 2 – May 6, 2026
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium"><strong className="text-primary">32 teams</strong> competing</span>
              <Link href="/events/1" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                VIEW SCORES &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="border border-gray-200 rounded flex flex-col overflow-hidden">
          <div className="bg-primary h-48 relative flex items-center justify-center">
            <div className="absolute top-4 left-4 bg-white/20 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
              UPCOMING
            </div>
            <Trophy className="w-16 h-16 text-accent/60 stroke-[1]" />
            <div className="absolute bottom-0 right-4 bg-white text-primary p-3 shadow-md font-heading text-center w-16">
              <div className="text-3xl font-bold leading-none">22</div>
              <div className="text-accent text-xs tracking-widest">MAY</div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">NATIONAL QUALIFIER</div>
              <h3 className="font-bold text-xl mb-4 leading-tight">North Zone Junior Handball Selection Trials</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Sports College Ground, Varanasi
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="w-4 h-4 text-gray-400" /> May 22 – May 24, 2026
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Reg. closes <strong>May 15</strong></span>
              <Link href="/events/2/register" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                REGISTER &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="border border-gray-200 rounded flex flex-col overflow-hidden">
          <div className="bg-primary h-48 relative flex items-center justify-center">
            <div className="absolute top-4 left-4 bg-white/20 text-white text-xs font-bold px-2 py-1 uppercase tracking-wider rounded-sm">
              REG. OPEN
            </div>
            <Star className="w-16 h-16 text-accent/60 stroke-[1]" />
            <div className="absolute bottom-0 right-4 bg-white text-primary p-3 shadow-md font-heading text-center w-16">
              <div className="text-3xl font-bold leading-none">14</div>
              <div className="text-accent text-xs tracking-widest">JUN</div>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-2">INTER-DISTRICT</div>
              <h3 className="font-bold text-xl mb-4 leading-tight">UPHA Beach Handball League — Season 4</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 text-gray-400" /> Multiple District Venues
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                <Calendar className="w-4 h-4 text-gray-400" /> Jun 14 – Jul 20, 2026
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 font-medium">Reg. closes <strong>Jun 5</strong></span>
              <Link href="/events/3/register" className="text-accent text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
                REGISTER &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
