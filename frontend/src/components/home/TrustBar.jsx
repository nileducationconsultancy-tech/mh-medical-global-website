import React from "react";
import { ShieldCheck, ExternalLink } from "lucide-react";

export function TrustBar() {
  const accreditations = [
    {
      name: "National Medical Commission (NMC)",
      country: "India",
      status: "FMGL 2021 Alignment (54m + 12m)",
      url: "https://www.nmc.org.in/",
      badge: "NMC India"
    },
    {
      name: "World Directory of Medical Schools (WDOMS / WHO)",
      country: "Global",
      status: "Official Listing & ECFMG Sponsor",
      url: "https://www.wdoms.org/",
      badge: "WDOMS / WHO"
    },
    {
      name: "Ministry of Health of Uzbekistan",
      country: "Uzbekistan",
      status: "Chartered State Medical Academies",
      url: "https://ssv.uz/en",
      badge: "Ministry of Health UZ"
    },
    {
      name: "FAIMER / ECFMG Directory",
      country: "USA",
      status: "USMLE Eligibility Listing",
      url: "https://www.faimer.org/",
      badge: "FAIMER USA"
    }
  ];

  return (
    <div className="bg-[#041B44] text-white border-y border-[#0B2D64] py-6 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Trust Statement */}
        <div className="flex items-center gap-3 shrink-0 text-center lg:text-left">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#9ABAD9]/30 flex items-center justify-center text-[#9ABAD9] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Official Regulatory Alignment & Accreditation
            </p>
            <p className="text-[11px] text-slate-300">
              Recognized under Indian NMC FMGL 2021 Guidelines & International Medical Directories
            </p>
          </div>
        </div>

        {/* Accreditation Logos / Pills with Outbound Source Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-auto">
          {accreditations.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#9ABAD9]/50 transition-all flex flex-col justify-center text-center sm:text-left"
              title={`Visit official ${item.name} portal`}
            >
              <div className="flex items-center justify-between gap-1 text-[11px] font-extrabold text-white group-hover:text-[#9ABAD9]">
                <span>{item.badge}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white shrink-0" />
              </div>
              <span className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                {item.status}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrustBar;
