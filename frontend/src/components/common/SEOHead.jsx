import React, { useEffect, useContext } from "react";
import { siteConfig } from "../../config/site";
import { HeadContext } from "../../context/HeadContext";

export default function SEOHead({
  title = "MBBS in Uzbekistan for Indian Students 2026: Fees & Colleges",
  description = "Study MBBS in Uzbekistan at NMC-compliant government medical universities. 100% English medium, 6-year budget from ₹20 Lakhs total. Calculate your fees now!",
  canonicalUrl = siteConfig.siteUrl,
  robots = "index, follow",
  schema = null,
  ogImage = `${siteConfig.siteUrl}/mh-medical-logo.webp`,
  ogType = "website"
}) {
  const headContext = useContext(HeadContext);

  // Clean canonical URL (absolute, no trailing slash unless root, no query parameters)
  let cleanCanonical = canonicalUrl || siteConfig.siteUrl;
  if (!cleanCanonical.startsWith("http")) {
    cleanCanonical = `${siteConfig.siteUrl}${cleanCanonical.startsWith("/") ? "" : "/"}${cleanCanonical}`;
  }
  // Strip query string and trailing slash if not root
  const urlObj = new URL(cleanCanonical, siteConfig.siteUrl);
  cleanCanonical = `${urlObj.origin}${urlObj.pathname.length > 1 ? urlObj.pathname.replace(/\/+$/, "") : "/"}`;

  // Record into HeadContext during SSR / Prerendering
  if (headContext) {
    headContext.title = title;
    headContext.description = description;
    headContext.canonicalUrl = cleanCanonical;
    headContext.robots = robots;
    headContext.og = {
      title,
      description,
      image: ogImage,
      url: cleanCanonical,
      type: ogType
    };
    headContext.twitter = {
      title,
      description,
      image: ogImage,
      card: "summary_large_image"
    };
    if (schema) {
      headContext.schemas = Array.isArray(schema) ? schema : [schema];
    }
  }

  // Client-side DOM manipulation
  useEffect(() => {
    if (typeof document === "undefined") return;

    // Document Title
    document.title = title;

    // Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Meta Robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.name = "robots";
      document.head.appendChild(metaRobots);
    }
    metaRobots.content = robots;

    // Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = cleanCanonical;

    // OpenGraph
    const setOgMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setOgMeta("og:title", title);
    setOgMeta("og:description", description);
    setOgMeta("og:url", cleanCanonical);
    setOgMeta("og:image", ogImage);
    setOgMeta("og:type", ogType);
    setOgMeta("og:site_name", siteConfig.brandName);

    // Twitter Card
    const setTwitterMeta = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.name = name;
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    setTwitterMeta("twitter:card", "summary_large_image");
    setTwitterMeta("twitter:title", title);
    setTwitterMeta("twitter:description", description);
    setTwitterMeta("twitter:image", ogImage);

    // Dynamic JSON-LD Schema
    let scriptTag = document.querySelector("#page-jsonld-schema");
    if (schema) {
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.id = "page-jsonld-schema";
        scriptTag.type = "application/ld+json";
        document.head.appendChild(scriptTag);
      }
      const schemaData = Array.isArray(schema) ? { "@context": "https://schema.org", "@graph": schema } : schema;
      scriptTag.text = JSON.stringify(schemaData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, cleanCanonical, robots, schema, ogImage, ogType]);

  return null;
}
