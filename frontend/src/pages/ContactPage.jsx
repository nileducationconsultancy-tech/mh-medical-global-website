import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Award,
  FileCheck2,
  GraduationCap,
  Users2,
  Building2,
  ExternalLink,
  ArrowRight,
  Clock,
  Compass,
  Check
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { siteConfig } from "../config/site";
import { submitToGoogleSheet } from "../services/googleSheetService";
import { track } from "../utils/analytics";

export function ContactPage({ onOpenLeadModal }) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    countryCode: "+91",
    phone: "",
    email: "",
    interestedIn: "MBBS in Uzbekistan",
    neetStatus: "Qualified (NEET 2024 / 2025 / 2026)",
    message: "",
    honeypot: "" // Spam protection honeypot
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  // Smooth scroll to form
  const scrollToForm = () => {
    const el = document.getElementById("inquiry-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Indian & International mobile validation
  const validatePhone = (code, number) => {
    const cleanNumber = number.replace(/[\s-]/g, "");
    if (code === "+91") {
      return /^[6-9]\d{9}$/.test(cleanNumber);
    }
    return /^\d{7,14}$/.test(cleanNumber);
  };

  const validateEmail = (email) => {
    if (!email || !email.trim()) return true; // Optional field
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error upon typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    // Spam bot check via honeypot
    if (formData.honeypot) {
      setSubmitSuccess(true);
      return;
    }

    const errors = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      errors.fullName = "Please enter your full name (minimum 2 characters)";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Mobile number is required";
    } else if (!validatePhone(formData.countryCode, formData.phone)) {
      errors.phone =
        formData.countryCode === "+91"
          ? "Please enter a valid 10-digit Indian mobile number (e.g. 9876543210)"
          : "Please enter a valid mobile number with digits only";
    }

    if (formData.email && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = "Please enter a short message describing your enquiry (minimum 5 characters)";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      track("lead_form_submitted", {
        source: "Contact Us Page Form",
        interestedIn: formData.interestedIn,
        neetStatus: formData.neetStatus
      });
      track("generate_lead", {
        source: "Contact Us Page Form"
      });

      const fullMobile = `${formData.countryCode} ${formData.phone.trim()}`;
      const combinedMessage = `[Interested In: ${formData.interestedIn}] [NEET: ${formData.neetStatus}] ${formData.message.trim()}`;

      await submitToGoogleSheet({
        name: formData.fullName.trim(),
        phone: fullMobile,
        email: formData.email.trim(),
        preferredUniversity: formData.interestedIn,
        neetStatus: formData.neetStatus,
        source: "Contact Us Page Form",
        sourceCta: "Contact Us Page Inquiry Form",
        message: combinedMessage
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error("[Contact Page Submission Error]", err);
      setSubmitError(
        "There was a temporary issue submitting your enquiry online. Please email us directly at mhglobalmedical@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({
      fullName: "",
      countryCode: "+91",
      phone: "",
      email: "",
      interestedIn: "MBBS in Uzbekistan",
      neetStatus: "Qualified (NEET 2024 / 2025 / 2026)",
      message: "",
      honeypot: ""
    });
    setFormErrors({});
    setSubmitSuccess(false);
    setSubmitError("");
  };

  // Structured Data (JSON-LD)
  const contactPageSchema = [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      "name": "MH Global Medical",
      "legalName": siteConfig.legalName,
      "url": siteConfig.siteUrl,
      "logo": `${siteConfig.siteUrl}/mh-medical-logo.webp`,
      "email": "mhglobalmedical@gmail.com",
      "telephone": "+91 93106 48055",
      "description":
        "Authoritative medical education consultancy and admissions guidance platform for Indian students seeking MBBS admission in Uzbekistan and abroad.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "G-4, Maan House, School Block, Shakarpur",
        "addressLocality": "New Delhi",
        "addressRegion": "Delhi",
        "postalCode": "110092",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "contactType": "Admissions & Student Counselling",
          "telephone": "+91 93106 48055",
          "email": "mhglobalmedical@gmail.com",
          "availableLanguage": ["English", "Hindi"]
        }
      ]
    },
    {
      "@type": "ContactPage",
      "@id": `${siteConfig.siteUrl}/contact#webpage`,
      "url": `${siteConfig.siteUrl}/contact`,
      "name": "Contact MH Global Medical | MBBS Abroad Counselling in Delhi",
      "description":
        "Contact MH Global Medical in Shakarpur, New Delhi for MBBS abroad counselling, university selection, admission guidance and student support.",
      "isPartOf": {
        "@id": `${siteConfig.siteUrl}/#website`
      },
      "about": {
        "@id": `${siteConfig.siteUrl}/#organization`
      },
      "mainEntity": {
        "@id": `${siteConfig.siteUrl}/#organization`
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.siteUrl}/contact#breadcrumb`,
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
          "name": "Contact Us",
          "item": `${siteConfig.siteUrl}/contact`
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/contact#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Where is MH Global Medical located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "MH Global Medical's India Head Office is located at G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India. The office is located in East Delhi near the Nirman Vihar and Laxmi Nagar Metro stations (Blue Line)."
          }
        },
        {
          "@type": "Question",
          "name": "How can I contact MH Global Medical?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You can contact MH Global Medical by calling or messaging on WhatsApp at +91 93106 48055, emailing mhglobalmedical@gmail.com, or filling out the online enquiry form on our website. Our senior admissions team responds to all student and parent queries with verified university prospectuses and fee breakdowns."
          }
        },
        {
          "@type": "Question",
          "name": "Does MH Global Medical provide MBBS abroad counselling?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, MH Global Medical provides transparent, personalized admission counselling for Indian medical aspirants seeking MBBS degrees abroad. We guide students through NMC FMGL 2021 compliance, university selection in Uzbekistan, Kyrgyzstan, and other destinations, documentation, and visa facilitation."
          }
        },
        {
          "@type": "Question",
          "name": "How can I enquire about MBBS admission?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "You can enquire by submitting your details through the online enquiry form on our Contact page or emailing mhglobalmedical@gmail.com with your NEET score/status and preferred country. Our counsellors will provide itemized 6-year fee schedules, eligibility verification, and step-by-step admission assistance."
          }
        }
      ]
    }
  ];

  const trustHighlights = [
    {
      icon: GraduationCap,
      title: "MBBS Abroad Admission Guidance",
      desc: "Direct guidance on NMC FMGL 2021 compliant 6-year medical programs with 54-month coursework and 12-month clinical internships."
    },
    {
      icon: Building2,
      title: "University Selection Support",
      desc: "Impartial comparison of government & top medical institutes based on clinical bed count, English medium faculties, and living costs."
    },
    {
      icon: FileCheck2,
      title: "Documentation Assistance",
      desc: "Step-by-step facilitation for apostille, Ministry of External Affairs (MEA) attestation, invitation letters, and student visa files."
    },
    {
      icon: Users2,
      title: "Student Counselling",
      desc: "One-on-one sessions addressing student and parent concerns regarding hostel safety, Indian mess catering, and NExT screening prep."
    },
    {
      icon: ShieldCheck,
      title: "Admission Process Guidance",
      desc: "Transparent university tuition payable directly to institutional accounts with zero hidden service charges or surprise fees."
    }
  ];

  const faqs = [
    {
      q: "Where is MH Global Medical located?",
      a: "MH Global Medical's India Head Office is located at G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India. The office is easily accessible in East Delhi, situated close to Nirman Vihar and Laxmi Nagar Metro Stations on the Blue Line. Students and parents are welcome for in-person document reviews and counselling sessions."
    },
    {
      q: "How can I contact MH Global Medical?",
      a: "You can reach our official admissions desk directly by calling or messaging on WhatsApp at +91 93106 48055, emailing mhglobalmedical@gmail.com, or submitting the enquiry form on this page. Our counselling team reviews incoming queries promptly and provides verified university prospectuses, fee estimates, and eligibility requirements."
    },
    {
      q: "Does MH Global Medical provide MBBS abroad counselling?",
      a: "Yes. MH Global Medical specializes in factual, data-driven counselling for Indian medical aspirants planning to study MBBS abroad. We focus on NMC FMGL 2021 compliant government and premier medical universities in Uzbekistan, Kyrgyzstan, and other international study destinations."
    },
    {
      q: "How can I enquire about MBBS admission?",
      a: "Simply complete our online enquiry form with your full name, contact number, NEET qualification status, and destination preference, or send an email to mhglobalmedical@gmail.com. A senior medical admission advisor will examine your academic background and share verified 6-year fee structures and admission timelines."
    }
  ];

  const mapsQuery = encodeURIComponent(
    "G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India"
  );
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] font-sans">
      <SEOHead
        title="Contact MH Global Medical | MBBS Abroad Counselling in Delhi"
        description="Contact MH Global Medical in Shakarpur, New Delhi for MBBS abroad counselling, university selection, admission guidance and student support."
        canonicalUrl={`${siteConfig.siteUrl}/contact`}
        schema={contactPageSchema}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#082653] via-[#0E438D] to-[#1556A0] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#082653]/60">
        <BannerBackground
          image="/collageimages/banner-3.png"
          washGradient="from-[#082653]/85 via-[#0E438D]/80 to-[#1556A0]/85"
        />

        <div className="relative max-w-4xl mx-auto text-center space-y-5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-100 text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" />
            <span>GET IN TOUCH</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Let's Start Your Medical Journey
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed">
            Have questions about studying MBBS abroad? Connect with our experienced counselling team
            for guidance on universities, eligibility, admissions and documentation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() =>
                onOpenLeadModal
                  ? onOpenLeadModal("Talk to Our Counsellor (Contact Hero)")
                  : scrollToForm()
              }
              className="px-6 py-3 rounded-xl bg-[#D71946] hover:bg-[#B8153B] text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 border-b-2 border-[#8F0E2C]"
            >
              <span>Talk to Our Counsellor</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={scrollToForm}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/30 backdrop-blur-xs cursor-pointer"
            >
              Send an Enquiry
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: Contact Cards & Inquiry Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Office Address Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-sm hover:shadow-md transition-shadow space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D9E2EC]">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF3FA] text-[#082653] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#082653]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Visit Our Head Office
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-[#082653]">
                    India Head Office
                  </h2>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block text-xs sm:text-sm text-[#172B4D] hover:text-[#1556A0] leading-relaxed transition-colors"
                  title="Click to view on Google Maps"
                >
                  <p className="font-bold text-[#082653] group-hover:underline">
                    G-4, Maan House, School Block,
                  </p>
                  <p className="text-[#475569]">Shakarpur, New Delhi, Delhi 110092, India</p>
                </a>

                <div className="pt-1">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EBF3FA] hover:bg-[#DCEBF7] text-[#082653] text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#1556A0]" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3 text-[#64748B]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Calling & WhatsApp Helpline Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D9E2EC]">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF3FA] text-[#082653] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#082653]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Direct Calling &amp; WhatsApp
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#082653]">
                    Admissions Helpline
                  </h3>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-[#64748B]">
                  Speak directly with senior medical education advisors or request university brochures on WhatsApp:
                </p>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href="tel:+919310648055"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#082653] hover:bg-[#1556A0] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-200" />
                    <span>Call +91 93106 48055</span>
                  </a>

                  <a
                    href="https://wa.me/919310648055?text=Hello%20MH%20Global%20Medical%2C%20I%20would%20like%20guidance%20regarding%20MBBS%20admissions."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
                    <span>WhatsApp Us</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Official Email Card */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#D9E2EC]">
                <div className="w-11 h-11 rounded-2xl bg-[#EBF3FA] text-[#082653] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#082653]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                    Written Correspondence
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-[#082653]">
                    Official Email
                  </h3>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-[#64748B]">
                  Send admissions queries, eligibility documents, or prospectus requests:
                </p>
                <a
                  href="mailto:mhglobalmedical@gmail.com"
                  className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#1556A0] hover:text-[#082653] hover:underline break-all transition-colors"
                >
                  <span>mhglobalmedical@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Office & Counselling Hours */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-sm space-y-3">
              <div className="flex items-center gap-2.5 text-[#082653]">
                <Clock className="w-4 h-4 text-[#1556A0]" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Counseling & Advisory Hours
                </h4>
              </div>
              <div className="space-y-1.5 text-xs text-[#475569] leading-relaxed">
                <div className="flex items-center justify-between py-1 border-b border-slate-100">
                  <span className="font-semibold text-[#172B4D]">Monday – Saturday:</span>
                  <span className="text-[#082653] font-bold">9:30 AM – 7:00 PM IST</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-semibold text-[#172B4D]">Sunday:</span>
                  <span className="text-slate-500 italic">Online enquiries answered next business day</span>
                </div>
              </div>
            </div>

            {/* Transparency & Regulatory Note */}
            <div className="p-5 rounded-2xl bg-[#EBF3FA]/70 border border-[#D9E2EC] space-y-2">
              <div className="flex items-center gap-2 text-[#082653] font-bold text-xs">
                <ShieldCheck className="w-4 h-4 text-[#1556A0] shrink-0" />
                <span>Ethical Medical Admissions Protocol</span>
              </div>
              <p className="text-[11px] text-[#475569] leading-relaxed">
                MH Global Medical adheres strictly to National Medical Commission (NMC FMGL 2021)
                guidelines. We facilitate direct university fees with zero donation or hidden agent
                margins.
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form – Conversion Focused (7 cols) */}
          <div
            id="inquiry-form"
            className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-[#D9E2EC] shadow-sm scroll-mt-24"
          >
            {submitSuccess ? (
              <div className="text-center py-10 sm:py-14 space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-[#EBF3FA] text-[#082653] rounded-full flex items-center justify-center mx-auto border-2 border-[#1556A0]">
                  <CheckCircle2 className="w-9 h-9 text-[#1556A0]" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl sm:text-2xl font-black text-[#082653]">
                    Enquiry Received Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                    Thank you, <strong className="text-[#082653]">{formData.fullName}</strong>. Our
                    senior medical admissions advisor has received your request and will reach out to
                    you shortly with verified eligibility guidelines, official prospectuses, and
                    detailed 6-year fee structures.
                  </p>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] hover:bg-slate-100 text-[#082653] text-xs font-bold transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="space-y-1.5 pb-2 border-b border-[#D9E2EC]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#D71946]">
                    Direct Admissions Desk
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-[#082653]">
                    Send Us an Enquiry
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    Receive official university prospectuses, 6-year budget breakdowns, and direct
                    admission guidance from senior counsellors.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{submitError}</p>
                  </div>
                )}

                {/* Spam Protection Honeypot (hidden from human view and screen readers) */}
                <div aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="website_hp">Do not fill this field</label>
                  <input
                    id="website_hp"
                    type="text"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={handleChange}
                  />
                </div>

                {/* Row 1: Full Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold text-[#082653] mb-1.5"
                    >
                      Full Name <span className="text-[#D71946]">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                      aria-required="true"
                      aria-invalid={!!formErrors.fullName}
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden transition-all ${
                        formErrors.fullName ? "border-red-400 bg-red-50/30" : "border-[#D9E2EC]"
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold text-[#082653] mb-1.5"
                    >
                      Mobile Number <span className="text-[#D71946]">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleChange}
                        aria-label="Country Code"
                        className="w-20 shrink-0 text-xs sm:text-sm px-2 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] text-[#082653] font-bold focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden cursor-pointer"
                      >
                        <option value="+91">+91 (IN)</option>
                        <option value="+998">+998 (UZ)</option>
                        <option value="+996">+996 (KG)</option>
                        <option value="+971">+971 (AE)</option>
                        <option value="+1">+1 (US)</option>
                      </select>
                      <div className="flex-1">
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder={
                            formData.countryCode === "+91" ? "10-digit number" : "Mobile number"
                          }
                          value={formData.phone}
                          onChange={handleChange}
                          aria-required="true"
                          aria-invalid={!!formErrors.phone}
                          className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden transition-all ${
                            formErrors.phone ? "border-red-400 bg-red-50/30" : "border-[#D9E2EC]"
                          }`}
                        />
                      </div>
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2: Email & Interested In */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold text-[#082653] mb-1.5"
                    >
                      Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!formErrors.email}
                      className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden transition-all ${
                        formErrors.email ? "border-red-400 bg-red-50/30" : "border-[#D9E2EC]"
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="interestedIn"
                      className="block text-xs font-bold text-[#082653] mb-1.5"
                    >
                      Interested In <span className="text-[#D71946]">*</span>
                    </label>
                    <select
                      id="interestedIn"
                      name="interestedIn"
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden cursor-pointer"
                    >
                      <option value="MBBS in Uzbekistan">MBBS in Uzbekistan</option>
                      <option value="MBBS in KYRGYZSTAN">MBBS in KYRGYZSTAN</option>
                      <option value="MBBS in Other Countries">MBBS in Other Countries</option>
                      <option value="General Admission Enquiry">General Admission Enquiry</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: NEET Qualification Status */}
                <div>
                  <label
                    htmlFor="neetStatus"
                    className="block text-xs font-bold text-[#082653] mb-1.5"
                  >
                    NEET Qualification Status
                  </label>
                  <select
                    id="neetStatus"
                    name="neetStatus"
                    value={formData.neetStatus}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden cursor-pointer"
                  >
                    <option value="Qualified (NEET 2024 / 2025 / 2026)">
                      Qualified (NEET 2024 / 2025 / 2026)
                    </option>
                    <option value="Appearing for NEET 2026">Appearing for NEET 2026</option>
                    <option value="Planning for NEET 2027">Planning for NEET 2027</option>
                    <option value="Not Qualified / General Admission Guidance">
                      Not Qualified / General Admission Guidance
                    </option>
                  </select>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold text-[#082653] mb-1.5"
                  >
                    Your Message <span className="text-[#D71946]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your university preference, expected budget, state, or specific questions about hostel, mess, or NMC eligibility..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!formErrors.message}
                    className={`w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border bg-[#F7F9FC] text-[#172B4D] focus:bg-white focus:ring-2 focus:ring-[#1556A0] focus:outline-hidden transition-all resize-y ${
                      formErrors.message ? "border-red-400 bg-red-50/30" : "border-[#D9E2EC]"
                    }`}
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#082653] hover:bg-[#1556A0] text-white font-bold text-xs sm:text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2 border-b-2 border-[#D71946]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Your Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-blue-200" />
                      <span>Submit My Enquiry</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-[#64748B] text-center leading-relaxed">
                  We respect student privacy. Your information is used strictly for admission
                  evaluation and is never shared with third-party marketing firms.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-3xl border border-[#D9E2EC] shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-[#D9E2EC] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1556A0]">
                Interactive Location Map
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-[#082653]">
                Find MH Global Medical in New Delhi
              </h2>
              <p className="text-xs sm:text-sm text-[#475569]">
                G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#082653] hover:bg-[#1556A0] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <Compass className="w-4 h-4 text-blue-200" />
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
              </a>
            </div>
          </div>

          <div className="relative w-full h-[360px] sm:h-[440px] bg-slate-100">
            <iframe
              title="MH Global Medical New Delhi Head Office Location Map"
              src={mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="p-4 sm:p-6 bg-[#F7F9FC] border-t border-[#D9E2EC] text-xs text-[#475569] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D71946] shrink-0" />
              <span>
                <strong>Transit Landmarks:</strong> Located in Shakarpur (East Delhi), easily
                accessible via Delhi Metro Blue Line (Nirman Vihar & Laxmi Nagar stations).
              </span>
            </div>
            <a
              href="mailto:mhglobalmedical@gmail.com"
              className="font-bold text-[#1556A0] hover:underline"
            >
              Need assistance finding us? Email us
            </a>
          </div>
        </div>
      </section>

      {/* Trust & Support Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#D71946]">
            STUDENT-CENTRIC STANDARDS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082653]">
            Comprehensive MBBS Abroad Support
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            From university selection to on-ground arrival in your study destination, our verified
            support framework protects your medical aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trustHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-xs hover:border-[#1556A0]/40 transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#082653] flex items-center justify-center font-bold">
                  <Icon className="w-5 h-5 text-[#082653]" />
                </div>
                <h3 className="text-sm font-bold text-[#082653] leading-snug">{item.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI SEO / GEO / AEO & FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#1556A0]">
            AI SEARCH & STUDENT ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#082653]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B]">
            Quick, factual answers regarding MH Global Medical's office location, consultation
            services, and admissions desk.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#D9E2EC] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#082653] hover:text-[#1556A0] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#EBF3FA] text-[#082653] text-xs flex items-center justify-center shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#1556A0] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#475569] leading-relaxed border-t border-slate-100">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#082653] via-[#0E438D] to-[#1556A0] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-white/10">
          <BannerBackground
            image="/collageimages/banner-1.png"
            washGradient="from-[#082653]/85 via-[#0E438D]/80 to-[#1556A0]/85"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D71946] text-white text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Personalized Medical Admissions
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Your Medical Career Starts With the Right Guidance
            </h2>

            <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
              Speak with our team and take the next step toward your medical education abroad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() =>
                  onOpenLeadModal
                    ? onOpenLeadModal("Get Free Counselling (Contact Bottom CTA)")
                    : scrollToForm()
                }
                className="px-6 py-3 rounded-xl bg-white text-[#082653] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Get Free Counselling
              </button>

              <button
                type="button"
                onClick={scrollToForm}
                className="px-6 py-3 rounded-xl bg-[#D71946] hover:bg-[#B8153B] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer border-b-2 border-[#8F0E2C]"
              >
                Send Your Enquiry
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
