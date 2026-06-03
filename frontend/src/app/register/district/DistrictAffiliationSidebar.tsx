"use client";

import { Phone, Mail, QrCode, Check } from "lucide-react";
import React, { useState } from "react";

export default function DistrictAffiliationSidebar() {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs(prev => ({ ...prev, [doc]: !prev[doc] }));
  };

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
          <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">ANNUAL UNIT AFFILIATION</div>
          <div className="font-heading text-5xl font-bold text-primary mb-2">₹ 1,100</div>
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
        <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-6">AFFILIATION INCLUDES</h3>
        
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Official UPHA District Unit status</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Voting rights in UPHA general assembly</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Right to nominate athletes for state and zonal events</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Eligibility for federation grants and equipment support</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">District logo and contact listed on UPHA website</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Access to coach & referee training programs</div>
          </li>
          <li className="flex gap-3 items-start">
            <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-gray-300 leading-relaxed">Inclusion in state-level handball communications</div>
          </li>
        </ul>
      </div>

      {/* Document Checklist Box */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6">
        <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">DOCUMENT CHECKLIST</div>
        <h3 className="font-heading text-xl font-bold uppercase tracking-wide mb-6 text-primary">10 DOCUMENTS TO UPLOAD</h3>
        
        <ul className="space-y-4">
          {[
            { id: "logo", label: "Unit logo", req: true },
            { id: "pres_aadhar", label: "President's Aadhar", req: true },
            { id: "pres_photo", label: "President's photo", req: true },
            { id: "sec_aadhar", label: "Secretary's Aadhar", req: true },
            { id: "sec_photo", label: "Secretary's photo", req: true },
            { id: "treas_aadhar", label: "Treasurer's Aadhar", req: true },
            { id: "treas_photo", label: "Treasurer's photo", req: true },
            { id: "auth_letter", label: "Authorization letter", req: true },
            { id: "soc_cert", label: "Society certificate", req: false },
            { id: "pay_ss", label: "Payment screenshot", req: true },
          ].map((doc) => (
            <li key={doc.id} className="flex items-center justify-between group cursor-pointer" onClick={() => toggleDoc(doc.id)}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 border rounded-sm flex items-center justify-center transition-colors ${checkedDocs[doc.id] ? 'bg-accent border-accent' : 'border-gray-300 bg-white group-hover:border-accent'}`}>
                  {checkedDocs[doc.id] && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-xs ${checkedDocs[doc.id] ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{doc.label}</span>
              </div>
              <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm ${doc.req ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                {doc.req ? 'REQUIRED' : 'OPTIONAL'}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Need Help Box */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-6">
        <div className="text-[10px] font-bold tracking-widest text-accent uppercase mb-2">NEED HELP?</div>
        <h3 className="font-heading text-2xl font-bold uppercase tracking-wide mb-4 text-primary">QUESTIONS ABOUT AFFILIATION?</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6">
          Our affiliation desk is available on working days between 10 AM and 5 PM. We can help with documentation, authorization letters, or eligibility queries.
        </p>
        
        <ul className="space-y-4">
          <li className="flex gap-3 items-start">
            <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">HEAD OFFICE (LUCKNOW)</div>
              <div className="text-sm text-gray-500">+91 98397 70123</div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">BRANCH (VARANASI)</div>
              <div className="text-sm text-gray-500">+91 70849 00009</div>
            </div>
          </li>
          <li className="flex gap-3 items-start">
            <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-1">EMAIL</div>
              <div className="text-sm text-gray-500">upha2024@gmail.com</div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  );
}
