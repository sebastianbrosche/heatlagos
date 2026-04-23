"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#book", label: "Book" },
  { href: "#about", label: "About us" },
  { href: "#classes", label: "Classes" },
  { href: "#teachers", label: "Teachers" },
  { href: "#memberships", label: "Memberships" },
  { href: "#workshops", label: "Workshops", note: "coming" },
  { href: "#training", label: "Teacher Trainings", note: "coming" },
  { href: "#find-us", label: "Where to find us" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 h-14 sm:h-16 lg:h-20 flex items-center justify-between">
          <a
            href="#top"
            className="flex items-center leading-none"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo%20heat.png"
              alt="Heat"
              className="h-12 w-auto sm:h-14 lg:h-16"
            />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-[60] flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-foreground hover:text-brand transition-colors"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
            <span className="flex flex-col gap-1 sm:gap-1.5">
              <span
                className={`w-6 sm:w-7 h-px bg-current transition-transform ${open ? "translate-y-[5px] sm:translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`w-6 sm:w-7 h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`w-6 sm:w-7 h-px bg-current transition-transform ${open ? "-translate-y-[5px] sm:-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[45] bg-stone-dark/95 backdrop-blur-xl transition-opacity duration-300 overflow-y-auto ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="relative flex min-h-full w-full flex-col px-5 pt-20 pb-8 sm:px-6 sm:pt-24 sm:pb-10 lg:px-20 lg:pt-28 lg:pb-14">
          <nav className="flex flex-1 flex-col justify-center gap-2 sm:gap-2.5 lg:gap-3">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-foreground hover:text-brand transition-colors"
              >
                <span className="font-mono text-[10px] text-stone">
                  0{i + 1}
                </span>
                <span className="font-serif text-2xl leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                  {link.label}
                </span>
                {link.note && (
                  <span className="rounded-full border border-stone/40 px-2 py-0.5 text-[9px] uppercase tracking-[0.2em] text-stone">
                    {link.note}
                  </span>
                )}
              </a>
            ))}
          </nav>

          <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
            <a
              href="https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-brand px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-dark hover:bg-brand-soft transition-colors sm:gap-3 sm:px-10 lg:py-4 lg:text-[12px] lg:tracking-[0.25em]"
            >
              Intro Offer
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
