"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, FileText, Star, BookOpen, Download, Clock } from "lucide-react";
import { getMyCertificates, CertificateData } from "@/lib/api";

const ICON_MAP: Record<string, React.ReactNode> = {
  Award: <Award className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
  Clock: <Clock className="w-5 h-5" />
};

export default function MyCertificates() {
  const { authUser } = useAuth();
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const res = await getMyCertificates();
        if (res.success && res.certificates) {
          setCertificates(res.certificates);
        }
      } catch (err) {
        console.error("Failed to fetch certificates", err);
      } finally {
        setLoading(false);
      }
    }
    if (authUser) {
      fetchCertificates();
    }
  }, [authUser]);

  if (loading) {
    return <div className="bg-white border border-gray-200 shadow-sm rounded-sm h-64 animate-pulse" />;
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="p-6 border-b border-gray-200">
          <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-[#111827]">
            MY CERTIFICATES
          </h2>
        </div>
        <div className="p-8 text-center text-sm text-gray-500">
          No certificates issued yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="font-heading text-lg font-bold uppercase tracking-wide text-[#111827]">
          MY CERTIFICATES
        </h2>
      </div>
      <div className="divide-y divide-gray-100">
        {certificates.map((cert) => {
          const iconNode = ICON_MAP[cert.icon_type] || <Award className="w-5 h-5" />;
          let iconBg = "bg-orange-50 text-[#d97c55] border border-orange-100";
          let statusColor = "text-[#d97c55]";
          
          if (cert.icon_type === "Star") {
            iconBg = "bg-[#d97c55] text-white";
            statusColor = "text-gray-500";
          } else if (cert.status === "Historical") {
            iconBg = "bg-[#111827] text-white";
            statusColor = "text-gray-500";
          }
          
          return (
            <div key={cert.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded flex items-center justify-center shrink-0 ${iconBg}`}>
                  {iconNode}
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-widest text-[#111827] uppercase mb-1">
                    {cert.title}
                  </h3>
                  <div className="text-[10px] font-mono text-gray-500 uppercase flex flex-wrap gap-2 items-center">
                    <span className={`${statusColor} font-semibold`}>{cert.status}</span>
                    <span>&middot;</span>
                    <span>{cert.details}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 ml-16 md:ml-0 shrink-0">
                <div className="bg-[#fcfbf9] border border-gray-200 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                  {cert.certificate_id}
                </div>
                <button className="bg-[#111827] text-white px-4 py-2 rounded text-[10px] font-bold tracking-widest uppercase hover:bg-[#1f2937] transition-colors flex items-center gap-2">
                  <Download className="w-3.5 h-3.5" />
                  DOWNLOAD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
