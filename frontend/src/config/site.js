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
  brandName: "MH Global Medical",
  legalName: "MH Global Education Consultant Pvt. Ltd.",
  tagline: "Authoritative Medical Education & Uzbekistan MBBS Discovery Platform",

  // Contact Information (Verified)
  phone: "+919310648055",
  phoneDisplay: "+91 93106 48055",
  whatsappNumber: "919310648055",
  
  // Verified Official Email
  email: "mhglobalmedical@gmail.com",
  supportEmail: "mhglobalmedical@gmail.com",

  // Addresses
  indiaOffice: {
    name: "India Head Office",
    streetAddress: "G-4, Maan House, School Block, Shakarpur",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    postalCode: "110092",
    addressCountry: "IN",
    fullAddress: "G-4, Maan House, School Block, Shakarpur, New Delhi, Delhi 110092, India",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=G-4,+Maan+House,+School+Block,+Shakarpur,+New+Delhi,+Delhi+110092,+India",
    operatingHours: "Monday – Saturday (9:30 AM – 7:00 PM IST)"
  },
  uzbekistanOffice: {
    name: "Uzbekistan Coordination Office",
    streetAddress: "Farabi Street, Olmazor District",
    addressLocality: "Tashkent",
    postalCode: "100109",
    addressCountry: "UZ",
    phone: ""
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
    name: "Dr. Firoz Khan",
    qualifications: "(MD Physician)",
    title: "Founder & Managing Director",
    role: "MBBS Academic Advisor & International Admissions Facilitator",
    photoUrl: "/founderImg/feeroz_pic.jpg"
  },

  // Counsellor CRM & Admin Portal Security
  admin: {
    username: "admin",
    // TODO_REPLACE: Set strong counsellor dashboard password before live launch
    password: "TODO_REPLACE_ADMIN_PASSWORD",
    fallbackPasskey: "mhglobal@2026"
  }
};
