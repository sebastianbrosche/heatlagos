"use client";

import { useState } from "react";

function Paragraphs() {
  return (
    <>
      <p className="text-lg leading-relaxed lg:text-xl">
        Heat Lagos was born out of years of teaching, training and a genuine
        love for what movement can do to a person — not just physically, but in
        the way they carry themselves, the way they feel in their own skin, the
        way they come to know themselves a little better.
      </p>
      <p className="leading-relaxed">
        We opened this studio because we believe the right space and the right
        guidance can genuinely shift something in a person.
      </p>
      <p className="leading-relaxed">
        Every class at Heat Lagos is held in our infrared-heated studio, taught
        by experienced, passionate teachers who care about more than just
        getting you through the hour. We are here to help you move better,
        feel stronger and become more aware of your body and what it&apos;s
        telling you. That kind of awareness has a way of reaching far beyond
        the mat.
      </p>
      <p className="leading-relaxed">
        Come curious. Come tired. Come however you arrive. There is a place
        for you here.
      </p>
    </>
  );
}

export default function About() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative px-6 py-24 lg:px-20 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-12">
        <div className="text-foreground/80 lg:col-span-5">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            About us
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            A place built
            <br />
            <em className="text-brand">with purpose.</em>
          </h2>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-8 hidden w-fit items-center gap-2 rounded-full border border-foreground/30 bg-foreground/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/10 lg:inline-flex"
          >
            {expanded ? "Close" : "Read our story"}
          </button>

          {/* Desktop-only expandable text under the button */}
          <div
            className={`hidden flex-col gap-6 overflow-hidden transition-all duration-300 lg:flex ${
              expanded
                ? "mt-8 max-h-[2000px] opacity-100"
                : "mt-0 max-h-0 opacity-0"
            }`}
          >
            <Paragraphs />
          </div>
        </div>
        <div className="flex flex-col gap-6 text-foreground/80 lg:col-span-7">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/detail.JPG"
              alt="Heat Lagos studio detail"
              className="h-full w-full object-cover"
            />
          </div>
          <blockquote className="relative pl-12 font-serif text-2xl italic leading-snug text-brand-soft sm:pl-16 sm:text-3xl lg:text-4xl">
            <span
              aria-hidden
              className="absolute -top-4 left-0 font-serif text-[5rem] leading-none text-brand sm:-top-6 sm:text-[7rem] lg:text-[8rem]"
            >
              &ldquo;
            </span>
            The right space and the right teacher can change your whole day
            &mdash; sometimes more.
          </blockquote>

          {/* Mobile-only expandable text */}
          <div
            className={`flex flex-col gap-6 overflow-hidden transition-all duration-300 lg:hidden ${
              expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <Paragraphs />
          </div>

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-foreground/30 bg-foreground/5 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground/50 hover:bg-foreground/10 lg:hidden"
          >
            {expanded ? "Read less" : "Read more"}
          </button>

          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "Infrared heated",
              "Certified teachers",
              "All levels welcome",
            ].map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-foreground/80"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
