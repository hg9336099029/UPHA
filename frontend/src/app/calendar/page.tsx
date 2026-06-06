import Link from "next/link";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
        <CalendarIcon className="w-10 h-10 text-accent" />
      </div>
      <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide text-primary mb-4">
        FULL CALENDAR <span className="text-accent">COMING SOON</span>
      </h1>
      <p className="text-gray-500 max-w-lg mb-8">
        We are currently finalizing the tournament schedules and fixtures for the upcoming season. The complete interactive calendar will be available here shortly.
      </p>
      <Link 
        href="/"
        className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-sm font-bold tracking-widest text-xs uppercase hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO HOME
      </Link>
    </div>
  );
}
