import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "How to Issue Your Invoice | Heat Lagos",
  description:
    "A step-by-step guide for Heat Lagos instructors on how to issue your monthly Recibo Verde and get paid as an independent contractor in Portugal.",
  robots: "noindex, nofollow",
};

export default function InvoicePage() {
  return (
    <>
      <Header />
      <Marquee />
      <main className="px-5 sm:px-6 lg:px-20 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            For Instructors
          </p>
          <h1 className="font-serif text-[2.2rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
            How to Issue Your First Invoice to Heat Lagos
          </h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed sm:mt-8 sm:text-xl">
            Because you are registered as an independent contractor (Trabalhador
            Independente), you will need to issue a monthly invoice — known in
            Portugal as a Recibo Verde — to get paid. It takes about 3 minutes
            once you are set up.
          </p>

          <div className="seo-prose mt-12 flex flex-col gap-10 text-foreground/80 leading-relaxed sm:mt-16 sm:gap-12 sm:text-lg">

            <section>
              <h2>Step 1: Choose Your Free Invoicing Software</h2>
              <p>
                In Portugal, invoicing software must be certified by the Tax
                Authority (AT). You have two great, free options that expats use:
              </p>
              <ul>
                <li>
                  <strong>InvoiceXpress (Recommended for Expats)</strong> — A
                  certified Portuguese invoicing app with a clean English
                  interface. Their Free Plan allows up to 5 invoices per month,
                  which is perfect for part-time instructors. Visit{" "}
                  <a
                    href="https://invoicexpress.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-4 hover:text-brand-soft"
                  >
                    invoicexpress.com
                  </a>
                  .
                </li>
                <li>
                  <strong>Portal das Finanças (The Government Route)</strong> — The
                  official government website. 100% free with no limits, but the
                  interface is mostly in Portuguese. Visit{" "}
                  <a
                    href="https://portaldasfinancas.gov.pt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand underline underline-offset-4 hover:text-brand-soft"
                  >
                    portaldasfinancas.gov.pt
                  </a>
                  .
                </li>
              </ul>
              <p>
                If you use InvoiceXpress, it automatically communicates with the
                government for you. If you use the Portal das Finanças, you are
                doing it directly on the government site.
              </p>
            </section>

            <section>
              <h2>Step 2: What to Put on the Invoice</h2>
              <p>
                When you create the invoice, you will need our company details and
                your own tax details. Keep this cheat sheet handy.
              </p>

              <h3>Client Details (Heat Lagos)</h3>
              <ul>
                <li>
                  <strong>Client Name:</strong> [Insert exact legal company name,
                  e.g., Heat Lda.]
                </li>
                <li>
                  <strong>Client NIF (Tax ID):</strong> [Insert Heat Lagos NIF]
                </li>
                <li>
                  <strong>Client Address:</strong> [Insert Heat Lagos official
                  address]
                </li>
                <li>
                  <strong>Country:</strong> Portugal
                </li>
              </ul>

              <h3>Service Details</h3>
              <ul>
                <li>
                  <strong>Date:</strong> The last day of the month you are billing
                  for (e.g., 31/05/2026).
                </li>
                <li>
                  <strong>Description / Concept:</strong> Copy and paste this
                  exact phrase:
                  <br />
                  <span className="mt-2 block rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-foreground">
                    "Prestação de serviços de instrutor de [Pilates/Fitness/Yoga]
                    referente ao mês de [Month/Year]."
                  </span>
                  <span className="mt-2 block text-sm text-foreground/50">
                    Translation: Provision of fitness instructor services for the
                    month of X.
                  </span>
                </li>
              </ul>

              <h3>The Portuguese Tax Phrases (Crucial)</h3>
              <p>
                Portugal has specific tax exemptions for new freelancers. Confirm
                the points below with your accountant, but for most new expats
                this is what you will use:
              </p>
              <ul>
                <li>
                  <strong>IVA (VAT) Box:</strong> If you earn under €14,500 a
                  year, you are likely exempt from charging VAT. Select the
                  exemption reason from the dropdown:
                  <br />
                  <span className="mt-2 block rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-foreground">
                    "IVA - regime de isenção [artigo 53.º]"
                  </span>
                </li>
                <li>
                  <strong>IRS Withholding (Retenção na Fonte):</strong> If you
                  are exempt from VAT under Art. 53, you are usually also exempt
                  from the 25% income tax withholding. Select:
                  <br />
                  <span className="mt-2 block rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-foreground">
                    "Sem retenção - Art. 101.º, n.º 1 do CIRS"
                  </span>
                  <span className="mt-2 block text-sm text-foreground/50">
                    Note: If your accountant told you that you DO need the 25%
                    withholding, select "Retenção na fonte de IRS - 25%" instead.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2>Step 3: Sending It to Us</h2>
              <ol>
                <li>Once the invoice is generated, download it as a PDF.</li>
                <li>
                  Email the PDF to{" "}
                  <a
                    href="mailto:accounting@heatlagos.com"
                    className="text-brand underline underline-offset-4 hover:text-brand-soft"
                  >
                    accounting@heatlagos.com
                  </a>
                  .
                </li>
                <li>
                  In the body of the email, include your IBAN (bank account
                  number) so we can process the bank transfer.
                </li>
              </ol>

              <p>Example email:</p>
              <div className="rounded-lg border border-white/10 bg-white/5 px-5 py-4 text-sm leading-relaxed text-foreground/80">
                <p>Hi Team,</p>
                <p className="mt-2">
                  Please find attached my Recibo Verde for the month of [Month].
                  My IBAN for the transfer is: PT50 0000 0000 0000 0000 0000 0.
                </p>
                <p className="mt-2">
                  Let me know if you need anything else!
                </p>
                <p className="mt-2">Best, [Name]</p>
              </div>
            </section>

            <section>
              <h2>3 Quick Tips for Portuguese Freelancers</h2>
              <ul>
                <li>
                  <strong>Do it by the 5th.</strong> Try to send your invoice for
                  the previous month by the 5th of the new month so we can pay you
                  on time.
                </li>
                <li>
                  <strong>Social Security (Segurança Social).</strong> You also
                  need to declare your income on the Segurança Social Direta
                  website every month (between the 10th and 20th), even if your
                  payment is €0 for that month.
                </li>
                <li>
                  <strong>Keep your Activity Open.</strong> Make sure your
                  "Finanças" activity status remains open, even if you take a
                  month off teaching.
                </li>
              </ul>
              <p>
                If you get stuck on a specific dropdown in the software, send a
                screenshot to your studio manager on WhatsApp and we will help you
                figure it out.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
