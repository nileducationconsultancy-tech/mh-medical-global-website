import React, { useEffect } from "react";

export default function SEOHead({
  title = "MH GLOBAL EDUCATION CONSULTANT | MBBS in Uzbekistan Platform",
  description = "Authoritative MBBS abroad discovery portal for Indian medical aspirants. Verified Uzbekistan medical universities, fees in INR/USD, NMC FMGL compliance, and expert admission counselling.",
  canonicalUrl = "https://mhglobaledu.com",
  schema = null,
}) {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = title;

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    // Dynamic Schema Injection
    let scriptTag = document.querySelector("#page-jsonld-schema");
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "page-jsonld-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalUrl, schema]);

  return null;
}
