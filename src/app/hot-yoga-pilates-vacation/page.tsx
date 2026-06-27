import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation";

export const metadata: Metadata = {
  title: "Hot Yoga & Pilates Vacation Week Pass - Heat Lagos",
  description: "Perfect 7-day unlimited pass for holidaymakers in Lagos, Portugal. Try infrared hot yoga, Pilates, and Sculpt classes for €59. Mats included.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "Vacation Week Pass | Heat Lagos",
    description: "7 days of unlimited access to heated Pilates, Yoga, Sculpt, and Mobility classes. €59 one-time. Right by Batata Beach.",
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <>
      <Header />
      <Marquee />
      
      <main className="relative overflow-hidden pt-32 sm:pt-40">
        {/* Decorative ambient spots */}
        <div className="absolute top-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 -z-10 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl" />

        {/* Hero Section */}
        <section className="px-5 py-12 text-center sm:px-6 lg:px-20 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand">
              Vacation Week Pass
            </span>
            <h1 className="mt-4 font-serif text-[2.8rem] leading-[1.05] sm:text-6xl lg:text-[5.5rem]">
              Unravel From Your Travel
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 leading-relaxed sm:text-xl">
              Heat Lagos is your holiday wellness destination in the Algarve. Sweat, recover, and energize in our 
              fresh, infrared-heated studio, located right next to Batata Beach. Perfect for surfers, hikers, 
              and active travelers.
            </p>
          </div>

          {/* Pricing Box / Booking Card */}
          <div className="mx-auto mt-12 max-w-md sm:mt-16">
            <div className="relative rounded-3xl border border-white/10 bg-stone-dark/40 p-8 shadow-2xl backdrop-blur-md">
              <span className="rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                Vacationer Special
              </span>
              <h2 className="mt-4 font-serif text-3xl text-foreground">Vacation Week Pass</h2>
              <p className="mt-2 text-sm text-foreground/60">7 Days of Unlimited Classes</p>
              
              <div className="my-6">
                <span className="font-serif text-5xl font-light text-brand">€59</span>
                <span className="text-sm text-foreground/50"> / one-time</span>
              </div>

              <ul className="mb-8 space-y-4 text-left text-sm text-foreground/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Unlimited Hot Pilates, Yoga &amp; Sculpt
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Decades of experience &amp; chill vibes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Fresh far-infrared heat (easy to breathe)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Premium mats and towels provided
                </li>
              </ul>

              <a
                href={checkoutUrl}
                className="block w-full rounded-full bg-brand py-4.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-stone-dark transition-all hover:bg-brand-soft hover:shadow-lg hover:shadow-brand/10"
              >
                Book Your Pass Instantly
              </a>
            </div>
          </div>
        </section>

        {/* Why Choose Us Grid */}
        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">Why Choose Heat Lagos</h2>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  01
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Classes in English</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  All sessions are led in clear, easy-to-follow English by friendly instructors with decades of experience.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  02
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Active Surf Recovery</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Deep infrared warmth penetrates muscles to relieve tightness and soothe shoulders after a day in the ocean.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  03
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Sweaty Jetlag Detox</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Fly in, sweat it out. Release flight fatigue and reset your system in our fresh-air heated studio.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  04
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Batata Beach Plunge</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Located directly across Batata Beach. Complete your sweaty workout, walk outside, and plunge straight into the Atlantic.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Reviews Section */}
        <section className="px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">What Travelers Say</h2>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;Best sweaty workout in Lagos! Stretched my surf-tired shoulders and left feeling completely refreshed. A must-visit.&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Alex P. (Nomad)</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;Clean facilities, premium mats, friendly teachers. The beach view outside and the heat inside are an amazing combo!&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Katie W. (UK)</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;Loved the Sculpt class here. Easy to book, quick checkout, and perfect jetlag recovery after my long flight.&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Roxane G. (US)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Simple Steps */}
        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 text-center sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground">Book in 3 Simple Steps</h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-stone-dark text-sm font-bold">1</span>
                <span className="text-sm text-foreground/80">Get your 7-Day Pass</span>
              </div>
              <div className="hidden h-[1px] w-12 bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-stone-dark text-sm font-bold">2</span>
                <span className="text-sm text-foreground/80">Pick your class times</span>
              </div>
              <div className="hidden h-[1px] w-12 bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-stone-dark text-sm font-bold">3</span>
                <span className="text-sm text-foreground/80">Stretch, sweat &amp; swim</span>
              </div>
            </div>

            <div className="mt-12">
              <a
                href={checkoutUrl}
                className="inline-flex rounded-full bg-brand px-8 py-4.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-dark transition-all hover:bg-brand-soft hover:shadow-lg"
              >
                Buy Vacation Pass Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
