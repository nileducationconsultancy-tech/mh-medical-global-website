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
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D9E2EC] shadow-md font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#D9E2EC]">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3 py-1 rounded-full border border-[#D9E2EC]">
            Quick Facts & Canonical Verification
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#063280] mt-1.5">
            Key MBBS in Uzbekistan Metrics for 2026-2027 Admissions
          </h3>
        </div>
        <span className="text-xs text-[#475569] font-medium bg-[#F7FAFC] px-3 py-1.5 rounded-xl border border-[#D9E2EC] self-start sm:self-auto">
          Last Verified: {CANONICAL_PRICING_SUMMARY.exchangeRateDate}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-6">
        {facts.map((fact) => {
          const Icon = fact.icon;
          return (
            <div
              key={fact.label}
              className="p-4 rounded-2xl bg-[#F7FAFC] hover:bg-[#EBF3FA]/50 border border-[#D9E2EC] transition-all flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-[#063280] border border-[#D9E2EC] shadow-xs flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#063280]" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[11px] font-bold text-[#475569] uppercase tracking-wider">
                  {fact.label}
                </p>
                <p className="text-sm font-black text-[#063280]">{fact.value}</p>
                <p className="text-[11px] text-[#475569] leading-tight">{fact.subtext}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KeyFactsBox;
