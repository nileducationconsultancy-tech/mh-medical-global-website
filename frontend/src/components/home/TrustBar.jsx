import React from "react";
import { Users, Landmark, Star, Globe, Headphones } from "lucide-react";

export function TrustBar() {
  const stats = [
    {
      value: "5000+",
      label: "Students Counselled",
      subtext: "Across Indian States & UTs",
      icon: Users,
      bgColor: "bg-rose-100",
      iconColor: "text-[#D90436]"
    },
    {
      value: "20+",
      label: "Government Universities",
      subtext: "State Medical Academies",
      icon: Landmark,
      bgColor: "bg-blue-100",
      iconColor: "text-[#0752B8]"
    },
    {
      value: "100%",
      label: "Verified Information",
      subtext: "NMC FMGL 2021 Compliant",
      icon: Star,
      bgColor: "bg-amber-100",
      iconColor: "text-amber-500",
      iconFill: true
    },
    {
      value: "3+",
      label: "Countries",
      subtext: "Uzbekistan, Kazakhstan, etc.",
      icon: Globe,
      bgColor: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      value: "24/7",
      label: "Admission Support",
      subtext: "Dedicated Student Desk",
      icon: Headphones,
      bgColor: "bg-rose-100",
      iconColor: "text-[#D90436]"
    }
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/50 p-4 sm:p-6 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-3.5 ${
                idx === 4 ? "col-span-2 md:col-span-1 justify-center md:justify-start pt-3 md:pt-0" : ""
              } ${idx > 0 && idx < 4 ? "pt-3 md:pt-0 md:pl-4" : ""} ${idx === 0 ? "md:pr-3" : ""}`}
            >
              {/* Colorful Circular Icon */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${stat.bgColor} ${stat.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconFill ? "fill-amber-500" : ""}`} />
              </div>

              {/* Stat Value & Label */}
              <div className="leading-tight">
                <p className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#082B57] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-[#082B57] mt-0.5 whitespace-nowrap">
                  {stat.label}
                </p>
                <p className="text-[10px] text-[#64748B] font-medium hidden sm:block truncate mt-0.5">
                  {stat.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TrustBar;