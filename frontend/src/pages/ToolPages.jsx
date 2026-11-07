import React from "react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { ComparisonEngine } from "../components/tools/ComparisonEngine";
import { FeeCalculator } from "../components/tools/FeeCalculator";
import { EligibilityChecker } from "../components/tools/EligibilityChecker";
import {
  Scale,
  Calculator,
  CheckCircle2,
  ShieldCheck,
  FileCheck2,
  Award,
  GraduationCap,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import { siteConfig } from "../config/site";

export function CompareUniversitiesPage({ onOpenLeadModal }) {
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.siteUrl}/compare-universities#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Compare Universities",
        "item": `${siteConfig.siteUrl}/compare-universities`
      }
    ]
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Compare Uzbekistan Medical Universities: Fees & Rankings 2026"
        description="Compare Tashkent Medical Academy, Samarkand State Medical University, Bukhara State Medical Institute and more on tuition fees, hospital bed count, and NMC compliance."
        canonicalUrl={`${siteConfig.siteUrl}/compare-universities`}
        schema={breadcrumbSchema}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-7.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Scale className="w-3.5 h-3.5" />
            Decision Engine
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Compare Medical Universities in Uzbekistan: Fees, Beds & Hostels
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Select up to 4 institutions to compare official annual fees, clinical beds, Indian mess availability, and NMC recognition side-by-side.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ComparisonEngine onOpenLeadModal={onOpenLeadModal} />
      </section>
    </div>
  );
}

export function FeeCalculatorPage({ onOpenLeadModal }) {
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.siteUrl}/mbbs-fee-calculator#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "MBBS Fee Calculator",
        "item": `${siteConfig.siteUrl}/mbbs-fee-calculator`
      }
    ]
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="MBBS in Uzbekistan Fee Calculator 2026: Real Cost in INR"
        description="Calculate complete 6-year expenses for studying MBBS in Uzbekistan. Includes tuition fees, hostel, Indian mess, visa extensions, and flight allowances in INR & USD."
        canonicalUrl={`${siteConfig.siteUrl}/mbbs-fee-calculator`}
        schema={breadcrumbSchema}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-6.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Calculator className="w-3.5 h-3.5" />
            Financial Transparency
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Uzbekistan MBBS Fee Calculator: Estimate Your 6-Year Total Budget in INR & USD
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Interactive, itemized estimation of tuition, hostel, Indian food, travel, and visa expenses with zero hidden agency costs.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeeCalculator onOpenLeadModal={onOpenLeadModal} />
      </section>
    </div>
  );
}

