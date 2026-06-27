"use client";

import { useState } from "react";
import Image from "next/image";

type ImageOption = {
  src: string;
  alt: string;
};

type Props = {
  placeholderId: number; // e.g., 1, 2
  options: [ImageOption, ImageOption, ImageOption]; // Must have exactly 3 options
  aspectRatioClass?: string;
  className?: string;
};

export default function ImagePlaceholderCarousel({
  placeholderId,
  options,
  aspectRatioClass = "aspect-[4/3]",
  className = "",
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const suffix = ["a", "b", "c"];
  const currentOptionCode = `${placeholderId}${suffix[currentIndex]}`;

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % 3);
  };

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + 3) % 3);
  };

  const selectIndex = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-stone-dark/30 ${aspectRatioClass} ${className}`}
    >
      {/* Current Image */}
      <Image
        src={options[currentIndex].src}
        alt={options[currentIndex].alt}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
      />

      {/* Option Identifier Label */}
      <div className="absolute top-4 left-4 z-20 rounded-md bg-brand px-3 py-1 text-xs font-mono font-extrabold uppercase tracking-widest text-stone-dark shadow-md">
        Option {currentOptionCode}
      </div>

      {/* Left/Right Cycle Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-stone-dark/70 p-2 text-foreground/80 shadow-lg backdrop-blur-sm transition-all hover:bg-brand hover:text-stone-dark hover:scale-105 active:scale-95"
        aria-label="Previous image option"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/10 bg-stone-dark/70 p-2 text-foreground/80 shadow-lg backdrop-blur-sm transition-all hover:bg-brand hover:text-stone-dark hover:scale-105 active:scale-95"
        aria-label="Next image option"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="h-4 w-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 rounded-full bg-stone-dark/50 px-2.5 py-1 backdrop-blur-sm">
        {options.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => selectIndex(idx, e)}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-brand w-3" : "bg-foreground/30 hover:bg-foreground/55"
            }`}
            aria-label={`Select image option ${placeholderId}${suffix[idx]}`}
          />
        ))}
      </div>

      {/* Subtle overlay to make label/controls pop */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-stone-dark/30 via-transparent to-stone-dark/20 pointer-events-none" />
    </div>
  );
}
