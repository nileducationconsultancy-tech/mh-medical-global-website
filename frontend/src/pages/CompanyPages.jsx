import React from "react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { siteConfig } from "../config/site";
import {
  Award,
  ShieldCheck
} from "lucide-react";

export { ContactPage } from "./ContactPage";

export function AboutUsPage({ onOpenLeadModal }) {
  const aboutSchema = {
    "@type": "AboutPage",
    "@id": `${siteConfig.siteUrl}/about-us#about`,
    "name": "About MH GLOBAL EDUCATION CONSULTANT",
    "description": "Information about MH GLOBAL EDUCATION CONSULTANT, our leadership, student-centric philosophy, and verified admissions network in Uzbekistan."
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      <SEOHead
        title="About MH GLOBAL EDUCATION CONSULTANT | Leadership & Admissions Network"
        description="Learn about MH GLOBAL EDUCATION CONSULTANT's mission, leadership team, ethical counseling standards, and on-ground student support network in Uzbekistan."
        canonicalUrl={`${siteConfig.siteUrl}/about-us`}
        schema={aboutSchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-2.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Leadership & E-E-A-T Authority
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            About MH GLOBAL EDUCATION CONSULTANT
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Empowering Indian medical aspirants with factual transparency, official university data, and zero misleading promises.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#063280]">Our Core Mission</h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            To provide medical aspirants and parents with an honest, data-backed discovery platform. We believe high-quality medical education should be accessible, transparent, and completely free of hidden financial surprises or unauthorized regulatory claims.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#1558A9] flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-[#063280]">Our Regulatory Commitment</h3>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            We operate in strict adherence to the National Medical Commission (NMC) FMGL Regulations 2021. Every university we counsel for is vetted for 100% English medium coursework, 54-month academic duration, and mandatory 12-month in-house clinical internship.
          </p>
        </div>
      </section>

      {/* On-Ground Support Network */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] p-8 sm:p-10 rounded-3xl text-white space-y-6 border border-[#9ABAD9]/20">
          <h3 className="text-2xl font-bold text-white text-center">
            Dedicated On-Ground Coordinators in Uzbekistan
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 text-center max-w-3xl mx-auto">
            Our relationship does not end at the airport. MH GLOBAL EDUCATION CONSULTANT maintains full-time Indian student coordinators stationed in Tashkent, Samarkand, Bukhara, and Andijan to assist students with hostel issues, university paperwork, and emergency medical care.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <span className="font-bold text-[#9ABAD9]">Tashkent Headquarters</span>
              <p className="text-slate-200">Coordination with TMA, TPMI, CAU, and Ministry of Foreign Affairs.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <span className="font-bold text-[#9ABAD9]">Samarkand Student Cell</span>
              <p className="text-slate-200">Dedicated assistance for SSMU international medical faculty.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-1">
              <span className="font-bold text-[#9ABAD9]">Bukhara & Andijan Desks</span>
              <p className="text-slate-200">Hostel management, Indian mess oversight, and parent updates.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <div className="space-y-12 pb-16 font-sans">
      <SEOHead
        title="Privacy Policy | MH GLOBAL EDUCATION CONSULTANT"
        description="Privacy policy and student data confidentiality practices of MH GLOBAL EDUCATION CONSULTANT."
        canonicalUrl={`${siteConfig.siteUrl}/privacy-policy`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-4.png" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Transparency & Security
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Your personal information and academic records are treated with the highest level of confidentiality.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6 text-xs sm:text-sm text-[#475569] leading-relaxed">
          <div>
            <h3 className="text-lg font-bold text-[#063280] mb-2">1. Information Collection</h3>
            <p>
              We collect information you voluntarily provide, such as student name, contact numbers, email address, NEET score, and educational preferences when you submit consultation requests or eligibility queries.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#063280] mb-2">2. Use of Information</h3>
            <p>
              Your data is solely used to evaluate university eligibility, provide verified fee estimates, assist with admission documents, and facilitate direct communication between you and our certified medical education advisors.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#063280] mb-2">3. Zero Third-Party Selling</h3>
            <p>
              MH GLOBAL EDUCATION CONSULTANT does not sell, rent, or trade student contact information with unauthorized external telemarketing firms. Data is shared exclusively with partner university admissions boards and visa authorities as necessary for enrollment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#063280] mb-2">4. Data Security & Storage</h3>
            <p>
              All digital admissions data is stored securely using encrypted connections and strict access control mechanisms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
