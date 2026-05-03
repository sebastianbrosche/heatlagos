import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/muscle-recovery-surfing-lagos";

export const metadata: Metadata = {
  title: "Muscle Recovery for Surfers in Lagos",
  description:
    "Recover after surf, run, cycle or BJJ with guided mobility, yin and heated recovery classes in Lagos. Built for active people across the western Algarve.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Muscle Recovery for Surfers in Lagos | Heat Lagos",
    description:
      "Heated recovery, mobility and yin classes in Lagos for surfers, runners, cyclists and BJJ athletes. Move and feel better between sessions.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Muscle Recovery and Mobility Classes for Active People",
  serviceType: "Recovery, mobility and yin classes in an infrared heated studio",
  description:
    "Guided mobility, yin and heated recovery classes in Lagos designed for surfers, runners, cyclists, BJJ athletes and gym-goers. Recover better between training sessions.",
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
        eyebrow="Recovery for athletes"
        title="Muscle Recovery for Surfers in Lagos"
        lede="An infrared studio in central Lagos built for the way active people in the Algarve actually live, between surf sessions, training rides, long runs and gym days. Heat Mobility, Heat Recovery and Heat Yin are the three classes you will keep coming back to."
        heroImage="/Recovery.jpg"
        heroImageAlt="Heat Recovery class in Lagos"
        extras={
          <>
            <ClassPreview classes={["Heat Mobility", "Heat Recovery", "Heat Yin"]} />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>The recovery problem most surfers and athletes have</h2>
          <p>
            If you live in the Algarve, you probably train hard. Lagos is a
            surf town. There are runners on the cliff path every morning,
            cyclists on the back roads, BJJ rooms in town and a serious
            gym scene. Most of the people we meet are right on the edge of
            doing too much. Recovery is the missing piece, not another
            workout.
          </p>
          <p>
            Most cold yoga or stretching does not solve it. The tissue
            stays tight, the nervous system stays switched on, and the
            next session starts from a worse baseline than the last. Heat
            Lagos exists to change that pattern.
          </p>
        </section>

        <section>
          <h2>Three classes built for recovery</h2>
          <ul>
            <li>
              <strong>Heat Mobility (45 min).</strong> Targeted, structured
              joint and tissue work. The class to take after a heavy surf
              week, before a race, or when something feels stuck.
            </li>
            <li>
              <strong>Heat Recovery (45 min).</strong> A blend of mobility,
              breathwork, long yin holds and guided rest. Designed to bring
              the nervous system down a gear and let the body actually
              repair.
            </li>
            <li>
              <strong>Heat Yin (60 min).</strong> Long, still holds in a
              warm room. The deepest reset on the schedule. Once a week
              changes how the rest of your training feels.
            </li>
          </ul>
        </section>

        <section>
          <h2>Why infrared makes a real difference for recovery</h2>
          <p>
            Tight tissue does not lengthen well in cold rooms. Long yin
            holds and patient mobility work need warmth that lasts the
            whole class. Infrared heat at around 30°C warms the body
            steadily without forcing humid hot air into your lungs. The
            tissues stay pliable, breathing stays comfortable, and the
            slow work feels productive instead of uncomfortable.
          </p>
        </section>

        <section>
          <h2>Built for the active community in Lagos</h2>
          <ul>
            <li>
              <strong>Surfers.</strong> Tight thoracic spine, locked-up
              hips, chronic shoulder restriction. All classic patterns
              from too much paddling. Mobility and recovery undo them.
            </li>
            <li>
              <strong>Runners.</strong> Calves, hamstrings, hip flexors and
              feet take the load. Heat Yin and Heat Recovery bring real
              relief.
            </li>
            <li>
              <strong>Cyclists.</strong> Long flexed positions shorten the
              front of the body. Mobility opens it back up so the next
              ride feels different.
            </li>
            <li>
              <strong>BJJ athletes.</strong> Hips, neck, shoulders. Recovery
              and yin are the missing piece for most rolling-heavy weeks.
            </li>
            <li>
              <strong>Gym-goers.</strong> If you train heavy, you should
              recover heavy too. One mobility session and one recovery
              session a week change everything.
            </li>
          </ul>
        </section>

        <section>
          <h2>How to use Heat as part of your training week</h2>
          <p>
            A typical training week for an active member looks something
            like this: one Heat Pilates or Heat Sculpt for strength, one
            Heat Mobility for joint health, one Heat Recovery or Heat Yin
            for full reset. Add your own surf, run, ride or gym days
            around it. The studio is designed to be the anchor, not the
            whole programme.
          </p>
        </section>

        <section>
          <h2>Practical info</h2>
          <ul>
            <li>
              <strong>Where:</strong> central Lagos on Avenida dos
              Descobrimentos. 12-13 min from Luz, 15-16 min from Burgau,
              19-23 min from Portimão.
            </li>
            <li>
              <strong>Studio:</strong> infrared heated to around 30°C,
              lower humidity than traditional hot yoga.
            </li>
            <li>
              <strong>Bring:</strong> water and clothes you can move in.
              Mats, props and weights are provided.
            </li>
            <li>
              <strong>Language:</strong> all classes in English.
            </li>
          </ul>
        </section>

        <section>
          <h2>How to start</h2>
          <p>
            The 2-week Intro Offer covers every class, so you can stack
            two mobility sessions, a recovery class and a yin class inside
            the same fortnight and feel what changes. Visiting? The 7-day
            Vacation Week pass is built for that. Or take a single drop-in
            after a long surf and see how the body feels afterwards.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
