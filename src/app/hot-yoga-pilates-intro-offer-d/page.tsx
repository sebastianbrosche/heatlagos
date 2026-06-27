import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-d";

export const metadata: Metadata = {
  title: "Chic Hot Pilates & Yoga Trial - NYP Template - Heat Lagos",
  description: "Experience luxury heated workouts at Heat Lagos. Get 2 weeks unlimited classes for €79. Enjoy high-performance infrared heat.",
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
      
      <main className="px-5 pt-32 pb-20 sm:px-6 sm:pt-40 lg:px-20 lg:pb-32 bg-stone-dark/10">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* NYP Bold Typographic Hero */}
          <section className="text-center space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-brand/80">Batata Beach Lagos</span>
            <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-foreground uppercase leading-none">
              CORE. SWEAT.<br />MORNING GLOW.
            </h1>
            <p className="mx-auto max-w-xl text-base sm:text-lg text-foreground/75 leading-relaxed font-light">
              Heat Lagos is the premier infrared-heated studio in Portugal. We design results-focused, 
              low-impact classes that tone your body, build core strength, and leave you feeling completely refreshed.
            </p>
          </section>

          {/* Minimalist Pricing Table */}
          <section className="mx-auto max-w-md">
            <div className="border-t-2 border-white/20 pt-8">
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-sans font-bold text-xl uppercase tracking-wider text-foreground">14 Days Unlimited</h3>
                <span className="font-sans text-3xl font-light text-brand">€79</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-6 font-light">
                Unlock full access to Heated Pilates, Sculpt, Yoga, and Mobility. Valid for two weeks from your first booked class. Express checkout.
              </p>
              <a
                href={checkoutUrl}
                className="block w-full text-center border border-foreground hover:bg-foreground hover:text-stone-dark font-sans font-bold text-xs uppercase tracking-[0.25em] py-4 rounded-none transition-all"
              >
                Buy Trial Package
              </a>
            </div>
          </section>

          {/* Amenities & Studio Rules */}
          <section className="grid gap-12 sm:grid-cols-2 pt-8 border-t border-white/10">
            <div>
              <h3 className="font-sans font-bold text-base uppercase tracking-widest text-brand mb-4">Studio Features</h3>
              <ul className="space-y-3 text-sm text-foreground/80 font-light">
                <li>- Fresh far-infrared heat (heats the body directly, air stays easy to breathe)</li>
                <li>- Premium studio yoga mats and props provided in class</li>
                <li>- Friendly, present instructors with decades of teaching experience</li>
                <li>- Filtered water refill station</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans font-bold text-base uppercase tracking-widest text-brand mb-4">Studio Rules</h3>
              <ul className="space-y-3 text-sm text-foreground/80 font-light">
                <li>- Arrive 10 minutes before class to set up your mat</li>
                <li>- Active classes are hard but doable for all levels</li>
                <li>- 12-hour cancellation policy to release mats for other members</li>
                <li>- Batata Beach plunge after class is highly recommended</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
