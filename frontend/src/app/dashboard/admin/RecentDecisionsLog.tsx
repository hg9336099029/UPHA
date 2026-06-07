"use client";

import { Check, X, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getDecisionLog, DecisionLogData } from "@/lib/api";

export default function RecentDecisionsLog() {
  const [decisions, setDecisions] = useState<DecisionLogData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDecisionLog()
      .then((res) => {
        if (res.success) {
          setDecisions(res.decisions);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center p-6 md:p-8 border-b border-gray-100">
        <h3 className="font-heading text-xl font-bold uppercase text-primary">RECENT DECISIONS</h3>
      </div>

      {/* Decisions Feed */}
      <div className="flex flex-col">
        {loading && (
          <div className="p-8 text-center text-sm text-gray-400 animate-pulse">
            Loading recent decisions...
          </div>
        )}

        {!loading && decisions.length === 0 && (
          <div className="p-8 text-center text-sm text-gray-400">
            No recent decisions found.
          </div>
        )}

        {!loading && decisions.map((d, index) => {
          const isApproved = d.action === "Approved";
          const isRejected = d.action === "Rejected";
          
          const Icon = isApproved ? Check : isRejected ? X : Clock;
          const bgClass = isApproved ? "bg-emerald-50 text-emerald-600" : isRejected ? "bg-red-50 text-red-600" : "bg-orange-50 text-accent";
          
          const dateObj = new Date(d.created_at);
          const dateStr = dateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
          const timeStr = dateObj.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

          return (
            <div key={d.id} className={`flex flex-col md:flex-row items-start md:items-center justify-between p-6 md:p-8 hover:bg-gray-50/50 transition-colors gap-6 ${index < decisions.length - 1 ? "border-b border-gray-50" : ""}`}>
              <div className="flex gap-4 items-start w-full md:w-3/4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bgClass}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm text-gray-800 leading-relaxed mb-1">
                    <span className="font-bold">{d.action}</span> &middot; {d.applicant_name_ref} &middot; {d.notes || d.details}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-wider">
                    {d.action} by {d.admin_name}
                  </div>
                </div>
              </div>
              <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase w-full md:w-auto md:text-right md:pl-0 pl-12 shrink-0">
                {dateStr} &middot; {timeStr}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
