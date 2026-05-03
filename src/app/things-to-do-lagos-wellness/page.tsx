import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import Schedule from "@/components/Schedule";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/things-to-do-lagos-wellness";

export const metadata: Metadata = {
  title: "Wellness Things to Do in Lagos, Portugal",
  description:
    "Healthy things to do in Lagos: Pilates, yoga, mobility and recovery classes near the beach. English-speaking infrared studio for a stronger, calmer Algarve stay.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Wellness Things to Do in Lagos, Portugal | Heat Lagos",
    description:
      "Wellness in Lagos: Pilates, yoga, mobility and recovery in an infrared studio near the beach. English-speaking and welcoming for visitors.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Wellness Classes for Visitors and Residents in Lagos",
  serviceType:
    "Pilates, yoga, mobility and recovery classes for travellers and locals",
  description:
    "Drop-in and short-term wellness classes in Lagos for visitors, expats and residents. Infrared heated studio near the beach with classes in English.",
  url: URL,
  provider: { "@id": STUDIO_ID },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "Place", name: "Praia da Luz" },
    { "@type": "Place", name: "Burgau" },
    { "@type": "City", name: "Portimão" },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <SeoPageShell
        eyebrow="Wellness in Lagos"
        title="Wellness Things to Do in Lagos, Portugal"
        lede="If you are visiting Lagos for a week, a month or a season — or you have just moved here — this is a short, honest guide to building a wellness routine that actually fits the place. Centred on Heat Lagos, our infrared studio in the centre of town, with classes for every kind of active body."
        heroImage="/DSC07963.JPG"
        heroImageAlt="Heat Lagos studio detail"
        extras={
          <>
            <ClassPreview
              classes={[
                "Heat Pilates",
                "Heat Flow",
                "Heat Mobility",
                "Heat Recovery",
              ]}
            />
            <Schedule hideHeading />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>What wellness in Lagos actually looks like</h2>
          <p>
            Lagos is an outdoor town. Most days you can walk to the cliffs
            at Ponta da Piedade, swim before breakfast, surf at Praia do
            Canavial, run along the coast or rent a bike and head west to
            Sagres. None of that needs an introduction. What is harder to
            find is the indoor side of a healthy stay — somewhere to
            recover, build strength, sleep better and reset the nervous
            system in between all the outdoor things.
          </p>
          <p>
            That is what we built Heat Lagos for. A boutique infrared
            studio in the centre of town where you can drop in for a
            single class, or build a real routine if you are staying
            longer.
          </p>
        </section>

        <section>
          <h2>A simple wellness routine for a week in Lagos</h2>
          <ul>
            <li>
              <strong>Day 1 — settle in.</strong> Heat Flow (60 min) to
              undo the travel, wake up the body, find the breath again.
            </li>
            <li>
              <strong>Day 2 — get strong.</strong> Heat Pilates or Heat
              Sculpt to load the body in a controlled, productive way.
            </li>
            <li>
              <strong>Day 3 — outside.</strong> Surf, run or hike Ponta da
              Piedade. No studio.
            </li>
            <li>
              <strong>Day 4 — undo it.</strong> Heat Mobility (45 min) to
              give the joints a proper reset.
            </li>
            <li>
              <strong>Day 5 — challenge.</strong> Heat Power, then a slow
              afternoon and a long dinner.
            </li>
            <li>
              <strong>Day 6 — outside again.</strong> A second surf, a
              bike ride or a beach day.
            </li>
            <li>
              <strong>Day 7 — reset.</strong> Heat Yin or Heat Recovery to
              leave Lagos lighter than you arrived.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why Heat Lagos works for visitors</h2>
          <ul>
            <li>
              <strong>English in every class.</strong> No translating cues,
              no figuring out vocabulary. You walk in and the class starts.
            </li>
            <li>
              <strong>Wide spectrum, one studio.</strong> Strength,
              mobility, flow, power, yin and recovery on the same schedule
              means you can match the class to your body that day.
            </li>
            <li>
              <strong>Designed for active visitors.</strong> Surfers,
              runners, cyclists and gym-goers come in tired and leave
              moving better. We know the brief.
            </li>
            <li>
              <strong>Convenient passes.</strong> Single drop-in, 7-day
              Vacation Week, 10-class pack and the 2-week Intro Offer all
              fit different trip lengths.
            </li>
          </ul>
        </section>

        <section>
          <h2>For longer stays and new residents</h2>
          <p>
            If you are staying in the Algarve for the season, or you have
            just moved here, the Summer Membership and the monthly options
            are built for that. Most members combine two or three classes
            a week with their other activities — surf in the morning,
            recovery in the evening, mobility on the day off. The point is
            to build something sustainable, not to chase a programme.
          </p>
          <p>
            One thing we hold to: we want our members to become more
            independent over time, not more dependent on us. The longer
            you train with us, the better you should know your own body.
          </p>
        </section>

        <section>
          <h2>Where to find us</h2>
          <p>
            The studio is at Edificio da Fabrica da Ribeira, Av. dos
            Descobrimentos, Loja G, 8600-854 Lagos — a short walk from the
            marina and the historic centre. Easy parking on the avenida.
            From the surrounding area: Luz 12-13 min, Burgau 15-16 min,
            Portimão 19-23 min by car.
          </p>
        </section>

        <section>
          <h2>How to begin</h2>
          <p>
            Take a single drop-in class to see if Heat fits how you like
            to train, or buy the Vacation Week if you are here for seven
            days or less. Staying longer? The 2-week Intro Offer is the
            best value introduction we offer, with unlimited access to
            every class on the schedule.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
