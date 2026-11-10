import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Award,
  Globe,
  CheckCircle2,
  Quote,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  Compass,
  PhoneCall,
  UserCheck
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { siteConfig } from "../config/site";
import { aboutUsContent } from "../data/aboutUsData";

export function AboutUsPage({ onOpenLeadModal }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Structured Data (JSON-LD)
  const aboutSchema = [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteConfig.siteUrl}/#organization`,
      "name": aboutUsContent.companyName,
      "legalName": aboutUsContent.legalName,
      "url": siteConfig.siteUrl,
      "logo": `${siteConfig.siteUrl}/mh-medical-logo.webp`,
      "email": siteConfig.email || "mhglobalmedical@gmail.com",
      "telephone": siteConfig.phone || "+91 93106 48055",
      "description": aboutUsContent.whoWeAre.leadParagraph,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": siteConfig.indiaOffice.streetAddress || "G-4, Maan House, School Block, Shakarpur",
        "addressLocality": siteConfig.indiaOffice.addressLocality || "New Delhi",
        "addressRegion": siteConfig.indiaOffice.addressRegion || "Delhi",
        "postalCode": siteConfig.indiaOffice.postalCode || "110092",
        "addressCountry": "IN"
      },
      "founder": {
        "@id": `${siteConfig.siteUrl}/about-us#founder`
      }
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.siteUrl}/about-us#founder`,
      "name": aboutUsContent.founder.name,
      "jobTitle": aboutUsContent.founder.designation,
      "honorificSuffix": aboutUsContent.founder.credentials,
      "image": `${siteConfig.siteUrl}${aboutUsContent.founder.photoUrl}`,
      "worksFor": {
        "@id": `${siteConfig.siteUrl}/#organization`
      },
      "description": `${aboutUsContent.founder.name} is the Founder & Managing Director of MH Global Medical, an MD Physician and international medical education advisor with over a decade of experience guiding Indian medical aspirants.`
    },
    {
      "@type": "AboutPage",
      "@id": `${siteConfig.siteUrl}/about-us#webpage`,
      "url": `${siteConfig.siteUrl}/about-us`,
      "name": "About MH Global Medical | Our Story, Founder & Mission",
      "description": "Discover MH Global Medical, our founder, vision, leadership and commitment to transparent MBBS abroad counselling and student support.",
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
      "@id": `${siteConfig.siteUrl}/about-us#breadcrumb`,
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
          "name": "About Us",
          "item": `${siteConfig.siteUrl}/about-us`
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": `${siteConfig.siteUrl}/about-us#faq`,
      "mainEntity": aboutUsContent.faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    }
  ];

  return (
    <div className="bg-[#F7F9FC] text-[#172B4D] font-sans">
      <SEOHead
        title="About MH Global Medical | Our Story, Founder & Mission"
        description="Discover MH Global Medical, our founder, vision, leadership and commitment to transparent MBBS abroad counselling and student support."
        canonicalUrl={`${siteConfig.siteUrl}/about-us`}
        schema={aboutSchema}
      />

      {/* SECTION 1: HERO – BRAND INTRODUCTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#590907] via-[#480706] to-[#3D0605] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#3D0605]">
        <BannerBackground
          image={aboutUsContent.hero.backgroundImage}
          washGradient="from-[#590907]/85 via-[#480706]/80 to-[#3D0605]/85"
        />

        <div className="relative max-w-4xl mx-auto text-center space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#E8D2B5] text-xs font-bold uppercase tracking-wider border border-white/20 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E8D2B5]" />
            <span>{aboutUsContent.hero.eyebrow}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            {aboutUsContent.hero.heading}
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-100 max-w-2xl mx-auto font-normal leading-relaxed">
            {aboutUsContent.hero.subheading}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={() => scrollToSection("founder-leadership")}
              className="px-6 py-3 rounded-xl bg-[#E8D2B5] hover:bg-white text-[#590907] font-bold text-xs sm:text-sm transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center gap-2 border-b-2 border-[#DEDCD4]"
            >
              <span>{aboutUsContent.hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection("our-story")}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-[#E8D2B5] font-bold text-xs sm:text-sm transition-all border border-white/30 backdrop-blur-xs cursor-pointer"
            >
              {aboutUsContent.hero.secondaryCta}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHO WE ARE */}
      <section id="who-we-are" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#DEDCD4] shadow-sm space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
              {aboutUsContent.whoWeAre.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#201C1A] tracking-tight">
              {aboutUsContent.whoWeAre.heading}
            </h2>
            <p className="text-sm sm:text-base text-[#201C1A] font-medium leading-relaxed">
              {aboutUsContent.whoWeAre.leadParagraph}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-[#77776F] leading-relaxed border-t border-slate-100 pt-6">
            {aboutUsContent.whoWeAre.bodyParagraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Key Facts / Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {aboutUsContent.whoWeAre.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F7F5F0] border border-[#DEDCD4] space-y-1"
              >
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#77776F]">
                  {stat.label}
                </span>
                <p className="text-sm sm:text-base font-black text-[#590907]">{stat.value}</p>
                <p className="text-[11px] text-[#201C1A] font-semibold">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: FOUNDER & LEADERSHIP */}
      <section id="founder-leadership" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-white rounded-3xl border border-[#DEDCD4] shadow-sm overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Desktop Left / Mobile Top: Founder Portrait (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br from-[#590907] via-[#480706] to-[#3D0605] p-1.5 border border-[#E8D2B5]/30">
                <div className="rounded-[22px] overflow-hidden bg-white">
                  <div className="w-full bg-[#F7F5F0] flex items-end justify-center aspect-[4/5] max-h-[420px] overflow-hidden relative">
                    <img
                      src={aboutUsContent.founder.photoUrl}
                      alt={`${aboutUsContent.founder.name} - ${aboutUsContent.founder.designation}`}
                      className="w-full h-full object-contain object-bottom transition-transform duration-300 hover:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.currentTarget.dataset.retried) {
                          e.currentTarget.dataset.retried = "true";
                          e.currentTarget.src = "/founderImg/feeroz_pic.jpg";
                        }
                      }}
                    />
                  </div>

                  <div className="p-5 text-white bg-gradient-to-b from-[#590907] to-[#201C1A] space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-extrabold text-xl text-white tracking-tight leading-tight">
                          {aboutUsContent.founder.name}
                        </h3>
                        <p className="text-xs font-bold text-[#E8D2B5] mt-0.5">
                          {aboutUsContent.founder.credentials}
                        </p>
                      </div>
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#E8D2B5] text-[#590907] shadow-xs shrink-0 tracking-wide uppercase">
                        Leadership
                      </span>
                    </div>
                    <p className="text-xs text-[#ECEDE8]/90 font-medium">
                      {aboutUsContent.founder.designation}
                    </p>
                    <p className="text-[11px] text-[#ECEDE8]/80">
                      {aboutUsContent.founder.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Right / Mobile Bottom: Biography & Editorial Content (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#ECEDE8] text-[#590907] text-xs font-bold uppercase tracking-wider border border-[#DEDCD4]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#590907]" />
                <span>Founder & Managing Director</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A] leading-tight">
                Led by Medical Insight. Driven by Student Advocacy.
              </h2>

              <div className="space-y-3 text-xs sm:text-sm text-[#77776F] leading-relaxed">
                {aboutUsContent.founder.bio.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Founder Pillars of Integrity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {aboutUsContent.founder.keyPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-[#F7F5F0] border border-[#DEDCD4] flex items-start gap-2.5 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#590907] shrink-0 mt-0.5" />
                    <span className="text-[#201C1A] font-medium leading-snug">{pillar}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onOpenLeadModal
                      ? onOpenLeadModal("Founder Advisory Direct Session")
                      : scrollToSection("who-we-are")
                  }
                  className="px-6 py-3 bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-[#E8D2B5]" />
                  <span>Book 1-on-1 Guidance with Founder Desk</span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Sub-block: A Message From Our Founder */}
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#590907] via-[#480706] to-[#3D0605] text-white relative overflow-hidden shadow-md border border-[#E8D2B5]/20">
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                <Quote className="w-6 h-6 text-[#E8D2B5]" />
              </div>
              <div className="space-y-2 flex-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8D2B5]">
                  A Message From Our Founder
                </span>
                <p className="text-sm sm:text-base italic text-slate-100 font-serif leading-relaxed">
                  "{aboutUsContent.founder.founderMessage.quote}"
                </p>
                <div className="pt-1">
                  <p className="text-xs font-bold text-white">
                    {aboutUsContent.founder.founderMessage.signoff}
                  </p>
                  <p className="text-[11px] text-[#E8D2B5]">
                    {aboutUsContent.founder.founderMessage.signoffTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR STORY AND COMPANY JOURNEY */}
      <section id="our-story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
            OUR JOURNEY &amp; MILESTONES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
            How We Built India's Ethical Medical Gateway
          </h2>
          <p className="text-xs sm:text-sm text-[#77776F]">
            From identifying the challenges faced by foreign medical aspirants to pioneering direct
            university transparency and permanent on-ground pastoral care.
          </p>
        </div>

        <div className="relative">
          {/* Vertical Timeline Rule */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#DEDCD4] -translate-x-1/2" />

          <div className="space-y-8">
            {aboutUsContent.milestones.map((m, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full md:w-1/2 md:px-8">
                    <div className="bg-white p-6 rounded-3xl border border-[#DEDCD4] shadow-xs hover:shadow-md transition-shadow space-y-2">
                      <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#590907] bg-[#ECEDE8] px-3 py-1 rounded-full">
                        {m.year}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#201C1A]">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#77776F] leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#590907] text-[#E8D2B5] items-center justify-center text-xs font-bold border-4 border-white shadow-sm z-10">
                    {idx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: MISSION, VISION AND CORE VALUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Mission Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECEDE8] text-[#590907] flex items-center justify-center font-bold">
              <Compass className="w-6 h-6 text-[#590907]" />
            </div>
            <h3 className="text-xl font-bold text-[#201C1A]">{aboutUsContent.mission.title}</h3>
            <p className="text-xs sm:text-sm text-[#77776F] leading-relaxed">
              {aboutUsContent.mission.description}
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white p-8 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#ECEDE8] text-[#590907] flex items-center justify-center font-bold">
              <Globe className="w-6 h-6 text-[#590907]" />
            </div>
            <h3 className="text-xl font-bold text-[#201C1A]">{aboutUsContent.vision.title}</h3>
            <p className="text-xs sm:text-sm text-[#77776F] leading-relaxed">
              {aboutUsContent.vision.description}
            </p>
          </div>
        </div>

        {/* 4 Core Values */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-6">
          <div className="max-w-2xl space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
              ORGANIZATIONAL PRINCIPLES
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#201C1A]">
              Our Non-Negotiable Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {aboutUsContent.values.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#F7F5F0] border border-[#DEDCD4] space-y-2 hover:border-[#590907]/40 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-[#ECEDE8] text-[#590907] flex items-center justify-center text-xs font-bold">
                  0{idx + 1}
                </div>
                <h4 className="text-sm font-bold text-[#201C1A]">{val.title}</h4>
                <p className="text-xs text-[#77776F] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: INTERNATIONAL PRESENCE & ON-GROUND OPERATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
            GLOBAL OPERATIONS &amp; COORDINATION
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
            {aboutUsContent.internationalPresence.heading}
          </h2>
          <p className="text-xs sm:text-sm text-[#77776F]">
            {aboutUsContent.internationalPresence.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutUsContent.internationalPresence.locations.map((loc, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#DEDCD4] shadow-xs hover:shadow-md transition-shadow space-y-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#590907] shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#590907]">
                  {loc.role}
                </span>
              </div>
              <h3 className="text-base font-black text-[#201C1A]">{loc.city}</h3>
              <p className="text-[11px] font-semibold text-[#77776F]">{loc.address}</p>
              <p className="text-xs text-[#77776F] leading-relaxed pt-1 border-t border-slate-100">
                {loc.details}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: OUR TEAM & OPERATIONAL CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
              ORGANIZATIONAL CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
              Specialized Departments Working for Student Success
            </h2>
            <p className="text-xs sm:text-sm text-[#77776F]">
              From medical curriculum evaluation to visa stamping and hostel check-in, our
              structured teams ensure frictionless admission processing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutUsContent.teamStructure.map((team, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F7F5F0] border border-[#DEDCD4] space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#ECEDE8] text-[#590907] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5 text-[#590907]" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#590907]">
                  {team.category}
                </span>
                <h3 className="text-sm font-bold text-[#201C1A]">{team.title}</h3>
                <p className="text-xs text-[#77776F] leading-relaxed">{team.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: WHAT MAKES US DIFFERENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
            AUTHENTIC DIFFERENTIATORS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
            Why Indian Families Choose MH Global Medical
          </h2>
          <p className="text-xs sm:text-sm text-[#77776F]">
            Data-backed truth, direct financial transparency, and genuine on-ground student advocacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aboutUsContent.differentiators.map((diff, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-[#DEDCD4] shadow-xs hover:border-[#590907]/40 transition-colors space-y-2.5"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#590907] shrink-0" />
                <h3 className="text-sm font-bold text-[#201C1A]">{diff.title}</h3>
              </div>
              <p className="text-xs text-[#77776F] leading-relaxed pl-6">{diff.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9: TRUST AND COMPLIANCE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="bg-[#ECEDE8]/80 p-8 sm:p-10 rounded-3xl border border-[#DEDCD4] space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#590907] text-xs font-bold uppercase tracking-wider border border-[#DEDCD4]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#590907]" />
              <span>Legal, Regulatory &amp; Advisory Boundary</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#201C1A]">
              {aboutUsContent.trustAndCompliance.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#77776F]">
              {aboutUsContent.trustAndCompliance.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#77776F] leading-relaxed">
            {aboutUsContent.trustAndCompliance.points.map((pt, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-[#DEDCD4] space-y-2">
                <h4 className="font-bold text-xs sm:text-sm text-[#590907]">{pt.title}</h4>
                <p>{pt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: STUDENT STORIES AND EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
            AUTHENTIC STUDENT EXPERIENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
            Voices from Medical Campuses
          </h2>
          <p className="text-xs sm:text-sm text-[#77776F]">
            Real accounts from Indian medical students and clinical interns studying across premier
            Uzbekistan medical academies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutUsContent.testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#DEDCD4] shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-[#590907]/40" />
                <p className="text-xs text-[#77776F] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold text-[#201C1A]">{t.name}</h4>
                <p className="text-[11px] text-[#590907] font-semibold">{t.title}</p>
                <p className="text-[11px] text-[#77776F]">{t.university}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Hometown: {t.hometown}</span>
                  <span className="font-bold text-emerald-700">{t.neetScore}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: AI SEO / GEO / AEO & FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="text-center space-y-2 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#590907]">
            AI SEARCH &amp; INSTITUTIONAL ANSWERS
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#201C1A]">
            Frequently Asked Questions About MH Global Medical
          </h2>
          <p className="text-xs sm:text-sm text-[#77776F]">
            Verified, factual answers regarding our organization, leadership, operations, and
            student support framework.
          </p>
        </div>

        <div className="space-y-3">
          {aboutUsContent.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#DEDCD4] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#201C1A] hover:text-[#590907] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#ECEDE8] text-[#590907] text-xs flex items-center justify-center shrink-0">
                      Q{index + 1}
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#590907] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#77776F] leading-relaxed border-t border-slate-100">
                    <p className="mt-3">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-r from-[#590907] via-[#480706] to-[#3D0605] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden border border-white/10">
          <BannerBackground
            image="/collageimages/banner-1.png"
            washGradient="from-[#590907]/85 via-[#480706]/80 to-[#3D0605]/85"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E8D2B5] text-[#590907] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              Trusted Medical Admissions Advisory
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Your Future Deserves the Right Guidance.
            </h2>

            <p className="text-xs sm:text-sm text-slate-100 max-w-xl mx-auto leading-relaxed">
              Connect with MH Global Medical and explore the opportunities available for your
              medical education abroad.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              <button
                type="button"
                onClick={() =>
                  onOpenLeadModal
                    ? onOpenLeadModal("Get Free Counselling (About Us Bottom CTA)")
                    : scrollToSection("who-we-are")
                }
                className="px-6 py-3 rounded-xl bg-[#E8D2B5] text-[#590907] hover:bg-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Get Free Counselling
              </button>

              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer border-b-2 border-[#3D0605]"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;
