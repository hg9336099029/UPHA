import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Full Council | UPHA",
  description: "Meet the complete Executive Council of the Uttar Pradesh Handball Association.",
};

const councilCategories = [
  {
    category: "EXECUTIVE BOARD",
    members: [
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
    ]
  },
  {
    category: "VICE PRESIDENTS",
    members: [
      { role: "VICE PRESIDENT", name: "MR. RAJESH TIWARI", details: "Zone A", bgColor: "bg-blue-50", image: null },
      { role: "VICE PRESIDENT", name: "MR. SANJEEV KUMAR", details: "Zone B", bgColor: "bg-green-50", image: null },
      { role: "VICE PRESIDENT", name: "MS. ANITA SHARMA", details: "Zone C", bgColor: "bg-purple-50", image: null },
      { role: "VICE PRESIDENT", name: "MR. DEEPAK SINGH", details: "Zone D", bgColor: "bg-orange-50", image: null },
    ]
  },
  {
    category: "JOINT SECRETARIES",
    members: [
      { role: "JOINT SECRETARY", name: "MR. RAHUL VERMA", details: "Administration", bgColor: "bg-gray-50", image: null },
      { role: "JOINT SECRETARY", name: "MR. VIKAS YADAV", details: "Events", bgColor: "bg-gray-50", image: null },
      { role: "JOINT SECRETARY", name: "MS. PRIYANKA GUPTA", details: "Women's Development", bgColor: "bg-gray-50", image: null },
    ]
  },
  {
    category: "EXECUTIVE MEMBERS",
    members: [
      { role: "EXECUTIVE MEMBER", name: "MR. ANIL CHATURVEDI", details: "Member", bgColor: "bg-gray-50", image: null },
      { role: "EXECUTIVE MEMBER", name: "MR. SURENDRA PATEL", details: "Member", bgColor: "bg-gray-50", image: null },
      { role: "EXECUTIVE MEMBER", name: "MR. MANISH MISHRA", details: "Member", bgColor: "bg-gray-50", image: null },
      { role: "EXECUTIVE MEMBER", name: "MS. KAVITA RANI", details: "Member", bgColor: "bg-gray-50", image: null },
      { role: "EXECUTIVE MEMBER", name: "MR. ASHOK PANDEY", details: "Member", bgColor: "bg-gray-50", image: null },
    ]
  }
];

export default function CouncilPage() {
  return (
    <main className="flex-1 bg-background flex flex-col pt-12 pb-24">
      {/* Header Section */}
      <section className="px-6 max-w-7xl mx-auto w-full mb-16">
        <Link href="/#" className="inline-flex items-center gap-2 text-primary font-semibold text-xs tracking-widest uppercase mb-8 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" /> BACK TO HOME
        </Link>
        <div className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-accent inline-block"></span> LEADERSHIP DIRECTORY
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold uppercase tracking-wide">
          EXECUTIVE <span className="text-accent">COUNCIL</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mt-6 text-lg leading-relaxed">
          The complete list of dedicated officials driving the Uttar Pradesh Handball Association.
        </p>
      </section>

      {/* Directory Sections */}
      <div className="px-6 max-w-7xl mx-auto w-full space-y-24">
        {councilCategories.map((group, groupIdx) => (
          <section key={groupIdx}>
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wide text-primary">
                {group.category}
              </h2>
              <div className="h-[1px] bg-gray-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {group.members.map((member, idx) => (
                <div key={idx} className="border border-gray-100 rounded bg-white shadow-sm overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className={`h-48 ${member.bgColor} w-full relative flex items-center justify-center`}>
                    {member.image ? (
                      <div className="w-full h-full relative">
                        <Image src={member.image} alt={member.name} fill className="object-cover object-center" />
                      </div>
                    ) : (
                      <div className="font-heading text-4xl font-bold text-gray-300 opacity-50 uppercase">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between border-t border-gray-100">
                    <div>
                      <div className="text-accent text-[10px] font-bold tracking-widest uppercase mb-1">{member.role}</div>
                      <h3 className="font-heading text-lg font-bold uppercase tracking-wide leading-tight mb-4">{member.name}</h3>
                    </div>
                    <div className="text-gray-500 text-xs">
                      {member.details}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
