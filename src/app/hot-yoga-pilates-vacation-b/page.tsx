import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-b";

export const metadata: Metadata = {
  title: "Surf & Cliff Recovery Vacation Pass - Heat Lagos",
  description: "Perfect post-surf muscle recovery and active cliff walk stretch. 7 days of unlimited heated Pilates and Yoga in Lagos, Portugal for €59.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Active Recovery"
      title="Surf & Muscle Recovery"
      lede="Spent the day surfing the Algarve waves or hiking the cliffs? Soothe your shoulders, recover your muscles, and restore your energy in our infrared heated studio."
      heroImage="/Recovery.jpg"
      heroImageAlt="Heat Lagos surf recovery class"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>Unwind After the Ocean</h2>
        <p>
          Infrared heat penetrates deep into your muscles, speeding up recovery, boosting blood flow, and relieving joint pain from paddling. It is the perfect complement to your active beach holiday in Lagos.
        </p>
      </section>

      <section>
        <h2>7 Days Unlimited Access — €59</h2>
        <ul>
          <li><strong>Deep Stretch:</strong> Heal stiff shoulders, hamstrings, and hips.</li>
          <li><strong>Beachside Location:</strong> Directly across from Praia da Batata beach.</li>
          <li><strong>Fully Equipped:</strong> High-end mats and details provided. Just bring yourself.</li>
        </ul>
      </section>
    </SeoPageShell>
  );
}
