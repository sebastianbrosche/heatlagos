import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-c";

export const metadata: Metadata = {
  title: "Fast Vacation Pass Booking - FS8 Template - Heat Lagos",
  description: "Get 7 days of unlimited heated yoga, pilates, and sculpt classes during your holiday in Lagos. €59 vacation pass.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <>
      <Header />
      <Marquee />
      
      <main className="relative overflow-hidden pt-32 sm:pt-40">
        {/* Dynamic geometric accents */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px]" />
        
        {/* Hero Section */}
        <section className="px-5 py-12 sm:px-6 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading & Leade */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                  FS8 Template C
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                  Sweat &amp; Recover in the Sun
                </h1>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl">
                  Keep active during your Algarve holiday. We blend mat Pilates core work, intense results-oriented 
                  Sculpt sessions, and active recovery Yoga. Heated by clean infrared panels, right by Batata Beach.
                </p>
              </div>

              {/* Right Column: Checkout Widget */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-stone-dark/30 p-8 shadow-xl">
                  <h3 className="font-serif text-xl text-foreground mb-2">Buy Your Holiday Week</h3>
                  <p className="text-xs text-foreground/50 mb-6">Simple 3-step checkout. Start booking classes today.</p>
                  
                  <div className="rounded-2xl bg-stone-dark/50 border border-white/5 p-4 mb-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-brand font-bold uppercase tracking-wider">Vacation Week Pass</p>
                      <p className="text-lg text-foreground font-serif mt-1">7 Days Unlimited Access</p>
                    </div>
                    <span className="font-serif text-3xl text-foreground font-light">€59</span>
                  </div>

                  <a
                    href={checkoutUrl}
                    className="block w-full text-center bg-brand hover:bg-brand-soft text-stone-dark font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all"
                  >
                    Get Vacation Pass
                  </a>
                  
                  <p className="text-xs text-center text-foreground/40 mt-4 leading-normal">
                    *Mats and towels included. Valid for 7 consecutive days starting on your first booked class.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Workout Mix-Up */}
        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <h2 className="font-serif text-3xl text-foreground">The Holiday Workout Mix</h2>
              <p className="text-sm text-foreground/60 mt-2">Active travel recovery designed to stretch, tone, and refresh.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Surf Recovery</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Infrared heat targets sore shoulders and tight hamstrings. Repair muscles and stretch joints post-surf. Decades of teaching experience.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Jetlag Detox</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Intense cardiovascular sweat that flushes travel toxins, reboots metabolism, and leaves you refreshed. Fresh, breathable room air.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Mat Pilates</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Low-impact core training, postural check, and body balance. Friendly coaches, doable class paces for all levels.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Atlantic Plunge</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Located directly across Praia da Batata. Take a sweaty heated session, then run directly into the cooling Atlantic waves.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
