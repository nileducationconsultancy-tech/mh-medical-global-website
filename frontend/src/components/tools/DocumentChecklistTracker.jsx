import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  CheckCircle2,
  Circle,
  Printer,
  RotateCcw,
  Sparkles,
  Download,
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from "lucide-react";

export function DocumentChecklistTracker({ onOpenLeadModal }) {
  const defaultDocuments = [
    {
      id: "doc-1",
      category: "Academic Records",
      title: "Class 10th Marksheet & Passing Certificate",
      description: "Original required for age and date of birth verification. Minimum 2 attested copies.",
      required: true
    },
    {
      id: "doc-2",
      category: "Academic Records",
      title: "Class 12th Marksheet (PCB Subjects)",
      description: "Must show minimum 50% aggregate in Physics, Chemistry, Biology (40% for SC/ST/OBC).",
      required: true
    },
    {
      id: "doc-3",
      category: "Statutory Entrance",
      title: "NEET-UG Scorecard (Valid 3 Years)",
      description: "Must meet qualifying percentile cutoff under NMC Gazette FMGL regulations.",
      required: true
    },
    {
      id: "doc-4",
      category: "Travel & Identity",
      title: "Original Passport (Min. 18 Months Validity)",
      description: "Must contain at least 2 blank visa pages. Clear front and back bio-data scans.",
      required: true
    },
    {
      id: "doc-5",
      category: "Medical Clearance",
      title: "Government Hospital Health & HIV Negative Certificate",
      description: "Issued within 30 days of application. Certified blood report showing negative HIV and Hepatitis B/C.",
      required: true
    },
    {
      id: "doc-6",
      category: "Consular Legalization",
      title: "Ministry of External Affairs (MEA) Apostille Attestation",
      description: "Original 12th marksheet must have an apostille sticker issued by the MEA, Government of India.",
      required: true
    },
    {
      id: "doc-7",
      category: "Consular Legalization",
      title: "Notarized Russian / Uzbek Legal Translation",
      description: "English marksheet and birth certificate translated and notarized by a sworn official translator.",
      required: true
    },
    {
      id: "doc-8",
      category: "Photographs",
      title: "15 Passport-Size Photographs (35mm x 45mm)",
      description: "Matte finish, white background, 80% face coverage, without spectacles or glare.",
      required: true
    },
    {
      id: "doc-9",
      category: "Financial Documents",
      title: "Parent / Sponsor Bank Statement & Sponsorship Affidavit",
      description: "Last 6 months bank statement showing minimum ₹4-5 Lakhs closing balance for student maintenance.",
      required: false
    },
    {
      id: "doc-10",
      category: "Travel & Identity",
      title: "Police Clearance Certificate (PCC)",
      description: "Issued by Regional Passport Office (RPO) within 3 months of departure.",
      required: false
    }
  ];

  // Load state from localStorage
  const [checkedDocs, setCheckedDocs] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mh_doc_checklist");
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        return {};
      }
    }
    return {};
  });

  const handleToggle = (id) => {
    const updated = { ...checkedDocs, [id]: !checkedDocs[id] };
    setCheckedDocs(updated);
    try {
      localStorage.setItem("mh_doc_checklist", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your checklist progress?")) {
      setCheckedDocs({});
      localStorage.removeItem("mh_doc_checklist");
    }
  };

  const totalCount = defaultDocuments.length;
  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 lg:p-10 font-sans print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#0752B8] text-xs font-bold uppercase tracking-wider mb-2 border border-blue-200">
            <FileCheck2 className="w-3.5 h-3.5 text-[#0752B8]" />
            Interactive Document Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082B57]">
            Uzbekistan MBBS Document Readiness Checklist
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Track your required admission, Apostille, and A-2 student visa documents step-by-step.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0752B8] border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklist</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-[#D90436] text-slate-500 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
            title="Reset checked items"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-6 border-b border-slate-200">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
          <span>Your Document Readiness:</span>
          <span className="text-[#0752B8] font-extrabold text-sm">
            {completedCount} of {totalCount} Completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-linear-to-r from-[#0752B8] to-[#082B57] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Documents List */}
      <div className="divide-y divide-slate-100 pt-4">
        {defaultDocuments.map((doc) => {
          const isChecked = !!checkedDocs[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => handleToggle(doc.id)}
              className={`py-4 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer flex items-start gap-4 ${
                isChecked ? "bg-blue-50/50" : "hover:bg-slate-50"
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-[#0752B8]" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`text-sm font-bold ${isChecked ? "line-through text-slate-400" : "text-slate-900"}`}>
                    {doc.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#0752B8] border border-blue-200">
                    {doc.category}
                  </span>
                  {doc.required && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-[#D90436] border border-rose-200">
                      Mandatory
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assistance Footer Card */}
      <div className="mt-8 p-5 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#0752B8] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-[#082B57]">Need Help with MEA Apostille & Notarization?</p>
            <p className="text-slate-600">MH GLOBAL EDUCATION CONSULTANT handles complete government apostille, embassy translation, and visa teletex clearances.</p>
          </div>
        </div>
        <button
          onClick={() => onOpenLeadModal("Apostille & Document Support Request")}
          className="px-4 py-2.5 bg-[#D90436] hover:bg-[#B8032D] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer shadow-xs active:scale-98"
        >
          Get Free Document Assistance
        </button>
      </div>
    </div>
  );
}
