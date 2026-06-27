"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Award, Star, BookOpen, Shield, Medal, Download, Loader2, Trophy, CheckCircle2 } from "lucide-react";
import { getMyCertificates, CertificateData, downloadCertificatePdf } from "@/lib/api";

// Tier config per certificate type keyword
function getCertConfig(title: string, iconType: string) {
  const t = title.toLowerCase();
  if (t.includes("1st") || t.includes("first")) {
    return {
      gradient: "from-[#F3E5AB] via-[#D4AF37] to-[#AA7900]",
      bg: "bg-[#FAFAFA]",
      border: "border-[#D4AF37]",
      badge: "bg-gradient-to-br from-[#D4AF37] to-[#AA7900]",
      ribbon: "bg-[#D4AF37]",
      label: "1ST PLACE",
      labelColor: "text-[#AA7900]",
      icon: <Trophy className="w-8 h-8 text-white drop-shadow-md" />,
      glow: "shadow-[0_4px_20px_rgba(212,175,55,0.15)] hover:shadow-[0_8px_30px_rgba(212,175,55,0.3)]",
      idBg: "bg-[#FFF9E6] border-[#D4AF37]",
    };
  }
  if (t.includes("2nd") || t.includes("second")) {
    return {
      gradient: "from-[#E0E0E0] via-[#BDBDBD] to-[#757575]",
      bg: "bg-[#FAFAFA]",
      border: "border-[#9E9E9E]",
      badge: "bg-gradient-to-br from-[#BDBDBD] to-[#757575]",
      ribbon: "bg-[#9E9E9E]",
      label: "2ND PLACE",
      labelColor: "text-[#616161]",
      icon: <Medal className="w-8 h-8 text-white drop-shadow-md" />,
      glow: "shadow-[0_4px_20px_rgba(158,158,158,0.15)] hover:shadow-[0_8px_30px_rgba(158,158,158,0.3)]",
      idBg: "bg-[#F5F5F5] border-[#9E9E9E]",
    };
  }
  if (t.includes("3rd") || t.includes("third")) {
    return {
      gradient: "from-[#FAD6A5] via-[#CD7F32] to-[#8B4513]",
      bg: "bg-[#FAFAFA]",
      border: "border-[#CD7F32]",
      badge: "bg-gradient-to-br from-[#CD7F32] to-[#8B4513]",
      ribbon: "bg-[#CD7F32]",
      label: "3RD PLACE",
      labelColor: "text-[#8B4513]",
      icon: <Award className="w-8 h-8 text-white drop-shadow-md" />,
      glow: "shadow-[0_4px_20px_rgba(205,127,50,0.15)] hover:shadow-[0_8px_30px_rgba(205,127,50,0.3)]",
      idBg: "bg-[#FFF3E0] border-[#CD7F32]",
    };
  }
  if (t.includes("runner")) {
    return {
      gradient: "from-[#B3E5FC] via-[#29B6F6] to-[#0277BD]",
      bg: "bg-[#FAFAFA]",
      border: "border-[#0288D1]",
      badge: "bg-gradient-to-br from-[#29B6F6] to-[#0277BD]",
      ribbon: "bg-[#0288D1]",
      label: "RUNNER-UP",
      labelColor: "text-[#0277BD]",
      icon: <Shield className="w-8 h-8 text-white drop-shadow-md" />,
      glow: "shadow-[0_4px_20px_rgba(2,136,209,0.15)] hover:shadow-[0_8px_30px_rgba(2,136,209,0.3)]",
      idBg: "bg-[#E1F5FE] border-[#0288D1]",
    };
  }
  // Default: Participation
  return {
    gradient: "from-[#FFCCBC] via-[#FF7043] to-[#D84315]",
    bg: "bg-[#FAFAFA]",
    border: "border-[#FF5722]",
    badge: "bg-gradient-to-br from-[#FF7043] to-[#D84315]",
    ribbon: "bg-[#FF5722]",
    label: "PARTICIPATION",
    labelColor: "text-[#D84315]",
    icon: <BookOpen className="w-8 h-8 text-white drop-shadow-md" />,
    glow: "shadow-[0_4px_20px_rgba(255,87,34,0.15)] hover:shadow-[0_8px_30px_rgba(255,87,34,0.3)]",
    idBg: "bg-[#FBE9E7] border-[#FF5722]",
  };
}

