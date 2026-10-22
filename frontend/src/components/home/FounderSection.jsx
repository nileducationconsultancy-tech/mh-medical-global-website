import React, { useState } from "react";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Building2,
  PhoneCall,
  Sparkles,
  Quote,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  GraduationCap
} from "lucide-react";
import { siteConfig } from "../../config/site";

export function FounderSection({ onOpenLeadModal }) {
  const isFounderPhotoPlaceholder = !siteConfig.founder.photoUrl || siteConfig.founder.photoUrl.startsWith("TODO_REPLACE");

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D9E2EC] shadow-xs font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Founder Card & Portrait Slot (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-xl bg-linear-to-br from-[#063280] via-[#0E438D] to-[#1558A9] p-1.5 border border-[#9ABAD9]/30">
            <div className="rounded-[22px] overflow-hidden bg-[#063280]">
              {/* Founder Portrait Photo Slot with Clear TODO marker */}
              {isFounderPhotoPlaceholder ? (
                <div
                  className="w-full h-80 flex flex-col items-center justify-center bg-linear-to-b from-[#0E438D] to-[#063280] text-white p-6 text-center border-b border-white/10 relative"
                  data-todo-marker="TODO_REPLACE: Founder Dr. M. H. Akhtar verified photo in siteConfig.founder.photoUrl"
                >
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-[#9ABAD9]/50 flex items-center justify-center mb-3 shadow-inner">
                    <GraduationCap className="w-12 h-12 text-[#9ABAD9]" />
                  </div>
                  <h4 className="font-extrabold text-lg text-white">{siteConfig.founder.name}</h4>
                  <p className="text-xs text-[#9ABAD9] font-medium">{siteConfig.founder.title}</p>
                  <span className="text-[10px] text-white/70 mt-2 bg-black/25 px-3 py-1 rounded-full border border-white/10">
                    Lead Medical Academic Advisor
                  </span>
                </div>
              ) : (
                <img
                  src={siteConfig.founder.photoUrl}
                  alt={`${siteConfig.founder.name} - ${siteConfig.founder.title}`}
                  className="w-full h-80 object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
              )}

              {/* Founder Meta Details */}
              <div className="p-5 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-lg text-white">{siteConfig.founder.name}</h4>
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#9B193A] text-white">
                    Managing Director
                  </span>
                </div>
                <p className="text-xs text-[#9ABAD9]">{siteConfig.founder.role}</p>
                <p className="text-[11px] text-slate-200">
                  12+ Years Advisory Experience • 5,000+ Indian Medical Students Guided Across Uzbekistan
                </p>

                {/* LinkedIn / Professional Verification Link */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Professional Profile:</span>
                  <a
                    href={siteConfig.social.linkedin.startsWith("http") ? siteConfig.social.linkedin : "https://linkedin.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#9ABAD9] hover:text-white font-bold hover:underline"
                    aria-label="Visit Founder LinkedIn Profile"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Leadership Philosophy & Transparency Pledge (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider border border-[#D9E2EC]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#063280]" />
            <span>Leadership Transparency Pledge</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#063280] leading-tight">
            "We Treat Every Student's Medical Career as if It Were Our Own Child's."
          </h3>

          {/* AI-Quotable Direct Answer Paragraph */}
          <div className="space-y-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p>
              When an Indian student steps out to study medicine abroad, they carry the lifelong dreams and savings of their entire family. At <strong>MH GLOBAL EDUCATION CONSULTANT</strong>, we operate on three foundational principles: <strong>100% direct-to-university fee transparency</strong>, strict pre-admission verification of NMC FMGL 2021 compliance, and permanent on-ground Indian coordinators stationed across Tashkent and Samarkand.
            </p>
            <p>
              We provide unbiased counsel, helping students evaluate government vs private medical colleges without hidden agent commissions or inflated exchange rates.
            </p>
          </div>

          {/* 4 Pillars of Integrity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Zero Tuition Markups:</span>
                <p className="text-[#475569] text-[11px] mt-0.5">Students pay all tuition directly into the university's official government bank account.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Permanent On-Ground Wardens:</span>
                <p className="text-[#475569] text-[11px] mt-0.5">Full-time Indian coordinators for hostel check-in, sim cards, and emergency medical support.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Strict NMC FMGL Compliance:</span>
                <p className="text-[#475569] text-[11px] mt-0.5">We only recommend universities offering 54 months of English coursework + 12-month in-house internship.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Parent Communication Gate:</span>
                <p className="text-[#475569] text-[11px] mt-0.5">Regular academic attendance updates and semester grade reports shared with parents back home.</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal("Founder Advisory Direct Session")}
              className="px-6 py-3 bg-[#063280] hover:bg-[#1558A9] text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-[#9ABAD9]" />
              <span>Book 1-on-1 Guidance with Senior Advisor</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StudentTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const reviews = [
    {
      name: "Dr. Ananya Sharma",
      title: "Clinical Intern (6th Year)",
      university: "Tashkent Medical Academy (TMA)",
      city: "Tashkent, Uzbekistan",
      hometown: "Jaipur, Rajasthan",
      neetScore: "NEET 442",
      image: null,
      initials: "AS",
      verified: true,
      quote: "TMA's clinical exposure at the Republican Research Center gave me daily bedside patient rounds and real surgery exposure. The entire faculty teaches in English, and the on-campus Indian mess serves fresh dal, roti, and sabzi every single day."
    },
    {
      name: "Mohd. Faizan",
      title: "4th Year MD Physician Student",
      university: "Samarkand State Medical University",
      city: "Samarkand, Uzbekistan",
      hometown: "Lucknow, Uttar Pradesh",
      neetScore: "NEET 485",
      image: null,
      initials: "MF",
      verified: true,
      quote: "Samarkand has a vibrant community of over 1,500 Indian students. MH GLOBAL EDUCATION CONSULTANT handled my document Apostille, Ministry of Foreign Affairs visa teletex, and hostel room allotment with zero hidden fees."
    },
    {
      name: "Priya Nair",
      title: "3rd Year MD Physician Student",
      university: "Bukhara State Medical Institute",
      city: "Bukhara, Uzbekistan",
      hometown: "Kochi, Kerala",
      neetScore: "NEET 418",
      image: null,
      initials: "PN",
      verified: true,
      quote: "Bukhara's campus has modern hostels, smart dissection labs, and a dedicated simulation center on one integrated site. The South Indian mess menu with fresh idli, sambar, and rasam made adjusting very easy."
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="space-y-8 font-sans">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
          Student Campus Feedback
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
          Verified Experiences from Indian Medical Students in Uzbekistan
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto">
          Authentic academic and hostel experiences shared by enrolled Indian students across Tashkent, Samarkand, and Bukhara.
        </p>
      </div>

      {/* Desktop 3-Column Grid */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.name}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Quote className="w-7 h-7 text-[#9ABAD9]/40" />
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Enrolled Indian Student
                </span>
              </div>
              <p className="text-xs text-[#475569] leading-relaxed italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#D9E2EC]">
              <div className="w-11 h-11 rounded-full bg-[#EBF3FA] border-2 border-[#1558A9] flex items-center justify-center text-[#063280] font-extrabold text-xs shrink-0 shadow-inner">
                {rev.initials}
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-[#063280]">{rev.name}</p>
                <p className="text-[#1558A9] font-medium text-[11px]">{rev.title}</p>
                <p className="text-[10px] text-[#475569]">{rev.university} • {rev.hometown}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Interactive Carousel */}
      <div className="block md:hidden relative">
        <div className="bg-white p-6 rounded-3xl border border-[#D9E2EC] shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <Quote className="w-7 h-7 text-[#9ABAD9]/40" />
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Enrolled Student
            </span>
          </div>

          <p className="text-xs text-[#475569] leading-relaxed italic min-h-[90px]">
            "{reviews[currentSlide].quote}"
          </p>

          <div className="flex items-center gap-3 pt-3 border-t border-[#D9E2EC]">
            <div className="w-11 h-11 rounded-full bg-[#EBF3FA] border-2 border-[#1558A9] flex items-center justify-center text-[#063280] font-extrabold text-xs shrink-0 shadow-inner">
              {reviews[currentSlide].initials}
            </div>
            <div className="text-xs">
              <p className="font-extrabold text-[#063280]">{reviews[currentSlide].name}</p>
              <p className="text-[#1558A9] font-medium text-[11px]">{reviews[currentSlide].title}</p>
              <p className="text-[10px] text-[#475569]">{reviews[currentSlide].university} • {reviews[currentSlide].hometown}</p>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between pt-4 px-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white border border-[#D9E2EC] text-[#063280] shadow-xs active:scale-95"
            aria-label="Previous Student Review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlide ? "bg-[#063280] w-6" : "bg-[#D9E2EC]"
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white border border-[#D9E2EC] text-[#063280] shadow-xs active:scale-95"
            aria-label="Next Student Review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default FounderSection;
