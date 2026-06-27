import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-b";

export const metadata: Metadata = {
  title: "Two Weeks Intro Offer - Gym Profile - Heat Lagos",
  description: "Read reviews from local expats and members. Try heated Pilates, Yoga, Sculpt, and Yin for two weeks for €79. Feel refreshed, alive, and find your glow.",
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
      
      <main className="mx-auto max-w-5xl px-5 pt-28 pb-16 sm:px-6 sm:pt-36 lg:pb-24">
        {/* Banner Section */}
        <div className="rounded-3xl bg-stone-dark/30 border border-white/5 p-6 sm:p-10 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-brand">PureGym Template B (Shortened)</span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">Heat Lagos Studio</h1>
              <p className="text-sm text-foreground/60 mt-1">Batata Beach, Lagos, Portugal • Open Daily</p>
            </div>
            <div className="bg-stone-dark border border-white/10 rounded-2xl p-4 text-center min-w-[150px]">
              <span className="text-xs text-foreground/50 block">From Only</span>
              <span className="font-serif text-4xl text-brand font-bold">€79</span>
              <span className="text-xs text-foreground/50 block mt-1">No contract trial</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Offer Block */}
            <section className="bg-stone-dark/20 border border-white/5 rounded-3xl p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">Two Weeks Unlimited Trial Offer</h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                Ready to experience the heat? If you&apos;ve been curious about our infrared hot workouts, this is the perfect introduction. No rules, no hidden fees—just unlimited access to our entire schedule for 14 consecutive days.
              </p>
              <a
                href={checkoutUrl}
                className="inline-block bg-brand hover:bg-brand-soft text-stone-dark font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-full transition-all"
              >
                Join Now for €79
              </a>
            </section>

            {/* What to Expect */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">What to Expect at Heat Lagos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🔥 Infrared Heating Panels</h3>
                  <p className="text-xs text-foreground/70 mt-1">Deep muscle warmth that boosts stretch capacity and speeds up recovery.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🧘 Certified Instructors</h3>
                  <p className="text-xs text-foreground/70 mt-1">Experienced certified teachers guiding all classes in simple English.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🧼 Fully Equipped Studio</h3>
                  <p className="text-xs text-foreground/70 mt-1">High-end yoga mats and training equipment provided. No gear needed.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🌊 Praia da Batata Location</h3>
                  <p className="text-xs text-foreground/70 mt-1">Right next to Batata Beach. Perfect for a refreshing dip post-workout.</p>
                </div>
              </div>
            </section>

            {/* Classes Included */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">Classes Included in Your Trial</h2>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand">⚡</span> <strong>Heated Sculpt:</strong> Full body dynamic workouts blending cardio, light weights, and heat.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">🧘</span> <strong>Heated Pilates:</strong> Intense core activation, alignment training, and posture building.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">✨</span> <strong>Heated Flow:</strong> Vinyasa-style movements designed to warm joints and build daily energy.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">🌙</span> <strong>Yin & Mobility:</strong> Deep slow-stretch sessions to release tension and soothe muscles.
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Trial Information</h3>
              <ul className="space-y-3 text-xs text-foreground/80">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Price</span>
                  <span className="font-bold text-brand">€79</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Duration</span>
                  <span className="font-bold">14 Days</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Contract</span>
                  <span className="font-bold">No commitment</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>Mats Provided</span>
                  <span className="font-bold text-green-400">Yes</span>
                </li>
              </ul>
              <a
                href={checkoutUrl}
                className="block text-center bg-brand hover:bg-brand-soft text-stone-dark font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl mt-6 transition-all"
              >
                Express Checkout
              </a>
            </div>

            {/* Location Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-2">Location</h3>
              <p className="text-xs text-foreground/75 mb-4 leading-relaxed">
                Rua da Silva (Batata Beach Entrance)<br />
                8600-513 Lagos, Portugal
              </p>
              <div className="aspect-[4/3] rounded-2xl bg-stone-dark border border-white/10 flex items-center justify-center text-xs text-foreground/40">
                [ Batata Beach Studio Map ]
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
