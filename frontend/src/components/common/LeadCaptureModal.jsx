import React, { useState } from "react";
import {
  MessageCircle,
  Phone,
  PhoneCall,
  X,
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Mail,
  CheckSquare,
  BarChart2,
  FlaskConical,
  Building2,
  MapPin,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Ban,
  Headphones,
  ChevronDown
} from "lucide-react";
import { saveLead } from "../../data/mockLeads";
import { submitToGoogleSheet } from "../../services/googleSheetService";
import { siteConfig } from "../../config/site";
import { track } from "../../utils/analytics";

export function WhatsAppFloat({ onOpenLeadModal }) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMessage = encodeURIComponent(
    "Hello MH GLOBAL EDUCATION CONSULTANT, I would like guidance regarding MBBS Admission in Uzbekistan (2026-2027 intake)."
  );
  
  const isWaPlaceholder = !siteConfig.whatsappNumber || siteConfig.whatsappNumber.startsWith("TODO_REPLACE");
  const whatsappUrl = isWaPlaceholder
    ? "#"
    : `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultMessage}`;

  const handleWhatsAppClick = (e) => {
    track("whatsapp_click", { location: "whatsapp_float" });
    if (isWaPlaceholder) {
      e.preventDefault();
      setIsOpen(false);
      if (onOpenLeadModal) onOpenLeadModal("WhatsApp Widget (Direct Helpline)");
    }
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-3 font-sans">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="font-bold text-sm text-[#082B57]">MBBS Expert Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-3 text-xs text-slate-600 space-y-1.5 leading-relaxed">
            <p>
              👋 Have questions about <strong>Uzbekistan universities, NMC rules, or 6-year fees</strong>?
            </p>
            <p className="text-slate-500">Connect directly with a verified senior counsellor.</p>
          </div>
          <div className="space-y-2 pt-1">
            <a
              href={whatsappUrl}
              target={isWaPlaceholder ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-white fill-white" />
              Chat on WhatsApp Directly
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenLeadModal) onOpenLeadModal("WhatsApp Widget Quick Consultation");
              }}
              className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-[#082B57] border border-slate-200 font-bold py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#082B57]" />
              Request Free Call Back
            </button>
          </div>
        </div>
      )}

      {/* Pill Styled WhatsApp Floating Trigger matching Reference */}
      <a
        href={whatsappUrl}
        target={isWaPlaceholder ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        aria-label="Chat with Our Expert on WhatsApp"
        className="group flex items-center gap-2.5 bg-white pl-2 pr-4 sm:pr-5 py-2 rounded-full shadow-xl hover:shadow-2xl border border-slate-200/90 hover:border-emerald-300 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform shrink-0">
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-white"></span>
          </span>
        </div>
        <div className="text-left leading-tight">
          <p className="text-xs sm:text-[13px] font-black text-[#082B57] tracking-tight group-hover:text-[#0752B8] transition-colors">
            Chat with Our Expert
          </p>
          <p className="text-[10px] sm:text-[11px] font-bold text-emerald-600">
            Get Instant Guidance
          </p>
        </div>
      </a>
    </div>
  );
}

