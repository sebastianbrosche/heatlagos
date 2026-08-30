import { planById } from "@/lib/pricing";

const ITEMS = [
  {
    text: "Yearly · 990€ · 365 days unlimited",
    href:
      planById("cta-yearly")?.href ??
      "https://backoffice.bsport.io/customer/payment/pass/751518/?membership=5821&force=true",
  },
  {
    text: "12 Month · 125€/month · Month 13 free",
    href:
      planById("cta-12month")?.href ??
      "https://backoffice.bsport.io/customer/payment/pass/751520/?membership=5821&force=true",
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
