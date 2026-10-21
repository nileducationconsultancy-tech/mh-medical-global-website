import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Search,
  Filter,
  MapPin,
  CheckCircle2,
  DollarSign,
  Scale,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from "lucide-react";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { universitiesData, USD_TO_INR_RATE } from "../data/universitiesData";
import { siteConfig } from "../config/site";

export function UniversitiesPage({ onOpenLeadModal }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all"); // "all", "Government", "Private"
  const [selectedCity, setSelectedCity] = useState("all"); // "all", "Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana"
  const [maxTuitionUSD, setMaxTuitionUSD] = useState(6500);
  const [sortBy, setSortBy] = useState("recommended"); // "recommended", "fee_low", "fee_high", "established"

  const cities = ["Tashkent", "Samarkand", "Bukhara", "Andijan", "Fergana"];

  // Filter & Sort Logic
  const filteredUniversities = useMemo(() => {
    return universitiesData
      .filter((u) => {
        const taglineText = (u.tagline || u.hero?.description || u.ranking || "").toLowerCase();
        const matchesSearch =
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          taglineText.includes(searchQuery.toLowerCase());

        const matchesType =
          selectedType === "all" || u.type.toLowerCase() === selectedType.toLowerCase();

        const matchesCity =
          selectedCity === "all" || u.city.toLowerCase() === selectedCity.toLowerCase();

        const matchesTuition = u.fees.annualTuitionUSD <= maxTuitionUSD;

        return matchesSearch && matchesType && matchesCity && matchesTuition;
      })
      .sort((a, b) => {
        if (sortBy === "fee_low") return a.fees.annualTuitionUSD - b.fees.annualTuitionUSD;
        if (sortBy === "fee_high") return b.fees.annualTuitionUSD - a.fees.annualTuitionUSD;
        if (sortBy === "established") return a.establishedYear - b.establishedYear;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [searchQuery, selectedType, selectedCity, maxTuitionUSD, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCity("all");
    setMaxTuitionUSD(6500);
    setSortBy("recommended");
  };

  const formatLakhs = (usdVal) => {
    const inrVal = Math.round(usdVal * USD_TO_INR_RATE);
    return `₹${(inrVal / 100000).toFixed(2)}L`;
  };

  return (
    <div className="space-y-12 pb-16">
      <SEOHead
        title="Medical Universities in Uzbekistan 2026: List of Government & Private Medical Colleges"
        description="Comprehensive directory of Uzbekistan medical universities for Indian students. Compare tuition fees, clinical hospital beds, NMC recognition, and admission requirements."
        canonicalUrl={`${siteConfig.siteUrl}/universities/uzbekistan`}
      />

      {/* Directory Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] via-[#0E438D] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-3.png" opacity="opacity-[0.14] sm:opacity-[0.18]" />
        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-[#9ABAD9] text-xs font-bold uppercase tracking-wider border border-[#9ABAD9]/30">
            <Building2 className="w-3.5 h-3.5" />
            Verified Medical Institutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Medical Universities in Uzbekistan
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto">
            Search, filter, and compare recognized state academies and modern private medical colleges with verified fees and clinical details.
          </p>
        </div>
      </section>

      {/* Main Directory Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar (4 Cols) */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-6 lg:sticky lg:top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#D9E2EC]">
              <div className="flex items-center gap-2 font-bold text-[#063280] text-sm">
                <Filter className="w-4 h-4 text-[#063280]" />
                <span>Filter Universities</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#475569] hover:text-[#063280] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Live Search Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-2">
                Search University / City
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Tashkent, Samarkand, TMA..."
                  className="w-full text-xs pl-10 pr-3.5 py-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] focus:outline-hidden"
                />
              </div>
            </div>

            {/* University Type Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-2">
                Institution Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["all", "Government", "Private"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border transition-all text-center cursor-pointer ${
                      selectedType.toLowerCase() === type.toLowerCase()
                        ? "bg-[#063280] text-white border-[#063280]"
                        : "bg-[#F7FAFC] text-[#475569] border-[#D9E2EC] hover:bg-[#EBF3FA]"
                    }`}
                  >
                    {type === "all" ? "All Types" : type}
                  </button>
                ))}
              </div>
            </div>

            {/* City Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#063280] mb-2">
                City / Location
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-[#D9E2EC] bg-[#F7FAFC] text-[#0F172A]"
              >
                <option value="all">All Cities in Uzbekistan</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Maximum Tuition Range Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
                <span>Max Annual Tuition:</span>
                <span className="text-[#063280] font-extrabold">${maxTuitionUSD.toLocaleString()} / yr</span>
              </div>
              <input
                type="range"
                min="3000"
                max="6500"
                step="100"
                value={maxTuitionUSD}
                onChange={(e) => setMaxTuitionUSD(parseInt(e.target.value))}
                className="w-full accent-[#063280] h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#475569]">
                <span>$3,000 (~₹2.5L)</span>
                <span>$6,500 (~₹5.5L)</span>
              </div>
            </div>

            {/* Quick Counselling Trigger */}
            <div className="p-4 rounded-2xl bg-[#EBF3FA] border border-[#D9E2EC] space-y-2">
              <p className="text-xs font-bold text-[#063280]">Confused which college suits your NEET score?</p>
              <p className="text-[11px] text-[#475569]">Our academic advisors provide personalized university shortlisting.</p>
              <button
                onClick={() => onOpenLeadModal("Directory Sidebar Free Consultation")}
                className="w-full py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer border-b-2 border-[#9B193A]"
              >
                Get Free University Shortlist
              </button>
            </div>
          </div>

          {/* Right University Cards Grid (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Bar Sort & Count */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#D9E2EC] shadow-2xs">
              <p className="text-xs font-bold text-[#0F172A]">
                Showing <span className="text-[#063280] font-extrabold">{filteredUniversities.length}</span> Verified Medical Universities
              </p>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#475569] font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] text-[#0F172A]"
                >
                  <option value="recommended">Recommended / Featured</option>
                  <option value="fee_low">Tuition: Low to High</option>
                  <option value="fee_high">Tuition: High to Low</option>
                  <option value="established">Established Year (Oldest)</option>
                </select>
              </div>
            </div>

            {/* University Cards */}
            {filteredUniversities.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl border border-[#D9E2EC] text-center space-y-4">
                <Building2 className="w-12 h-12 text-[#9ABAD9] mx-auto" />
                <h3 className="text-lg font-bold text-[#063280]">No Universities Match Your Filters</h3>
                <p className="text-xs text-[#475569] max-w-sm mx-auto">
                  Try adjusting the tuition fee slider or clearing the location filter.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#063280] text-white rounded-xl text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredUniversities.map((uni) => (
                  <div
                    key={uni.id}
                    className="bg-white rounded-3xl border border-[#D9E2EC] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
                  >
                    {/* Image Column (5 Cols) */}
                    <div className="md:col-span-5 relative h-56 md:h-auto overflow-hidden">
                      <img
                        src={uni.coverImage}
                        alt={uni.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full text-white shadow-xs ${
                          uni.type === "Government" ? "bg-[#063280]" : "bg-[#1558A9]"
                        }`}>
                          {uni.type}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 bg-[#063280]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#9ABAD9]" />
                        <span>{uni.city}, Uzbekistan</span>
                      </div>
                    </div>

                    {/* Content Column (7 Cols) */}
                    <div className="md:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-[#475569] font-bold">Est. {uni.establishedYear}</span>
                          <span className="text-[11px] font-bold text-[#063280] bg-[#EBF3FA] px-2 py-0.5 rounded border border-[#D9E2EC]">
                            100% English Medium
                          </span>
                        </div>
                        <h3 className="font-extrabold text-lg text-[#063280] leading-tight">
                          {uni.name}
                        </h3>
                        <p className="text-xs text-[#475569] line-clamp-2">
                          {uni.hero?.description || uni.ranking || "Top NMC Compliant Medical Institution"}
                        </p>
                      </div>

                      {/* Key Stats Row */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#D9E2EC] text-xs">
                        <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E2EC]">
                          <p className="text-[10px] text-[#475569] font-medium">Tuition / Yr</p>
                          <p className="font-black text-[#063280]">${uni.fees.annualTuitionUSD.toLocaleString()}</p>
                          <p className="text-[10px] text-[#1558A9] font-semibold">~{formatLakhs(uni.fees.annualTuitionUSD)}</p>
                        </div>
                        <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E2EC]">
                          <p className="text-[10px] text-[#475569] font-medium">Hostel / Yr</p>
                          <p className="font-bold text-[#063280]">${uni.fees.annualHostelUSD}</p>
                          <p className="text-[10px] text-[#475569]">Wi-Fi & Heating</p>
                        </div>
                        <div className="bg-[#F7FAFC] p-2 rounded-xl border border-[#D9E2EC]">
                          <p className="text-[10px] text-[#475569] font-medium">Hospital Beds</p>
                          <p className="font-bold text-[#063280]">
                            {uni.quickHighlights?.find((h) => h.label.includes("Beds"))?.value?.split(" ")[0] || "3,000+"}
                          </p>
                          <p className="text-[10px] text-[#475569] font-medium truncate">Clinical Bases</p>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="pt-2 flex flex-wrap items-center gap-2">
                        <Link
                          to={`/universities/uzbekistan/${uni.slug}`}
                          className="flex-1 text-center py-2.5 px-4 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-xs transition-colors shadow-2xs"
                        >
                          View Full Details & Fees
                        </Link>
                        <button
                          onClick={() => onOpenLeadModal(`Admission Letter Request for ${uni.name}`)}
                          className="px-3.5 py-2.5 bg-[#EBF3FA] text-[#063280] hover:bg-blue-100 font-bold rounded-xl text-xs transition-colors cursor-pointer border border-[#D9E2EC]"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
