import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-d";

export const metadata: Metadata = {
  title: "Traveler Reviews - Vacation Pass - Heat Lagos",
  description: "Read reviews from travelers and surfers who trained with us. Get 7 days of unlimited hot Pilates and Yoga classes in Lagos for €59.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Traveler Stories"
      title="What Travelers Say"
      lede="See why vacationers, surfers, and digital nomads name Heat Lagos their favorite studio in the Algarve. Enjoy our €59 Vacation Week pass."
      heroImage="/DSC07910.JPG"
      heroImageAlt="Heat Lagos traveler community"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>"A must-visit wellness spot in Lagos"</h2>
        <p>
          Travelers love our location right across from the popular Praia da Batata beach and right beneath Lagos Old Town. It is the easiest way to add health, sweat, and community to your trip.
        </p>
      </section>

      <section>
        <h2>Why Travelers Recommend Us</h2>
        <ul>
          <li><strong>Easy English instruction:</strong> Simple, clear guidance.</li>
          <li><strong>Great schedule variety:</strong> Heated Pilates, Yoga, Sculpt, and Yin.</li>
          <li><strong>No equipment needed:</strong> Premium mats, clean facilities, and towels.</li>
        </ul>
      </section>
    </SeoPageShell>
  );
}
