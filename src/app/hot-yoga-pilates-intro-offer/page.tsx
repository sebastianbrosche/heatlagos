import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer";

export const metadata: Metadata = {
  title: "Two Weeks Unlimited Intro Offer - Heat Lagos",
  description: "Try heated Pilates, Yoga, Sculpt, Mobility, and Yin for two weeks. 14 days of unlimited classes for €79. Experience the Algarve's first infrared studio.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "14 Days Intro Offer | Heat Lagos",
    description: "€79 for two weeks of unlimited access to all infrared hot yoga, pilates, sculpt, and mobility classes in Lagos.",
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

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
              Introductory Offer
            </span>
            <h1 className="mt-4 font-serif text-[2.8rem] leading-[1.05] sm:text-6xl lg:text-[5.5rem]">
              Transform Your Body
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80 leading-relaxed sm:text-xl">
              Heat Lagos is the Algarve&apos;s premier heated studio, offering a modern approach to movement. 
              We focus on results-oriented training and good vibes in our fresh, infrared-heated studio right by Batata Beach.
            </p>
          </div>

          {/* Pricing Box / Booking Card */}
          <div className="mx-auto mt-12 max-w-md sm:mt-16">
            <div className="relative rounded-3xl border border-white/10 bg-stone-dark/40 p-8 shadow-2xl backdrop-blur-md">
              <span className="rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                New Member Offer
              </span>
              <h2 className="mt-4 font-serif text-3xl text-foreground">Two Weeks Trial</h2>
              <p className="mt-2 text-sm text-foreground/60">14 Days of Unlimited Classes</p>
              
              <div className="my-6">
                <span className="font-serif text-5xl font-light text-brand">€79</span>
                <span className="text-sm text-foreground/50"> / one-time</span>
              </div>

              <ul className="mb-8 space-y-4 text-left text-sm text-foreground/80 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Unlimited Hot Pilates, Yoga &amp; Sculpt
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Fresh far-infrared heat (easy to breathe)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Decades of teaching experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> Premium mats and props provided
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
                <h3 className="mt-4 font-serif text-lg text-foreground">Fresh Infrared Heat</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Our panels heat your body directly, not the room. The air remains clean and easy to breathe, while deep heat targets muscle and joint stiffness.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  02
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Decades of Experience</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Our instructors bring decades of teaching experience and a friendly, supportive approach, creating hard but doable classes.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  03
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">The Batata Plunge</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Located just meters from Batata Beach. Step out of a sweaty Pilates or Sculpt session and dive directly into the cool Atlantic ocean.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-dark border border-white/5 text-brand text-sm font-bold">
                  04
                </div>
                <h3 className="mt-4 font-serif text-lg text-foreground">Measurable Results</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  Our workouts deliver tangible progress. Leave the studio feeling refreshed, light, and clear-headed all day long.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Student Reviews Section */}
        <section className="px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">What Our Members Say</h2>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;Beautiful studio. Great teacher. Loved the incorporation of the heating panels into the session. Highly recommend!&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Katy S.</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;What a great class this morning. Clear English instructions, warm heat that wasn&apos;t overwhelming that really helped my muscles stretch. Left with an inner glow!&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Sarah F.</p>
              </div>

              <div className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-brand text-xs uppercase tracking-widest mb-4">5.0 / 5.0 Rating</div>
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    &quot;Amazing class, relaxing and challenging at the same time. The infrared panels create a beautiful ambiance and great recovery.&quot;
                  </p>
                </div>
                <p className="mt-6 text-xs text-foreground/50">— Roxane G.</p>
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
                <span className="text-sm text-foreground/80">Buy your 2-Week Pass</span>
              </div>
              <div className="hidden h-[1px] w-12 bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-stone-dark text-sm font-bold">2</span>
                <span className="text-sm text-foreground/80">Choose your class date</span>
              </div>
              <div className="hidden h-[1px] w-12 bg-white/10 sm:block" />
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-stone-dark text-sm font-bold">3</span>
                <span className="text-sm text-foreground/80">Roll out your mat &amp; glow</span>
              </div>
            </div>

            <div className="mt-12">
              <a
                href={checkoutUrl}
                className="inline-flex rounded-full bg-brand px-8 py-4.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-dark transition-all hover:bg-brand-soft hover:shadow-lg"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
