import React from "react";
import { ShieldCheck, HeartHandshake, Utensils, Coins, GraduationCap, CheckCircle2 } from "lucide-react";

export function ParentsConcernsBlock() {
  const concerns = [
    {
      icon: ShieldCheck,
      title: "Is Uzbekistan Safe for My Son/Daughter?",
      directAnswer: "Uzbekistan is a secular, peaceful nation with strict rule of law and very low crime rates. Hostels enforce biometric entry, 24/7 CCTV, night curfews, and full-time female Indian wardens on female floors.",
      keyPoints: [
        "No racial discrimination or hostility towards Indian citizens",
        "High police responsiveness and safe public transport in cities",
        "Dedicated Indian student welfare committees on campus"
      ]
    },
    {
      icon: Utensils,
      title: "Will My Child Get Proper Indian Food?",
      directAnswer: "Yes. Every university hosting Indian students features a dedicated on-campus Indian mess run by chefs from India. Pure vegetarian, Jain, and halal non-vegetarian meals are cooked three times daily.",
      keyPoints: [
        "North Indian (roti, paneer, dal) & South Indian (dosa, sambar) varieties",
        "RO multi-stage filtered drinking water inside hostels and messes",
        "Local Indian grocery markets available in Tashkent and Samarkand"
      ]
    },
    {
      icon: Coins,
      title: "Are There Hidden Costs or Surprise Fees Later?",
      directAnswer: "Zero hidden charges. All tuition fees are fixed by official university decrees and paid directly into the university's government bank account. You receive an itemized breakdown before paying any fees.",
      keyPoints: [
        "100% direct bank wire (Swift/TT) payment to university accounts",
        "Annual tuition fees remain fixed throughout the academic duration",
        "Clear currency exchange calculation based on RBI reference rates"
      ]
    },
    {
      icon: GraduationCap,
      title: "Will My Child Pass NExT and Practice in India?",
      directAnswer: "Yes. The curriculum strictly complies with NMC FMGL 2021 (54 months coursework + 12 months in-house internship). Universities provide clinical rotations across 2,000–3,500 bed hospitals and integrate NExT-oriented coaching modules.",
      keyPoints: [
        "100% English-medium lectures, lab practicals, and exams",
        "Daily bedside clinical rounds in state multi-specialty hospitals",
        "Full eligibility for Indian CRMI internship and NExT Step 1/2"
      ]
    }
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#DEDCD4] shadow-xs font-sans space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#590907] bg-[#ECEDE8] px-3.5 py-1 rounded-full border border-[#DEDCD4]">
          Parent Advisory & Peace of Mind
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#201C1A]">
          Addressing Every Indian Parent's Top 4 Concerns
        </h2>
        <p className="text-xs sm:text-sm text-[#77776F] max-w-2xl mx-auto leading-relaxed">
          We understand that sending your child abroad is an emotional and financial decision. Here are factual, verifiable answers to the questions parents ask us most.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {concerns.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 sm:p-7 rounded-3xl bg-[#F7F5F0] border border-[#DEDCD4] hover:border-[#A5A79B] transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#ECEDE8] text-[#590907] flex items-center justify-center font-bold shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#201C1A] leading-snug">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-[#77776F] leading-relaxed">
                  {item.directAnswer}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#DEDCD4]">
                {item.keyPoints.map((pt) => (
                  <div key={pt} className="flex items-start gap-2 text-[11px] text-[#201C1A]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#590907] shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ParentsConcernsBlock;
