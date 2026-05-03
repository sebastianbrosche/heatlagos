import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import Schedule from "@/components/Schedule";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/yoga-lagos-portugal";

export const metadata: Metadata = {
  title: "Yoga in Lagos, Portugal",
  description:
    "Heated flow, power and yin yoga in Lagos. English-speaking classes for locals, expats and active travellers across the western Algarve.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Yoga in Lagos, Portugal | Heat Lagos",
    description:
      "Heated yoga in Lagos: Flow, Power and Yin in an infrared studio. English-speaking classes for the western Algarve.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Heated Yoga in Lagos",
  serviceType: "Heated yoga (Flow, Power, Yin) in an infrared studio",
  description:
    "Heated Flow, Power and Yin yoga in Lagos, Portugal. Infrared studio, English-speaking instruction, classes for every level.",
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
        eyebrow="Yoga in Lagos"
        title="Yoga in Lagos, Portugal"
        lede="Heated Flow, Power and Yin yoga in a boutique infrared studio in the centre of Lagos. English-speaking classes from breath-led flow to long, still yin holds — for locals, expats and active travellers across the western Algarve."
        heroImage="/Flow.jpg"
        heroImageAlt="Heated yoga flow class in Lagos"
        extras={
          <>
            <ClassPreview
              eyebrow="The yoga schedule"
              heading="From flow to stillness."
              subheading="Four heated yoga classes covering the whole spectrum — choose by how your body feels that day."
              classes={["Heat Flow", "Heat Power", "Heat Yin", "Heat Recovery"]}
            />
            <Schedule />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>The four yoga classes on our schedule</h2>
          <ul>
            <li>
              <strong>Heat Flow (60 min).</strong> Creative, breath-led
              sequences in a warm room. Fluid, grounding and built so you
              can actually settle into the practice instead of chasing the
              next pose.
            </li>
            <li>
              <strong>Heat Power (60 min).</strong> Physically demanding
              heated yoga that meets you where you are. Strong, simple,
              breath-led — the kind of class that takes you somewhere in
              yourself you did not expect.
            </li>
            <li>
              <strong>Heat Yin (60 min).</strong> Long, still holds that
              reach the deeper layers of the body. Meditative, unhurried
              and quietly profound. A real reason to slow down.
            </li>
            <li>
              <strong>Heat Recovery (45 min).</strong> A blend of mobility,
              breathwork, long yin holds and guided rest. Restorative work
              for active bodies and stretched minds.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why heated yoga, and why infrared</h2>
          <p>
            Heated yoga makes the body more pliable, helps the breath
            settle and adds a quiet layer of intensity that turns even a
            slow class into something you feel. Infrared heat at around
            30°C is gentler than traditional hot yoga at 40°C+, with lower
            humidity. You sweat, you get warm, you find depth — but you do
            not gasp or feel cooked.
          </p>
          <p>
            For long yin holds in particular, infrared makes a real
            difference. The tissues warm gradually and stay warm through
            the long pauses, so the holds feel productive instead of
            uncomfortable.
          </p>
        </section>

        <section>
          <h2>Who our yoga classes are for</h2>
          <ul>
            <li>
              <strong>Active people who need balance.</strong> Surfers,
              runners, cyclists and gym-goers use Heat Flow and Heat Yin to
              undo the tightness that comes with their main sport.
            </li>
            <li>
              <strong>People building a long-term routine.</strong> If you
              are over 50 and want a sustainable practice with real
              instruction, Heat Flow and Heat Yin are excellent regular
              choices, ideally combined with Heat Mobility.
            </li>
            <li>
              <strong>Busy minds.</strong> Heat Power and Heat Yin both
              cut through stress in different ways — one through hard work
              and breath, the other through stillness.
            </li>
            <li>
              <strong>Travellers.</strong> If you are visiting Lagos for a
              week or a month, our drop-in and Vacation Week pass make it
              easy to fit yoga into the trip.
            </li>
          </ul>
        </section>

        <section>
          <h2>Beginners are welcome</h2>
          <p>
            You do not need to be flexible. You do not need experience.
            Every class offers options for different levels, and our
            teachers cue clearly so you always know what to do. If you are
            unsure where to start, take Heat Flow first. From there, you
            will know whether you want more intensity (Heat Power) or
            more stillness (Heat Yin).
          </p>
        </section>

        <section>
          <h2>English-speaking studio for the international community</h2>
          <p>
            All classes are taught in English. Our community already
            includes Swedish, British, German, Dutch and Portuguese
            members. If English is your first or your second language, you
            will feel at home here.
          </p>
        </section>

        <section>
          <h2>Where we are and how to reach us</h2>
          <p>
            Heat Lagos is on Avenida dos Descobrimentos in central Lagos,
            close to the marina and the historic old town. We are within
            an easy drive of most of the western Algarve:
          </p>
          <ul>
            <li>Praia da Luz — about 12-13 minutes</li>
            <li>Burgau — about 15-16 minutes</li>
            <li>Portimão — about 19-23 minutes depending on route</li>
          </ul>
        </section>

        <section>
          <h2>How to start practising yoga with us</h2>
          <p>
            The 2-week Intro Offer is the simplest way in. It includes
            every class on the schedule, so you can try Flow, Power and
            Yin in the same fortnight and decide what works. If you are
            visiting, take a single drop-in or the 7-day Vacation Week
            pass. If yoga is already part of your life, the monthly or
            yearly memberships make it the easiest part of your week.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
