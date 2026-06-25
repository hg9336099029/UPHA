"use client";

import React, { useEffect, useState } from "react";
import { FileBadge, ChevronLeft, Trophy, MapPin, Calendar, Users, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import {
  getEventParticipantsForCertificates,
  issueEventCertificates,
  EventWithParticipantsData,
  EventParticipantCertData,
  CertificateType,
  CertificateAssignment,
  IssuedCertResult,
  SkippedCertResult,
} from "@/lib/api";

const CERT_TYPES: CertificateType[] = [
  "1st Position Certificate",
  "2nd Position Certificate",
  "3rd Position Certificate",
  "Runner-Up Certificate",
  "Participation Certificate",
];

function positionToCertType(position: number): CertificateType {
  if (position === 1) return "1st Position Certificate";
  if (position === 2) return "2nd Position Certificate";
  if (position === 3) return "3rd Position Certificate";
  return "Participation Certificate";
}

type Step = "events" | "assign" | "result";

export default function IssueCertificatesPanel() {
  const [step, setStep] = useState<Step>("events");
  const [events, setEvents] = useState<EventWithParticipantsData[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Step 2 state
  const [selectedEvent, setSelectedEvent] = useState<EventWithParticipantsData | null>(null);
  const [assignments, setAssignments] = useState<Record<number, CertificateType>>({});
  const [issuing, setIssuing] = useState(false);
  const [issueError, setIssueError] = useState<string | null>(null);

  // Step 3 state
  const [issuedResult, setIssuedResult] = useState<IssuedCertResult[]>([]);
  const [skippedResult, setSkippedResult] = useState<SkippedCertResult[]>([]);
  const [issuedCount, setIssuedCount] = useState(0);
  const [skippedCount, setSkippedCount] = useState(0);

  useEffect(() => {
    setLoadingEvents(true);
    getEventParticipantsForCertificates()
      .then((res) => {
        if (res.success) setEvents(res.events);
        else setEventsError("Failed to load events.");
      })
      .catch((e) => setEventsError(e.message || "Error loading events."))
      .finally(() => setLoadingEvents(false));
  }, []);

  function handleSelectEvent(event: EventWithParticipantsData) {
    setSelectedEvent(event);
    // Auto-init assignments
    const defaults: Record<number, CertificateType> = {};
    for (const p of event.participants) {
      if (!p.cert_already_issued) {
        defaults[p.player_id] = positionToCertType(p.position);
      }
    }
    setAssignments(defaults);
    setIssueError(null);
    setStep("assign");
  }

  function handleAssignmentChange(playerId: number, certType: CertificateType) {
    setAssignments((prev) => ({ ...prev, [playerId]: certType }));
  }

  async function handleIssue() {
    if (!selectedEvent) return;
    const payload: CertificateAssignment[] = Object.entries(assignments).map(([pid, ct]) => ({
      player_id: Number(pid),
      cert_type: ct,
    }));
    if (payload.length === 0) {
      setIssueError("No players to issue certificates to.");
      return;
    }
    setIssuing(true);
    setIssueError(null);
    try {
      const res = await issueEventCertificates(selectedEvent.id, payload);
      setIssuedCount(res.issued_count);
      setSkippedCount(res.skipped_count);
      setIssuedResult(res.issued);
      setSkippedResult(res.skipped);
      setStep("result");
    } catch (e: any) {
      setIssueError(e.message || "Failed to issue certificates.");
    } finally {
      setIssuing(false);
    }
  }

  function handleBack() {
    setStep("events");
    setSelectedEvent(null);
    setAssignments({});
    setIssueError(null);
    // Refresh events list to reflect new cert counts
    setLoadingEvents(true);
    getEventParticipantsForCertificates()
      .then((res) => { if (res.success) setEvents(res.events); })
      .catch(() => {})
      .finally(() => setLoadingEvents(false));
  }

  const unissuedCount = selectedEvent
    ? selectedEvent.participants.filter((p) => !p.cert_already_issued).length
    : 0;

  // ── STEP 1: EVENT LIST ────────────────────────────────────────
  if (step === "events") {
    return (
      <div className="p-8 bg-white min-h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className="w-10 h-10 rounded-full bg-[#d97c55]/10 flex items-center justify-center text-[#d97c55]">
            <FileBadge className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-widest uppercase text-[#111827]">
              Issue Event Certificates
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Select an event to assign and issue participation certificates to players
            </p>
          </div>
        </div>

        {loadingEvents ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 text-[#d97c55] animate-spin" />
            <span className="ml-3 text-sm text-gray-500">Loading events...</span>
          </div>
        ) : eventsError ? (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-4">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{eventsError}</span>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Trophy className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold tracking-widest uppercase">No Events Found</p>
            <p className="text-xs mt-1">Create events and add results first.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="border border-gray-200 rounded shadow-sm p-6 hover:border-[#d97c55]/50 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-bold tracking-widest uppercase bg-[#111827] text-white px-2 py-0.5 rounded-sm">
                        {event.category}
                      </span>
                      {event.certs_issued > 0 && event.certs_issued === event.total_participants && (
                        <span className="text-[9px] font-bold tracking-widest uppercase text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-sm">
                          ALL ISSUED
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-base tracking-wide uppercase text-[#111827] mb-2">
                      {event.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {event.start_date} – {event.end_date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {event.total_participants} participant{event.total_participants !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3 min-w-[140px]">
                    {/* Cert progress */}
                    <div className="text-right">
                      <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">
                        CERTS ISSUED
                      </div>
                      <div className="font-heading text-2xl font-bold text-[#111827]">
                        {event.certs_issued}
                        <span className="text-sm font-normal text-gray-400">
                          /{event.total_participants}
                        </span>
                      </div>
                    </div>

                    {event.total_participants === 0 ? (
                      <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 bg-gray-50 border border-gray-200 px-3 py-2 rounded">
                        NO RESULTS YET
                      </div>
                    ) : (
                      <button
                        onClick={() => handleSelectEvent(event)}
                        className="text-[9px] font-bold tracking-widest uppercase bg-[#111827] text-white px-4 py-2 rounded hover:bg-[#d97c55] transition-colors"
                      >
                        MANAGE CERTIFICATES →
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {event.total_participants > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#d97c55] rounded-full transition-all"
                        style={{
                          width: `${Math.round((event.certs_issued / event.total_participants) * 100)}%`,
                        }}
                      />
                    </div>
                    <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mt-1">
                      {Math.round((event.certs_issued / event.total_participants) * 100)}% ISSUED
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── STEP 2: PER-PLAYER ASSIGNMENT ─────────────────────────────
  if (step === "assign" && selectedEvent) {
    return (
      <div className="p-8 bg-white min-h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={handleBack}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:border-[#d97c55] hover:text-[#d97c55] transition-colors"
            title="Back to events"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase">
              ISSUE CERTIFICATES
            </div>
            <h2 className="font-bold text-base tracking-wide uppercase text-[#111827]">
              {selectedEvent.name}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100 ml-11 flex-wrap text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />{selectedEvent.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />{selectedEvent.start_date} – {selectedEvent.end_date}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {unissuedCount} pending, {selectedEvent.certs_issued} already issued
          </span>
        </div>

        {/* Table */}
        {selectedEvent.participants.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm font-semibold tracking-widest uppercase">No participants found</p>
            <p className="text-xs mt-1">Add event results first to see participants here.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded border border-gray-200 mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left text-[9px] font-bold tracking-widest uppercase text-gray-400 px-4 py-3">
                      Player
                    </th>
                    <th className="text-left text-[9px] font-bold tracking-widest uppercase text-gray-400 px-4 py-3">
                      District
                    </th>
                    <th className="text-center text-[9px] font-bold tracking-widest uppercase text-gray-400 px-4 py-3">
                      Position
                    </th>
                    <th className="text-left text-[9px] font-bold tracking-widest uppercase text-gray-400 px-4 py-3 min-w-[220px]">
                      Certificate Type
                    </th>
                    <th className="text-center text-[9px] font-bold tracking-widest uppercase text-gray-400 px-4 py-3">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.participants.map((p, idx) => (
                    <tr
                      key={p.player_id}
                      className={`border-b border-gray-100 last:border-b-0 ${
                        p.cert_already_issued ? "bg-green-50/50" : idx % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-[#111827] text-xs tracking-wide">
                          {p.player_name}
                        </div>
                        <div className="text-[10px] text-gray-400">ID: PLR-{String(p.player_id).padStart(5, "0")}</div>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">{p.district}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#d97c55]/10 text-[#d97c55] font-bold text-xs">
                          {p.position}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {p.cert_already_issued ? (
                          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1.5 rounded">
                            {p.cert_type_issued}
                          </span>
                        ) : (
                          <select
                            value={assignments[p.player_id] ?? positionToCertType(p.position)}
                            onChange={(e) =>
                              handleAssignmentChange(p.player_id, e.target.value as CertificateType)
                            }
                            className="text-xs border border-gray-200 rounded px-2 py-1.5 bg-white text-[#111827] font-medium focus:outline-none focus:border-[#d97c55] focus:ring-1 focus:ring-[#d97c55] w-full cursor-pointer"
                          >
                            {CERT_TYPES.map((ct) => (
                              <option key={ct} value={ct}>
                                {ct}
                              </option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {p.cert_already_issued ? (
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase text-green-700">
                            <CheckCircle2 className="w-3 h-3" /> ISSUED
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold tracking-widest uppercase text-[#d97c55]">
                            PENDING
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Error */}
            {issueError && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4 text-xs">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {issueError}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {unissuedCount > 0 ? (
                  <span>
                    <span className="font-bold text-[#111827]">{unissuedCount}</span> player{unissuedCount !== 1 ? "s" : ""} will receive a new certificate
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold">All players already have certificates.</span>
                )}
              </div>
              <button
                onClick={handleIssue}
                disabled={issuing || unissuedCount === 0}
                className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase bg-[#d97c55] text-white px-6 py-3 rounded hover:bg-[#c46a45] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {issuing ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    ISSUING...
                  </>
                ) : (
                  <>
                    <FileBadge className="w-3 h-3" />
                    ISSUE SELECTED CERTIFICATES
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  // ── STEP 3: RESULT SUMMARY ───────────────────────────────────
  if (step === "result") {
    return (
      <div className="p-8 bg-white min-h-[600px]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${issuedCount > 0 ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}>
            {issuedCount > 0 ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="font-bold text-lg tracking-widest uppercase text-[#111827]">
              {issuedCount > 0 ? "Certificates Issued!" : "Nothing New Issued"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {issuedCount} issued · {skippedCount} skipped
              {selectedEvent ? ` for ${selectedEvent.name}` : ""}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="border border-green-200 bg-green-50 rounded p-5 text-center">
            <div className="text-[9px] font-bold tracking-widest uppercase text-green-600 mb-1">ISSUED</div>
            <div className="font-heading text-4xl font-bold text-green-700">{issuedCount}</div>
          </div>
          <div className="border border-gray-200 bg-gray-50 rounded p-5 text-center">
            <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-1">SKIPPED</div>
            <div className="font-heading text-4xl font-bold text-gray-400">{skippedCount}</div>
          </div>
        </div>

        {/* Issued list */}
        {issuedResult.length > 0 && (
          <div className="mb-6">
            <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-3">
              CERTIFICATES ISSUED
            </div>
            <div className="border border-gray-200 rounded overflow-hidden">
              {issuedResult.map((item, idx) => (
                <div
                  key={item.player_id}
                  className={`flex items-center justify-between px-4 py-3 ${idx !== issuedResult.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-[#111827]">{item.player_name}</div>
                      <div className="text-[10px] text-gray-400">ID: PLR-{String(item.player_id).padStart(5, "0")}</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-[#d97c55] bg-[#d97c55]/10 px-2 py-1 rounded">
                    {item.cert_type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skipped list */}
        {skippedResult.length > 0 && (
          <div className="mb-8">
            <div className="text-[9px] font-bold tracking-widest uppercase text-gray-400 mb-3">
              SKIPPED
            </div>
            <div className="border border-gray-200 rounded overflow-hidden">
              {skippedResult.map((item, idx) => (
                <div
                  key={`${item.player_id}-${idx}`}
                  className={`flex items-center justify-between px-4 py-3 ${idx !== skippedResult.length - 1 ? "border-b border-gray-100" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="text-xs text-gray-600">
                      {item.player_name ? item.player_name : `Player #${item.player_id}`}
                    </div>
                  </div>
                  <span className="text-[9px] text-gray-400 italic">{item.reason}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase border border-[#111827] text-[#111827] px-6 py-3 rounded hover:bg-[#111827] hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3 h-3" />
          BACK TO EVENTS
        </button>
      </div>
    );
  }

  return null;
}
