import { User, CheckCircle, Shield } from "lucide-react";
import Link from "next/link";

export default function RegistrationCards() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="max-w-2xl mb-12">
        <p className="text-gray-500 text-lg leading-relaxed">
          Join the official roster of Uttar Pradesh&apos;s handball community. Whether you play, coach, or officiate — your registration unlocks access to events, accreditation, and grant programs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
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

        {/* Card 2 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
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

        {/* Card 3 */}
        <div className="bg-primary p-8 rounded-sm text-white flex flex-col items-start justify-between">
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
    </section>
  );
}
