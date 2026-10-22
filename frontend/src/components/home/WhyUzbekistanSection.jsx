import React from "react";
import {
  ShieldCheck,
  BookOpen,
  Building2,
  Utensils,
  Plane,
  Users,
  CheckCircle2,
  Sparkles,
  Award
} from "lucide-react";

export function WhyUzbekistanSection() {
  const points = [
    {
      icon: ShieldCheck,
      title: "100% NMC FMGL 2021 Compliant",
      description: "Full 54-month continuous medical curriculum plus mandatory 12-month clinical internship in the same university teaching hospital complex. Fully conforms to Indian National Medical Commission norms for NExT / FMGE licensing."
    },
    {
      icon: BookOpen,
      title: "100% English-Medium Faculty",
      description: "All preclinical lectures, laboratory practicals, clinical case discussions, and semester examinations are conducted in English by senior bilingual medical professors. Local language is taught as a minor clinical communication subject."
    },
    {
      icon: Building2,
      title: "Massive 2,000–3,500+ Hospital Beds",
      description: "State medical academies operate affiliated republican clinical hospitals, multi-specialty trauma centers, and pediatric institutes, providing rich daily patient bedside exposure from Year 3 onward."
    },
    {
      icon: Utensils,
      title: "Authentic On-Campus Indian Mess",
      description: "Indian cooks manage dedicated dining facilities serving fresh breakfast, lunch, and dinner. Pure vegetarian, Jain meals, and halal non-vegetarian menus (North and South Indian dishes) are prepared daily."
    },
    {
      icon: Plane,
      title: "Direct 3.5-Hour Flight from Delhi",
      description: "Non-stop direct international flights connect New Delhi (DEL) to Tashkent (TAS) in just 3.5 hours via Uzbekistan Airways and IndiGo, making visits fast, affordable, and stress-free for students and parents."
    },
    {
      icon: Users,
      title: "Safe, Peaceful & Secular Society",
      description: "Uzbekistan maintains one of the highest public safety rankings in Central Asia. Campuses feature round-the-clock CCTV, biometric hostel entry, and a warm community of over 10,000+ Indian medical students."
    }
  ];

  return (
    <section className="space-y-8 font-sans">
      {/* Header with Direct-Answer GEO Paragraph */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
          Why Indian Aspirants Choose Uzbekistan
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#063280]">
          European-Standard Medical Training at 1/4th the Cost of Indian Private Colleges
        </h2>
        
        {/* AI-Quotable Direct Answer Block (45 words) */}
        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl mx-auto bg-[#F7FAFC] p-4 rounded-2xl border border-[#D9E2EC]">
          <strong>Direct Answer:</strong> Uzbekistan is a top MBBS destination for Indian students because its state universities deliver 100% English-medium, NMC FMGL 2021-compliant 6-year MD Physician degrees for ₹15.2L–₹19.8L tuition total, supported by 3,500+ hospital beds, on-campus Indian messes, and a quick 3.5-hour direct flight from Delhi.
        </p>
      </div>

      {/* 6-Card Icon Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {points.map((pt) => {
          const Icon = pt.icon;
          return (
            <div
              key={pt.title}
              className="bg-white p-7 rounded-3xl border border-[#D9E2EC] shadow-xs hover:shadow-md transition-all space-y-3 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] group-hover:bg-[#063280] text-[#063280] group-hover:text-white transition-colors flex items-center justify-center font-bold">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-[#063280] group-hover:text-[#1558A9] transition-colors">
                {pt.title}
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                {pt.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default WhyUzbekistanSection;
