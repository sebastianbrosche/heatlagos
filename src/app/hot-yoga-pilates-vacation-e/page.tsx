import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/hot-yoga-pilates-vacation-e";

export const metadata: Metadata = {
  title: "Sweaty Jetlag Detox Vacation Pass - Heat Lagos",
  description: "Lagos' best sweaty jetlag detox. Unravel from your travel, sweat out toxins, and feel refreshed and alive. 7 days unlimited heated classes for €59.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
};

export default function Page() {
  const checkoutUrl = "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true";

  return (
    <SeoPageShell
      eyebrow="Jetlag Recovery"
      title="Lagos' Best Sweaty Jetlag Detox"
      lede="Unravel from your travel, sweat out flight fatigue, and feel completely refreshed and alive. Get 7 days of unlimited access to heated Sculpt, Pilates, and Yoga."
      heroImage="/Sculpt.jpg"
      heroImageAlt="Heat Lagos sweaty jetlag detox sculpt class"
      bookingHref={checkoutUrl}
    >
      <section>
        <h2>Unravel From Your Travel</h2>
        <p>
          Long flights and travel fatigue leave your body dehydrated, stiff, and sluggish. Our infrared heated studio is designed to warm you up, stimulate lymphatic flow, and help you sweat out flight toxins. You will walk out feeling completely recharged and ready for your holiday.
        </p>
      </section>

      <section>
        <h2>The Sweaty Jetlag Detox Package</h2>
        <ul>
          <li><strong>Sweat & Glow:</strong> Cleanse your pores and reboot your system.</li>
          <li><strong>Instant Mobility:</strong> Stretch out stiff back, neck, and leg joints.</li>
          <li><strong>7 Days Unlimited Access:</strong> Full flexibility for just €59.</li>
        </ul>
      </section>
    </SeoPageShell>
  );
}
