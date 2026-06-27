import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/vacation";

export const metadata: Metadata = {
  title: "Vacation Week Pass - Heat Lagos",
  description:
    "7 days of unlimited heated Pilates, Yoga, Sculpt, and Mobility classes. Designed for travelers visiting Lagos, Portugal. Roll out your mat right by the beach.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "Vacation Week Pass | Heat Lagos",
    description:
      "€59 for 7 days of unlimited access to our heated infrared studio. Perfect for vacationers in Lagos, Portugal.",
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Traveler Offer"
      title="Vacation Week — €59"
      lede="Sweat, recover, recharge. Keep up your practice while visiting the Algarve. Get 7 days of unlimited access to all infrared heated Pilates, Yoga, Sculpt, and Mobility classes."
      heroImage="/praiabatata-2.jpg"
      heroImageAlt="Praia da Batata beach near Heat Lagos"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>Stay Active on Vacation</h2>
        <p>
          Located right across the street from Praia da Batata (the most popular beach beneath Lagos Old Town), Heat Lagos is the perfect place to recharge after a day of surfing, exploring, or sunbathing. Our 7-day pass is fully flexible and designed to fit your vacation schedule.
        </p>
      </section>

      <section>
        <h2>The Studio Experience</h2>
        <ul>
          <li><strong>Infrared Recovery:</strong> The ideal way to soothe tired muscles after surfing or hiking the Algarve cliffs.</li>
          <li><strong>Central Location:</strong> Walking distance from 99% of tourist accommodations in Old Town Lagos.</li>
          <li><strong>Fully Equipped:</strong> High-quality mats and facilities provided. Just bring your workout clothes.</li>
        </ul>
      </section>

      <section>
        <h2>Fast Express Booking</h2>
        <p>
          Click the booking link to purchase your Vacation Week pass directly through our express checkout. You can book your first class and roll out your mat immediately!
        </p>
      </section>
    </SeoPageShell>
  );
}
