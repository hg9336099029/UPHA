export default function MandateSection() {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="border border-blue-200 border-dashed p-8 lg:p-12 relative before:absolute before:-inset-2 before:border before:border-blue-100 before:border-dashed">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          
          <div>
            <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="mr-2">— 01</span> / MANDATE
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">DEVELOP</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Identify and nurture talent through district-level scouting, junior leagues, and structured training pathways from grassroots to national.
            </p>
          </div>
          
          <div>
            <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="mr-2">— 02</span> / MANDATE
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">CERTIFY</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Standardise the sport across the state with accredited coaches, qualified referees, and verified player registries that meet HAI norms.
            </p>
          </div>
          
          <div>
            <div className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
              <span className="mr-2">— 03</span> / MANDATE
            </div>
            <h3 className="font-heading text-3xl font-bold uppercase tracking-wide mb-4">COMPETE</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Host state, zonal, and selection tournaments — and represent Uttar Pradesh at every national and international fixture on the calendar.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
