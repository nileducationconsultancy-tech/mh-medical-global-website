import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  Calculator,
  ShieldCheck,
  Landmark,
  IndianRupee,
  Award,
  Users,
  Headphones,
  Plane
} from "lucide-react";
import { track } from "../../utils/analytics";

export function HeroBanner({ onOpenLeadModal }) {
  const benefits = [
    {
      title: "Affordable Fees",
      icon: IndianRupee,
      bgColor: "bg-[#E8D2B5]/40",
      textColor: "text-[#590907]"
    },
    {
      title: "NMC Compliance",
      icon: ShieldCheck,
      bgColor: "bg-[#ECEDE8]",
      textColor: "text-[#590907]"
    },
    {
      title: "100% English Medium",
      icon: Award,
      bgColor: "bg-[#E8D2B5]/40",
      textColor: "text-[#590907]"
    },
    {
      title: "Expert Counselling",
      icon: Users,
      bgColor: "bg-[#ECEDE8]",
      textColor: "text-[#590907]"
    },
    {
      title: "End-to-End Support",
      icon: Headphones,
      bgColor: "bg-[#E8D2B5]/40",
      textColor: "text-[#590907]"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#ECEDE8] via-[#F2F3EF] to-[#F7F5F0] pt-8 sm:pt-10 lg:pt-12 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DEDCD4] font-sans">
      {/* DESKTOP BACKGROUND ARTWORK */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] xl:w-[50%] 2xl:w-[48%] pointer-events-none z-0 overflow-hidden">
        <img
          src="/hero/banner-image.png"
          alt="Study MBBS in Uzbekistan - Student and Medical Universities"
          className="w-full h-full object-cover object-left-top xl:object-center select-none"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Soft edge blend into the left column sage background */}
        <div className="absolute inset-y-0 left-0 w-32 bg-linear-to-r from-[#F2F3EF] via-[#F2F3EF]/70 to-transparent pointer-events-none" />
        {/* Soft bottom blend to seamlessly meet the trust bar */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-[#F7F5F0]/80 via-[#F7F5F0]/30 to-transparent pointer-events-none" />
      </div>

      {/* FOREGROUND CONTENT CONTAINER */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* 1. Compliance Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs border border-[#DEDCD4] text-[#590907] text-xs font-bold tracking-wide shadow-2xs">
              <Landmark className="w-3.5 h-3.5 text-[#590907] shrink-0" />
              <span>NMC FMGL 2021 & WHO-WDOMS Compliant Medical Education</span>
            </div>

            {/* 2. Main Heading with Curved Airplane Trail */}
            <div className="relative">
              <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-serif font-bold tracking-tight text-[#201C1A] leading-[1.08]">
                <span>Study MBBS in</span>
                {/* Flight path dotted curve & airplane */}
                <span className="hidden sm:inline-block relative w-20 sm:w-28 lg:w-32 h-10 ml-2.5 align-middle pointer-events-none">
                  <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 100 45"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 5,35 Q 45,6 85,14"
                      stroke="#590907"
                      strokeWidth="2.5"
                      strokeDasharray="4 3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute -top-3 right-0 text-[#590907] transform rotate-15 inline-flex">
                    <Plane className="w-5 h-5 sm:w-6 sm:h-6 fill-[#590907]" />
                  </span>
                </span>
                <br />
                <span className="text-[#590907]">Uzbekistan</span>
              </h1>
            </div>

            {/* 3. Supporting Subtitle */}
            <h2 className="text-sm sm:text-base lg:text-lg font-serif font-bold text-[#201C1A] tracking-tight">
              Transparent Fees | Government Universities | 100% English Medium
            </h2>

            {/* 4. Supporting Description */}
            <p className="text-xs sm:text-sm text-[#77776F] max-w-xl font-normal leading-relaxed">
              Explore top medical universities in Uzbekistan with verified fees, direct admission support, and complete guidance from application to departure.
            </p>

            {/* 5. Five Compact Benefit Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-2 pt-1">
              {benefits.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex flex-col items-start gap-2 p-2.5 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#DEDCD4] shadow-2xs hover:shadow-xs hover:border-[#E8D2B5] transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-full ${b.bgColor} ${b.textColor} flex items-center justify-center shrink-0 shadow-2xs`}
                    >
                      <Icon className="w-4 h-4 font-bold" />
                    </div>
                    <span className="text-[11px] font-bold text-[#201C1A] leading-tight">
                      {b.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 6. Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/mbbs-eligibility"
                onClick={() => track("hero_cta_eligibility_click")}
                className="px-6 py-3.5 rounded-xl bg-[#590907] hover:bg-[#3F0605] text-white font-black text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-[#590907]/30 flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-white" />
                <span>Check My Eligibility →</span>
              </Link>

              <a
                href="#fee-calculator-section"
                onClick={() => track("hero_cta_calculator_click")}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-[#ECEDE8] text-[#201C1A] font-bold text-xs sm:text-sm border border-[#DEDCD4] shadow-2xs transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <Calculator className="w-4 h-4 text-[#590907]" />
                <span>Calculate 6-Year Fees</span>
              </a>
            </div>
          </div>

          {/* MOBILE ONLY: ARTWORK DIRECTLY BELOW BUTTONS */}
          <div className="lg:hidden mt-6 relative w-full max-w-lg mx-auto">
            <img
              src="/hero/banner-image.png"
              alt="Study MBBS in Uzbekistan - Student and Medical Universities"
              className="w-full h-auto object-contain mx-auto block rounded-2xl shadow-sm border border-[#DEDCD4]"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
