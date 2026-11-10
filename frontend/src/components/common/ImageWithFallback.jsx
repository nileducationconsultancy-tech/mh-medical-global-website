import React, { useState } from "react";
import { Building2 } from "lucide-react";

/**
 * ImageWithFallback
 * Resilient image component for university campuses, hospitals, and leadership photos.
 * Handles broken URLs gracefully with fallback rendering and clear TODO markers for authentic photography.
 */
export function ImageWithFallback({
  src,
  fallbackSrc = "/collageimages/banner-1.png",
  alt,
  className = "w-full h-full object-cover",
  loading = "lazy",
  decoding = "async",
  aspectRatio = "aspect-16/10",
  placeholderText = "Official Campus Photo",
  todoMarker = "TODO_REPLACE: Provide high-resolution authentic university campus photograph",
  ...props
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-linear-to-br from-[#063280] via-[#0E438D] to-[#1558A9] text-white p-4 text-center overflow-hidden ${aspectRatio}`}
        role="img"
        aria-label={alt || placeholderText}
        data-todo-marker={todoMarker}
      >
        <div className="absolute inset-0 bg-pattern-grid opacity-15 pointer-events-none"></div>
        <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-2 shadow-inner">
          <Building2 className="w-6 h-6 text-[#9ABAD9]" />
        </div>
        <p className="text-xs font-bold text-white tracking-wide max-w-[200px] line-clamp-2">
          {alt || placeholderText}
        </p>
        <span className="text-[10px] text-[#9ABAD9] mt-1 bg-black/25 px-2.5 py-0.5 rounded-full border border-white/10">
          Uzbekistan State Campus
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${aspectRatio}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <Building2 className="w-8 h-8 text-slate-300" />
        </div>
      )}
      <img
        src={src}
        alt={alt || placeholderText}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        {...props}
      />
    </div>
  );
}

export default ImageWithFallback;
