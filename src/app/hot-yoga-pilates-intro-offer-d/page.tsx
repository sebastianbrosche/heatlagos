import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-d";

export const metadata: Metadata = {
  title: "Infrared Heat Benefits & Intro Offer - Heat Lagos",
  description: "Learn how far-infrared heat works to deep warm muscles, improve flexibility, and speed up recovery. Get 2 weeks unlimited classes for €79.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="The Science of Heat"
      title="How Infrared Heat Works"
      lede="Unlike fan-blown hot air that just warms the skin, our far-infrared panels warm your body directly. Get a deeper stretch, protect your joints, and sweat out tension."
      heroImage="/detail.JPG"
      heroImageAlt="Heat Lagos infrared panels detail"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>The Infrared Benefit</h2>
        <p>
          Far-infrared heat reaches several centimeters into soft tissue. This increases circulation, helps stiff joints relax, and triggers a deep, cleansing sweat. It is the ultimate tool for recovery and flexibility.
        </p>
      </section>

      <section>
        <h2>What You Get in 14 Days</h2>
        <ul>
          <li><strong>Increased Flexibility:</strong> Stretch deeper and safer with warm connective tissue.</li>
          <li><strong>Muscle Recovery:</strong> Boost blood flow to heal sore shoulders, backs, and hips.</li>
          <li><strong>Sweaty Cardio:</strong> Get an extra cardiovascular workout just from the heat.</li>
        </ul>
      </section>

      <section>
        <h2>Experience the Glow for €79</h2>
        <p>
          Get two weeks of unlimited access to test all our infrared classes. Simply click below to check out.
        </p>
      </section>
    </SeoPageShell>
  );
}
