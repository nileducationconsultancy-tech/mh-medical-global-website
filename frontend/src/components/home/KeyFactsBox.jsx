import React from "react";
import { Clock, BookOpen, DollarSign, Award, Plane, ShieldCheck } from "lucide-react";
import { CANONICAL_PRICING_SUMMARY } from "../../data/universitiesData";

export function KeyFactsBox() {
  const facts = [
    {
      icon: Clock,
      label: "Course Duration",
      value: "6 Years Total",
      subtext: "54 Months Academic + 12 Months In-House Internship"
    },
    {
      icon: BookOpen,
      label: "Medium of Instruction",
      value: "100% English Medium",
      subtext: "Dedicated International Faculty for Indian Students"
    },
    {
      icon: DollarSign,
      label: "Annual Tuition Fee",
      value: "$3,000 – $3,900 USD",
      subtext: "~₹2.53L to ₹3.30L/year • 6-Yr Total from ₹15.2 Lakhs"
    },
    {
      icon: Award,
      label: "NEET Requirement",
      value: "Mandatory Qualified Score",
      subtext: "NMC Mandated for all Indian Citizens (Valid for 3 Years)"
    },
    {
      icon: Plane,
      label: "Travel from New Delhi",
      value: "3.5 Hours Non-Stop",
      subtext: "Direct Flights (DEL to TAS) via Uzbekistan Airways & IndiGo"
    },
    {
      icon: ShieldCheck,
      label: "Regulatory Recognition",
      value: "NMC, WHO, WDOMS, FAIMER",
      subtext: "Eligible for NExT (India), USMLE (USA), and PLAB (UK)"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#DEDCD4] shadow-md font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#DEDCD4]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#590907] bg-[#E8D2B5]/50 px-3 py-1 rounded-full border border-[#DEDCD4]">
            Quick Facts & Canonical Verification
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#201C1A] mt-1.5">
            Key MBBS in Uzbekistan Metrics for 2026-2027 Admissions
          </h3>
        </div>
        <span className="text-xs text-[#77776F] font-medium bg-[#F7F5F0] px-3 py-1.5 rounded-xl border border-[#DEDCD4] self-start sm:self-auto">
          Last Verified: {CANONICAL_PRICING_SUMMARY.exchangeRateDate}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div
              key={fact.label}
              className="p-4 rounded-2xl bg-[#F7F5F0] hover:bg-[#ECEDE8] border border-[#DEDCD4] transition-all flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#590907] border border-[#DEDCD4] shadow-xs flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#590907]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-[#77776F] uppercase tracking-wider">
                  {fact.label}
                </p>
                <p className="text-sm font-bold text-[#590907]">{fact.value}</p>
                <p className="text-[11px] text-[#77776F] leading-tight">{fact.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KeyFactsBox;
