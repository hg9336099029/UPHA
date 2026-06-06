import Link from "next/link";
import Image from "next/image";

export default function LeadershipSection() {
  const leaders = [
    {
      role: "CHAIRMAN",
      name: "DR. SUDHIR M. BOBDE",
      details: "Office: Lucknow",
      bgColor: "bg-gray-200",
      image: "/leader-1.png"
    },
    {
      role: "PRESIDENT",
      name: "SMT. ALKA DAS",
      details: "Office: Lucknow",
      bgColor: "bg-gray-300",
      image: "/leader-2.png"
    },
    {
      role: "TREASURER",
      name: "VINAY KUMAR SINGH",
      details: "+91 75700 99990",
      bgColor: "bg-yellow-100",
      image: "/leader-3.png"
    },
    {
      role: "EXEC. SECRETARY GENERAL",
      name: "AMIT PANDEY",
      details: "+91 70849 00009",
      bgColor: "bg-pink-100",
      image: "/leader-4.png"
    },
    {
      role: "SECRETARY GENERAL",
      name: "DR. ANANDESHWAR PANDEY",
      details: "+91 94150 22230",
      bgColor: "bg-gray-300",
      image: "/leader-5.png"
    }
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent inline-block"></span> LEADERSHIP
          </div>
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-wide">
            OFFICE <span className="text-accent">BEARERS</span>
          </h2>
          <p className="text-gray-500 max-w-lg mt-6 text-lg leading-relaxed">
            Meet the team steering UPHA&apos;s mission across the state — from grassroots outreach to international representation.
          </p>
        </div>
        <Link href="/#council" className="text-primary font-semibold text-sm uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-colors mt-6 md:mt-0 whitespace-nowrap">
          FULL COUNCIL &rarr;
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
        {leaders.map((leader, index) => (
          <div key={index} className="border border-gray-100 rounded bg-white shadow-sm overflow-hidden flex flex-col">
            <div className={`h-48 ${leader.bgColor} w-full relative flex items-center justify-center`}>
              <div className="w-full h-full relative">
                 <Image src={leader.image} alt={leader.name} fill className="object-cover object-center" />
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
              <div>
                <div className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1">{leader.role}</div>
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide leading-tight mb-4">{leader.name}</h3>
              </div>
              <div className="text-gray-500 text-xs">
                {leader.details}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
