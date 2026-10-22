import React from "react";
import { X, ShieldCheck, CheckCircle2, FileText, ExternalLink, Award } from "lucide-react";

export function VerificationMethodologyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const verificationPillars = [
    {
      title: "1. Official Rectorate & Ministry Fee Decrees",
      description: "We do not accept agent quotes. Every tuition figure published on this platform is verified directly against official fee decrees issued by the Ministry of Higher Education, Science and Innovations and the respective university rectorates."
    },
    {
      title: "2. WDOMS & WHO Directory Active Verification",
      description: "We confirm that every recommended university is actively listed with a valid ECFMG Sponsor Note in the World Directory of Medical Schools (wdoms.org), ensuring USMLE, PLAB, and NExT eligibility."
    },
    {
      title: "3. Strict NMC FMGL 2021 Compliance Audit",
      description: "We audit the exact curriculum breakdown to verify that the academic duration is at least 54 months of continuous medical studies in 100% English medium, followed by 12 months of compulsory in-house clinical internship."
    },
    {
      title: "4. In-Person On-Ground Hostel & Mess Inspection",
      description: "Our full-time coordinators in Tashkent and Samarkand physically inspect hostel rooms, winter radiator heating systems, CCTV installations, and Indian mess kitchens before approving them for students."
    },
    {
      title: "5. Zero Tuition Intermediary Rule",
      description: "All university tuition fees are payable directly by parents or students into the official government bank account of the university. MH GLOBAL EDUCATION CONSULTANT handles no tuition funds directly."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-sans animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-[#D9E2EC] max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EC]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-[#063280]">How We Verify Medical Universities</h3>
              <p className="text-xs text-[#475569]">Our 5-Pillar Editorial & Institutional Verification Standard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {verificationPillars.map((p) => (
            <div key={p.title} className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1">
              <h4 className="font-extrabold text-sm text-[#063280] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0" />
                <span>{p.title}</span>
              </h4>
              <p className="text-xs text-[#475569] leading-relaxed pl-6">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#D9E2EC] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white font-extrabold text-xs rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Understood & Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerificationMethodologyModal;
