import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ImagePlaceholderCarousel from "@/components/ImagePlaceholderCarousel";

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
      
      <main className="relative overflow-hidden pt-32 sm:pt-40">
        {/* Dynamic geometric accents */}
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-brand/5 blur-[120px]" />
        
        {/* Hero Section */}
        <section className="px-5 py-12 sm:px-6 lg:px-20 lg:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading, Leade & Carousel */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-6">
                  <span className="inline-block rounded-full bg-brand/10 border border-brand/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand">
                    Introductory Pass
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.05]">
                    Pilates, Sculpt &amp; Yoga Remixed
                  </h1>
                  <p className="text-base sm:text-lg text-foreground/80 leading-relaxed max-w-xl">
                    Welcome to Heat Lagos. We combine the best elements of results-oriented mat Pilates, sweaty cardio Sculpt, and deep 
                    restorative Yoga under our fresh far-infrared heating panels. Hard work, doable paces, and good vibes.
                  </p>
                </div>
                <ImagePlaceholderCarousel
                  placeholderId={1}
                  options={[
                    { src: "/pilates-ball-3.jpg", alt: "Heated Mat Pilates class" },
                    { src: "/Power.jpg", alt: "Heated Yoga training session" },
                    { src: "/ad-sculpt-kickback.jpg", alt: "Infrared Sculpt workout" }
                  ]}
                  aspectRatioClass="aspect-video"
                />
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
                  
                  <p className="text-xs text-center text-foreground/40 mt-4 leading-normal">
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
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Mat Pilates</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Low-impact core training, posture checking, and alignment. We focus on building deep abdominal strength. Hard but doable for all levels.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Heated Sculpt</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  High-energy tone workouts matching light resistance, pulse movements, and direct infrared sweat. Results-oriented and loaded with good vibes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Heated Flow</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Dynamic vinyasa structures focusing on movement flow, breath sync, and joint flexibility under clean, fresh infrared heat.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-stone-dark/30 p-6 space-y-4">
                <span className="text-sm font-bold text-brand uppercase tracking-wider">Yin &amp; Recovery</span>
                <p className="text-sm text-foreground/75 leading-relaxed">
                  Chill, relaxing deep-stretch classes to recover from stiffness and melt travel tension. Step out and plunge straight into Batata beach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Gallery Spotlight */}
        <section className="px-5 py-20 sm:px-6 lg:px-20 max-w-5xl mx-auto border-t border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 text-left">
              <span className="text-xs uppercase tracking-widest text-brand font-mono">Ocean-Side Recovery</span>
              <h2 className="font-serif text-3xl text-foreground">Mat Pilates &amp; Recovery</h2>
              <p className="text-sm text-foreground/75 leading-relaxed font-light">
                Our infrared hot workouts match core alignment with active restoration. 
                Cycle through the options on the right to select the best creative choice for this section.
              </p>
            </div>
            <div>
              <ImagePlaceholderCarousel
                placeholderId={2}
                options={[
                  { src: "/yin-stine.jpg", alt: "Restorative Yin Yoga with bolster" },
                  { src: "/ad-pilates-stretch.jpg", alt: "Sideways Pilates stretch with ball" },
                  { src: "/ad-sculpt-pushup.jpg", alt: "Infrared Sculpt single leg pushup" }
                ]}
                aspectRatioClass="aspect-video"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
