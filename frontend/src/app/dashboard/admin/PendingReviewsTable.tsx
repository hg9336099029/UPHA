"use client";

import React, { useEffect, useState } from "react";
import { Check, X, ExternalLink } from "lucide-react";
import {
  listPlayers,
  listCoaches,
  listReferees,
  listAcademies,
  approvePlayerPayment,
  approveCoachPayment,
  approveRefereePayment,
  approveAcademyPayment,
  PlayerData,
  CoachData,
  RefereeData,
  AcademyData,
} from "@/lib/api";

type Tab = "ALL" | "PLAYERS" | "COACHES" | "REFEREES" | "ACADEMIES";

export type Applicant =
  | { type: "player"; data: PlayerData }
  | { type: "coach"; data: CoachData }
  | { type: "referee"; data: RefereeData }
  | { type: "academy"; data: AcademyData };

function getName(a: Applicant) {
  if (a.type === "academy") return a.data.name;
  return a.data.user.name;
}
function getEmail(a: Applicant) {
  if (a.type === "academy") return a.data.email;
  return a.data.user.email;
}
function getDistrict(a: Applicant) {
  return a.data.district;
}
function getId(a: Applicant) {
  return a.data.id;
}
function isPaid(a: Applicant) {
  return a.data.paid;
}
function getReference(a: Applicant) {
  const prefix =
    a.type === "player"
      ? "APP-PLR"
      : a.type === "coach"
      ? "APP-CCH"
      : a.type === "referee"
      ? "APP-RFR"
      : "APP-ACA";
  return `${prefix}-${String(a.data.id).padStart(5, "0")}`;
}

