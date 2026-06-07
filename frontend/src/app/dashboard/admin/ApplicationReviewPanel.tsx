import { X, FileText, Image as ImageIcon, CreditCard, Check, ExternalLink } from "lucide-react";
import React, { useState } from "react";
import { Applicant } from "./PendingReviewsTable";

interface ApplicationReviewPanelProps {
  applicant: Applicant;
  onApprove: (notes: string) => void;
  onReject: (notes: string) => void;
  onClose: () => void;
  approving: boolean;
  rejecting: boolean;
}

export default function ApplicationReviewPanel({
  applicant,
  onApprove,
  onReject,
  onClose,
  approving,
  rejecting,
}: ApplicationReviewPanelProps) {
  const [notes, setNotes] = useState("");

  const isPlayer = applicant.type === "player";
  const isCoach = applicant.type === "coach";
  const isReferee = applicant.type === "referee";
  const isAcademy = applicant.type === "academy";

  const data = applicant.data as any;
  const user = data.user || null;
  
  const name = isAcademy ? data.name : user?.name || "Unknown";
  const initials = name?.split(" ").map((p: string) => p[0]).join("").slice(0, 2).toUpperCase() || "??";
  const email = isAcademy ? data.email : user?.email || "—";
  const phone = isAcademy ? data.office_phone_number : user?.phone_number || "—";
  
  const dateStr = user?.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  }) : "Recent";
  
  const refId = `APP-${applicant.type.substring(0, 3).toUpperCase()}-${String(data.id).padStart(5, '0')}`;

  const txImg = data.transaction_image;
  const isPaid = data.paid;

  return (
    <div className="p-8 border-x border-b border-accent/20 bg-[#fffdfc]">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-8 pb-6 border-b border-[#d97c55]/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#111827] text-white flex items-center justify-center shrink-0">
            <span className="font-heading text-xl font-bold tracking-wider">{initials}</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="text-[10px] font-bold tracking-widest text-accent uppercase">APPLICATION REVIEW &middot; {applicant.type}</div>
            </div>
            <h2 className="font-heading text-2xl font-bold text-gray-800 uppercase tracking-wide">{name}</h2>
            <div className="flex items-center gap-4 mt-1 text-[11px] text-gray-500 font-mono tracking-wider">
              <span>Ref: {refId}</span>
              <span>Submitted {dateStr}</span>
            </div>
          </div>
        </div>
        
        <button onClick={onClose} className="w-8 h-8 bg-white border border-gray-200 rounded-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Data */}
        <div className="w-full lg:w-3/5 space-y-10">
          
          {/* Section 1 */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <span className="text-gray-400">01</span> {isAcademy ? "ACADEMY DETAILS" : "PERSONAL DETAILS"}
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {!isAcademy && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">FULL NAME</div>
                    <div className="text-sm font-medium text-gray-800">{user?.name}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">FATHER&apos;S NAME</div>
                    <div className="text-sm font-medium text-gray-800">{user?.father_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">DATE OF BIRTH</div>
                    <div className="text-sm font-medium text-gray-800">{user?.date_of_birth || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">GENDER</div>
                    <div className="text-sm font-medium text-gray-800">{user?.gender || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">BLOOD GROUP</div>
                    <div className="text-sm font-medium text-gray-800">{user?.blood_group || "—"}</div>
                  </div>
                </>
              )}
              {isAcademy && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">ACADEMY NAME</div>
                    <div className="text-sm font-medium text-gray-800">{data.name}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">YEAR EST.</div>
                    <div className="text-sm font-medium text-gray-800">{data.year_of_establishment || "—"}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">OFFICE ADDRESS</div>
                    <div className="text-sm font-medium text-gray-800">{data.office_address || "—"}</div>
                  </div>
                </>
              )}
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">MOBILE</div>
                <div className="text-sm font-medium text-gray-800">{phone}</div>
              </div>
              <div className="col-span-2">
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">EMAIL</div>
                <div className="text-sm font-medium text-gray-800">{email}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 2 */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <span className="text-gray-400">02</span> {isAcademy ? "AFFILIATION PROFILE" : "SPORT PROFILE"}
            </div>
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              <div>
                <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">DISTRICT</div>
                <div className="text-sm font-medium text-gray-800">{data.district || "—"}</div>
              </div>
              
              {isPlayer && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">PLAYING HAND</div>
                    <div className="text-sm font-medium text-gray-800">{data.dominant_hand || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">CLUB / ACADEMY</div>
                    <div className="text-sm font-medium text-gray-800">{data.club_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">COACH</div>
                    <div className="text-sm font-medium text-gray-800">{data.coach_name || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">HEIGHT</div>
                    <div className="text-sm font-medium text-gray-800">{data.height ? `${data.height} cm` : "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">WEIGHT</div>
                    <div className="text-sm font-medium text-gray-800">{data.weight ? `${data.weight} kg` : "—"}</div>
                  </div>
                </>
              )}
              {isCoach && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">OCCUPATION</div>
                    <div className="text-sm font-medium text-gray-800">{data.occupation || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">HIGHEST COACHING GRADE</div>
                    <div className="text-sm font-medium text-gray-800">{data.highest_coaching_grade || "—"}</div>
                  </div>
                </>
              )}
              {isReferee && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">OCCUPATION</div>
                    <div className="text-sm font-medium text-gray-800">{data.occupation || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">GRADE APPLYING FOR</div>
                    <div className="text-sm font-medium text-gray-800">{data.grade_applying_for || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">YEARS OF EXPERIENCE</div>
                    <div className="text-sm font-medium text-gray-800">{data.year_of_officiating_experience || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">HIGHEST LEVEL OFFICIATED</div>
                    <div className="text-sm font-medium text-gray-800">{data.highest_level_officiated || "—"}</div>
                  </div>
                </>
              )}
              {isAcademy && (
                <>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">NO. OF PLAYERS</div>
                    <div className="text-sm font-medium text-gray-800">{data.no_of_players || "—"}</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">TRUST REGISTRATION NUMBER</div>
                    <div className="text-sm font-medium text-gray-800">{data.trust_registration_number || "—"}</div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="border-t border-gray-100"></div>

          {/* Section 3 */}
          {!isAcademy && (
            <div>
              <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
                <span className="text-gray-400">03</span> IDENTITY
              </div>
              <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                <div>
                  <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase mb-1">AADHAR NUMBER</div>
                  <div className="text-sm font-medium text-gray-800">{user?.adhar_number || "—"}</div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Docs & Payment */}
        <div className="w-full lg:w-2/5 space-y-10">
          
          {/* Documents */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> DOCUMENTS
            </div>
            
            <div className="space-y-4">
              
              {!isAcademy && user?.adhar_image && (
                <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Aadhar Card</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">Image File</div>
                    </div>
                  </div>
                  <a href={user.adhar_image} target="_blank" rel="noopener noreferrer" className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                    VIEW
                  </a>
                </div>
              )}

              {!isAcademy && user?.passport_image && (
                <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Passport Photo</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">Image File</div>
                    </div>
                  </div>
                  <a href={user.passport_image} target="_blank" rel="noopener noreferrer" className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                    VIEW
                  </a>
                </div>
              )}

              {isAcademy && data.registration_certificate && (
                <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Reg. Certificate</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">Image/Doc</div>
                    </div>
                  </div>
                  <a href={data.registration_certificate} target="_blank" rel="noopener noreferrer" className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                    VIEW
                  </a>
                </div>
              )}

              {txImg && (
                <div className="border border-gray-200 bg-white p-4 rounded-sm flex items-center justify-between">
                  <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 bg-orange-50 text-accent flex items-center justify-center rounded-sm shrink-0">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-800">Payment Screenshot</div>
                      <div className="text-[10px] text-gray-500 font-mono mt-0.5">Image File</div>
                    </div>
                  </div>
                  <a href={txImg} target="_blank" rel="noopener noreferrer" className="border border-[#d97c55]/30 text-accent hover:bg-[#d97c55]/10 px-3 py-1.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-colors">
                    VIEW
                  </a>
                </div>
              )}

            </div>
          </div>

          {/* Payment */}
          <div>
            <div className="text-[11px] font-bold tracking-widest text-accent uppercase mb-6 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> PAYMENT
            </div>

            <div className={`border p-6 rounded-sm ${isPaid ? "border-emerald-200 bg-emerald-50/50" : "border-gray-200 bg-gray-50/50"}`}>
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="font-heading text-4xl font-bold text-gray-800">&rupee; 111</div>
                {isPaid ? (
                  <div className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" /> VERIFIED
                  </div>
                ) : (
                  <div className="bg-orange-100 text-orange-700 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase flex items-center gap-1">
                    PENDING
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase">TXN ID</div>
                  <div className="text-[11px] font-mono font-medium text-gray-800">{data.transaction_id || "—"}</div>
                </div>
                {txImg && (
                  <div className="mt-4">
                    <a href={txImg} target="_blank" rel="noopener noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={txImg}
                        alt="Transaction receipt"
                        className="w-full max-h-40 object-contain border border-gray-200 rounded-sm hover:opacity-90 transition bg-white"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Footer Actions */}
      {!isPaid && (
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
          
          <div className="w-full md:w-1/2">
            <div className="text-[9px] font-bold tracking-widest text-gray-500 uppercase mb-2">ADMIN NOTES (OPTIONAL)</div>
            <input 
              type="text" 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add internal notes about this application &mdash; they'll be saved to the audit log..."
              className="w-full border border-gray-200 bg-gray-50 p-4 rounded-sm text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
            />
          </div>

          <div className="flex gap-4 w-full md:w-auto shrink-0">
            <button 
              disabled={rejecting || approving}
              onClick={() => onReject(notes)}
              className="flex-1 md:flex-none border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50 px-8 py-4 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
            >
              <X className="w-4 h-4" /> {rejecting ? "REJECTING..." : "REJECT"}
            </button>
            <button 
              disabled={approving || rejecting}
              onClick={() => onApprove(notes)}
              className="flex-1 md:flex-none bg-[#059669] hover:bg-[#047857] disabled:opacity-50 text-white px-8 py-4 rounded-sm text-[10px] font-bold tracking-widest uppercase shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> {approving ? "APPROVING..." : `APPROVE ${applicant.type.toUpperCase()}`}
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
