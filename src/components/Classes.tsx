"use client";

import { useEffect, useRef, useState } from "react";

type ClassItem = {
  name: string;
  duration: string;
  description: string;
  image: string;
};

type Category = {
  label: string;
  tagline: string;
  items: ClassItem[];
};

const CATEGORIES: Category[] = [
  {
    label: "Infrared Pilates",
    tagline: "Low-impact · high-heat · deep core",
    items: [
      {
        name: "Heat Pilates",
        duration: "50 min",
        description:
          "Slow, precise and quietly powerful. Heat Pilates builds deep strength through intentional mat work that leaves your whole body feeling more connected, more capable and genuinely good.",
        image: "/Pilates.jpg",
      },
    ],
  },
  {
    label: "Yoga & Sculpt",
    tagline: "Move · sweat · breathe",
    items: [
      {
        name: "Heat Sculpt",
        duration: "50 min",
        description:
          "Weights, resistance props and infrared heat. A full-body strength class that tones, energises and leaves you with that particular kind of satisfaction that only comes from working hard and doing it well.",
        image: "/Sculpt.jpg",
      },
      {
        name: "Heat Power",
        duration: "60 min",
        description:
          "Not a complicated class. But a challenging one. Physically demanding in the best way — and it meets you exactly where you are. Show up, move, breathe. Let the class take you somewhere in yourself you didn't know existed.",
        image: "/Power.jpg",
      },
      {
        name: "Heat Flow",
        duration: "60 min",
        description:
          "Creative, connected sequences led by the breath. Warm, fluid and grounding, with enough space inside each class to arrive, settle, and actually feel the practice.",
        image: "/Flow.jpg",
      },
    ],
  },
  {
    label: "Mobility, Recovery & Yin",
    tagline: "Restore · release · reset",
    items: [
      {
        name: "Heat Mobility",
        duration: "45 min",
        description:
          "Thoughtful, targeted work for the joints and surrounding tissue. For anyone who wants to move with more ease, feel less held back, and build a sense of freedom in their body that carries into everything else they do.",
        image: "/Mobility.jpg",
      },
      {
        name: "Heat Recovery",
        duration: "45 min",
        description:
          "The full reset. Recovery moves gently through mobility work, breathwork, long yin holds and guided deep rest, layered together so your body and mind can truly let go. You will leave feeling softer, quieter and genuinely restored.",
        image: "/Recovery.jpg",
      },
      {
        name: "Heat Yin",
        duration: "60 min",
        description:
          "Long, still holds that reach the deeper layers of the body. Meditative, unhurried and quietly profound. A genuinely good reason to slow down.",
        image: "/DSC08021.JPG",
      },
    ],
  },
];

const ALL_ITEMS: ClassItem[] = CATEGORIES.flatMap((c) => c.items);

const DESKTOP_CATEGORIES: Category[] = [
  {
    label: "Pilates, Yoga & Sculpt",
    tagline: "Move · sweat · breathe",
    items: [
      ...CATEGORIES[0].items,
      ...CATEGORIES[1].items,
    ],
  },
  CATEGORIES[2],
];

