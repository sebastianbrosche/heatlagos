"use client";

import { useState } from "react";

function Paragraphs() {
  return (
    <>
      <p className="text-lg leading-relaxed lg:text-xl">
        Heat Lagos grew out of years of teaching and training, and a real love
        for what good movement does for people. It goes beyond the physical
        side of it, since over time the way you move tends to change how you
        carry yourself and how at home you feel in your own body.
      </p>
      <p className="leading-relaxed">
        We opened the studio because the right space and good guidance genuinely
        help people move and feel better.
      </p>
      <p className="leading-relaxed">
        Every class is held in our infrared-heated room and taught by
        experienced teachers who care about more than getting you through the
        hour. The aim is fairly simple: help you move better, feel stronger, and
        get a bit more tuned in to what your body is telling you. That kind of
        awareness has a way of carrying over into the rest of life too.
      </p>
      <p className="leading-relaxed">
        However you turn up, curious or tired or somewhere in between, there is
        a place for you here.
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
            Teacher trainings for instructors
          </p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Train with us
            <br />
            <em className="text-brand">in Portugal.</em>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-foreground/70">
            September 2026 is SOLD OUT. Next SCULPT Teacher Training: January 29-31, 2027. 200-hour Vinyasa is waitlist only for 2027.
          </p>
          <a
            href="https://yogateachertrainingportugal.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand/40 bg-brand/10 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand transition-colors hover:border-brand hover:bg-brand/20"
          >
            View Teacher Training
          </a>
        </div>
        <div className="flex flex-col gap-6 text-foreground/80 lg:col-span-7">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="/praiabatata-2.jpg?v=1"
              alt="Praia Batata beach near Heat Lagos studio"
              className="h-full w-full object-cover"
            />
          </div>

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
        </div>
      </div>

      {/* Full-width quote + USPs below the grid */}
      <div className="mx-auto mt-16 max-w-[1400px]">
        <p className="font-serif text-xl italic leading-relaxed text-brand-soft sm:text-2xl lg:text-3xl">
          Lagos&apos; first and only infrared-heated studio. Mat Pilates and Sculpt that build real strength, plus the recovery work that keeps active bodies moving. A room where locals, surfers, travellers and total beginners all belong.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            "Lagos' only infrared studio",
            "Only sculpt classes in the Algarve",
            "Mat Pilates that builds real strength",
            "Built for recovery & longevity",
            "All levels, beginners welcome",
            "Beachside at Praia Batata",
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
    </section>
  );
}
