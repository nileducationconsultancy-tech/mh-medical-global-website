import React from "react";
import { Plane, MapPin, Clock, Luggage, ShieldCheck, ArrowRight, Calendar } from "lucide-react";
import { CANONICAL_PRICING_SUMMARY } from "../../data/universitiesData";

export function DelhiToTashkentRouteCard({ onOpenLeadModal }) {
  return (
    <div className="bg-[#ECEDE8] rounded-3xl p-6 sm:p-10 text-[#201C1A] shadow-md relative overflow-hidden border border-[#DEDCD4] font-sans">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Flight Details & Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#590907] text-xs font-bold uppercase tracking-wider border border-[#DEDCD4] shadow-xs">
            <Plane className="w-3.5 h-3.5 text-[#590907]" />
            <span>Fastest International Route for Indian Students</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-[#201C1A] leading-tight">
            Direct 3.5-Hour Flight: New Delhi to Tashkent
          </h3>

          <p className="text-xs sm:text-sm text-[#77776F] leading-relaxed">
            Uzbekistan is geographically closer to India than almost any other overseas medical destination. Parents can board a morning flight from New Delhi and reach their child’s hostel by lunchtime.
          </p>

          {/* Interactive Route Timeline */}
          <div className="bg-white p-5 rounded-2xl border border-[#DEDCD4] space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              {/* Origin */}
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-bold text-[#590907] uppercase">Departure</span>
                <p className="text-base font-black text-[#201C1A]">New Delhi (DEL)</p>
                <p className="text-[11px] text-[#77776F]">Terminal 3, IGI Airport</p>
              </div>

              {/* Middle Non-Stop Indicator */}
              <div className="flex flex-col items-center px-4">
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                  3.5 Hrs Non-Stop
                </span>
                <div className="w-24 sm:w-36 h-0.5 bg-dashed bg-slate-300 relative flex items-center justify-center">
                  <Plane className="w-4 h-4 text-[#590907] rotate-90" />
                </div>
                <span className="text-[10px] text-[#77776F] mt-1">Direct Flight</span>
              </div>

              {/* Destination */}
              <div className="text-right space-y-0.5">
                <span className="text-[10px] font-bold text-[#590907] uppercase">Arrival</span>
                <p className="text-base font-black text-[#201C1A]">Tashkent (TAS)</p>
                <p className="text-[11px] text-[#77776F]">Islam Karimov Airport</p>
              </div>
            </div>

            {/* Travel Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#DEDCD4] text-xs">
              <div>
                <span className="text-[10px] text-[#77776F] block">Operating Airlines:</span>
                <span className="font-bold text-[#201C1A]">Uzbekistan Airways, IndiGo</span>
              </div>
              <div>
                <span className="text-[10px] text-[#77776F] block">Student Baggage:</span>
                <span className="font-bold text-emerald-700">Up to 46 KG (2 Bags)</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#77776F] block">Avg. Ticket Cost:</span>
                <span className="font-bold text-[#590907]">₹16,000 – ₹22,000 INR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Airport Reception Card (5 cols) */}
        <div className="lg:col-span-5 bg-[#E8D2B5]/50 rounded-2xl p-6 border border-[#DEDCD4] space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#590907]">
            <ShieldCheck className="w-5 h-5 text-[#590907]" />
            <h4 className="font-bold text-sm text-[#201C1A]">End-to-End Travel & Arrival Facilitation</h4>
          </div>

          <ul className="space-y-2.5 text-xs text-[#201C1A]">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#590907] mt-1.5 shrink-0"></span>
              <span><strong>Group Departures:</strong> Students travel in supervised groups with MH Global senior staff from Delhi airport.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#590907] mt-1.5 shrink-0"></span>
              <span><strong>Tashkent Airport Reception:</strong> Official university coordinators welcome students directly outside immigration.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#590907] mt-1.5 shrink-0"></span>
              <span><strong>Express Train Transfers:</strong> High-speed Afrosiyob bullet train transit to Samarkand (2 hrs) & Bukhara (3.5 hrs).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#590907] mt-1.5 shrink-0"></span>
              <span><strong>Immediate SIM Card & Call Home:</strong> First-hour international calling SIM card setup so students can speak to parents upon arrival.</span>
            </li>
          </ul>

          <div className="pt-2">
            <button
              onClick={() => onOpenLeadModal("Travel & Visa Assistance Consultation")}
              className="w-full py-3 bg-[#590907] hover:bg-[#3D0605] text-[#E8D2B5] font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#E8D2B5]/30"
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
