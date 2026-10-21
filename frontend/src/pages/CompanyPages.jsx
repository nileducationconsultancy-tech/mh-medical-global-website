import React, { useState } from "react";
import SEOHead from "../components/common/SEOHead";
import { siteConfig } from "../config/site";
import { track } from "../utils/analytics";
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Users,
  Send,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { submitToGoogleSheet } from "../services/googleSheetService";

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
      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
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

export function ContactPage({ onOpenLeadModal }) {
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    subject: "General Admission Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    track("lead_form_submitted", { source: "Contact Us Page Form", city: contactForm.city });
    track("generate_lead", { source: "Contact Us Page Form" });
    await submitToGoogleSheet({
      name: contactForm.name,
      phone: contactForm.phone,
      email: contactForm.email,
      city: contactForm.city,
      message: `${contactForm.subject}: ${contactForm.message}`,
      source: "Contact Us Page Form"
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      <SEOHead
        title="Contact MH GLOBAL EDUCATION CONSULTANT | Admissions Desks"
        description="Get in touch with MH GLOBAL EDUCATION CONSULTANT. Contact our admissions desk in New Delhi or our student support coordinators in Tashkent, Uzbekistan."
        canonicalUrl={`${siteConfig.siteUrl}/contact`}
      />

      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            Direct Communication
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Contact Our Admissions Team
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Visit our offices in India and Uzbekistan or connect directly with an MBBS abroad specialist.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6 text-xs">
          <div>
            <h3 className="text-lg font-black text-[#063280] mb-1">Our Offices</h3>
            <p className="text-[#475569]">Walk in for in-person document counselling.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280] text-sm">India Admissions HQ (New Delhi):</span>
              <p className="text-[#475569]">{siteConfig.indiaOffice.streetAddress}, {siteConfig.indiaOffice.addressLocality} {siteConfig.indiaOffice.postalCode}, India</p>
              <p className="text-[#063280] font-bold pt-1">Helpline: {siteConfig.phoneDisplay}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280] text-sm">Uzbekistan Coordinator Office:</span>
              <p className="text-[#475569]">Farabi Street, Olmazor District, Tashkent 100109, Uzbekistan</p>
              <p className="text-[#063280] font-bold pt-1">Tel: {siteConfig.uzbekistanOffice.phone}</p>
            </div>
          </div>

          <div className="pt-2 space-y-2 border-t border-[#D9E2EC]">
            <p className="font-bold text-[#063280]">Email Inquiries:</p>
            <p className="text-[#1558A9] font-semibold">{siteConfig.email}</p>
            <p className="text-[#475569]">Operating Hours: {siteConfig.indiaOffice.operatingHours}</p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 bg-[#EBF3FA] text-[#063280] rounded-full flex items-center justify-center mx-auto border-2 border-[#063280]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#063280]">Message Received!</h4>
              <p className="text-xs text-[#475569] max-w-sm mx-auto">
                Thank you for contacting MH GLOBAL EDUCATION CONSULTANT. One of our senior admission advisors will call you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-lg font-black text-[#063280]">Send Us an Inquiry</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#063280] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#063280] mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#063280] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#063280] mb-1">City / State</label>
                  <input
                    type="text"
                    value={contactForm.city}
                    onChange={(e) => setContactForm({ ...contactForm, city: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#063280] mb-1">Inquiry Topic</label>
                <select
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] text-[#0F172A]"
                >
                  <option value="General Admission Inquiry">General Admission Inquiry</option>
                  <option value="TMA / SSMU University Prospectus">TMA / SSMU University Prospectus</option>
                  <option value="NMC FMGL Compliance Query">NMC FMGL Compliance Query</option>
                  <option value="Hostel & Indian Mess Inquiry">Hostel & Indian Mess Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#063280] mb-1">Your Message</label>
                <textarea
                  rows={3}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="How can we assist you?"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#9B193A]"
              >
                <Send className="w-4 h-4 text-[#9ABAD9]" />
                Submit Inquiry
              </button>
            </form>
          )}
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

      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-4xl mx-auto text-center space-y-3">
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
