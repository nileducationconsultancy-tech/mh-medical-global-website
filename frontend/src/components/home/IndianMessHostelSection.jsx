import React from "react";
import { Utensils, Home, ShieldCheck, CheckCircle2, Flame, Wifi, Coffee, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";

export function IndianMessHostelSection({ onOpenLeadModal }) {
  const messFeatures = [
    "North & South Indian Menus (Dal, Roti, Rice, Sabzi, Idli, Dosa, Sambar)",
    "Pure Vegetarian & Jain Food options prepared in dedicated clean vessels",
    "Halal Non-Vegetarian dishes served 3 to 4 times a week",
    "3 Full Meals Daily + Evening Chai & Snacks",
    "Managed by experienced Indian chefs and hygiene supervisors",
    "RO Purified multi-stage filtered drinking water dispensers in mess"
  ];

  const hostelFeatures = [
    "Secure university-owned buildings with 2 or 3 student room configurations",
    "24/7 Central Radiator Heating maintaining 22°C–24°C through harsh winters",
    "High-speed fiber-optic Wi-Fi for medical research and lecture streaming",
    "Biometric entry with 24/7 CCTV surveillance and security guards",
    "Separate dedicated wings and floors for female Indian medical students",
    "Permanent Indian student wardens and medical clinic on premises"
  ];

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#D9E2EC] shadow-xs font-sans space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
          Comfortable Student Living
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#063280]">
          Indian Mess & Modern Hostel Accommodation in Uzbekistan
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Parents can rest assured knowing their children live in heated, secure university dormitories and eat nutritious home-style Indian meals every day.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
        {/* Left: Indian Mess Facility */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFC] border border-[#D9E2EC] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#9B193A] flex items-center justify-center font-bold shadow-xs">
                <Utensils className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#063280]">On-Campus Indian Dining (Mess)</h3>
                <p className="text-xs text-[#475569]">Prepared fresh daily by professional Indian cooks</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D9E2EC]">
              <ImageWithFallback
                src="/collageimages/banner-5.png"
                alt="Indian Mess Dining Hall in Uzbekistan"
                aspectRatio="aspect-16/9"
                placeholderText="Indian Mess Facility"
                todoMarker="TODO_REPLACE: Authentic photo of university Indian mess dining hall"
              />
            </div>

            <div className="space-y-2.5 pt-2">
              {messFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#9B193A] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#D9E2EC] flex items-center justify-between text-xs">
            <span className="font-bold text-[#063280]">Annual Indian Mess Cost:</span>
            <span className="font-extrabold text-[#9B193A] bg-[#EBF3FA] px-3 py-1 rounded-xl">
              $1,000 – $1,100 USD / Year (~₹7,000–₹8,000/mo)
            </span>
          </div>
        </div>

        {/* Right: Hostel Accommodation & Winter Heating */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#F7FAFC] border border-[#D9E2EC] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold shadow-xs">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#063280]">Hostels & 24/7 Winter Heating</h3>
                <p className="text-xs text-[#475569]">Comfortable living with biometric security and study desks</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-[#D9E2EC]">
              <ImageWithFallback
                src="/collageimages/banner-6.png"
                alt="Student Hostel Room in Uzbekistan"
                aspectRatio="aspect-16/9"
                placeholderText="Hostel Dormitory Room"
                todoMarker="TODO_REPLACE: Authentic photo of university student hostel room"
              />
            </div>

            <div className="space-y-2.5 pt-2">
              {hostelFeatures.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#063280] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#D9E2EC] flex items-center justify-between text-xs">
            <span className="font-bold text-[#063280]">Annual University Hostel Fee:</span>
            <span className="font-extrabold text-[#063280] bg-[#EBF3FA] px-3 py-1 rounded-xl">
              $500 – $700 USD / Year (~₹42,000–₹59,000/yr)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IndianMessHostelSection;
