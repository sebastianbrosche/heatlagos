import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Image from "next/image";

const URL = "https://www.heatlagos.com/bikram-yoga-lagos";

export const metadata: Metadata = {
  title: "Traditional 26&2 Bikram Yoga with Nadine - Heat Lagos",
  description: "Join our traditional hot Bikram Yoga class (26&2 sequence) in Lagos, Portugal. Led by Nadine every Tuesday morning. Near Batata Beach.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const dropInUrl = "https://backoffice.bsport.io/customer/payment/pass/766017/?membership=5821&force=true";
  const trialUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <>
      <Header />
      <Marquee />
      
      <main className="bg-stone-dark text-foreground min-h-screen pt-32 pb-20 sm:pt-40 lg:pb-32">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-20 space-y-16">
          
          {/* Hero Banner / WeHo Style */}
          <section className="relative rounded-3xl overflow-hidden border border-white/10 bg-stone-dark/30 p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">Traditional Hot Sequence</span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] uppercase">
                  BIKRAM YOGA<br />LAGOS
                </h1>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
                  The classic 26 postures and 2 breathing exercises (26&amp;2 method). Led by Nadine every Tuesday morning 
                  under our fresh far-infrared heating panels.
                </p>
                <div className="pt-2">
                  <a
                    href="#pricing"
                    className="inline-block bg-brand hover:bg-brand-soft text-stone-dark font-sans font-extrabold text-xs uppercase tracking-wider py-4 px-8 rounded-full transition-all"
                  >
                    View Pricing Options
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src="/bikram-nadine.jpg"
                  alt="Traditional Bikram Yoga standing forehead to knee posture in front of mirrors at Heat Lagos"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 400px"
                  priority
                />
              </div>
            </div>
          </section>

          {/* Quick Class Info Card Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left border-t border-b border-white/10 py-8">
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Timing</span>
              <span className="text-base font-bold mt-1 block">Tuesday Morning</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Sequence</span>
              <span className="text-base font-bold mt-1 block">26&amp;2 Method</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Teacher</span>
              <span className="text-base font-bold mt-1 block">Nadine (19+ Yrs Exp)</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Location</span>
              <span className="text-base font-bold mt-1 block">Lagos (Batata Beach)</span>
            </div>
          </section>

          {/* Clean 2-Column Info block / Carrie style */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            <div className="space-y-6 bg-stone-dark/20 border border-white/5 rounded-3xl p-6 sm:p-8">
              <h3 className="font-sans font-extrabold text-xl uppercase tracking-wider text-brand">The 26&amp;2 Hot Method</h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                Our Bikram class follows the traditional scientific sequence of 26 postures and 2 breathing exercises. 
                Performed in a heated environment, this class systematically works every muscle, tendon, joint, ligament, 
                organ, and gland, while delivering a powerful cardiovascular flush.
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                Our far-infrared heating panels warm your body directly rather than stuffy air. The room stays fresh, 
                ventilated, and clean—so you can breathe easily and focus 100% on your practice.
              </p>
            </div>

            <div className="space-y-6 bg-stone-dark/20 border border-white/5 rounded-3xl p-6 sm:p-8">
              <h3 className="font-sans font-extrabold text-xl uppercase tracking-wider text-brand">Meet Nadine</h3>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                Nadine is a world-traveling yoga teacher with over 19 years of teaching experience. Having taught Bikram 
                across multiple continents, she brings a deep understanding of alignment, focus, and breath support to every session.
              </p>
              <p className="text-sm sm:text-base text-foreground/80 leading-relaxed font-light">
                Whether you are a seasoned Bikram practitioner or new to the hot room, Nadine&apos;s friendly, present 
                guidance ensures a safe, intense, and deeply rewarding practice.
              </p>
            </div>
          </section>

          {/* Pricing cards matching Carrie's clean style */}
          <section id="pricing" className="space-y-8 pt-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl text-foreground uppercase">Choose Your Session Package</h2>
              <p className="text-sm text-foreground/50 mt-1">Simple pricing. Easy checkout. Mats included.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
              {/* Card 1: Single Class */}
              <div className="border border-white/10 bg-stone-dark p-8 text-center flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand font-bold block mb-2">Drop-in Pass</span>
                  <h3 className="font-serif text-2xl text-foreground">Single Class</h3>
                  <div className="my-6">
                    <span className="font-serif text-4xl text-foreground font-light">€22</span>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light">
                    Perfect for visitors, travelers, or trying a single Tuesday morning session with Nadine.
                  </p>
                </div>
                <a
                  href={dropInUrl}
                  className="block w-full bg-foreground hover:bg-brand text-stone-dark font-sans font-extrabold text-xs uppercase tracking-widest py-3.5 transition-all"
                >
                  Buy drop-in
                </a>
              </div>

              {/* Card 2: Trial pass */}
              <div className="border border-brand bg-stone-dark/30 p-8 text-center flex flex-col justify-between space-y-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand text-stone-dark text-[10px] font-extrabold uppercase tracking-widest px-3 py-1">
                  Best Value
                </span>
                <div>
                  <span className="text-xs uppercase tracking-wider text-brand font-bold block mb-2">Intro Offer</span>
                  <h3 className="font-serif text-2xl text-foreground">2 Weeks Trial</h3>
                  <div className="my-6">
                    <span className="font-serif text-4xl text-foreground font-light">€79</span>
                  </div>
                  <p className="text-xs text-foreground/60 leading-relaxed font-light">
                    14 days of unlimited hot classes. Explore Bikram, Sculpt, Pilates, and Yin to find your routine.
                  </p>
                </div>
                <a
                  href={trialUrl}
                  className="block w-full bg-brand hover:bg-brand-soft text-stone-dark font-sans font-extrabold text-xs uppercase tracking-widest py-3.5 transition-all"
                >
                  Get Trial Pass
                </a>
              </div>
            </div>
          </section>

          {/* Schedule Segment */}
          <section className="border-t border-white/10 pt-16 text-center space-y-6">
            <h2 className="font-serif text-2xl text-foreground uppercase">Class Schedule &amp; Bookings</h2>
            <p className="max-w-xl mx-auto text-sm text-foreground/75 leading-relaxed font-light">
              Nadine&apos;s Bikram class runs every Tuesday morning. Check our live schedule widget on the homepage 
              to book your spot, or purchase your pass above to secure a mat.
            </p>
            <div className="pt-2">
              <a
                href="/#schedule"
                className="inline-flex border border-foreground hover:bg-foreground hover:text-stone-dark font-sans font-bold text-xs uppercase tracking-widest py-4 px-8 transition-all"
              >
                View Live Calendar
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
