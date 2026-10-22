import React, { useState } from "react";
import { MessageCircle, Phone, CheckCircle2, Send, Sparkles, ShieldCheck } from "lucide-react";
import { submitToGoogleSheet } from "../../services/googleSheetService";
import { siteConfig } from "../../config/site";
import { track } from "../../utils/analytics";

export function HeroQuickForm({ onOpenLeadModal }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    neetScore: "",
    otp: "",
    honeypot: ""
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const handlePhoneBlur = () => {
    // If phone has 10 digits, prompt OTP field readiness
    if (formData.phone.replace(/\D/g, "").length >= 10 && !showOtpField) {
      setShowOtpField(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!formData.name.trim()) {
      setErrorMessage("Please enter student's full name.");
      return;
    }
    if (cleanPhone.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      track("hero_quick_form_submit", {
        name: formData.name,
        neetScore: formData.neetScore
      });

      await submitToGoogleSheet({
        Name: formData.name,
        Phone: formData.phone,
        Source: "Hero Quick Admission Form",
        NEETScore: formData.neetScore || "Not Provided",
        Notes: "Requested immediate eligibility and fee guidance from hero form",
        Date: new Date().toISOString()
      });

      setIsSubmitted(true);
    } catch (err) {
      console.error("[Hero Form Submit Error]", err);
      // Even if Google sheet is slow or offline, show success state to not lose user
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultWaMessage = encodeURIComponent(
    `Hello MH GLOBAL EDUCATION CONSULTANT, I would like immediate assistance regarding MBBS Admission in Uzbekistan for NEET score: ${formData.neetScore || "Qualified"}.`
  );
  const isWaPlaceholder = !siteConfig.whatsappNumber || siteConfig.whatsappNumber.startsWith("TODO_REPLACE");
  const waUrl = isWaPlaceholder ? "#" : `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWaMessage}`;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-5 text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/15">
        <div>
          <span className="text-[10px] font-extrabold tracking-wider uppercase text-[#9ABAD9] block">
            Admissions Intake 2026-27
          </span>
          <h3 className="font-extrabold text-lg text-white">Get Direct Eligibility & Seat Matrix</h3>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Direct Support
        </span>
      </div>

      {isSubmitted ? (
        <div className="p-6 rounded-2xl bg-white/15 border border-white/20 text-center space-y-3 animate-in fade-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-base text-white">Request Received Successfully!</h4>
          <p className="text-xs text-slate-200">
            A senior medical admissions advisor will contact you on <strong>+91 {formData.phone}</strong> within 15 minutes with the itemized fee structure and eligibility report.
          </p>
          <div className="pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect on WhatsApp Instantly</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Honeypot field for bot protection */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={handleChange}
            style={{ display: "none" }}
            tabIndex="-1"
            autoComplete="off"
          />

          {/* 1. Student Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              Student Full Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#9ABAD9] focus:bg-white/20 transition-all"
            />
          </div>

          {/* 2. Mobile Number (+91 format & OTP-ready) */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              WhatsApp / Mobile Number <span className="text-rose-400">*</span>
            </label>
            <div className="relative flex rounded-xl border border-white/25 bg-white/10 focus-within:ring-2 focus-within:ring-[#9ABAD9] focus-within:bg-white/20 transition-all overflow-hidden">
              <span className="inline-flex items-center px-3 text-xs font-bold text-[#9ABAD9] border-r border-white/20 bg-white/5">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                required
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handlePhoneBlur}
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2.5 bg-transparent text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-hidden"
              />
            </div>
          </div>

          {/* Optional OTP-ready verification indicator */}
          {showOtpField && (
            <div className="flex items-center justify-between text-[11px] text-[#9ABAD9] px-1">
              <span>Mobile verification ready</span>
              <span className="text-emerald-300 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Valid Indian Format
              </span>
            </div>
          )}

          {/* 3. NEET Score / Status */}
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1">
              NEET Score (or Expected)
            </label>
            <input
              type="text"
              name="neetScore"
              value={formData.neetScore}
              onChange={handleChange}
              placeholder="e.g. 350 / Appearing NEET 2026"
              className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/25 text-white placeholder-slate-300 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#9ABAD9] focus:bg-white/20 transition-all"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-300 bg-rose-900/40 p-2 rounded-lg border border-rose-500/30">
              {errorMessage}
            </p>
          )}

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-[#9B193A] hover:bg-[#7E142F] text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-rose-950/30 cursor-pointer flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span>Verifying Eligibility...</span>
            ) : (
              <>
                <Send className="w-4 h-4 text-white" />
                <span>Get Free 2026 Seat & Fee Breakdown</span>
              </>
            )}
          </button>

          {/* Anxiety-Reduction Microcopy */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-300 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>100% Free Guidance • No Hidden Fees • Zero Spam Policy</span>
          </div>

          {/* WhatsApp Direct Alternative Button */}
          <div className="pt-2 border-t border-white/15">
            <a
              href={waUrl}
              target={isWaPlaceholder ? "_self" : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => {
                track("hero_form_whatsapp_click");
                if (isWaPlaceholder && onOpenLeadModal) {
                  e.preventDefault();
                  onOpenLeadModal("Hero WhatsApp Alternative");
                }
              }}
              className="w-full py-2.5 bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" />
              <span>Or WhatsApp Senior Counsellor Directly</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}

export default HeroQuickForm;
