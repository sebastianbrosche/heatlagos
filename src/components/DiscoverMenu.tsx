"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  {
    href: "#classes",
    label: "Classes",
    description: "Pilates, Yoga, Sculpt, Mobility & more.",
  },
  {
    href: "#teachers",
    label: "Teachers",
    description: "The instructors who guide every session.",
  },
  {
    href: "#book",
    label: "Schedule",
    description: "See what's on and book your spot.",
  },
  {
    href: "#memberships",
    label: "Memberships",
    description: "Drop-ins, packs & unlimited plans.",
  },
  {
    href: "#workshops",
    label: "Workshops",
    description: "Masterclasses — one topic, more time.",
  },
];

export default function DiscoverMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex min-w-[150px] items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-dark hover:bg-brand-soft transition-colors sm:min-w-[170px] sm:gap-3 sm:px-8 sm:py-4 sm:text-[12px] sm:tracking-[0.25em]"
      >
        Discover
      </button>

      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full cursor-default bg-stone-dark/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Discover"
          className={`absolute bottom-0 left-0 right-0 mx-auto max-h-[90vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-stone-dark shadow-2xl transition-transform duration-300 ease-out sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-h-[min(640px,90vh)] sm:max-w-lg sm:-translate-x-1/2 sm:rounded-3xl sm:border ${
            open
              ? "translate-y-0 sm:-translate-y-1/2"
              : "translate-y-full sm:-translate-y-[calc(50%-40px)]"
          }`}
        >
          <div className="mx-auto mb-2 mt-3 h-1.5 w-10 rounded-full bg-white/20 sm:hidden" />
          <div className="flex items-center justify-between px-6 pb-2 pt-4 sm:pt-6">
            <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
              Discover
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] text-stone hover:text-foreground"
            >
              Close
            </button>
          </div>
          <nav className="flex flex-col divide-y divide-white/5 px-2 pb-6 sm:pb-8">
            {ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between gap-4 rounded-2xl px-4 py-5 transition-colors hover:bg-white/5"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-serif text-2xl leading-tight group-hover:text-brand sm:text-3xl">
                    {item.label}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {item.description}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="text-xl text-stone transition-transform group-hover:translate-x-1 group-hover:text-brand"
                >
                  →
                </span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
