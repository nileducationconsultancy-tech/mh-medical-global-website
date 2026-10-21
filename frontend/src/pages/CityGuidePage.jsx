import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import BannerBackground, { getBannerImageBySeed } from "../components/common/BannerBackground";
import { cityGuidesData, getCityGuideBySlug } from "../data/cityGuidesData";
import { siteConfig } from "../config/site";
import {
  MapPin,
  Plane,
  Building2,
  DollarSign,
  ShieldCheck,
  Utensils,
  Train,
  CloudSun,
  Users,
  ArrowRight,
  Sparkles
} from "lucide-react";

export function CityGuidePage({ onOpenLeadModal }) {
  const { citySlug } = useParams();
  const location = useLocation();

  // Support direct route /study-mbbs-in-tashkent or param /cities/:citySlug
  const currentPath = location?.pathname ? location.pathname.replace(/^\//, "") : "";
  const slug = citySlug || currentPath || "study-mbbs-in-tashkent";
  const city = getCityGuideBySlug(slug) || cityGuidesData[0];

  const citySchema = [
    {
      "@type": "City",
      "@id": `${siteConfig.siteUrl}/${city.slug}#city`,
      "name": city.cityName,
      "containedInPlace": {
        "@type": "Country",
        "name": "Uzbekistan"
      },
      "description": city.overview
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteConfig.siteUrl}/${city.slug}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteConfig.siteUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": city.cityName,
          "item": `${siteConfig.siteUrl}/${city.slug}`
        }
      ]
    }
  ];

  return (
    <div className="space-y-12 pb-16 font-sans">
      <SEOHead
        title={city.title}
        description={city.metaDescription}
        canonicalUrl={`${siteConfig.siteUrl}/${city.slug}`}
        schema={citySchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image={getBannerImageBySeed(city?.slug || "tashkent")} opacity="opacity-[0.14] sm:opacity-[0.18]" />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#9ABAD9]" />
            Uzbekistan Medical Hub City Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            Study MBBS in {city.cityName}, Uzbekistan
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Living costs, flight connectivity from India, Indian food availability, security, and medical universities.
          </p>
        </div>
      </section>

      {/* Quick Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Monthly Living Cost</span>
            <p className="text-lg font-black text-slate-900">{city.avgMonthlyLivingCostUSD}</p>
            <p className="text-xs text-[#063280] font-bold">{city.avgMonthlyLivingCostINR} / mo</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Safety Rating</span>
            <p className="text-lg font-black text-[#063280]">{city.safetyIndex.split(" ")[0]}</p>
            <p className="text-xs text-slate-500">Safe Public Transit</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Airport / Travel</span>
            <p className="text-base font-bold text-slate-900 line-clamp-1">{city.airport.split("—")[0]}</p>
            <p className="text-xs text-[#1558A9] font-semibold">3-4 Hrs Flight to Delhi</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D9E2EC] shadow-2xs space-y-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase">Indian Food</span>
            <p className="text-base font-bold text-slate-900">Campus Indian Mess</p>
            <p className="text-xs text-[#9B193A] font-semibold">3 Fresh Meals Daily</p>
          </div>
        </div>
      </section>

      {/* Content Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <h2 className="text-xl font-black text-[#063280]">About Student Life in {city.cityName}</h2>
            <p>{city.overview}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4">
            <h3 className="text-lg font-black text-[#063280]">Key Highlights for Indian Students</h3>
            <div className="space-y-3">
              {city.highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#F7FAFC] border border-[#D9E2EC] space-y-1 text-xs">
                  <h4 className="font-bold text-[#063280] text-sm">{h.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4">
            <h3 className="text-lg font-black text-[#063280]">Itemized Monthly Living Expense in {city.cityName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#EBF3FA] text-[#063280] font-bold uppercase">
                    <th className="p-3 rounded-l-xl">Expense Category</th>
                    <th className="p-3">Cost in USD</th>
                    <th className="p-3 rounded-r-xl">Cost in INR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {city.livingCostBreakdown.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3 font-semibold text-slate-900">{item.item}</td>
                      <td className="p-3 text-slate-700">{item.costUSD}</td>
                      <td className="p-3 font-bold text-[#063280]">{item.costINR}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#D9E2EC] shadow-xs space-y-4">
            <h3 className="font-extrabold text-sm text-[#063280]">Medical Universities in {city.cityName}</h3>
            <ul className="space-y-2 text-xs">
              {city.universitiesInCity.map((u, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC] font-semibold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#063280] shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-br from-[#063280] to-[#1558A9] p-6 rounded-3xl text-white space-y-3 shadow-md">
            <span className="text-[11px] text-[#9ABAD9] font-bold uppercase">Personalized Assistance</span>
            <h4 className="text-base font-extrabold text-white">Want to Study in {city.cityName}?</h4>
            <p className="text-xs text-slate-200">Get hostel room availability, Indian mess video tours, and admission requirements.</p>
            <button
              onClick={() => onOpenLeadModal(`Admission Inquiry for ${city.cityName}`)}
              className="w-full py-2.5 bg-[#9B193A] hover:bg-[#851430] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
            >
              Get Free City Counselling
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
