import { PLANS } from "@/lib/pricing";

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
            Prices.
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
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                {plan.wasPrice && (
                  <span
                    className={`font-serif text-xl line-through sm:text-2xl ${
                      plan.highlight
                        ? "text-stone-dark/45 decoration-stone-dark/40"
                        : "text-foreground/40 decoration-foreground/35"
                    }`}
                  >
                    {plan.wasPrice}
                  </span>
                )}
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
                id={plan.id}
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
                  plan.highlight ? "text-stone-dark" : "text-brand"
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
