const BRING = [
  "A water bottle. We recommend arriving well hydrated",
  "Comfortable, lightweight clothes you can move and sweat in",
  "A towel to put over your mat for hygienic purposes. We will offer rental towels and towels for sale from July 1",
  "That's it. We have mats, props, and all the equipment you need",
];

const KNOW = [
  "The studio is heated to 30°C",
  "We provide small towels for class",
  "No locker rooms or showers, but a bathroom is available for changing",
  "Arrive no later than 5 minutes before class. Coming 15 minutes early lets you settle, meet us, and find your spot",
  "The studio doors close when class starts, so please be on time",
];

export default function BeforeYouCome() {
  return (
    <section
      id="before-you-come"
      className="relative px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex flex-col items-start gap-4 sm:mb-16">
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-5xl lg:text-6xl">
            Before you
            <br />
            <em className="text-brand">come.</em>
          </h2>
          <p className="text-foreground/70">
            A few things worth knowing.
          </p>
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          <InfoCard title="What to bring" items={BRING} />
          <InfoCard title="Good to know" items={KNOW} />
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-stone-dark/60 p-7 ring-1 ring-white/5 sm:p-8">
      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand sm:text-[11px]">
        {title}
      </p>
      <ul className="flex flex-col gap-3 text-foreground/85">
        {items.map((item) => (
          <li key={item} className="flex gap-3 leading-relaxed">
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
