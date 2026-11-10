import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Calculator,
  CheckCircle2,
  Sparkles,
  Calendar
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import {
  universitiesData,
  USD_TO_INR_RATE,
  EXCHANGE_RATE_DATE,
  CANONICAL_PRICING_SUMMARY,
  formatLakhs
} from "../data/universitiesData";
import { HeroBanner } from "../components/home/HeroBanner";
import { TrustBar } from "../components/home/TrustBar";
import { KeyFactsBox } from "../components/home/KeyFactsBox";
import { HeroQuickForm } from "../components/home/HeroQuickForm";
import { WhyUzbekistanSection } from "../components/home/WhyUzbekistanSection";
import { CountryComparisonSection } from "../components/home/CountryComparisonSection";
import { UniversityCardsSection } from "../components/home/UniversityCardsSection";
import { FeeCalculator } from "../components/tools/FeeCalculator";
import { EligibilityChecker } from "../components/tools/EligibilityChecker";
import { DelhiToTashkentRouteCard } from "../components/home/DelhiToTashkentRouteCard";
import { IndianMessHostelSection } from "../components/home/IndianMessHostelSection";
import { StudentLifeGallery } from "../components/home/StudentLifeGallery";
import { ParentsConcernsBlock } from "../components/home/ParentsConcernsBlock";
import { FounderSection, StudentTestimonials } from "../components/home/FounderSection";
import { AdmissionsRoadmapTimeline } from "../components/home/AdmissionsRoadmapTimeline";
import { VerificationMethodologyModal } from "../components/common/VerificationMethodologyModal";
import { StickyMobileBottomBar } from "../components/home/StickyMobileBottomBar";
import { faqsData, getAllFaqs } from "../data/faqsData";
import { siteConfig } from "../config/site";
import { i18nHomepage } from "../data/i18nHomepage";
import { track } from "../utils/analytics";

