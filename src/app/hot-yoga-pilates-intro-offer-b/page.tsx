import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ImagePlaceholderCarousel from "@/components/ImagePlaceholderCarousel";

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
      
      <main className="mx-auto max-w-5xl px-5 pt-32 pb-16 sm:px-6 sm:pt-40 lg:pb-24">
        {/* Banner Section with Carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8 rounded-3xl bg-stone-dark/30 border border-white/5 p-6 sm:p-10 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-brand">Special Offer</span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mt-2">Heat Lagos Studio</h1>
                <p className="text-base text-foreground/60 mt-1">Batata Beach, Lagos, Portugal • Open Daily</p>
              </div>
              <div className="bg-stone-dark border border-white/10 rounded-2xl p-4 text-center min-w-[150px]">
                <span className="text-xs text-foreground/50 block">From Only</span>
                <span className="font-serif text-4xl text-brand font-bold">€79</span>
                <span className="text-xs text-foreground/50 block mt-1">No contract trial</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-4">
            <ImagePlaceholderCarousel
              placeholderId={1}
              options={[
                { src: "/pilates-ball-3.jpg", alt: "Heated Mat Pilates class" },
                { src: "/Power.jpg", alt: "Heated Yoga training session" },
                { src: "/ad-sculpt-kickback.jpg", alt: "Infrared Sculpt workout" }
              ]}
              aspectRatioClass="aspect-[4/3] lg:aspect-square"
            />
          </div>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Offer Block */}
            <section className="bg-stone-dark/20 border border-white/5 rounded-3xl p-6 sm:p-8">
              <h2 className="font-serif text-2xl text-foreground mb-4">Two Weeks Unlimited Trial Offer</h2>
              <p className="text-base text-foreground/80 leading-relaxed mb-6">
                Ready to experience the heat? If you&apos;ve been curious about our infrared hot workouts, this is the perfect introduction. No rules, no hidden fees—just unlimited access to our entire schedule for 14 consecutive days.
              </p>
              <a
                href={checkoutUrl}
                className="inline-block bg-brand hover:bg-brand-soft text-stone-dark font-bold text-sm uppercase tracking-wider py-4 px-8 rounded-full transition-all"
              >
                Join Now for €79
              </a>
            </section>

            {/* What to Expect */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">What to Expect at Heat Lagos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-base">Fresh Infrared Heating</h3>
                  <p className="text-sm text-foreground/70 mt-1">Our panels heat your body directly. The air stays fresh, clean, and easy to breathe, while deep heat targets muscle stiffness.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-base">Decades of Experience</h3>
                  <p className="text-sm text-foreground/70 mt-1">Our friendly, present instructors bring decades of teaching experience to guide you through hard but doable classes.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-base">Premium Studio Mats</h3>
                  <p className="text-sm text-foreground/70 mt-1">Premium yoga mats and props are provided in-studio. Roll in, work out, and leave without packing wet gear.</p>
                </div>
                <div className="p-4 rounded-2xl bg-stone-dark/10 border border-white/5">
                  <h3 className="font-bold text-foreground text-base">Praia da Batata Location</h3>
                  <p className="text-sm text-foreground/70 mt-1">Located just meters from Batata Beach. Step out of a sweaty session and dive directly into the cool Atlantic ocean.</p>
                </div>
              </div>
            </section>

            {/* Classes Included */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl text-foreground">Classes Included in Your Trial</h2>
              <ul className="space-y-3 text-base text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> <strong>Heated Sculpt:</strong> Full body results-oriented workouts designed to challenge your strength and core. Hard but doable.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> <strong>Heated Pilates:</strong> Low-impact core activation, posture alignment, and deep muscular focus.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> <strong>Heated Flow:</strong> Active morning yoga classes built to stretch, sweat, and energize your day.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand font-bold">-</span> <strong>Yin &amp; Mobility:</strong> Chill, relaxing deep-stretch classes to recover from stiffness and stress.
                </li>
              </ul>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Details Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Trial Information</h3>
              <ul className="space-y-3 text-sm text-foreground/80">
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

            {/* Gallery Preview Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6 mb-6">
              <h3 className="font-serif text-lg text-foreground mb-4">Studio Preview</h3>
              <ImagePlaceholderCarousel
                placeholderId={2}
                options={[
                  { src: "/yin-stine.jpg", alt: "Restorative Yin Yoga with bolster" },
                  { src: "/ad-pilates-stretch.jpg", alt: "Sideways Pilates stretch with ball" },
                  { src: "/ad-sculpt-pushup.jpg", alt: "Infrared Sculpt single leg pushup" }
                ]}
                aspectRatioClass="aspect-[4/3]"
              />
            </div>

            {/* Location Card */}
            <div className="bg-stone-dark/30 border border-white/5 rounded-3xl p-6">
              <h3 className="font-serif text-lg text-foreground mb-2">Location</h3>
              <p className="text-sm text-foreground/75 mb-4 leading-relaxed">
                Rua da Silva (Batata Beach Entrance)<br />
                8600-513 Lagos, Portugal
              </p>
              <div className="aspect-[4/3] rounded-2xl bg-stone-dark border border-white/10 flex items-center justify-center text-sm text-foreground/40">
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
