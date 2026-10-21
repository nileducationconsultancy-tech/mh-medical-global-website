/**
 * Central Configuration for MH GLOBAL EDUCATION CONSULTANT
 * Single Source of Truth for domain, contact, branding, tracking, and metadata.
 * 
 * Instructions:
 * Any field marked with 'TODO_REPLACE' must be replaced with the verified production
 * value by the domain owner before going live.
 */

export const siteConfig = {
  // Canonical Domain
  siteUrl: "https://www.mhglobalmedical.in",
  brandName: "MH GLOBAL EDUCATION CONSULTANT",
  legalName: "MH Global Education Consultant Pvt. Ltd.",
  tagline: "Authoritative Medical Education & Uzbekistan MBBS Discovery Platform",

  // Contact Information
  // TODO_REPLACE: Replace with verified company phone number
  phone: "TODO_REPLACE_PHONE_NUMBER", // e.g. "+91 9XXXXXXXXX"
  phoneDisplay: "TODO_REPLACE_PHONE_DISPLAY", // e.g. "+91 9XXXX XXXXX"
  
  // TODO_REPLACE: Replace with verified company WhatsApp number (digits only with country code, no + or spaces)
  whatsappNumber: "TODO_REPLACE_WHATSAPP_NUMBER", // e.g. "919XXXXXXXXX"
  
  // Verified Domain Email
  email: "admissions@mhglobalmedical.in",
  supportEmail: "support@mhglobalmedical.in",

  // Addresses
  indiaOffice: {
    name: "India Admissions HQ",
    // TODO_REPLACE: Verify exact physical street address in New Delhi
    streetAddress: "TODO_REPLACE_STREET_ADDRESS", // e.g. "Connaught Place"
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110001",
    addressCountry: "IN",
    operatingHours: "Monday – Saturday (9:30 AM – 7:00 PM IST)"
  },
  uzbekistanOffice: {
    name: "Uzbekistan Coordination Office",
    streetAddress: "Farabi Street, Olmazor District",
    addressLocality: "Tashkent",
    postalCode: "100109",
    addressCountry: "UZ",
    // TODO_REPLACE: Replace with verified local Uzbekistan coordinator hotline
    phone: "TODO_REPLACE_UZBEKISTAN_PHONE"
  },

  // Social Channels
  // TODO_REPLACE: Replace with verified official social media profile URLs
  social: {
    facebook: "TODO_REPLACE_FACEBOOK_URL",
    instagram: "TODO_REPLACE_INSTAGRAM_URL",
    youtube: "TODO_REPLACE_YOUTUBE_URL",
    linkedin: "TODO_REPLACE_LINKEDIN_URL"
  },

  // Tracking & Verification
  // TODO_REPLACE: Replace with verified Google Tag Manager Container ID
  gtmId: "GTM-TODO_REPLACE", // e.g. "GTM-XXXXXXX"
  
  // TODO_REPLACE: Replace with Google Search Console HTML verification token
  googleSearchConsoleToken: "TODO_REPLACE_GSC_TOKEN",

  // Founder Information
  founder: {
    name: "Dr. M. H. Akhtar",
    title: "Founder & Managing Director",
    role: "MBBS Academic Advisor & International Admissions Facilitator",
    // TODO_REPLACE: Replace with real founder portrait image path or URL
    photoUrl: "TODO_REPLACE_FOUNDER_PHOTO_URL"
  },

  // Counsellor CRM & Admin Portal Security
  admin: {
    username: "admin",
    // TODO_REPLACE: Set strong counsellor dashboard password before live launch
    password: "TODO_REPLACE_ADMIN_PASSWORD",
    fallbackPasskey: "mhglobal@2026"
  }
};
