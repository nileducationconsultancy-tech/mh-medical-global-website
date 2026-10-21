import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Calculator,
  CheckCircle2,
  Scale,
  Sparkles,
  Plane,
  Building2,
  Users,
  Award,
  ArrowRight,
  Clock,
  MapPin,
  Utensils,
  BookOpen,
  DollarSign,
  ChevronRight,
  Star,
  Quote,
  PhoneCall
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import { universitiesData, USD_TO_INR_RATE } from "../data/universitiesData";
import { FeeCalculator } from "../components/tools/FeeCalculator";
import { EligibilityChecker } from "../components/tools/EligibilityChecker";
import { CountryComparisonSection } from "../components/home/CountryComparisonSection";
import { FounderSection, StudentTestimonials } from "../components/home/FounderSection";
import { faqsData } from "../data/faqsData";
import { siteConfig } from "../config/site";

export function HomePage({ onOpenLeadModal }) {
  const [activeTab, setActiveTab] = useState("calculator"); // "calculator" or "eligibility"
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const featuredUnis = universitiesData.filter((u) => u.featured && !u.isDraft);

  const formatLakhs = (usdVal) => {
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    return `₹${(inrVal / 100000).toFixed(2)}L`;
  };

  const visibleFaqs = faqsData[0].questions.concat(faqsData[1].questions).slice(0, 5);

  const homeSchema = [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      "name": siteConfig.brandName,
      "url": siteConfig.siteUrl,
      "logo": `${siteConfig.siteUrl}/mh-medical-logo.webp`,
      "description": "Premier international medical education platform and verified admission consultancy for MBBS in Uzbekistan for Indian students.",
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
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
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/#faq`,
      "mainEntity": visibleFaqs.map((f) => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      <SEOHead
        title="MBBS in Uzbekistan for Indian Students 2026: Fees & Colleges"
        description="Study MBBS in Uzbekistan at NMC-compliant government medical universities. 100% English medium, 6-year budget from ₹20 Lakhs total. Calculate your fees now!"
        canonicalUrl={siteConfig.siteUrl}
        schema={homeSchema}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white pt-12 pb-20 sm:pb-28 border-b border-[#0B2D64]">
        <div className="absolute inset-0 bg-pattern-grid opacity-10 pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#9ABAD9]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#9B193A]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#9ABAD9]/30 text-[#9ABAD9] text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4 text-white" />
                <span>NMC FMGL 2021 & WHO-WDOMS Compliant Medical Education</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15]">
                Study MBBS in Uzbekistan: <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#9ABAD9] to-white">
                  Transparent Fees & Verified Government Universities
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Explore government-recognized medical academies, calculate verified 6-year fees in INR/USD, check instant NEET eligibility, and get direct admission support from senior medical advisors.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/mbbs-eligibility"
                  className="px-6 py-3.5 rounded-xl bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold text-sm sm:text-base transition-all duration-200 shadow-lg hover:shadow-rose-950/25 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  Check Your Eligibility
                </Link>

                <Link
                  to="/universities/uzbekistan"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/25 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Building2 className="w-5 h-5 text-[#9ABAD9]" />
                  Explore Universities
                </Link>

                <button
                  onClick={() => onOpenLeadModal("Hero Quick Counselling")}
                  className="px-5 py-3.5 rounded-xl text-[#9ABAD9] hover:text-white text-sm font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  Talk to Counsellor <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-white/15 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <p className="text-2xl font-black text-white">6 Years</p>
                  <p className="text-xs text-[#9ABAD9]">NMC FMGL 5+1 Format</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-[#9ABAD9]">English Medium</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">₹20L – ₹26L</p>
                  <p className="text-xs text-[#9ABAD9]">Total 6-Yr Budget</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image / Quick Card (5 Cols) */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-bold text-lg text-white">
                      UZ
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-white">Uzbekistan MBBS Intake 2026</h3>
                      <p className="text-xs text-[#9ABAD9]">Admissions Open • Indian Aspirants</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Verified
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-200">
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Average Annual Tuition:</span>
                    <span className="font-bold text-white">$3,200 – $3,900 USD (~₹2.7L – ₹3.3L)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Hostel & Indian Mess:</span>
                    <span className="font-bold text-white">$1,500 – $1,800 USD / Year</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">NEET Requirement:</span>
                    <span className="font-bold text-emerald-300">Mandatory (Qualified Score)</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Degree Recognition:</span>
                    <span className="font-bold text-white">NMC, WHO, WDOMS, FAIMER</span>
                  </div>
                  <div className="flex justify-between items-center py-1.5">
                    <span className="text-slate-300">Flight Time from Delhi:</span>
                    <span className="font-bold text-white">3.5 Hours Direct Flight</span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenLeadModal("Hero Card Quick Assessment")}
                  className="w-full py-3.5 bg-white text-[#063280] hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-xl transition-colors shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Get Free Admission Brochure & Seat Matrix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY STUDY MBBS IN UZBEKISTAN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Why Indian Students Choose Uzbekistan
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#063280]">
            International Standard Medical Education at 1/4th the Cost
          </h2>
          <p className="text-[#475569] text-sm sm:text-base leading-relaxed">
            Uzbekistan combines world-class clinical hospital infrastructure with affordable living, rigorous European curriculum standards, and strict adherence to India’s NMC guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">100% NMC FMGL 2021 Compliant</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Full 54-month theoretical and clinical coursework plus mandatory 12-month clinical internship in the same teaching hospital complex. Fully eligible for NExT / FMGE in India.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#1558A9] flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">100% English-Medium Faculty</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Lectures, laboratory practicals, clinical case discussions, and final examinations are conducted strictly in English with dedicated international faculty. Basic local language is taught in early years for hospital patient interaction.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">Massive Hospital Bed Exposure</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Uzbekistan state universities operate 2,000 to 3,500+ clinical beds across affiliated tertiary research centers, ensuring rich hands-on patient bedside training.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#9B193A] flex items-center justify-center font-bold">
              <Utensils className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">Authentic Indian Mess On-Campus</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Dedicated Indian dining facilities managed by Indian cooks serving fresh breakfast, lunch, and dinner (North & South Indian cuisines with pure vegetarian & halal non-veg options).
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs card-hover-effect space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#1558A9] flex items-center justify-center font-bold">
              <Plane className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">Direct 3.5-Hour Flight from Delhi</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              Direct international flights connect New Delhi to Tashkent multiple times a week via Uzbekistan Airways and IndiGo, making travel convenient for students and visiting parents.
            </p>
          </div>

          <div className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs card-hover-effect space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#063280]">Safe, Secular & Friendly Society</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              High public safety index, secure hostels with 24/7 CCTV surveillance and biometric entry, and over 10,000+ Indian students creating a supportive brotherhood.
            </p>
          </div>
        </div>
      </section>

      {/* 3. GLOBAL COUNTRY COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CountryComparisonSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 4. FEATURED UNIVERSITIES DIRECTORY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Government & Recognized Institutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280] mt-2">
              Top NMC-Recognized Medical Universities in Uzbekistan
            </h2>
          </div>
          <Link
            to="/universities/uzbekistan"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#063280] hover:text-[#1558A9] hover:underline"
          >
            <span>View All Universities Directory</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredUnis.map((uni) => (
            <div
              key={uni.id}
              className="bg-white rounded-3xl border border-[#D9E2EC] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={uni.campusImage}
                    alt={`${uni.name} Campus`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#063280] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {uni.type} University
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#063280] text-[11px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{uni.rating}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#063280] line-clamp-1">{uni.name}</h3>
                    <p className="text-xs text-[#475569] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1558A9]" />
                      <span>{uni.city}, Uzbekistan • Est. {uni.establishedYear}</span>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#F7FAFC] p-2.5 rounded-xl border border-[#D9E2EC]">
                      <p className="text-[10px] text-[#475569] font-medium">Annual Tuition</p>
                      <p className="font-bold text-[#063280]">${(uni.fees?.annualTuitionUSD || 0).toLocaleString()}</p>
                      <p className="text-[10px] text-[#1558A9] font-semibold">~{formatLakhs(uni.fees?.annualTuitionUSD || 0)}/yr</p>
                    </div>

                    <div className="bg-[#F7FAFC] p-2.5 rounded-xl border border-[#D9E2EC]">
                      <p className="text-[10px] text-[#475569] font-medium">Clinical Exposure</p>
                      <p className="font-bold text-[#063280]">
                        {uni.quickHighlights?.find((h) => h.label.includes("Beds"))?.value || "3,000+ Beds"}
                      </p>
                      <p className="text-[10px] text-[#475569] font-medium truncate">
                        {uni.affiliationRecognition?.universityType || "State Teaching Base"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#475569]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1558A9] shrink-0" />
                      <span>
                        {uni.quickHighlights?.find((h) => h.label.includes("Duration"))?.value || "6 Years (54m Course + 12m Internship)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1558A9] shrink-0" />
                      <span>
                        {uni.quickHighlights?.find((h) => h.label.includes("Mess"))?.value ? "Indian Mess (Veg & Non-Veg 3 Meals)" : "100% English Medium Faculty"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-2">
                <Link
                  to={`/universities/uzbekistan/${uni.slug}`}
                  className="w-full block text-center py-2.5 px-4 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
                >
                  View University & Fee Breakdown
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. INTERACTIVE HUB TABS (FEE CALCULATOR + ELIGIBILITY CHECKER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Budget Planning & Assessment
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            MBBS in Uzbekistan Fees for Indian Students
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm">
            Calculate itemized 6-year tuition, hostel, and Indian mess expenses in INR and USD, or check your NEET eligibility instantly.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#EBF3FA] p-1.5 rounded-2xl border border-[#D9E2EC] shadow-xs">
            <button
              onClick={() => setActiveTab("calculator")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "calculator"
                  ? "bg-[#063280] text-white shadow-md"
                  : "text-[#063280] hover:text-[#1558A9]"
              }`}
            >
              <Calculator className="w-4 h-4 text-[#9ABAD9]" />
              <span>6-Year Fee Calculator</span>
            </button>

            <button
              onClick={() => setActiveTab("eligibility")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === "eligibility"
                  ? "bg-[#063280] text-white shadow-md"
                  : "text-[#063280] hover:text-[#1558A9]"
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#9ABAD9]" />
              <span>Live Eligibility Checker</span>
            </button>
          </div>
        </div>

        {activeTab === "calculator" ? (
          <FeeCalculator onOpenLeadModal={onOpenLeadModal} />
        ) : (
          <EligibilityChecker onOpenLeadModal={onOpenLeadModal} />
        )}
      </section>

      {/* 6. FOUNDER'S PLEDGE & TRANSPARENCY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FounderSection onOpenLeadModal={onOpenLeadModal} />
      </section>

      {/* 7. REAL STUDENT EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StudentTestimonials />
      </section>

      {/* 8. 9-STEP ADMISSION ROADMAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] rounded-3xl p-8 sm:p-12 text-white text-center space-y-10 shadow-xl relative overflow-hidden border border-[#9ABAD9]/20">
          <div className="space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-white bg-[#9B193A] px-3.5 py-1 rounded-full">
              Hassle-Free Pathway
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              9-Step Admission Roadmap for Indian Students
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm">
              From free eligibility verification to student hostel arrival in Tashkent — our step-by-step guidance guarantees peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
            <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-[#9ABAD9]">Step 01</span>
              <h4 className="font-bold text-sm text-white">Free Counselling</h4>
              <p className="text-[11px] text-slate-200">Evaluate universities, fee budgets, and NMC requirements with a senior advisor.</p>
            </div>

            <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-[#9ABAD9]">Step 02</span>
              <h4 className="font-bold text-sm text-white">Document Verification</h4>
              <p className="text-[11px] text-slate-200">Verification of 10th/12th marksheets, NEET score, and passport validity.</p>
            </div>

            <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-[#9ABAD9]">Step 03</span>
              <h4 className="font-bold text-sm text-white">University Offer Letter</h4>
              <p className="text-[11px] text-slate-200">Formal admission letter issued by the Uzbekistan Medical University.</p>
            </div>

            <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-[#9ABAD9]">Step 04</span>
              <h4 className="font-bold text-sm text-white">Ministry Visa Teletex</h4>
              <p className="text-[11px] text-slate-200">Ministry of Foreign Affairs issues official student visa invitation code.</p>
            </div>

            <div className="bg-white/10 border border-white/15 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-[#9ABAD9]">Step 05</span>
              <h4 className="font-bold text-sm text-white">Hostel Check-in</h4>
              <p className="text-[11px] text-slate-200">Airport reception, hostel allotment, Indian mess onboarding, and orientation.</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/mbbs-admission-uzbekistan"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#063280] font-extrabold text-xs sm:text-sm transition-all shadow-md"
            >
              <span>Explore Detailed Step-by-Step Admission Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. VERIFIED FAQS SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Answers to Important MBBS Abroad Questions
          </h2>
          <p className="text-[#475569] text-sm">
            Everything students and parents need to know regarding NMC compliance, fees, safety, and student visas.
          </p>
        </div>

        <div className="space-y-3">
          {visibleFaqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0F172A] hover:text-[#063280] transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-[#063280] text-lg font-black shrink-0">
                  {openFaqIndex === i ? "−" : "+"}
                </span>
              </button>
              {openFaqIndex === i && (
                <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-[#D9E2EC] bg-[#F7FAFC]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
