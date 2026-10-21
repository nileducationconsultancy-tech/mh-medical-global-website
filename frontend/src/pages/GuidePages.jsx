import React from "react";
import { Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import {
  GraduationCap,
  FileCheck2,
  Plane,
  ShieldAlert,
  Scale,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles
} from "lucide-react";
import { DocumentChecklistTracker } from "../components/tools/DocumentChecklistTracker";
import { DisclaimerBanner } from "../components/common/SourceBadge";
import { siteConfig } from "../config/site";

export function AdmissionProcessPage({ onOpenLeadModal }) {
  const steps = [
    {
      step: "01",
      title: "Free Expert Counselling & Profile Analysis",
      desc: "Discuss career goals, budget preferences, NEET score, and government vs private college options with an experienced MH GLOBAL EDUCATION CONSULTANT senior academic advisor."
    },
    {
      step: "02",
      title: "Eligibility Verification & Document Submission",
      desc: "Submit scanned copies of 10th & 12th marksheets, NEET-UG scorecard, and valid passport for preliminary eligibility screening."
    },
    {
      step: "03",
      title: "University Application & Interview Assessment",
      desc: "Application dossier is formally submitted to the university international admission committee for basic English proficiency assessment."
    },
    {
      step: "04",
      title: "Official Admission / Offer Letter Issuance",
      desc: "The university issues the official unconditional Admission Letter confirming seat reservation in the 6-year MD Physician English program."
    },
    {
      step: "05",
      title: "Ministry of Foreign Affairs (MFA) Teletex Clearance",
      desc: "The university requests official electronic student visa support (Teletex confirmation code) from the Ministry of Foreign Affairs of Uzbekistan."
    },
    {
      step: "06",
      title: "Document Legalization & MEA Apostille",
      desc: "Academic documents undergo official Apostille attestation by the Ministry of External Affairs (MEA), Government of India, plus legal translation."
    },
    {
      step: "07",
      title: "Student Visa (A-2) Stamping & Processing",
      desc: "Submission of visa application to the Embassy of Uzbekistan in New Delhi or issuance of electronic student e-visa."
    },
    {
      step: "08",
      title: "Pre-Departure Briefing & Group Travel",
      desc: "Briefing session on currency exchange, winter clothing, packing list, forex card, and airport coordination from New Delhi to Tashkent."
    },
    {
      step: "09",
      title: "On-Ground Reception & Hostel Registration",
      desc: "Airport reception in Tashkent by our coordinator team, transit to university hostel, medical checkup, biometric registration, and orientation."
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="MBBS Admission in Uzbekistan 2026: 9-Step Process, Documents & Timeline | MH GLOBAL EDUCATION CONSULTANT"
        description="Step-by-step admission roadmap for Indian students studying MBBS in Uzbekistan. From counselling and offer letter to MFA visa teletex and hostel check-in."
        canonicalUrl={`${siteConfig.siteUrl}/mbbs-admission-uzbekistan`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-2.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Admission Roadmap
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Uzbekistan MBBS Admission Process (2026-2027)
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            A transparent 9-step timeline designed to ensure effortless university enrollment, visa approval, and smooth on-ground transition.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl border border-[#D9E2EC] shadow-xs flex items-start gap-4 sm:gap-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#063280] text-white flex items-center justify-center font-black text-base shrink-0 shadow-md">
                {item.step}
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-base sm:text-lg text-[#063280]">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#EBF3FA] p-6 rounded-3xl border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#063280] space-y-1">
            <p className="font-bold text-sm">Ready to start your admission process?</p>
            <p className="text-[#475569]">Our senior admission directors will guide you through university selection and documentation.</p>
          </div>
          <button
            onClick={() => onOpenLeadModal("Admission Timeline Free Registration")}
            className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shrink-0 cursor-pointer border-b-2 border-[#9B193A]"
          >
            Start Free Application
          </button>
        </div>
      </section>
    </div>
  );
}

export function DocumentChecklistPage({ onOpenLeadModal }) {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="MBBS in Uzbekistan Document Checklist 2026: Marksheets, Apostille & Visa Docs | MH GLOBAL EDUCATION CONSULTANT"
        description="Interactive document checklist for Indian medical students applying to Uzbekistan. Track passport validity, MEA Apostille, NEET scorecards, and medical test reports."
        canonicalUrl={`${siteConfig.siteUrl}/document-checklist`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-3.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Document Tracker
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Document Checklist for MBBS in Uzbekistan
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Interactive readiness tracker with real-time progress saving, printable checklist, and MEA Apostille guidelines.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <DocumentChecklistTracker onOpenLeadModal={onOpenLeadModal} />
      </section>
    </div>
  );
}

export function VisaGuidePage({ onOpenLeadModal }) {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Uzbekistan Student Visa (A-2) Guide for Indian Students 2026 | MH GLOBAL EDUCATION CONSULTANT"
        description="Complete guide to obtaining Uzbekistan Student Visa (A-2). Learn about Ministry teletex invitations, consular submissions, embassy fees, and OVIR residency registration."
        canonicalUrl={`${siteConfig.siteUrl}/uzbekistan-student-visa`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-4.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Immigration & Travel
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Uzbekistan Student Visa (A-2) Guide
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Authoritative breakdown of the Ministry teletex issuance, Embassy visa stamping, and in-country OVIR residence permits.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <h2 className="text-xl font-black text-[#063280]">1. Understanding the Uzbekistan A-2 Student Visa</h2>
          <p>
            International students accepted into state and recognized private medical universities in Uzbekistan enter under the <strong>A-2 Category Student Visa</strong>. The visa is initially issued for entry and subsequently extended annually into a formal residence registration (OVIR/Prapiska) by the university international department.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <h2 className="text-xl font-black text-[#063280]">2. Key Stages in Visa Processing</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC]">
              <p className="font-bold text-[#063280]">Stage 1: Ministry Teletex Confirmation (Visa Support)</p>
              <p className="text-[#475569] text-xs mt-0.5">The university submits the student's passport and admission file to the Ministry of Foreign Affairs (MFA) in Tashkent. MFA generates an electronic teletex code sent to the Embassy of Uzbekistan in New Delhi.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC]">
              <p className="font-bold text-[#063280]">Stage 2: Embassy Visa Stamping or Electronic Visa</p>
              <p className="text-[#475569] text-xs mt-0.5">Application is lodged with original passport, photos, HIV test report, and visa fees. Normal processing window: 10 to 15 working days.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC]">
              <p className="font-bold text-[#063280]">Stage 3: Arrival & OVIR Residence Registration</p>
              <p className="text-[#475569] text-xs mt-0.5">Within 3 business days of landing in Uzbekistan, the university registers the student's address with local migration authorities (OVIR) valid for 1 academic year.</p>
            </div>
          </div>
        </div>

        <DisclaimerBanner />
      </section>
    </div>
  );
}

export function NmcGuidelinesPage({ onOpenLeadModal }) {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="NMC Guidelines for MBBS Abroad 2026: FMGL Rules & NExT Exam"
        description="Comprehensive analysis of the National Medical Commission (NMC) Foreign Medical Graduate Licentiate regulations. Learn about 54 months coursework, 12 months internship, and NExT exam."
        canonicalUrl={`${siteConfig.siteUrl}/nmc-guidelines-for-mbbs-abroad`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-5.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#9B193A] text-white text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            Statutory Regulatory Breakdown
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            NMC FMGL 2021 Guidelines for MBBS Abroad: Compliance Guide for Indian Students
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Essential facts every Indian student and parent must understand before enrolling in any overseas medical college.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <h2 className="text-xl font-black text-[#063280]">The FMGL Gazette Notification (November 18, 2021)</h2>
          <p>
            Under the National Medical Commission (Foreign Medical Graduate Licentiate) Regulations, foreign medical degrees are recognized for practice in India only when they strictly comply with five non-negotiable legal criteria:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280]">1. Course Duration: Minimum 54 Months (4.5 Years)</span>
              <p className="text-[#475569] text-xs">The primary theoretical and clinical course must be minimum 54 months. Uzbekistan programs provide 60 months (5 academic years), fully exceeding this requirement.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280]">2. In-Country Internship: Minimum 12 Months (1 Year)</span>
              <p className="text-[#475569] text-xs">Internship must be completed in the same medical institution / teaching hospital in Uzbekistan prior to graduating.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280]">3. 100% English Medium</span>
              <p className="text-[#475569] text-xs">The entire instruction, laboratory experiments, and examinations must be in English.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280]">4. Foreign License to Practice</span>
              <p className="text-[#475569] text-xs">The candidate must be granted a license / registration to practice as a doctor in Uzbekistan with parity to domestic citizens.</p>
            </div>

            <div className="p-4 rounded-xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280]">5. Mandatory NEET-UG Qualification</span>
              <p className="text-[#475569] text-xs">NEET-UG qualification is legally mandatory before departing India.</p>
            </div>
          </div>
        </div>

        <DisclaimerBanner />
      </section>
    </div>
  );
}

