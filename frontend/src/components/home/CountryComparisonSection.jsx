import React from "react";
import { Link } from "react-router-dom";
import {
  Globe,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plane,
  Sparkles,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export function CountryComparisonSection({ onOpenLeadModal }) {
  const comparisonData = [
    {
      country: "Uzbekistan 🇺🇿 (Recommended)",
      badge: "Top Choice 2026",
      badgeColor: "bg-[#9B193A] text-white",
      totalBudget: "₹18 Lakh - ₹26 Lakh",
      duration: "6 Years (54 Mo. + 1 Yr Int.)",
      nmcCompliant: "100% Fully Compliant",
      englishMedium: "100% (International Faculty)",
      flightTime: "3.5 Hours (Direct Delhi-Tashkent)",
      livingCost: "$100 - $180 / month",
      safetyRating: "9.5 / 10 (Very Safe & Friendly)",
      indianFood: "Dedicated Indian Mess in all Hostels",
      highlight: "Direct 3.5-hr flights, lowest tuition, huge hospital bed capacities, and strict NMC 54+12 compliance."
    },
    {
      country: "Russia 🇷🇺",
      badge: "Established",
      badgeColor: "bg-[#1558A9] text-white",
      totalBudget: "₹28 Lakh - ₹45 Lakh",
      duration: "6 Years",
      nmcCompliant: "100% Compliant",
      englishMedium: "Bilingual in some universities",
      flightTime: "6 - 9 Hours (Connecting flights)",
      livingCost: "$250 - $400 / month",
      safetyRating: "8.0 / 10",
      indianFood: "Available in select cities",
      highlight: "High academic legacy but longer flight times, extreme winter climate, and higher tuition costs."
    },
    {
      country: "Kazakhstan 🇰🇿",
      badge: "Popular",
      badgeColor: "bg-[#063280] text-white",
      totalBudget: "₹22 Lakh - ₹32 Lakh",
      duration: "5 Years / 6 Years",
      nmcCompliant: "Check 54-month rules",
      englishMedium: "English Medium available",
      flightTime: "4 - 5 Hours",
      livingCost: "$150 - $250 / month",
      safetyRating: "8.5 / 10",
      indianFood: "Available on campus",
      highlight: "Good option, but must verify that the 54-month academic duration clause is met by the specific university."
    },
    {
      country: "Kyrgyzstan 🇰🇬",
      badge: "Economical",
      badgeColor: "bg-slate-700 text-white",
      totalBudget: "₹18 Lakh - ₹25 Lakh",
      duration: "5 Years (Needs careful review)",
      nmcCompliant: "Must check 54-month clause",
      englishMedium: "English Medium",
      flightTime: "4 Hours",
      livingCost: "$100 - $160 / month",
      safetyRating: "8.0 / 10",
      indianFood: "Available",
      highlight: "Affordable, but several colleges historically offered 5-year formats that conflict with the 54-month rule."
    },
    {
      country: "Georgia 🇬🇪",
      badge: "European",
      badgeColor: "bg-[#1558A9] text-white",
      totalBudget: "₹35 Lakh - ₹50 Lakh",
      duration: "6 Years",
      nmcCompliant: "100% Compliant",
      englishMedium: "100% English",
      flightTime: "8 - 12 Hours (Connecting)",
      livingCost: "$300 - $500 / month",
      safetyRating: "9.0 / 10",
      indianFood: "Limited / Self-cooking",
      highlight: "European standard education with high living expenses and higher visa refusal rates for Indian students."
    }
  ];

  return (
    <section className="bg-linear-to-b from-[#063280] to-[#041B44] text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-[#9ABAD9]/20">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ABAD9]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Globe className="w-3.5 h-3.5" />
            Global MBBS Country Comparison Matrix
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Why Uzbekistan is the #1 Destination for Indian Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Compare total packages, flight times, safety, and strict NMC FMGL 2021 compliance across popular MBBS abroad study destinations.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse min-w-[750px]">
            <thead>
              <tr className="bg-[#05245E] text-slate-200 font-bold uppercase tracking-wider border-b border-[#0B2D64]">
                <th className="p-4 rounded-tl-2xl">Country Destination</th>
                <th className="p-4">6-Year Total Budget</th>
                <th className="p-4">Flight Time from Delhi</th>
                <th className="p-4">NMC FMGL Compliance</th>
                <th className="p-4">Indian Mess Food</th>
                <th className="p-4 rounded-tr-2xl">Key Summary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0B2D64] text-slate-200">
              {comparisonData.map((row, i) => (
                <tr
                  key={i}
                  className={`hover:bg-white/5 transition-colors ${
                    i === 0 ? "bg-[#0E438D]/60 border-l-4 border-[#9B193A]" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-white text-sm">{row.country}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${row.badgeColor}`}>
                        {row.badge}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 font-black text-[#9ABAD9] text-sm">{row.totalBudget}</td>
                  <td className="p-4 font-medium">{row.flightTime}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      row.nmcCompliant.includes("100%") ? "text-white" : "text-[#9ABAD9]"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {row.nmcCompliant}
                    </span>
                  </td>
                  <td className="p-4">{row.indianFood}</td>
                  <td className="p-4 text-[11px] text-slate-300 max-w-xs">{row.highlight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Footnote */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-200">
            <p className="font-bold text-white">Need an unbiased country-by-country counselling session?</p>
            <p>Our senior advisors evaluate your budget, family preferences, and student academic background.</p>
          </div>
          <button
            onClick={() => onOpenLeadModal("Country Comparison Free Consultation")}
            className="px-5 py-2.5 bg-[#9B193A] hover:bg-[#7E142F] text-white font-bold rounded-xl text-xs transition-colors shrink-0 cursor-pointer shadow-md"
          >
            Get Free Country Guidance
          </button>
        </div>
      </div>
    </section>
  );
}
