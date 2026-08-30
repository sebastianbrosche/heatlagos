import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import TeachersStrip from "@/components/TeachersStrip";

const URL = "https://www.heatlagos.com/privates";

export const metadata: Metadata = {
  title: "HEAT Foundations - Private Intro Sessions | Heat Lagos",
  description:
    "A 3-session introductory course in Lagos for beginners and anyone returning to exercise. Learn Pilates, Sculpt and Yoga foundations with Sarah. Book as a private, duo or trio.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "website",
    url: URL,
    title: "HEAT Foundations | Heat Lagos",
    description:
      "Learn the basics. Build confidence. Feel ready for class. Three private intro sessions in Pilates, Sculpt and Yoga. Book as a private, duo or trio.",
  },
};

const BSPORT_PRIVATE =
  "https://backoffice.bsport.io/customer/payment/shop-item/470885/?membership=5821";
const BSPORT_DUO =
  "https://backoffice.bsport.io/customer/payment/shop-item/470886/?membership=5821";
const BSPORT_TRIO =
  "https://backoffice.bsport.io/customer/payment/shop-item/470887/?membership=5821";

function buyLinkProps(href: string) {
  const isHttp = href.startsWith("http://") || href.startsWith("https://");
  if (isHttp) {
    return { href, target: "_blank" as const, rel: "noopener noreferrer" };
  }
  return { href };
}

const OPTIONS = [
  {
    id: "bsport-private",
    name: "Private",
    price: "€249",
    perPerson: null,
    detail: "3 private sessions. One person.",
    href: BSPORT_PRIVATE,
  },
  {
    id: "bsport-duo",
    name: "Duo",
    price: "€330",
    perPerson: "€165 per person",
    detail: "3 sessions for two people.",
    href: BSPORT_DUO,
  },
  {
    id: "bsport-trio",
    name: "Trio",
    price: "€390",
    perPerson: "€130 per person",
    detail: "3 sessions for three people.",
    href: BSPORT_TRIO,
  },
] as const;

const SESSIONS = [
  {
    n: "01",
    title: "Check and foundations",
    items: [
      "Goals",
      "Previous training",
      "Injuries or concerns",
      "Movement check",
      "Mobility, stability and core basics",
      "Fundamental movements",
    ],
  },
  {
    n: "02",
    title: "Learn and practice",
    items: [
      "Pilates, Sculpt and Yoga foundations",
      "Common HEAT class movements",
      "Technique and alignment",
      "Breathing and core",
      "Individual modifications",
    ],
  },
  {
    n: "03",
    title: "Flow and confidence",
    items: [
      "Combine into a workout flow",
      "Transitions",
      "The feeling of a HEAT class",
      "Confidence and independence",
      "Personal recommendation for which HEAT classes to join next",
    ],
  },
];

const WHO = [
  "Complete beginners",
  "Returning after a longer break",
  "Not ready for a group class yet",
  "Want technique and movement basics",
  "Want individual guidance first",
];

export default function Page() {
  return (
    <>
      <Header />
      <Marquee />

      <main className="relative overflow-hidden pt-32 sm:pt-40">
        <div className="absolute top-1/4 -left-20 -z-10 h-96 w-96 rounded-full bg-brand/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 -z-10 h-96 w-96 rounded-full bg-brand-soft/5 blur-3xl" />

        <section className="px-5 py-12 text-center sm:px-6 lg:px-20 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs uppercase tracking-[0.3em] text-brand">
              HEAT Foundations
            </span>
            <h1 className="mt-4 font-serif text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[4.5rem]">
              Learn the basics. Build confidence. Feel ready for class.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm uppercase tracking-[0.2em] text-foreground/60">
              Proposed start 15 September 2026
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {OPTIONS.map((option) => (
              <div
                key={option.id}
                id={option.id}
                className="relative flex flex-col rounded-3xl border border-white/10 bg-stone-dark/40 p-8 text-left shadow-2xl backdrop-blur-md"
              >
                <span className="rounded-full bg-brand/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand self-start">
                  {option.name}
                </span>
                <div className="my-6">
                  <span className="font-serif text-5xl font-light text-brand">
                    {option.price}
                  </span>
                  {option.perPerson && (
                    <span className="mt-1 block text-sm text-foreground/50">
                      {option.perPerson}
                    </span>
                  )}
                </div>
                <p className="mb-8 text-sm text-foreground/80 leading-relaxed">
                  {option.detail}
                </p>
                <a
                  {...buyLinkProps(option.href)}
                  className="mt-auto block w-full rounded-full bg-brand py-4.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-stone-dark transition-all hover:bg-brand-soft hover:shadow-lg hover:shadow-brand/10"
                >
                  Buy
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">
              A 3-session introductory course
            </h2>
            <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            <p className="mt-8 text-base text-foreground/80 leading-relaxed sm:text-lg">
              HEAT Foundations is a 3-session introductory course for beginners,
              people returning to exercise after a break, or anyone who wants
              more individual guidance before joining regular HEAT classes. Learn
              the foundations of Pilates, Sculpt and Yoga, build confidence, and
              feel ready to join the HEAT community. Book privately, as a duo, or
              as a trio.
            </p>
          </div>
        </section>

        <section className="px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">
                The three sessions
              </h2>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {SESSIONS.map((session) => (
                <div
                  key={session.n}
                  className="rounded-3xl border border-white/5 bg-stone-dark/20 p-6 sm:p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-stone-dark text-sm font-bold text-brand">
                    {session.n}
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-foreground">
                    {session.title}
                  </h3>
                  <ul className="mt-5 space-y-3 text-sm text-foreground/80 leading-relaxed">
                    {session.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="font-bold text-brand">-</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="mx-auto mt-14 max-w-3xl text-center text-base text-foreground/80 leading-relaxed sm:text-lg">
              The goal is not to keep people in personal training. It is to help
              them become confident members of the HEAT community.
            </p>
          </div>
        </section>

        <section className="border-t border-white/5 bg-stone-dark/10 px-5 py-20 sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground">
                Who it is for
              </h2>
              <div className="mx-auto mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-stone/50 to-transparent" />
            </div>
            <ul className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
              {WHO.map((item) => (
                <li
                  key={item}
                  className="rounded-3xl border border-white/5 bg-stone-dark/20 px-5 py-4 text-sm text-foreground/80 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-5 py-20 text-center sm:px-6 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="font-serif text-3xl italic leading-snug text-foreground sm:text-4xl lg:text-5xl">
              From &quot;I&apos;m not ready&quot; to &quot;See you in class.&quot;
            </p>
            <p className="mt-8 text-sm uppercase tracking-[0.2em] text-foreground/60">
              Proposed start 15 September 2026
            </p>
          </div>
        </section>

        <TeachersStrip heading="Your teacher." teachers={["Sarah"]} />
      </main>

      <Footer />
    </>
  );
}
