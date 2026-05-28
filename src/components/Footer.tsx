const EXPLORE_LINKS: Array<{ href: string; label: string }> = [
  { href: "/infrared-classes-lagos", label: "Infrared classes in Lagos" },
  { href: "/pilates-lagos-portugal", label: "Pilates in Lagos" },
  { href: "/yoga-lagos-portugal", label: "Yoga in Lagos" },
  { href: "/mobility-class-lagos", label: "Mobility class in Lagos" },
  {
    href: "/muscle-recovery-surfing-lagos",
    label: "Muscle recovery for surfers",
  },
  {
    href: "/things-to-do-lagos-wellness",
    label: "Wellness things to do in Lagos",
  },
  { href: "/why-infrared", label: "Why infrared? The science" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-stone-dark/40 px-6 py-16 lg:px-20">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-4">
        <div>
          <div className="flex items-center leading-none">
            <img src="/logo%20heat.png?v=1" alt="Heat" className="h-20 w-auto" />
          </div>
          <p className="mt-6 max-w-xs text-sm text-foreground/70">
            Infrared heated Pilates, Yoga & Sculpt · Mobility, Recovery & Yin —
            in Lagos, Portugal.
          </p>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
            Studio
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a href="/#classes" className="hover:text-brand">
                Classes
              </a>
            </li>
            <li>
              <a href="/#teachers" className="hover:text-brand">
                Teachers
              </a>
            </li>
            <li>
              <a href="/#book" className="hover:text-brand">
                Schedule
              </a>
            </li>
            <li>
              <a href="/#memberships" className="hover:text-brand">
                Memberships
              </a>
            </li>
            <li>
              <a href="/#workshops" className="hover:text-brand">
                Workshops
              </a>
            </li>
            <li id="training" className="text-foreground/50">
              Teacher Trainings — coming soon
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
            Contact
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a href="mailto:hello@heatlagos.com" className="hover:text-brand">
                hello@heatlagos.com
              </a>
            </li>
            <li>
              <a href="tel:+351927290812" className="hover:text-brand">
                +351 927 290 812
              </a>
            </li>
            <li>
              <a
                href="https://maps.app.goo.gl/XshkRJWAZpEs5gWw8"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-brand"
              >
                Edificio da Fabrica da Ribeira,
                <br />
                Av. dos Descobrimentos, Loja G,
                <br />
                8600-854 Lagos, Portugal
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
            Follow
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm">
            <li>
              <a
                href="https://www.instagram.com/heat_lagos/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61588436283019"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1400px] border-t border-white/5 pt-10">
        <p className="text-[11px] uppercase tracking-[0.25em] text-stone">
          Explore
        </p>
        <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-foreground/65 sm:grid-cols-2 lg:grid-cols-3">
          {EXPLORE_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-brand">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 flex max-w-[1400px] flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-[11px] uppercase tracking-[0.2em] text-stone sm:flex-row">
        <span>© Heat Lagos v30</span>
        <span>Movement is life.</span>
      </div>
    </footer>
  );
}
