import React from "react";
import {
  Globe,
  CheckCircle2,
  AlertCircle,
  Plane,
  ArrowRight,
  Info,
  ChevronRight
} from "lucide-react";
import { CANONICAL_PRICING_SUMMARY } from "../../data/universitiesData";

export function CountryComparisonSection({ onOpenLeadModal }) {
  const comparisonData = [
    {
      country: "Uzbekistan 🇺🇿",
      status: "Recommended (Govt Academies)",
      statusColor: "bg-[#9B193A] text-white",
      tuitionBudget: "₹15.2L – ₹19.8L ($18k–$23.4k)",
      totalBudget: "₹24.9L – ₹31.7L (All-Inclusive)",
      duration: "6 Years (54 Mo. + 12 Mo. Internship)",
      nmcStatus: "100% FMGL 2021 Aligned",
      englishMedium: "100% International Faculty",
      flightTime: "3.5 Hours Direct (Delhi-TAS)",
      indianFood: "Dedicated On-Campus Mess",
      clinicalExposure: "2,000 to 3,500+ Hospital Beds",
      sourceFootnote: "Official Rectorate Decree & Ministry of Higher Education 2026"
    },
    {
      country: "Russia 🇷🇺",
      status: "High Budget",
      statusColor: "bg-[#1558A9] text-white",
      tuitionBudget: "₹22.0L – ₹38.0L",
      totalBudget: "₹35.0L – ₹52.0L",
      duration: "6 Years",
      nmcStatus: "Compliant (Bilingual risk)",
      englishMedium: "English (Russian in Clinicals)",
      flightTime: "6 – 9 Hours (Connecting)",
      indianFood: "Select Large Cities",
      clinicalExposure: "1,500 to 2,500 Beds",
      sourceFootnote: "Russian Federal Ministry of Education 2026"
    },
    {
      country: "Kazakhstan 🇰🇿",
      status: "Moderate Budget",
      statusColor: "bg-[#063280] text-white",
      tuitionBudget: "₹18.0L – ₹25.0L",
      totalBudget: "₹28.0L – ₹38.0L",
      duration: "5 Years / 6 Years (Check 54m)",
      nmcStatus: "Verify 54-Month Rule",
      englishMedium: "English Available",
      flightTime: "4 – 5 Hours (Connecting)",
      indianFood: "Available in Hostels",
      clinicalExposure: "1,200 to 2,000 Beds",
      sourceFootnote: "Kazakhstan National Medical Directory 2025-26"
    },
    {
      country: "Kyrgyzstan 🇰🇬",
      status: "Low Budget",
      statusColor: "bg-slate-700 text-white",
      tuitionBudget: "₹15.0L – ₹22.0L",
      totalBudget: "₹23.0L – ₹30.0L",
      duration: "5 Years (Historical conflict)",
      nmcStatus: "Verify FMGL Compliance",
      englishMedium: "English Medium",
      flightTime: "4 Hours (Connecting)",
      indianFood: "Available",
      clinicalExposure: "800 to 1,500 Beds",
      sourceFootnote: "Kyrgyz Ministry of Health Regulations"
    },
    {
      country: "Georgia 🇬🇪",
      status: "European Tier",
      statusColor: "bg-[#1558A9] text-white",
      tuitionBudget: "₹28.0L – ₹42.0L",
      totalBudget: "₹42.0L – ₹58.0L",
      duration: "6 Years (360 ECTS)",
      nmcStatus: "Compliant",
      englishMedium: "100% English",
      flightTime: "8 – 12 Hours (Connecting)",
      indianFood: "Limited / Self-Cooked",
      clinicalExposure: "500 to 1,200 Beds",
      sourceFootnote: "Georgian Ministry of Education & Science"
    }
  ];

  return (
    <section className="bg-linear-to-b from-[#063280] via-[#092D6C] to-[#041B44] text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-[#9ABAD9]/20 font-sans">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#9ABAD9]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Section Header with Direct-Answer GEO Paragraph */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Medical Education Comparison</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Comparing MBBS in Uzbekistan with Top International Destinations
          </h2>
          
          {/* AI-Quotable Direct Answer Block (40-60 words) */}
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl mx-auto bg-white/5 p-4 rounded-2xl border border-white/10">
            <strong>Direct Comparison Summary:</strong> Uzbekistan offers the most affordable NMC-compliant MBBS abroad pathway for Indian students in 2026. With 6-year government tuition starting at ₹15.2 Lakhs ($18,000 USD), all-inclusive packages at ₹24.9L–₹31.7L, direct 3.5-hour non-stop flights from Delhi, and 3,500+ hospital beds, it eliminates the high budgets and connecting flights of Russia and Georgia.
          </p>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="block lg:hidden text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#9ABAD9] bg-white/10 px-3 py-1 rounded-full border border-white/15 animate-pulse">
            Scroll horizontally to compare all parameters →
          </span>
        </div>

        {/* Semantic Comparison Table with Sticky Header */}
        <div className="overflow-x-auto rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xs shadow-inner">
          <table className="w-full text-left text-xs border-collapse min-w-[820px]">
            <caption className="sr-only">
              Comprehensive Comparison of MBBS Programs across Uzbekistan, Russia, Kazakhstan, Kyrgyzstan, and Georgia
            </caption>
            <thead className="sticky top-0 z-20 bg-[#05245E] text-slate-200 font-bold uppercase tracking-wider border-b border-[#0B2D64] shadow-sm">
              <tr>
                <th scope="col" className="p-4 pl-5">Country & System</th>
                <th scope="col" className="p-4">6-Yr Tuition Fee</th>
                <th scope="col" className="p-4">6-Yr Total Est.</th>
                <th scope="col" className="p-4">Flight Time (Delhi)</th>
                <th scope="col" className="p-4">NMC FMGL Status</th>
                <th scope="col" className="p-4">Indian Mess Food</th>
                <th scope="col" className="p-4 pr-5">Clinical Beds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-slate-200">
              {comparisonData.map((row, i) => {
                const isUzbekistan = i === 0;
                return (
                  <tr
                    key={row.country}
                    className={`transition-colors ${
                      isUzbekistan
                        ? "bg-[#0E438D]/80 border-l-4 border-[#9B193A] font-medium"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <th scope="row" className="p-4 pl-5 font-normal">
                      <div className="flex flex-col gap-1">
                        <span className="font-extrabold text-white text-sm">{row.country}</span>
                        <span className={`inline-block w-fit text-[10px] font-bold px-2 py-0.5 rounded-full ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </div>
                    </th>
                    <td className="p-4 font-bold text-white">
                      {row.tuitionBudget}
                    </td>
                    <td className="p-4 font-extrabold text-[#9ABAD9]">
                      {row.totalBudget}
                    </td>
                    <td className="p-4 flex-nowrap whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{row.flightTime}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {row.nmcStatus}
                      </span>
                    </td>
                    <td className="p-4">{row.indianFood}</td>
                    <td className="p-4 pr-5 font-medium">{row.clinicalExposure}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sourced Data Footnote */}
        <div className="p-4 rounded-2xl bg-white/10 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-slate-200">
          <div className="space-y-1">
            <p className="flex items-center gap-1.5 font-bold text-white">
              <Info className="w-4 h-4 text-[#9ABAD9] shrink-0" />
              <span>Transparent Data Source Footnote:</span>
            </p>
            <p className="text-[11px] text-slate-300">
              {CANONICAL_PRICING_SUMMARY.formulaNote} {CANONICAL_PRICING_SUMMARY.verificationFootnote}
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal("Country Comparison Free Evaluation")}
            className="px-5 py-2.5 bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-md hover:shadow-rose-950/25 flex items-center gap-2"
          >
            <span>Request Detailed Comparison PDF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default CountryComparisonSection;
