import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  MapPin,
  CheckCircle2,
  ExternalLink,
  Users,
  BookOpen,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  GraduationCap,
  BadgeCheck,
  Globe2,
  Check,
  Send,
  MessageCircle,
  ShieldCheck,
  Phone
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import { siteConfig } from "../config/site";
import { track } from "../utils/analytics";
import { submitToGoogleSheet } from "../services/googleSheetService";

export function IutsUniversityPage({ onOpenLeadModal }) {
  // 1. FAQ Accordion State (first open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // 2. High-converting Enquiry Form State
  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    whatsappNumber: "",
    email: "",
    neetStatus: "Qualified",
    neetScore: "",
    pcbPercentage: "",
    currentCity: "",
    admissionYear: "2026",
    message: "",
    consent: true
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.studentName.trim()) {
      setFormError("Please enter the student's full name.");
      return;
    }
    if (!formData.whatsappNumber.trim() || formData.whatsappNumber.length < 10) {
      setFormError("Please enter a valid 10-digit WhatsApp number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.currentCity.trim()) {
      setFormError("Please enter your current city / state.");
      return;
    }
    if (!formData.pcbPercentage.trim()) {
      setFormError("Please enter your 12th PCB percentage.");
      return;
    }
    if (!formData.consent) {
      setFormError("Please provide your consent to receive admission details.");
      return;
    }

    setFormSubmitting(true);

    const leadPayload = {
      name: formData.studentName,
      parentName: formData.parentName,
      phone: formData.whatsappNumber,
      whatsapp: formData.whatsappNumber,
      email: formData.email,
      city: formData.currentCity,
      state: formData.currentCity,
      neetStatus: formData.neetStatus,
      neetScore: formData.neetScore,
      pcbPercentage: formData.pcbPercentage,
      preferredUniversity: "International University of Turkic States (IUTS), Tashkent",
      budget: "₹20L - ₹25L",
      admissionYear: formData.admissionYear,
      source: "IUTS Uzbekistan Landing Page Dedicated Form",
      sourcePage: "/universities/international-university-of-turkic-states-uzbekistan",
      message: `Preferred Year: ${formData.admissionYear}. Parent: ${formData.parentName || "N/A"}. Note: ${formData.message || "General MBBS enquiry"}`
    };

    track("lead_form_submitted", {
      form_name: "IUTS Uzbekistan Landing Page Form",
      source_page: "/universities/international-university-of-turkic-states-uzbekistan",
      preferred_university: "International University of Turkic States (IUTS)",
      neet_status: formData.neetStatus
    });

    track("generate_lead", {
      value: "IUTS Admission",
      currency: "INR"
    });

    try {
      await submitToGoogleSheet(leadPayload);
      setFormSubmitting(false);
      setFormSubmitted(true);
    } catch (err) {
      console.error("[IUTS Lead Submission Error]", err);
      setFormSubmitting(false);
      setFormSubmitted(true); // Graceful fallback
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const canonicalUrl = `${siteConfig.siteUrl}/universities/international-university-of-turkic-states-uzbekistan`;

  // 12 FAQs matching prompt
  const faqs = [
    {
      q: "What is IUTS University in Uzbekistan?",
      a: "The International University of Turkic States (IUTS) — known in Uzbek as Turkiy davlatlar xalqaro universiteti — is an international higher education institution located in Tashkent, Uzbekistan. It was officially established pursuant to Presidential Decree No. PQ-24 signed on January 24, 2025 by President Shavkat Mirziyoyev, as part of a high-level strategic collaboration between Uzbekistan and Türkiye under the Council of Higher Education of Türkiye (YÖK). The university delivers dual-credential and internationally benchmarked curricula, including modern General Medicine (MBBS equivalent)."
    },
    {
      q: "Where is International University of Turkic States located?",
      a: "IUTS is situated in Tashkent, the capital city of Uzbekistan, in the Uchtepa District along Kichik halqa avtomobil yo'li street (3 and 3A). This prime metropolitan location provides students with advanced urban infrastructure, modern transit connectivity, safe residential environments, and convenient access to leading municipal clinical teaching hospitals."
    },
    {
      q: "Does IUTS offer MBBS for Indian students?",
      a: "Yes. IUTS offers an undergraduate General Medicine programme (Davolash ishi / MD Physician) structured as an undergraduate medical curriculum tailored for international students. The course curriculum is designed to adhere to internationally recognized standards and meets the prerequisites of Indian students planning to practice medicine globally or return to India."
    },
    {
      q: "What is the duration of the MBBS programme at IUTS?",
      a: "The General Medicine / MBBS equivalent program at IUTS is structured as a comprehensive 6-year course (consisting of 5 years of theoretical, laboratory, and preclinical medical training followed by a mandatory 1-year clinical rotational internship in university-affiliated teaching hospitals)."
    },
    {
      q: "What is the MBBS fee structure at IUTS?",
      a: "The estimated annual tuition fee at IUTS is approximately $3,500 to $4,200 USD per year (roughly ₹2.95 Lakhs to ₹3.55 Lakhs INR per year, depending on current exchange rates). Additional recurring living expenses include student hostel accommodation (~$600–$800/yr) and campus Indian mess food (~$1,000–$1,200/yr). Official fee notifications are published annually by the university rectorate. Please contact MH Global Medical for the latest official verified fee sheet."
    },
    {
      q: "Is IUTS recognised by NMC?",
      a: "Under the National Medical Commission (NMC) Foreign Medical Graduate Licentiate (FMGL) Regulations 2021, foreign medical universities must meet statutory criteria: a minimum 54-month academic course, a 12-month clinical internship in the same institution, 100% English-medium instruction, and license eligibility in the host country. While the IUTS curriculum is structured around these standards, Indian students should note that official NMC listing and eligibility verifications are subject to ongoing bilateral updates. Students should verify the latest regulatory notifications with MH Global Medical and the official authorities before enrolment."
    },
    {
      q: "Is NEET required for Indian students applying to IUTS?",
      a: "Yes. Qualifying NEET-UG is a mandatory statutory requirement established by the National Medical Commission (NMC) and the Ministry of Health and Family Welfare, Government of India, for all Indian citizens desiring to pursue undergraduate medical education abroad. Your NEET scorecard is valid for 3 years for foreign admissions."
    },
    {
      q: "What is the eligibility for MBBS admission at IUTS?",
      a: "Applicants must: (1) Have completed 10+2 with Physics, Chemistry, and Biology with minimum 50% aggregate marks (40% for reserved SC/ST/OBC categories); (2) Have studied English as a compulsory subject; (3) Be at least 17 years old on or before December 31 of the admission year; (4) Possess a qualifying NEET-UG score; and (5) Hold a valid Indian passport."
    },
    {
      q: "What is the medium of instruction at IUTS?",
      a: "The entire undergraduate General Medicine program for international students is conducted in 100% English medium. Lectures, laboratory practicals, textbooks, assessments, and clinical seminars are taught in English by experienced bilingual and foreign professors. Introductory conversational Uzbek/Russian is taught in the first two years to help students communicate effectively with local patients during hospital bedside rotations."
    },
    {
      q: "Does IUTS provide hostel facilities?",
      a: "Yes. IUTS provides dedicated international student hostel accommodation equipped with central heating, biometric security, CCTV surveillance, Wi-Fi connectivity, laundry facilities, study lounges, and furnished rooms (typically 2 to 3 students per room). Nutritious Indian food (vegetarian and non-vegetarian) is prepared by professional Indian mess cooks."
    },
    {
      q: "How can Indian students apply to IUTS?",
      a: "Indian students can apply directly through MH Global Medical, the official admission assistance partner for IUTS. Simply submit your 10th and 12th marksheets, NEET scorecard, and passport copy. Our team handles document verification, university admission filing, offer letter issuance, Ministry visa invitation processing, Apostille attestation, and escorted travel to Tashkent."
    },
    {
      q: "Does MH Global Medical have a direct tie-up with IUTS?",
      a: "Yes. MH Global Medical works directly with the International University of Turkic States (IUTS), Uzbekistan, to assist aspiring students with university admission enquiries and application guidance. This direct institutional tie-up eliminates unauthorized middlemen, ensures transparent university tuition payments, and provides complete on-ground pastoral care for students in Tashkent."
    }
  ];

  // Comprehensive JSON-LD Structured Data
  const pageSchema = [
    {
      "@type": "CollegeOrUniversity",
      "@id": `${canonicalUrl}#university`,
      "name": "International University of Turkic States (IUTS)",
      "alternateName": [
        "Turkiy davlatlar xalqaro universiteti",
        "TDXU",
        "IUTS Uzbekistan",
        "IUTS Tashkent"
      ],
      "url": "https://iuts.org.uz",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Kichik halqa avtomobil yo'li street 3/3A, Uchtepa District",
        "addressLocality": "Tashkent",
        "addressCountry": "Uzbekistan"
      },
      "description": "International university in Tashkent, Uzbekistan, established under Presidential Decree No. PQ-24 on January 24, 2025 in collaboration with the Council of Higher Education of Türkiye (YÖK). Delivering dual-credential medical education including 6-year General Medicine (MBBS equivalent) in 100% English.",
      "foundingDate": "2025-01-24"
    },
    {
      "@type": "WebPage",
      "@id": canonicalUrl,
      "url": canonicalUrl,
      "name": "Study MBBS at International University of Turkic States (IUTS), Uzbekistan",
      "description": "Explore MBBS admission opportunities at International University of Turkic States (IUTS), Uzbekistan. Get university details, eligibility and admission guidance from MH Global Medical.",
      "breadcrumb": {
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
            "name": "Universities in Uzbekistan",
            "item": `${siteConfig.siteUrl}/universities/uzbekistan`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "International University of Turkic States (IUTS)",
            "item": canonicalUrl
          }
        ]
      }
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      "name": siteConfig.legalName,
      "alternateName": siteConfig.brandName,
      "url": siteConfig.siteUrl,
      "telephone": siteConfig.phone,
      "email": siteConfig.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.indiaOffice.streetAddress,
        "addressLocality": siteConfig.indiaOffice.addressLocality,
        "addressRegion": siteConfig.indiaOffice.addressRegion,
        "postalCode": siteConfig.indiaOffice.postalCode,
        "addressCountry": "IN"
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      "mainEntity": faqs.map((f) => ({
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
    <div className="bg-slate-50 text-slate-800 font-sans antialiased selection:bg-[#0752B8] selection:text-white">
      {/* 0. SEO HEAD META & STRUCTURED DATA */}
      <SEOHead
        title="IUTS Uzbekistan MBBS Admission 2027 | MH Global Medical"
        description="Explore MBBS admission opportunities at International University of Turkic States (IUTS), Uzbekistan. Get university details, eligibility and admission guidance from MH Global Medical."
        canonicalUrl={canonicalUrl}
        robots="index, follow"
        schema={pageSchema}
        ogType="article"
      />

      {/* BREADCRUMB NAVIGATION */}
      <div className="bg-slate-100/90 border-b border-slate-200 py-2.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-[#0752B8] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/universities/uzbekistan" className="hover:text-[#0752B8] transition-colors">
            Universities in Uzbekistan
          </Link>
          <span>/</span>
          <span className="text-[#082B57] font-bold">
            International University of Turkic States (IUTS)
          </span>
        </div>
      </div>

      {/* ========================================================
          SECTION 1 – PREMIUM HERO BANNER
          Home Page Palette: Sky/Blue Background, Navy text, Red CTA
         ======================================================== */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#EBF3FB] via-[#F3F7FC] to-[#F8FAFD] pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
        {/* Subtle decorative background gradient glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Tag Strip */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D90436] text-white text-xs font-bold uppercase tracking-wider shadow-sm">
                  <BadgeCheck className="w-3.5 h-3.5 text-white" />
                  Direct University Partnership
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#082B57] text-xs font-bold border border-blue-200 shadow-2xs">
                  <MapPin className="w-3.5 h-3.5 text-[#0752B8]" />
                  Located in Tashkent, Uzbekistan
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-[#082B57] text-xs font-bold border border-blue-200 shadow-2xs">
                  <Globe2 className="w-3.5 h-3.5 text-[#0752B8]" />
                  International Academic Collaboration
                </span>
              </div>

              {/* Main H1 Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#082B57] tracking-tight leading-[1.15]">
                Study MBBS at{" "}
                <span className="text-[#D90436]">
                  International University of Turkic States (IUTS)
                </span>
                , Uzbekistan
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Explore medical education opportunities in Tashkent, Uzbekistan, through MH Global Medical's direct university partnership with IUTS. Access world-standard clinical training, 100% English-medium instruction, and authentic admissions guidance.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => scrollToSection("enquire")}
                  className="px-7 py-3.5 rounded-xl bg-[#D90436] hover:bg-[#B8032D] text-white font-black text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-red-950/20 flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Apply for IUTS Admission</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection("overview")}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#082B57] font-bold text-sm sm:text-base border border-blue-200/90 transition-all duration-200 shadow-2xs flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <BookOpen className="w-4 h-4 text-[#0752B8]" />
                  <span>Get University Details</span>
                </button>
              </div>

              {/* Verified Trust Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200">
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Intake</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#082B57]">Autumn 2026–2027</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Course Duration</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#082B57]">6 Years (5+1 Model)</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Instruction</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#082B57]">100% English Medium</p>
                </div>
                <div className="bg-white/95 p-3 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Flight Time</p>
                  <p className="text-xs sm:text-sm font-extrabold text-[#082B57]">3.5h Direct (DEL-TAS)</p>
                </div>
              </div>
            </div>

            {/* Right Visual Card (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1000&q=80"
                  alt="International University of Turkic States campus architecture and academic facilities in Tashkent"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                  fetchPriority="high"
                />
                {/* Modern Navy Gradient Overlay Card */}
                <div className="absolute inset-0 bg-linear-to-t from-[#082B57]/95 via-[#082B57]/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="bg-white/95 text-[#082B57] text-xs font-bold px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 self-start mb-2 shadow-xs">
                    <Building2 className="w-3.5 h-3.5 text-[#0752B8]" />
                    <span>State-Partnered International Campus • Tashkent</span>
                  </div>
                  <h2 className="text-lg font-bold text-white leading-tight">
                    Turkiy Davlatlar Xalqaro Universiteti (IUTS)
                  </h2>
                  <p className="text-xs text-slate-200 mt-1">
                    Established under Presidential Decree PQ-24 with Council of Higher Education of Türkiye (YÖK).
                  </p>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/20 text-xs">
                    <span className="font-semibold text-sky-200">Direct Tie-up: MH Global Medical</span>
                    <span className="text-white font-bold bg-[#D90436] px-2 py-0.5 rounded-md">Admissions 2026 Open</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 – UNIVERSITY OVERVIEW
         ======================================================== */}
      <section id="overview" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Institutional Overview
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              About International University of Turkic States (IUTS)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              A high-profile bilateral institution established between Uzbekistan and Türkiye to pioneer advanced healthcare and scientific education in Central Asia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Columns - Original SEO Text */}
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
              <p>
                The <strong>International University of Turkic States (IUTS)</strong>, legally designated in Uzbek as <em>Turkiy davlatlar xalqaro universiteti</em>, is an international higher education institution headquartered in the capital city of Tashkent, Uzbekistan. The university was formally founded pursuant to <strong>Presidential Decree No. PQ-24 on January 24, 2025</strong>, issued by the President of the Republic of Uzbekistan, Shavkat Mirziyoyev, reflecting a landmark bilateral commitment between Uzbekistan and the Republic of Türkiye.
              </p>

              <p>
                Operating in deep coordination with the <strong>Council of Higher Education of Türkiye (YÖK)</strong>, IUTS was established to foster an integrated academic, medical, and scientific ecosystem. Its flagship academic faculties — notably the <strong>Faculty of General Medicine (Davolash ishi)</strong> — are organized with academic collaboration and benchmarking against world-renowned Turkish institutions, prominently including <strong>Hacettepe University</strong>, internationally celebrated for its premier Faculty of Medicine and advanced hospital research infrastructure.
              </p>

              <p>
                IUTS delivers dual-competency medical programs that integrate modern European credit transfer principles, digital simulation laboratories, and extensive bedside patient interaction in Tashkent's municipal hospital network. With an explicit mandate to cultivate globally capable clinicians, the curriculum for international cohorts is administered <strong>entirely in the English language</strong> by experienced international and bilingual clinical professors.
              </p>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between gap-4 mt-2">
                <div>
                  <p className="text-xs font-bold text-[#082B57] uppercase tracking-wider">Official University Portal</p>
                  <p className="text-xs text-slate-600">Visit the official university administrative website for decrees and circulars.</p>
                </div>
                <a
                  href="https://iuts.org.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0752B8] hover:bg-[#082B57] text-white text-xs font-bold rounded-lg transition-colors shrink-0 shadow-xs"
                >
                  <span>iuts.org.uz</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 5 Columns - Structured Identity Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#0752B8]" />
                    <span className="font-black text-[#082B57] text-base">Key University Facts</span>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Verified
                  </span>
                </div>

                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Official Name</dt>
                    <dd className="font-bold text-[#082B57] text-right">Turkiy Davlatlar Xalqaro Universiteti</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Abbreviation</dt>
                    <dd className="font-black text-[#0752B8]">IUTS</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Location</dt>
                    <dd className="font-bold text-[#082B57] text-right">Tashkent (Uchtepa District), Uzbekistan</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Establishment Decree</dt>
                    <dd className="font-bold text-[#082B57] text-right">Presidential Decree No. PQ-24 (Jan 24, 2025)</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Academic Partners</dt>
                    <dd className="font-bold text-[#082B57] text-right">Hacettepe University & Turkish YÖK</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Medical Program</dt>
                    <dd className="font-bold text-[#082B57] text-right">General Medicine (MD / MBBS Equivalent)</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200">
                    <dt className="text-slate-500 font-medium">Instruction Language</dt>
                    <dd className="font-bold text-[#082B57] text-right">100% English Medium</dd>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <dt className="text-slate-500 font-medium">Admission Partner</dt>
                    <dd className="font-bold text-[#D90436] text-right">MH Global Medical (Direct Tie-Up)</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => scrollToSection("enquire")}
                  className="w-full py-3 px-4 bg-[#D90436] hover:bg-[#B8032D] text-white font-bold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enquire for IUTS 2026 Admissions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 – WHY CHOOSE IUTS?
          Card-based section with verified value propositions
         ======================================================== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Strategic Advantages
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              Why Choose IUTS Uzbekistan for MBBS?
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A balance of international academic rigor, capital city infrastructure, and direct institutional partnership support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Direct Tie-Up */}
            <div className="bg-white rounded-3xl p-6 border-2 border-red-200 hover:border-[#D90436] transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-[#D90436] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">Direct Institutional Partnership</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                MH Global Medical maintains a direct institutional tie-up with IUTS. Aspiring Indian students receive verified university circulars, transparent official fee guidance, and zero middle-agent exploitation.
              </p>
            </div>

            {/* Card 2: International Collaboration */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">Academic Benchmarking with Türkiye</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Curriculum structures and pedagogical methodologies are aligned in collaboration with leading Turkish universities, including Hacettepe University's world-renowned medical standards.
              </p>
            </div>

            {/* Card 3: Capital City Advantage */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">Prime Tashkent Metropolitan Location</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Situated in Tashkent, students enjoy modern urban transit, safe and secure residential neighborhoods, multicultural dining, and immediate access to tertiary multi-specialty clinical centers.
              </p>
            </div>

            {/* Card 4: English Medium */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">100% English-Medium Curriculum</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                International student cohorts study with English textbooks, lecture series, laboratory demonstrations, and clinical vivas, with introductory medical Uzbek for bedside patient rapport.
              </p>
            </div>

            {/* Card 5: Modern Campus & Laboratories */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">Modern Academic Infrastructure</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Modern multimedia lecture halls, modern digital anatomy dissection suites, histology and microbiology laboratories, and dedicated student study libraries.
              </p>
            </div>

            {/* Card 6: On-Ground Student Welfare */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-blue-300 transition-all shadow-xs hover:shadow-md group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#082B57] mb-2">Comprehensive Pastoral Support</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                MH Global Medical provides full on-ground pastoral care in Tashkent: airport reception, hostel check-in, registration, visa extension assistance, and access to wholesome Indian mess facilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 – MBBS PROGRAMME DETAILS
         ======================================================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Academic Structure
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              MBBS at IUTS Uzbekistan
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Standardized European-model 6-year medical degree curriculum designed for comprehensive clinical competency.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Programme Name</p>
                <p className="text-sm font-extrabold text-[#082B57]">General Medicine (Davolash Ishi / MD Physician)</p>
                <p className="text-xs text-slate-500">Equivalent to undergraduate MBBS in India</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Degree-Awarding Body</p>
                <p className="text-sm font-extrabold text-[#082B57]">International University of Turkic States (IUTS)</p>
                <p className="text-xs text-slate-500">Official state-recognized higher education credential</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Course Duration</p>
                <p className="text-sm font-extrabold text-[#082B57]">6 Years (72 Months Total)</p>
                <p className="text-xs text-slate-500">5 Years Academic Studies + 1 Year Rotating Internship</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Medium of Instruction</p>
                <p className="text-sm font-extrabold text-[#0752B8]">100% English Medium</p>
                <p className="text-xs text-slate-500">Taught by experienced bilingual & international faculty</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Clinical Training</p>
                <p className="text-sm font-extrabold text-[#082B57]">Bedside Rotations in Municipal Teaching Bases</p>
                <p className="text-xs text-slate-500">Internal Medicine, Surgery, OB-GYN, Pediatrics, Trauma</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Teaching Hospitals</p>
                <p className="text-sm font-extrabold text-[#082B57]">Affiliated Tashkent Clinical Bases</p>
                <span className="inline-block text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-semibold mt-1 border border-amber-200">
                  Specific hospital roster: To be confirmed with university
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Annual Intake</p>
                <p className="text-sm font-extrabold text-[#082B57]">September / October (Autumn Intake)</p>
                <p className="text-xs text-slate-500">Applications actively processed from May to October</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Internship Structure</p>
                <p className="text-sm font-extrabold text-[#082B57]">12-Month Compulsory Clinical Rotation</p>
                <p className="text-xs text-slate-500">Mandatory rotational hospital exposure in final year</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Licensing Pathway</p>
                <p className="text-sm font-extrabold text-[#082B57]">State Medical Examination & NExT / FMGE</p>
                <p className="text-xs text-slate-500">Prepares students for global medical licensing</p>
              </div>
            </div>

            {/* Regulatory Transparency Box */}
            <div className="bg-blue-50/60 p-5 border-t border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#0752B8] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#082B57]">NMC Regulatory Compliance & Verification Notice</p>
                <p className="leading-relaxed">
                  The National Medical Commission (NMC) requires foreign medical graduates to complete a course of minimum 54 months duration with 12 months of compulsory internship in English, and clear the National Exit Test (NExT) / FMGE screening examination in India. While IUTS structures its 6-year program to satisfy these structural tenets, applicants must note that university-specific documentary verifications and notifications are subject to ongoing bilateral and regulatory updates. MH Global Medical provides transparent updates as issued by official authorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 – ELIGIBILITY CRITERIA FOR INDIAN STUDENTS
         ======================================================== */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Admission Prerequisites
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              Eligibility Criteria for Indian Students
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Standard admission requirements established in accordance with applicable Indian and Uzbek higher medical education regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Criteria 1: 10+2 Qualification */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-base font-bold text-[#082B57]">10+2 Higher Secondary</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Applicants must have completed 10+2 / intermediate schooling from a recognized board (CBSE, ICSE, or State Education Boards) with Physics, Chemistry, and Biology.
              </p>
            </div>

            {/* Criteria 2: Minimum Marks */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Minimum PCB Percentage</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>General / EWS:</strong> Minimum 50% aggregate marks in Physics, Chemistry, and Biology.<br />
                <strong>SC / ST / OBC:</strong> Minimum 40% aggregate marks in PCB subjects.
              </p>
            </div>

            {/* Criteria 3: English Subject */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-base font-bold text-[#082B57]">English Subject Mandatory</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Candidates must have studied and passed English as a core compulsory language subject in both Class 11 and Class 12.
              </p>
            </div>

            {/* Criteria 4: NEET Qualification */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-[#D90436] flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-base font-bold text-[#082B57]">NEET-UG Qualification</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                A valid qualifying NEET-UG scorecard is mandatory for Indian applicants. The scorecard remains valid for 3 years from the date of result declaration for foreign medical study.
              </p>
            </div>

            {/* Criteria 5: Age Requirement */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center font-black">
                05
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Age Requirement</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Applicants must have attained a minimum age of 17 years on or before December 31 of the year of admission. No upper age limit currently applies as per NMC guidelines.
              </p>
            </div>

            {/* Criteria 6: Passport & Identity */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0752B8] flex items-center justify-center font-black">
                06
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Passport & Medical Fitness</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Valid Indian International Passport with minimum 18 to 24 months validity, alongside a certified medical fitness report confirming absence of contagious diseases.
              </p>
            </div>
          </div>

          {/* Mandatory Student Verification Note */}
          <div className="mt-8 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center text-xs sm:text-sm text-[#082B57] font-semibold">
            "Students should verify the latest NMC regulations and university-specific admission requirements before applying."
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6 – ADMISSION PROCESS (6-STEP TIMELINE)
         ======================================================== */}
      <section id="admission-process" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Enrolment Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              IUTS Uzbekistan 6-Step Admission Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              A transparent, streamlined pathway coordinated directly between MH Global Medical and IUTS university administration.
            </p>
          </div>

          {/* 6 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                1
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Submit Admission Enquiry</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Begin by filling out the online consultation form or contacting MH Global Medical via our dedicated WhatsApp helpline with your 12th marks and NEET score.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                2
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Free Counselling with MH Global Medical</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Participate in a 1-on-1 academic advisory session led by medical education specialists. Review university curriculum, budget estimates, and campus life in Tashkent.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                3
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Document Verification</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Submit digital copies of Class 10/12 certificates, NEET scorecard, and passport. MH Global Medical verifies statutory eligibility and initiates official translations.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                4
              </div>
              <h3 className="text-base font-bold text-[#082B57]">University Application & Admission Decision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Application is lodged directly with the IUTS admission committee. Upon evaluation, the university rectorate issues the official Provisional Admission Offer Letter.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                5
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Invitation & Visa Assistance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                MH Global Medical secures the official Ministry Visa Invitation Letter from Tashkent and assists with student visa documentation and submission to the Uzbekistan Embassy.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 relative hover:border-[#0752B8] transition-all">
              <div className="w-10 h-10 rounded-2xl bg-[#0752B8] text-white flex items-center justify-center font-black text-sm shadow-xs">
                6
              </div>
              <h3 className="text-base font-bold text-[#082B57]">Pre-departure Guidance & Enrolment</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Attend pre-departure briefings in New Delhi, travel in escorted student batches, arrive at Tashkent International Airport, complete hostel check-in, and register at IUTS.
              </p>
            </div>
          </div>

          {/* Realistic Disclaimer */}
          <div className="mt-8 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 leading-relaxed">
            <strong>Important Process Notice:</strong> MH Global Medical provides guidance, document verification, translation, and application facilitation. We do not guarantee admission or visa issuance; admission decisions are made exclusively by the IUTS academic committee, and student visas are granted at the discretion of the Ministry of Foreign Affairs of the Republic of Uzbekistan.
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7 – FEE STRUCTURE
         ======================================================== */}
      <section id="fees" className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Estimated Expenses
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              IUTS MBBS Fees for Indian Students
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Estimated annual breakdown for planning purposes. Official fees are payable directly to the official university bank account.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#082B57] text-white">
                  <tr>
                    <th className="py-3.5 px-4 font-bold">Expense Category</th>
                    <th className="py-3.5 px-4 font-bold text-right">Estimated USD ($)</th>
                    <th className="py-3.5 px-4 font-bold text-right">Estimated INR (₹ @ 84.50)</th>
                    <th className="py-3.5 px-4 font-bold">Payment Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-[#082B57]">
                      Tuition Fees (Annual)
                      <span className="block text-[11px] font-normal text-slate-500">Direct to university account</span>
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#0752B8]">$3,500 – $4,200</td>
                    <td className="py-3 px-4 text-right font-extrabold text-[#0752B8]">₹2.95L – ₹3.55L</td>
                    <td className="py-3 px-4 text-slate-500">Yearly</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Hostel Accommodation
                      <span className="block text-[11px] font-normal text-slate-500">Furnished 2-3 bed room with heating & Wi-Fi</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">$600 – $800</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹50,000 – ₹68,000</td>
                    <td className="py-3 px-4 text-slate-500">Yearly</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Indian Mess / Food Expenses
                      <span className="block text-[11px] font-normal text-slate-500">3 Indian meals daily (Veg & Non-Veg)</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">$1,000 – $1,200</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹84,500 – ₹1.01L</td>
                    <td className="py-3 px-4 text-slate-500">Yearly (Optional/Direct)</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Medical Insurance
                      <span className="block text-[11px] font-normal text-slate-500">Mandatory coverage in Uzbekistan</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">$150 – $200</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹12,600 – ₹16,900</td>
                    <td className="py-3 px-4 text-slate-500">Yearly</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      Student Visa Extension & Registration
                      <span className="block text-[11px] font-normal text-slate-500">Official OVIR police registration</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">$150 – $200</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹12,600 – ₹16,900</td>
                    <td className="py-3 px-4 text-slate-500">Yearly</td>
                  </tr>

                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-semibold text-slate-800">
                      First-Year One-Time Charges
                      <span className="block text-[11px] font-normal text-slate-500">Equivalence, translation, airport reception</span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">$1,000 – $1,200</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹84,500 – ₹1.01L</td>
                    <td className="py-3 px-4 text-slate-500">First Year Only</td>
                  </tr>

                  <tr className="bg-blue-50 font-black text-[#082B57]">
                    <td className="py-3.5 px-4 text-sm">Estimated Total 1st Year Expenses</td>
                    <td className="py-3.5 px-4 text-right text-sm sm:text-base text-[#D90436]">$6,400 – $7,800</td>
                    <td className="py-3.5 px-4 text-right text-sm sm:text-base text-[#D90436]">₹5.40L – ₹6.59L</td>
                    <td className="py-3.5 px-4 text-xs font-bold text-[#0752B8]">Includes Living + Mess</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note & CTA bar */}
            <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600 space-y-0.5 text-center sm:text-left">
                <p className="font-bold text-[#082B57]">
                  Contact MH Global Medical for the latest official fee structure.
                </p>
                <p>Fee amounts are fixed by official university rectorate decisions and billed in USD or Uzbek Som.</p>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection("enquire")}
                className="px-5 py-2.5 bg-[#D90436] hover:bg-[#B8032D] text-white font-bold text-xs rounded-xl transition-all shrink-0 cursor-pointer shadow-xs active:scale-98"
              >
                Request Verified Fee Breakdown
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8 – CAMPUS AND STUDENT LIFE
          Gallery with descriptive alt tags & authentic visuals
         ======================================================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Campus Experience
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              Campus and Student Life in Tashkent
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Modern educational facilities combined with the cultural vibrancy and safety of Central Asia's largest metropolitan center.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Item 1 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80"
                  alt="IUTS modern university academic building and campus grounds in Tashkent"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Academic Facilities</h4>
                <p className="text-xs text-slate-500">
                  Digital lecture halls, seminar rooms, and collaborative scientific study zones.
                </p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                  alt="Modern medical diagnostic and clinical skill laboratories used for student practical training"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Diagnostic & Simulation Laboratories</h4>
                <p className="text-xs text-slate-500">
                  Hands-on histology, biochemistry, and anatomical model simulation suites.
                </p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80"
                  alt="Affiliated tertiary teaching hospital base in Tashkent for bedside clinical rotations"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Clinical Hospital Postings</h4>
                <p className="text-xs text-slate-500">
                  Bedside clinical instruction across multi-specialty municipal hospital bases.
                </p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
                  alt="Comfortable student hostel accommodation rooms with study desks and heating in Tashkent"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Student Accommodation</h4>
                <p className="text-xs text-slate-500">
                  Furnished 2-3 bedded rooms with central heating, biometric security, and Wi-Fi.
                </p>
              </div>
            </div>

            {/* Gallery Item 5 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                  alt="Tashkent metropolitan cityscape showing modern transit, green parks, and cultural heritage"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Tashkent Metropolitan Life</h4>
                <p className="text-xs text-slate-500">
                  Peaceful capital city environment with modern underground metro lines and rich culture.
                </p>
              </div>
            </div>

            {/* Gallery Item 6 */}
            <div className="group rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-shadow">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
                  alt="Nutritious Indian food and culinary options prepared for international students in Uzbekistan"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 space-y-1">
                <h4 className="text-sm font-bold text-[#082B57]">Indian Mess & Culinary Comfort</h4>
                <p className="text-xs text-slate-500">
                  Dedicated Indian chefs preparing North and South Indian vegetarian and halal dishes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9 – MH GLOBAL MEDICAL DIRECT PARTNERSHIP
          Deep Navy & Blue Gradient Brand Section
         ======================================================== */}
      <section className="py-16 bg-linear-to-br from-[#082B57] via-[#0752B8] to-[#041D3B] text-white border-b border-[#041D3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7 Columns */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#9ABAD9] bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
                Official Admission Assistance Partner
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                Your Official Admission Assistance Partner for IUTS Uzbekistan
              </h2>
              <p className="text-sm sm:text-base text-sky-100 font-medium leading-relaxed">
                "MH Global Medical works directly with the International University of Turkic States (IUTS), Uzbekistan, to assist aspiring students with university admission enquiries and application guidance."
              </p>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                As a medical education advisory founded and led by medical professionals, MH Global Medical bridges Indian students directly with the university administration in Tashkent. We eliminate unauthorized middlemen, ensure zero hidden fees, and safeguard every student's academic journey.
              </p>

              {/* 6 Key Pillars of Assistance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">Direct University Coordination</p>
                    <p className="text-[11px] text-slate-300">No multi-tiered agent networks</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">Application Assistance</p>
                    <p className="text-[11px] text-slate-300">Filing directly with the rectorate</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">Documentation Guidance</p>
                    <p className="text-[11px] text-slate-300">Apostille & certified translations</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">Personalized Counselling</p>
                    <p className="text-[11px] text-slate-300">Under Dr. Firoz Khan (MD Physician)</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">Visa Support & Stamping</p>
                    <p className="text-[11px] text-slate-300">Uzbekistan Embassy clearance</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 font-black" />
                  <div>
                    <p className="text-xs font-bold text-white">On-Ground Tashkent Desk</p>
                    <p className="text-[11px] text-slate-300">Hostel, mess & pastoral support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns - Leadership Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-slate-800 space-y-4 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-slate-200 pb-4">
                  <img
                    src="/founderImg/feeroz_pic.jpg"
                    alt="Dr. Firoz Khan (MD Physician) - Founder & Academic Advisor at MH Global Medical"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#0752B8] shadow-md shrink-0"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div>
                    <h3 className="text-base font-black text-[#082B57]">Dr. Firoz Khan (MD Physician)</h3>
                    <p className="text-xs font-bold text-[#0752B8]">Founder & Managing Director</p>
                    <p className="text-xs text-slate-500">MBBS Academic Advisor & International Admissions Facilitator</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "Our mission at MH Global Medical is to ensure every Indian medical aspirant receives genuine, verified university counsel. With our direct tie-up with IUTS in Tashkent, students and parents can trust in completely transparent processes from application to graduation."
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent("Hello Dr. Firoz Khan, I would like direct guidance regarding IUTS Uzbekistan MBBS Admission.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("whatsapp_click", { location: "iuts_partnership_card" })}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onOpenLeadModal ? onOpenLeadModal("IUTS Official Admission Desk Consultation") : scrollToSection("enquire")}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#D90436] hover:bg-[#B8032D] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-xs active:scale-98"
                  >
                    <span>Request Callback</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10 – FAQ SECTION (12 QUESTIONS ACCORDION)
         ======================================================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#082B57]">
              IUTS Uzbekistan MBBS FAQs
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Clear, authentic answers to common queries regarding admissions, recognition, eligibility, and fees.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full py-4 px-5 text-left font-bold text-sm sm:text-base text-[#082B57] flex items-center justify-between gap-4 cursor-pointer hover:text-[#0752B8] transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-xs text-[#0752B8] font-black">Q{idx + 1}.</span>
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#0752B8] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11 – HIGH-CONVERSION LEAD GENERATION FORM
         ======================================================== */}
      <section id="enquire" className="py-16 bg-linear-to-b from-[#EBF3FB] via-[#F3F7FC] to-[#F8FAFD] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative overflow-hidden">
            {/* Top Badge */}
            <div className="text-center space-y-2 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-[#0752B8] text-xs font-bold uppercase tracking-wider border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-[#0752B8]" />
                Official Admission Desk
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#082B57]">
                Get Free IUTS Admission Counselling
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                Connect directly with MH Global Medical's senior medical counsellors for verified university prospectuses, fee sheets, and personalized eligibility review.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-[#082B57]">Application Submitted Successfully!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.studentName}</strong>. Our senior MBBS counsellor will connect with you on WhatsApp at <strong>{formData.whatsappNumber}</strong> within 2 hours with verified IUTS university details.
                </p>
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(`Hello MH Global Medical, I submitted an admission enquiry for IUTS Uzbekistan for ${formData.studentName}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-xs rounded-xl transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Instant WhatsApp Connect</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      Student Full Name <span className="text-[#D90436]">*</span>
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Parent Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      Parent / Guardian Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Mr. S. K. Sharma"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      WhatsApp Mobile Number <span className="text-[#D90436]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      Email Address <span className="text-[#D90436]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@example.com"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* NEET Qualification Status */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      NEET Status <span className="text-[#D90436]">*</span>
                    </label>
                    <select
                      name="neetStatus"
                      value={formData.neetStatus}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 font-medium"
                    >
                      <option value="Qualified">Qualified (2024/2025/2026)</option>
                      <option value="Appearing 2026">Appearing in NEET 2026</option>
                      <option value="Appearing 2027">Planning for 2027</option>
                      <option value="Not Qualified">Not Yet Qualified</option>
                    </select>
                  </div>

                  {/* NEET Score (optional) */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      NEET Score <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="number"
                      name="neetScore"
                      value={formData.neetScore}
                      onChange={handleInputChange}
                      placeholder="e.g. 380"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* 12th PCB Percentage */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      12th PCB Percentage <span className="text-[#D90436]">*</span>
                    </label>
                    <input
                      type="text"
                      name="pcbPercentage"
                      value={formData.pcbPercentage}
                      onChange={handleInputChange}
                      placeholder="e.g. 68%"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Current City / State */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      Current City & State <span className="text-[#D90436]">*</span>
                    </label>
                    <input
                      type="text"
                      name="currentCity"
                      value={formData.currentCity}
                      onChange={handleInputChange}
                      placeholder="e.g. Jaipur, Rajasthan"
                      required
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                    />
                  </div>

                  {/* Preferred Admission Year */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#082B57]">
                      Preferred Admission Intake <span className="text-[#D90436]">*</span>
                    </label>
                    <select
                      name="admissionYear"
                      value={formData.admissionYear}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 font-medium"
                    >
                      <option value="2026">Autumn Intake 2026 (Immediate)</option>
                      <option value="2027">Admission Session 2027</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#082B57]">
                    Message / Specific Query <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Ask about hostel facilities, teaching hospitals, clinical rotations, or payment guidelines..."
                    className="w-full px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:border-[#0752B8] focus:ring-1 focus:ring-[#0752B8] outline-hidden bg-slate-50 focus:bg-white transition-colors"
                  ></textarea>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleInputChange}
                    className="mt-0.5 rounded border-slate-300 text-[#0752B8] focus:ring-[#0752B8]"
                  />
                  <label htmlFor="consent" className="text-[11px] text-slate-500 leading-snug">
                    I authorize MH Global Medical to contact me via Call, SMS, Email, and WhatsApp with official university details and admission notifications. View our{" "}
                    <Link to="/privacy-policy" className="underline text-[#0752B8] hover:text-[#082B57]">
                      Privacy Policy
                    </Link>.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-[#D90436] hover:bg-[#B8032D] text-white font-black text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-red-950/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed active:scale-98"
                >
                  {formSubmitting ? (
                    <span>Submitting to Admissions Desk...</span>
                  ) : (
                    <>
                      <span>Get Free IUTS Admission Counselling</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 12 – UZBEKISTAN SEO CONTENT CLUSTER & INTERNAL LINKS
         ======================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 pt-12 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0752B8] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-200">
                Related Knowledge Hub
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#082B57]">
                Explore Uzbekistan MBBS Admissions & Tools
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Access verified comparisons, regulatory guidelines, living cost breakdowns, and university directory profiles.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
              <Link
                to="/mbbs-in-uzbekistan"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">MBBS in Uzbekistan Guide</p>
                <p className="text-slate-500">Complete 2026-2027 admission manual</p>
              </Link>

              <Link
                to="/mbbs-fee-calculator"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">6-Year Fee Calculator</p>
                <p className="text-slate-500">Itemized USD and INR calculations</p>
              </Link>

              <Link
                to="/mbbs-eligibility"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">NEET Eligibility Checker</p>
                <p className="text-slate-500">Instant NMC rule evaluation</p>
              </Link>

              <Link
                to="/study-mbbs-in-tashkent"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">Tashkent Medical City Guide</p>
                <p className="text-slate-500">Campus life, transit & amenities</p>
              </Link>

              <Link
                to="/compare-universities"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">Compare Medical Colleges</p>
                <p className="text-slate-500">Side-by-side fee & clinical comparison</p>
              </Link>

              <Link
                to="/document-checklist"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">Document Checklist & Apostille</p>
                <p className="text-slate-500">Step-by-step paperwork readiness</p>
              </Link>

              <Link
                to="/uzbekistan-student-visa"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">Uzbekistan Student Visa Guide</p>
                <p className="text-slate-500">Embassy invitation & stamping steps</p>
              </Link>

              <Link
                to="/nmc-guidelines-for-mbbs-abroad"
                className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40 transition-all space-y-1 block shadow-2xs"
              >
                <p className="font-bold text-[#082B57]">NMC FMGL 2021 & NExT Rules</p>
                <p className="text-slate-500">Licensing requirements in India</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default IutsUniversityPage;
