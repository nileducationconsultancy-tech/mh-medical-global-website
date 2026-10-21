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
 * Prominent collage background overlay for page banners and hero headers.
 * Increased opacity (35-45%) brings forward medical campus & student imagery
 * while the soft navy gradient wash protects typography contrast.
 */
export function BannerBackground({
  image = "/collageimages/banner-1.png",
  opacity = "opacity-[0.35] sm:opacity-[0.45]",
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
        className={`w-full h-full object-cover object-center ${opacity} mix-blend-overlay filter contrast-120 saturate-125`}
      />
      {/* Soft gradient wash to guarantee contrast over text while showcasing background */}
      <div className="absolute inset-0 bg-linear-to-b from-[#063280]/50 via-[#063280]/30 to-[#063280]/70 pointer-events-none" />
    </div>
  );
}

export default BannerBackground;
