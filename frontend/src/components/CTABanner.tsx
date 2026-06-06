import Link from "next/link";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="bg-[#cd8562] rounded-md overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Graphic */}
        <div className="lg:w-1/2 p-8 lg:p-12 relative flex items-center justify-center min-h-[400px]">
          <div className="bg-[#fdfaf5] w-full max-w-md rounded-sm shadow-xl p-4 relative flex flex-col items-center justify-center overflow-hidden border border-gray-200">
            <Image src="/handball-ground.png" alt="Handball Ground Schematic" width={600} height={600} className="w-full h-auto object-contain" />
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
