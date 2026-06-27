import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-c";

export const metadata: Metadata = {
  title: "Pilates, Sculpt & Yoga Remixed - Intro Offer - Heat Lagos",
  description: "Get 14 days of unlimited heated yoga, pilates, and sculpt classes. Fast checkout. €79 two-week trial pass.",
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
      
      <main className="relative overflow-hidden pt-28 sm:pt-36">
        {/* Dynamic geometric accents */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px]" />
        
        {/* Hero Section */}
        <section className="px-5 py-12 sm:px-6 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading & Leade */}
              <div className="lg:col-span-7 space-y-6">
                <span className="inline-block rounded-full bg-brand/10 border border-brand/20 px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                  FS8 Template C
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                  Pilates, Sculpt &amp; Yoga Remixed
                </h1>
                <p className="text-base text-foreground/80 leading-relaxed max-w-xl">
                  Welcome to Heat Lagos. We combine the best elements of mat Pilates, sweaty cardio Sculpt, and deep 
                  restorative Yoga under our high-performance infrared heat panels. Low-impact, high-intensity 
                  movement with some serious sweat.
                </p>
              </div>

              {/* Right Column: Checkout Widget */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl border border-white/10 bg-stone-dark/30 p-8 shadow-xl">
                  <h3 className="font-serif text-xl text-foreground mb-2">Join The Class List</h3>
                  <p className="text-xs text-foreground/50 mb-6">Create your account and book instantly via Bsport express.</p>
                  
                  <div className="rounded-2xl bg-stone-dark/50 border border-white/5 p-4 mb-6 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-brand font-bold uppercase tracking-wider">Two Weeks Trial Pass</p>
                      <p className="text-lg text-foreground font-serif mt-1">14 Days Unlimited Access</p>
                    </div>
                    <span className="font-serif text-3xl text-foreground font-light">€79</span>
                  </div>

                  <a
                    href={checkoutUrl}
                    className="block w-full text-center bg-brand hover:bg-brand-soft text-stone-dark font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition-all"
                  >
                    Buy Trial Pass
                  </a>
                  
                  <p className="text-[10px] text-center text-foreground/40 mt-4 leading-normal">
                    *Pass activates automatically on your first booked class. Non-transferable.
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
              <h2 className="font-serif text-3xl text-foreground">The Workout Disciplines</h2>
              <p className="text-sm text-foreground/60 mt-2">A unique mix designed to stretch, tone, and energize your week.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-3xl">🤸</span>
                <h3 className="font-serif text-lg text-foreground">Mat Pilates</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Low-impact core training, postural alignment, and balance. We focus on building deep abdominal strength.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-3xl">⚡</span>
                <h3 className="font-serif text-lg text-foreground">Heated Sculpt</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  High-energy tone workouts matching light resistance, pulse movements, and direct infrared sweat.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-3xl">🧘</span>
                <h3 className="font-serif text-lg text-foreground">Heated Flow</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Dynamic vinyasa structures focusing on movement flow, breath sync, and joint flexibility under the heat.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-3xl">🌊</span>
                <h3 className="font-serif text-lg text-foreground">Yin &amp; Recovery</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  Deep, slow-release passive stretches to heal sore muscles. Step out and take a cooling plunge in Batata beach.
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
