import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Calculator,
  CheckCircle2,
  Scale,
  FileCheck2,
  Building2,
  BookOpen,
  PhoneCall,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Globe
} from "lucide-react";
import { siteConfig } from "../../config/site";

export function Navbar({ onOpenLeadModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isPhonePlaceholder = !siteConfig.phone || siteConfig.phone.startsWith("TODO_REPLACE");

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#D9E2EC] shadow-xs font-sans">
      {/* Top Bar with Helpline & NMC Badge */}
      <div className="bg-[#9B193A] text-white text-xs py-1.5 px-4 border-b border-[#821430]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 text-white text-[11px]">
            <span className="inline-flex items-center gap-1 bg-white text-[#9B193A] px-2 py-0.5 rounded font-bold text-[10px] tracking-wide uppercase shadow-xs">
              <Sparkles className="w-3 h-3 text-[#9B193A]" />
              2026-2027 Admissions Open
            </span>
            <span className="hidden md:inline text-red-50 font-medium">
              NMC FMGL 2021 Compliant • 100% English Medium • Government Medical Universities in Uzbekistan
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-red-100">
            {!isPhonePlaceholder ? (
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-white transition-colors flex items-center gap-1 font-bold text-white"
              >
                <PhoneCall className="w-3 h-3 text-white" />
                <span>Call / WhatsApp: {siteConfig.phoneDisplay}</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onOpenLeadModal("Navbar Top Helpline")}
                className="hover:text-white transition-colors flex items-center gap-1 font-bold text-white cursor-pointer"
              >
                <PhoneCall className="w-3 h-3 text-white" />
                <span>Admissions Helpline (24/7)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Official Brand Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center shrink-0 group focus:outline-hidden py-1"
          >
            <img
              src="/mh-medical-logo.webp"
              alt="MH GLOBAL EDUCATION CONSULTANT"
              className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 text-[13px] font-semibold text-[#0F172A] whitespace-nowrap">
            {/* 1. Home (Pill Style) */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `whitespace-nowrap px-3.5 py-1.5 rounded-full transition-all duration-200 font-bold ${
                  isActive
                    ? "bg-[#063280] text-white shadow-sm"
                    : "text-[#0F172A] hover:text-[#063280] hover:bg-[#EBF3FA]"
                }`
              }
            >
              Home
            </NavLink>

            {/* 2. MBBS Abroad Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("abroad")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  dropdownOpen === "abroad" || location.pathname.includes("/universities") || location.pathname === "/mbbs-in-uzbekistan"
                    ? "text-[#063280] font-bold bg-[#EBF3FA]"
                    : "hover:text-[#063280] hover:bg-[#EBF3FA]"
                }`}
              >
                <span>MBBS Abroad</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 text-[#063280]" />
              </button>

              {dropdownOpen === "abroad" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    to="/mbbs-in-uzbekistan"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#EBF3FA] hover:bg-blue-100/70 transition-colors text-[#063280] font-bold"
                  >
                    <Building2 className="w-4 h-4 text-[#063280] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#063280] font-bold">MBBS in Uzbekistan (Primary Focus)</p>
                      <p className="text-[#475569] text-[11px] font-normal">NMC FMGL 2021 Approved 6-Year Course</p>
                    </div>
                  </Link>

                  <div className="my-1 border-t border-[#D9E2EC]"></div>

                  <Link
                    to="/universities/uzbekistan"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#063280] font-bold hover:text-[#1558A9]"
                  >
                    All Uzbekistan Universities Directory →
                  </Link>

                  <Link
                    to="/universities/uzbekistan/tashkent-medical-academy"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#475569] hover:text-[#063280]"
                  >
                    Tashkent Medical Academy (Rank #1 Govt)
                  </Link>

                  <Link
                    to="/universities/uzbekistan/samarkand-state-medical-university"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#475569] hover:text-[#063280]"
                  >
                    Samarkand State Medical University
                  </Link>

                  <Link
                    to="/universities/uzbekistan/bukhara-state-medical-institute"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#475569] hover:text-[#063280]"
                  >
                    Bukhara State Medical Institute
                  </Link>

                  <Link
                    to="/universities/uzbekistan/andijan-state-medical-institute"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#475569] hover:text-[#063280]"
                  >
                    Andijan State Medical Institute
                  </Link>

                  <Link
                    to="/universities/uzbekistan/central-asian-university"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#EBF3FA] text-[#475569] hover:text-[#063280]"
                  >
                    Central Asian University (CAU)
                  </Link>

                  <div className="my-1 border-t border-[#D9E2EC]"></div>

                  <Link
                    to="/compare-universities"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#EBF3FA] text-[#9B193A] font-bold"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#9B193A] shrink-0" />
                    <span>Compare Top Universities</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Fees & Eligibility */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("fees")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className={`whitespace-nowrap flex items-center gap-1 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  location.pathname === "/mbbs-fee-calculator" || location.pathname === "/mbbs-eligibility"
                    ? "text-[#063280] font-bold bg-[#EBF3FA]"
                    : "hover:text-[#063280] hover:bg-[#EBF3FA]"
                }`}
              >
                <span>Fees & Eligibility</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 text-[#063280]" />
              </button>

              {dropdownOpen === "fees" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#D9E2EC] p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    to="/mbbs-fee-calculator"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EBF3FA] text-[#0F172A] font-semibold"
                  >
                    <Calculator className="w-4 h-4 text-[#063280] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#063280]">6-Year Fee Calculator</p>
                      <p className="text-[11px] text-[#475569] font-normal">Calculate total USD & INR budget</p>
                    </div>
                  </Link>

                  <Link
                    to="/mbbs-eligibility"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EBF3FA] text-[#0F172A] font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1558A9] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#063280]">NEET Eligibility Checker</p>
                      <p className="text-[11px] text-[#475569] font-normal">Instant NMC rule evaluation</p>
                    </div>
                  </Link>

                  <Link
                    to="/document-checklist"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#EBF3FA] text-[#0F172A] font-semibold"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#9B193A] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-bold text-[#063280]">Document Checklist</p>
                      <p className="text-[11px] text-[#475569] font-normal">Apostille & Visa readiness</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. About Us */}
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#063280] hover:bg-[#EBF3FA] ${
                  isActive ? "text-[#063280] font-bold bg-[#EBF3FA]" : ""
                }`
              }
            >
              About Us
            </NavLink>

            {/* 5. Blogs */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#063280] hover:bg-[#EBF3FA] ${
                  isActive ? "text-[#063280] font-bold bg-[#EBF3FA]" : ""
                }`
              }
            >
              Blogs
            </NavLink>

            {/* 6. Privacy Policy */}
            <NavLink
              to="/privacy-policy"
              className={({ isActive }) =>
                `whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#063280] hover:bg-[#EBF3FA] ${
                  isActive ? "text-[#063280] font-bold bg-[#EBF3FA]" : ""
                }`
              }
            >
              Privacy Policy
            </NavLink>

            {/* 7. Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `whitespace-nowrap px-2.5 py-1.5 rounded-lg transition-colors hover:text-[#063280] hover:bg-[#EBF3FA] ${
                  isActive ? "text-[#063280] font-bold bg-[#EBF3FA]" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right Action Trigger / Free Counselling Button */}
          <div className="hidden 2xl:flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenLeadModal("Header Free Counselling Button")}
              className="whitespace-nowrap px-4 py-2.5 rounded-xl bg-[#063280] hover:bg-[#1558A9] text-white font-bold text-xs tracking-wide transition-all duration-200 shadow-sm shadow-blue-950/20 cursor-pointer flex items-center gap-1.5 border-b-2 border-[#9B193A]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#9ABAD9] shrink-0" />
              <span>Free Counselling</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => onOpenLeadModal("Mobile Header Free Counselling")}
              className="px-3 py-1.5 rounded-lg bg-[#063280] hover:bg-[#1558A9] text-white font-bold text-xs shadow-xs"
            >
              Apply
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#063280] hover:bg-[#EBF3FA] transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#D9E2EC] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#D9E2EC]">
            <Link
              to="/mbbs-fee-calculator"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7FAFC] text-xs font-bold text-[#063280] border border-[#D9E2EC]"
            >
              <Calculator className="w-4 h-4 text-[#063280]" />
              <span>Fee Calculator</span>
            </Link>
            <Link
              to="/mbbs-eligibility"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7FAFC] text-xs font-bold text-[#063280] border border-[#D9E2EC]"
            >
              <CheckCircle2 className="w-4 h-4 text-[#1558A9]" />
              <span>Eligibility</span>
            </Link>
          </div>

          <div className="space-y-1 text-sm font-semibold text-[#0F172A]">
            <Link
              to="/"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg bg-[#EBF3FA] text-[#063280] font-bold"
            >
              Home
            </Link>
            <Link
              to="/mbbs-in-uzbekistan"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              MBBS in Uzbekistan
            </Link>
            <Link
              to="/universities/uzbekistan"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#1558A9] font-bold"
            >
              All Universities Directory
            </Link>
            <Link
              to="/compare-universities"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#9B193A] font-bold"
            >
              Compare Universities
            </Link>

            <Link
              to="/document-checklist"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              Document Checklist & Visa
            </Link>
            <Link
              to="/about-us"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              Blogs & Knowledge Hub
            </Link>
            <Link
              to="/privacy-policy"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              Privacy Policy
            </Link>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#EBF3FA] text-[#0F172A] hover:text-[#063280]"
            >
              Contact Us
            </Link>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal("Mobile Menu Free Consultation");
              }}
              className="w-full py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-center shadow-md cursor-pointer transition-colors border-b-2 border-[#9B193A]"
            >
              Book Free 1-on-1 Counselling
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
