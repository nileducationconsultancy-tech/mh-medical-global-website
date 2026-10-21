import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Calculator,
  ArrowRight,
  Plane,
  Clock,
  Sparkles,
  Award,
  BookOpen,
  DollarSign,
  Utensils,
  MapPin,
  ExternalLink,
  Info
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import { universitiesData, USD_TO_INR_RATE } from "../data/universitiesData";
import { FeeCalculator } from "../components/tools/FeeCalculator";
import { EligibilityChecker } from "../components/tools/EligibilityChecker";
import { DisclaimerBanner } from "../components/common/SourceBadge";
import { siteConfig } from "../config/site";

export function MbbsInUzbekistanPage({ onOpenLeadModal }) {
  const publishedUnis = universitiesData.filter((u) => !u.isDraft);

  const mbbsUzbekistanSchema = [
    {
      "@type": "Course",
      "@id": `${siteConfig.siteUrl}/mbbs-in-uzbekistan#course`,
      "name": "MBBS in Uzbekistan (MD Physician)",
      "description": "6-Year NMC FMGL 2021 compliant English-medium General Medicine degree in recognized government and private medical universities of Uzbekistan.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": siteConfig.brandName,
        "url": siteConfig.siteUrl
      },
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Full-Time On-Campus",
        "courseWorkload": "6 Years (54 Months Coursework + 12 Months Internship)"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.siteUrl}/mbbs-in-uzbekistan#breadcrumb`,
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
          "name": "MBBS in Uzbekistan",
          "item": `${siteConfig.siteUrl}/mbbs-in-uzbekistan`
        }
      ]
    }
  ];

  return (
    <div className="space-y-16 pb-16">
      <SEOHead
        title="MBBS in Uzbekistan 2026: Fees, NMC Rules & Top Colleges"
        description="Complete guide to MBBS in Uzbekistan for Indian students (2026-27). Compare 6-year fees in INR, check NMC FMGL 2021 compliance, hostel food, and admission rules."
        canonicalUrl={`${siteConfig.siteUrl}/mbbs-in-uzbekistan`}
        schema={mbbsUzbekistanSchema}
      />

      {/* Hero Section */}
      <section className="bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <div className="max-w-5xl mx-auto space-y-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Authoritative Medical Education Guide (2026-2027)
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            MBBS in Uzbekistan for Indian Students: Fees, Eligibility & Top Medical Universities
          </h1>

          <p className="text-sm sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed">
            A comprehensive, verified guide on medical universities, 100% English-medium instruction, NMC FMGL 2021 compliance, real 6-year fees in INR & USD, and clinical hospital exposure.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Link
              to="/mbbs-fee-calculator"
              className="px-6 py-3.5 rounded-xl bg-[#9B193A] hover:bg-[#7E142F] text-white font-extrabold text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Calculate 6-Year Fees
            </Link>

            <Link
              to="/mbbs-eligibility"
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#9ABAD9]" />
              Check Eligibility
            </Link>

            <button
              onClick={() => onOpenLeadModal("MBBS in Uzbekistan Guide Counselling")}
              className="px-5 py-3.5 rounded-xl text-[#9ABAD9] hover:text-white text-sm font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
            >
              Request Free Consultation <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Quick Summary Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#475569] font-semibold uppercase">Total Program Duration</span>
            <p className="text-lg sm:text-xl font-extrabold text-[#063280]">6 Years (5+1 Format)</p>
            <p className="text-xs text-[#1558A9]">54 Mo. Course + 12 Mo. Internship</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#475569] font-semibold uppercase">Annual Tuition Range</span>
            <p className="text-lg sm:text-xl font-extrabold text-[#063280]">$3,200 – $3,900 USD</p>
            <p className="text-xs text-[#1558A9]">Approx. ₹2.7L – ₹3.3L / year</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#475569] font-semibold uppercase">Medium of Instruction</span>
            <p className="text-lg sm:text-xl font-extrabold text-[#063280]">100% English Medium</p>
            <p className="text-xs text-[#1558A9]">Dedicated International Faculty</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#475569] font-semibold uppercase">NEET Requirement</span>
            <p className="text-lg sm:text-xl font-extrabold text-[#063280]">Mandatory (Qualified)</p>
            <p className="text-xs text-[#1558A9]">Valid for 3 Years in India</p>
          </div>
        </div>
      </section>

      {/* Main Educational Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section 1: Overview */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 leading-relaxed">
          <h2 className="text-2xl font-black text-[#063280]">
            1. Why Indian Medical Aspirants Are Choosing Uzbekistan
          </h2>
          <p className="text-sm text-[#475569]">
            Over the past five years, Uzbekistan has transformed into the premier medical education hub for Indian students seeking a high-quality, English-medium MBBS degree abroad. With over <strong>10,000+ Indian students</strong> currently studying across Tashkent, Samarkand, Bukhara, and Andijan, the country offers a welcoming environment, state-of-the-art hospitals, and very affordable tuition fees compared to private medical colleges in India.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280]">Government Teaching Hospitals:</span>
              <p className="text-[#475569]">Universities are attached to 500 to 1,500+ bed tertiary government referral centers with high patient flow.</p>
            </div>
            <div className="p-4 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
              <span className="font-bold text-[#063280]">Direct Flight Connectivity:</span>
              <p className="text-[#475569]">Direct 3.5-hour flights between Delhi (DEL) and Tashkent (TAS) make regular vacations seamless.</p>
            </div>
          </div>
        </div>

        {/* Section 2: NMC Regulations */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 leading-relaxed">
          <h2 className="text-2xl font-black text-[#063280]">
            2. Compliance with NMC Foreign Medical Graduate Licentiate (FMGL) Regulations 2021
          </h2>
          <p className="text-sm text-[#475569]">
            The National Medical Commission (NMC) in India mandates strict criteria under the Foreign Medical Graduate Licentiate (FMGL) Gazette dated November 18, 2021. Uzbekistan medical programs are fully aligned with every single parameter:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-[#0F172A]">
            <li><strong>Duration:</strong> 54 months of theoretical & clinical coursework + 12 months in-house clinical internship (Total 6 Years).</li>
            <li><strong>Medium:</strong> 100% English language throughout all 6 years.</li>
            <li><strong>Internship Location:</strong> Mandatory 1-year internship in the same institution / teaching hospital in Uzbekistan.</li>
            <li><strong>Host Country Registration:</strong> Graduates receive registration/license to practice as physicians in Uzbekistan.</li>
          </ul>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Important Clinical Training Clarification:</strong> While all classroom lectures, laboratory sessions, and exams are conducted 100% in English, basic local language (Uzbek/Russian) is taught during early semesters so students can interact smoothly with patients during hospital ward rounds.
            </p>
          </div>
        </div>

        {/* Section 3: Fee Breakdown (Target H2) */}
        <div className="space-y-6">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Transparent Budget Structure
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              Total Fees & Hostel Expense Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Studying MBBS in Uzbekistan is approximately 70% cheaper than private medical colleges in India. The complete 6-year budget ranges from ₹20 Lakhs to ₹26 Lakhs INR including tuition, hostel, and authentic Indian mess food.
            </p>
          </div>

          <FeeCalculator onOpenLeadModal={onOpenLeadModal} />
        </div>

        {/* Section 4: List of Medical Colleges (Target H2) */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
              Accredited Institutions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
              List of Medical Colleges in Uzbekistan for Indian Students
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Explore top government and private medical universities offering recognized 6-year MD Physician programs in Uzbekistan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publishedUnis.map((uni) => (
              <div
                key={uni.id}
                className="p-5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] hover:border-[#063280] transition-colors flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#063280] text-white">
                      {uni.type}
                    </span>
                    <span className="text-xs text-[#475569]">{uni.city}</span>
                  </div>
                  <h3 className="font-bold text-base text-[#063280] mt-2 line-clamp-1">{uni.name}</h3>
                  <p className="text-xs text-[#475569] mt-1">Est. {uni.establishedYear} • {uni.ranking}</p>
                  <p className="text-xs font-bold text-[#1558A9] mt-2">
                    Tuition: ${(uni.fees?.annualTuitionUSD || 0).toLocaleString()}/yr (~₹{Math.round(((uni.fees?.annualTuitionUSD || 0) * USD_TO_INR_RATE) / 100000)}L)
                  </p>
                </div>

                <Link
                  to={`/universities/uzbekistan/${uni.slug}`}
                  className="inline-flex items-center justify-between text-xs font-bold text-[#063280] hover:text-[#1558A9] pt-2 border-t border-[#D9E2EC]"
                >
                  <span>View Details & Fee Structure</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Eligibility Criteria */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-[#063280]">
              Eligibility Criteria for Indian Students (2026 Intake)
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Admission requirements mandated by the Ministry of Higher Education of Uzbekistan and the NMC:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280] text-sm">Age Criteria</span>
              <p className="text-[#475569]">Must complete at least <strong>17 years of age</strong> on or before December 31st of the admission year.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280] text-sm">12th PCB Aggregate</span>
              <p className="text-[#475569]">Minimum <strong>50% in PCB</strong> for General category; minimum <strong>40% in PCB</strong> for OBC/SC/ST categories.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-1">
              <span className="font-extrabold text-[#063280] text-sm">NEET Qualification</span>
              <p className="text-[#475569]">Must have qualified NEET-UG in the current year or within the last 2 years (3-year validity).</p>
            </div>
          </div>

          <div className="pt-2">
            <DisclaimerBanner />
          </div>
        </div>

        {/* Section 6: Comprehensive Internal Linking Grid */}
        <div className="bg-linear-to-br from-[#063280] to-[#1558A9] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9ABAD9]">
              Quick Exploration Grid
            </span>
            <h3 className="text-2xl font-black text-white">
              Explore Uzbekistan MBBS Hubs, Tools & Admissions Portals
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              Access in-depth university profiles, budget calculators, city guides, and official regulatory frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
              <h4 className="font-bold text-[#9ABAD9] text-sm">Top Universities</h4>
              <ul className="space-y-1.5 text-slate-200">
                <li>
                  <Link to="/universities/uzbekistan/tashkent-medical-academy" className="hover:text-white underline">
                    Tashkent Medical Academy Fees
                  </Link>
                </li>
                <li>
                  <Link to="/universities/uzbekistan/samarkand-state-medical-university" className="hover:text-white underline">
                    Samarkand State Medical University
                  </Link>
                </li>
                <li>
                  <Link to="/universities/uzbekistan/bukhara-state-medical-institute" className="hover:text-white underline">
                    Bukhara State Medical Institute
                  </Link>
                </li>
                <li>
                  <Link to="/universities/uzbekistan/andijan-state-medical-institute" className="hover:text-white underline">
                    Andijan State Medical Institute
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
              <h4 className="font-bold text-[#9ABAD9] text-sm">Interactive Tools</h4>
              <ul className="space-y-1.5 text-slate-200">
                <li>
                  <Link to="/mbbs-fee-calculator" className="hover:text-white underline">
                    6-Year MBBS Fee Calculator (INR)
                  </Link>
                </li>
                <li>
                  <Link to="/mbbs-eligibility" className="hover:text-white underline">
                    NEET Eligibility Predictor
                  </Link>
                </li>
                <li>
                  <Link to="/compare-universities" className="hover:text-white underline">
                    Compare Medical Universities
                  </Link>
                </li>
                <li>
                  <Link to="/document-checklist" className="hover:text-white underline">
                    Document Checklist Tracker
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
              <h4 className="font-bold text-[#9ABAD9] text-sm">City Guides</h4>
              <ul className="space-y-1.5 text-slate-200">
                <li>
                  <Link to="/study-mbbs-in-tashkent" className="hover:text-white underline">
                    Study MBBS in Tashkent
                  </Link>
                </li>
                <li>
                  <Link to="/study-mbbs-in-samarkand" className="hover:text-white underline">
                    Study MBBS in Samarkand
                  </Link>
                </li>
                <li>
                  <Link to="/study-mbbs-in-bukhara" className="hover:text-white underline">
                    Study MBBS in Bukhara
                  </Link>
                </li>
                <li>
                  <Link to="/study-mbbs-in-andijan" className="hover:text-white underline">
                    Study MBBS in Andijan
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 space-y-2">
              <h4 className="font-bold text-[#9ABAD9] text-sm">Guidelines & Visa</h4>
              <ul className="space-y-1.5 text-slate-200">
                <li>
                  <Link to="/nmc-guidelines-for-mbbs-abroad" className="hover:text-white underline">
                    NMC FMGL 2021 Rules
                  </Link>
                </li>
                <li>
                  <Link to="/uzbekistan-student-visa" className="hover:text-white underline">
                    Uzbekistan Student Visa Guide
                  </Link>
                </li>
                <li>
                  <Link to="/mbbs-admission-uzbekistan" className="hover:text-white underline">
                    9-Step Admission Procedure
                  </Link>
                </li>
                <li>
                  <Link to="/government-vs-private-medical-universities-uzbekistan" className="hover:text-white underline">
                    Govt vs Private Universities
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
