import React from "react";
import { Plane, ShieldCheck, ArrowRight } from "lucide-react";

export function DelhiToTashkentRouteCard({ onOpenLeadModal }) {
  return (
    <div className="bg-linear-to-br from-[#590907] via-[#3F0605] to-[#201C1A] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-[#E8D2B5]/30 font-sans">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#E8D2B5]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Flight Details & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#E8D2B5] text-xs font-bold uppercase tracking-wider border border-[#E8D2B5]/30">
            <Plane className="w-3.5 h-3.5 text-[#E8D2B5]" />
            <span>Fastest International Route for Indian Students</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
            Direct 3.5-Hour Flight: New Delhi to Tashkent
          </h3>

          <p className="text-xs sm:text-sm text-[#F7F5F0]/90 leading-relaxed">
            Uzbekistan is geographically closer to India than almost any other overseas medical destination. Parents can board a morning flight from New Delhi and reach their child’s hostel by lunchtime.
          </p>

          {/* Interactive Route Timeline */}
          <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/15 space-y-4">
            <div className="flex items-center justify-between">
              {/* Origin */}
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-bold text-[#E8D2B5] uppercase">Departure</span>
                <p className="text-base font-serif font-bold text-white">New Delhi (DEL)</p>
                <p className="text-[11px] text-[#A5A79B]">Terminal 3, IGI Airport</p>
              </div>

              {/* Middle Non-Stop Indicator */}
              <div className="flex flex-col items-center px-4">
                <span className="text-[11px] font-bold text-[#590907] bg-[#E8D2B5] px-2.5 py-0.5 rounded-full mb-1">
                  3.5 Hrs Non-Stop
                </span>
                <div className="w-24 sm:w-36 h-0.5 bg-dashed bg-white/40 relative flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#E8D2B5] rotate-90" />
                </div>
                <span className="text-[10px] text-[#A5A79B] mt-1">Direct Flight</span>
              </div>

              {/* Destination */}
              <div className="text-right space-y-0.5">
                <span className="text-[10px] font-bold text-[#E8D2B5] uppercase">Arrival</span>
                <p className="text-base font-serif font-bold text-white">Tashkent (TAS)</p>
                <p className="text-[11px] text-[#A5A79B]">Islam Karimov Airport</p>
              </div>
            </div>

            {/* Travel Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-white/15 text-xs">
              <div>
                <span className="text-[10px] text-[#A5A79B] block">Operating Airlines:</span>
                <span className="font-bold text-white">Uzbekistan Airways, IndiGo</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A5A79B] block">Student Baggage:</span>
                <span className="font-bold text-[#E8D2B5]">Up to 46 KG (2 Bags)</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#A5A79B] block">Avg. Ticket Cost:</span>
                <span className="font-bold text-white">₹16,000 – ₹22,000 INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Airport Reception Card (5 cols) */}
        <div className="lg:col-span-5 bg-white/10 rounded-2xl p-6 border border-white/20 space-y-4">
          <div className="flex items-center gap-2 text-[#E8D2B5]">
            <ShieldCheck className="w-5 h-5 text-[#E8D2B5]" />
            <h4 className="font-serif font-bold text-sm text-white">End-to-End Travel & Arrival Facilitation</h4>
          </div>

          <ul className="space-y-2.5 text-xs text-[#F7F5F0]/90">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5] mt-1.5 shrink-0"></span>
              <span><strong>Group Departures:</strong> Students travel in supervised groups with MH Global senior staff from Delhi airport.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5] mt-1.5 shrink-0"></span>
              <span><strong>Tashkent Airport Reception:</strong> Official university coordinators welcome students directly outside immigration.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5] mt-1.5 shrink-0"></span>
              <span><strong>Express Train Transfers:</strong> High-speed Afrosiyob bullet train transit to Samarkand (2 hrs) & Bukhara (3.5 hrs).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8D2B5] mt-1.5 shrink-0"></span>
              <span><strong>Immediate SIM Card & Call Home:</strong> First-hour international calling SIM card setup so students can speak to parents upon arrival.</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal("Travel & Visa Assistance Consultation")}
              className="w-full py-3 bg-[#E8D2B5] hover:bg-white text-[#590907] font-black text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ask About 2026 Flight & Visa Schedules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DelhiToTashkentRouteCard;
