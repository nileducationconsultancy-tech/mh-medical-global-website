import React from "react";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { siteConfig } from "../../config/site";
import { track } from "../../utils/analytics";

export function StickyMobileBottomBar({ onOpenLeadModal }) {
  const isPhonePlaceholder = !siteConfig.phone || siteConfig.phone.startsWith("TODO_REPLACE");
  const phoneHref = isPhonePlaceholder ? "#" : `tel:${siteConfig.phone}`;

  const defaultWaMessage = encodeURIComponent(
    "Hello MH GLOBAL EDUCATION CONSULTANT, I would like guidance on MBBS in Uzbekistan 2026 intake."
  );
  const isWaPlaceholder = !siteConfig.whatsappNumber || siteConfig.whatsappNumber.startsWith("TODO_REPLACE");
  const waUrl = isWaPlaceholder ? "#" : `https://wa.me/${siteConfig.whatsappNumber}?text=${defaultWaMessage}`;

  return (
    <div className="block sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#D9E2EC] px-3 py-2.5 shadow-2xl font-sans">
      <div className="grid grid-cols-3 gap-2">
        {/* 1. Direct Call */}
        <a
          href={phoneHref}
          onClick={(e) => {
            track("sticky_bar_call_click");
            if (isPhonePlaceholder && onOpenLeadModal) {
              e.preventDefault();
              onOpenLeadModal("Sticky Bar Call Helpline");
            }
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#F7FAFC] border border-[#D9E2EC] text-[#063280] active:scale-95 transition-all text-center"
        >
          <Phone className="w-4 h-4 text-[#063280] mb-0.5" />
          <span className="text-[10px] font-extrabold leading-none">Call Expert</span>
        </a>

        {/* 2. WhatsApp Direct */}
        <a
          href={waUrl}
          target={isWaPlaceholder ? "_self" : "_blank"}
          rel="noopener noreferrer"
          onClick={(e) => {
            track("sticky_bar_whatsapp_click");
            if (isWaPlaceholder && onOpenLeadModal) {
              e.preventDefault();
              onOpenLeadModal("Sticky Bar WhatsApp Chat");
            }
          }}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600 text-white active:scale-95 transition-all text-center shadow-xs"
        >
          <MessageCircle className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-extrabold leading-none">WhatsApp</span>
        </a>

        {/* 3. Check Eligibility */}
        <Link
          to="/mbbs-eligibility"
          onClick={() => track("sticky_bar_eligibility_click")}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#063280] text-white active:scale-95 transition-all text-center shadow-xs"
        >
          <CheckCircle2 className="w-4 h-4 text-[#9ABAD9] mb-0.5" />
          <span className="text-[10px] font-extrabold leading-none">Eligibility</span>
        </Link>
      </div>
    </div>
  );
}

export default StickyMobileBottomBar;
