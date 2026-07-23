import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Memberships from "@/components/Memberships";
import QuickBuy from "@/components/QuickBuy";
import Schedule from "@/components/Schedule";

const URL = "https://www.heatlagos.com/book";

export const metadata: Metadata = {
  title: "Book a Class or Pass - Heat Lagos",
  description:
    "Buy intro, memberships, vacation week, class packs, drop-ins and more. Or open the schedule and book a single class at Heat Lagos, Lagos Portugal.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "Book Heat Lagos | Prices, Passes and Schedule",
    description:
      "Same prices as the homepage. Intro, memberships, vacation week, 10-pack, drop-in, towel, and class schedule.",
  },
};

/**
 * GBP / Maps booking target. Same payment options as the homepage
 * (Memberships + QuickBuy) plus the live schedule widget.
 */
export default function BookPage() {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <section className="px-5 pt-32 pb-4 sm:px-6 sm:pt-40 lg:px-20">
          <div className="mx-auto max-w-[1400px]">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
              Book
            </p>
            <h1 className="font-serif text-[2.2rem] leading-[1.05] text-foreground sm:text-5xl lg:text-[3.5rem]">
              Prices and booking
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80 sm:text-xl">
              Same options as the Heat homepage. Tap a pass to check out, or
              scroll to the schedule for a single class. English teachers.
              Infrared studio in central Lagos.
            </p>
          </div>
        </section>

        <Memberships />
        <QuickBuy />

        <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-20 lg:pb-32">
          <div className="mx-auto max-w-[1400px] border-t border-white/10 pt-14 sm:pt-16">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
              Or book one class
            </p>
            <h2 className="mb-8 font-serif text-[2rem] leading-[1.1] text-foreground sm:text-4xl">
              Open schedule
            </h2>
            <Schedule hideHeading />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
