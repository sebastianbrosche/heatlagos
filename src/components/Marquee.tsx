import { planById } from "@/lib/pricing";

const ITEMS = [
  {
    text: "2 for 1 Intro Offer · 22€",
    href:
      planById("cta-2for1")?.href ??
      "https://backoffice.bsport.io/customer/payment/pass/751510/?membership=5821&force=true",
  },
  {
    text: "Vacation Week · 59€",
    href:
      planById("cta-vacation-week")?.href ??
      "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true",
  },
];

export default function Marquee() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

  return (
    <div className="group fixed top-14 sm:top-16 lg:top-20 left-0 right-0 z-40 overflow-hidden bg-brand text-stone-dark">
      <div className="flex animate-marquee whitespace-nowrap py-2 sm:py-2.5">
        {loop.map((item, i) => (
          <a
            key={i}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-6 text-[10px] font-semibold uppercase tracking-[0.2em] sm:mx-8 sm:text-[11px] sm:tracking-[0.25em]"
          >
            {item.text} <span className="mx-6 opacity-60">✦</span>
          </a>
        ))}
      </div>
    </div>
  );
}
