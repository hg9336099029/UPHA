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
function getTransactionImage(a: Applicant) {
  return a.data.transaction_image;
}
function getTransactionId(a: Applicant) {
  return a.data.transaction_id;
}
function isPaid(a: Applicant) {
  return a.data.paid;
}

export default function PendingReviewsTable() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [coaches, setCoaches] = useState<CoachData[]>([]);
  const [referees, setReferees] = useState<RefereeData[]>([]);
  const [academies, setAcademies] = useState<AcademyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [approving, setApproving] = useState<string | null>(null);
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

  const filtered = allApplicants.filter((a) => {
    if (tab === "PLAYERS") return a.type === "player";
    if (tab === "COACHES") return a.type === "coach";
    if (tab === "REFEREES") return a.type === "referee";
    if (tab === "ACADEMIES") return a.type === "academy";
    return true;
  });

  const pending = allApplicants.filter((a) => !isPaid(a));

  function count(type?: Applicant["type"]) {
    if (!type) return pending.length;
    return pending.filter((a) => a.type === type).length;
  }

  function rowKey(a: Applicant) {
    return `${a.type}-${getId(a)}`;
  }

  const [rejecting, setRejecting] = useState<string | null>(null);

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
        // Remove from list
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

  const tabs: { label: string; key: Tab; type?: Applicant["type"] }[] = [
    { label: "ALL", key: "ALL" },
    { label: "PLAYERS", key: "PLAYERS", type: "player" },
    { label: "COACHES", key: "COACHES", type: "coach" },
    { label: "REFEREES", key: "REFEREES", type: "referee" },
    { label: "ACADEMIES", key: "ACADEMIES", type: "academy" },
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm overflow-hidden flex flex-col relative">

      {/* Toast */}
      {toast && (
        <div className="absolute top-4 right-4 z-10 bg-[#111827] text-white text-xs font-bold tracking-wide px-5 py-3 rounded-sm shadow-xl animate-fade-in">
          {toast}
        </div>
      )}

      {/* Tab Bar */}
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((t) => {
          const cnt = count(t.type);
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-4 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors ${
                tab === t.key
                  ? "text-accent border-b-2 border-accent"
                  : "text-gray-500 hover:text-primary"
              }`}
            >
              {t.label}{" "}
              <span className={`ml-1 px-1.5 py-0.5 rounded-sm text-[9px] ${tab === t.key ? "bg-accent text-white" : "bg-gray-100 text-gray-600"}`}>
                {cnt}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-[#111827] text-white">
            <tr>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">ID</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">APPLICANT</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">TYPE</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">DISTRICT</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">TXN ID</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">RECEIPT</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase">STATUS</th>
              <th className="py-4 px-6 text-[9px] font-bold tracking-widest uppercase text-right">ACTIONS</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {loading && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-gray-400 animate-pulse">
                  Loading applications…
                </td>
              </tr>
            )}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="py-16 text-center text-sm text-gray-400">
                  No applications found.
                </td>
              </tr>
            )}

            {!loading && filtered.map((a) => {
              const key = rowKey(a);
              const paid = isPaid(a);
              const isExpanded = expandedId === key;

              return (
                <React.Fragment key={key}>
                  <tr className={`transition-colors border-l-2 ${isExpanded ? "bg-[#fff8f6] border-accent" : "hover:bg-gray-50 border-transparent"}`}>
                    <td className="py-4 px-6">
                      <div className="font-bold text-sm text-gray-800">#{getId(a)}</div>
                      <div className="text-[9px] text-gray-400 font-mono capitalize mt-0.5">{a.type}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#111827] text-white flex items-center justify-center shrink-0">
                          <span className="font-heading text-xs font-bold tracking-wider">
                            {getName(a).split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-800">{getName(a)}</div>
                          <div className="text-[10px] text-gray-500 font-mono mt-0.5">{getEmail(a)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-600 border border-gray-200 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase">
                        {a.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{getDistrict(a) || "—"}</td>
                    <td className="py-4 px-6 text-[11px] font-mono text-gray-700">{getTransactionId(a) || "—"}</td>
                    <td className="py-4 px-6">
                      {getTransactionImage(a) ? (
                        <a
                          href={getTransactionImage(a)!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-accent text-[9px] font-bold tracking-widest uppercase hover:underline"
                        >
                          VIEW <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[9px] text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      {paid ? (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase inline-flex items-center gap-1">
                          <Check className="w-2.5 h-2.5" /> PAID
                        </div>
                      ) : (
                        <div className="bg-orange-50 border border-orange-100 text-orange-600 px-2 py-1 rounded-sm text-[9px] font-bold tracking-widest uppercase inline-block">
                          &bull; PENDING
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : key)}
                          className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 px-3 py-2 rounded-sm text-[9px] font-bold tracking-widest uppercase shadow-sm transition-colors"
                        >
                          {isExpanded ? "CLOSE" : "REVIEW"}
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded detail row */}
                  {isExpanded && (
                    <tr>
                      <td colSpan={8} className="p-0 border-b-2 border-accent bg-[#fcfbf9]">
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
