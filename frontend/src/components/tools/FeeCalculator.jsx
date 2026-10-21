import React, { useState } from "react";
import { universitiesData, USD_TO_INR_RATE } from "../../data/universitiesData";
import {
  Calculator,
  Building2,
  DollarSign,
  Coins,
  ShieldCheck,
  CheckCircle2,
  Download,
  Info,
  Calendar,
  Sparkles
} from "lucide-react";
import { SourceBadge } from "../common/SourceBadge";
import { track } from "../../utils/analytics";

export function FeeCalculator({ onOpenLeadModal }) {
  const [selectedUniId, setSelectedUniId] = useState(universitiesData[0].id);
  const [currency, setCurrency] = useState("INR"); // "INR" or "USD"
  const [includeMess, setIncludeMess] = useState(true);
  const [includeHostel, setIncludeHostel] = useState(true);
  const [includeInsuranceVisa, setIncludeInsuranceVisa] = useState(true);
  const [travelTripsPerYear, setTravelTripsPerYear] = useState(1); // Return flights per year

  const selectedUni = universitiesData.find((u) => u.id === selectedUniId) || universitiesData[0];

  // Fee calculation engine
  const tuitionPerYearUSD = selectedUni.fees.annualTuitionUSD;
  const hostelPerYearUSD = includeHostel ? selectedUni.fees.annualHostelUSD : 0;
  const messPerYearUSD = includeMess ? selectedUni.fees.annualIndianMessUSD : 0;
  const insuranceVisaPerYearUSD = includeInsuranceVisa ? (selectedUni.fees.annualMedicalInsuranceUSD + selectedUni.fees.annualVisaRenewalUSD) : 0;
  const airfarePerYearUSD = travelTripsPerYear * 450; // ~$450 per return flight Delhi-Tashkent
  const firstYearOneTimeUSD = selectedUni.fees.firstYearOneTimeChargesUSD;

  // Annual recurring sum
  const annualRecurringUSD = tuitionPerYearUSD + hostelPerYearUSD + messPerYearUSD + insuranceVisaPerYearUSD + airfarePerYearUSD;
  
  // Total 6-year package calculation (5 years regular + 1 year internship)
  const total6YearUSD = (annualRecurringUSD * 6) + firstYearOneTimeUSD;

  const formatAmount = (usdVal) => {
    if (currency === "USD") {
      return `$${usdVal.toLocaleString()}`;
    }
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    return `₹${inrVal.toLocaleString("en-IN")}`;
  };

  const formatLakhs = (usdVal) => {
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    const lakhs = (inrVal / 100000).toFixed(2);
    return `₹${lakhs} Lakhs`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-6 sm:p-8 lg:p-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D9E2EC]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D9E2EC]">
            <Calculator className="w-3.5 h-3.5 text-[#063280]" />
            Interactive 6-Year Cost Simulator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Uzbekistan MBBS Fee & Budget Calculator
          </h2>
          <p className="text-[#475569] text-sm mt-1">
            Calculate accurate itemized expenses for any recognized university with transparent INR/USD rates.
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="flex items-center bg-[#F7FAFC] p-1 rounded-xl self-start md:self-auto border border-[#D9E2EC]">
          <button
            onClick={() => setCurrency("INR")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currency === "INR"
                ? "bg-[#063280] text-white shadow-xs"
                : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            <span>🇮🇳 INR (₹)</span>
          </button>
          <button
            onClick={() => setCurrency("USD")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currency === "USD"
                ? "bg-[#063280] text-white shadow-xs"
                : "text-[#475569] hover:text-[#063280]"
            }`}
          >
            <span>🇺🇸 USD ($)</span>
          </button>
        </div>
      </div>

      {/* Calculator Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* University Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-2">
              Select Medical University
            </label>
            <select
              value={selectedUniId}
              onChange={(e) => setSelectedUniId(e.target.value)}
              className="w-full text-sm font-semibold p-3.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] text-[#0F172A] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
            >
              {universitiesData.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.type} — {u.city})
                </option>
              ))}
            </select>
          </div>

          {/* Inclusions & Custom Switches */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280]">
              Customize Living & Campus Amenities
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setIncludeHostel(!includeHostel)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                  includeHostel
                    ? "bg-[#EBF3FA] border-[#063280] text-[#063280] font-semibold"
                    : "bg-[#F7FAFC] border-[#D9E2EC] text-[#475569]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Hostel Room</span>
                  {includeHostel && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount(selectedUni.fees.annualHostelUSD)} / yr
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIncludeMess(!includeMess)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                  includeMess
                    ? "bg-[#EBF3FA] border-[#063280] text-[#063280] font-semibold"
                    : "bg-[#F7FAFC] border-[#D9E2EC] text-[#475569]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Indian Mess</span>
                  {includeMess && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount(selectedUni.fees.annualIndianMessUSD)} / yr
                </span>
              </button>

              <button
                type="button"
                onClick={() => setIncludeInsuranceVisa(!includeInsuranceVisa)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                  includeInsuranceVisa
                    ? "bg-[#EBF3FA] border-[#063280] text-[#063280] font-semibold"
                    : "bg-[#F7FAFC] border-[#D9E2EC] text-[#475569]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Visa & Insurance</span>
                  {includeInsuranceVisa && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount(selectedUni.fees.annualMedicalInsuranceUSD + selectedUni.fees.annualVisaRenewalUSD)} / yr
                </span>
              </button>
            </div>
          </div>

          {/* Travel Trips Slider */}
          <div className="bg-[#F7FAFC] p-4 rounded-2xl border border-[#D9E2EC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
              <span>Annual Return Flights to India:</span>
              <span className="text-[#063280] bg-[#EBF3FA] px-2.5 py-0.5 rounded-md font-black border border-[#D9E2EC]">
                {travelTripsPerYear} Trip(s) / Year (~{formatAmount(airfarePerYearUSD)})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={travelTripsPerYear}
              onChange={(e) => setTravelTripsPerYear(parseInt(e.target.value))}
              className="w-full accent-[#063280] h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#475569]">
              <span>0 (Staying during vacation)</span>
              <span>1 (Summer trip home)</span>
              <span>2 (Summer & Winter trips)</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#D9E2EC] rounded-2xl overflow-hidden text-xs">
            <div className="bg-[#F7FAFC] font-bold text-[#063280] px-4 py-2.5 flex justify-between border-b border-[#D9E2EC]">
              <span>Fee Component</span>
              <span>Annual Amount ({currency})</span>
            </div>
            <div className="divide-y divide-[#D9E2EC] bg-white">
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">University Tuition Fee (Official)</span>
                <span className="font-bold text-[#063280]">{formatAmount(tuitionPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Hostel Accommodation</span>
                <span className="font-bold text-[#063280]">{formatAmount(hostelPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Indian Mess (3 Meals Daily)</span>
                <span className="font-bold text-[#063280]">{formatAmount(messPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Medical Insurance & OVIR Visa Extension</span>
                <span className="font-bold text-[#063280]">{formatAmount(insuranceVisaPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Estimated Delhi ⇄ Tashkent Flights</span>
                <span className="font-bold text-[#063280]">{formatAmount(airfarePerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A] bg-[#EBF3FA]/70">
                <span className="font-bold text-[#063280]">Total Estimated Annual Cost</span>
                <span className="font-black text-[#063280] text-sm">{formatAmount(annualRecurringUSD)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Summary Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-br from-[#063280] via-[#0E438D] to-[#1558A9] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#9ABAD9]/20">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-xs text-[#9ABAD9] uppercase tracking-widest font-bold">Selected University</p>
                <h3 className="text-lg font-extrabold text-white leading-tight mt-0.5">{selectedUni.name}</h3>
                <p className="text-xs text-slate-200">{selectedUni.city}, Uzbekistan • {selectedUni.type}</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-white/10 text-[#9ABAD9] rounded-lg border border-[#9ABAD9]/30">
                6-Year MD
              </span>
            </div>

            {/* Total 6-Year Grand Total Highlight */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
              <p className="text-xs text-slate-200 font-medium">Estimated Total 6-Year Package</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white">
                  {formatAmount(total6YearUSD)}
                </span>
                {currency === "INR" && (
                  <span className="text-sm font-bold text-[#9ABAD9]">
                    ({formatLakhs(total6YearUSD)})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 pt-1">
                *Includes 6 years tuition + hostel + Indian mess + visa + 1st-year onboarding.
              </p>
            </div>

            {/* Annual Breakdown Quick Preview */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-200 pb-1.5 border-b border-white/15">
                <span>Per Year Average Expense:</span>
                <span className="font-bold text-white">{formatAmount(annualRecurringUSD)}/yr</span>
              </div>
              <div className="flex justify-between text-slate-200 pb-1.5 border-b border-white/15">
                <span>1st Year One-Time Admission Charges:</span>
                <span className="font-bold text-white">{formatAmount(firstYearOneTimeUSD)}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Equivalent Indian Private College:</span>
                <span className="font-bold text-[#9ABAD9] line-through">₹75 Lakhs - ₹1.2 Cr</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                track("fee_calculator_used", {
                  university: selectedUni.name,
                  totalBudgetUSD: total6YearUSD,
                  totalBudgetINR: Math.round(total6YearUSD * USD_TO_INR_RATE),
                  currency
                });
                onOpenLeadModal(`Fee Quote for ${selectedUni.name}`);
              }}
              className="w-full py-3.5 px-4 bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Get Official University Fee Letter
            </button>
            <p className="text-[10px] text-center text-slate-300">
              *Exchange rate reference: 1 USD ≈ ₹{USD_TO_INR_RATE}. Official fees subject to university circulars.
            </p>
          </div>
        </div>
      </div>

      {/* Source & Verified Footnote */}
      <div className="mt-8 pt-4 border-t border-[#D9E2EC]">
        <SourceBadge sources={selectedUni.sources} lastVerified={selectedUni.lastVerifiedDate} />
      </div>
    </div>
  );
}
