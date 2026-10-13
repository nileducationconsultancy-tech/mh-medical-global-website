import React, { useState, useEffect } from "react";
import {
  FileCheck2,
  CheckCircle2,
  Circle,
  Printer,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

const STORAGE_KEY = "mh_medical_doc_checklist";

const defaultDocuments = [
  {
    id: "doc-1",
    title: "Original Passport",
    category: "Identity & Travel",
    required: true,
    description: "Must have minimum 18 to 24 months validity with at least 3-4 blank visa pages."
  },
  {
    id: "doc-2",
    title: "10th Standard Marksheet & Passing Certificate",
    category: "Academic",
    required: true,
    description: "Original document + MEA Apostille sticker required for university matriculation."
  },
  {
    id: "doc-3",
    title: "12th Standard Marksheet (10+2 with PCB)",
    category: "Academic",
    required: true,
    description: "Proof of Physics, Chemistry, Biology aggregate (min 50% for Gen / 40% for Reserved) + MEA Apostille."
  },
  {
    id: "doc-4",
    title: "NEET-UG Scorecard",
    category: "Regulatory / NMC",
    required: true,
    description: "Mandatory qualifying NEET score (valid for 3 years for foreign medical admissions)."
  },
  {
    id: "doc-5",
    title: "Passport-Size Photographs (20 Copies)",
    category: "Identity & Travel",
    required: true,
    description: "35mm x 45mm, matte finish, 80% white background, clear face profile."
  },
  {
    id: "doc-6",
    title: "Birth Certificate (in English)",
    category: "Identity & Travel",
    required: true,
    description: "English notarized copy if original is in a regional vernacular language."
  },
  {
    id: "doc-7",
    title: "General Medical Fitness Certificate",
    category: "Medical",
    required: true,
    description: "Signed and stamped by an authorized registered medical practitioner (MBBS/MD)."
  },
  {
    id: "doc-8",
    title: "HIV / AIDS Test Report (Negative)",
    category: "Medical",
    required: true,
    description: "Certified government laboratory report issued within 30 days of visa submission."
  },
  {
    id: "doc-9",
    title: "Police Clearance Certificate (PCC)",
    category: "Immigration",
    required: false,
    description: "Issued by Regional Passport Office (RPO) / Passport Seva Kendra (if requested by embassy)."
  },
  {
    id: "doc-10",
    title: "Parent / Sponsor Bank Statement & Financial Guarantee",
    category: "Financial",
    required: true,
    description: "Last 6 months bank statement showing financial stability for tuition payments."
  }
];

export function DocumentChecklistTracker({ onOpenLeadModal }) {
  const [checkedDocs, setCheckedDocs] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCheckedDocs(JSON.parse(saved));
      } catch {
        setCheckedDocs({});
      }
    }
  }, []);

  const handleToggle = (id) => {
    const updated = { ...checkedDocs, [id]: !checkedDocs[id] };
    setCheckedDocs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleReset = () => {
    setCheckedDocs({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalCount = defaultDocuments.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-6 sm:p-8 lg:p-10 font-sans print:shadow-none print:border-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D9E2EC]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider mb-2 border border-[#D9E2EC]">
            <FileCheck2 className="w-3.5 h-3.5 text-[#063280]" />
            Interactive Document Tracker
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Uzbekistan MBBS Document Readiness Checklist
          </h2>
          <p className="text-[#475569] text-sm mt-1">
            Track your required admission, Apostille, and A-2 student visa documents step-by-step.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7FAFC] hover:bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC] text-xs font-bold transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklist</span>
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7FAFC] hover:bg-rose-50 hover:text-[#9B193A] text-[#475569] border border-[#D9E2EC] text-xs font-bold transition-colors cursor-pointer"
            title="Reset checked items"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="py-6 border-b border-[#D9E2EC]">
        <div className="flex items-center justify-between text-xs font-bold text-[#0F172A] mb-2">
          <span>Your Document Readiness:</span>
          <span className="text-[#063280] font-extrabold text-sm">
            {completedCount} of {totalCount} Completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-3 bg-[#EBF3FA] rounded-full overflow-hidden border border-[#D9E2EC]">
          <div
            className="h-full bg-linear-to-r from-[#063280] to-[#1558A9] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Documents List */}
      <div className="divide-y divide-[#D9E2EC] pt-4">
        {defaultDocuments.map((doc) => {
          const isChecked = !!checkedDocs[doc.id];
          return (
            <div
              key={doc.id}
              onClick={() => handleToggle(doc.id)}
              className={`py-4 px-3 sm:px-4 rounded-2xl transition-all cursor-pointer flex items-start gap-4 ${
                isChecked ? "bg-[#EBF3FA]/60" : "hover:bg-[#F7FAFC]"
              }`}
            >
              <div className="pt-0.5 shrink-0">
                {isChecked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#063280]" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300 hover:text-[#063280]" />
                )}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className={`text-sm font-bold ${isChecked ? "line-through text-slate-400" : "text-[#0F172A]"}`}>
                    {doc.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC]">
                    {doc.category}
                  </span>
                  {doc.required && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#9B193A]/10 text-[#9B193A] border border-[#9B193A]/20">
                      Mandatory
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {doc.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Assistance Footer Card */}
      <div className="mt-8 p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-[#063280] shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-[#063280]">Need Help with MEA Apostille & Notarization?</p>
            <p className="text-[#475569]">MH GLOBAL EDUCATION CONSULTANT handles complete government apostille, embassy translation, and visa teletex clearances.</p>
          </div>
        </div>
        <button
          onClick={() => onOpenLeadModal("Apostille & Document Support Request")}
          className="px-4 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white text-xs font-bold rounded-xl transition-colors shrink-0 cursor-pointer border-b-2 border-[#9B193A]"
        >
          Get Free Document Assistance
        </button>
      </div>
    </div>
  );
}