export function EligibilityCheckerPage({ onOpenLeadModal }) {
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${siteConfig.siteUrl}/mbbs-eligibility#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteConfig.siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "NEET Eligibility Checker",
        "item": `${siteConfig.siteUrl}/mbbs-eligibility`
      }
    ]
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="NEET Eligibility Checker for MBBS Abroad 2026"
        description="Verify your eligibility for MBBS admission in Uzbekistan instantly. Evaluates 12th PCB marks (50% Gen / 40% Reserved), age, and NEET-UG qualification rules."
        canonicalUrl={`${siteConfig.siteUrl}/mbbs-eligibility`}
        schema={breadcrumbSchema}
      />

      {/* High-Impact Visual Banner (Text removed, Full-height imagery display) */}
      <section className="relative overflow-hidden w-full h-[320px] sm:h-[440px] md:h-[560px] lg:h-[660px] xl:h-[740px] 2xl:h-[820px] border-b border-slate-200 shadow-xs bg-slate-900">
        <BannerBackground
          image="/collageimages/banner-1.png"
          opacity="opacity-100"
          mixBlend="mix-blend-normal"
          imgClassName="object-cover object-center"
          washGradient="from-transparent via-transparent to-black/10"
        />
        {/* Preserved for SEO and screen-reader accessibility */}
        <h1 className="sr-only">
          MBBS in Uzbekistan Eligibility Checker: NEET & 12th PCB Score Validator
        </h1>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-10">
        <EligibilityChecker onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* How Does the Eligibility Checker Work Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-[#D9E2EC] p-6 sm:p-10 lg:p-12 space-y-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider border border-[#D9E2EC]">
              <ShieldCheck className="w-4 h-4 text-[#063280]" />
              Evaluation Process & Regulatory Standards
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#082B57] tracking-tight">
              How Does the MBBS Eligibility Checker Work?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our automated evaluation engine validates your academic credentials in real-time against the National Medical Commission (NMC FMGL 2021) gazette and Uzbekistan government university admission criteria.
            </p>
          </div>

          {/* 4-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#063280] text-white font-black text-sm flex items-center justify-center shadow-xs">
                    01
                  </span>
                  <FileCheck2 className="w-5 h-5 text-[#0752B8]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B57] mb-2">
                  Academic Profile Input
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  You enter your 10+2 marks in Physics, Chemistry, and Biology (out of 100), select your category quota, and provide your date of birth.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-bold text-[#0752B8] uppercase tracking-wide">
                  Calculates Aggregate PCB %
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#063280] text-white font-black text-sm flex items-center justify-center shadow-xs">
                    02
                  </span>
                  <Scale className="w-5 h-5 text-[#0752B8]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B57] mb-2">
                  Category & Cutoff Check
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  The algorithm cross-references your aggregate score against statutory cutoffs: 50% for General / EWS and 40% for OBC, SC, and ST candidates.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-bold text-[#0752B8] uppercase tracking-wide">
                  NMC 50% / 40% Quota Rule
                </span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#063280] text-white font-black text-sm flex items-center justify-center shadow-xs">
                    03
                  </span>
                  <Award className="w-5 h-5 text-[#0752B8]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B57] mb-2">
                  NEET & Age Verification
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Validates your age (must turn 17 by December 31, 2026), confirms English subject pass, and checks NEET-UG qualification (valid for 3 years abroad).
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-bold text-[#0752B8] uppercase tracking-wide">
                  Min 17 Yrs & NEET Status
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200/90 relative hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-9 h-9 rounded-xl bg-[#063280] text-white font-black text-sm flex items-center justify-center shadow-xs">
                    04
                  </span>
                  <GraduationCap className="w-5 h-5 text-[#0752B8]" />
                </div>
                <h3 className="text-lg font-bold text-[#082B57] mb-2">
                  Instant Verdict & Advice
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  Generates an immediate qualification verdict below the form, stores your criteria for university matching, and connects you with a dedicated advisor.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-bold text-[#0752B8] uppercase tracking-wide">
                  Personalized College Match
                </span>
              </div>
            </div>
          </div>

          {/* Detailed Criteria Matrix & Advisory CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            {/* Criteria Quick Reference */}
            <div className="lg:col-span-2 bg-[#EBF3FB] rounded-2xl p-6 sm:p-8 border border-blue-200/80 space-y-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0752B8]" />
                <h3 className="text-base sm:text-lg font-bold text-[#082B57]">
                  Key Eligibility Benchmarks for MBBS in Uzbekistan 2026
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-start gap-2.5 bg-white/90 p-3.5 rounded-xl border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-[#0752B8] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#082B57] block">12th PCB Aggregate:</strong>
                    <span className="text-slate-600">50% marks for General/EWS; 40% for OBC/SC/ST candidates.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/90 p-3.5 rounded-xl border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-[#0752B8] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#082B57] block">Minimum Age:</strong>
                    <span className="text-slate-600">At least 17 years completed on or before Dec 31, 2026.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/90 p-3.5 rounded-xl border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-[#0752B8] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#082B57] block">NEET-UG Qualification:</strong>
                    <span className="text-slate-600">Mandatory for Indian citizenship; scorecard valid for 3 academic sessions.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 bg-white/90 p-3.5 rounded-xl border border-blue-100">
                  <span className="w-2 h-2 rounded-full bg-[#0752B8] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#082B57] block">Passport Readiness:</strong>
                    <span className="text-slate-600">Optional for checking eligibility; required prior to visa filing and departure.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-gradient-to-br from-[#063280] to-[#0E438D] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-4 shadow-sm">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-blue-200 text-xs font-semibold">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-300" />
                  Have Special Case Concerns?
                </span>
                <h4 className="text-lg font-bold text-white">
                  Need a One-on-One Eligibility Review?
                </h4>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Borderline PCB score, compartment result, or gap years? Our senior admission counselors verify university-specific relaxation policies.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onOpenLeadModal?.("Eligibility Checker How It Works CTA")}
                className="w-full py-3 px-4 rounded-xl bg-[#D90436] hover:bg-[#B8032D] text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <span>Talk to an Expert Counselor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
