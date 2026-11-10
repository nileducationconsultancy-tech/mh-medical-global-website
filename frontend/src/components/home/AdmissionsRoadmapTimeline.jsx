import React from "react";
import { Link } from "react-router-dom";
import {
  FileCheck,
  CheckCircle2,
  GraduationCap,
  FileText,
  Stamp,
  Plane,
  Home,
  Utensils,
  BookOpen,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export function AdmissionsRoadmapTimeline({ onOpenLeadModal }) {
  const steps = [
    {
      num: "01",
      icon: FileCheck,
      title: "Free Eligibility Assessment",
      desc: "Evaluate 10+2 PCB aggregate (50% Gen, 40% Res) and NEET qualification with a senior advisor."
    },
    {
      num: "02",
      icon: FileText,
      title: "Document Verification",
      desc: "Verification of 10th/12th marksheets, passport validity, and submission for MEA Apostille legalization."
    },
    {
      num: "03",
      icon: GraduationCap,
      title: "University Admission Letter",
      desc: "Receive official provisional admission offer letter directly from the chosen Uzbekistan Medical University."
    },
    {
      num: "04",
      icon: Stamp,
      title: "Ministry Visa Teletex",
      desc: "Uzbekistan Ministry of Foreign Affairs (MFA) issues electronic student visa invitation code (teletex)."
    },
    {
      num: "05",
      icon: ShieldCheck,
      title: "Student Visa (A-2) Stamping",
      desc: "Embassy passport submission, biometric verification, and issuance of multi-entry student visa."
    },
    {
      num: "06",
      icon: CheckCircle2,
      title: "Direct Tuition Wire",
      desc: "Safe international bank wire (Swift/TT) payment directly into university government account."
    },
    {
      num: "07",
      icon: Plane,
      title: "Supervised Group Departure",
      desc: "Students travel together from New Delhi (DEL) to Tashkent (TAS) accompanied by senior coordinators."
    },
    {
      num: "08",
      icon: Home,
      title: "Hostel Room Allotment",
      desc: "Airport reception, immigration clearance, transport to campus, and student dormitory check-in."
    },
    {
      num: "09",
      icon: BookOpen,
      title: "Indian Mess & Class Orientation",
      desc: "Indian mess onboarding, local biometric registration, white coat ceremony, and start of English classes."
    }
  ];

  return (
    <section className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] rounded-3xl p-6 sm:p-10 lg:p-12 text-white text-center space-y-10 shadow-xl relative overflow-hidden border border-[#9ABAD9]/20 font-sans">
      <div className="space-y-3 max-w-2xl mx-auto">
        <span className="text-[11px] font-bold uppercase tracking-widest text-white bg-[#9B193A] px-3.5 py-1 rounded-full shadow-xs">
          Hassle-Free 9-Step Pathway
        </span>
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Complete 9-Step Admission Roadmap for Indian Students
        </h2>
        <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
          From your initial eligibility check to airport reception in Tashkent — our step-by-step guidance ensures 100% peace of mind with zero surprises.
        </p>
      </div>

      {/* 9-Step Responsive Grid / Vertical Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.num}
              className="bg-white/10 hover:bg-white/15 border border-white/15 p-5 rounded-2xl space-y-2 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#9ABAD9] bg-white/10 px-2.5 py-0.5 rounded-md">
                    Step {st.num}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="font-extrabold text-sm text-white">{st.title}</h4>
                <p className="text-[11px] text-slate-200 leading-relaxed">{st.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/mbbs-admission-uzbekistan"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#063280] font-extrabold text-xs sm:text-sm transition-all shadow-md"
        >
          <span>Explore Detailed Step-by-Step Admission Guide</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <button
          onClick={() => onOpenLeadModal("Admission Roadmap Free Application Form")}
          className="px-6 py-3.5 rounded-xl bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
        >
          Start Step 01 Today (100% Free)
        </button>
      </div>
    </section>
  );
}

export default AdmissionsRoadmapTimeline;
