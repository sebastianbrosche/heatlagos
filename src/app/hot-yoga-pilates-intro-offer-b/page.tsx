import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-b";

export const metadata: Metadata = {
  title: "Two Weeks Intro Offer - What Members Say - Heat Lagos",
  description: "Read reviews from local expats and members. Try heated Pilates, Yoga, Sculpt, and Yin for two weeks for €79. Feel refreshed, alive, and find your glow.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Member Reviews & Stories"
      title="Hear From Our Community"
      lede="Don't just take our word for it. Read how heated classes helped our members find their routine, recover from injuries, and feel completely alive."
      heroImage="/DSC07963.JPG"
      heroImageAlt="Heat Lagos class community"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>"The best sweaty workout in Lagos"</h2>
        <p>
          Our members talk about the unique feeling of taking an intense heated Sculpt or Pilates class, followed by a refreshing day. It&apos;s a complete physical and mental reset.
        </p>
      </section>

      <section>
        <h2>What Expats Love</h2>
        <ul>
          <li><strong>Real Community:</strong> A warm, welcoming studio where you can connect with active people.</li>
          <li><strong>Morning Glow:</strong> Start your day with a heated session and feel energized for hours.</li>
          <li><strong>Certified Coaches:</strong> Expert guidance in English to ensure you train safely and effectively.</li>
        </ul>
      </section>

      <section>
        <h2>14 Days of Unlimited Access — €79</h2>
        <p>
          Ready to experience the heat? Click below to buy your trial pass with our express checkout and start booking classes today.
        </p>
      </section>
    </SeoPageShell>
  );
}