export function LeadCaptureModal({ isOpen, onClose, initialTitle = "Book Free MBBS Abroad Counselling" }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    neetStatus: "Qualified",
    neetScore: "",
    pcbPercentage: "",
    preferredUniversity: "Tashkent Medical Academy (Govt)",
    budget: "₹20L - ₹25L",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sourcePath = typeof window !== "undefined" ? window.location.pathname : "";

    const leadPayload = {
      ...formData,
      state: formData.city,
      source: initialTitle,
      sourcePage: sourcePath,
      budgetRange: formData.budget,
      initialNote: formData.message
    };

    // Track analytics event for lead generation
    track("lead_form_submitted", {
      form_name: initialTitle,
      source_page: sourcePath,
      preferred_university: formData.preferredUniversity,
      budget: formData.budget
    });
    track("generate_lead", {
      value: formData.budget,
      currency: "INR"
    });

    // Mirror lead in mockLeads local repository
    saveLead(leadPayload);

    // Submit directly to Google Sheet Webhook & mirror in CRM
    await submitToGoogleSheet(leadPayload);

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  // User-facing heading (sanitizes internal button tracking labels like "Navbar...", "Mobile...", etc.)
  const getUserFacingTitle = () => {
    if (!initialTitle) return "Founder Advisory Direct Session";
    const lower = initialTitle.toLowerCase();
    if (
      lower.includes("navbar") ||
      lower.includes("top bar") ||
      lower.includes("mobile") ||
      lower.includes("footer") ||
      lower.includes("book free mbbs") ||
      lower.includes("cta") ||
      lower.includes("widget")
    ) {
      return "Founder Advisory Direct Session";
    }
    return initialTitle;
  };

  const displayTitle = getUserFacingTitle();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto font-sans">
      <div className="relative bg-white w-full max-w-4xl lg:max-w-5xl rounded-3xl sm:rounded-4xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[96vh] flex flex-col">
        {/* ========================================================= */}
        {/* 1. TOP HEADER: Dark Navy Bar */}
        {/* ========================================================= */}
        <div className="bg-linear-to-r from-[#060F1E] via-[#0A1A33] to-[#122442] text-white px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between relative border-b border-slate-800 shrink-0">
          <div className="relative min-w-0 pr-3">
            <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-tight tracking-tight truncate">
              {displayTitle}
            </h3>
            {/* Subtle Red Curve Accent under title */}
            <div className="h-0.5 w-16 sm:w-24 bg-linear-to-r from-[#D90436] to-transparent rounded-full mt-0.5"></div>
          </div>

          {/* Circular Dark Close Button with X */}
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95"
            aria-label="Close Modal"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* ========================================================= */}
        {/* 2. MODAL BODY: 2-Column Split (Visual Left, Form Right) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto">
          {/* Left Column: Visual Artwork matching reference screenshot */}
          <div className="hidden lg:flex lg:col-span-4 xl:col-span-4 relative flex-col justify-center items-center overflow-hidden bg-linear-to-b from-[#F5F8FC] via-[#FAF8F5] to-[#F7EFE4] p-3 border-r border-slate-100">
            <img
              src="/popup-advisor-visual.png"
              alt="Plan Your Medical Career Abroad - MH Global Medical Advisory Desk"
              className="w-full h-full max-h-[580px] object-contain object-center rounded-2xl select-none"
              loading="eager"
            />
          </div>

          {/* Right Column: High-Conversion Application Form */}
          <div className="col-span-1 lg:col-span-8 p-4 sm:p-6 lg:p-7 bg-white overflow-y-auto">
            {submitted ? (
              <div className="text-center py-10 sm:py-14 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500 shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-[#082B57]">
                  Founder Advisory Session Reserved!
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  Thank you <strong>{formData.name}</strong>. Our senior admissions advisor has received your request and will contact you directly on <strong>{formData.phone || formData.whatsapp}</strong> with verified university prospectuses, 6-year fee breakups, and NEET eligibility guidance.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-2.5 bg-[#082B57] hover:bg-[#0752B8] text-white rounded-full text-xs sm:text-sm font-bold transition-colors cursor-pointer shadow-md"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
                {/* Row 1: Student Full Name & Mobile / Calling No. */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1">
                      <User className="w-3.5 h-3.5 text-[#88081E]" />
                      <span>Student Full Name</span>
                      <span className="text-[#D90436] font-bold">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1">
                      <PhoneCall className="w-3.5 h-3.5 text-[#88081E]" />
                      <span>Mobile / Calling No.</span>
                      <span className="text-[#D90436] font-bold">*</span>
                    </label>
                    <div className="flex items-center rounded-xl border border-slate-200/90 bg-[#F8FAFC] focus-within:ring-2 focus-within:ring-[#0752B8] focus-within:bg-white transition-all shadow-2xs overflow-hidden">
                      <div className="flex items-center gap-1 pl-3 pr-2 py-2.5 text-xs font-bold text-slate-700 shrink-0 border-r border-slate-200 bg-slate-50/70">
                        <span className="text-sm leading-none">🇮🇳</span>
                        <ChevronDown className="w-3 h-3 text-slate-400" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 93106 48055"
                        className="w-full text-xs sm:text-sm px-3 py-2.5 bg-transparent text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: WhatsApp Number & Email Address */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
                      <span>WhatsApp Number</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      placeholder="For brochure on WhatsApp"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1">
                      <Mail className="w-3.5 h-3.5 text-[#88081E]" />
                      <span>Email Address</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 3: NEET Status, NEET Score, 12th PCB % */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-3.5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1 truncate">
                      <CheckSquare className="w-3.5 h-3.5 text-[#88081E] shrink-0" />
                      <span>NEET Status</span>
                    </label>
                    <select
                      value={formData.neetStatus}
                      onChange={(e) => setFormData({ ...formData, neetStatus: e.target.value })}
                      className="w-full text-xs sm:text-sm px-2.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="Qualified">Qualified</option>
                      <option value="Appearing (2026/2027)">Appearing (2026/2027)</option>
                      <option value="Not Qualified">Not Qualified</option>
                      <option value="Exempt / NRI">Exempt / NRI</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1 truncate">
                      <BarChart2 className="w-3.5 h-3.5 text-[#88081E] shrink-0" />
                      <span>NEET Score</span>
                    </label>
                    <input
                      type="number"
                      value={formData.neetScore}
                      onChange={(e) => setFormData({ ...formData, neetScore: e.target.value })}
                      placeholder="e.g. 430"
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1 truncate">
                      <FlaskConical className="w-3.5 h-3.5 text-[#88081E] shrink-0" />
                      <span>12th PCB %</span>
                    </label>
                    <input
                      type="text"
                      value={formData.pcbPercentage}
                      onChange={(e) => setFormData({ ...formData, pcbPercentage: e.target.value })}
                      placeholder="e.g. 78%"
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 4: Preferred University & City */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1 truncate">
                      <Building2 className="w-3.5 h-3.5 text-[#88081E] shrink-0" />
                      <span>Preferred University</span>
                    </label>
                    <select
                      value={formData.preferredUniversity}
                      onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                      className="w-full text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs cursor-pointer"
                    >
                      <option value="Tashkent Medical Academy (Govt)">Tashkent Medical Academy (Govt)</option>
                      <option value="International University of Turkic States (IUTS)">International University of Turkic States (IUTS)</option>
                      <option value="Samarkand State Medical University (Govt)">Samarkand State Medical University (Govt)</option>
                      <option value="Bukhara State Medical Institute (Govt)">Bukhara State Medical Institute (Govt)</option>
                      <option value="Andijan State Medical Institute (Govt)">Andijan State Medical Institute (Govt)</option>
                      <option value="Central Asian University (CAU)">Central Asian University (CAU)</option>
                      <option value="Undecided / Need Counsellor Suggestion">Undecided / Need Counsellor Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1 truncate">
                      <MapPin className="w-3.5 h-3.5 text-[#88081E]" />
                      <span>Your City / State</span>
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs"
                    />
                  </div>
                </div>

                {/* Row 5: Specific Questions / Notes */}
                <div>
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#082B57] mb-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#88081E]" />
                    <span>Specific Questions / Notes</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask about hostel rooms, Indian food, total fees, or admission deadlines..."
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200/90 bg-[#F8FAFC] text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0752B8] focus:bg-white transition-all shadow-2xs resize-none"
                  />
                </div>

                {/* Row 6: Big Red Pill CTA Button matching reference */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-full bg-linear-to-r from-[#D90436] via-[#B8002B] to-[#990024] hover:from-[#B8002B] hover:to-[#80001D] text-white font-extrabold text-xs sm:text-sm md:text-base tracking-wide transition-all duration-200 shadow-lg shadow-red-950/20 active:scale-98 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Submitting Application...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-white -rotate-12" />
                        <span>Get Free University Prospectus & Guidance</span>
                        <ArrowRight className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </div>

                {/* Row 7: Trust Badges matching reference */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-600 font-semibold pt-1">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#88081E]" />
                    <span>100% Privacy Guaranteed</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <div className="flex items-center gap-1.5">
                    <Ban className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#88081E]" />
                    <span>Zero Spam</span>
                  </div>
                  <span className="text-slate-300 hidden sm:inline">|</span>
                  <div className="flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#88081E]" />
                    <span>Free Guidance</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Decorative Curved Accent Bar */}
        <div className="h-2 w-full bg-linear-to-r from-[#88081E] via-[#D90436] to-[#88081E] shrink-0" />
      </div>
    </div>
  );
}

export default LeadCaptureModal;
