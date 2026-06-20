import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/terms";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing use of the Heat Lagos website, classes, and our Instagram and Facebook messaging.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Terms of Service | Heat Lagos",
    description:
      "The terms governing use of the Heat Lagos website, classes, and our Instagram and Facebook messaging.",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoPageShell
      eyebrow="Last updated 20 June 2026"
      title="Terms of Service"
      lede="These terms govern your use of the Heat Lagos website, our classes, and our Instagram and Facebook messaging. By using them you agree to these terms."
    >
      <section>
        <h2>The service</h2>
        <p>
          Heat Lagos provides infrared Pilates, yoga and recovery classes in
          Lagos, Portugal, information about them, and an assistant that answers
          questions over Instagram and Facebook direct messages.
        </p>
      </section>

      <section>
        <h2>Bookings and payments</h2>
        <p>
          Class bookings, memberships and payments are handled by our scheduling
          provider (Bsport). Prices and schedules may change; the website shows
          the current details.
        </p>
      </section>

      <section>
        <h2>Automated messaging</h2>
        <p>
          Replies to your direct messages may be generated automatically by an AI
          assistant. They are for general information only and are not
          professional, medical, or legal advice. For anything important a team
          member will follow up, or you can email{" "}
          <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>
          Do not misuse the service, send unlawful or abusive content, or attempt
          to disrupt it. We may decline to respond to or block such use.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The Heat Lagos name, content and branding belong to Heat Lagos and may
          not be used without permission.
        </p>
      </section>

      <section>
        <h2>Disclaimer and liability</h2>
        <p>
          The service is provided &quot;as is&quot;. Exercise carries inherent
          risks; consult a physician before starting. To the extent permitted by
          law, Heat Lagos is not liable for indirect or consequential loss arising
          from use of the website or messaging service.
        </p>
      </section>

      <section>
        <h2>Changes, law &amp; contact</h2>
        <p>
          We may update these terms; the date above shows the last change. These
          terms are governed by the laws of Portugal. Questions:{" "}
          <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.
        </p>
      </section>
    </SeoPageShell>
  );
}
