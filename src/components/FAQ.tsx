"use client";

import { useState } from "react";

const FAQS = [
  {
    question: "What is an infrared heated class?",
    answer:
      "An infrared heated class uses radiant heat panels that warm the body directly rather than blowing hot air around the room. The studio sits at around 30°C, which supports a strong, focused practice with lower humidity than traditional hot yoga.",
  },
  {
    question: "How is infrared different from regular hot yoga?",
    answer:
      "Traditional hot yoga is usually heated to 40°C or more with forced air. Our infrared studio runs at around 30°C, which feels gentler and is easier to breathe in, while still warming muscles deeply for movement and recovery.",
  },
  {
    question: "How hot is the studio?",
    answer:
      "Around 30°C — warm enough to feel the heat working through the muscles, but not as intense as traditional hot yoga rooms.",
  },
  {
    question: "Do I need experience to join a class?",
    answer:
      "No. We welcome complete beginners alongside experienced students. Our teachers offer options for every level inside each class, so you can start where you are and progress over time.",
  },
  {
    question: "Which class should I choose if I want strength?",
    answer:
      "Start with Heat Pilates, Heat Sculpt or Heat Power. Pilates builds deep core and stabiliser strength, Sculpt adds weights and resistance for a full-body session, and Power is a physically demanding heated yoga.",
  },
  {
    question: "Which class should I choose if I need recovery?",
    answer:
      "Heat Mobility, Heat Recovery and Heat Yin are the best place to start. They are slower, gentler, and built around joint work, breath and stillness — ideal after surfing, running, gym training, or a stressful week.",
  },
  {
    question: "Are all classes taught in English?",
    answer:
      "Yes. Every class at Heat Lagos is taught in English. We are built for the international community living in and visiting the Algarve.",
  },
  {
    question: "Can I join a class while on holiday in Lagos?",
    answer:
      "Yes. We offer single drop-ins, a 7-day Vacation Week pass, and a 2-week Intro Offer. All make it easy to join while you are visiting Lagos, Luz, Burgau or Portimão.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-10 flex flex-col items-start gap-4 sm:mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            Frequently Asked
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Everything you might
            <br />
            be <em className="text-brand">wondering.</em>
          </h2>
        </div>

        <ul className="flex flex-col divide-y divide-white/5 border-y border-white/5">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <li key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left transition-colors hover:text-brand sm:py-6"
                >
                  <span className="font-serif text-lg leading-snug sm:text-xl lg:text-2xl">
                    {faq.question}
                  </span>
                  <span
                    aria-hidden
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-base transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-12 text-foreground/75 leading-relaxed sm:pb-8 sm:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
