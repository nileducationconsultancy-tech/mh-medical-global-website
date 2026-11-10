import React from "react";
import { Users, Landmark, Star, Globe, Headphones } from "lucide-react";

export function TrustBar() {
  const stats = [
    {
      value: "5000+",
      label: "Students Counselled",
      subtext: "Across Indian States & UTs",
      icon: Users,
      bgColor: "bg-[#E8D2B5]/60",
      iconColor: "text-[#590907]"
    },
    {
      value: "20+",
      label: "Government Universities",
      subtext: "State Medical Academies",
      icon: Landmark,
      bgColor: "bg-[#ECEDE8]",
      iconColor: "text-[#590907]"
    },
    {
      value: "100%",
      label: "Verified Information",
      subtext: "NMC FMGL 2021 Compliant",
      icon: Star,
      bgColor: "bg-[#A5A79B]/25",
      iconColor: "text-[#201C1A]",
      iconFill: true
    },
    {
      value: "3+",
      label: "Countries",
      subtext: "Uzbekistan, Kazakhstan, etc.",
      icon: Globe,
      bgColor: "bg-[#E8D2B5]/60",
      iconColor: "text-[#590907]"
    },
    {
      value: "24/7",
      label: "Admission Support",
      subtext: "Dedicated Student Desk",
      icon: Headphones,
      bgColor: "bg-[#ECEDE8]",
      iconColor: "text-[#590907]"
    }
  ];

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#DEDCD4] shadow-md p-4 sm:p-6 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 items-center divide-y md:divide-y-0 md:divide-x divide-[#DEDCD4]">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`flex items-center gap-3.5 ${
                idx === 4 ? "col-span-2 md:col-span-1 justify-center md:justify-start pt-3 md:pt-0" : ""
              } ${idx > 0 && idx < 4 ? "pt-3 md:pt-0 md:pl-4" : ""} ${idx === 0 ? "md:pr-3" : ""}`}
            >
              {/* Institutional Circular Icon */}
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${stat.bgColor} ${stat.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.iconFill ? "fill-[#201C1A]" : ""}`} />
              </div>

              {/* Stat Value & Label */}
              <div className="leading-tight">
                <p className="text-xl sm:text-2xl lg:text-[26px] font-black text-[#201C1A] tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-[13px] font-bold text-[#201C1A] mt-0.5 whitespace-nowrap">
                  {stat.label}
                </p>
                <p className="text-[10px] text-[#77776F] font-medium hidden sm:block truncate mt-0.5">
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