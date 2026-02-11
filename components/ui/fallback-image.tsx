"use client";

import React, { ImgHTMLAttributes, useEffect, useState } from "react";

type FallbackImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  fallbackText?: string;
};

export default function FallbackImage({
  src,
  alt,
  className,
  fallbackSrc = "/profile.jpg",
  fallbackText = "Image unavailable",
  ...rest
}: FallbackImageProps) {
  const normalizedSrc = typeof src === "string" ? src : "";
  const [currentSrc, setCurrentSrc] = useState(normalizedSrc);
  const [failedOnFallback, setFailedOnFallback] = useState(false);

  useEffect(() => {
    setCurrentSrc(normalizedSrc);
    setFailedOnFallback(false);
  }, [normalizedSrc]);

  const handleError = () => {
    if (currentSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      return;
    }
    setFailedOnFallback(true);
  };

  if (failedOnFallback) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-200/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 text-sm ${className || ""}`}
      >
        {fallbackText}
      </div>
    );
  }

  return (
    <img
      {...rest}
      src={currentSrc || fallbackSrc}
      alt={alt || "Image"}
      className={className}
      decoding="async"
      onError={handleError}
    />
  );
}
