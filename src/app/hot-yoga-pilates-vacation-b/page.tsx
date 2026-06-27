import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-b";

export const metadata: Metadata = {
  title: "Surf & Cliff Recovery Vacation Pass - Gym Profile - Heat Lagos",
  description: "Perfect post-surf muscle recovery and active cliff walk stretch. 7 days of unlimited heated Pilates and Yoga in Lagos, Portugal for €59.",
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
              <span className="font-serif text-4xl text-brand font-bold">€59</span>
              <span className="text-xs text-foreground/50 block mt-1">7 Days Holiday Pass</span>
            </div>
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Offer Block */}
            <section className="bg-stone-dark/20 border border-white/5 rounded-3xl p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">Vacation Week Pass</h2>
              <p className="text-sm text-foreground/80 leading-relaxed mb-6">
                Spent your day paddling out in the Algarve waves or walking the coastal cliffs? Our 7-Day Vacation Pass gives you unlimited access to heated classes designed to stretch out tired shoulders, back, and hips. Keep active and feel completely refreshed during your holiday.
              </p>
              <a
                href={checkoutUrl}
                className="inline-block bg-brand hover:bg-brand-soft text-stone-dark font-bold text-xs uppercase tracking-wider py-4 px-8 rounded-full transition-all"
              >
                Buy Pass for €59
              </a>
            </section>

            {/* What to Expect */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">What to Expect at Heat Lagos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🔥 Deep Infrared Recovery</h3>
                  <p className="text-xs text-foreground/70 mt-1">Far-infrared panels target stiff joints and tired muscles, healing soreness in minutes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🧘 Welcoming English Guides</h3>
                  <p className="text-xs text-foreground/70 mt-1">Our certified teachers speak fluent English. Clear alignment guidance.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🧼 Towels & Mats Included</h3>
                  <p className="text-xs text-foreground/70 mt-1">Premium mats, straps, blocks, and towels are included. Just bring your workout clothes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-sm">🌊 Beachside Reset</h3>
                  <p className="text-xs text-foreground/70 mt-1">We are located right next to Batata Beach. Step out of the studio and jump into the ocean.</p>
                </div>
              </div>
            </section>

            {/* Classes Included */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">Holiday Classes Available</h2>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand">⚡</span> <strong>Heated Sculpt:</strong> The best sweaty jetlag detox. Blend core training and muscle burn.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">🧘</span> <strong>Heated Pilates:</strong> Low impact, deep core engagement to align your posture after a flight.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">✨</span> <strong>Heated Flow:</strong> Active morning yoga flow to kickstart your holiday energy.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand">🌙</span> <strong>Yin & Mobility:</strong> Deep stretching for hips, shoulders, and back. Ideal surf recovery.
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Pass Information</h3>
              <ul className="space-y-3 text-xs text-foreground/80">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Price</span>
                  <span className="font-bold text-brand">€59</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span>Duration</span>
                  <span className="font-bold">7 Days</span>
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
