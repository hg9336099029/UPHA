import Link from "next/link";
import { Users, Construction } from "lucide-react";

export default function PlayersDatabasePage() {
  return (
    <div className="flex-1 bg-background text-foreground flex flex-col py-24 items-center justify-center">
      <div className="max-w-2xl text-center px-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-gray-200">
          <Users className="w-10 h-10 text-gray-400" />
        </div>
        
        <h1 className="text-4xl font-heading font-bold uppercase tracking-widest text-primary mb-4 flex items-center justify-center gap-3">
          Players Database <Construction className="w-6 h-6 text-accent" />
        </h1>
        
        <p className="text-gray-500 text-lg mb-10 leading-relaxed">
          The public players database is currently being populated and synchronized with district units. It will be available shortly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/database" className="border border-gray-200 text-primary px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors rounded-sm shadow-sm">
            &larr; Back to Databases
          </Link>
          <Link href="/register/player" className="bg-accent text-white px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-accent/90 transition-colors rounded-sm shadow-md">
            Register as Player
          </Link>
        </div>
      </div>
    </div>
  );
}
