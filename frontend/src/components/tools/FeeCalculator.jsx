import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  universitiesData,
  USD_TO_INR_RATE,
  EXCHANGE_RATE_DATE,
  CANONICAL_PRICING_SUMMARY
} from "../../data/universitiesData";
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
  Sparkles,
  Share2,
  FileText
} from "lucide-react";
import { SourceBadge } from "../common/SourceBadge";
import { track } from "../../utils/analytics";

export function FeeCalculator({ onOpenLeadModal }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query parameters if present
  const initialUni = searchParams.get("uni") || universitiesData[0].id;
  const initialCurr = searchParams.get("curr") === "USD" ? "USD" : "INR";

  const [selectedUniId, setSelectedUniId] = useState(
    universitiesData.some((u) => u.id === initialUni) ? initialUni : universitiesData[0].id
  );
  const [currency, setCurrency] = useState(initialCurr); // "INR" or "USD"
  const [includeMess, setIncludeMess] = useState(true);
  const [includeHostel, setIncludeHostel] = useState(true);
  const [includeInsuranceVisa, setIncludeInsuranceVisa] = useState(true);
  const [travelTripsPerYear, setTravelTripsPerYear] = useState(1); // Return flights per year
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync to URL search params when university or currency changes
  const handleUniChange = (id) => {
    setSelectedUniId(id);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("uni", id);
    newParams.set("curr", currency);
    setSearchParams(newParams, { replace: true });
  };

  const handleCurrencyChange = (curr) => {
    setCurrency(curr);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("uni", selectedUniId);
    newParams.set("curr", curr);
    setSearchParams(newParams, { replace: true });
  };

  const selectedUni = universitiesData.find((u) => u.id === selectedUniId) || universitiesData[0];

  // Fee calculation engine
  const tuitionPerYearUSD = selectedUni.fees?.annualTuitionUSD || 0;
  const hostelPerYearUSD = includeHostel ? (selectedUni.fees?.annualHostelUSD || 0) : 0;
  const messPerYearUSD = includeMess ? (selectedUni.fees?.annualIndianMessUSD || 0) : 0;
  const insuranceVisaPerYearUSD = includeInsuranceVisa
    ? ((selectedUni.fees?.annualMedicalInsuranceUSD || 0) + (selectedUni.fees?.annualVisaRenewalUSD || 0))
    : 0;
  const airfarePerYearUSD = travelTripsPerYear * 450; // ~$450 per return flight Delhi-Tashkent
  const firstYearOneTimeUSD = selectedUni.fees?.firstYearOneTimeChargesUSD || 0;

  // Annual recurring sum
  const annualRecurringUSD = tuitionPerYearUSD + hostelPerYearUSD + messPerYearUSD + insuranceVisaPerYearUSD + airfarePerYearUSD;
  
  // Total 6-year package calculation (5 years regular + 1 year internship)
  const total6YearUSD = (annualRecurringUSD * 6) + firstYearOneTimeUSD;

  const formatAmount = (usdVal) => {
    if (currency === "USD") {
      return `$${usdVal.toLocaleString()} USD`;
    }
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    return `₹${inrVal.toLocaleString("en-IN")}`;
  };

  const formatLakhs = (usdVal) => {
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    const lakhs = (inrVal / 100000).toFixed(2);
    return `₹${lakhs} Lakhs`;
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?uni=${selectedUniId}&curr=${currency}`;
      navigator.clipboard?.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-6 sm:p-8 lg:p-10 font-sans" id="fee-calculator-tool">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D9E2EC]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D9E2EC]">
            <Calculator className="w-3.5 h-3.5 text-[#063280]" />
            <span>Interactive 6-Year Budget Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            MBBS in Uzbekistan Fee & Cost Calculator (2026-27 Intake)
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm mt-1">
            Calculate accurate itemized tuition, hostel, and Indian mess expenses with transparent RBI benchmark rates.
          </p>
        </div>

        {/* Currency Toggle & Share Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] text-xs font-bold text-[#063280] hover:bg-[#EBF3FA] transition-all cursor-pointer shadow-2xs"
            title="Share this calculation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Copied!" : "Share Calculation"}</span>
          </button>

          <div className="flex items-center bg-[#F7FAFC] p-1 rounded-xl border border-[#D9E2EC]">
            <button
              onClick={() => handleCurrencyChange("INR")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-[#063280] text-white shadow-xs"
                  : "text-[#475569] hover:text-[#063280]"
              }`}
            >
              <span>🇮🇳 INR (₹)</span>
            </button>
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-[#063280] text-white shadow-xs"
                  : "text-[#475569] hover:text-[#063280]"
              }`}
            >
              <span>🇺🇸 USD ($)</span>
            </button>
          </div>
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
              onChange={(e) => handleUniChange(e.target.value)}
              className="w-full text-sm font-semibold p-3.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] text-[#0F172A] focus:ring-2 focus:ring-[#063280] focus:outline-hidden cursor-pointer"
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
              Customize Living & Hostel Inclusions
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
                  <span>University Hostel</span>
                  {includeHostel && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount(selectedUni.fees?.annualHostelUSD || 0)} / yr
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
                  <span>Indian Mess (3 Meals)</span>
                  {includeMess && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount(selectedUni.fees?.annualIndianMessUSD || 0)} / yr
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
                  <span>Visa & Medical Ins.</span>
                  {includeInsuranceVisa && <CheckCircle2 className="w-4 h-4 text-[#063280]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount((selectedUni.fees?.annualMedicalInsuranceUSD || 0) + (selectedUni.fees?.annualVisaRenewalUSD || 0))} / yr
                </span>
              </button>
            </div>
          </div>

          {/* Travel Trips Slider */}
          <div className="bg-[#F7FAFC] p-4 rounded-2xl border border-[#D9E2EC] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
              <span>Delhi ⇄ Tashkent Annual Flights:</span>
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
              <span>0 Trips (Hostel stay during vacation)</span>
              <span>1 Trip (Annual Summer break home)</span>
              <span>2 Trips (Summer & Winter vacations)</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#D9E2EC] rounded-2xl overflow-hidden text-xs">
            <div className="bg-[#F7FAFC] font-bold text-[#063280] px-4 py-2.5 flex justify-between border-b border-[#D9E2EC]">
              <span>Annual Fee Component</span>
              <span>Estimated Cost ({currency})</span>
            </div>
            <div className="divide-y divide-[#D9E2EC] bg-white">
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">University Tuition Fee (Official Decree)</span>
                <span className="font-bold text-[#063280]">{formatAmount(tuitionPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">University Hostel Accommodation</span>
                <span className="font-bold text-[#063280]">{formatAmount(hostelPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Indian Mess Food (3 Meals Daily)</span>
                <span className="font-bold text-[#063280]">{formatAmount(messPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Medical Insurance & Annual Visa Extension</span>
                <span className="font-bold text-[#063280]">{formatAmount(insuranceVisaPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A]">
                <span className="font-medium">Annual Non-Stop Delhi ⇄ Tashkent Flights</span>
                <span className="font-bold text-[#063280]">{formatAmount(airfarePerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#0F172A] bg-[#EBF3FA]/70">
                <span className="font-bold text-[#063280]">Total Annual Recurring Expense</span>
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
                <p className="text-xs text-[#9ABAD9] uppercase tracking-widest font-bold">University Selected</p>
                <h3 className="text-lg font-extrabold text-white leading-tight mt-0.5">{selectedUni.name}</h3>
                <p className="text-xs text-slate-200">{selectedUni.city}, Uzbekistan • {selectedUni.type} Academy</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-white/10 text-[#9ABAD9] rounded-lg border border-[#9ABAD9]/30">
                6-Year MD
              </span>
            </div>

            {/* Total 6-Year Grand Total Highlight */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
              <p className="text-xs text-slate-200 font-medium">Complete Estimated 6-Year Budget</p>
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
                *Covers 6 years tuition + hostel + Indian mess + visa renewal + 1st-year official documentation.
              </p>
            </div>

            {/* Annual Breakdown Quick Preview */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-200 pb-1.5 border-b border-white/15">
                <span>Per-Year Average Cost:</span>
                <span className="font-bold text-white">{formatAmount(annualRecurringUSD)}/yr</span>
              </div>
              <div className="flex justify-between text-slate-200 pb-1.5 border-b border-white/15">
                <span>1st-Year One-Time Charges:</span>
                <span className="font-bold text-white">{formatAmount(firstYearOneTimeUSD)}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span>Indian Private Medical College Est.:</span>
                <span className="font-bold text-[#9ABAD9] line-through">₹75 Lakhs – ₹1.2 Crore</span>
              </div>
            </div>
          </div>

          {/* Action CTAs: Lead-Gated PDF Download & Advisor Call */}
          <div className="pt-6 space-y-3">
            <button
              onClick={() => {
                track("download_fee_pdf_click", {
                  university: selectedUni.name,
                  currency,
                  total6YearUSD
                });
                onOpenLeadModal(`Download Itemized Fee PDF: ${selectedUni.name}`);
              }}
              className="w-full py-3.5 px-4 bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold rounded-2xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-rose-950/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-white" />
              <span>Download Itemized 6-Year Fee PDF</span>
            </button>

            <button
              onClick={() => {
                track("fee_calculator_counselling_click", { university: selectedUni.name });
                onOpenLeadModal(`Fee Consultation for ${selectedUni.name}`);
              }}
              className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9ABAD9]" />
              <span>Request Official Rectorate Fee Notice</span>
            </button>

            <p className="text-[10px] text-center text-slate-300">
              *Exchange rate reference: 1 USD = ₹{USD_TO_INR_RATE} ({EXCHANGE_RATE_DATE}). All tuition payable directly to university bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Source Footnote */}
      <div className="mt-8 pt-4 border-t border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#475569]">
        <span className="font-medium">
          Source: Official Uzbekistan Ministry of Higher Education & Rectorate Decree 2026.
        </span>
        <span className="font-bold text-[#063280]">
          Last Verified: {CANONICAL_PRICING_SUMMARY.exchangeRateDate}
        </span>
      </div>
    </div>
  );
}

export default FeeCalculator;
