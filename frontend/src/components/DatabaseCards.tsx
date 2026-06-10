import { Users, Shield, MapPin, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";

export default function DatabaseCards() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-12">
        <p className="text-gray-500 text-lg leading-relaxed">
          Access the official records of Uttar Pradesh's handball community. Browse registered referees, players, coaches, academies, and district units across the state.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
          <div>
            <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 01</div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
              <Shield className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Referees</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">
              View the roster of certified and accredited referees who officiate state, zonal, and national-level matches.
            </p>
          </div>
          <Link href="/database/referees" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
            View Referees &rarr;
          </Link>
        </div>

        {/* Card 2 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
          <div>
            <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 02</div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
              <Users className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Players</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">
              Explore the database of registered athletes from various districts, competing in numerous tournaments.
            </p>
          </div>
          <Link href="/database/players" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
            View Players &rarr;
          </Link>
        </div>

        {/* Card 3 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
          <div>
            <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 03</div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
              <Briefcase className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Coaches</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">
              Find licensed coaches who train and mentor handball talent across different districts and academies.
            </p>
          </div>
          <Link href="/database/coaches" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
            View Coaches &rarr;
          </Link>
        </div>

        {/* Card 4 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
          <div>
            <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 04</div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
              <GraduationCap className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">Academies</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">
              Discover registered handball academies fostering grassroots development and specialized training.
            </p>
          </div>
          <Link href="/database/academies" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
            View Academies &rarr;
          </Link>
        </div>

        {/* Card 5 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between md:col-span-2 lg:col-span-1">
          <div>
            <div className="text-accent text-sm font-semibold tracking-widest mb-6">— 05</div>
            <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center mb-6">
              <MapPin className="text-accent w-5 h-5" />
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">District Units</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-12">
              Find affiliated district associations and their respective office bearers managing handball at the local level.
            </p>
          </div>
          <Link href="/districts" className="text-accent text-sm font-bold tracking-widest uppercase hover:text-white transition-colors">
            View Districts &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
