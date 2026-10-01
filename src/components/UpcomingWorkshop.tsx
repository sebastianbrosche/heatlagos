// Upcoming workshop block. Times are Heat Lagos local time (Europe/Lisbon).
// Poster copy is the source of truth. Booking link is the BSport session checkout.
const BOOK_URL =
  "https://backoffice.bsport.io/customer/payment/offer/43689762?membership=5821";

const DETAILS = [
  { label: "When", value: "Saturday 17th October, 3:00 PM to 6:00 PM" },
  { label: "Where", value: "@HEAT LAGOS" },
  { label: "Facilitator", value: "Nadine" },
  { label: "Spots", value: "Limited to only 10 spots. Snacks included." },
];

const EXPECT = [
  "Rebirth yourself",
  "Release tension",
  "Dissolve emotional blocks",
  "Let go of what no longer serves you",
];

export default function UpcomingWorkshop() {
  return (
    <section
      id="upcoming-workshop"
      className="relative scroll-mt-[120px] px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
          Upcoming workshop
        </p>
        <div className="grid gap-10 rounded-3xl bg-stone-dark/70 p-6 ring-1 ring-white/10 sm:p-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl">
              BREATHE TO <em className="text-brand">REBIRTH</em>
            </h2>
            <p className="font-serif text-xl text-foreground/90">
              REMEMBER WHO YOU ARE
            </p>
            <p className="text-foreground/70">
              A Journey of Self-Discovery, Inner Clarity, Freedom &amp;
              Self-Healing with Nadine
            </p>
            <div>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
                What to expect
              </p>
              <ul className="space-y-1 text-foreground/80">
                {EXPECT.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <dl className="space-y-4">
              {DETAILS.map((d) => (
                <div key={d.label} className="flex flex-col gap-1">
                  <dt className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
                    {d.label}
                  </dt>
                  <dd className="text-foreground/90">{d.value}</dd>
                </div>
              ))}
            </dl>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                  Early bird
                </p>
                <p className="font-serif text-3xl text-brand">35€</p>
                <p className="text-sm text-foreground/70">If paid before the 10th</p>
              </div>
              <div className="rounded-2xl bg-black/20 p-5 ring-1 ring-white/5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                  Drop-in
                </p>
                <p className="font-serif text-3xl text-brand">45€</p>
                <p className="text-sm text-foreground/70">On the 17th</p>
              </div>
            </div>
            <p className="font-serif text-lg text-foreground/90">
              EXPERIENCE TRANSFORMATIVE BREATHWORK &amp; DEEP CONNECTION
            </p>
            <a
              href={BOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.25em] text-stone-dark hover:bg-brand-soft transition-colors"
            >
              Book →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
