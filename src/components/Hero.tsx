"use client";

import { useEffect, useState } from "react";
import DiscoverMenu from "./DiscoverMenu";

const HERO_IMAGE =
  "https://vz-d5241280-494.b-cdn.net/34dda126-4f25-4173-97c4-5c9316136deb/thumbnail.jpg";
const HERO_VIDEO_EMBED =
  "https://iframe.mediadelivery.net/embed/640745/34dda126-4f25-4173-97c4-5c9316136deb?autoplay=true&loop=true&muted=true&preload=true&responsive=true";

function useDeferredVideo() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 400);
    return () => clearTimeout(t);
  }, []);
  return show;
}

export default function Hero() {
  const showVideo = useDeferredVideo();

  return (
    <section id="top" className="relative w-full">
      {/* Mobile: video pinned to top, text stacked below */}
      <div className="relative sm:hidden">
        <div className="h-[86px]" aria-hidden />
        <div className="relative w-full overflow-hidden bg-stone-dark">
          <div className="relative w-full pt-[56.25%]">
            <img
              src={HERO_IMAGE}
              alt="Heat Lagos studio"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
            />
            {showVideo && (
              <iframe
                src={HERO_VIDEO_EMBED}
                allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
                allowFullScreen
                loading="lazy"
                title="Heat Lagos intro"
                className="absolute inset-0 h-full w-full border-0"
              />
            )}
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
            A studio where warmth meets intention, in the heart of Lagos,
            Portugal. This is your time. We&apos;ll make it count.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <DiscoverMenu />
            <a
              href="#book"
              className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full border border-foreground/30 bg-foreground/5 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground backdrop-blur-sm hover:bg-foreground/10 hover:border-foreground/50 transition-colors"
            >
              Book
            </a>
          </div>
        </div>
      </div>

      {/* Desktop / tablet: full-screen video background with overlaid text */}
      <div className="relative hidden h-screen min-h-[700px] w-full overflow-hidden sm:block">
        <img
          src={HERO_IMAGE}
          alt="Heat Lagos studio"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {showVideo && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <iframe
              src={HERO_VIDEO_EMBED}
              allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"
              allowFullScreen
              loading="lazy"
              title="Heat Lagos intro"
              className="absolute left-1/2 top-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2 border-0"
            />
          </div>
        )}
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
            A studio where warmth meets intention, in the heart of Lagos,
            Portugal. This is your time. We&apos;ll make it count.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <DiscoverMenu />
            <a
              href="#book"
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
