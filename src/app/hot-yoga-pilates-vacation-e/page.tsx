import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import ImagePlaceholderCarousel from "@/components/ImagePlaceholderCarousel";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-e";

export const metadata: Metadata = {
  title: "STRONG Heated Pilates & Sculpt - Vacation Week Pass - Heat Lagos",
  description: "Experience the athletic simplicity of heated Pilates and Sculpt during your vacation. 7 days of unlimited classes for €59. Near Batata Beach.",
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
      
      <main className="bg-stone-dark text-foreground min-h-screen pt-32 pb-20 sm:pt-40 lg:pb-32">
        {/* Simple Strong Header */}
        <section className="px-5 max-w-5xl mx-auto border-b border-white/10 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] text-brand font-bold">Jetlag Detox Sculpt</span>
              <h1 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-none mt-4">
                SWEAT.<br />DETOX. PLUNGE.
              </h1>
            </div>
            <div className="md:text-right space-y-2">
              <p className="text-sm uppercase tracking-widest text-foreground/60">Batata Beach, Lagos</p>
              <p className="text-lg font-bold text-brand">7 Days Unlimited • €59</p>
            </div>
          </div>
        </section>

        {/* Studio Specs Bar */}
        <section className="px-5 max-w-5xl mx-auto py-8 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div>
              <span className="text-xs uppercase tracking-wider text-foreground/40 block">Session Length</span>
              <span className="text-base font-bold mt-1 block">45–60 min</span>
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
              <span className="text-base font-bold mt-1 block">30 seconds from Lagos main beach</span>
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
                Keep fit and recover during your Algarve holiday. We offer high-intensity, low-impact heated workouts 
                designed to stretch out flight stiffness, release travel toxins, and recover muscles after surfing. 
                Heated by fresh-air infrared panels, right next to Batata Beach.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-sans font-extrabold text-2xl uppercase tracking-wider">The Sessions</h2>
              <div className="space-y-4">
                <div className="border-l-2 border-brand pl-4 py-1">
                  <h3 className="font-bold text-base uppercase">Surf Recovery</h3>
                  <p className="text-sm text-foreground/70 mt-1">Deep infrared heat penetrates muscles to relieve tightness and soothe shoulders. Decades of teaching experience.</p>
                </div>
                <div className="border-l-2 border-brand/50 pl-4 py-1">
                  <h3 className="font-bold text-base uppercase">Jetlag Detox</h3>
                  <p className="text-sm text-foreground/70 mt-1">Intense cardiovascular sweat that flushes travel fatigue and reboots your body systems. Fresh, breathable air.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Purchase Card */}
          <div className="lg:col-span-5">
            <div className="border border-white/10 bg-stone-dark p-8 rounded-none sticky top-32">
              <h3 className="font-sans font-extrabold text-xl uppercase tracking-wider mb-2">Buy Vacation Pass</h3>
              <p className="text-sm text-foreground/60 font-light mb-6">7 days of unlimited access. Valid for holidaymakers. Start anytime.</p>
              
              <div className="mb-6 border-t border-b border-white/10 py-4 flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider text-foreground/50">Total Price</span>
                <span className="font-sans text-4xl font-extrabold text-brand">€59</span>
              </div>

              <ul className="mb-8 space-y-3 text-sm text-foreground/80 font-light">
                <li>- Unlimited heated Sculpt &amp; Pilates classes</li>
                <li>- Fresh far-infrared heating panels</li>
                <li>- Premium studio mats &amp; towels provided</li>
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
