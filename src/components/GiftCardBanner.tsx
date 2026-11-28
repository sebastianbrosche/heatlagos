import EarlyBirdGate from "./EarlyBirdGate";
import { GIFT_CARD_DEC } from "@/lib/giftCard";

// December 2026 gift card. Auto-hides from Fri 1 Jan 2027 00:00 Lisbon.
export default function GiftCardBanner({ compact = false }: { compact?: boolean }) {
  const g = GIFT_CARD_DEC;
  return (
    <EarlyBirdGate from={g.from} until={g.until}>
      <section
        id="gift-cards"
        aria-label="Gift card"
        className={compact ? "px-0 pt-10" : "px-5 pt-12 sm:px-6 sm:pt-16 lg:px-20"}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col gap-5 rounded-2xl bg-brand px-6 py-7 text-stone-dark sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-9">
            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                Gift cards · December only
              </p>
              <h2 className="font-serif text-3xl leading-tight sm:text-4xl">
                {g.name}
              </h2>
              <p className="flex flex-wrap items-baseline gap-x-3 font-serif text-2xl sm:text-3xl">
                <span className="text-stone-dark/50 line-through decoration-stone-dark/40">
                  {g.wasPrice}
                </span>
                <span>{g.price}</span>
              </p>
              <p className="max-w-xl text-sm sm:text-base">{g.detail}</p>
            </div>
            <a
              href={g.href}
              target="_blank"
              rel="noopener noreferrer"
              id={g.id}
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-stone-dark px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.25em] text-brand transition-opacity hover:opacity-90"
            >
              Give it for {g.price}
            </a>
          </div>
        </div>
      </section>
    </EarlyBirdGate>
  );
}
