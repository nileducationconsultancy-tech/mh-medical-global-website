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
    <div className="space-y-12 pb-16 font-sans bg-[#F7F5F0]">
      <SEOHead
        title={city.title}
        description={city.metaDescription}
        canonicalUrl={`${siteConfig.siteUrl}/${city.slug}`}
        schema={citySchema}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#590907] via-[#3F0605] to-[#201C1A] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#3F0605]">
        <BannerBackground image={getBannerImageBySeed(city?.slug || "tashkent")} />
        <div className="relative max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-[#E8D2B5] text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#E8D2B5]" />
            Uzbekistan Medical Hub City Guide
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
            Study MBBS in {city.cityName}, Uzbekistan
          </h1>
          <p className="text-sm text-[#E8D2B5]/90 max-w-2xl mx-auto">
            Living costs, flight connectivity from India, Indian food availability, security, and medical universities.
          </p>
        </div>
      </section>

      {/* Quick Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#DEDCD4] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#77776F] font-semibold uppercase">Monthly Living Cost</span>
            <p className="text-lg font-serif font-black text-[#201C1A]">{city.avgMonthlyLivingCostUSD}</p>
            <p className="text-xs text-[#590907] font-bold">{city.avgMonthlyLivingCostINR} / mo</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DEDCD4] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#77776F] font-semibold uppercase">Safety Rating</span>
            <p className="text-lg font-serif font-black text-[#590907]">{city.safetyIndex.split(" ")[0]}</p>
            <p className="text-xs text-[#77776F]">Safe Public Transit</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DEDCD4] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#77776F] font-semibold uppercase">Airport / Travel</span>
            <p className="text-base font-bold text-[#201C1A] line-clamp-1">{city.airport.split("—")[0]}</p>
            <p className="text-xs text-[#590907] font-semibold">3-4 Hrs Flight to Delhi</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#DEDCD4] shadow-2xs space-y-1">
            <span className="text-[11px] text-[#77776F] font-semibold uppercase">Indian Food</span>
            <p className="text-base font-bold text-[#201C1A]">Campus Indian Mess</p>
            <p className="text-xs text-[#590907] font-semibold">3 Fresh Meals Daily</p>
          </div>
        </div>
      </section>

      {/* Content Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4 text-xs sm:text-sm text-[#77776F] leading-relaxed">
            <h2 className="text-xl font-serif font-black text-[#590907]">About Student Life in {city.cityName}</h2>
            <p>{city.overview}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-black text-[#590907]">Key Highlights for Indian Students</h3>
            <div className="space-y-3">
              {city.highlights.map((h, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#ECEDE8] border border-[#DEDCD4] space-y-1 text-xs">
                  <h4 className="font-serif font-bold text-[#201C1A] text-sm">{h.title}</h4>
                  <p className="text-[#77776F] leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4">
            <h3 className="text-lg font-serif font-black text-[#590907]">Itemized Monthly Living Expense in {city.cityName}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#ECEDE8] text-[#590907] font-bold uppercase">
                    <th className="p-3 rounded-l-xl">Expense Category</th>
                    <th className="p-3">Cost in USD</th>
                    <th className="p-3 rounded-r-xl">Cost in INR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {city.livingCostBreakdown.map((item, i) => (
                    <tr key={i}>
                      <td className="p-3 font-semibold text-[#201C1A]">{item.item}</td>
                      <td className="p-3 text-[#77776F]">{item.costUSD}</td>
                      <td className="p-3 font-bold text-[#590907]">{item.costINR}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-[#DEDCD4] shadow-xs space-y-4">
            <h3 className="font-serif font-bold text-sm text-[#590907]">Medical Universities in {city.cityName}</h3>
            <ul className="space-y-2 text-xs">
              {city.universitiesInCity.map((u, i) => (
                <li key={i} className="p-2.5 rounded-xl bg-[#ECEDE8] border border-[#DEDCD4] font-semibold text-[#201C1A] flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#590907] shrink-0" />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-linear-to-br from-[#590907] via-[#3F0605] to-[#201C1A] p-6 rounded-3xl text-white space-y-3 shadow-md border border-[#E8D2B5]/20">
            <span className="text-[11px] text-[#E8D2B5] font-bold uppercase">Personalized Assistance</span>
            <h4 className="text-base font-serif font-bold text-white">Want to Study in {city.cityName}?</h4>
            <p className="text-xs text-[#E8D2B5]/90">Get hostel room availability, Indian mess video tours, and admission requirements.</p>
            <button
              onClick={() => onOpenLeadModal(`Admission Inquiry for ${city.cityName}`)}
              className="w-full py-2.5 bg-[#E8D2B5] hover:bg-[#dec29f] text-[#201C1A] font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs border-b-2 border-[#caa97f]"
            >
              Get Free City Counselling
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