export default function PendingReviewsTable() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [coaches, setCoaches] = useState<CoachData[]>([]);
  const [referees, setReferees] = useState<RefereeData[]>([]);
  const [academies, setAcademies] = useState<AcademyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([listPlayers(), listCoaches(), listReferees(), listAcademies()])
      .then(([p, c, r, a]) => {
        setPlayers(p.players);
        setCoaches(c.coaches);
        setReferees(r.referees);
        setAcademies(a.academies);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Build combined list
  const allApplicants: Applicant[] = [
    ...players.map((d): Applicant => ({ type: "player", data: d })),
    ...coaches.map((d): Applicant => ({ type: "coach", data: d })),
    ...referees.map((d): Applicant => ({ type: "referee", data: d })),
    ...academies.map((d): Applicant => ({ type: "academy", data: d })),
  ];

  // Only show pending applications
  const pending = allApplicants.filter((a) => !isPaid(a));

  function rowKey(a: Applicant) {
    return `${a.type}-${getId(a)}`;
  }

  async function handleApprove(a: Applicant, notes: string) {
    const key = rowKey(a);
    setApproving(key);
    try {
      if (a.type === "player") {
        const res = await approvePlayerPayment(getId(a), notes);
        setPlayers((prev) => prev.map((p) => (p.id === getId(a) ? res.player : p)));
      } else if (a.type === "coach") {
        const res = await approveCoachPayment(getId(a), notes);
        setCoaches((prev) => prev.map((c) => (c.id === getId(a) ? res.coach : c)));
      } else if (a.type === "referee") {
        const res = await approveRefereePayment(getId(a), notes);
        setReferees((prev) => prev.map((r) => (r.id === getId(a) ? res.referee : r)));
      } else {
        const res = await approveAcademyPayment(getId(a), notes);
        setAcademies((prev) => prev.map((ac) => (ac.id === getId(a) ? res.academy : ac)));
      }
      setToast(`Application approved for ${getName(a)}`);
      setTimeout(() => setToast(null), 3000);
      setExpandedId(null);
    } catch (err) {
      setToast(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
      setTimeout(() => setToast(null), 4000);
    } finally {
      setApproving(null);
    }
  }

  async function handleReject(a: Applicant, notes: string) {
    import("@/lib/api").then(async ({ rejectApplication }) => {
      const key = rowKey(a);
      setRejecting(key);
      try {
        await rejectApplication(a.type, getId(a), notes);
        if (a.type === "player") {
          setPlayers((prev) => prev.filter((p) => p.id !== getId(a)));
        } else if (a.type === "coach") {
          setCoaches((prev) => prev.filter((c) => c.id !== getId(a)));
        } else if (a.type === "referee") {
          setReferees((prev) => prev.filter((r) => r.id !== getId(a)));
        } else {
          setAcademies((prev) => prev.filter((ac) => ac.id !== getId(a)));
        }
        setToast(`Application rejected for ${getName(a)}`);
        setTimeout(() => setToast(null), 3000);
        setExpandedId(null);
      } catch (err) {
        setToast(`Error: ${err instanceof Error ? err.message : "Unknown error"}`);
        setTimeout(() => setToast(null), 4000);
      } finally {
        setRejecting(null);
      }
    });
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm relative">
      {/* Toast */}
      {toast && (
        <div className="absolute top-4 right-4 z-10 bg-[#111827] text-white text-xs font-bold tracking-wide px-5 py-3 rounded-sm shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-end p-6 border-b border-gray-200">
        <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-[#111827]">
          RECENT <span className="text-[#d97c55]">APPLICATIONS</span>
        </h2>
        <button className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase hover:underline">
          OPEN QUEUE ↗
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-[#111827] text-white">
            <tr>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400">REFERENCE</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400">APPLICANT</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400">TYPE</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400">DISTRICT</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400">STATUS</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-gray-400 text-right">ACTION</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={6} className="py-16 text-center text-sm text-gray-400 animate-pulse">
                  Loading applications…
                </td>
              </tr>
            )}

            {!loading && pending.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center text-sm text-gray-400">
                  No pending applications.
                </td>
              </tr>
            )}

            {!loading && pending.map((a) => {
              const key = rowKey(a);
              const isExpanded = expandedId === key;
              const initials = getName(a).split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

              // Type badge color mapping based on image
              let typeColor = "bg-gray-100 text-gray-600";
              if (a.type === "player") typeColor = "bg-gray-100 text-gray-600";
              else if (a.type === "coach") typeColor = "bg-[#d97c55]/10 text-[#d97c55] border-[#d97c55]/20";
              else if (a.type === "academy") typeColor = "bg-amber-50 text-amber-600 border-amber-200";
              else if (a.type === "referee") typeColor = "bg-blue-50 text-blue-600 border-blue-200";

              return (
                <React.Fragment key={key}>
                  <tr className={`transition-colors border-l-4 ${isExpanded ? "bg-[#fff8f6] border-[#d97c55]" : "hover:bg-gray-50 border-transparent"}`}>
                    <td className="py-4 px-6">
                      <div className="font-bold text-xs tracking-wider text-[#111827] font-mono">
                        {getReference(a)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${a.type === 'coach' ? 'bg-[#d97c55] text-white' : a.type === 'academy' ? 'bg-[#d9b855] text-white' : a.type === 'referee' ? 'bg-[#111827] text-white' : 'bg-[#111827] text-white'}`}>
                          <span className="font-heading text-xs font-bold tracking-wider">{initials}</span>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#111827]">{getName(a)}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5 lowercase">{getEmail(a)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`border px-2 py-1 rounded text-[9px] font-bold tracking-widest uppercase ${typeColor}`}>
                        {a.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 font-medium">{getDistrict(a) || "—"}</td>
                    <td className="py-4 px-6">
                      <div className="bg-orange-50 border border-orange-100 text-orange-600 px-2.5 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        PENDING
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => setExpandedId(isExpanded ? null : key)}
                        className="bg-[#111827] hover:bg-[#1f2937] text-white px-4 py-2 rounded text-[9px] font-bold tracking-widest uppercase shadow-sm transition-colors"
                      >
                        {isExpanded ? "CLOSE" : "REVIEW →"}
                      </button>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={6} className="p-0 border-b-4 border-[#d97c55] bg-[#fcfbf9]">
                        <div className="p-0">
                          {typeof window !== "undefined" && (
                            <React.Suspense fallback={<div className="p-8">Loading review panel...</div>}>
                              {React.createElement(require('./ApplicationReviewPanel').default, {
                                applicant: a,
                                onApprove: (notes: string) => handleApprove(a, notes),
                                onReject: (notes: string) => handleReject(a, notes),
                                onClose: () => setExpandedId(null),
                                approving: approving === key,
                                rejecting: rejecting === key,
                              })}
                            </React.Suspense>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
