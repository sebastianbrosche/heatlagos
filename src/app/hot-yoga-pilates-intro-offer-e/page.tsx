import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-e";

export const metadata: Metadata = {
  title: "High Intensity Heated Pilates & Sculpt - WeHo Style - Heat Lagos",
  description: "Sculpt - Lagos' best sweaty workout. Get your morning yoga glow and feel completely alive. Two weeks unlimited classes for €79.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

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
              WeHo Style Template E
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground leading-[1.05] tracking-tight">
              Sculpt — Lagos&apos; Best Sweaty Workout
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
              Results-focused workouts. High-intensity, low-impact, muscle-exhausting movements designed to push your 
              core limits, build real strength, and trigger a deep detox sweat under far-infrared heat.
            </p>
          </div>
        </section>

        {/* Pricing Offer Card */}
        <section className="px-5 mb-16">
          <div className="mx-auto max-w-md bg-stone-dark/30 border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
            <h3 className="font-serif text-2xl text-foreground mb-1">New Member Pass</h3>
            <p className="text-sm text-foreground/50 mb-6 font-light">Experience our signature burn for two weeks.</p>
            
            <div className="my-6">
              <span className="font-serif text-5xl font-light text-brand">€79</span>
              <span className="text-xs text-foreground/50"> / 14-days unlimited</span>
            </div>

            <ul className="mb-8 space-y-4 text-left text-sm text-foreground/75 border-t border-white/5 pt-6 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Unlimited access to Heated Sculpt, Pilates &amp; Yoga
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Fresh far-infrared heating panels (easy to breathe)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Decades of experience. Friendly and present teachers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-brand font-bold">-</span> Premium studio mats provided. No wet gear to pack
              </li>
            </ul>

            <a
              href={checkoutUrl}
              className="block w-full bg-brand hover:bg-brand-soft text-stone-dark font-sans font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition-all"
            >
              Get The Deal Now
            </a>
          </div>
        </section>

        {/* What You Need To Know (WeHo Style Rules) */}
        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground text-center mb-12">What You Need To Know</h2>
            
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <h3 className="font-sans font-bold text-sm text-brand uppercase tracking-wider">Workout Intensity</h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  Active classes like Pilates and Sculpt are hard, results-focused workouts designed to challenge your core, 
                  but remain doable for all levels. Yoga and recovery classes are chill and relaxing.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-sans font-bold text-sm text-brand uppercase tracking-wider">Arrival &amp; Rules</h3>
                <p className="text-sm text-foreground/70 leading-relaxed font-light">
                  First-timers must arrive 10 minutes early. We enforce a strict 12-hour cancellation policy to release mats. Grip socks are optional but recommended.
                </p>
              </div>
            </div>

            {/* Big quote block */}
            <div className="mt-16 border-l-2 border-brand/50 pl-6 py-2 italic text-sm text-foreground/80 leading-relaxed">
              &quot;I took a Sculpt class on my first day and I was shaking within 10 minutes. The heat feels amazing and the energy is unmatched in Lagos!&quot;
              <span className="block mt-2 text-xs text-foreground/50 not-italic">— Expat Member Review</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
