import React, { useState, useEffect, useRef } from "react";
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
  Globe,
  Search,
  ArrowRight,
  ShieldCheck,
  Landmark,
  Phone
} from "lucide-react";
import { siteConfig } from "../../config/site";
import { track } from "../../utils/analytics";

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
    </svg>
  );
}

export function Navbar({ onOpenLeadModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const displayPhone =
    !siteConfig.phone || siteConfig.phone.startsWith("TODO_REPLACE")
      ? "+91 93106 48055"
      : siteConfig.phoneDisplay || siteConfig.phone;

  const phoneLink =
    !siteConfig.phone || siteConfig.phone.startsWith("TODO_REPLACE")
      ? "tel:+919310648055"
      : `tel:${siteConfig.phone}`;

  // Close dropdowns on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
    setSearchOpen(false);
  }, [location?.pathname]);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  const searchableLinks = [
    { title: "Tashkent Medical Academy (Rank #1 Government)", url: "/universities/uzbekistan/tashkent-medical-academy", category: "Universities" },
    { title: "Samarkand State Medical University", url: "/universities/uzbekistan/samarkand-state-medical-university", category: "Universities" },
    { title: "Bukhara State Medical Institute", url: "/universities/uzbekistan/bukhara-state-medical-institute", category: "Universities" },
    { title: "Andijan State Medical Institute", url: "/universities/uzbekistan/andijan-state-medical-institute", category: "Universities" },
    { title: "Central Asian University (CAU)", url: "/universities/uzbekistan/central-asian-university", category: "Universities" },
    { title: "6-Year MBBS Fee Calculator (USD & INR)", url: "/mbbs-fee-calculator", category: "Tools" },
    { title: "NEET Eligibility Evaluation Checker", url: "/mbbs-eligibility", category: "Tools" },
    { title: "Compare Top Medical Universities", url: "/compare-universities", category: "Tools" },
    { title: "Admission Document Checklist & Visa Readiness", url: "/document-checklist", category: "Guides" },
    { title: "About MH Global Education Consultant", url: "/about-us", category: "Company" },
    { title: "Contact Admissions Desk (New Delhi & Tashkent)", url: "/contact", category: "Company" }
  ];

  const filteredSearchResults = searchQuery.trim()
    ? searchableLinks.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : searchableLinks.slice(0, 5);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#DEDCD4] shadow-2xs font-sans">
      {/* 1. SLIM CHARCOAL & BURGUNDY ANNOUNCEMENT BAR (Height ~48-52px) */}
      <div className="bg-[#201C1A] text-white text-xs py-2.5 px-4 sm:px-6 lg:px-8 border-b border-[#3D0605]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left Claims & Compliance Highlights */}
          <div className="flex items-center gap-2 sm:gap-3 text-white text-[11px] sm:text-xs overflow-hidden whitespace-nowrap">
            <div className="inline-flex items-center gap-1.5 font-bold text-[#E8D2B5] shrink-0">
              <GraduationCap className="w-3.5 h-3.5 text-[#E8D2B5] shrink-0" />
              <span>2026–2027 Admissions Open</span>
            </div>

            <span className="text-white/30 hidden md:inline shrink-0">|</span>

            <div className="hidden md:inline-flex items-center gap-1.5 text-slate-200 font-medium shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>NMC FMGL 2021 Compliant</span>
            </div>

            <span className="text-white/30 hidden lg:inline shrink-0">|</span>

            <div className="hidden lg:inline-flex items-center gap-1.5 text-slate-200 font-medium shrink-0">
              <Globe className="w-3.5 h-3.5 text-[#E8D2B5] shrink-0" />
              <span>100% English Medium</span>
            </div>

            <span className="text-white/30 hidden xl:inline shrink-0">|</span>

            <div className="hidden xl:inline-flex items-center gap-1.5 text-slate-200 font-medium shrink-0">
              <Building2 className="w-3.5 h-3.5 text-[#A5A79B] shrink-0" />
              <span>Government Medical Universities in Uzbekistan</span>
            </div>
          </div>

          {/* Right Helpline & Burgundy Enquire CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={phoneLink}
              className="flex items-center gap-2 text-right group hover:opacity-90 transition-opacity"
              title="Call Admissions Helpline"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white/20 transition-colors">
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="hidden sm:block text-left leading-tight">
                <span className="text-[10px] text-[#A5A79B] block font-semibold uppercase tracking-wider">
                  Admissions Helpline (24/7)
                </span>
                <span className="text-xs font-black text-white tracking-wide">
                  {displayPhone}
                </span>
              </div>
            </a>

            <button
              type="button"
              onClick={() => onOpenLeadModal("Top Bar Enquire Now")}
              className="bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] border border-[#E8D2B5]/30 text-[11px] sm:text-xs font-black px-3.5 sm:px-4 py-1.5 rounded-full shadow-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer shrink-0"
            >
              <span>Enquire Now</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER (Height ~95-105px) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22 sm:h-24 md:h-26 gap-4">
          {/* Left: Official Brand Logo */}
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center shrink-0 group focus:outline-hidden py-1"
          >
            <img
              src="/mh-medical-logo.webp"
              alt="MH GLOBAL EDUCATION CONSULTANT"
              className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 text-[13px] font-bold text-[#201C1A] whitespace-nowrap">
            {/* 1. Home (Pill Style) */}
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 font-extrabold ${
                  isActive
                    ? "bg-[#590907] text-[#E8D2B5] shadow-xs"
                    : "text-[#201C1A] hover:text-[#590907] hover:bg-[#ECEDE8]"
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
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  dropdownOpen === "abroad" ||
                  location.pathname.includes("/universities") ||
                  location.pathname === "/mbbs-in-uzbekistan"
                    ? "text-[#590907] font-extrabold bg-[#ECEDE8]"
                    : "hover:text-[#590907] hover:bg-[#ECEDE8]"
                }`}
              >
                <span>MBBS Abroad</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 text-[#590907]" />
              </button>

              {dropdownOpen === "abroad" && (
                <div className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-[#DEDCD4] p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    to="/mbbs-in-uzbekistan"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#ECEDE8] hover:bg-[#E8D2B5]/50 transition-colors text-[#201C1A] font-bold"
                  >
                    <Building2 className="w-4 h-4 text-[#590907] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[#201C1A] font-extrabold">MBBS in Uzbekistan (Primary Focus)</p>
                      <p className="text-[#77776F] text-[11px] font-normal">NMC FMGL 2021 Approved 6-Year Course</p>
                    </div>
                  </Link>

                  <div className="my-1 border-t border-[#DEDCD4]"></div>

                  <Link
                    to="/universities/uzbekistan"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#ECEDE8] text-[#590907] font-bold"
                  >
                    All Uzbekistan Universities Directory →
                  </Link>

                  <Link
                    to="/universities/uzbekistan/tashkent-medical-academy"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#ECEDE8] text-[#201C1A] hover:text-[#590907]"
                  >
                    Tashkent Medical Academy (Rank #1 Govt)
                  </Link>

                  <Link
                    to="/universities/uzbekistan/samarkand-state-medical-university"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#ECEDE8] text-[#201C1A] hover:text-[#590907]"
                  >
                    Samarkand State Medical University
                  </Link>

                  <Link
                    to="/universities/uzbekistan/bukhara-state-medical-institute"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#ECEDE8] text-[#201C1A] hover:text-[#590907]"
                  >
                    Bukhara State Medical Institute
                  </Link>

                  <Link
                    to="/universities/uzbekistan/andijan-state-medical-institute"
                    onClick={() => setDropdownOpen(null)}
                    className="block p-2 rounded-lg hover:bg-[#ECEDE8] text-[#201C1A] hover:text-[#590907]"
                  >
                    Andijan State Medical Institute
                  </Link>

                  <div className="my-1 border-t border-[#DEDCD4]"></div>

                  <Link
                    to="/compare-universities"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#ECEDE8] text-[#590907] font-extrabold"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#590907] shrink-0" />
                    <span>Compare Top Universities</span>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Fees & Eligibility Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("fees")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  location.pathname === "/mbbs-fee-calculator" ||
                  location.pathname === "/mbbs-eligibility"
                    ? "text-[#590907] font-extrabold bg-[#ECEDE8]"
                    : "hover:text-[#590907] hover:bg-[#ECEDE8]"
                }`}
              >
                <span>Fees & Eligibility</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 text-[#590907]" />
              </button>

              {dropdownOpen === "fees" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#DEDCD4] p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    to="/mbbs-fee-calculator"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#ECEDE8] text-[#201C1A] font-semibold"
                  >
                    <Calculator className="w-4 h-4 text-[#590907] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-[#201C1A]">6-Year Fee Calculator</p>
                      <p className="text-[11px] text-[#77776F] font-normal">Calculate total USD & INR budget</p>
                    </div>
                  </Link>

                  <Link
                    to="/mbbs-eligibility"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#ECEDE8] text-[#201C1A] font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-[#201C1A]">NEET Eligibility Checker</p>
                      <p className="text-[11px] text-[#77776F] font-normal">Instant NMC rule evaluation</p>
                    </div>
                  </Link>

                  <Link
                    to="/document-checklist"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#ECEDE8] text-[#201C1A] font-semibold"
                  >
                    <FileCheck2 className="w-4 h-4 text-[#590907] mt-0.5 shrink-0" />
                    <div>
                      <p className="font-extrabold text-[#201C1A]">Document Checklist</p>
                      <p className="text-[11px] text-[#77776F] font-normal">Apostille & Visa readiness</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Countries Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen("countries")}
              onMouseLeave={() => setDropdownOpen(null)}
            >
              <button
                className={`whitespace-nowrap flex items-center gap-1 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  dropdownOpen === "countries"
                    ? "text-[#590907] font-extrabold bg-[#ECEDE8]"
                    : "hover:text-[#590907] hover:bg-[#ECEDE8]"
                }`}
              >
                <span>Countries</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70 shrink-0 text-[#590907]" />
              </button>

              {dropdownOpen === "countries" && (
                <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[#DEDCD4] p-2 text-xs animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <Link
                    to="/mbbs-in-uzbekistan"
                    onClick={() => setDropdownOpen(null)}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#ECEDE8] hover:bg-[#E8D2B5]/50 text-[#201C1A] font-extrabold"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">🇺🇿</span>
                      <span>Uzbekistan</span>
                    </div>
                    <span className="text-[10px] bg-[#590907] text-[#E8D2B5] px-2 py-0.5 rounded-full font-bold">
                      Primary
                    </span>
                  </Link>

                  <div className="my-1 border-t border-[#DEDCD4]"></div>

                  <div className="p-2 space-y-1 text-[#77776F] font-medium text-[11px]">
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F7F5F0]">
                      <span className="flex items-center gap-2"><span>🇰🇿</span> Kazakhstan</span>
                      <span className="text-[#A5A79B] text-[10px]">Govt Academies</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F7F5F0]">
                      <span className="flex items-center gap-2"><span>🇰🇬</span> Kyrgyzstan</span>
                      <span className="text-[#A5A79B] text-[10px]">Bishkek & Osh</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F7F5F0]">
                      <span className="flex items-center gap-2"><span>🇷🇺</span> Russia</span>
                      <span className="text-[#A5A79B] text-[10px]">Federal Unis</span>
                    </div>
                    <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-[#F7F5F0]">
                      <span className="flex items-center gap-2"><span>🇬🇪</span> Georgia</span>
                      <span className="text-[#A5A79B] text-[10px]">European ECTS</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. About Us */}
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 rounded-lg transition-colors hover:text-[#590907] hover:bg-[#ECEDE8] ${
                  isActive ? "text-[#590907] font-extrabold bg-[#ECEDE8]" : ""
                }`
              }
            >
              About Us
            </NavLink>

            {/* 6. Blogs */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 rounded-lg transition-colors hover:text-[#590907] hover:bg-[#ECEDE8] ${
                  isActive ? "text-[#590907] font-extrabold bg-[#ECEDE8]" : ""
                }`
              }
            >
              Blogs
            </NavLink>

            {/* 7. Contact */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-2 rounded-lg transition-colors hover:text-[#590907] hover:bg-[#ECEDE8] ${
                  isActive ? "text-[#590907] font-extrabold bg-[#ECEDE8]" : ""
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Right-Side Actions: Search + Social Media Icons + Burgundy Free Counselling CTA */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {/* Search Icon Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-[#77776F] hover:text-[#590907] hover:bg-[#ECEDE8] transition-colors cursor-pointer"
              title="Search universities and admission guides"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Social Media Links: Instagram, Facebook, YouTube */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-[#DEDCD4]">
              <a
                href={siteConfig.social.instagram.startsWith("http") ? siteConfig.social.instagram : "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Follow us on Instagram"
                className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#E4405F] hover:bg-rose-50 border border-[#DEDCD4] transition-all cursor-pointer shadow-2xs"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook.startsWith("http") ? siteConfig.social.facebook : "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Follow us on Facebook"
                className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#1877F2] hover:bg-[#ECEDE8] border border-[#DEDCD4] transition-all cursor-pointer shadow-2xs"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube.startsWith("http") ? siteConfig.social.youtube : "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="Subscribe on YouTube"
                className="w-8.5 h-8.5 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#FF0000] hover:bg-red-50 border border-[#DEDCD4] transition-all cursor-pointer shadow-2xs"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>

            {/* Primary Burgundy CTA Button */}
            <button
              onClick={() => onOpenLeadModal("Navbar Free Counselling CTA")}
              className="whitespace-nowrap px-5 py-3 rounded-full bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-black text-xs sm:text-sm tracking-wide transition-all duration-200 shadow-md border border-[#E8D2B5]/30 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Free Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Right Bar (Search + Menu Toggle) */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#201C1A] hover:text-[#590907]"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenLeadModal("Mobile Header Free Counselling")}
              className="px-3.5 py-1.5 rounded-full bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-extrabold text-xs shadow-xs border border-[#E8D2B5]/30"
            >
              Apply
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#201C1A] hover:bg-[#ECEDE8] transition-colors focus:outline-hidden"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#DEDCD4] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          {/* Quick Shortcuts */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#DEDCD4]">
            <Link
              to="/mbbs-fee-calculator"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F0] text-xs font-bold text-[#201C1A] border border-[#DEDCD4]"
            >
              <Calculator className="w-4 h-4 text-[#590907]" />
              <span>Fee Calculator</span>
            </Link>
            <Link
              to="/mbbs-eligibility"
              onClick={handleNavClick}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F7F5F0] text-xs font-bold text-[#201C1A] border border-[#DEDCD4]"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>Eligibility</span>
            </Link>
          </div>

          <div className="space-y-1 text-sm font-bold text-[#201C1A]">
            <Link
              to="/"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg bg-[#ECEDE8] text-[#590907]"
            >
              Home
            </Link>
            <Link
              to="/mbbs-in-uzbekistan"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#201C1A]"
            >
              MBBS in Uzbekistan
            </Link>
            <Link
              to="/universities/uzbekistan"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#590907]"
            >
              All Universities Directory
            </Link>
            <Link
              to="/compare-universities"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#590907]"
            >
              Compare Universities
            </Link>

            <Link
              to="/document-checklist"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#201C1A]"
            >
              Document Checklist & Visa
            </Link>
            <Link
              to="/about-us"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#201C1A]"
            >
              About Us
            </Link>
            <Link
              to="/blog"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#201C1A]"
            >
              Blogs & Knowledge Hub
            </Link>
            <Link
              to="/contact"
              onClick={handleNavClick}
              className="block px-3 py-2 rounded-lg hover:bg-[#F7F5F0] text-[#201C1A]"
            >
              Contact Us
            </Link>
          </div>

          {/* Social Media Links in Mobile */}
          <div className="pt-2 border-t border-[#DEDCD4] flex items-center justify-between text-xs">
            <span className="font-bold text-[#77776F]">Follow Our Updates:</span>
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.social.instagram.startsWith("http") ? siteConfig.social.instagram : "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title="Instagram"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#E4405F] hover:bg-rose-50 border border-[#DEDCD4] transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.facebook.startsWith("http") ? siteConfig.social.facebook : "https://facebook.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#1877F2] hover:bg-[#ECEDE8] border border-[#DEDCD4] transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.social.youtube.startsWith("http") ? siteConfig.social.youtube : "https://youtube.com"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                title="YouTube"
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#77776F] hover:text-[#FF0000] hover:bg-red-50 border border-[#DEDCD4] transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal("Mobile Menu Free Consultation");
              }}
              className="w-full py-3 bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-black rounded-xl text-center shadow-md cursor-pointer transition-colors flex items-center justify-center gap-1.5 border border-[#E8D2B5]/30"
            >
              <span>Book Free 1-on-1 Counselling</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. FAST SEARCH MODAL */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/60 backdrop-blur-xs p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-[#DEDCD4] overflow-hidden">
            <div className="p-4 border-b border-[#DEDCD4] flex items-center gap-3">
              <Search className="w-5 h-5 text-[#A5A79B] shrink-0" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search medical universities, fee calculators, eligibility..."
                className="w-full text-sm outline-hidden text-[#201C1A] placeholder-[#A5A79B]"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-[#201C1A] hover:bg-[#ECEDE8] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 max-h-80 overflow-y-auto space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-wider text-[#77776F] px-3 py-1">
                {searchQuery ? "Search Results" : "Quick Navigation"}
              </p>
              {filteredSearchResults.length > 0 ? (
                filteredSearchResults.map((item) => (
                  <Link
                    key={item.url}
                    to={item.url}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#ECEDE8] text-xs font-bold text-[#201C1A] transition-colors"
                  >
                    <span>{item.title}</span>
                    <span className="text-[10px] text-[#77776F] font-semibold bg-[#F7F5F0] border border-[#DEDCD4] px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </Link>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-[#77776F]">
                  No matching university or guide found. Try searching "Tashkent", "Fee", or "NEET".
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;