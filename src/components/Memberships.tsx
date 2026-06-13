type Plan = {
  name: string;
  price: string;
  unit?: string;
  description: string;
  badge?: string;
  highlight?: boolean;
  glow?: boolean;
  note?: string;
  href?: string;
};

const PLANS: Plan[] = [
  {
    name: "Intro Offer",
    price: "79€",
    description:
      "2 weeks unlimited for new students. The best way to meet the studio and every class on the schedule.",
    badge: "Start here",
    highlight: true,
    href: "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true",
  },
  {
    name: "Summer Membership",
    price: "390€",
    description: "3 months unlimited - for the full Lagos summer.",
    badge: "Most popular",
    glow: true,
    note: "Available until 31 May",
    href: "https://backoffice.bsport.io/customer/payment/pass/751501/?membership=5821&force=true",
  },
  {
    name: "12 Month Membership",
    price: "125€",
    unit: "/month",
    description: "Our lowest monthly rate. Rolling subscription, unlimited classes.",
    badge: "Best value",
    highlight: true,
    href: "https://backoffice.bsport.io/customer/payment/pass/751520/?membership=5821&force=true",
  },
  {
    name: "1 Month",
    price: "160€",
    description: "One-off monthly unlimited, no subscription commitment.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751517/?membership=5821&force=true",
  },
  {
    name: "Yearly",
    price: "1 200€",
    description: "Pay up front and save 300€ compared to the 12-month plan.",
    note: "Save 300€",
    href: "https://backoffice.bsport.io/customer/payment/pass/751518/?membership=5821&force=true",
  },
  {
    name: "10 Class Package",
    price: "180€",
    description: "Flexible 10-pack for regulars who want variety.",
    note: "Valid for 3 months",
    href: "https://backoffice.bsport.io/customer/payment/pass/751509/?membership=5821&force=true",
  },
  {
    name: "Vacation Week",
    price: "59€",
    description: "7 days unlimited - designed for travelers staying in Lagos.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true",
  },
  {
    name: "Single Drop-in",
    price: "22€",
    description: "One class, no commitment.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751510/?membership=5821&force=true",
  },
];

export default function Memberships() {
  return (
    <section
      id="memberships"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-16">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            Heat Memberships
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-5xl lg:text-7xl">
            Pricing made
            <br />
            <em className="text-brand">simple.</em>
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Drop in once, stay for the season, or make Heat part of your week.
            All memberships include access to every class - Pilates, Yoga,
            Sculpt, Mobility, Recovery and Yin.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col gap-3 rounded-2xl p-6 ring-1 transition-colors sm:gap-4 sm:p-7 ${
                plan.highlight
                  ? "bg-brand text-stone-dark ring-brand"
                  : plan.glow
                    ? "bg-stone-dark/60 ring-brand/50 shadow-[0_0_24px_-6px_rgba(252,150,106,0.45)] hover:ring-brand/70"
                    : "bg-stone-dark/60 ring-white/5 hover:ring-brand/40"
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-5 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] sm:left-6 ${
                    plan.highlight
                      ? "bg-stone-dark text-brand"
                      : "bg-brand text-stone-dark"
                  }`}
                >
                  {plan.badge}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="font-serif text-xl sm:text-2xl">{plan.name}</h3>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-4xl sm:text-5xl">{plan.price}</span>
                {plan.unit && (
                  <span className="text-sm opacity-70">{plan.unit}</span>
                )}
              </div>
              <p
                className={`text-sm leading-relaxed ${plan.highlight ? "text-stone-dark/80" : "text-foreground/70"}`}
              >
                {plan.description}
              </p>
              {plan.note && (
                <p
                  className={`text-[11px] uppercase tracking-[0.2em] ${plan.highlight ? "text-stone-dark/70" : "text-brand"}`}
                >
                  {plan.note}
                </p>
              )}
              <a
                href={plan.href ?? "#schedule"}
                target={plan.href ? "_blank" : undefined}
                rel={plan.href ? "noopener noreferrer" : undefined}
                aria-label={`Join now - ${plan.name}`}
                className="absolute inset-0 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="sr-only">Join now</span>
              </a>
              <span
                aria-hidden
                className={`mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] ${
                  plan.highlight
                    ? "text-stone-dark"
                    : "text-brand"
                }`}
              >
                Join now
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
