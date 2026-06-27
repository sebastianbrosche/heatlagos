import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-intro-offer-e";

export const metadata: Metadata = {
  title: "Feel Refreshed & Alive - Intro Offer - Heat Lagos",
  description: "Get your morning yoga glow and feel completely alive. Try heated Pilates, Yoga, and Sculpt. Two weeks unlimited classes for €79.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Feel Refreshed"
      title="Morning Glow & Energy"
      lede="Start your day with a sweaty heated session, get a proper workout, and walk out feeling completely alive and recharged. The ultimate wellness routine in Lagos."
      heroImage="/DSC08021.JPG"
      heroImageAlt="Heat Lagos morning workout glow"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>Get Your Glow</h2>
        <p>
          There is a unique feeling of taking an intense hot Sculpt or Pilates session in our studio and stepping out with a refreshed mind. It establishes focus, beats stress, and keeps you glowing all day.
        </p>
      </section>

      <section>
        <h2>Your 14-Day Trial Journey</h2>
        <ul>
          <li><strong>Sweat Out Tension:</strong> Heat helps you release stress and toxic fatigue.</li>
          <li><strong>Boost Daily Energy:</strong> Kickstart your metabolism first thing in the morning.</li>
          <li><strong>Aesthetic Glow:</strong> Improve skin circulation and look and feel healthy.</li>
        </ul>
      </section>

      <section>
        <h2>Claim Your €79 Trial Pass</h2>
        <p>
          Two weeks of unlimited access. No rules, just wellness. Check out instantly below.
        </p>
      </section>
    </SeoPageShell>
  );
}
