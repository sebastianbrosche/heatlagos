import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ImagePlaceholderCarousel from "@/components/ImagePlaceholderCarousel";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-d";

export const metadata: Metadata = {
  title: "Chic Vacation Pass - NYP Template - Heat Lagos",
  description: "Experience luxury heated holiday workouts at Heat Lagos. Get 7 days unlimited classes for €59. Near Praia da Batata.",
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
      
      <main className="px-5 pt-32 pb-20 sm:px-6 sm:pt-40 lg:px-20 lg:pb-32 bg-stone-dark/10">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* NYP Bold Typographic Hero */}
          <section className="text-center space-y-6">
            <span className="text-[11px] uppercase tracking-[0.4em] text-brand/80">Batata Beach Lagos</span>
            <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tighter text-foreground uppercase leading-none">
              SWEAT. RESTORE.<br />BEACH PLUNGE.
            </h1>
            <p className="mx-auto max-w-xl text-base sm:text-lg text-foreground/75 leading-relaxed font-light">
              Heat Lagos is your premium hot holiday fitness spot. Restore your muscle flexibility post-surf or post-flight, 
              sweat out flight toxins, and run straight into the Batata beach waves.
            </p>
          </section>

          {/* Hero Carousel */}
          <section className="mx-auto max-w-3xl">
            <ImagePlaceholderCarousel
              placeholderId={1}
              options={[
                { src: "/pilates-ball-3.jpg", alt: "Heated Mat Pilates class" },
                { src: "/Power.jpg", alt: "Heated Yoga training session" },
                { src: "/ad-sculpt-kickback.jpg", alt: "Infrared Sculpt workout" }
              ]}
              aspectRatioClass="aspect-video"
            />
          </section>

          {/* Minimalist Pricing Table */}
          <section className="mx-auto max-w-md">
            <div className="border-t-2 border-white/20 pt-8">
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="font-sans font-bold text-xl uppercase tracking-wider text-foreground">Vacation Week</h3>
                <span className="font-sans text-3xl font-light text-brand">€59</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed mb-6 font-light">
                Unlock 7 days of unlimited access to Heated Pilates, Yoga, Sculpt, and Mobility. The ideal pass for surfers and holiday visitors.
              </p>
              <a
                href={checkoutUrl}
                className="block w-full text-center border border-foreground hover:bg-foreground hover:text-stone-dark font-sans font-bold text-xs uppercase tracking-[0.25em] py-4 rounded-none transition-all"
              >
                Get Vacation Pass
              </a>
            </div>
          </section>

          {/* Amenities & Studio Rules */}
          <section className="grid gap-12 sm:grid-cols-2 pt-8 border-t border-white/10">
            <div>
              <h3 className="font-sans font-bold text-base uppercase tracking-widest text-brand mb-4">Traveler Features</h3>
              <ul className="space-y-3 text-sm text-foreground/80 font-light">
                <li>- Fresh far-infrared heat targets joint soreness and stiffness directly</li>
                <li>- Premium studio yoga mats and sweat towels provided in-class</li>
                <li>- Decades of experience. Friendly, present international instructors</li>
                <li>- Located just 20 meters from Batata Beach entrance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-sans font-bold text-base uppercase tracking-widest text-brand mb-4">Holiday Rules</h3>
              <ul className="space-y-3 text-sm text-foreground/80 font-light">
                <li>- Book your mat in advance (schedule fills up quickly)</li>
                <li>- Active classes are hard but doable. Yoga/recovery classes are chill</li>
                <li>- 12-hour cancellation policy to release mats for other travelers</li>
                <li>- Bring a water bottle (filtered refills in studio)</li>
              </ul>
            </div>
          </section>

          {/* Aesthetic Spotlight */}
          <section className="mx-auto max-w-3xl border-t border-white/10 pt-16">
            <div className="space-y-6">
              <span className="text-[11px] uppercase tracking-[0.4em] text-brand/80 block text-center">Option Selection 2</span>
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
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
