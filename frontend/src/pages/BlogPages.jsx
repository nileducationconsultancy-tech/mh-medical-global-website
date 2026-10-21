import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEOHead from "../components/common/SEOHead";
import BannerBackground from "../components/common/BannerBackground";
import { blogData, getBlogPostBySlug } from "../data/blogData";
import {
  BookOpen,
  Calendar,
  Clock,
  User,
  Tag,
  ArrowRight,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles
} from "lucide-react";
import { DisclaimerBanner } from "../components/common/SourceBadge";
import { siteConfig } from "../config/site";

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "NMC & Regulatory", "Fees & Budget", "University Rankings", "Medical Career & NExT"];

  const filteredPosts = selectedCategory === "All"
    ? blogData
    : blogData.filter((b) => b.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16 font-sans">
      <SEOHead
        title="Uzbekistan MBBS Knowledge Hub & Blog | NMC Guidelines, Fees & Rankings | MH GLOBAL EDUCATION CONSULTANT"
        description="Expert medical education articles, NMC FMGL regulations, NExT exam roadmaps, living costs, and verified university reviews for Indian medical students."
        canonicalUrl={`${siteConfig.siteUrl}/blog`}
      />

      <section className="relative overflow-hidden bg-linear-to-b from-[#063280] to-[#1558A9] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0B2D64]">
        <BannerBackground image="/collageimages/banner-7.png" opacity="opacity-[0.14] sm:opacity-[0.18]" />
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-[#9ABAD9]" />
            Knowledge Hub & Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            MBBS Abroad Research & Guides
          </h1>
          <p className="text-sm text-slate-200 max-w-2xl mx-auto">
            Authoritative, fact-checked analyses on NMC FMGL regulations, NExT exam strategies, fee transparency, and student experiences.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#063280] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-[#D9E2EC] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#063280]/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#063280]/90 backdrop-blur-xs text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#1558A9]" />
                      {post.publishDate}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1558A9]" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-extrabold text-[#063280] leading-snug">
                    <Link to={`/blog/${post.slug}`} className="hover:text-[#1558A9] transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <span className="text-xs font-semibold text-slate-700">By {post.author}</span>
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#063280] hover:text-[#1558A9]"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#9B193A]" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function BlogPostPage({ onOpenLeadModal }) {
  const { slug } = useParams();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-black text-slate-900">Article Not Found</h2>
        <p className="text-sm text-slate-500">The requested article could not be located.</p>
        <Link to="/blog" className="px-5 py-2.5 bg-[#0F2744] text-white rounded-xl text-xs font-bold">
          Return to Knowledge Hub
        </Link>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featuredImage,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "MH GLOBAL EDUCATION CONSULTANT",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteConfig.siteUrl}/mh-medical-logo.webp`
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.lastUpdated
  };

  return (
    <div className="space-y-12 pb-16 font-sans">
      <SEOHead
        title={`${post.title} | MH GLOBAL EDUCATION CONSULTANT Insights`}
        description={post.excerpt}
        canonicalUrl={`${siteConfig.siteUrl}/blog/${post.slug}`}
        schema={articleSchema}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pt-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link to="/" className="hover:text-slate-800">Home</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-slate-800">Blog</Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{post.title}</span>
        </div>

        {/* Title & Meta */}
        <div className="space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC] text-xs font-bold uppercase">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-[#063280] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-[#D9E2EC] pb-4">
            <span className="font-semibold text-slate-800">{post.author} ({post.authorRole})</span>
            <span>•</span>
            <span>Published: {post.publishDate}</span>
            <span>•</span>
            <span>Last Updated: {post.lastUpdated}</span>
            <span>•</span>
            <span className="text-[#063280] font-medium">{post.readTime}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-md max-h-96">
          <img src={post.featuredImage} alt={post.title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-4">
          <div className="whitespace-pre-line">
            {post.content}
          </div>
        </div>

        {/* Contextual Internal Links */}
        <div className="bg-[#EBF3FA] p-6 rounded-3xl border border-[#D9E2EC] space-y-3 text-xs">
          <h4 className="font-extrabold text-sm text-[#063280]">Helpful Next Steps & Resources:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/mbbs-fee-calculator" className="p-3 bg-white rounded-xl border border-[#D9E2EC] font-bold text-[#063280] hover:text-[#1558A9] flex items-center justify-between">
              <span>Calculate 6-Yr Budget</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/universities/uzbekistan/tashkent-medical-academy" className="p-3 bg-white rounded-xl border border-[#D9E2EC] font-bold text-[#063280] hover:text-[#1558A9] flex items-center justify-between">
              <span>TMA Fee Structure</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/universities/uzbekistan/samarkand-state-medical-university" className="p-3 bg-white rounded-xl border border-[#D9E2EC] font-bold text-[#063280] hover:text-[#1558A9] flex items-center justify-between">
              <span>SSMU Admission Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Tag className="w-3.5 h-3.5" />
            Tags:
          </span>
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs font-medium px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>

        <DisclaimerBanner />
      </article>
    </div>
  );
}
