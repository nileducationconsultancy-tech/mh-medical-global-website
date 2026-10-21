import React from "react";

export const COLLAGE_BANNER_IMAGES = [
  "/collageimages/banner-1.png",
  "/collageimages/banner-2.png",
  "/collageimages/banner-3.png",
  "/collageimages/banner-4.png",
  "/collageimages/banner-5.png",
  "/collageimages/banner-6.png",
  "/collageimages/banner-7.png"
];

/**
 * Deterministically returns a banner image based on a numeric index or string slug
 */
export function getBannerImageBySeed(seed, fallbackIndex = 0) {
  if (typeof seed === "number") {
    return COLLAGE_BANNER_IMAGES[Math.abs(seed) % COLLAGE_BANNER_IMAGES.length];
  }
  if (typeof seed === "string" && seed.length > 0) {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash |= 0;
    }
    return COLLAGE_BANNER_IMAGES[Math.abs(hash) % COLLAGE_BANNER_IMAGES.length];
  }
  return COLLAGE_BANNER_IMAGES[fallbackIndex % COLLAGE_BANNER_IMAGES.length];
}

/**
 * Subtle collage background overlay for page banners and hero headers.
 * Minimal opacity (12-16%) preserves 100% typography contrast and accessibility
 * while introducing authentic medical student and campus imagery.
 */
export function BannerBackground({
  image = "/collageimages/banner-1.png",
  opacity = "opacity-[0.12] sm:opacity-[0.16]",
  className = ""
}) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <img
        src={image}
        alt=""
        role="presentation"
        loading="eager"
        decoding="async"
        className={`w-full h-full object-cover object-center ${opacity} mix-blend-overlay filter contrast-125 saturate-110`}
      />
      {/* Soft gradient wash to guarantee contrast over text */}
      <div className="absolute inset-0 bg-linear-to-b from-[#063280]/40 via-transparent to-[#063280]/60 pointer-events-none" />
    </div>
  );
}

export default BannerBackground;