export function GovtVsPrivatePage({ onOpenLeadModal }) {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Government vs Private Medical Universities in Uzbekistan 2026: Unbiased Comparison | MH GLOBAL EDUCATION CONSULTANT"
        description="Detailed comparison between Uzbekistan state government medical universities (TMA, SSMU, BSMI) and modern private colleges (CAU, EMU) on fees, infrastructure, and hospital beds."
        canonicalUrl={`${siteConfig.siteUrl}/government-vs-private-medical-universities-uzbekistan`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-6.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Unbiased Comparative Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Government vs Private Medical Universities in Uzbekistan
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Understand the real differences in tuition costs, hospital infrastructure, clinical bedside training, and academic legacy.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <h2 className="text-xl font-black text-[#063280]">Comprehensive Comparison Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-[#F7FAFC] text-[#063280] font-bold uppercase border-b border-[#D9E2EC]">
                  <th className="p-3.5 rounded-l-xl">Feature</th>
                  <th className="p-3.5 text-[#063280] bg-[#EBF3FA]">Government Universities (TMA, SSMU, BSMI)</th>
                  <th className="p-3.5 text-[#1558A9] bg-[#F7FAFC] rounded-r-xl">Private Universities (CAU, EMU)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E2EC] text-[#0F172A]">
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Annual Tuition Fee</td>
                  <td className="p-3.5 font-bold text-[#063280]">$3,200 – $3,900 USD (~₹2.7L – ₹3.3L/yr)</td>
                  <td className="p-3.5 font-bold text-[#1558A9]">$3,600 – $6,500 USD (~₹3.0L – ₹5.5L/yr)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Historical Legacy</td>
                  <td className="p-3.5 text-[#475569]">35 to 100+ years of medical tradition</td>
                  <td className="p-3.5 text-[#475569]">Founded recently (2019 – 2021)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Hospital Bed Capacity</td>
                  <td className="p-3.5 text-[#475569]">2,000 to 3,500+ government clinical beds</td>
                  <td className="p-3.5 text-[#475569]">1,000 to 1,500+ private tertiary beds</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Campus Infrastructure</td>
                  <td className="p-3.5 text-[#475569]">Historic, grand campuses with modernized labs</td>
                  <td className="p-3.5 text-[#475569]">Ultra-modern digital architecture & USMLE simulation labs</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">NMC & WHO Status</td>
                  <td className="p-3.5 text-[#475569]">100% WHO-WDOMS & NMC FMGL Compliant</td>
                  <td className="p-3.5 text-[#475569]">100% WHO-WDOMS & NMC FMGL Compliant</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#F7FAFC] p-6 rounded-3xl border border-[#D9E2EC] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#475569]">
            <p className="font-bold text-[#063280]">Need personalized counselling on which fits your budget?</p>
            <p>Our advisors help you choose based on your NEET score, financial plan, and career aspirations.</p>
          </div>
          <button
            onClick={() => onOpenLeadModal("Govt vs Private University Guidance")}
            className="px-5 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shrink-0 cursor-pointer border-b-2 border-[#9B193A]"
          >
            Get Free Guidance
          </button>
        </div>
      </section>
    </div>
  );
}