export default function MyCertificates() {
  const { authUser } = useAuth();
  const [certificates, setCertificates] = useState<CertificateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

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
      
      setDownloadSuccessId(certId);
      setTimeout(() => setDownloadSuccessId(null), 3000);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-sm animate-pulse" />
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
        <div className="p-16 text-center">
          <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-5 border border-orange-100">
            <Award className="w-10 h-10 text-[#d97c55]" />
          </div>
          <p className="text-base font-bold text-gray-800 tracking-wider uppercase mb-2">No Certificates Yet</p>
          <p className="text-sm text-gray-500 max-w-md mx-auto">Participate in tournaments and events to earn official UPHA certificates. They will appear here once issued.</p>
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
        <div className="text-[9px] font-bold tracking-widest text-gray-400 uppercase bg-gray-100 px-3 py-1 rounded-full">
          {certificates.length} ISSUED
        </div>
      </div>

      {/* Premium Certificate Cards Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 xl:grid-cols-2 gap-8 bg-[#fdfdfd]">
        {certificates.map((cert) => {
          const cfg = getCertConfig(cert.title, cert.icon_type);
          const isDownloading = downloadingId === cert.certificate_id;
          const isSuccess = downloadSuccessId === cert.certificate_id;

          return (
            <div
              key={cert.id}
              className={`relative bg-white border ${cfg.border} ${cfg.glow} p-2 transition-all duration-300 group hover:-translate-y-1`}
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
              }}
            >
              {/* Animated Shimmer Effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-10" />

              {/* Ornate Inner Border */}
              <div className={`relative h-full w-full border-[3px] border-double ${cfg.border} border-opacity-60 p-6 flex flex-col justify-between bg-white/70 backdrop-blur-[2px]`}>
                
                {/* Diagonal Ribbon Overlay */}
                <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 pointer-events-none">
                  <div className={`absolute top-6 -right-8 w-48 ${cfg.ribbon} text-white text-[9px] font-bold tracking-[0.2em] py-1.5 text-center shadow-md transform rotate-45`}>
                    OFFICIAL
                  </div>
                </div>

                <div className="flex flex-col h-full z-20 relative">
                  {/* Top: Seal & Issue Date */}
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-16 rounded-full ${cfg.badge} flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-opacity-50 ${cfg.border.replace('border-', 'ring-')}`}>
                      {cfg.icon}
                    </div>
                    <div className="text-right">
                      <div className={`text-[10px] font-bold tracking-[0.15em] uppercase ${cfg.labelColor} mb-1`}>
                        {cfg.label}
                      </div>
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest bg-white/80 px-2 py-0.5 rounded shadow-sm border border-gray-100">
                        {new Date(cert.created_at).toLocaleDateString("en-IN", {
                          day: "2-digit", month: "short", year: "numeric",
                        }).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Title & Recipient */}
                  <div className="text-center flex-1 flex flex-col justify-center mb-6">
                    <div className="text-[9px] font-bold tracking-[0.3em] text-gray-400 uppercase mb-2">
                      Certificate of
                    </div>
                    <h3 className={`font-serif text-2xl font-bold ${cfg.labelColor} mb-2 leading-tight`}>
                      {cert.title}
                    </h3>
                    <div className="text-xs text-gray-500 italic mb-3 font-serif">
                      Proudly presented to
                    </div>
                    <div className="font-heading text-xl font-black text-[#111827] uppercase tracking-wide border-b border-gray-300 pb-2 mx-auto inline-block px-4">
                      {authUser?.name || "Player"}
                    </div>
                    {cert.details && (
                      <p className="text-[11px] text-gray-600 leading-relaxed mt-4 max-w-[90%] mx-auto font-serif italic">
                        "{cert.details}"
                      </p>
                    )}
                  </div>

                  {/* Bottom: ID & Download Action */}
                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <div className="text-[8px] font-bold tracking-widest text-gray-400 uppercase mb-1">
                        Certificate ID
                      </div>
                      <div className={`inline-flex items-center gap-1.5 border ${cfg.idBg} rounded px-2 py-0.5`}>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-700 uppercase">
                          {cert.certificate_id}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownload(cert.certificate_id)}
                      disabled={isDownloading || isSuccess}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded text-[10px] font-bold tracking-widest uppercase transition-all shadow-md
                        ${isSuccess 
                          ? 'bg-green-600 text-white' 
                          : `${cfg.badge} text-white hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5`
                        }
                        disabled:opacity-80 disabled:cursor-not-allowed`}
                    >
                      {isDownloading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> DOWNLOADING</>
                      ) : isSuccess ? (
                        <><CheckCircle2 className="w-4 h-4" /> DOWNLOADED</>
                      ) : (
                        <><Download className="w-4 h-4 drop-shadow-sm" /> DOWNLOAD PDF</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Required for Tailwind dynamic animation classes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}} />
    </div>
  );
}

