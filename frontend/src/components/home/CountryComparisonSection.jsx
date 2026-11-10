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
      statusColor: "bg-[#590907] text-[#E8D2B5]",
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
      statusColor: "bg-[#A5A79B] text-[#201C1A]",
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
      statusColor: "bg-[#A5A79B] text-[#201C1A]",
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
      statusColor: "bg-[#A5A79B] text-[#201C1A]",
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
      statusColor: "bg-[#A5A79B] text-[#201C1A]",
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
    <section className="bg-[#ECEDE8] text-[#201C1A] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden border border-[#DEDCD4] font-sans">
      <div className="relative z-10 space-y-8">
        {/* Section Header with Direct-Answer GEO Paragraph */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white text-[#590907] text-xs font-bold uppercase tracking-wider border border-[#DEDCD4] shadow-xs">
            <Globe className="w-3.5 h-3.5 text-[#590907]" />
            <span>Global Medical Education Comparison</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-[#590907]">
            Comparing MBBS in Uzbekistan with Top International Destinations
          </h2>
          
          {/* AI-Quotable Direct Answer Block (Direct Comparison Summary card in Warm Beige #E8D2B5) */}
          <div className="text-xs sm:text-sm text-[#201C1A] leading-relaxed max-w-2xl mx-auto bg-[#E8D2B5] p-5 rounded-2xl border border-[#DEDCD4] shadow-xs text-left">
            <strong className="text-[#201C1A] font-extrabold">Direct Comparison Summary:</strong>{" "}
            Uzbekistan offers the most affordable NMC-compliant MBBS abroad pathway for Indian students in 2026. With 6-year government tuition starting at ₹15.2 Lakhs ($18,000 USD), all-inclusive packages at ₹24.9L–₹31.7L, direct 3.5-hour non-stop flights from Delhi, and 3,500+ hospital beds, it eliminates the high budgets and connecting flights of Russia and Georgia.
          </div>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="block lg:hidden text-center">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#590907] bg-white px-3 py-1 rounded-full border border-[#DEDCD4] shadow-xs animate-pulse">
            Scroll horizontally to compare all parameters →
          </span>
        </div>

        {/* Semantic Comparison Table with Sticky Header */}
        <div className="overflow-x-auto rounded-2xl border border-[#DEDCD4] bg-[#F7F5F0] shadow-sm">
          <table className="w-full text-left text-xs border-collapse min-w-[820px]">
            <caption className="sr-only">
              Comprehensive Comparison of MBBS Programs across Uzbekistan, Russia, Kazakhstan, Kyrgyzstan, and Georgia
            </caption>
            <thead className="sticky top-0 z-20 bg-[#A5A79B] text-[#201C1A] font-extrabold uppercase tracking-wider border-b border-[#DEDCD4] shadow-xs">
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
            <tbody className="divide-y divide-[#DEDCD4] text-[#201C1A]">
              {comparisonData.map((row, i) => {
                const isUzbekistan = i === 0;
                return (
                  <tr
                    key={row.country}
                    className={`transition-colors ${
                      isUzbekistan
                        ? "bg-[#ECEDE8] border-l-4 border-[#590907] font-semibold"
                        : "bg-white hover:bg-[#F7F5F0]"
                    }`}
                  >
                    <th scope="row" className="p-4 pl-5 font-normal">
                      <div className="flex flex-col gap-1">
                        <span className="font-extrabold text-[#201C1A] text-sm">{row.country}</span>
                        <span className={`inline-block w-fit text-[10px] font-bold px-2 py-0.5 rounded-full ${row.statusColor}`}>
                          {row.status}
                        </span>
                      </div>
                    </th>
                    <td className={`p-4 font-bold ${isUzbekistan ? "text-[#590907]" : "text-[#201C1A]"}`}>
                      {row.tuitionBudget}
                    </td>
                    <td className={`p-4 font-extrabold ${isUzbekistan ? "text-[#590907]" : "text-[#201C1A]"}`}>
                      {row.totalBudget}
                    </td>
                    <td className="p-4 flex-nowrap whitespace-nowrap text-[#201C1A]">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#77776F] shrink-0" />
                        <span>{row.flightTime}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        {row.nmcStatus}
                      </span>
                    </td>
                    <td className="p-4 text-[#201C1A]">{row.indianFood}</td>
                    <td className="p-4 pr-5 font-medium text-[#201C1A]">{row.clinicalExposure}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Sourced Data Footnote */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DEDCD4] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#201C1A] shadow-xs">
          <div className="space-y-1">
            <p className="flex items-center gap-1.5 font-bold text-[#201C1A]">
              <Info className="w-4 h-4 text-[#590907] shrink-0" />
              <span>Transparent Data Source Footnote:</span>
            </p>
            <p className="text-[11px] text-[#77776F]">
              {CANONICAL_PRICING_SUMMARY.formulaNote} {CANONICAL_PRICING_SUMMARY.verificationFootnote}
            </p>
          </div>

          <button
            onClick={() => onOpenLeadModal("Country Comparison Free Evaluation")}
            className="px-5 py-2.5 bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-extrabold rounded-xl text-xs transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-2"
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
