"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, Star, BookOpen, Shield, Medal, Download, Loader2, Trophy } from "lucide-react";
import { getMyCertificates, CertificateData, downloadCertificatePdf } from "@/lib/api";

// Tier config per certificate type keyword
function getCertConfig(title: string, iconType: string) {
  const t = title.toLowerCase();
  if (t.includes("1st") || t.includes("first")) {
    return {
      gradient: "from-[#b8860b] via-[#ffd700] to-[#b8860b]",
      bg: "bg-gradient-to-br from-[#fffbeb] to-[#fef3c7]",
      border: "border-[#d4a017]",
      badge: "bg-gradient-to-br from-[#b8860b] to-[#ffd700]",
      ribbon: "bg-[#b8860b]",
      label: "1ST PLACE",
      labelColor: "text-[#92600a]",
      icon: <Trophy className="w-6 h-6 text-white drop-shadow" />,
      glow: "shadow-[0_0_20px_rgba(212,160,23,0.3)]",
      idBg: "bg-[#fef3c7] border-[#d4a017]",
    };
  }
  if (t.includes("2nd") || t.includes("second")) {
    return {
      gradient: "from-[#9e9e9e] via-[#e8e8e8] to-[#9e9e9e]",
      bg: "bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]",
      border: "border-[#bdbdbd]",
      badge: "bg-gradient-to-br from-[#9e9e9e] to-[#e0e0e0]",
      ribbon: "bg-[#9e9e9e]",
      label: "2ND PLACE",
      labelColor: "text-[#616161]",
      icon: <Medal className="w-6 h-6 text-white drop-shadow" />,
      glow: "shadow-[0_0_20px_rgba(158,158,158,0.3)]",
      idBg: "bg-[#f3f4f6] border-[#bdbdbd]",
    };
  }
  if (t.includes("3rd") || t.includes("third")) {
    return {
      gradient: "from-[#8d4e28] via-[#cd7f32] to-[#8d4e28]",
      bg: "bg-gradient-to-br from-[#fff7f0] to-[#fce8d5]",
      border: "border-[#cd7f32]",
      badge: "bg-gradient-to-br from-[#8d4e28] to-[#cd7f32]",
      ribbon: "bg-[#8d4e28]",
      label: "3RD PLACE",
      labelColor: "text-[#8d4e28]",
      icon: <Award className="w-6 h-6 text-white drop-shadow" />,
      glow: "shadow-[0_0_20px_rgba(205,127,50,0.3)]",
      idBg: "bg-[#fce8d5] border-[#cd7f32]",
    };
  }
  if (t.includes("runner")) {
    return {
      gradient: "from-[#1e3a5f] via-[#2d5a9e] to-[#1e3a5f]",
      bg: "bg-gradient-to-br from-[#eff6ff] to-[#dbeafe]",
      border: "border-[#2d5a9e]",
      badge: "bg-gradient-to-br from-[#1e3a5f] to-[#2d5a9e]",
      ribbon: "bg-[#1e3a5f]",
      label: "RUNNER-UP",
      labelColor: "text-[#1e3a5f]",
      icon: <Shield className="w-6 h-6 text-white drop-shadow" />,
      glow: "shadow-[0_0_20px_rgba(45,90,158,0.25)]",
      idBg: "bg-[#dbeafe] border-[#2d5a9e]",
    };
  }
  // Default: Participation
  return {
    gradient: "from-[#111827] via-[#374151] to-[#111827]",
    bg: "bg-gradient-to-br from-[#f9fafb] to-[#f3f4f6]",
    border: "border-[#374151]",
    badge: "bg-gradient-to-br from-[#111827] to-[#374151]",
    ribbon: "bg-[#d97c55]",
    label: "PARTICIPATION",
    labelColor: "text-[#374151]",
    icon: <BookOpen className="w-6 h-6 text-white drop-shadow" />,
    glow: "shadow-[0_0_16px_rgba(55,65,81,0.15)]",
    idBg: "bg-[#f3f4f6] border-[#374151]",
  };
}

export default function MyCertificates() {
  const { authUser } = useAuth();
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (certId: string) => {
    try {
      setDownloadingId(certId);
      const blob = await downloadCertificatePdf(certId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `certificate_${certId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err: any) {
      console.error("Failed to download certificate", err);
      alert(err.message || "Failed to download certificate");
    } finally {
      setDownloadingId(null);
    }
  };

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
    if (authUser) fetchCertificates();
  }, [authUser]);

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm p-8">
        <div className="h-6 w-48 bg-gray-100 rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-56 bg-gray-100 rounded-sm animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
        <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
          <div>
            <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1">ACHIEVEMENTS</div>
            <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-[#111827]">MY CERTIFICATES</h2>
          </div>
        </div>
        <div className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">No Certificates Yet</p>
          <p className="text-xs text-gray-400 mt-1">Certificates will appear here once issued by the federation.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-sm">
      {/* Section Header */}
      <div className="p-6 md:p-8 border-b border-gray-100 flex items-center justify-between">
        <div>
          <div className="text-[9px] font-bold tracking-widest text-[#d97c55] uppercase mb-1">ACHIEVEMENTS</div>
          <h2 className="font-heading text-xl font-bold uppercase tracking-wide text-[#111827]">MY CERTIFICATES</h2>
        </div>
        <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">
          {certificates.length} ISSUED
        </div>
      </div>

      {/* Certificate Cards Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {certificates.map((cert) => {
          const cfg = getCertConfig(cert.title, cert.icon_type);
          const isDownloading = downloadingId === cert.certificate_id;

          return (
            <div
              key={cert.id}
              className={`relative rounded-sm border ${cfg.border} ${cfg.bg} ${cfg.glow} overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-200`}
            >
              {/* Top ribbon accent */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${cfg.gradient}`} />

              {/* Decorative corner watermark */}
              <div className="absolute top-3 right-3 opacity-5 pointer-events-none select-none">
                <Award className="w-20 h-20" />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">

                {/* Badge + tier label row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${cfg.badge} flex items-center justify-center shrink-0 shadow-md`}>
                    {cfg.icon}
                  </div>
                  <div>
                    <div className={`text-[9px] font-bold tracking-widest uppercase ${cfg.labelColor}`}>
                      {cfg.label}
                    </div>
                    <div className="text-[8px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">
                      {new Date(cert.created_at).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      }).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Certificate title */}
                <h3 className="font-heading text-base font-bold uppercase tracking-wide text-[#111827] leading-snug mb-1">
                  {cert.title}
                </h3>

                {/* Details line */}
                {cert.details && (
                  <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
                    {cert.details}
                  </p>
                )}

                {/* Cert ID pill */}
                <div className={`inline-flex items-center gap-1.5 self-start border ${cfg.idBg} rounded-sm px-2.5 py-1 mb-4`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                  <span className="text-[9px] font-mono font-bold tracking-widest text-gray-600 uppercase">
                    {cert.certificate_id}
                  </span>
                </div>

                {/* Divider */}
                <div className={`border-t border-current opacity-10 mb-4`} />

                {/* Download button */}
                <button
                  onClick={() => handleDownload(cert.certificate_id)}
                  disabled={isDownloading}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm text-[9px] font-bold tracking-widest uppercase transition-all
                    bg-[#111827] text-white hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed
                    group-hover:shadow-sm`}
                >
                  {isDownloading ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> DOWNLOADING…</>
                  ) : (
                    <><Download className="w-3.5 h-3.5" /> DOWNLOAD CERTIFICATE</>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
