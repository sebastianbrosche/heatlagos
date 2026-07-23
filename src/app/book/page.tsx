import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Schedule from "@/components/Schedule";
import { planById, type Plan } from "@/lib/pricing";

const URL = "https://www.heatlagos.com/book";

export const metadata: Metadata = {
  title: "Book a Class or Pass - Heat Lagos",
  description:
    "Overview of Heat Lagos offers: intro, memberships, vacation week, class pack, drop-in. Book online or open the schedule.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "Book Heat Lagos",
    description:
      "Simple offer list for Maps and Google booking: intro, monthly, yearly, packs, vacation week, drop-in.",
  },
};

type Group = {
  title: string;
  blurb: string;
  ids: string[];
};

const GROUPS: Group[] = [
  {
    title: "New here",
    blurb: "Best first step if you have not trained with us yet.",
    ids: ["cta-intro-offer", "cta-1month"],
  },
  {
    title: "Visiting Lagos",
    blurb: "Short stay. Unlimited for a week.",
    ids: ["cta-vacation-week"],
  },
  {
    title: "Live here",
    blurb: "Ongoing memberships for locals and long-stay expats.",
    ids: ["cta-essential", "cta-12month", "cta-yearly"],
  },
  {
    title: "Flexible",
    blurb: "No subscription. Pack or single class.",
    ids: ["cta-10class", "cta-drop-in"],
  },
];

function OfferCard({ plan }: { plan: Plan }) {
  const priceLabel = plan.unit ? `${plan.price}${plan.unit}` : plan.price;

  return (
    <a
      href={plan.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-stone-dark/40 px-5 py-5 transition-colors hover:border-brand/40 sm:px-6 sm:py-6"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-serif text-xl leading-snug text-foreground sm:text-2xl">
            {plan.name}
          </p>
          {plan.badge && (
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-brand">
              {plan.badge}
            </p>
          )}
        </div>
        <div className="shrink-0 text-right">
          {plan.wasPrice && (
            <p className="font-serif text-sm text-foreground/35 line-through">
              {plan.wasPrice}
            </p>
          )}
          <p className="font-serif text-2xl text-brand sm:text-[1.65rem]">
            {priceLabel}
          </p>
        </div>
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/60">
        {plan.description}
      </p>
      {plan.note && (
        <p className="mt-2 text-[11px] text-foreground/40">{plan.note}</p>
      )}
      <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/45 transition-colors group-hover:text-brand">
        Get →
      </p>
    </a>
  );
}

/**
 * GBP / Maps booking target: grouped offer cards, centered section titles.
 */
export default function BookPage() {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <section className="px-5 pt-32 pb-10 sm:px-6 sm:pt-40 sm:pb-12 lg:px-20">
          <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-serif text-[2.4rem] leading-[1.05] text-foreground sm:text-5xl">
                Book Heat Lagos
              </h1>
              <p className="mt-5 text-base leading-relaxed text-foreground/65 sm:text-lg">
                Pick an offer. Checkout opens in a new tab. Or skip to the
                schedule below for one class.
              </p>
            </div>

            <div className="mt-14 flex flex-col gap-16 sm:mt-16 sm:gap-20">
              {GROUPS.map((group) => {
                const plans = group.ids
                  .map((id) => planById(id))
                  .filter((p): p is Plan => Boolean(p));
                if (!plans.length) return null;

                const multi = plans.length > 1;

                return (
                  <div key={group.title}>
                    <div className="mx-auto max-w-xl text-center">
                      <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                        {group.title}
                      </h2>
                      <p className="mt-2 text-sm text-foreground/50 sm:text-[15px]">
                        {group.blurb}
                      </p>
                    </div>

                    <div
                      className={`mx-auto mt-8 grid gap-4 ${
                        multi
                          ? "max-w-5xl sm:grid-cols-2 lg:grid-cols-3"
                          : "max-w-md sm:grid-cols-1"
                      }`}
                    >
                      {plans.map((plan) => (
                        <OfferCard key={plan.id ?? plan.name} plan={plan} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-20 lg:pb-28">
          <div className="mx-auto max-w-5xl border-t border-white/10 pt-14 sm:pt-16">
            <div className="mx-auto mb-8 max-w-xl text-center">
              <h2 className="font-serif text-2xl text-foreground sm:text-3xl">
                Class schedule
              </h2>
              <p className="mt-2 text-sm text-foreground/50">
                Book a single class on the calendar.
              </p>
            </div>
            <Schedule hideHeading />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
