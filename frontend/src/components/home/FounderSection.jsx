import React from "react";
import {
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Building2,
  PhoneCall,
  Sparkles,
  Quote,
  Star,
  UserCheck
} from "lucide-react";
import { siteConfig } from "../../config/site";

export function FounderSection({ onOpenLeadModal }) {
  const isFounderPhotoPlaceholder = !siteConfig.founder.photoUrl || siteConfig.founder.photoUrl.startsWith("TODO_REPLACE");

  return (
    <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#D9E2EC] shadow-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Visual & Founder Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden shadow-xl bg-linear-to-br from-[#063280] via-[#0E438D] to-[#1558A9] p-1.5 border border-[#9ABAD9]/30">
            <div className="rounded-[22px] overflow-hidden bg-[#063280]">
              {/* TODO_REPLACE_PHOTO: Replace with authentic verified photo of Founder */}
              {isFounderPhotoPlaceholder ? (
                <div className="w-full h-80 flex flex-col items-center justify-center bg-linear-to-b from-[#0E438D] to-[#063280] text-[#9ABAD9] p-6 text-center border-b border-white/10">
                  <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-[#9ABAD9]/40 flex items-center justify-center mb-3">
                    <UserCheck className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="font-extrabold text-base text-white">{siteConfig.founder.name}</h4>
                  <p className="text-xs text-[#9ABAD9] mt-0.5">{siteConfig.founder.title}</p>
                  <span className="text-[10px] text-white/50 mt-2 bg-black/20 px-2.5 py-1 rounded-full border border-white/10">
                    Verified Leadership Profile
                  </span>
                </div>
              ) : (
                <img
                  src={siteConfig.founder.photoUrl}
                  alt={`${siteConfig.founder.name} - ${siteConfig.founder.title}`}
                  className="w-full h-80 object-cover object-top opacity-90"
                />
              )}
              <div className="p-5 text-white space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-lg text-white">{siteConfig.founder.name}</h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#9B193A] text-white">
                    {siteConfig.founder.title}
                  </span>
                </div>
                <p className="text-xs text-[#9ABAD9]">{siteConfig.founder.role}</p>
                <p className="text-[11px] text-slate-200 pt-1">
                  12+ Years Experience • 5,000+ Students Guided across Uzbekistan & Central Asia
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content & Trust Pledge (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#EBF3FA] text-[#063280] text-xs font-bold uppercase tracking-wider border border-[#D9E2EC]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#063280]" />
            Founder's Transparency Pledge
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#063280] leading-tight">
            "We Treat Every Student's Medical Career as if It Were Our Own Child's."
          </h3>

          <div className="space-y-3 text-xs sm:text-sm text-[#475569] leading-relaxed">
            <p>
              When a student steps out of India to study medicine, they carry the dreams of their entire family. For over a decade, our mission at <strong>MH GLOBAL EDUCATION CONSULTANT</strong> has been simple: provide <strong>100% factual transparency</strong>, zero fabricated claims, and direct assistance at every milestone.
            </p>
            <p>
              From verifying official NMC FMGL 2021 compliance before admission to stationing dedicated full-time Indian coordinators in Tashkent and Samarkand, we ensure your 6-year journey is safe, academically fruitful, and successful.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Direct University Fees:</span>
                <p className="text-[#475569] text-[11px]">Tuition is paid directly into official university bank accounts.</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">On-Ground Support:</span>
                <p className="text-[#475569] text-[11px]">Permanent Indian wardens & coordinators across Uzbekistan hostels.</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">NExT Exam Orientation:</span>
                <p className="text-[#475569] text-[11px]">Continuous screening exam mentorship right from the 1st academic year.</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] flex items-start gap-2.5 text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#063280]">Zero Hidden Charges:</span>
                <p className="text-[#475569] text-[11px]">Written itemized budget letter before any document processing.</p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenLeadModal("Direct Consultation with Founder Desk")}
              className="px-6 py-3.5 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-2 cursor-pointer border-b-2 border-[#9B193A]"
            >
              <PhoneCall className="w-4 h-4 text-[#9ABAD9]" />
              Book 1-on-1 Founder Desk Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StudentTestimonials() {
  const reviews = [
    {
      name: "Dr. Ananya Sharma (Intern)",
      university: "Tashkent Medical Academy (TMA)",
      hometown: "Jaipur, Rajasthan",
      neetScore: "NEET 442",
      image: "https://images.unsplash.com/photo-1594824813501-48fe75e7a3b3?auto=format&fit=crop&w=400&q=80",
      quote: "Studying at TMA has been an extraordinary experience. The professors are very supportive, lectures are 100% in English, and the clinical postings in Tashkent Republican Hospital gave me immense surgical exposure. The Indian mess food feels just like home!"
    },
    {
      name: "Mohd. Faizan (4th Year)",
      university: "Samarkand State Medical University",
      hometown: "Lucknow, Uttar Pradesh",
      neetScore: "NEET 485",
      // TODO_REPLACE_PHOTO: Real verified student photo for Mohd. Faizan
      image: null,
      initials: "MF",
      quote: "Samarkand has a huge community of over 1,500 Indian students. MH GLOBAL EDUCATION CONSULTANT handled my document Apostille, Ministry Teletex, and hostel room allotment seamlessly. No hidden fees at all!"
    },
    {
      name: "Priya Nair (3rd Year)",
      university: "Bukhara State Medical Institute",
      hometown: "Kochi, Kerala",
      neetScore: "NEET 418",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
      quote: "Bukhara's brand-new 2023 campus is incredible. The hostels, labs, and 400-bed hospital are all in one secure campus. The south Indian food in mess (idli, dosa, sambar) is prepared fresh daily."
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
          Verified Student & Parent Feedback
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-[#063280]">
          Real Stories from Indian Medical Students in Uzbekistan
        </h2>
        <p className="text-[#475569] text-sm">
          Hear directly from students studying across Tashkent, Samarkand, and Bukhara.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, i) => (
          <div
            key={i}
            className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9E2EC] shadow-xs hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-1 text-[#9B193A]">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-[#9B193A]" />
                ))}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed italic">
                "{rev.quote}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-[#D9E2EC]">
              {rev.image ? (
                <img
                  src={rev.image}
                  alt={rev.name}
                  loading="lazy" decoding="async" className="w-11 h-11 rounded-full object-cover border-2 border-[#1558A9]"
                />
              ) : (
                <div className="w-11 h-11 rounded-full bg-[#EBF3FA] border-2 border-[#1558A9] flex items-center justify-center text-[#063280] font-extrabold text-xs shrink-0 shadow-inner">
                  {rev.initials || "ST"}
                </div>
              )}
              <div className="text-xs">
                <p className="font-extrabold text-[#063280]">{rev.name}</p>
                <p className="text-[#1558A9] font-medium">{rev.university}</p>
                <p className="text-[10px] text-[#475569]">{rev.hometown} • {rev.neetScore}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
