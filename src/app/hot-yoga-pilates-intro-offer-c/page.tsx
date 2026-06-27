import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-c";

export const metadata: Metadata = {
  title: "Fast Express Intro Offer Booking - Heat Lagos",
  description: "Get 14 days of unlimited heated yoga, pilates, and sculpt classes. Fast checkout. €79 two-week trial pass.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Express Checkout"
      title="Start Your Trial Instantly"
      lede="No friction. No complex setups. Get your Two Weeks Unlimited pass for €79 and book your first heated class immediately."
      heroImage="/DSC08008.JPG"
      heroImageAlt="Heat Lagos checkout"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>Get Started in 3 Steps</h2>
        <ul>
          <li><strong>1. Click Booking:</strong> Press the button to launch Bsport express payment.</li>
          <li><strong>2. Enter Details:</strong> Set up your account and confirm your €79 pass.</li>
          <li><strong>3. Book Your Mat:</strong> Choose your first class on our schedule.</li>
        </ul>
      </section>

      <section>
        <h2>Pass Conditions</h2>
        <p>
          Valid for 14 consecutive days starting from your first booked class. Includes unlimited access to heated Pilates, Yoga, Sculpt, Mobility, and Yin classes.
        </p>
      </section>
    </SeoPageShell>
  );
}
