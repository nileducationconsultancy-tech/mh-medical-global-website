import React, { useState } from "react";
import { MessageCircle, Phone, X, CheckCircle2, Send, Sparkles } from "lucide-react";
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
    preferredUniversity: "Tashkent Medical Academy",
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

    // Submit directly to Google Sheet Webhook & mirror in CRM
    await submitToGoogleSheet(leadPayload);

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[96vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-[#0B0F19] via-[#0F172A] to-[#1E293B] text-white px-4 py-2.5 sm:px-5 sm:py-3 flex items-center justify-between relative border-b border-slate-700/60 shrink-0">
          <div className="pr-3 flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#9B193A] text-white text-[10px] font-bold tracking-wide uppercase shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-white" />
              1-on-1 Expert Desk
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">{initialTitle}</h3>
          </div>
          <button
            onClick={handleReset}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-4.5 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-[#EBF3FA] text-[#063280] rounded-full flex items-center justify-center mx-auto border-2 border-[#063280]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-[#063280]">Application Received Successfully!</h4>
              <p className="text-[#475569] text-xs max-w-sm mx-auto leading-relaxed">
                Thank you <strong>{formData.name}</strong>. Our senior MBBS counsellor will contact you on <strong>{formData.phone || formData.whatsapp}</strong> within 2 hours with verified university prospectuses and eligibility guidance.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-5 py-2 bg-[#063280] hover:bg-[#1558A9] text-white rounded-lg text-xs font-semibold transition-colors mt-1 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2">
              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-1 focus:ring-[#063280] focus:border-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Mobile / Calling No. *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 93106 48055"
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-1 focus:ring-[#063280] focus:border-[#063280]"
                  />
                </div>
              </div>

              {/* Row 2: WhatsApp & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="For brochure on WhatsApp"
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-1 focus:ring-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-1 focus:ring-[#063280]"
                  />
                </div>
              </div>

              {/* Row 3: NEET Status, Score, 12th PCB */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5 truncate">NEET Status</label>
                  <select
                    value={formData.neetStatus}
                    onChange={(e) => setFormData({ ...formData, neetStatus: e.target.value })}
                    className="w-full text-xs px-2 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280] text-[#0F172A]"
                  >
                    <option value="Qualified">Qualified</option>
                    <option value="Appearing">Appearing</option>
                    <option value="Not Appeared">Not Appeared</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5 truncate">NEET Score</label>
                  <input
                    type="number"
                    value={formData.neetScore}
                    onChange={(e) => setFormData({ ...formData, neetScore: e.target.value })}
                    placeholder="e.g. 430"
                    className="w-full text-xs px-2 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5 truncate">12th PCB %</label>
                  <input
                    type="number"
                    value={formData.pcbPercentage}
                    onChange={(e) => setFormData({ ...formData, pcbPercentage: e.target.value })}
                    placeholder="e.g. 78%"
                    className="w-full text-xs px-2 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280]"
                  />
                </div>
              </div>

              {/* Row 4: Preferred University & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Preferred University</label>
                  <select
                    value={formData.preferredUniversity}
                    onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280] text-[#0F172A]"
                  >
                    <option value="Tashkent Medical Academy">Tashkent Medical Academy (Govt)</option>
                    <option value="Samarkand State Medical University">Samarkand State Medical Univ (Govt)</option>
                    <option value="Bukhara State Medical Institute">Bukhara State Medical Inst (Govt)</option>
                    <option value="Andijan State Medical Institute">Andijan State Medical Inst (Govt)</option>
                    <option value="Tashkent Pediatric Medical Institute">Tashkent Pediatric Medical Inst</option>
                    <option value="Central Asian University (CAU)">Central Asian University (CAU)</option>
                    <option value="European Medical University (EMU)">European Medical University (EMU)</option>
                    <option value="Undecided / Need Counsellor Suggestion">Need Counsellor Recommendation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Your City / State</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280]"
                  />
                </div>
              </div>

              {/* Row 5: Notes / Questions */}
              <div>
                <label className="block text-[11px] font-bold text-[#063280] mb-0.5">Specific Questions / Notes</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about hostel rooms, Indian food, total fees, or admission deadlines..."
                  className="w-full text-xs px-2.5 py-1.5 h-8 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-1 focus:ring-[#063280]"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-lg text-xs sm:text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#9B193A] active:scale-99 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-white" />
                      <span>Get Free University Prospectus & Guidance</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-[#475569] leading-tight">
                🔒 100% Privacy Guaranteed • Zero Spam • Free Guidance
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
