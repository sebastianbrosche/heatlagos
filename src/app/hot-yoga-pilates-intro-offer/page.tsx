import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer";

export const metadata: Metadata = {
  title: "Two Weeks Unlimited Intro Offer - Heat Lagos",
  description:
    "Try heated Pilates, Yoga, Sculpt, Mobility, and Yin for two weeks. 14 days of unlimited classes for €79. Experience the Algarve's first infrared studio.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "14 Days Intro Offer | Heat Lagos",
    description:
      "€79 for two weeks of unlimited access to all infrared hot yoga, pilates, sculpt, and mobility classes in Lagos.",
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Special Offer"
      title="Two Weeks Unlimited — €79"
      lede="If you've been curious about us, this is the best way to find out if it's for you. Try heated Pilates, Yoga, Sculpt, Mobility, and Yin. Come once, or come every day."
      heroImage="/heat flow.JPG"
      heroImageAlt="Heat Lagos heated infrared yoga class"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>No rules. Just explore.</h2>
        <p>
          At Heat, we don&apos;t do complex contracts, rules, or hidden fees. We believe in building consistency through experience. This intro offer gives you complete access to our entire schedule so you can find the practice that matches your body.
        </p>
      </section>

      <section>
        <h2>Why Infrared?</h2>
        <ul>
          <li><strong>Deep Tissue Heat:</strong> Far-infrared heat warms your body from the inside out, helping muscles and joints release stiffness in minutes.</li>
          <li><strong>Low Impact, High Focus:</strong> Build core strength, mobility, and cardiovascular health without the heavy impact.</li>
          <li><strong>English Instruction:</strong> All classes are instructed in simple, clear, and easy-to-follow English by certified international teachers.</li>
        </ul>
      </section>

      <section>
        <h2>What to Bring</h2>
        <p>
          Bring a water bottle (we have filtered refills) and comfortable clothes. We provide mats and infrared heating. Simply show up, roll out your mat, and let the heat do the rest.
        </p>
      </section>
    </SeoPageShell>
  );
}
