import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/mobility-class-lagos";

export const metadata: Metadata = {
  title: "Mobility Class in Lagos",
  description:
    "Mobility classes in Lagos for surfers, runners, cyclists and gym-goers. Improve range of motion, body awareness and recovery in an infrared heated studio.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Mobility Class in Lagos | Heat Lagos",
    description:
      "Mobility classes in Lagos: targeted joint and tissue work in an infrared heated studio. For surfers, runners, cyclists and active people.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Heat Mobility Class in Lagos",
  serviceType: "Mobility class in an infrared heated studio",
  description:
    "Targeted mobility class in Lagos focused on joint range of motion, tissue quality and body awareness. Suitable for active people, athletes and 50+ practitioners.",
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
        eyebrow="Mobility in Lagos"
        title="Mobility Class in Lagos"
        lede="A focused 45-minute class in a warm infrared studio for active people who want to move with more ease, feel less held back, and build genuine freedom in their body. Designed for surfers, runners, cyclists, gym-goers and 50+ practitioners across the western Algarve."
        heroImage="/Mobility.jpg"
        heroImageAlt="Heat Mobility class in Lagos"
        extras={
          <>
            <ClassPreview classes={["Heat Mobility", "Heat Recovery", "Heat Yin"]} />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>What Heat Mobility actually is</h2>
          <p>
            Heat Mobility is a structured 45-minute class that works
            systematically through joints and the tissue around them. Hips,
            shoulders, thoracic spine, ankles, wrists — we treat them as
            real working joints, not afterthoughts. The work is slow,
            deliberate and properly cued, which is what separates real
            mobility training from a few stretches at the end of a strength
            class.
          </p>
          <p>
            The infrared heat keeps the tissues warm throughout, which is
            critical for mobility work. Tight tissue does not respond well
            to cold rooms; it does respond to sustained warmth.
          </p>
        </section>

        <section>
          <h2>Why active people in the Algarve need mobility</h2>
          <ul>
            <li>
              <strong>Surfers.</strong> Hours paddling and popping up build
              chronic shoulder, hip and thoracic restriction. Mobility
              undoes that pattern and protects the body for more sessions.
            </li>
            <li>
              <strong>Runners.</strong> Repetitive impact narrows the hips,
              ankles and calves over time. Mobility restores range without
              the pounding.
            </li>
            <li>
              <strong>Cyclists.</strong> Long hours in a flexed position
              shorten the hip flexors and round the upper back. We work
              directly on those patterns.
            </li>
            <li>
              <strong>Gym-goers and BJJ athletes.</strong> If you train
              hard, you also need to recover hard. Mobility is one of the
              most efficient ways to do that without losing fitness.
            </li>
            <li>
              <strong>People over 50.</strong> Mobility is one of the
              biggest predictors of how well you move in your 60s and 70s.
              Doing it once or twice a week now pays off for decades.
            </li>
          </ul>
        </section>

        <section>
          <h2>The independence philosophy</h2>
          <p>
            One thing matters more to us than anything else: we want our
            members to become more independent over time, not more
            dependent on us. Mobility is the clearest place this shows up.
            You leave class with a better understanding of your own
            shoulders, hips and spine, and you can use that understanding
            anywhere — at home, on the road, on the beach. The goal is for
            you to know your body, not need us to fix it.
          </p>
        </section>

        <section>
          <h2>How mobility fits into your week</h2>
          <p>
            Most members combine Heat Mobility with one harder class
            (Pilates, Sculpt or Power) and one fully restorative class
            (Heat Recovery or Heat Yin). That gives you strength, mobility
            and rest in a single week, which is exactly the structure
            active bodies thrive on.
          </p>
          <p>
            If you only have time for one Heat class per week, mobility is
            often the highest-value choice. It does not replace strength
            training, but it makes everything else you do safer and more
            effective.
          </p>
        </section>

        <section>
          <h2>What to expect in your first class</h2>
          <ul>
            <li>
              Around 30°C in the room, warm and breathable from the start.
            </li>
            <li>
              Slow, methodical sequences targeting one or two areas of the
              body per class.
            </li>
            <li>
              Breath-led pacing — no rushing, no chasing reps.
            </li>
            <li>
              Clear English instruction with options for different levels.
            </li>
            <li>
              Mats and props provided. Bring water and clothes you can move
              in.
            </li>
          </ul>
        </section>

        <section>
          <h2>Where we are</h2>
          <p>
            The studio is in central Lagos on Avenida dos Descobrimentos,
            close to the marina. From the surrounding area: Luz 12-13 min,
            Burgau 15-16 min, Portimão 19-23 min by car.
          </p>
        </section>

        <section>
          <h2>How to start</h2>
          <p>
            The 2-week Intro Offer covers every class on the schedule, so
            you can do two or three mobility sessions plus a Pilates and a
            recovery class in the same fortnight. Visiting Lagos? The
            7-day Vacation Week pass works for shorter trips. Or take a
            single drop-in.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
