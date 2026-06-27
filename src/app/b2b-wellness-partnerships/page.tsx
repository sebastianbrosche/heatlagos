import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

const URL = "https://www.heatlagos.com/b2b-wellness-partnerships";

export const metadata: Metadata = {
  title: "Corporate Wellness & B2B Partnerships - Heat Lagos",
  description: "Offer your employees, surf camp guests, or hotel guests exclusive discount rates for infrared hot Pilates and Yoga classes in Lagos.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const emailLink = "mailto:sebastian.brosche@gmail.com?subject=Heat%20Lagos%20B2B%20Partnership%20Inquiry";

  return (
    <>
      <Header />
      <Marquee />
      
      <main className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pb-32 bg-stone-dark/10">
        <div className="mx-auto max-w-4xl space-y-16 px-5 sm:px-6 lg:px-20">
          
          {/* Header section */}
          <section className="text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] text-brand">Partnership Program</span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1]">
              Wellness Partnerships
            </h1>
            <p className="mx-auto max-w-2xl text-base sm:text-lg text-foreground/80 leading-relaxed font-light">
              Partner with Heat Lagos to offer your employees, hotel guests, or surf camp groups exclusive discounted access 
              to the Algarve&apos;s premier infrared heated studio.
            </p>
          </section>

          {/* Three Column Benefits Segment */}
          <section className="grid gap-8 md:grid-cols-3 border-t border-white/10 pt-12">
            <div className="space-y-3">
              <h3 className="font-sans font-bold text-base text-brand uppercase tracking-wider">For Businesses</h3>
              <p className="text-sm text-foreground/75 leading-relaxed font-light">
                Boost your team&apos;s energy and wellness. Offer your employees discount corporate rates for heated Pilates 
                and Yoga to relieve desk tension and back pain.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-sans font-bold text-base text-brand uppercase tracking-wider">For Hotels &amp; Hostels</h3>
              <p className="text-sm text-foreground/75 leading-relaxed font-light">
                Give your visitors a high-end wellness activity. We provide custom promo passes and class discounts 
                tailored specifically for your guest check-ins.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-sans font-bold text-base text-brand uppercase tracking-wider">For Surf Camps</h3>
              <p className="text-sm text-foreground/75 leading-relaxed font-light">
                The ultimate post-surf recovery. Deep infrared heat relaxes stiff shoulders and back muscles, speeding 
                up ocean-fatigue healing for your camp groups.
              </p>
            </div>
          </section>

          {/* Call to Action Block */}
          <section className="bg-stone-dark/30 border border-white/15 rounded-3xl p-8 sm:p-12 text-center space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-foreground">Launch Your Partnership</h2>
            <p className="mx-auto max-w-xl text-sm sm:text-base text-foreground/75 leading-relaxed font-light">
              We offer customizable partnership tiers, custom promo codes, and dedicated private group bookings. 
              Contact us directly to discuss how we can build a package that fits your organization.
            </p>
            <div className="pt-4">
              <a
                href={emailLink}
                className="inline-flex rounded-full bg-brand px-8 py-4.5 text-xs font-bold uppercase tracking-[0.2em] text-stone-dark transition-all hover:bg-brand-soft hover:shadow-lg"
              >
                Inquire About Partnerships
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}