export default function Classes() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? ALL_ITEMS[activeIndex] : null;
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const close = () => setActiveIndex(null);
  const next = () =>
    setActiveIndex((i) => (i === null ? null : (i + 1) % ALL_ITEMS.length));
  const prev = () =>
    setActiveIndex((i) =>
      i === null ? null : (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length,
    );

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStartX.current;
    const dy = t.clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else prev();
    }
  };

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="classes" className="relative px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-16 lg:mb-20">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Heat Classes
          </p>
        </div>

        <div className="flex flex-col gap-14 sm:gap-20 lg:hidden">
          {DESKTOP_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-white/10 pb-4 sm:mb-8">
                <h3 className="font-serif text-xl sm:text-2xl">{cat.label}</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone sm:text-[11px]">
                  {cat.tagline}
                </span>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {cat.items.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setActiveIndex(ALL_ITEMS.indexOf(item))}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-stone-dark/60 text-left ring-1 ring-white/5 transition-transform hover:-translate-y-1"
                    aria-label={`Read about ${item.name}`}
                  >
                    <div className="relative aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-end justify-between gap-4 p-6">
                        <span className="font-serif text-3xl text-foreground drop-shadow-lg">
                          {item.name}
                        </span>
                        <span className="text-xl leading-none text-foreground/80 drop-shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground">
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="hidden flex-col gap-20 lg:flex">
          {DESKTOP_CATEGORIES.map((cat) => (
            <div key={cat.label}>
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 border-b border-white/10 pb-4">
                <h3 className="font-serif text-2xl lg:text-3xl">{cat.label}</h3>
                <span className="text-[11px] uppercase tracking-[0.2em] text-stone">
                  {cat.tagline}
                </span>
              </div>
              <div
                className={`grid gap-6 ${
                  cat.items.length === 4 ? "lg:grid-cols-2" : "lg:grid-cols-3"
                }`}
              >
                {cat.items.map((item) => (
                  <button
                    type="button"
                    key={item.name}
                    onClick={() => setActiveIndex(ALL_ITEMS.indexOf(item))}
                    className="group flex flex-col overflow-hidden rounded-2xl bg-stone-dark/60 text-left ring-1 ring-white/5 transition-transform hover:-translate-y-1"
                    aria-label={`Read about ${item.name}`}
                  >
                    <div
                      className={`relative w-full overflow-hidden ${
                        cat.items.length === 4 ? "aspect-[3/2]" : "aspect-[4/5]"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/80 via-transparent to-transparent" />
                      <div className="absolute inset-0 flex items-end justify-between gap-4 p-6 lg:p-8">
                        <span className="font-serif text-3xl text-foreground drop-shadow-lg lg:text-4xl">
                          {item.name}
                        </span>
                        <span className="text-xl leading-none text-foreground/80 drop-shadow-md transition-all duration-300 group-hover:translate-x-1 group-hover:text-foreground lg:text-2xl">
                          →
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          active ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!active}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={close}
          className="absolute inset-0 h-full w-full cursor-default bg-stone-dark/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active?.name}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={`absolute bottom-0 left-0 right-0 mx-auto flex h-[100dvh] flex-col overflow-hidden rounded-t-3xl border-t border-white/10 bg-stone-dark shadow-2xl transition-transform duration-300 ease-out sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:h-[min(820px,90vh)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-3xl sm:border ${
            active
              ? "translate-y-0"
              : "translate-y-full sm:translate-y-[calc(-50%+40px)]"
          }`}
        >
          <div className="mx-auto mb-2 mt-3 h-1.5 w-10 shrink-0 rounded-full bg-white/20 sm:hidden" />
          {active && (
            <>
              <div className="flex shrink-0 items-center justify-between gap-3 px-6 pb-2 pt-4 sm:pt-6">
                <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
                  Heat Class
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous class"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <span aria-hidden>←</span>
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next class"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <span aria-hidden>→</span>
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close"
                    className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-white/30 hover:bg-white/10"
                  >
                    <span aria-hidden className="text-lg leading-none">
                      ×
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto px-6 pb-6 sm:px-8">
                <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden rounded-2xl ring-1 ring-white/10 sm:mb-8">
                  <img
                    src={active.image}
                    alt={active.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-dark via-stone-dark/30 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5">
                    <span className="font-serif text-3xl text-foreground drop-shadow-lg sm:text-4xl">
                      {active.name}
                    </span>
                  </div>
                </div>
                <p className="leading-relaxed text-foreground/85 sm:text-lg">
                  {active.description}
                </p>
              </div>
              <div className="flex shrink-0 items-center justify-center px-6 pb-6 pt-2 sm:px-8 sm:pb-8">
                <a
                  href="#book"
                  onClick={close}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-dark transition-colors hover:bg-brand-soft sm:px-10 sm:text-[12px] sm:tracking-[0.25em]"
                >
                  Book this class
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
