const ITEMS = [
  {
    label: "Single Drop-in",
    price: "22€",
    desc: "One class, no commitment. Book your spot for any class on the schedule.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751510/?membership=5821&force=true",
    cta: "Buy drop-in",
  },
  {
    label: "Towel Rental",
    price: "2€",
    desc: "Fresh towel for your class. Add it at checkout or grab one at the studio.",
    href: "https://backoffice.bsport.io/customer/payment/shop-item/462540/?membership=5821",
    cta: "Rent a towel",
  },
];

export default function QuickBuy() {
  return (
    <section className="px-5 pb-20 sm:px-6 sm:pb-24 lg:px-20 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
          Quick grab
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:max-w-2xl">
          {ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-3 rounded-2xl bg-stone-dark/60 p-6 ring-1 ring-white/5 transition-colors hover:ring-brand/40 sm:p-7"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-xl sm:text-2xl">{item.label}</span>
                <span className="font-serif text-2xl text-brand sm:text-3xl">{item.price}</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/70">{item.desc}</p>
              <span className="mt-auto inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand">
                {item.cta} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
