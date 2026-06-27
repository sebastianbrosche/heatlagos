import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ImagePlaceholderCarousel from "@/components/ImagePlaceholderCarousel";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-e";

export const metadata: Metadata = {
  title: "STRONG Heated Pilates & Sculpt - Intro Offer - Heat Lagos",
  description: "Experience the athletic simplicity of heated Pilates and Sculpt. 14 days of unlimited classes for €79. Near Batata Beach.",
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
      
      <main className="bg-stone-dark text-foreground min-h-screen pt-32 pb-20 sm:pt-40 lg:pb-32">
        {/* Simple Strong Header */}
        <section className="px-5 max-w-5xl mx-auto border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">Heated Pilates &amp; Sculpt</span>
              <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-none mt-4">
                PILATES.<br />REMIXED.
              </h1>
            </div>
            <div className="md:text-right space-y-2">
              <p className="text-sm uppercase tracking-widest text-foreground/60">Batata Beach, Lagos</p>
              <p className="text-lg font-bold text-brand">14 Days Unlimited • €79</p>
            </div>
          </div>
        </section>

        {/* Studio Specs Bar */}
        <section className="px-5 max-w-5xl mx-auto py-8 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Session Length</span>
              <span className="text-base font-bold mt-1 block">50 Minutes</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Temperature</span>
              <span className="text-base font-bold mt-1 block">Infrared Heat</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Skill Level</span>
              <span className="text-base font-bold mt-1 block">All Levels Welcome</span>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Proximity</span>
              <span className="text-base font-bold mt-1 block">20m from Batata Beach</span>
            </div>
          </div>
        </section>

        {/* 2-Column Content Section */}
        <section className="px-5 max-w-5xl mx-auto py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Simple Philosophy & Carousel */}
          <div className="lg:col-span-7 space-y-8">
            <ImagePlaceholderCarousel
              placeholderId={1}
              options={[
                { src: "/pilates-ball-3.jpg", alt: "Heated Mat Pilates class" },
                { src: "/Power.jpg", alt: "Heated Yoga training session" },
                { src: "/ad-sculpt-kickback.jpg", alt: "Infrared Sculpt workout" }
              ]}
              aspectRatioClass="aspect-video"
            />
            <div className="space-y-4">
              <h2 className="font-sans font-extrabold text-2xl uppercase tracking-wider">The Concept</h2>
              <p className="text-base text-foreground/80 leading-relaxed font-light">
                We take high-performance mat Pilates and Sculpt exercises and turn up the heat. 
                Using deep far-infrared panels that warm your body directly (keeping the room air fresh and easy to breathe), 
                our sessions are designed to tone your muscles and stretch your joints. 
                Results-focused, low-impact, and full of good vibes.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-sans font-extrabold text-2xl uppercase tracking-wider">The Sessions</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-brand pl-4 py-1">
                  <h3 className="font-bold text-base uppercase">Strong Sculpt</h3>
                  <p className="text-sm text-foreground/70 mt-1">High-energy resistance work targeting core, obliques, and stability. Hard but doable.</p>
                </div>
                <div className="border-l-2 border-brand/50 pl-4 py-1">
                  <h3 className="font-bold text-base uppercase">Strong Recovery</h3>
                  <p className="text-sm text-foreground/70 mt-1">Chill, relaxing deep-stretch classes post-surf or post-travel. Reset your body clocks.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Purchase Card */}
          <div className="lg:col-span-5">
            <div className="border border-white/10 bg-stone-dark p-8 rounded-none sticky top-32">
              <h3 className="font-sans font-extrabold text-xl uppercase tracking-wider mb-2">Buy Trial Package</h3>
              <p className="text-sm text-foreground/60 font-light mb-6">14 days of unlimited access. No contract. Start anytime.</p>
              
              <div className="mb-6 border-t border-b border-white/10 py-4 flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-foreground/50">Total Price</span>
                <span className="font-sans text-4xl font-extrabold text-brand">€79</span>
              </div>

              <ul className="mb-8 space-y-3 text-sm text-foreground/80 font-light">
                <li>- Unlimited heated Sculpt &amp; Pilates classes</li>
                <li>- Fresh far-infrared heating panels</li>
                <li>- Premium studio mats &amp; props provided</li>
                <li>- Decades of instructor teaching experience</li>
              </ul>

              <a
                href={checkoutUrl}
                className="block w-full text-center bg-foreground hover:bg-brand text-stone-dark font-sans font-extrabold text-xs uppercase tracking-[0.2em] py-4.5 transition-all"
              >
                Book Your Pass
              </a>
            </div>
          </div>
        </section>

        {/* Studio Specs Spotlight */}
        <section className="px-5 max-w-5xl mx-auto py-16 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
            <div className="space-y-4 text-left">
              <span className="text-xs uppercase tracking-widest text-brand font-mono">Heat Lagos Recovery</span>
              <h2 className="font-sans font-extrabold text-2xl uppercase tracking-wider">Aesthetic Focus</h2>
              <p className="text-sm text-foreground/75 leading-relaxed font-light">
                Cycle through the options on the left to select the best visual match for recovery and sculpt.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
