import EarlyBirdGate from "./EarlyBirdGate";
import { BLACK_WEEK } from "@/lib/blackWeek";

// Black Week 2026 banner. Auto-hides after Fri 27 Nov 23:59 Lisbon.
export default function BlackWeekBanner({ compact = false }: { compact?: boolean }) {
  return (
    <EarlyBirdGate from={BLACK_WEEK.from} until={BLACK_WEEK.until}>
      <section
        id="black-week"
        aria-label="Black Week offer"
        className={compact ? "px-0 pt-10" : "px-5 pt-12 sm:px-6 sm:pt-16 lg:px-20"}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-6 rounded-2xl bg-brand px-6 py-7 text-stone-dark sm:px-10 sm:py-9">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                Black Week at Heat · 20 to 27 Nov
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl lg:text-5xl">
                25% off 1 Month Unlimited and 10 Class Package
              </h2>
              <p className="text-sm sm:text-base">
                Use code <strong className="font-semibold tracking-[0.15em]">{BLACK_WEEK.code}</strong>{" "}
                at checkout. Valid until Friday 27 November. One code per person,
                on one of the two offers.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {BLACK_WEEK.offers.map((o) => (
                <div
                  key={o.id}
                  className="flex flex-col gap-3 rounded-xl bg-stone-dark/10 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-serif text-xl sm:text-2xl">{o.name}</p>
                    <p className="flex flex-wrap items-baseline gap-x-3 font-serif text-2xl sm:text-3xl">
                      <span className="text-stone-dark/50 line-through decoration-stone-dark/40">
                        {o.wasPrice}
                      </span>
                      <span>{o.price}</span>
                    </p>
                    <p className="text-sm">{o.detail}</p>
                  </div>
                  <a
                    href={o.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={o.id}
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-stone-dark px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-brand transition-opacity hover:opacity-90"
                  >
                    Get it for {o.price}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </EarlyBirdGate>
  );
}
