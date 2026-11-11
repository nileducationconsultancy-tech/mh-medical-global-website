import React, { useState } from "react";
import { universitiesData, USD_TO_INR_RATE } from "../../data/universitiesData";
import {
  Scale,
  Building2,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";

export function ComparisonEngine({ onOpenLeadModal }) {
  // Default compare TMA and Samarkand State Medical University
  const [selectedIds, setSelectedIds] = useState([
    "tashkent-medical-academy",
    "samarkand-state-medical-university"
  ]);

  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const availableToAdd = universitiesData.filter((u) => !selectedIds.includes(u.id));

  const handleAddUniversity = (id) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleRemoveUniversity = (id) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    }
  };

  const comparedUnis = selectedIds.map((id) =>
    universitiesData.find((u) => u.id === id)
  );

  const formatINR = (usd) => {
    const val = Math.round(usd * USD_TO_INR_RATE);
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 lg:p-10 font-sans">
      {/* Comparison Engine Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#0752B8] text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <Scale className="w-3.5 h-3.5 text-[#0752B8]" />
            Multi-College Decision Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082B57]">
            Compare Uzbekistan Medical Universities
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Compare up to 4 universities side-by-side on clinical hospital beds, tuition, Indian mess, and location.
          </p>
        </div>

        {/* Add University Dropdown */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          {availableToAdd.length > 0 && selectedIds.length < 4 && (
            <select
              onChange={(e) => {
                if (e.target.value) handleAddUniversity(e.target.value);
                e.target.value = "";
              }}
              defaultValue=""
              className="text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-[#082B57] focus:ring-2 focus:ring-[#0752B8] cursor-pointer"
            >
              <option value="" disabled>+ Add University to Compare</option>
              {availableToAdd.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.city})
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => setHighlightDifferences(!highlightDifferences)}
            className={`text-xs font-semibold px-3 py-2.5 rounded-xl border transition-colors cursor-pointer ${
              highlightDifferences
                ? "bg-blue-50 border-[#0752B8] text-[#0752B8] font-bold"
                : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {highlightDifferences ? "Differences Highlighted" : "Highlight Differences"}
          </button>
        </div>
      </div>

      {/* Comparison Grid Matrix */}
      <div className="overflow-x-auto pt-6">
        <table className="w-full text-left border-collapse min-w-[650px]">
          <thead>
            <tr>
              <th className="p-3 bg-slate-50 rounded-tl-2xl w-48 text-xs font-extrabold uppercase text-[#082B57] tracking-wider border-b border-slate-200">
                Feature / Metric
              </th>
              {comparedUnis.map((uni) => (
                <th key={uni.id} className="p-4 bg-slate-50 border-l border-b border-slate-200 min-w-[220px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        uni.type === "Government" ? "bg-[#0752B8] text-white" : "bg-[#082B57] text-white"
                      }`}>
                        {uni.type}
                      </span>
                      <h4 className="font-extrabold text-[#082B57] text-sm mt-1 leading-tight">{uni.name}</h4>
                      <p className="text-xs text-slate-500">{uni.city}, Uzbekistan</p>
                    </div>

                    {selectedIds.length > 1 && (
                      <button
                        onClick={() => handleRemoveUniversity(uni.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-xs divide-y divide-slate-100">
            {/* Established Year */}
            <tr className="hover:bg-slate-50/80">
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Established Year</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100 font-semibold text-slate-800">
                  {u.establishedYear} ({new Date().getFullYear() - u.establishedYear} Years of Legacy)
                </td>
              ))}
            </tr>

            {/* Program & Duration */}
            <tr className="hover:bg-slate-50/80">
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Program & Duration</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="font-bold text-slate-900">6 Years (5+1 Format)</span>
                  <p className="text-[11px] text-[#0752B8] font-semibold">NMC FMGL 2021 Compliant</p>
                </td>
              ))}
            </tr>

            {/* Medium of Instruction */}
            <tr className="hover:bg-slate-50/80">
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Medium of Instruction</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100 font-bold text-[#0752B8]">
                  100% English Medium
                </td>
              ))}
            </tr>

            {/* Annual Tuition Fee */}
            <tr className={`hover:bg-slate-50/80 ${highlightDifferences ? "bg-blue-50/50" : ""}`}>
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Annual Tuition Fee</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="text-sm font-extrabold text-[#0752B8]">${u.fees.annualTuitionUSD.toLocaleString()} / yr</span>
                  <p className="text-[11px] text-slate-500">~{formatINR(u.fees.annualTuitionUSD)} / yr</p>
                </td>
              ))}
            </tr>

            {/* Annual Hostel Fee */}
            <tr className="hover:bg-slate-50/80">
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Annual Hostel Fee</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="font-bold text-slate-800">${u.fees.annualHostelUSD} / yr</span>
                  <p className="text-[11px] text-slate-500">~{formatINR(u.fees.annualHostelUSD)} / yr</p>
                </td>
              ))}
            </tr>

            {/* 6-Year Total Estimated Package */}
            <tr className="bg-blue-50/40">
              <td className="p-3 font-bold text-[#082B57] bg-blue-50/60">Estimated 6-Year Total</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="text-sm font-extrabold text-[#D90436]">
                    {formatINR(u.fees.estimatedTotal6YearsUSD)}
                  </span>
                  <p className="text-[11px] text-[#0752B8] font-medium">(${u.fees.estimatedTotal6YearsUSD.toLocaleString()} USD)</p>
                </td>
              ))}
            </tr>

            {/* Clinical Training & Hospital Beds */}
            <tr className={`hover:bg-slate-50/80 ${highlightDifferences ? "bg-blue-50/50" : ""}`}>
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Clinical Hospital Beds</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="font-bold text-slate-900">
                    {u.quickHighlights?.find((h) => h.label.includes("Beds"))?.value || "3,000+ Beds"}
                  </span>
                  <p className="text-[11px] text-slate-500 truncate">
                    {u.affiliationRecognition?.universityType || "State Teaching Base"}
                  </p>
                </td>
              ))}
            </tr>

            {/* Indian Students & Food */}
            <tr className="hover:bg-slate-50/80">
              <td className="p-3 font-bold text-[#082B57] bg-slate-50/60">Indian Community & Mess</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <span className="font-semibold text-slate-800">
                    {u.quickHighlights?.find((h) => h.label.includes("Mess"))?.value ? "On-Campus Indian Mess" : "Available"}
                  </span>
                  <p className="text-[11px] text-emerald-700 font-medium">✓ Authentic Indian Meals (Veg & Non-Veg)</p>
                </td>
              ))}
            </tr>

            {/* Detailed Page & Action */}
            <tr>
              <td className="p-3 bg-slate-50/60"></td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-slate-100">
                  <div className="space-y-2">
                    <Link
                      to={`/universities/uzbekistan/${u.slug}`}
                      className="block text-center py-2 px-3 bg-slate-100 hover:bg-blue-50 text-[#0752B8] font-bold rounded-xl transition-colors border border-slate-200"
                    >
                      View Full Profile
                    </Link>
                    <button
                      onClick={() => onOpenLeadModal(`Admission Inquiry for ${u.name}`)}
                      className="w-full text-center py-2.5 px-3 bg-[#D90436] hover:bg-[#B8032D] text-white font-bold rounded-xl transition-colors shadow-xs cursor-pointer active:scale-98"
                    >
                      Apply Now
                    </button>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
