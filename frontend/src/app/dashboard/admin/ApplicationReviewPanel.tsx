import { X, FileText, Image as ImageIcon, CreditCard, Check } from "lucide-react";
import React from "react";

export default function ApplicationReviewPanel() {
  return (
    <div className="p-8 border-x border-b border-accent/20 bg-[#fffdfc]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-[#d97c55]/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center shrink-0">
            <span className="font-heading text-xl font-bold tracking-wider">VM</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="text-[10px] font-bold tracking-widest text-accent uppercase">APPLICATION REVIEW &middot; PLAYER</div>
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-800 uppercase tracking-wide">VINAY MEHTA</h2>
            <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-500 font-mono tracking-wider">
              <span>Ref: APP-PLR-2026-00234</span>
              <span>Submitted 16 May 2026</span>
              <span>Form: REF/PLR-2026</span>
            </div>
          </div>
        </div>
        
        <button className="w-8 h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Data */}
        <div className="w-full lg:w-3/5 space-y-10">
          
          {/* Section 1 */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <span className="text-gray-400">01</span> PERSONAL DETAILS
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">FULL NAME</div>
                <div className="text-sm font-medium text-gray-800">Vinay Mehta</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">FATHER&apos;S NAME</div>
                <div className="text-sm font-medium text-gray-800">Ramesh Mehta</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">DATE OF BIRTH</div>
                <div className="text-sm font-medium text-gray-800">5 Jun 2002</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">GENDER</div>
                <div className="text-sm font-medium text-gray-800">Male</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">BLOOD GROUP</div>
                <div className="text-sm font-medium text-gray-800">O+</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">MOBILE</div>
                <div className="text-sm font-medium text-gray-800">+91 98XXX XXXXX</div>
              </div>
              <div className="col-span-2">
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">EMAIL</div>
                <div className="text-sm font-medium text-gray-800">vinay.m@example.in</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 2 */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <span className="text-gray-400">02</span> SPORT PROFILE
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">DISTRICT</div>
                <div className="text-sm font-medium text-gray-800">Lucknow</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">PLAYING HAND</div>
                <div className="text-sm font-medium text-gray-800">Right</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">CLUB / ACADEMY</div>
                <div className="text-sm font-medium text-gray-800">Vajra Sports Academy</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">COACH</div>
                <div className="text-sm font-medium text-gray-800">Anil Sharma <span className="text-[10px] text-gray-400 ml-1">CCH-00128</span></div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">HEIGHT</div>
                <div className="text-sm font-medium text-gray-800">178 cm</div>
              </div>
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">WEIGHT</div>
                <div className="text-sm font-medium text-gray-800">72 kg</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 3 */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <span className="text-gray-400">03</span> IDENTITY
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">AADHAR NUMBER</div>
                <div className="text-sm font-medium text-gray-800">XXXX XXXX 4521</div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Docs & Payment */}
        <div className="w-full lg:w-2/5 space-y-10">
          
          {/* Documents */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> DOCUMENTS
            </div>
            
            <div className="space-y-4">
              
              {/* Doc 1 */}
              <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Aadhar Card</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">PDF &middot; 1.2 MB &middot; Front + Back</div>
                  </div>
                </div>
                <button className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                  VIEW
                </button>
              </div>

              {/* Doc 2 */}
              <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Passport Photo</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">JPG &middot; 400 KB &middot; 600 &times; 600 px</div>
                  </div>
                </div>
                <button className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                  VIEW
                </button>
              </div>

              {/* Doc 3 */}
              <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-800">Payment Screenshot</div>
                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">PNG &middot; 290 KB &middot; UPI receipt</div>
                  </div>
                </div>
                <button className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                  VIEW
                </button>
              </div>

            </div>
          </div>

          {/* Payment */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> PAYMENT
            </div>

            <div className="border border-emerald-200 bg-emerald-50/50 p-6 rounded-sm">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-emerald-100">
                <div className="font-heading text-4xl font-bold text-gray-800">&rupee; 111</div>
                <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                  <Check className="w-3 h-3" /> VERIFIED
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">UPI ID</div>
                  <div className="text-[11px] font-mono font-medium text-gray-800">uphandballassociation@sbi</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">TXN ID</div>
                  <div className="text-[11px] font-mono font-medium text-gray-800">T2403291823KQML</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">DATE</div>
                  <div className="text-[11px] font-mono font-medium text-gray-800">16 May 2026 - 11:42 AM</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">METHOD</div>
                  <div className="text-[11px] font-mono font-medium text-gray-800">UPI</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Actions */}
      <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        
        <div className="w-full md:w-1/2">
          <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-2">ADMIN NOTES (OPTIONAL)</div>
          <input 
            type="text" 
            placeholder="Add internal notes about this application &mdash; they'll be saved to the audit log..."
            className="w-full border border-gray-200 bg-gray-50 p-4 rounded-sm text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto shrink-0">
          <button className="flex-1 md:flex-none border border-red-200 text-red-600 hover:bg-red-50 px-8 py-4 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2">
            <X className="w-4 h-4" /> REJECT
          </button>
          <button className="flex-1 md:flex-none bg-[#059669] hover:bg-[#047857] text-white px-8 py-4 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-md transition-colors flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> APPROVE PLAYER
          </button>
        </div>

      </div>

    </div>
  );
}
