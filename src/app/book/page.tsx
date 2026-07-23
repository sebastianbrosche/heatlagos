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

function OfferRow({ plan }: { plan: Plan }) {
  const priceLabel = plan.unit ? `${plan.price}${plan.unit}` : plan.price;

  return (
    <a
      href={plan.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-1 border-b border-white/10 py-5 transition-colors last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:py-6"
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="font-serif text-xl text-foreground sm:text-2xl">
            {plan.name}
          </span>
          {plan.badge && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-brand">
              {plan.badge}
            </span>
          )}
        </div>
        <p className="mt-1 max-w-xl text-sm leading-relaxed text-foreground/60 sm:text-[15px]">
          {plan.description}
        </p>
        {plan.note && (
          <p className="mt-1 text-[11px] text-foreground/45">{plan.note}</p>
        )}
      </div>
      <div className="mt-2 flex shrink-0 items-baseline gap-2 sm:mt-0 sm:flex-col sm:items-end sm:gap-0">
        {plan.wasPrice && (
          <span className="font-serif text-base text-foreground/35 line-through sm:text-lg">
            {plan.wasPrice}
          </span>
        )}
        <span className="font-serif text-2xl text-brand sm:text-3xl">
          {priceLabel}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/40 transition-colors group-hover:text-brand sm:mt-1">
          Get →
        </span>
      </div>
    </a>
  );
}

/**
 * GBP / Maps booking target: scannable offer list, not the homepage price grid.
 */
export default function BookPage() {
  return (
    <>
      <Header />
      <Marquee />
      <main>
        <section className="px-5 pt-32 pb-10 sm:px-6 sm:pt-40 sm:pb-12 lg:px-20">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-serif text-[2.4rem] leading-[1.05] text-foreground sm:text-5xl">
              Book Heat Lagos
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground/65 sm:text-lg">
              Pick an offer. Checkout opens in a new tab. Or skip to the schedule
              below for one class.
            </p>

            <div className="mt-14 flex flex-col gap-14 sm:mt-16 sm:gap-16">
              {GROUPS.map((group) => {
                const plans = group.ids
                  .map((id) => planById(id))
                  .filter((p): p is Plan => Boolean(p));
                if (!plans.length) return null;
                return (
                  <div key={group.title}>
                    <h2 className="font-serif text-xl text-foreground sm:text-2xl">
                      {group.title}
                    </h2>
                    <p className="mt-1 text-sm text-foreground/50">
                      {group.blurb}
                    </p>
                    <div className="mt-4 border-t border-white/15">
                      {plans.map((plan) => (
                        <OfferRow key={plan.id ?? plan.name} plan={plan} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-20 lg:pb-28">
          <div className="mx-auto max-w-3xl border-t border-white/10 pt-14 sm:pt-16">
            <h2 className="font-serif text-xl text-foreground sm:text-2xl">
              Class schedule
            </h2>
            <p className="mt-1 mb-8 text-sm text-foreground/50">
              Book a single class on the calendar.
            </p>
            <Schedule hideHeading />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
