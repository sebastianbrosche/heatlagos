import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-e";

export const metadata: Metadata = {
  title: "High Intensity Vacation Pass - WeHo Style - Heat Lagos",
  description: "Sculpt - Lagos' best sweaty jetlag detox! Unravel from your travel, sweat out flight toxins, and feel refreshed. 7 days unlimited heated classes for €59.",
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
      
      <main className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-32">
        {/* Glow Effects */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-brand/10 blur-[150px]" />

        {/* WeHo High Energy Hero */}
        <section className="px-5 py-12 text-center sm:px-6 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-4xl space-y-6">
            <span className="inline-block rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
              Jetlag Detox Sculpt
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
              Sculpt — Lagos&apos; Best Sweaty Jetlag Detox!
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
              Unravel from your travel. Sweat out flight fatigue and toxic dehydration with a high-intensity, 
              low-impact heated session. Re-energize your system, feel refreshed, and kick off your holiday with real results.
            </p>
          </div>
        </section>

        {/* Pricing Offer Card */}
        <section className="px-5 mb-16">
          <div className="mx-auto max-w-md bg-stone-dark/30 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <h3 className="font-serif text-2xl text-foreground mb-1">Vacation Pass</h3>
            <p className="text-sm text-foreground/50 mb-6 font-light">Enjoy unlimited heated workouts for a full week.</p>
            
            <div className="my-6">
              <span className="font-serif text-5xl font-light text-brand">€59</span>
              <span className="text-xs text-foreground/50"> / 7-days unlimited</span>
            </div>

            <ul className="mb-8 space-y-4 text-left text-sm text-foreground/75 border-t border-white/5 pt-6 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Unlimited access to Heated Sculpt, Pilates &amp; Yoga
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Deep infrared muscle recovery &amp; travel detox
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Decades of experience. Friendly and present teachers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Premium mats and towels provided in studio
              </li>
            </ul>

            <a
              href={checkoutUrl}
              className="block w-full bg-brand hover:bg-brand-soft text-stone-dark font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all"
            >
              Get The Vacation Pass
            </a>
          </div>
        </section>

        {/* What You Need To Know (WeHo Style Rules) */}
        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground text-center mb-12">What You Need To Know</h2>
            
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-sm text-brand uppercase tracking-wider">Holiday Workout Focus</h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  Our classes target specific muscle groups with zero joint impact. Perfect for active hikers, 
                  surfers, or travelers who want a hard but doable workout to stay fit on holiday.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-sans font-bold text-sm text-brand uppercase tracking-wider">Arrival &amp; Rules</h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  First-timers must arrive 10 minutes early. We enforce a strict 12-hour cancellation policy to release mats for other travelers. Grip socks are optional but recommended.
                </p>
              </div>
            </div>

            {/* Big quote block */}
            <div className="mt-16 border-l-2 border-brand/50 pl-6 py-2 italic text-sm text-foreground/80 leading-relaxed">
              &quot;The absolute best jetlag recovery. Sweated out the plane fatigue, got a killer core workout, and then went straight to Batata Beach!&quot;
              <span className="block mt-2 text-xs text-foreground/50 not-italic">— Holiday Visitor Review</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
