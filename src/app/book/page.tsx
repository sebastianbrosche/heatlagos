import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Schedule from "@/components/Schedule";

const URL = "https://www.heatlagos.com/book";

export const metadata: Metadata = {
  title: "Book a Class or Pass - Heat Lagos",
  description:
    "Book infrared Pilates, yoga, Sculpt and recovery in Lagos. New locals: 2 weeks unlimited. Visitors: vacation week. Or pick a single class.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "Book Heat Lagos | Intro, Vacation Week, or Class",
    description:
      "Maps and Google booking land here. Choose intro for locals, vacation week for visitors, or book one class.",
  },
};

/**
 * GBP / Maps booking target. Google only shows the domain (heatlagos.com),
 * so this page owns the choice UI that the booking link cannot label.
 */
export default function BookPage() {
  return (
    <>
      <Header />
      <Marquee />
      <main className="mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:pb-28">
        <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
          Book
        </p>
        <h1 className="font-serif text-[2.2rem] leading-[1.05] text-foreground sm:text-5xl">
          How do you want to train?
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/80 sm:text-xl">
          You found us on Google or Maps. Pick the path that fits. No account
          needed to start.
        </p>

        <div className="mt-12 flex flex-col gap-4 sm:mt-14">
          <a
            href="/hot-yoga-pilates-intro-offer"
            className="block rounded-2xl border border-brand/40 bg-brand/10 px-6 py-6 transition-colors hover:border-brand hover:bg-brand/15 sm:px-8 sm:py-7"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-brand">
              Best for locals and new clients
            </p>
            <p className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
              2 weeks unlimited · €79
            </p>
            <p className="mt-2 text-base text-foreground/70">
              All infrared classes: Pilates, yoga, Sculpt, mobility, Yin.
              First-time intro for people living in or near Lagos.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Continue →
            </p>
          </a>

          <a
            href="/hot-yoga-pilates-vacation"
            className="block rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-6 transition-colors hover:border-white/25 sm:px-8 sm:py-7"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              Best for visitors
            </p>
            <p className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
              Vacation week · €59
            </p>
            <p className="mt-2 text-base text-foreground/70">
              7 days of unlimited classes while you are in Lagos. Ideal after
              surf, cliffs, or a short stay.
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/80">
              Continue →
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 px-6 py-6 sm:px-8 sm:py-7">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              Or book one class
            </p>
            <p className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">
              Open schedule
            </p>
            <p className="mt-2 text-base text-foreground/70">
              Drop-in on the calendar below. Mats available. English teachers.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-12 sm:mt-16 sm:pt-14">
          <Schedule />
        </div>

        <p className="mt-10 text-sm text-foreground/50">
          Studio: Edificio da Fabrica da Ribeira, Av. dos Descobrimentos, Loja
          G, 8600-584 Lagos ·{" "}
          <a href="tel:+351927290812" className="text-foreground/70 hover:text-brand">
            +351 927 290 812
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
