import React from "react";
import { ShieldCheck, ExternalLink, Calendar } from "lucide-react";

export function SourceBadge({ sources = [], lastVerified = "October 2026" }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="bg-[#EBF3FA] border border-[#D9E2EC] rounded-xl p-3.5 text-xs text-[#063280] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#063280] shrink-0" />
        <span className="font-bold">Verified Data Sources:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {sources.map((src, i) => (
            <a
              key={i}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 text-[#063280] hover:text-[#1558A9] font-medium px-2 py-0.5 rounded border border-[#D9E2EC] transition-colors"
            >
              {src.title}
              <ExternalLink className="w-2.5 h-2.5 opacity-60" />
            </a>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 text-[#1558A9] shrink-0 font-medium">
        <Calendar className="w-3.5 h-3.5" />
        <span>Last Checked: {lastVerified}</span>
      </div>
    </div>
  );
}

export function DisclaimerBanner({ type = "general" }) {
  return (
    <div className="bg-[#F7FAFC] border border-[#D9E2EC] rounded-xl p-3.5 text-xs text-[#475569] flex items-start gap-2.5">
      <div className="p-1 bg-[#EBF3FA] rounded-md shrink-0 mt-0.5">
        <ShieldCheck className="w-4 h-4 text-[#063280]" />
      </div>
      <div className="leading-relaxed">
        <p className="font-bold text-[#063280] mb-0.5">Regulatory Transparency & Integrity Notice</p>
        <p className="text-[#475569]">
          Medical university fees, entrance criteria, visa guidelines, and NMC (National Medical Commission) regulations are subject to official government notifications. MH GLOBAL EDUCATION CONSULTANT provides verified educational guidance and does not make arbitrary admission or licensing guarantees. Always verify live details with the respective institution and the NMC Gazette.
        </p>
      </div>
    </div>
  );
}
