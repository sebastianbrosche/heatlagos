"use client";

import { useEffect, useRef, useState } from "react";
import DiscoverMenu from "./DiscoverMenu";

const BUNNY_HLS =
  "https://vz-d5241280-494.b-cdn.net/34dda126-4f25-4173-97c4-5c9316136deb/playlist.m3u8";
const BUNNY_MP4_FALLBACK =
  "https://vz-d5241280-494.b-cdn.net/34dda126-4f25-4173-97c4-5c9316136deb/play_480p.mp4";
const HLS_JS_CDN = "https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js";
const POSTER = "/hero-poster.jpg";

type HlsLevel = { height?: number; width?: number; bitrate?: number };
type HlsInstance = {
  loadSource: (src: string) => void;
  attachMedia: (media: HTMLMediaElement) => void;
  destroy: () => void;
  on: (event: string, cb: (e: unknown, data: unknown) => void) => void;
  readonly levels: HlsLevel[];
  nextLevel: number;
  startLevel: number;
  currentLevel: number;
};
type HlsClass = new (config?: Record<string, unknown>) => HlsInstance;

declare global {
  interface Window {
    Hls?: HlsClass & {
      isSupported: () => boolean;
      Events: { ERROR: string; MANIFEST_PARSED: string };
    };
  }
}

/**
 * Pick the HLS level index whose height matches `target` exactly.
 * If none match, return the highest level ≤ target (so we avoid
 * upgrading past what the viewport needs). Returns -1 if no suitable
 * level is found.
 */
function pickLevelIndex(levels: HlsLevel[], target: number): number {
  const exact = levels.findIndex((l) => l.height === target);
  if (exact !== -1) return exact;
  let bestIdx = -1;
  let bestHeight = -1;
  for (let i = 0; i < levels.length; i++) {
    const h = levels[i].height;
    if (typeof h !== "number") continue;
    if (h <= target && h > bestHeight) {
      bestHeight = h;
      bestIdx = i;
    }
  }
  return bestIdx;
}

function loadHlsJs(): Promise<HlsClass | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (window.Hls) return Promise.resolve(window.Hls);
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${HLS_JS_CDN}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(window.Hls ?? null));
      existing.addEventListener("error", () => resolve(null));
      return;
    }
    const s = document.createElement("script");
    s.src = HLS_JS_CDN;
    s.async = true;
    s.onload = () => resolve(window.Hls ?? null);
    s.onerror = () => resolve(null);
    document.head.appendChild(s);
  });
}

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

function HeroVideo({ className }: { className: string }) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activate, setActivate] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActivate(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!activate) return;
    const video = videoRef.current;
    if (!video) return;

    let destroyed = false;
    let hlsInstance: { destroy: () => void } | null = null;

    const attachFallbackMp4 = () => {
      if (destroyed || !video) return;
      video.src = BUNNY_MP4_FALLBACK;
      void video.play().catch(() => {});
    };

    const canNativeHls = video.canPlayType("application/vnd.apple.mpegurl");

    if (canNativeHls) {
      video.src = BUNNY_HLS;
      void video.play().catch(() => {});
    } else {
      loadHlsJs().then((Hls) => {
        if (destroyed) return;
        if (!Hls || !window.Hls?.isSupported()) {
          attachFallbackMp4();
          return;
        }
        const isDesktop =
          typeof window !== "undefined" && window.innerWidth >= 768;
        const targetHeight = isDesktop ? 720 : 480;

        const hls = new Hls({
          capLevelToPlayerSize: true,
          // Start in auto; we lock to the target level once the manifest is
          // parsed (so the level lookup matches whatever Bunny re-encodes to).
          startLevel: -1,
          abrEwmaDefaultEstimate: isDesktop ? 5_000_000 : 2_000_000,
          maxBufferLength: 20,
          maxMaxBufferLength: 30,
        });

        hls.on(
          window.Hls.Events.MANIFEST_PARSED,
          (_e: unknown, _data: unknown) => {
            const idx = pickLevelIndex(hls.levels, targetHeight);
            if (idx !== -1) {
              // nextLevel forces the first fragment at our chosen quality;
              // ABR takes over after that, so a slow network can still
              // down-shift.
              hls.nextLevel = idx;
            }
          },
        );

        hls.loadSource(BUNNY_HLS);
        hls.attachMedia(video);
        hls.on(window.Hls.Events.ERROR, (_e: unknown, data: unknown) => {
          const d = data as { fatal?: boolean };
          if (d.fatal) {
            try {
              hls.destroy();
            } catch {
              /* ignore */
            }
            attachFallbackMp4();
          }
        });
        hlsInstance = hls;
        void video.play().catch(() => {});
      });
    }

    return () => {
      destroyed = true;
      try {
        hlsInstance?.destroy();
      } catch {
        /* ignore */
      }
    };
  }, [activate]);

  return (
    <div ref={wrapperRef} className={className}>
      <img
        src={POSTER}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <video
        ref={videoRef}
        poster={POSTER}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative w-full">
      <link rel="preconnect" href="https://vz-d5241280-494.b-cdn.net" />
      <link rel="dns-prefetch" href="https://vz-d5241280-494.b-cdn.net" />
      <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />

      {/* Mobile: video pinned to top, text stacked below */}
      <div className="relative sm:hidden">
        <div className="h-[86px]" aria-hidden />
        <div className="relative w-full overflow-hidden bg-stone-dark">
          <div className="relative w-full pt-[56.25%]">
            <HeroVideo className="absolute inset-0" />
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
      <div className="relative hidden h-screen min-h-[700px] w-full overflow-hidden bg-stone-dark sm:block">
        <HeroVideo className="pointer-events-none absolute inset-0 overflow-hidden" />
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
