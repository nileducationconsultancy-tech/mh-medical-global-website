import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, X } from "lucide-react";

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("mh_cookie_consent");
      if (!consent) {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mh_cookie_consent", "accepted");
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("mh_cookie_consent", "declined");
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-16 sm:bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-white rounded-2xl p-4 sm:p-5 border border-[#D9E2EC] shadow-2xl font-sans animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#EBF3FA] text-[#063280] flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-xs sm:text-sm text-[#063280]">Privacy & Cookie Notice</h4>
        </div>

        <p className="text-xs text-[#475569] leading-relaxed">
          We use cookies and telemetry strictly to improve your counselling experience, remember calculator preferences, and ensure secure lead submissions. We never sell your data. Read our{" "}
          <Link to="/privacy-policy" className="text-[#063280] font-bold underline hover:text-[#1558A9]">
            Privacy Policy
          </Link>.
        </p>

        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            onClick={handleDecline}
            className="px-3 py-1.5 rounded-xl border border-[#D9E2EC] text-[#475569] hover:text-[#063280] hover:bg-slate-50 text-xs font-bold transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-1.5 rounded-xl bg-[#063280] hover:bg-[#1558A9] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentBanner;
