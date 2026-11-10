import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Building2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  DollarSign,
  Utensils,
  Award,
  Clock
} from "lucide-react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { CompareDrawer } from "./CompareDrawer";
import {
  universitiesData,
  formatLakhs,
  get6YearTuitionINR,
  get6YearCompletePackageINR,
  CANONICAL_PRICING_SUMMARY
} from "../../data/universitiesData";

export function UniversityCardsSection({ onOpenLeadModal }) {
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const featuredUnis = universitiesData.filter((u) => u.featured && !u.isDraft);

  const handleToggleCompare = (id) => {
    setSelectedForCompare((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        alert("You can select up to 3 universities to compare at once.");
        return prev;
      }
      return [...prev, id];
    });
  };

  const handleRemoveCompare = (id) => {
    setSelectedForCompare((prev) => prev.filter((item) => item !== id));
  };

  const handleClearCompare = () => {
    setSelectedForCompare([]);
  };

  return (
    <section className="space-y-8 font-sans">
      {/* Header with Direct-Answer GEO text */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#063280] bg-[#EBF3FA] px-3.5 py-1 rounded-full border border-[#D9E2EC]">
            Verified Medical Universities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#063280]">
            Recognized Medical Universities in Uzbekistan
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            All listed universities are state-recognized, compliant with India's NMC FMGL 2021 regulations, offer 100% English-medium instruction, and operate dedicated Indian mess facilities.
          </p>
        </div>

        <Link
          to="/universities/uzbekistan"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#063280] hover:text-[#1558A9] hover:underline self-start md:self-auto shrink-0"
        >
          <span>View All 10 Medical Universities</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 3-Column Responsive Grid with Uniform Height Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featuredUnis.map((uni) => {
          const isSelected = selectedForCompare.includes(uni.id);
          const annualUSD = uni.fees?.annualTuitionUSD || 0;
          const sixYearTuitionINR = get6YearTuitionINR(uni);
          const sixYearTotalINR = get6YearCompletePackageINR(uni);

          return (
            <div
              key={uni.id}
              className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl ${
                isSelected
                  ? "border-[#063280] ring-2 ring-[#063280]/20"
                  : "border-[#D9E2EC] hover:border-[#9ABAD9]"
              }`}
            >
              {/* Card Top: Image & Header Badges */}
              <div>
                <div className="relative">
                  <ImageWithFallback
                    src={uni.campusImage}
                    alt={`${uni.name} Campus`}
                    aspectRatio="aspect-16/10"
                    placeholderText={`${uni.name} Campus Photo`}
                    todoMarker={`TODO_REPLACE: Campus photograph for ${uni.name}`}
                  />

                  {/* University Type Badge */}
                  <div className="absolute top-3 left-3 bg-[#063280] text-white text-[11px] font-extrabold px-3 py-1 rounded-full shadow-md">
                    {uni.type} Academy
                  </div>

                  {/* Compare Checkbox in Top Right */}
                  <label
                    className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs text-[#063280] text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-md cursor-pointer select-none hover:bg-white"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleCompare(uni.id)}
                      className="w-3.5 h-3.5 rounded-sm text-[#063280] focus:ring-[#063280] cursor-pointer"
                    />
                    <span>Compare</span>
                  </label>
                </div>

                {/* Card Body: Uniform Data Rows */}
                <div className="p-6 space-y-4">
                  {/* Name & Location */}
                  <div>
                    <h3 className="text-lg font-black text-[#063280] leading-snug">
                      {uni.name}
                    </h3>
                    <p className="text-xs text-[#475569] flex items-center gap-1.5 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1558A9] shrink-0" />
                      <span>{uni.city}, Uzbekistan • Established {uni.establishedYear}</span>
                    </p>
                  </div>

                  {/* Uniform 2-Column Fee & Hospital Matrix */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-[#F7FAFC] p-3 rounded-2xl border border-[#D9E2EC] space-y-0.5">
                      <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">
                        Annual Tuition
                      </span>
                      <p className="font-black text-[#063280] text-sm">
                        ${annualUSD.toLocaleString()} USD
                      </p>
                      <p className="text-[11px] text-[#1558A9] font-bold">
                        6-Yr: {formatLakhs(sixYearTuitionINR)}
                      </p>
                    </div>

                    <div className="bg-[#F7FAFC] p-3 rounded-2xl border border-[#D9E2EC] space-y-0.5">
                      <span className="text-[10px] font-bold text-[#475569] uppercase tracking-wider block">
                        Clinical Bed Base
                      </span>
                      <p className="font-black text-[#063280] text-sm">
                        {uni.clinicalBeds ? `${uni.clinicalBeds.toLocaleString()}+ Beds` : "3,000+ Beds"}
                      </p>
                      <p className="text-[11px] text-emerald-700 font-bold">
                        State Hospital Hub
                      </p>
                    </div>
                  </div>

                  {/* Consistent Feature List (No truncated text) */}
                  <div className="space-y-2 text-xs text-[#475569] pt-1">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
                      <span><strong>Coursework:</strong> 54 Months Academic + 12 Months Internship</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
                      <span><strong>Faculty:</strong> 100% English-Medium Instruction</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
                      <span><strong>Indian Mess:</strong> Dedicated Veg & Halal Non-Veg 3 Meals/Day</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1558A9] shrink-0 mt-0.5" />
                      <span><strong>All-Inclusive 6-Yr Est:</strong> {formatLakhs(sixYearTotalINR)} (Tuition + Hostel + Mess)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 space-y-2">
                <Link
                  to={`/universities/uzbekistan/${uni.slug}`}
                  className="w-full block text-center py-3 px-4 bg-[#063280] hover:bg-[#1558A9] text-white font-extrabold rounded-xl text-xs sm:text-sm transition-all shadow-xs"
                >
                  View Verified Syllabus & Full Fees
                </Link>
                
                <button
                  onClick={() => onOpenLeadModal(`University Assessment: ${uni.name}`)}
                  className="w-full text-center py-2 text-xs font-bold text-[#1558A9] hover:text-[#063280] hover:underline cursor-pointer"
                >
                  Check Seat Availability for 2026 Intake
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Compare Drawer */}
      <CompareDrawer
        selectedIds={selectedForCompare}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
      />
    </section>
  );
}

export default UniversityCardsSection;
