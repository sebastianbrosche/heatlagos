type ClassItem = {
  name: string;
  duration: string;
  description: string;
  image: string;
};

const ALL_CLASSES: Record<string, ClassItem> = {
  "Heat Pilates": {
    name: "Heat Pilates",
    duration: "50 min",
    description:
      "Slow, precise mat work that builds deep strength and a body that feels more connected, more capable.",
    image: "/Pilates.jpg",
  },
  "Heat Sculpt": {
    name: "Heat Sculpt",
    duration: "50 min",
    description:
      "Weights, resistance and infrared heat. Full-body strength that tones and energises in equal measure.",
    image: "/Sculpt.jpg",
  },
  "Heat Power": {
    name: "Heat Power",
    duration: "60 min",
    description:
      "Physically demanding heated yoga that meets you where you are. Show up, move, breathe.",
    image: "/Power.jpg",
  },
  "Heat Flow": {
    name: "Heat Flow",
    duration: "60 min",
    description:
      "Creative, breath-led sequences. Warm, fluid, grounding — with space to actually feel the practice.",
    image: "/Flow.jpg",
  },
  "Heat Mobility": {
    name: "Heat Mobility",
    duration: "45 min",
    description:
      "Targeted joint and tissue work for anyone who wants to move with more ease and feel less held back.",
    image: "/Mobility.jpg",
  },
  "Heat Recovery": {
    name: "Heat Recovery",
    duration: "45 min",
    description:
      "Mobility, breathwork, long yin holds and guided rest layered into one truly restorative class.",
    image: "/Recovery.jpg",
  },
  "Heat Yin": {
    name: "Heat Yin",
    duration: "60 min",
    description:
      "Long, still holds that reach the deeper layers of the body. Meditative, unhurried, quietly profound.",
    image: "/DSC08021.JPG",
  },
};

type Props = {
  classes: string[];
};

export default function ClassPreview({ classes }: Props) {
  const items = classes
    .map((name) => ALL_CLASSES[name])
    .filter((c): c is ClassItem => Boolean(c));

  if (items.length === 0) return null;

  const gridCols =
    items.length === 1
      ? "sm:grid-cols-1"
      : items.length === 2
        ? "sm:grid-cols-2"
        : items.length === 3
          ? "sm:grid-cols-2 lg:grid-cols-3"
          : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-start gap-4 sm:mb-14">
          <p className="text-[11px] uppercase tracking-[0.3em] text-brand">
            Heat Schedule
          </p>
          <h2 className="font-serif text-4xl leading-tight sm:text-5xl lg:text-7xl">
            Find your class,
            <br />
            <em className="text-brand">book your mat.</em>
          </h2>
          <p className="mt-2 max-w-2xl text-foreground/70">
            Every class, every teacher — updated daily and bookable straight
            from this page.
          </p>
        </div>

        <div className={`grid gap-5 ${gridCols}`}>
          {items.map((item) => (
            <a
              key={item.name}
              href="/#classes"
              className="group flex flex-col overflow-hidden rounded-2xl bg-stone-dark/60 ring-1 ring-white/5 transition-transform hover:-translate-y-1 hover:ring-brand/40"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/90 via-stone-dark/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
                  <span className="font-serif text-2xl text-foreground drop-shadow-lg sm:text-3xl">
                    {item.name}
                  </span>
                  <span className="text-xl text-foreground/80 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