export function HomePage({ onOpenLeadModal }) {
  const [lang, setLang] = useState("en"); // "en" or "hi"
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  useEffect(() => {
    const handleLang = (e) => {
      if (e.detail) setLang(e.detail);
    };
    window.addEventListener("lang_change", handleLang);
    return () => window.removeEventListener("lang_change", handleLang);
  }, []);

  const t = i18nHomepage[lang] || i18nHomepage.en;
  const allQuestions = getAllFaqs();

  // JSON-LD Schemas for Top-1% Technical SEO & Generative Engine Optimization
  const homeSchema = [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      "name": siteConfig.brandName,
      "legalName": siteConfig.legalName,
      "url": siteConfig.siteUrl,
      "logo": `${siteConfig.siteUrl}/mh-medical-logo.webp`,
      "description": "Premier international medical education platform and verified admission advisory network for Indian students pursuing MBBS in Uzbekistan.",
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "sameAs": [
        siteConfig.social.facebook,
        siteConfig.social.instagram,
        siteConfig.social.youtube,
        siteConfig.social.linkedin
      ].filter((s) => s && s.startsWith("http")),
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.indiaOffice.streetAddress,
        "addressLocality": siteConfig.indiaOffice.addressLocality,
        "addressRegion": siteConfig.indiaOffice.addressRegion,
        "postalCode": siteConfig.indiaOffice.postalCode,
        "addressCountry": siteConfig.indiaOffice.addressCountry
      }
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.siteUrl}/#website`,
      "url": siteConfig.siteUrl,
      "name": siteConfig.brandName,
      "description": siteConfig.tagline,
      "publisher": {
        "@id": `${siteConfig.siteUrl}/#organization`
      }
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/#founder`,
      "name": siteConfig.founder.name,
      "jobTitle": `${siteConfig.founder.title} ${siteConfig.founder.qualifications || ""}`.trim(),
      "image": `${siteConfig.siteUrl}${siteConfig.founder.photoUrl}`,
      "worksFor": {
        "@id": `${siteConfig.siteUrl}/#organization`
      },
      "description": "Senior MBBS admission advisor with 12+ years experience facilitating NMC-compliant medical admissions for Indian students in Uzbekistan."
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.siteUrl}/#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.siteUrl
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      "mainEntity": allQuestions.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    },
    ...universitiesData.slice(0, 5).map((u) => ({
      "@type": "CollegeOrUniversity",
      "@id": `${siteConfig.siteUrl}/universities/uzbekistan/${u.slug}/#college`,
      "name": u.name,
      "alternateName": u.officialName,
      "url": `${siteConfig.siteUrl}/universities/uzbekistan/${u.slug}`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": u.city,
        "addressCountry": "UZ"
      }
    }))
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-24 font-sans text-slate-800">
      <SEOHead
        title="MBBS in Uzbekistan for Indian Students 2026: Fees & Colleges"
        description="Study MBBS in Uzbekistan at NMC-compliant government medical universities. 100% English medium, 6-year fees from ₹15.2 Lakhs. Calculate verified costs now!"
        canonicalUrl={siteConfig.siteUrl}
        schema={homeSchema}
      />

      {/* 1. HERO BANNER — MAIN VISUAL SECTION */}
      <HeroBanner onOpenLeadModal={onOpenLeadModal} />

      {/* 2. REGULATORY & INSTITUTIONAL STATISTICS TRUST BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12 relative z-20">
        <TrustBar />
      </section>

      {/* 3. KEY FACTS SUMMARY BOX (Quotable Metrics for AI Engines & Parents) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <KeyFactsBox />
      </section>

      {/* 4. WHY STUDY MBBS IN UZBEKISTAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <WhyUzbekistanSection />
      </section>

      {/* 5. GLOBAL COUNTRY COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CountryComparisonSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 6. VERIFIED UNIVERSITIES DIRECTORY & MULTI-COLLEGE COMPARE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <UniversityCardsSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 7. DEDICATED 6-YEAR FEE CALCULATOR (HERO FEATURE OF FEES SECTION) */}
      <section id="fee-calculator-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <FeeCalculator onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 8. DEDICATED LIVE ELIGIBILITY CHECKER (STANDALONE SECTION) */}
      <section id="eligibility-checker-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            NMC Eligibility Evaluation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Check Your NEET & 10+2 MBBS Eligibility Instantly
          </h2>
          <p className="text-xs sm:text-sm text-[#475569]">
            Verify compliance with National Medical Commission norms (50% PCB for General, 40% for OBC/SC/ST, minimum 17 years age, and NEET-UG qualification).
          </p>
        </div>

        <EligibilityChecker onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 9. DELHI TO TASHKENT TRAVEL & AIRLINE ROUTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DelhiToTashkentRouteCard onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 10. INDIAN MESS & MODERN HOSTEL LIVING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IndianMessHostelSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 11. STUDENT LIFE & CAMPUS GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentLifeGallery />
      </section>

      {/* 12. PARENTS' CONCERNS BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParentsConcernsBlock />
      </section>

      {/* 13. FOUNDER'S TRANSPARENCY PLEDGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FounderSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 14. VERIFIED STUDENT EXPERIENCES & FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentTestimonials />
      </section>

      {/* 15. 9-STEP ADMISSION ROADMAP TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AdmissionsRoadmapTimeline onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 16. EXPANDED FAQS (ALL ANSWERS IN DOM FOR SEARCH ENGINES & CRAWLERS) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Frequently Asked Questions by Indian Students & Parents
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm">
            Everything you need to know about NMC Foreign Medical Graduate Licentiate regulations, fees, safety, and student visas in Uzbekistan.
          </p>
        </div>

        <div className="space-y-3">
          {allQuestions.map((faq, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={faq.q}
                className="bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden shadow-xs transition-all"
              >
                <button
                  type="button"
                  id={`faq-btn-${i}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#063280] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#063280] text-xl font-black shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-[#EBF3FA]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Always kept in the DOM for crawlers with smooth visual accordion toggle */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#D9E2EC] bg-[#F7FAFC]">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 17. FINAL ADMISSIONS INTAKE / QUICK APPLICATION FORM (JUST ABOVE FOOTER) */}
      <section id="admissions-inquiry-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-b from-[#0B0F19] via-[#0F172A] to-[#0B0F19] rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <BannerBackground
            image="/collageimages/banner-2.png"
            opacity="opacity-15 sm:opacity-20"
            mixBlend="mix-blend-normal"
            washGradient="from-[#0B0F19]/90 via-[#0F172A]/85 to-[#0B0F19]/95"
          />
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8 relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-300 bg-rose-950/40 border border-rose-500/30 px-3.5 py-1 rounded-full">
              Admissions Intake 2026-27
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Apply for MBBS in Uzbekistan with Direct Support
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Get direct university eligibility, verified 6-year fee breakdowns, and personal guidance from senior counselors.
            </p>
          </div>

          <div className="relative z-10 max-w-xl mx-auto">
            <HeroQuickForm onOpenLeadModal={onOpenLeadModal} />
          </div>
        </div>
      </section>

      {/* Floating Verification Methodology Modal */}
      <VerificationMethodologyModal
        isOpen={isVerifyModalOpen}
        onClose={() => setIsVerifyModalOpen(false)}
      />

      {/* Sticky Mobile Bottom Bar (Call | WhatsApp | Check Eligibility) */}
      <StickyMobileBottomBar onOpenLeadModal={onOpenLeadModal} />
    </div>
  );
}

export default HomePage;
