import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Building2,
  BookOpen,
  Sparkles
} from "lucide-react";

export function Footer({ onOpenLeadModal }) {
  return (
    <footer className="bg-[#041B44] text-slate-300 font-sans pt-16 pb-12 border-t border-[#0B2D64]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top CTA Banner inside footer */}
        <div className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] rounded-3xl p-8 sm:p-10 mb-14 text-white shadow-xl relative overflow-hidden border border-[#9ABAD9]/20">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9B193A] text-white text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Guaranteed NMC FMGL 2021 Compliance Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Begin Your Medical Career in Uzbekistan
              </h3>
              <p className="text-slate-200 text-sm max-w-2xl">
                Get impartial university comparisons, itemized 6-year fee structures, and end-to-end admission and visa guidance with zero hidden charges.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link
                to="/mbbs-fee-calculator"
                className="px-5 py-3 rounded-xl bg-white text-[#063280] hover:bg-slate-100 font-bold text-xs sm:text-sm transition-all shadow-md"
              >
                Calculate 6-Yr Budget
              </Link>
              <button
                onClick={() => onOpenLeadModal("Footer Banner Counselling")}
                className="px-5 py-3 rounded-xl bg-[#9B193A] hover:bg-[#7E142F] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
              >
                Talk to Senior Counsellor
              </button>
            </div>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#0B2D64]">
          {/* Brand & Overview */}
          <div className="space-y-4">
            <Link to="/" className="inline-block bg-white px-3 py-2 rounded-xl shadow-md group">
              <img
                src="/mh-medical-logo.webp"
                alt="MH GLOBAL EDUCATION CONSULTANT"
                className="h-12 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>
            <p className="text-xs text-slate-300 leading-relaxed">
              MH GLOBAL EDUCATION CONSULTANT is a dedicated international medical education portal and advisory network. We empower Indian students and parents with verified data, official university circulars, and transparent guidance for studying medicine in Uzbekistan.
            </p>
            <div className="pt-2 text-xs space-y-1.5 text-slate-300">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9ABAD9] shrink-0" />
                <span>NMC (FMGL 2021) & WHO/WDOMS Compliant</span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#9ABAD9] shrink-0" />
                <span>On-Ground Student Support in Tashkent & Samarkand</span>
              </p>
            </div>
          </div>

          {/* Quick Links / Discovery */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#9ABAD9]" />
              Uzbekistan Universities
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/universities/uzbekistan/tashkent-medical-academy" className="hover:text-white transition-colors">
                  Tashkent Medical Academy
                </Link>
              </li>
              <li>
                <Link to="/universities/uzbekistan/samarkand-state-medical-university" className="hover:text-white transition-colors">
                  Samarkand State Medical University
                </Link>
              </li>
              <li>
                <Link to="/universities/uzbekistan/bukhara-state-medical-institute" className="hover:text-white transition-colors">
                  Bukhara State Medical Institute
                </Link>
              </li>
              <li>
                <Link to="/universities/uzbekistan/andijan-state-medical-institute" className="hover:text-white transition-colors">
                  Andijan State Medical Institute
                </Link>
              </li>
              <li>
                <Link to="/universities/uzbekistan/central-asian-university" className="hover:text-white transition-colors">
                  Central Asian University (CAU)
                </Link>
              </li>
              <li>
                <Link to="/government-vs-private-medical-universities-uzbekistan" className="hover:text-white transition-colors text-[#9ABAD9] font-medium">
                  Government vs Private Colleges
                </Link>
              </li>
            </ul>
          </div>

          {/* Interactive Tools & Guides */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#9ABAD9]" />
              Portals & City Guides
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link to="/mbbs-fee-calculator" className="hover:text-white transition-colors">
                  6-Year MBBS Fee Calculator (INR/USD)
                </Link>
              </li>
              <li>
                <Link to="/mbbs-eligibility" className="hover:text-white transition-colors">
                  Live NEET Eligibility Checker
                </Link>
              </li>
              <li>
                <Link to="/compare-universities" className="hover:text-white transition-colors">
                  Multi-University Comparison Tool
                </Link>
              </li>
              <li>
                <Link to="/nmc-guidelines-for-mbbs-abroad" className="hover:text-white transition-colors">
                  NMC FMGL 2021 Rules & NExT Pathway
                </Link>
              </li>
              <li>
                <Link to="/uzbekistan-student-visa" className="hover:text-white transition-colors">
                  Uzbekistan Student Visa Process
                </Link>
              </li>
              <li>
                <Link to="/study-mbbs-in-tashkent" className="hover:text-white transition-colors">
                  Tashkent City Guide
                </Link>
              </li>
              <li>
                <Link to="/study-mbbs-in-samarkand" className="hover:text-white transition-colors">
                  Samarkand City Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Contact & Head Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#9ABAD9]" />
              Head Office & Support
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div>
                <p className="font-semibold text-white">India Office (Admissions HQ):</p>
                <p>Level 4, Medical Education Wing, Connaught Place, New Delhi 110001, India</p>
              </div>
              <div>
                <p className="font-semibold text-white">Uzbekistan Coordinator Office:</p>
                <p>Farabi Street, Olmazor District, Tashkent 100109, Uzbekistan</p>
              </div>
              <div className="pt-1 space-y-1">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-[#9ABAD9] hover:text-white hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  +91 98765 43210 / +91 98123 45678
                </a>
                <a href="mailto:admissions@mhglobaledu.com" className="flex items-center gap-2 text-[#9ABAD9] hover:text-white hover:underline">
                  <Mail className="w-3.5 h-3.5" />
                  admissions@mhglobaledu.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Notice */}
        <div className="mt-8 pt-6 pb-6 text-[11px] text-slate-400 leading-relaxed border-b border-[#0B2D64]">
          <p className="font-semibold text-slate-300 mb-1">
            Official E-E-A-T Compliance & Legal Disclaimer:
          </p>
          <p>
            MH GLOBAL EDUCATION CONSULTANT operates strictly as an academic advisory and student support facilitator. We do NOT guarantee university admissions, visa grants, foreign government licenses, or Indian licensing (NExT/FMGE) examination outcomes. Medical admission is strictly subject to the student fulfilling official university entrance criteria and qualifying NEET-UG under National Medical Commission guidelines. All tuition and hostel fees are payable directly to the respective medical university as per officially published notices.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} MH GLOBAL EDUCATION CONSULTANT. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about-us" className="hover:text-white transition-colors">
              About Us & Leadership
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact & Grievance
            </Link>
            <Link to="/admin" className="hover:text-white transition-colors text-slate-400">
              Admin CRM Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
