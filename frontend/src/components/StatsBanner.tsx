export default function StatsBanner() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-primary border-t-4 border-accent shadow-2xl -mt-10 lg:-mt-16 rounded-sm overflow-hidden">
          
          <div className="p-8 md:p-12 border-b md:border-b-0 border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2">75</div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              AFFILIATED DISTRICTS
            </div>
          </div>
          
          <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              5,200<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              REGISTERED PLAYERS
            </div>
          </div>
          
          <div className="p-8 md:p-12 border-r border-white/10 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              240<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              CERTIFIED COACHES
            </div>
          </div>
          
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="font-heading text-5xl md:text-6xl font-bold text-accent mb-2 flex items-baseline">
              120<span className="text-3xl ml-1">+</span>
            </div>
            <div className="text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
              ANNUAL TOURNAMENTS
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
