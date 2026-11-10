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
    <div className="bg-white rounded-3xl shadow-xl border border-[#DEDCD4] p-6 sm:p-8 lg:p-10 font-sans">
      {/* Comparison Engine Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#DEDCD4]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECEDE8] text-[#590907] text-xs font-bold uppercase tracking-wider mb-2 border border-[#DEDCD4]">
            <Scale className="w-3.5 h-3.5 text-[#590907]" />
            Multi-College Decision Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#201C1A]">
            Compare Uzbekistan Medical Universities
          </h2>
          <p className="text-[#77776F] text-sm mt-1">
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
              className="text-xs font-bold px-3 py-2.5 rounded-xl border border-[#DEDCD4] bg-[#F7F5F0] text-[#201C1A] focus:ring-2 focus:ring-[#590907] cursor-pointer"
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
                ? "bg-[#ECEDE8] border-[#590907] text-[#590907] font-bold"
                : "bg-[#F7F5F0] border-[#DEDCD4] text-[#77776F] hover:bg-[#ECEDE8]"
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
              <th className="p-3 bg-[#F7F5F0] rounded-tl-2xl w-48 text-xs font-extrabold uppercase text-[#590907] tracking-wider border-b border-[#DEDCD4]">
                Feature / Metric
              </th>
              {comparedUnis.map((uni) => (
                <th key={uni.id} className="p-4 bg-[#F7F5F0] border-l border-b border-[#DEDCD4] min-w-[220px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        uni.type === "Government" ? "bg-[#590907] text-white" : "bg-[#590907] text-white"
                      }`}>
                        {uni.type}
                      </span>
                      <h4 className="font-extrabold text-[#590907] text-sm mt-1 leading-tight">{uni.name}</h4>
                      <p className="text-xs text-[#77776F]">{uni.city}, Uzbekistan</p>
                    </div>

                    {selectedIds.length > 1 && (
                      <button
                        onClick={() => handleRemoveUniversity(uni.id)}
                        className="text-[#77776F] hover:text-[#390605] p-1 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
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

          <tbody className="text-xs divide-y divide-[#DEDCD4]">
            {/* Established Year */}
            <tr className="hover:bg-[#F7F5F0]">
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Established Year</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4] font-semibold text-[#201C1A]">
                  {u.establishedYear} ({new Date().getFullYear() - u.establishedYear} Years of Legacy)
                </td>
              ))}
            </tr>

            {/* Program & Duration */}
            <tr className="hover:bg-[#F7F5F0]">
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Program & Duration</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="font-bold text-[#201C1A]">6 Years (5+1 Format)</span>
                  <p className="text-[11px] text-[#590907] font-semibold">NMC FMGL 2021 Compliant</p>
                </td>
              ))}
            </tr>

            {/* Medium of Instruction */}
            <tr className="hover:bg-[#F7F5F0]">
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Medium of Instruction</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4] font-bold text-[#590907]">
                  100% English Medium
                </td>
              ))}
            </tr>

            {/* Annual Tuition Fee */}
            <tr className={`hover:bg-[#F7F5F0] ${highlightDifferences ? "bg-[#ECEDE8]" : ""}`}>
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Annual Tuition Fee</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="text-sm font-extrabold text-[#590907]">${u.fees.annualTuitionUSD.toLocaleString()} / yr</span>
                  <p className="text-[11px] text-[#77776F]">~{formatINR(u.fees.annualTuitionUSD)} / yr</p>
                </td>
              ))}
            </tr>

            {/* Annual Hostel Fee */}
            <tr className="hover:bg-[#F7F5F0]">
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Annual Hostel Fee</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="font-bold text-[#201C1A]">${u.fees.annualHostelUSD} / yr</span>
                  <p className="text-[11px] text-[#77776F]">~{formatINR(u.fees.annualHostelUSD)} / yr</p>
                </td>
              ))}
            </tr>

            {/* 6-Year Total Estimated Package */}
            <tr className="bg-[#ECEDE8]/70">
              <td className="p-3 font-bold text-[#590907] bg-[#ECEDE8]">Estimated 6-Year Total</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="text-sm font-extrabold text-[#590907]">
                    {formatINR(u.fees.estimatedTotal6YearsUSD)}
                  </span>
                  <p className="text-[11px] text-[#590907] font-medium">(${u.fees.estimatedTotal6YearsUSD.toLocaleString()} USD)</p>
                </td>
              ))}
            </tr>

            {/* Clinical Training & Hospital Beds */}
            <tr className={`hover:bg-[#F7F5F0] ${highlightDifferences ? "bg-[#ECEDE8]" : ""}`}>
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Clinical Hospital Beds</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="font-bold text-[#201C1A]">
                    {u.quickHighlights?.find((h) => h.label.includes("Beds"))?.value || "3,000+ Beds"}
                  </span>
                  <p className="text-[11px] text-[#77776F] truncate">
                    {u.affiliationRecognition?.universityType || "State Teaching Base"}
                  </p>
                </td>
              ))}
            </tr>

            {/* Indian Students & Food */}
            <tr className="hover:bg-[#F7F5F0]">
              <td className="p-3 font-bold text-[#590907] bg-[#F7F5F0]/60">Indian Community & Mess</td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <span className="font-semibold text-[#201C1A]">
                    {u.quickHighlights?.find((h) => h.label.includes("Mess"))?.value ? "On-Campus Indian Mess" : "Available"}
                  </span>
                  <p className="text-[11px] text-[#590907] font-medium">✓ Authentic Indian Meals (Veg & Non-Veg)</p>
                </td>
              ))}
            </tr>

            {/* Detailed Page & Action */}
            <tr>
              <td className="p-3 bg-[#F7F5F0]/60"></td>
              {comparedUnis.map((u) => (
                <td key={u.id} className="p-3.5 border-l border-[#DEDCD4]">
                  <div className="space-y-2">
                    <Link
                      to={`/universities/uzbekistan/${u.slug}`}
                      className="block text-center py-2 px-3 bg-[#ECEDE8] hover:bg-[#E8D2B5] text-[#590907] font-bold rounded-xl transition-colors"
                    >
                      View Full Profile
                    </Link>
                    <button
                      onClick={() => onOpenLeadModal(`Admission Inquiry for ${u.name}`)}
                      className="w-full text-center py-2 px-3 bg-[#590907] hover:bg-[#590907] text-white font-bold rounded-xl transition-colors shadow-2xs cursor-pointer border-b-2 border-[#390605]"
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
