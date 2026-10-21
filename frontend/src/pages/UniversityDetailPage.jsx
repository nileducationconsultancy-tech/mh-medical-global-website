import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  Calendar,
  CheckCircle2,
  Circle,
  Calculator,
  ShieldCheck,
  Star,
  Award,
  Phone,
  Mail,
  ExternalLink,
  Users,
  Utensils,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Clock,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  FileCheck2,
  Plane,
  HeartHandshake
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import { getUniversityBySlug, USD_TO_INR_RATE } from "../data/universitiesData";
import { DisclaimerBanner } from "../components/common/SourceBadge";
import { siteConfig } from "../config/site";
import { track } from "../utils/analytics";

export function UniversityDetailPage({ onOpenLeadModal }) {
  const { slug } = useParams();
  const uni = getUniversityBySlug(slug);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Interactive Checklist State
  const [checkedDocs, setCheckedDocs] = useState({});

  useEffect(() => {
    if (uni) {
      const storageKey = `doc_check_${uni.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        try {
          setCheckedDocs(JSON.parse(saved));
        } catch {
          setCheckedDocs({});
        }
      }
    }
  }, [uni]);

  const handleToggleDoc = (docIndex) => {
    if (!uni) return;
    const storageKey = `doc_check_${uni.id}`;
    const updated = { ...checkedDocs, [docIndex]: !checkedDocs[docIndex] };
    setCheckedDocs(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  if (!uni) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <Building2 className="w-16 h-16 text-[#9ABAD9] mx-auto" />
        <h2 className="text-2xl font-black text-[#063280]">University Not Found</h2>
        <p className="text-sm text-[#475569]">
          The requested medical university profile does not exist or has been moved.
        </p>
        <Link
          to="/universities/uzbekistan"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#063280] text-white font-bold rounded-xl text-xs"
        >
          Browse All Universities
        </Link>
      </div>
    );
  }

  const formatAmount = (usdVal) => {
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    return {
      usd: `$${usdVal.toLocaleString()}`,
      inr: `₹${inrVal.toLocaleString("en-IN")}`
    };
  };

  // Structured JSON-LD Schema: CollegeOrUniversity + FAQPage
  const faqSchemaEntities = uni.faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));

  const universityFullSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollegeOrUniversity",
        "name": uni.name,
        "alternateName": uni.officialName,
        "url": uni.website,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": uni.city,
          "addressCountry": "Uzbekistan"
        },
        "description": uni.about.content
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqSchemaEntities
      },
      {
        "@type": "BreadcrumbList",
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
            "name": "Universities",
            "item": `${siteConfig.siteUrl}/universities/uzbekistan`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Uzbekistan",
            "item": `${siteConfig.siteUrl}/universities/uzbekistan`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": uni.name,
            "item": `${siteConfig.siteUrl}/universities/uzbekistan/${uni.slug}`
          }
        ]
      }
    ]
  };

  let pageTitle = `MBBS at ${uni.name}, Uzbekistan | Fees & Admission 2026`;
  let pageH1 = `${uni.name}: MBBS Fees, Admission & Hostels for Indian Students`;

  if (uni.slug === "tashkent-medical-academy") {
    pageTitle = "Tashkent Medical Academy Fees 2026: MBBS Admission in TMA";
    pageH1 = "Tashkent Medical Academy (TMA): MBBS Fees, Admission & Hostels for Indian Students";
  } else if (uni.slug === "samarkand-state-medical-university") {
    pageTitle = "Samarkand State Medical University MBBS Fees & Admission";
    pageH1 = "Samarkand State Medical University: 2026 Fees, Eligibility & Admission Guide";
  }

  const comparisonUnis = (uni.comparisonSlugs || [])
    .map((cSlug) => getUniversityBySlug(cSlug))
    .filter(Boolean);

  const defaultMessage = encodeURIComponent(
    `Hello MH GLOBAL EDUCATION CONSULTANT, I want admission counselling for ${uni.name}, Uzbekistan.`
  );
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMessage}`;

  return (
    <div className="space-y-16 pb-24 font-sans selection:bg-[#063280] selection:text-white">
      <SEOHead
        title={pageTitle}
        description={`Explore ${uni.name} in Uzbekistan. Check MBBS fees, eligibility, syllabus, hostel, admission process and guidance for Indian students.`}
        canonicalUrl={`${siteConfig.siteUrl}/universities/uzbekistan/${uni.slug}`}
        robots={uni.noindex ? "noindex, nofollow" : "index, follow"}
        schema={universityFullSchema}
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Draft Notice if applicable */}
          {uni.isDraft && (
            <div className="bg-amber-500/20 border border-amber-300/40 p-4 rounded-2xl text-amber-200 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-300 shrink-0" />
              <span>
                <strong>Draft Profile (Pending Verification):</strong> {uni.verificationNote || "Data on this institution is currently in draft format and excluded from search engines pending official 2026 notices."}
              </span>
            </div>
          )}

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-xs text-slate-200 flex flex-wrap items-center gap-2">
            <Link to="/" className="hover:text-[#9ABAD9] transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/universities/uzbekistan" className="hover:text-[#9ABAD9] transition-colors">Universities</Link>
            <span>&gt;</span>
            <Link to="/universities/uzbekistan" className="hover:text-[#9ABAD9] transition-colors">Uzbekistan</Link>
            <span>&gt;</span>
            <span className="text-[#9ABAD9] font-bold truncate">{uni.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${
                  uni.type === "Government" ? "bg-[#063280] border border-white/20" : "bg-[#1558A9] border border-white/20"
                }`}>
                  {uni.type} Medical University
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-[#9ABAD9] flex items-center gap-1 border border-white/15">
                  <MapPin className="w-3.5 h-3.5" />
                  {uni.city}, Uzbekistan
                </span>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/15">
                  Est. {uni.establishedYear}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                {pageH1}
              </h1>

              <p className="text-[#9ABAD9] font-semibold text-base sm:text-lg">
                Study Medicine in Uzbekistan • {uni.officialName}
              </p>

              <p className="text-slate-200 text-xs sm:text-sm max-w-3xl leading-relaxed">
                {uni.hero.description}
              </p>

              {/* Primary & Secondary Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  to="/mbbs-eligibility"
                  className="px-6 py-3.5 bg-[#9B193A] hover:bg-[#7E142F] text-white font-black rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Check Eligibility
                </Link>

                <button
                  onClick={() => onOpenLeadModal(`Free Counselling for ${uni.name}`)}
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs sm:text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#9ABAD9]" />
                  Get Free Counselling
                </button>

                <a
                  href="#fee-structure"
                  className="px-5 py-3.5 text-[#9ABAD9] hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" />
                  View Fee Structure
                </a>
              </div>
            </div>

            {/* University Hero Image Card */}
            <div className="lg:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <img
                  src={uni.coverImage}
                  alt={`${uni.name} Campus in ${uni.city}, Uzbekistan`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <p className="font-extrabold text-sm">{uni.name}</p>
                  <p className="text-[#9ABAD9] text-[11px]">{uni.city}, Uzbekistan • 6-Year MD Physician</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* ========================================================================= */}
        {/* 2. ABOUT */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Institutional Profile
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              About {uni.name}
            </h2>
          </div>

          <div className="text-xs sm:text-sm text-[#0F172A] leading-relaxed space-y-3">
            <p>{uni.about.content}</p>
            <p><strong>History & Legacy:</strong> {uni.about.history}</p>
            <p><strong>Campus Location:</strong> {uni.about.location}</p>
          </div>

          <div className="pt-4 border-t border-[#D9E2EC] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#475569]">
            <div className="flex items-center gap-1.5 font-medium text-[#063280]">
              <ShieldCheck className="w-4 h-4 text-[#063280]" />
              <span>Information Last Verified: {uni.lastVerifiedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Primary Sources:</span>
              <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-[#063280] hover:underline flex items-center gap-1 font-semibold">
                Official University Website <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. AFFILIATION AND RECOGNITION */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Accreditation & Government Standing
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Affiliation and Recognition
            </h2>
            <p className="text-xs text-[#475569]">
              Verified legal and regulatory affiliations under the Ministry of Health of Uzbekistan and global medical directories.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[550px]">
              <thead>
                <tr className="bg-[#F7FAFC] text-[#063280] font-bold uppercase tracking-wider border-b border-[#D9E2EC]">
                  <th className="p-3.5 rounded-l-xl w-1/3">Parameter</th>
                  <th className="p-3.5 rounded-r-xl">Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E2EC] text-[#0F172A]">
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">University Type</td>
                  <td className="p-3.5">{uni.affiliationRecognition.universityType}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Established Year</td>
                  <td className="p-3.5 font-semibold">{uni.establishedYear}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Parent Governing Authority</td>
                  <td className="p-3.5">{uni.affiliationRecognition.parentInstitution}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Ministry Affiliation</td>
                  <td className="p-3.5">{uni.affiliationRecognition.ministryAffiliation}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">State Accreditation</td>
                  <td className="p-3.5">{uni.affiliationRecognition.accreditation}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">International Directories</td>
                  <td className="p-3.5">{uni.affiliationRecognition.internationalListings}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">NMC FMGL 2021 Status</td>
                  <td className="p-3.5 font-semibold text-[#063280]">{uni.affiliationRecognition.nmcCompliance}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-[#063280]">Official Portal</td>
                  <td className="p-3.5">
                    <a href={uni.website} target="_blank" rel="noopener noreferrer" className="text-[#063280] hover:underline font-bold flex items-center gap-1">
                      {uni.website} <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. QUICK HIGHLIGHTS */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Verified Snapshot
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Quick Highlights
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {uni.quickHighlights.map((item, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
                <span className="text-[11px] text-[#475569] font-semibold uppercase">{item.label}</span>
                <p className="text-xs sm:text-sm font-extrabold text-[#063280]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. ADVANTAGES OF STUDYING AT [UNIVERSITY NAME] */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Key Academic Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Advantages of Studying at {uni.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {uni.advantages.map((adv, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#EBF3FA]/70 border border-[#D9E2EC] flex items-start gap-3">
                <div className="p-1 rounded-lg bg-white text-[#063280] shrink-0 mt-0.5 border border-[#D9E2EC]">
                  <CheckCircle2 className="w-4 h-4 text-[#063280]" />
                </div>
                <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed font-medium">
                  {adv}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. MBBS FEE STRUCTURE */}
        {/* ========================================================================= */}
        <section id="fee-structure" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9E2EC]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
                Itemized Financial Roadmap
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#063280] mt-2">
                MBBS Fee Structure
              </h2>
            </div>
            <div className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC]">
              Est. 6-Year Total: ~{formatAmount(uni.fees.estimatedTotal6YearsUSD).inr} ({formatAmount(uni.fees.estimatedTotal6YearsUSD).usd})
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-[#F7FAFC] text-[#063280] font-bold uppercase tracking-wider border-b border-[#D9E2EC]">
                  <th className="p-3.5 rounded-l-xl">Fee Component</th>
                  <th className="p-3.5">Annual Amount (USD)</th>
                  <th className="p-3.5">Annual Amount (INR)</th>
                  <th className="p-3.5 rounded-r-xl">Type & Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9E2EC] text-[#0F172A]">
                <tr className="bg-[#EBF3FA]/50">
                  <td className="p-3.5 font-black text-[#063280]">University Tuition Fee</td>
                  <td className="p-3.5 font-black text-[#063280] text-sm">${uni.fees.annualTuitionUSD.toLocaleString()}</td>
                  <td className="p-3.5 font-bold text-[#0F172A]">{formatAmount(uni.fees.annualTuitionUSD).inr}</td>
                  <td className="p-3.5 font-bold text-[#063280]">OFFICIAL UNIVERSITY FEE</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Hostel Accommodation</td>
                  <td className="p-3.5 font-bold text-[#0F172A]">${uni.fees.annualHostelUSD}</td>
                  <td className="p-3.5 text-[#475569]">{formatAmount(uni.fees.annualHostelUSD).inr}</td>
                  <td className="p-3.5 text-[#475569]">Official Hostel Charges</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Authentic Indian Mess (3 Meals Daily)</td>
                  <td className="p-3.5 font-bold text-[#0F172A]">${uni.fees.annualIndianMessUSD}</td>
                  <td className="p-3.5 text-[#475569]">{formatAmount(uni.fees.annualIndianMessUSD).inr}</td>
                  <td className="p-3.5 text-[#475569]">Estimated Mess Expense</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-semibold text-[#0F172A]">Medical Insurance & Visa Extension</td>
                  <td className="p-3.5 font-bold text-[#0F172A]">${uni.fees.annualMedicalInsuranceUSD + uni.fees.annualVisaRenewalUSD}</td>
                  <td className="p-3.5 text-[#475569]">{formatAmount(uni.fees.annualMedicalInsuranceUSD + uni.fees.annualVisaRenewalUSD).inr}</td>
                  <td className="p-3.5 text-[#475569]">Estimated Annual Mandate</td>
                </tr>
                <tr className="bg-[#F7FAFC]">
                  <td className="p-3.5 font-bold text-[#063280]">1st-Year One-Time Processing & Onboarding</td>
                  <td className="p-3.5 font-bold text-[#0F172A]">${uni.fees.firstYearOneTimeChargesUSD}</td>
                  <td className="p-3.5 text-[#475569]">{formatAmount(uni.fees.firstYearOneTimeChargesUSD).inr}</td>
                  <td className="p-3.5 text-[#475569]">Registration, Apostille, Equivalence</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] text-xs text-[#475569] leading-relaxed">
            <p className="font-bold text-[#063280] mb-0.5">Official Fee Notice & Disclaimer:</p>
            <p>
              Tuition and hostel fees are payable directly to the university per semester/academic year. Currency conversion is based on reference rate (1 USD ≈ ₹{USD_TO_INR_RATE}). Fees may change by academic year. Students should verify the latest fee structure directly with the university before making financial commitments.
            </p>
          </div>

          {/* Strategic CTA 1 */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#475569]">
              <span className="font-bold text-[#063280]">Fee Last Verified:</span> {uni.lastVerifiedDate} • Source: {uni.sources[0]?.title}
            </div>
            <button
              onClick={() => onOpenLeadModal(`Get Official Fee Circular for ${uni.name}`)}
              className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer border-b-2 border-[#9B193A]"
            >
              Get Latest Fee Details
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. MBBS SYLLABUS */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Academic Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              MBBS Syllabus
            </h2>
            <p className="text-xs text-[#475569]">
              Structured 6-year medical coursework matching international competencies and NMC FMGL licensing parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { year: "Year 1 (Pre-Clinical Foundations)", subjects: uni.syllabus.year1 },
              { year: "Year 2 (Para-Clinical & Pathologies)", subjects: uni.syllabus.year2 },
              { year: "Year 3 (Clinical Diagnostics & Surgery)", subjects: uni.syllabus.year3 },
              { year: "Year 4 (Clinical Specialties & OB-GYN)", subjects: uni.syllabus.year4 },
              { year: "Year 5 (Advanced Surgery & ICU)", subjects: uni.syllabus.year5 },
              { year: "Year 6 (Clinical Internship & Licensing)", subjects: uni.syllabus.year6 }
            ].map((block, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-3">
                <h4 className="font-extrabold text-sm text-[#063280] pb-2 border-b border-[#D9E2EC]">
                  {block.year}
                </h4>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  {block.subjects.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <span className="text-[#063280] font-bold">•</span>
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. HOSTEL & ACCOMMODATION */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Student Living & Food
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Hostel & Accommodation
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Accommodation & Rooms</span>
              <p className="text-[#475569]">{uni.hostel.facilities}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Indian Food & Mess</span>
              <p className="text-[#475569]">{uni.hostel.food}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Security & Wardens</span>
              <p className="text-[#475569]">{uni.hostel.security}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Location & Campus Proximity</span>
              <p className="text-[#475569]">{uni.hostel.distance}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Annual Hostel Fee</span>
              <p className="text-[#063280] font-bold">{uni.hostel.fees}</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280] text-sm">Alternative Housing</span>
              <p className="text-[#475569]">Students in senior years may rent private shared apartments near campus ($150–$250/mo).</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. ELIGIBILITY CRITERIA */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Admission Requirements
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Eligibility Criteria
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1.5">
              <span className="font-bold text-[#063280] text-sm">A. Academic Qualification</span>
              <p className="text-[#475569]">{uni.eligibility.academic}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1.5">
              <span className="font-bold text-[#063280] text-sm">B. 10+2 Subject Percentage</span>
              <p className="text-[#475569]">{uni.eligibility.subjects}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1.5">
              <span className="font-bold text-[#063280] text-sm">C. NEET-UG Requirement</span>
              <p className="text-[#475569]">{uni.eligibility.neet}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1.5">
              <span className="font-bold text-[#063280] text-sm">D. Age Criteria</span>
              <p className="text-[#475569]">{uni.eligibility.age}</p>
            </div>
          </div>

          {/* Strategic CTA 2 */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#D9E2EC]">
            <p className="text-xs text-[#475569]">
              *Eligibility requirements may change. Students should verify current requirements with MH GLOBAL EDUCATION CONSULTANT.
            </p>
            <Link
              to="/mbbs-eligibility"
              className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-1.5 border-b-2 border-[#9B193A]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#9ABAD9]" />
              Check My Eligibility
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. DOCUMENTS REQUIRED */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#D9E2EC]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
                Checklist & Apostille
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#063280] mt-2">
                Documents Required
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#F7FAFC] hover:bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC] font-bold rounded-xl text-xs self-start sm:self-auto cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Checklist
            </button>
          </div>

          <div className="divide-y divide-[#D9E2EC]">
            {uni.documents.map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleDoc(idx)}
                  className={`py-3.5 px-3 rounded-xl cursor-pointer transition-colors flex items-start gap-3 ${
                    isChecked ? "bg-[#EBF3FA]/60" : "hover:bg-[#F7FAFC]"
                  }`}
                >
                  <div className="pt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-4 h-4 text-[#063280]" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                  </div>
                  <div className="text-xs space-y-0.5">
                    <p className={`font-bold ${isChecked ? "line-through text-slate-400" : "text-[#0F172A]"}`}>
                      {doc.name} {doc.required && <span className="text-[#9B193A] font-normal">*</span>}
                    </p>
                    <p className="text-[#475569] text-[11px]">{doc.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. ADMISSION PROCESS (STEP-BY-STEP) */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              10-Step Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Admission Process (Step-by-Step)
            </h2>
          </div>

          <div className="space-y-3">
            {uni.admissionProcess.map((item) => (
              <div key={item.step} className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#063280] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {item.step}
                </div>
                <div className="text-xs space-y-0.5">
                  <h4 className="font-extrabold text-[#063280]">{item.title}</h4>
                  <p className="text-[#475569] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic CTA 3 */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onOpenLeadModal(`Admission Assistance for ${uni.name}`)}
              className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-xs cursor-pointer border-b-2 border-[#9B193A]"
            >
              Get Admission Assistance
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 12. WHY MBBS IN UZBEKISTAN */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Country Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Why MBBS in Uzbekistan
          </h2>
          <p className="text-xs sm:text-sm text-[#0F172A] leading-relaxed">
            {uni.whyUzbekistan} Over 10,000 Indian students are currently enrolled in recognized Uzbek medical academies due to direct flight connectivity from New Delhi (3.5 hours), 100% English-medium faculties, high clinical hospital bed capacity, and very safe, welcoming student environments.
          </p>
          <div className="p-3.5 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] text-[#063280] text-xs flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#063280] shrink-0 mt-0.5" />
            <p>
              <strong>100% English Medium Curriculum:</strong> All theoretical lectures, clinical lab modules, and examinations are conducted in English. Basic colloquial Uzbek/Russian language is taught in early semesters specifically for interacting with local patients during hospital rotations.
            </p>
          </div>
          <div className="pt-2">
            <Link to="/mbbs-in-uzbekistan" className="text-[#063280] hover:text-[#1558A9] hover:underline font-bold text-xs flex items-center gap-1">
              Read Complete Guide to MBBS in Uzbekistan <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 13. BENEFITS OF STUDYING MBBS IN UZBEKISTAN */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Destination Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
            Benefits of Studying MBBS in Uzbekistan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {uni.benefitsUzbekistan.map((b, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#063280] shrink-0 mt-0.5" />
                <span className="text-[#0F172A] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14. OUR ASSISTANCE FOR MBBS ADMISSION */}
        {/* ========================================================================= */}
        <section className="bg-linear-to-br from-[#063280] via-[#0E438D] to-[#1558A9] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 border border-[#9ABAD9]/20">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#9B193A] px-3.5 py-1 rounded-full">
              MH GLOBAL EDUCATION CONSULTANT Services
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Our Assistance for MBBS Admission
            </h2>
            <p className="text-xs text-slate-200">
              End-to-end guidance from preliminary profile screening in India to on-ground hostel onboarding in Uzbekistan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {uni.mhMedicalAssistance.map((srv, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-white/10 border border-white/10 text-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9ABAD9] shrink-0 mt-0.5" />
                <span>{srv}</span>
              </div>
            ))}
          </div>

          {/* Strategic CTA 4 */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenLeadModal(`Talk to a Counsellor regarding ${uni.name}`)}
              className="px-6 py-3 bg-[#9B193A] hover:bg-[#7E142F] text-white font-bold rounded-xl text-xs transition-colors shadow-md cursor-pointer"
            >
              Talk to a Counsellor
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-white hover:bg-slate-100 text-[#063280] font-bold rounded-xl text-xs transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 14.5. COMPARE WITH OTHER UNIVERSITIES */}
        {/* ========================================================================= */}
        {comparisonUnis.length > 0 && (
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
                Side-by-Side Evaluation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
                Compare {uni.name} with Top Uzbekistan Medical Colleges
              </h2>
              <p className="text-xs text-[#475569]">
                Evaluate tuition fees, hospital bed count, and student living costs against peer institutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisonUnis.map((compUni) => (
                <div key={compUni.id} className="p-6 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#063280] text-white">
                        {compUni.type} Academy
                      </span>
                      <span className="text-xs text-[#475569]">{compUni.city}, Uzbekistan</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#063280] mt-3">{compUni.name}</h3>
                    <p className="text-xs text-[#475569] mt-1 line-clamp-2">{compUni.hero?.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-[#D9E2EC]">
                        <span className="text-[10px] text-[#475569]">Annual Tuition</span>
                        <p className="font-bold text-[#063280]">${compUni.fees?.annualTuitionUSD?.toLocaleString()}/yr</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#D9E2EC]">
                        <span className="text-[10px] text-[#475569]">Clinical Beds</span>
                        <p className="font-bold text-[#063280]">
                          {compUni.quickHighlights?.find((h) => h.label.includes("Beds"))?.value || "2,500+ Beds"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/universities/uzbekistan/${compUni.slug}`}
                    className="inline-flex items-center justify-between text-xs font-bold text-[#063280] hover:text-[#1558A9] pt-2 border-t border-[#D9E2EC]"
                  >
                    <span>Compare Fees & Admission with {compUni.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 15. POPULAR MBBS DESTINATIONS FOR INDIAN STUDENTS IN UZBEKISTAN */}
        {/* ========================================================================= */}
        <section className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Medical Education Hubs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Popular MBBS Destinations for Indian Students in Uzbekistan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {uni.popularDestinations.map((dest, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-3 flex flex-col justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-[#063280]">{dest.city}</h4>
                  <p className="text-xs text-[#475569] mt-1 line-clamp-3">{dest.description}</p>
                </div>
                <Link to={dest.link} className="text-xs font-bold text-[#063280] hover:text-[#1558A9] hover:underline flex items-center gap-1">
                  View {dest.city} Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 16. FREQUENTLY ASKED QUESTIONS */}
        {/* ========================================================================= */}
        <section className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              University Q&A
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-[#475569]">
              Detailed answers specific to {uni.name}, fees, clinical exposure, hostels, and admission procedures.
            </p>
          </div>

          <div className="space-y-3">
            {uni.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-[#D9E2EC] overflow-hidden shadow-2xs">
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0F172A] hover:text-[#063280] transition-colors"
                >
                  <span>{i + 1}. {faq.q}</span>
                  {openFaqIndex === i ? (
                    <ChevronUp className="w-4 h-4 text-[#063280] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#475569] shrink-0" />
                  )}
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

        {/* ========================================================================= */}
        {/* SOURCES & INFORMATION VERIFICATION FOOTNOTE */}
        {/* ========================================================================= */}
        <section className="bg-[#EBF3FA] p-6 rounded-3xl border border-[#D9E2EC] space-y-3 text-xs text-[#063280]">
          <div className="flex items-center gap-2 font-bold text-sm text-[#063280]">
            <ShieldCheck className="w-5 h-5 text-[#063280]" />
            <span>Sources & Information Verification</span>
          </div>
          <p>
            <strong>Information Last Verified:</strong> {uni.lastVerifiedDate}
          </p>
          <div className="space-y-1">
            <p className="font-semibold">Authoritative Data Citations:</p>
            <ul className="list-disc pl-5 space-y-0.5">
              {uni.sources.map((src, idx) => (
                <li key={idx}>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#1558A9]">
                    {src.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-[11px] text-[#475569] pt-1">
            *Disclaimer: University fees, admission requirements, visa requirements and regulatory requirements may change. Students should verify current information with the university and relevant authorities before making decisions.
          </p>
        </section>

        {/* ========================================================================= */}
        {/* FINAL BOTTOM CTA */}
        {/* ========================================================================= */}
        <section className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] text-white p-8 sm:p-12 rounded-3xl text-center space-y-4 shadow-xl border border-[#9ABAD9]/20">
          <h3 className="text-2xl sm:text-3xl font-black">
            Ready to Begin Your MBBS at {uni.name}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Get official university prospectuses, complete fee structures, and personalized admission assistance from MH GLOBAL EDUCATION CONSULTANT.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal(`Start MBBS Journey at ${uni.name}`)}
              className="px-8 py-4 bg-[#9B193A] hover:bg-[#7E142F] text-white font-black rounded-2xl text-sm sm:text-base transition-all shadow-lg cursor-pointer"
            >
              Start Your MBBS Journey
            </button>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE STICKY BOTTOM BAR */}
      {/* ========================================================================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D9E2EC] p-3 sm:hidden shadow-lg flex items-center gap-2">
        <Link
          to="/mbbs-eligibility"
          className="flex-1 py-2.5 bg-[#063280] text-white font-bold rounded-xl text-xs text-center shadow-xs"
        >
          Check Eligibility
        </Link>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 bg-[#9B193A] text-white font-bold rounded-xl text-xs text-center shadow-xs"
        >
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}
