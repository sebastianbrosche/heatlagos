import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-c";

export const metadata: Metadata = {
  title: "Fast Vacation Pass Booking - Heat Lagos",
  description: "Get 7 days of unlimited heated yoga, pilates, and sculpt classes during your holiday in Lagos. €59 vacation pass.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Fast Vacation Booking"
      title="Book Your Vacation Week"
      lede="Get your 7-day unlimited pass for €59. Simple, instant setup so you can sweat, stretch, and get back to the beach."
      heroImage="/praiabatata-1.jpg"
      heroImageAlt="Praia da Batata beach near the studio"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>7 Days Unlimited — €59</h2>
        <p>
          Unlimited access to all Pilates, Yoga, Sculpt, and Mobility classes. Valid for 7 consecutive days starting from your first booked class. Check out instantly via our secure express booking.
        </p>
      </section>
    </SeoPageShell>
  );
}
