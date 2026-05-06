type Teacher = {
  name: string;
  role: string;
  image: string;
  position: string;
};

const ALL_TEACHERS: Record<string, Teacher> = {
  Stine: {
    name: "Stine",
    role: "Founder · Flow, Power, Sculpt & Yin",
    image: "/Stine%20profilbilde.jpg",
    position: "70% 34%",
  },
  Sebastian: {
    name: "Sebastian",
    role: "Pilates, Power, Mobility & Recovery",
    image: "/Sebastian%20profilbilde.jpg",
    position: "center 25%",
  },
  Anastasiia: {
    name: "Anastasiia",
    role: "Sculpt & Mobility",
    image: "/Anastasiia%20profilbilde.jpg",
    position: "center 30%",
  },
  Agata: {
    name: "Agata",
    role: "Power",
    image: "/Agata%20profilbilde.jpg",
    position: "center 30%",
  },
};

type Props = {
  eyebrow?: string;
  heading: string;
  teachers: string[];
};

export default function TeachersStrip({
  eyebrow = "Heat Teachers",
  heading,
  teachers,
}: Props) {
  const items = teachers
    .map((name) => ALL_TEACHERS[name])
    .filter((t): t is Teacher => Boolean(t));

  if (items.length === 0) return null;

  return (
    <section className="px-5 py-20 sm:px-6 sm:py-24 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-start gap-3 sm:mb-14">
          <p className="text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            {eyebrow}
          </p>
          <h2 className="font-serif text-[2rem] leading-[1.1] sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
        </div>

        <div
          className={`grid gap-5 sm:gap-6 ${
            items.length === 2
              ? "sm:grid-cols-2"
              : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {items.map((t) => (
            <a
              key={t.name}
              href="/#teachers"
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10 transition-transform hover:-translate-y-1 hover:ring-brand/40"
            >
              <img
                src={t.image}
                alt={t.name}
                style={{ objectPosition: t.position }}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-dark/90 via-stone-dark/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                <span className="font-serif text-2xl text-foreground drop-shadow-lg sm:text-3xl">
                  {t.name}
                </span>
                <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-foreground/75">
                  {t.role}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
