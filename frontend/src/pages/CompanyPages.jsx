import React from "react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { siteConfig } from "../config/site";

export { AboutUsPage } from "./AboutUsPage";
export { ContactPage } from "./ContactPage";

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
