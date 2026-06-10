"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, FileText, Star, BookOpen, Download, Clock } from "lucide-react";

export default function MyCertificates() {
  const { authUser } = useAuth();
  
  // Decide which certs to show based on role
  const role = authUser?.role;

  const coachCertificates = [
    {
      id: 1,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "ANNUAL COACH ACCREDITATION · 2026",
      status: "Active",
      statusColor: "text-[#d97c55]",
      details: "State Grade · Valid through 31 Mar 2027",
      certId: "CERT-CCH-2026-00128",
    },
    {
      id: 2,
      icon: <Star className="w-5 h-5" />,
      iconBg: "bg-[#d97c55] text-white",
      title: "COACHING GRADE CERTIFICATE - STATE GRADE",
      status: "Permanent",
      statusColor: "text-gray-500",
      details: "Awarded 18 Sep 2022 · Subject to renewal every 5 years",
      certId: "CERT-GRD-CCH-22-5128",
    },
    {
      id: 3,
      icon: <BookOpen className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "NATIONAL REFRESHER COURSE - 2025",
      status: "HAI Coaching Refresher",
      statusColor: "text-gray-500",
      details: "Patiala · Issued 22 Aug 2025",
      certId: "CERT-RFR-NAT-25-128",
    },
    {
      id: 4,
      icon: <FileText className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "WORKSHOP - SPORTS PSYCHOLOGY & ATHLETE WELFARE",
      status: "UPHA Workshop",
      statusColor: "text-gray-500",
      details: "Lucknow · Issued 12 Nov 2024",
      certId: "CERT-WKS-PSY-24-128",
    },
    {
      id: 5,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "ANNUAL COACH ACCREDITATION · 2025",
      status: "Historical",
      statusColor: "text-gray-500",
      details: "Issued 02 Apr 2025 · Expired 31 Mar 2026",
      certId: "CERT-CCH-2025-00128",
    },
  ];

  const refereeCertificates = [
    {
      id: 1,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "ANNUAL REFEREE ACCREDITATION · 2026",
      status: "Active",
      statusColor: "text-[#d97c55]",
      details: "Grade A · State Panel · Valid through 31 Mar 2027",
      certId: "CERT-RFR-2026-00045",
    },
    {
      id: 2,
      icon: <Star className="w-5 h-5" />,
      iconBg: "bg-[#d97c55] text-white",
      title: "REFEREEING GRADE CERTIFICATE - GRADE A",
      status: "Permanent",
      statusColor: "text-[#d97c55]",
      details: "Awarded 14 Jul 2023 · Renewable every 5 years",
      certId: "CERT-GRD-RFR-23-AG45",
    },
    {
      id: 3,
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "OFFICIATING RECORD - STATE SENIOR 2025",
      status: "9 matches officiated",
      statusColor: "text-gray-500",
      details: "Including Final · Issued 16 Dec 2025",
      certId: "CERT-OFC-SSC-25-045",
    },
    {
      id: 4,
      icon: <BookOpen className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "REFEREEING REFRESHER COURSE - 2025",
      status: "UPHA Workshop",
      statusColor: "text-gray-500",
      details: "Kanpur · Issued 12 Nov 2025",
      certId: "CERT-RFC-RFR-25-045",
    },
    {
      id: 5,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "ANNUAL REFEREE ACCREDITATION · 2025",
      status: "Historical",
      statusColor: "text-gray-500",
      details: "Issued 04 Apr 2025 · Expired 31 Mar 2026",
      certId: "CERT-RFR-2025-00045",
    },
  ];

  const academyCertificates = [
    {
      id: 1,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-[#111827] text-white",
      title: "ANNUAL ACADEMY AFFILIATION - 2026",
      status: "Active",
      statusColor: "text-[#d97c55]",
      details: "Issued 14 Feb 2026 · Valid through 31 Mar 2027",
      certId: "CERT-ACA-2026-00031",
    },
    {
      id: 2,
      icon: <Star className="w-5 h-5" />,
      iconBg: "bg-[#e8c69f] text-[#8e5c2b]",
      title: "FOUNDING AFFILIATION CERTIFICATE",
      status: "Permanent",
      statusColor: "text-[#d97c55]",
      details: "Original registration · Issued 16 Aug 2014",
      certId: "CERT-ACA-FND-14-031",
    },
    {
      id: 3,
      icon: <FileText className="w-5 h-5" />,
      iconBg: "bg-emerald-50 text-emerald-600 border border-emerald-100",
      title: "EQUIPMENT GRANT ACKNOWLEDGEMENT - 2025",
      status: "Sub-Junior Equipment Kit",
      statusColor: "text-gray-500",
      details: "UPHA Grant Scheme · Issued 10 Jul 2025",
      certId: "CERT-EQP-GRT-25-031",
    },
    {
      id: 4,
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "TRIAL HOSTING CERTIFICATE - AWADH ZONE 2025",
      status: "Junior Selection Trials",
      statusColor: "text-gray-500",
      details: "Hosted on academy grounds · Issued 12 Jul 2025",
      certId: "CERT-HST-AWZ-25-031",
    },
    {
      id: 5,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-[#111827] text-white",
      title: "ANNUAL ACADEMY AFFILIATION - 2025",
      status: "Historical",
      statusColor: "text-gray-500",
      details: "Issued 21 Mar 2025 · Expired 31 Mar 2026",
      certId: "CERT-ACA-2025-00031",
    },
  ];

  const playerCertificates = [
    {
      id: 1,
      icon: <Award className="w-5 h-5" />,
      iconBg: "bg-orange-50 text-[#d97c55] border border-orange-100",
      title: "ANNUAL MEMBERSHIP CERTIFICATE · 2026",
      status: "Active",
      statusColor: "text-[#d97c55]",
      details: "Issued 02 Feb 2026 · Valid through 31 Mar 2027",
      certId: "CERT-PLR-2026-00417",
    },
  ];

  let certificates = playerCertificates;
  if (role === "coach") certificates = coachCertificates;
  if (role === "referee") certificates = refereeCertificates;
  if (role === "admin") certificates = academyCertificates; // Usually an academy admin would be logged in, maybe the role is "admin" or "academy"?
  // To be safe, also check if URL is academy or we just default to player. Wait, if the role is 'admin', it's admin. Let's use `typeof window !== 'undefined' && window.location.pathname.includes('/academy')` as a fallback or just use `academyCertificates` if role == "academy"
  // Wait, in `api.ts` we have role: "admin" | "player" | "coach" | "referee". And `AcademyData` has adhyaksha: UserData | null. So academy doesn't have a specific role, it's just 'admin'. Actually let's just make it check the window.location for now if role isn't explicitly one of the others.
  
  if (typeof window !== 'undefined' && window.location.pathname.includes('/academy')) {
    certificates = academyCertificates;
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-[#111827]">
          MY CERTIFICATES
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {certificates.map((cert) => (
          <div key={cert.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${cert.iconBg}`}>
                {cert.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold tracking-widest text-[#111827] uppercase mb-1">
                  {cert.title}
                </h3>
                <div className="text-[10px] font-mono text-gray-500 uppercase flex flex-wrap gap-2 items-center">
                  <span className={`${cert.statusColor} font-semibold`}>{cert.status}</span>
                  <span>&middot;</span>
                  <span>{cert.details}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 ml-16 md:ml-0 shrink-0">
              <div className="bg-[#fcfbf9] border border-gray-200 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                {cert.certId}
              </div>
              <button className="bg-[#111827] text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#1f2937] transition-colors flex items-center gap-2">
                <Download className="w-3.5 h-3.5" />
                DOWNLOAD
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
