import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  HelpCircle,
  FileCheck,
  Award,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { submitToGoogleSheet } from "../../services/googleSheetService";

export function EligibilityChecker({ onOpenLeadModal }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "General", // "General", "OBC", "SC", "ST", "EWS"
    dob: "2007-05-15",
    physicsMarks: 75,
    chemistryMarks: 72,
    biologyMarks: 80,
    englishPass: true,
    neetStatus: "Qualified", // "Qualified", "Appearing", "Not Qualified"
    neetScore: 380,
    hasPassport: true,
    preferredCity: "Tashkent"
  });

  const [evaluationResult, setEvaluationResult] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Calculate PCB aggregate
  const pcbTotal = Number(formData.physicsMarks) + Number(formData.chemistryMarks) + Number(formData.biologyMarks);
  const pcbPercentage = (pcbTotal / 3).toFixed(1);

  // Calculate Age (must be 17 by Dec 31st of admission year 2026)
  const birthYear = new Date(formData.dob).getFullYear();
  const calculatedAgeIn2026 = 2026 - birthYear;

  const handleEvaluate = (e) => {
    e.preventDefault();
    setIsEvaluating(true);

    setTimeout(() => {
      const isReserved = ["OBC", "SC", "ST"].includes(formData.category);
      const minPcbRequired = isReserved ? 40 : 50;

      const pcbPassed = Number(pcbPercentage) >= minPcbRequired;
      const agePassed = calculatedAgeIn2026 >= 17;
      const neetPassed = formData.neetStatus === "Qualified" || formData.neetStatus === "Appearing";
      const englishPassed = formData.englishPass;

      let status = "Eligible";
      let reasonList = [];

      if (!agePassed) {
        status = "Not Eligible";
        reasonList.push(`Age is below 17 years by Dec 31, 2026 (NMC requirement).`);
      }

      if (!pcbPassed) {
        status = "Not Eligible";
        reasonList.push(`PCB aggregate is ${pcbPercentage}%, below the required ${minPcbRequired}% for ${formData.category} category.`);
      }

      if (!englishPassed) {
        status = "Not Eligible";
        reasonList.push(`Must have passed English as a core subject in 10+2.`);
      }

      if (formData.neetStatus === "Not Qualified") {
        status = "Conditional / Verification Required";
        reasonList.push(`NEET-UG qualification is mandatory for Indian citizens as per NMC Foreign Medical Licentiate Regulations. You must appear/qualify NEET.`);
      }

      if (status === "Eligible") {
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore if canvas-confetti is not loaded
        }
      }

      const result = {
        status,
        pcbPercentage,
        minPcbRequired,
        age: calculatedAgeIn2026,
        reasons: reasonList,
        timestamp: new Date().toISOString()
      };

      setEvaluationResult(result);
      setIsEvaluating(false);

      // Save lead query to Google Sheet & CRM
      if (formData.name && formData.phone) {
        submitToGoogleSheet({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          neetStatus: formData.neetStatus,
          neetScore: formData.neetScore,
          pcbPercentage: Number(pcbPercentage),
          source: "Interactive Eligibility Checker Tool",
          preferredUniversity: formData.preferredCity ? `${formData.preferredCity} Medical University` : "Tashkent Medical Academy",
          budget: "Eligible for Govt / Private",
          notes: `Eligibility Status: ${status} | Category: ${formData.category} | Age: ${calculatedAgeIn2026} | PCB: ${pcbPercentage}%`
        });
      }
    }, 400);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-6 sm:p-8 lg:p-10 font-sans">
      {/* Header */}
      <div className="pb-6 border-b border-[#D9E2EC]">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D9E2EC]">
          <Award className="w-3.5 h-3.5 text-[#063280]" />
          NMC & University Rule Compliance Engine
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
          Uzbekistan MBBS Eligibility Evaluator
        </h2>
        <p className="text-[#475569] text-sm mt-1">
          Instant rule-based assessment under NMC FMGL 2021 guidelines and Uzbekistan Ministry of Higher Education norms.
        </p>
      </div>

      <form onSubmit={handleEvaluate} className="space-y-6 pt-6">
        {/* Student Profile Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Aman Sharma"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              Mobile Number (WhatsApp) *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              Category (Quota Rules)
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden font-medium text-[#0F172A]"
            >
              <option value="General">General / Open (50% PCB required)</option>
              <option value="OBC">OBC (40% PCB required)</option>
              <option value="SC">SC (40% PCB required)</option>
              <option value="ST">ST (40% PCB required)</option>
              <option value="EWS">EWS (50% PCB required)</option>
            </select>
          </div>
        </div>

        {/* 12th Marks Grid */}
        <div className="bg-[#F7FAFC] p-5 rounded-2xl border border-[#D9E2EC] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280]">
              10+2 / 12th Standard Subject Marks (Out of 100)
            </span>
            <span className="text-xs font-bold text-[#063280] bg-[#EBF3FA] px-2.5 py-0.5 rounded-full border border-[#D9E2EC]">
              Current PCB Aggregate: {pcbPercentage}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Physics Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={formData.physicsMarks}
                onChange={(e) => setFormData({ ...formData, physicsMarks: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-white font-bold text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Chemistry Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={formData.chemistryMarks}
                onChange={(e) => setFormData({ ...formData, chemistryMarks: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-white font-bold text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Biology / Biotech Marks</label>
              <input
                type="number"
                min="0"
                max="100"
                required
                value={formData.biologyMarks}
                onChange={(e) => setFormData({ ...formData, biologyMarks: e.target.value })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-white font-bold text-[#0F172A]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#475569] mb-1">Passed English?</label>
              <select
                value={formData.englishPass ? "yes" : "no"}
                onChange={(e) => setFormData({ ...formData, englishPass: e.target.value === "yes" })}
                className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-white font-semibold text-[#0F172A]"
              >
                <option value="yes">Yes, Passed in 12th</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
        </div>

        {/* NEET & Age Details */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              NEET Qualification Status *
            </label>
            <select
              value={formData.neetStatus}
              onChange={(e) => setFormData({ ...formData, neetStatus: e.target.value })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] font-semibold text-[#0F172A]"
            >
              <option value="Qualified">Qualified in NEET-UG (2024 / 2025 / 2026)</option>
              <option value="Appearing">Appearing in NEET-UG 2026</option>
              <option value="Not Qualified">Did not qualify / Below cutoff</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              Date of Birth (For Age Check)
            </label>
            <input
              type="date"
              required
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="w-full text-sm px-3.5 py-2 rounded-xl border border-[#D9E2EC] font-medium text-[#0F172A] bg-[#F7FAFC]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-1.5">
              Passport Readiness
            </label>
            <select
              value={formData.hasPassport ? "yes" : "no"}
              onChange={(e) => setFormData({ ...formData, hasPassport: e.target.value === "yes" })}
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] font-medium text-[#0F172A]"
            >
              <option value="yes">Ready / Valid for 2+ Years</option>
              <option value="no">Applied / In Process</option>
            </select>
          </div>
        </div>

        {/* Evaluate Button */}
        <div>
          <button
            type="submit"
            disabled={isEvaluating}
            className="w-full py-4 px-6 bg-[#063280] hover:bg-[#1558A9] text-white font-extrabold rounded-2xl text-sm sm:text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#9B193A]"
          >
            {isEvaluating ? (
              <span>Evaluating Academic & Regulatory Eligibility...</span>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-[#9ABAD9]" />
                Check Instant Admission Eligibility
              </>
            )}
          </button>
        </div>
      </form>

      {/* Result Card */}
      {evaluationResult && (
        <div className="mt-8 pt-6 border-t border-[#D9E2EC] animate-in fade-in duration-300">
          <div
            className={`p-6 rounded-3xl border ${
              evaluationResult.status === "Eligible"
                ? "bg-[#EBF3FA] border-[#063280] text-[#063280]"
                : evaluationResult.status === "Not Eligible"
                ? "bg-rose-50/80 border-rose-300 text-rose-950"
                : "bg-amber-50/80 border-amber-300 text-amber-950"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
              <div className="flex items-center gap-3">
                {evaluationResult.status === "Eligible" ? (
                  <div className="w-12 h-12 rounded-2xl bg-[#063280] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                ) : evaluationResult.status === "Not Eligible" ? (
                  <div className="w-12 h-12 rounded-2xl bg-[#9B193A] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <XCircle className="w-7 h-7" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                )}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider opacity-75">Evaluation Result</span>
                  <h3 className="text-xl sm:text-2xl font-black">{evaluationResult.status}</h3>
                </div>
              </div>

              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white border border-[#D9E2EC] shadow-2xs text-[#063280]">
                Calculated Age: {evaluationResult.age} Yrs • PCB: {evaluationResult.pcbPercentage}%
              </div>
            </div>

            {/* Explanation & Next Steps */}
            <div className="py-4 space-y-3 text-xs sm:text-sm">
              {evaluationResult.status === "Eligible" ? (
                <div className="space-y-2">
                  <p className="font-semibold text-[#063280]">
                    🎉 Outstanding! You meet all statutory NMC FMGL 2021 & Uzbekistan University admission criteria:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 opacity-90 text-xs text-[#0F172A]">
                    <li>12th PCB Aggregate: <strong>{evaluationResult.pcbPercentage}%</strong> (Meets minimum {evaluationResult.minPcbRequired}% benchmark).</li>
                    <li>Age requirement: <strong>{evaluationResult.age} years</strong> (Completed 17+ requirement).</li>
                    <li>Eligible for <strong>Tashkent Medical Academy, Samarkand State Medical University, Bukhara State Medical Institute</strong>, and other premier government colleges.</li>
                  </ul>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="font-semibold">Important Regulatory Notes:</p>
                  <ul className="list-disc pl-5 space-y-1 text-xs">
                    {evaluationResult.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  onOpenLeadModal(
                    `Eligibility Verified (${evaluationResult.status} - PCB ${evaluationResult.pcbPercentage}%)`
                  )
                }
                className="px-5 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Request University Seat Matrix & Letter</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footnote */}
      <div className="mt-6 text-[11px] text-[#475569] leading-relaxed flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-[#063280] shrink-0 mt-0.5" />
        <p>
          *Disclaimer: This tool calculates eligibility according to National Medical Commission (NMC) Gazette notifications and standard university admission guidelines. Official confirmation is issued upon document verification by the university admissions committee.
        </p>
      </div>
    </div>
  );
}
