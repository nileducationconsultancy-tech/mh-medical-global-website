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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 font-sans">
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-[#D9E2EC] p-4 w-72 sm:w-80 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[#D9E2EC]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <p className="font-semibold text-sm text-[#063280]">MBBS Expert Counsellor Online</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#475569] hover:text-[#063280] p-1 rounded-full hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="py-3 text-xs text-[#475569] space-y-2">
            <p>
              👋 Welcome! Have questions about <strong>Uzbekistan universities, NMC rules, or 6-year fees</strong>?
            </p>
            <p className="text-[#475569]">Our senior medical admission advisors are ready to assist you.</p>
          </div>
          <div className="space-y-2 pt-1">
            <a
              href={whatsappUrl}
              target={isWaPlaceholder ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 bg-[#063280] hover:bg-[#1558A9] text-white font-medium py-2.5 px-4 rounded-xl text-xs transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 text-emerald-300" />
              Chat on WhatsApp Now
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenLeadModal) onOpenLeadModal("WhatsApp Widget Quick Consultation");
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#F7FAFC] hover:bg-[#EBF3FA] text-[#063280] border border-[#D9E2EC] font-medium py-2 px-4 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[#063280]" />
              Request Free Call Back
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact via WhatsApp or Request Call"
        className="group relative flex items-center justify-center w-14 h-14 bg-[#063280] hover:bg-[#1558A9] text-white rounded-full shadow-lg hover:shadow-blue-950/30 transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform text-[#9ABAD9]" />
      </button>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#D9E2EC] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-[#063280] via-[#0E438D] to-[#1558A9] text-white p-5 flex items-center justify-between relative border-b border-[#0B2D64]">
          <div className="pr-6">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#9B193A] text-white text-xs font-semibold tracking-wide uppercase mb-1">
              <Sparkles className="w-3 h-3 text-white" />
              1-on-1 Expert Admission Desk
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">{initialTitle}</h3>
          </div>
          <button
            onClick={handleReset}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#EBF3FA] text-[#063280] rounded-full flex items-center justify-center mx-auto border-2 border-[#063280]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-[#063280]">Application Received Successfully!</h4>
              <p className="text-[#475569] text-sm max-w-sm mx-auto">
                Thank you <strong>{formData.name}</strong>. Our senior MBBS counsellor will contact you on <strong>{formData.phone || formData.whatsapp}</strong> within 2 hours with verified university prospectuses and eligibility guidance.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-2.5 bg-[#063280] hover:bg-[#1558A9] text-white rounded-xl text-sm font-semibold transition-colors mt-2 cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-2 focus:ring-[#063280] focus:border-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">Mobile / Calling No. *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-2 focus:ring-[#063280] focus:border-[#063280]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="For brochure on WhatsApp"
                    className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-2 focus:ring-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:outline-hidden focus:ring-2 focus:ring-[#063280]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">NEET Status</label>
                  <select
                    value={formData.neetStatus}
                    onChange={(e) => setFormData({ ...formData, neetStatus: e.target.value })}
                    className="w-full text-xs px-2.5 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] text-[#0F172A]"
                  >
                    <option value="Qualified">NEET Qualified</option>
                    <option value="Appearing">Appearing This Year</option>
                    <option value="Not Appeared">Not Appeared</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">NEET Score (if known)</label>
                  <input
                    type="number"
                    value={formData.neetScore}
                    onChange={(e) => setFormData({ ...formData, neetScore: e.target.value })}
                    placeholder="e.g. 430"
                    className="w-full text-sm px-2.5 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">12th PCB %</label>
                  <input
                    type="number"
                    value={formData.pcbPercentage}
                    onChange={(e) => setFormData({ ...formData, pcbPercentage: e.target.value })}
                    placeholder="e.g. 78%"
                    className="w-full text-sm px-2.5 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">Preferred University</label>
                  <select
                    value={formData.preferredUniversity}
                    onChange={(e) => setFormData({ ...formData, preferredUniversity: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280] text-[#0F172A]"
                  >
                    <option value="Tashkent Medical Academy">Tashkent Medical Academy (Government)</option>
                    <option value="Samarkand State Medical University">Samarkand State Medical University (Government)</option>
                    <option value="Bukhara State Medical Institute">Bukhara State Medical Institute (Government)</option>
                    <option value="Andijan State Medical Institute">Andijan State Medical Institute (Government)</option>
                    <option value="Tashkent Pediatric Medical Institute">Tashkent Pediatric Medical Institute</option>
                    <option value="Central Asian University (CAU)">Central Asian University (CAU - Private)</option>
                    <option value="European Medical University (EMU)">European Medical University (EMU - Private)</option>
                    <option value="Undecided / Need Counsellor Suggestion">Need Counsellor Recommendation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#063280] mb-1">Your City / State</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Jaipur, Rajasthan"
                    className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#063280] mb-1">Specific Questions / Notes</label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Ask about hostel rooms, Indian food, total fees, or admission deadlines..."
                  className="w-full text-sm px-3 py-2 rounded-lg border border-[#D9E2EC] bg-[#F7FAFC] focus:ring-2 focus:ring-[#063280]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 bg-[#063280] hover:bg-[#1558A9] text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#9B193A]"
                >
                  {isSubmitting ? (
                    <span>Submitting Application...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#9ABAD9]" />
                      Get Free University Prospectus & Guidance
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-[#475569]">
                🔒 100% Privacy Guaranteed. We do not spam. All consultation is completely free of charge.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
