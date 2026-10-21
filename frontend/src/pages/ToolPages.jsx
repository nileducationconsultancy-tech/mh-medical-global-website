import React from "react";
import SEOHead from "../components/common/SEOHead";
import { ComparisonEngine } from "../components/tools/ComparisonEngine";
import { FeeCalculator } from "../components/tools/FeeCalculator";
import { EligibilityChecker } from "../components/tools/EligibilityChecker";
import { Scale, Calculator, CheckCircle2 } from "lucide-react";
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

      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
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

      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
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

      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            NMC Rule Validator
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            MBBS in Uzbekistan Eligibility Checker: NEET & 12th PCB Score Validator
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Instant rule-based eligibility evaluation for Indian medical aspirants under NMC FMGL 2021 gazette notifications.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EligibilityChecker onOpenLeadModal={onOpenLeadModal} />
      </section>
    </div>
  );
}
