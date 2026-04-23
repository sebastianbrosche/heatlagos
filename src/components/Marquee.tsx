const MESSAGES = [
  "Intro Offer — 2 weeks unlimited · 79€",
  "Infrared heated studio",
  "Pilates · Yoga · Sculpt",
  "Mobility · Recovery · Yin",
];

export default function Marquee() {
  return (
    <a
      href="https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true"
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed top-14 sm:top-16 lg:top-20 left-0 right-0 z-40 overflow-hidden bg-brand text-stone-dark"
    >
      <div className="flex animate-marquee whitespace-nowrap py-2 sm:py-2.5">
        {[...MESSAGES, ...MESSAGES, ...MESSAGES, ...MESSAGES].map((msg, i) => (
          <span
            key={i}
            className="mx-6 text-[10px] font-semibold uppercase tracking-[0.2em] sm:mx-8 sm:text-[11px] sm:tracking-[0.25em]"
          >
            {msg} <span className="mx-6 opacity-60">✦</span>
          </span>
        ))}
      </div>
    </a>
  );
}
