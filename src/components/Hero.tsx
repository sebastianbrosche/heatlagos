"use client";

import { useEffect, useState } from "react";
import DiscoverMenu from "./DiscoverMenu";

const VIDEO_DESKTOP = "/hero-desktop.mp4";
const VIDEO_MOBILE = "/hero-mobile.mp4";

function shouldSkipVideo(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return true;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (conn?.saveData) return true;
    if (conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g")
      return true;
  } catch {
    /* ignore */
  }
  return false;
}

function HeroMedia({ className }: { className: string }) {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (!shouldSkipVideo()) setShowVideo(true);
  }, []);

  return (
    <div className={`${className} bg-stone-dark`}>
      {showVideo && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src={VIDEO_MOBILE}
            type="video/mp4"
            media="(max-width: 767px)"
          />
          <source src={VIDEO_DESKTOP} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative w-full">
      {/* Mobile: video pinned to top, text stacked below */}
      <div className="relative sm:hidden">
        <div className="h-[86px]" aria-hidden />
        <div className="relative w-full overflow-hidden bg-stone-dark">
          <div className="relative w-full pt-[56.25%]">
            <HeroMedia className="absolute inset-0" />
          </div>
        </div>
        <div className="flex flex-col items-start px-5 pt-8 pb-16">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand">
            Welcome to Heat Lagos
          </p>
          <h1 className="font-serif text-[1.9rem] leading-[1.05]">
            Infrared <em className="text-brand">Pilates</em>, Yoga, Sculpt,
            Mobility <span className="text-brand-soft">& more.</span>
          </h1>
          <p className="mt-6 text-sm text-foreground/80">
            Grand Opening May 1–3! All Classes are FREE.{" "}
            <a
              href="https://backoffice.bsport.io/customer/payment/pass/751506/?membership=5821&force=true"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand/50 underline-offset-4 text-brand hover:text-brand-soft hover:decoration-brand transition-colors"
            >
              Book here!
            </a>
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DiscoverMenu />
            <a
              href="https://backoffice.bsport.io/customer/payment/pass/751506/?membership=5821&force=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full border border-foreground/30 bg-foreground/5 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/50 transition-colors"
            >
              Book
            </a>
          </div>
        </div>
      </div>

      {/* Desktop / tablet: full-screen video background with overlaid text */}
      <div className="relative hidden h-screen min-h-[700px] w-full overflow-hidden bg-stone-dark sm:block">
        <HeroMedia className="pointer-events-none absolute inset-0 overflow-hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-dark/60 via-stone-dark/30 to-stone-dark/90" />
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(252,150,106,0.25), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex h-full w-full flex-col items-start justify-end px-6 pb-20 lg:px-20 lg:pb-32">
          <p className="mb-6 text-[11px] uppercase tracking-[0.3em] text-brand">
            Welcome to Heat Lagos
          </p>
          <h1 className="max-w-5xl font-serif text-6xl leading-[1.05] lg:text-[6.5rem]">
            Infrared <em className="text-brand">Pilates</em>, Yoga,
            <br />
            Sculpt, Mobility
            <br />
            <span className="text-brand-soft">& more.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-foreground/80 lg:text-lg">
            Grand Opening May 1–3! All Classes are FREE.{" "}
            <a
              href="https://backoffice.bsport.io/customer/payment/pass/751506/?membership=5821&force=true"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand/50 underline-offset-4 text-brand hover:text-brand-soft hover:decoration-brand transition-colors"
            >
              Book here!
            </a>
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <DiscoverMenu />
            <a
              href="https://backoffice.bsport.io/customer/payment/pass/751506/?membership=5821&force=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-[170px] items-center justify-center gap-3 rounded-full border border-foreground/30 bg-foreground/5 px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.25em] text-foreground backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/50 transition-colors"
            >
              Book
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
