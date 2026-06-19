import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Heat Lagos collects, uses, and protects your information, including data processed when you message us on Instagram or Facebook. Your GDPR rights and how to delete your data.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Privacy Policy | Heat Lagos",
    description:
      "How Heat Lagos handles your data, including Instagram and Facebook messaging. Your rights and how to delete your data.",
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <SeoPageShell
      eyebrow="Last updated 19 June 2026"
      title="Privacy Policy"
      lede="This policy explains what information Heat Lagos collects, how we use it, and the choices you have. It covers our website and the messages you send us on Instagram and Facebook."
    >
      <section>
        <h2>Who we are</h2>
        <p>
          Heat Lagos is an infrared Pilates, yoga and recovery studio in Lagos,
          Portugal. In this policy &quot;we&quot;, &quot;us&quot; and &quot;Heat
          Lagos&quot; mean the studio operating heatlagos.com. We are the data
          controller for the personal data described here. You can reach us any
          time at <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.
        </p>
      </section>

      <section>
        <h2>The short version</h2>
        <ul>
          <li>
            We collect the minimum we need to answer you, take a booking, and
            understand how the website is used.
          </li>
          <li>
            If you message us on Instagram or Facebook, we receive your message
            and profile name so we can reply, sometimes with the help of an
            automated assistant.
          </li>
          <li>We never sell your personal data.</li>
          <li>
            You can ask us to show you, correct, or delete your data at any
            time. See{" "}
            <a href="#data-deletion">Your rights and data deletion</a> below.
          </li>
        </ul>
      </section>

      <section>
        <h2>Information we collect</h2>
        <p>
          <strong>When you visit the website.</strong> Like most sites, we use
          analytics (Google Tag Manager and Google Analytics) to count visits
          and see which pages are useful. This involves cookies and basic
          technical data such as your approximate location, device, browser and
          the pages you view. It is not used to identify you personally.
        </p>
        <p>
          <strong>When you contact us.</strong> If you email us, message us, or
          fill in a form, we receive what you choose to send: typically your
          name, email or phone number, and your message.
        </p>
        <p>
          <strong>When you message us on Instagram or Facebook.</strong> If you
          send a direct message or comment to the Heat Lagos accounts, Meta
          passes us the content of your message and your public profile name and
          picture so we can read and respond. We use this only to answer your
          question and help you book or visit the studio.
        </p>
        <p>
          <strong>When you book a class.</strong> Bookings and payments are
          handled by our scheduling provider (Bsport). Any details you enter
          there are governed by that provider&apos;s own privacy policy.
        </p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To reply to your questions and messages.</li>
          <li>To take and manage class bookings and memberships.</li>
          <li>To keep the website working and improve it.</li>
          <li>To meet our legal and tax obligations.</li>
        </ul>
        <p>
          Our legal bases under the GDPR are your consent (for example,
          analytics cookies and replying to a message you sent us), the
          performance of a contract (managing a booking you make), and our
          legitimate interest in running and improving the studio.
        </p>
      </section>

      <section id="messaging">
        <h2>Messaging and automation on Instagram and Facebook</h2>
        <p>
          To answer common questions quickly (opening hours, prices, how to
          book), we use an automated assistant that can read incoming messages
          to the Heat Lagos Instagram and Facebook accounts and draft or send
          replies. A human at the studio can step in at any point.
        </p>
        <ul>
          <li>
            We access only the conversations people start with us. We do not
            read your private messages with anyone else, and we do not post on
            your behalf.
          </li>
          <li>
            Message content is used solely to respond to you. It is not used for
            advertising and is not sold.
          </li>
          <li>
            The assistant is provided by Anthropic (the Claude AI service), which
            processes the message text to generate a reply and does not use it to
            train its models.
          </li>
          <li>
            This processing relies on the messaging permissions granted by Meta
            and is governed by Meta&apos;s Platform Terms in addition to this
            policy.
          </li>
        </ul>
      </section>

      <section>
        <h2>Who we share data with</h2>
        <p>
          We use a small number of trusted service providers, who only process
          data on our behalf:
        </p>
        <ul>
          <li>
            <strong>Meta</strong> (Instagram and Facebook) — for the messages you
            send us.
          </li>
          <li>
            <strong>Google</strong> — website analytics (Tag Manager, Analytics).
          </li>
          <li>
            <strong>Bsport</strong> — class scheduling, bookings and payments.
          </li>
          <li>
            <strong>Cloudflare</strong> — hosting and delivery of the website.
          </li>
          <li>
            <strong>Anthropic</strong> — the AI assistant that helps draft
            replies to messages.
          </li>
        </ul>
        <p>
          We do not sell your personal data. We only disclose it otherwise if
          the law requires it.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          We keep information only as long as we need it: message threads for as
          long as needed to help you and for a reasonable period afterwards,
          booking records for as long as required for accounting and tax, and
          analytics data for a limited retention window. When data is no longer
          needed, we delete it.
        </p>
      </section>

      <section id="data-deletion">
        <h2>Your rights and data deletion</h2>
        <p>
          Under the GDPR you have the right to access your data, correct it,
          delete it, restrict or object to its use, and to withdraw consent at
          any time. You also have the right to complain to the Portuguese data
          protection authority (CNPD).
        </p>
        <p>
          <strong>To request deletion of your data</strong> — including any
          message history we hold from Instagram or Facebook — email{" "}
          <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a> with the
          subject &quot;Delete my data&quot; and tell us which account or handle
          you messaged us from. We will confirm and complete the deletion within
          30 days. There is no charge.
        </p>
        <p>
          You can also remove our access to your Instagram or Facebook data at
          any time from the &quot;Apps and Websites&quot; settings in your Meta
          account.
        </p>
      </section>

      <section>
        <h2>International transfers</h2>
        <p>
          Some of our providers are based outside the European Economic Area.
          Where that is the case, they rely on safeguards approved under the
          GDPR (such as Standard Contractual Clauses) to protect your data.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Our services are intended for adults. We do not knowingly collect data
          from children under 16. If you believe a child has contacted us,
          please let us know and we will delete the information.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The date at the top shows
          when it last changed. Significant changes will be highlighted on this
          page.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about your privacy or this policy? Email{" "}
          <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a> and we
          will get back to you.
        </p>
      </section>
    </SeoPageShell>
  );
}
