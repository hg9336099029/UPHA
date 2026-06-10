"use client";

import { Phone, Mail, QrCode, Check } from "lucide-react";

export default function RefereeAccreditationSidebar() {
  const handleCopyUPI = () => {
    navigator.clipboard.writeText("uphandballassociation@sbi");
  };

  return (
    <div className="space-y-6">
      
      {/* Payment Box */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden">
        <div className="bg-[#111827] text-white p-4 flex justify-between items-center text-[10px] font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span> UPHA PAYMENT
          </div>
          <div className="text-gray-400">REF / 2026</div>
        </div>
        
        <div className="p-6 text-center border-b border-gray-100">
          <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">REFEREE ACCREDITATION</div>
          <div className="font-heading text-5xl font-bold text-primary mb-2">₹ 300</div>
          <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">VALID THROUGH 31 MAR 2027</div>
        </div>
        
        <div className="p-6 bg-gray-50/50">
          <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-2">PAY TO UPI ID</div>
          <div className="flex border border-gray-200 rounded-sm bg-white overflow-hidden mb-6">
            <div className="px-4 py-3 flex-1 font-mono text-sm text-gray-800">uphandballassociation@sbi</div>
            <button 
              onClick={handleCopyUPI}
              className="px-4 py-3 bg-gray-50 text-accent text-[10px] font-bold tracking-widest uppercase hover:bg-gray-100 transition-colors border-l border-gray-200"
            >
              COPY
            </button>
          </div>
          
          <div className="bg-white border border-gray-200 p-6 flex flex-col items-center justify-center rounded-sm">
            <QrCode className="w-32 h-32 text-gray-800 mb-4 stroke-[1]" />
            <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">SCAN WITH ANY UPI APP</div>
          </div>
        </div>
      </div>

      {/* What You Get Box */}
      <div className="bg-[#111827] text-white shadow-sm rounded-sm p-6">
        <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">WHAT YOU GET</div>
        <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-6">ACCREDITATION INCLUDES</h3>
        
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Official UPHA referee accreditation</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Digital referee ID card</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Eligibility to officiate district, state & zonal events</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Listing in the UPHA referee panel database</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Match assignment notifications</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Access to rules refresher exams & briefings</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Pathway to higher officiating grades</div>
          </li>
        </ul>
      </div>

      {/* Need Help Box */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6">
        <div className="text-[9px] font-bold tracking-widest text-accent uppercase mb-2">NEED HELP?</div>
        <h3 className="font-heading text-xl font-bold uppercase tracking-wide text-primary mb-3">QUESTIONS ABOUT ACCREDITATION?</h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-6">
          The Referee Board desk is available on working days between 10 AM and 5 PM for queries on grades, documentation, or eligibility.
        </p>
        
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <Phone className="w-3.5 h-3.5 text-accent mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-primary uppercase">HEAD OFFICE (LUCKNOW)</div>
              <div className="text-xs text-gray-500 mt-0.5">+91 98397 70123</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Phone className="w-3.5 h-3.5 text-accent mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-primary uppercase">BRANCH (VARANASI)</div>
              <div className="text-xs text-gray-500 mt-0.5">+91 70849 00009</div>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Mail className="w-3.5 h-3.5 text-accent mt-0.5" />
            <div>
              <div className="text-[10px] font-bold tracking-widest text-primary uppercase">EMAIL</div>
              <div className="text-xs text-gray-500 mt-0.5">upha2024@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
