import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  universitiesData,
  USD_TO_INR_RATE,
  EXCHANGE_RATE_DATE,
  CANONICAL_PRICING_SUMMARY
} from "../../data/universitiesData";
import {
  Calculator,
  CheckCircle2,
  Download,
  Sparkles,
  Share2
} from "lucide-react";
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
  const [travelTripsPerYear, setTravelTripsPerYear] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);

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
  const airfarePerYearUSD = travelTripsPerYear * 450;
  const firstYearOneTimeUSD = selectedUni.fees?.firstYearOneTimeChargesUSD || 0;

  const annualRecurringUSD = tuitionPerYearUSD + hostelPerYearUSD + messPerYearUSD + insuranceVisaPerYearUSD + airfarePerYearUSD;
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
    <div className="bg-white rounded-3xl shadow-xl border border-[#DEDCD4] p-6 sm:p-8 lg:p-10 font-sans" id="fee-calculator-tool">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DEDCD4]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8D2B5]/50 text-[#590907] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DEDCD4]">
            <Calculator className="w-3.5 h-3.5 text-[#590907]" />
            <span>Interactive 6-Year Budget Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#201C1A]">
            MBBS in Uzbekistan Fee & Cost Calculator (2026-27 Intake)
          </h2>
          <p className="text-[#77776F] text-xs sm:text-sm mt-1">
            Calculate accurate itemized tuition, hostel, and Indian mess expenses with transparent RBI benchmark rates.
          </p>
        </div>

        {/* Currency Toggle & Share Button */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#DEDCD4] bg-[#F7F5F0] text-xs font-bold text-[#590907] hover:bg-[#ECEDE8] transition-all cursor-pointer shadow-2xs"
            title="Share this calculation"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Copied!" : "Share Calculation"}</span>
          </button>

          <div className="flex items-center bg-[#F7F5F0] p-1 rounded-xl border border-[#DEDCD4]">
            <button
              onClick={() => handleCurrencyChange("INR")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "INR"
                  ? "bg-[#590907] text-white shadow-xs"
                  : "text-[#77776F] hover:text-[#590907]"
              }`}
            >
              <span>🇮🇳 INR (₹)</span>
            </button>
            <button
              onClick={() => handleCurrencyChange("USD")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                currency === "USD"
                  ? "bg-[#590907] text-white shadow-xs"
                  : "text-[#77776F] hover:text-[#590907]"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#590907] mb-2">
              Select Medical University
            </label>
            <select
              value={selectedUniId}
              onChange={(e) => handleUniChange(e.target.value)}
              className="w-full text-sm font-semibold p-3.5 rounded-xl border border-[#DEDCD4] bg-[#F7F5F0] text-[#201C1A] focus:ring-1 focus:ring-[#590907] focus:outline-hidden cursor-pointer"
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
            <label className="block text-xs font-bold uppercase tracking-wider text-[#590907]">
              Customize Living & Hostel Inclusions
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setIncludeHostel(!includeHostel)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex flex-col justify-between cursor-pointer ${
                  includeHostel
                    ? "bg-[#ECEDE8] border-[#590907] text-[#590907] font-semibold"
                    : "bg-[#F7F5F0] border-[#DEDCD4] text-[#77776F]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>University Hostel</span>
                  {includeHostel && <CheckCircle2 className="w-4 h-4 text-[#590907]" />}
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
                    ? "bg-[#ECEDE8] border-[#590907] text-[#590907] font-semibold"
                    : "bg-[#F7F5F0] border-[#DEDCD4] text-[#77776F]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Indian Mess (3 Meals)</span>
                  {includeMess && <CheckCircle2 className="w-4 h-4 text-[#590907]" />}
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
                    ? "bg-[#ECEDE8] border-[#590907] text-[#590907] font-semibold"
                    : "bg-[#F7F5F0] border-[#DEDCD4] text-[#77776F]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Visa & Medical Ins.</span>
                  {includeInsuranceVisa && <CheckCircle2 className="w-4 h-4 text-[#590907]" />}
                </div>
                <span className="text-[11px] opacity-80">
                  {formatAmount((selectedUni.fees?.annualMedicalInsuranceUSD || 0) + (selectedUni.fees?.annualVisaRenewalUSD || 0))} / yr
                </span>
              </button>
            </div>
          </div>

          {/* Travel Trips Slider */}
          <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#DEDCD4] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#201C1A]">
              <span>Delhi ⇄ Tashkent Annual Flights:</span>
              <span className="text-[#590907] bg-[#ECEDE8] px-2.5 py-0.5 rounded-md font-bold border border-[#DEDCD4]">
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
              className="w-full accent-[#590907] h-2 bg-[#DEDCD4] rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#77776F]">
              <span>0 Trips (Hostel stay during vacation)</span>
              <span>1 Trip (Annual Summer break home)</span>
              <span>2 Trips (Summer & Winter vacations)</span>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-[#DEDCD4] rounded-2xl overflow-hidden text-xs">
            <div className="bg-[#F7F5F0] font-bold text-[#590907] px-4 py-2.5 flex justify-between border-b border-[#DEDCD4]">
              <span>Annual Fee Component</span>
              <span>Estimated Cost ({currency})</span>
            </div>
            <div className="divide-y divide-[#DEDCD4] bg-white">
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A]">
                <span className="font-medium">University Tuition Fee (Official Decree)</span>
                <span className="font-bold text-[#590907]">{formatAmount(tuitionPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A]">
                <span className="font-medium">University Hostel Accommodation</span>
                <span className="font-bold text-[#590907]">{formatAmount(hostelPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A]">
                <span className="font-medium">Indian Mess Food (3 Meals Daily)</span>
                <span className="font-bold text-[#590907]">{formatAmount(messPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A]">
                <span className="font-medium">Medical Insurance & Annual Visa Extension</span>
                <span className="font-bold text-[#590907]">{formatAmount(insuranceVisaPerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A]">
                <span className="font-medium">Annual Non-Stop Delhi ⇄ Tashkent Flights</span>
                <span className="font-bold text-[#590907]">{formatAmount(airfarePerYearUSD)}</span>
              </div>
              <div className="px-4 py-2.5 flex justify-between text-[#201C1A] bg-[#ECEDE8]">
                <span className="font-bold text-[#590907]">Total Annual Recurring Expense</span>
                <span className="font-black text-[#590907] text-sm">{formatAmount(annualRecurringUSD)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Summary Card (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-br from-[#590907] via-[#3F0605] to-[#201C1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-[#E8D2B5]/30">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-xs text-[#E8D2B5] uppercase tracking-widest font-bold">University Selected</p>
                <h3 className="text-lg font-serif font-bold text-white leading-tight mt-0.5">{selectedUni.name}</h3>
                <p className="text-xs text-[#F7F5F0]/80">{selectedUni.city}, Uzbekistan • {selectedUni.type} Academy</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-white/10 text-[#E8D2B5] rounded-lg border border-[#E8D2B5]/30">
                6-Year MD
              </span>
            </div>

            {/* Total 6-Year Grand Total Highlight */}
            <div className="bg-white/10 rounded-2xl p-5 border border-white/15 space-y-1">
              <p className="text-xs text-[#F7F5F0]/90 font-medium">Complete Estimated 6-Year Budget</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-white">
                  {formatAmount(total6YearUSD)}
                </span>
                {currency === "INR" && (
                  <span className="text-sm font-bold text-[#E8D2B5]">
                    ({formatLakhs(total6YearUSD)})
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#A5A79B] pt-1">
                *Covers 6 years tuition + hostel + Indian mess + visa renewal + 1st-year official documentation.
              </p>
            </div>

            {/* Annual Breakdown Quick Preview */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#F7F5F0]/90 pb-1.5 border-b border-white/15">
                <span>Per-Year Average Cost:</span>
                <span className="font-bold text-white">{formatAmount(annualRecurringUSD)}/yr</span>
              </div>
              <div className="flex justify-between text-[#F7F5F0]/90 pb-1.5 border-b border-white/15">
                <span>1st-Year One-Time Charges:</span>
                <span className="font-bold text-white">{formatAmount(firstYearOneTimeUSD)}</span>
              </div>
              <div className="flex justify-between text-[#F7F5F0]/90">
                <span>Indian Private Medical College Est.:</span>
                <span className="font-bold text-[#E8D2B5] line-through">₹75 Lakhs – ₹1.2 Crore</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
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
              className="w-full py-3.5 px-4 bg-[#E8D2B5] hover:bg-white text-[#590907] font-black rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#590907]" />
              <span>Download Itemized 6-Year Fee PDF</span>
            </button>

            <button
              onClick={() => {
                track("fee_calculator_counselling_click", { university: selectedUni.name });
                onOpenLeadModal(`Fee Consultation for ${selectedUni.name}`);
              }}
              className="w-full py-2.5 px-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs transition-colors border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8D2B5]" />
              <span>Request Official Rectorate Fee Notice</span>
            </button>

            <p className="text-[10px] text-center text-[#A5A79B]">
              *Exchange rate reference: 1 USD = ₹{USD_TO_INR_RATE} ({EXCHANGE_RATE_DATE}). All tuition payable directly to university bank account.
            </p>
          </div>
        </div>
      </div>

      {/* Source Footnote */}
      <div className="mt-8 pt-4 border-t border-[#DEDCD4] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#77776F]">
        <span className="font-medium">
          Source: Official Uzbekistan Ministry of Higher Education & Rectorate Decree 2026.
        </span>
        <span className="font-bold text-[#590907]">
          Last Verified: {CANONICAL_PRICING_SUMMARY.exchangeRateDate}
        </span>
      </div>
    </div>
  );
}

export default FeeCalculator;
