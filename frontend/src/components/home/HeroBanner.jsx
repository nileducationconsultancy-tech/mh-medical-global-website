import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Calculator,
  Play,
  ShieldCheck,
  Landmark,
  IndianRupee,
  Award,
  Users,
  Headphones,
  Plane,
  X
} from "lucide-react";
import { track } from "../../utils/analytics";

export function HeroBanner({ onOpenLeadModal }) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const benefits = [
    {
      title: "Affordable Fees",
      icon: IndianRupee,
      bgColor: "bg-rose-100",
      textColor: "text-[#D90436]"
    },
    {
      title: "NMC Compliance",
      icon: ShieldCheck,
      bgColor: "bg-blue-100",
      textColor: "text-[#0752B8]"
    },
    {
      title: "100% English Medium",
      icon: Award,
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600"
    },
    {
      title: "Expert Counselling",
      icon: Users,
      bgColor: "bg-sky-100",
      textColor: "text-sky-600"
    },
    {
      title: "End-to-End Support",
      icon: Headphones,
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-600"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#EBF3FB] via-[#F3F7FC] to-[#F8FAFD] pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 border-b border-slate-200/80 font-sans">
      {/* ========================================================= */}
      {/* DESKTOP BACKGROUND ARTWORK: Fills right half after 48% */}
      {/* ========================================================= */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] xl:w-[50%] 2xl:w-[48%] pointer-events-none z-0 overflow-hidden">
        <img
          src="/hero/banner-image.png"
          alt="Study MBBS in Uzbekistan - Student and Medical Universities"
          className="w-full h-full object-cover object-left-top xl:object-center select-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Soft edge blend into the left column sky background */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#F3F7FC] via-[#F3F7FC]/70 to-transparent pointer-events-none" />
        {/* Soft bottom blend to seamlessly meet the trust bar */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white/70 via-white/30 to-transparent pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* FOREGROUND CONTENT CONTAINER (max-w-7xl) */}
      {/* ========================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* ========================================================= */}
          {/* LEFT COLUMN: ~50% WIDTH (Col 7/12) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* 1. Compliance Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-blue-200/90 text-[#082B57] text-xs font-bold tracking-wide shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-[#0752B8] shrink-0" />
              <span>NMC FMGL 2021 & WHO-WDOMS Compliant Medical Education</span>
            </div>

            {/* 2. Main Heading with Curved Airplane Trail */}
            <div className="relative">
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-black tracking-tight text-[#082B57] leading-[1.08]">
                <span>Study MBBS in</span>
                {/* Flight path dotted curve & airplane starting after 'in' */}
                <span className="hidden sm:inline-block relative w-20 sm:w-28 lg:w-32 h-10 ml-2.5 align-middle pointer-events-none">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 100 45"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 5,35 Q 45,6 85,14"
                      stroke="#082B57"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute -top-3 right-0 text-[#082B57] transform rotate-15 inline-flex">
                    <Plane className="w-5 h-5 sm:w-6 sm:h-6 fill-[#082B57]" />
                  </span>
                </span>
                <br />
                <span className="text-[#D90436]">Uzbekistan</span>
              </h1>
            </div>

            {/* 3. Supporting Subtitle */}
            <h2 className="text-sm sm:text-base lg:text-lg font-black text-[#082B57] tracking-tight">
              Transparent Fees | Government Universities | 100% English Medium
            </h2>

            {/* 4. Supporting Description */}
            <p className="text-xs sm:text-sm text-[#64748B] max-w-xl font-normal leading-relaxed">
              Explore top medical universities in Uzbekistan with verified fees, direct admission support, and complete guidance from application to departure.
            </p>

            {/* 5. Five Compact Benefit Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-2 pt-1">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex flex-col items-start gap-2 p-2.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/80 shadow-2xs hover:shadow-xs hover:border-blue-200 transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-full ${b.bgColor} ${b.textColor} flex items-center justify-center shrink-0 shadow-2xs`}
                    >
                      <Icon className="w-4 h-4 font-bold" />
                    </div>
                    <span className="text-[11px] font-bold text-[#082B57] leading-tight">
                      {b.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 6. Three Primary CTA Buttons in a Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Red Button */}
              <Link
                to="/mbbs-eligibility"
                onClick={() => track("hero_cta_eligibility_click")}
                className="px-6 py-3.5 rounded-xl bg-[#D90436] hover:bg-[#B8032D] text-white font-black text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-red-950/20 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Check My Eligibility →</span>
              </Link>

              {/* Secondary White Button */}
              <a
                href="#fee-calculator-section"
                onClick={() => track("hero_cta_calculator_click")}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#082B57] font-bold text-xs sm:text-sm border border-blue-200/90 shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Calculator className="w-4 h-4 text-[#0752B8]" />
                <span>Calculate 6-Year Fees</span>
              </a>

              {/* Video Option - Temporarily commented out until official video asset is ready */}
              {/*
              <button
                type="button"
                onClick={() => {
                  setIsVideoModalOpen(true);
                  track("hero_cta_watch_video_click");
                }}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#082B57] font-bold text-xs sm:text-sm border border-blue-200/90 shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Play className="w-4 h-4 text-[#0752B8] fill-[#0752B8]" />
                <span>Watch Video</span>
              </button>
              */}
            </div>
          </div>

          {/* ========================================================= */}
          {/* MOBILE ONLY: ARTWORK DIRECTLY BELOW BUTTONS */}
          {/* ========================================================= */}
          <div className="lg:hidden mt-6 relative w-full max-w-lg mx-auto">
            <img
              src="/hero/banner-image.png"
              alt="Study MBBS in Uzbekistan - Student and Medical Universities"
              className="w-full h-auto object-contain mx-auto block rounded-2xl shadow-sm"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* WATCH VIDEO MODAL (Temporarily commented out) */}
      {/* ========================================================= */}
      {/*
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative">
            <div className="p-4 bg-[#082B57] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-[#D90436] fill-[#D90436]" />
                <h3 className="font-bold text-sm">Study MBBS in Uzbekistan — University Tour & Campus Life</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="MBBS in Uzbekistan Campus Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <p className="text-slate-600">
                100% English Medium Faculty • 3,500+ Hospital Beds • Authentic On-Campus Indian Mess
              </p>
              <button
                onClick={() => {
                  setIsVideoModalOpen(false);
                  if (onOpenLeadModal) onOpenLeadModal("Hero Video Modal Enquire");
                }}
                className="px-4 py-2 rounded-xl bg-[#D90436] text-white font-bold hover:bg-[#B8032D] cursor-pointer shrink-0"
              >
                Enquire for 2026 Admissions →
              </button>
            </div>
          </div>
        </div>
      )}
      */}
    </section>
  );
}

export default HeroBanner;