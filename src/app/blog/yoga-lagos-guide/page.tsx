import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";

const URL = "https://www.heatlagos.com/blog/yoga-lagos-guide";

export const metadata: Metadata = {
  title: "The Complete Guide to Yoga in Lagos, Portugal (2026)",
  description:
    "An honest guide to every yoga studio in Lagos, Portugal. What each offers, who each is for, and how to find the right class for your body and your schedule.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "The Complete Guide to Yoga in Lagos, Portugal (2026) | Heat Lagos",
    description:
      "An honest breakdown of yoga studios in Lagos. Find the right class for your body and your schedule.",
  },
};

export default function YogaLagosGuide() {
  return (
    <SeoPageShell
      eyebrow="Lagos Guide"
      title="The Complete Guide to Yoga in Lagos, Portugal (2026)"
      lede="An honest breakdown of every yoga studio in Lagos, what they offer, and how to find the right class for your body and your schedule."
    >
      <section>
        <h2>Yoga in Lagos: what the scene actually looks like</h2>
        <p>
          Lagos is not a big city. It is a surf town on the western Algarve with
          a small but serious yoga community. Most studios sit in or near the old
          town centre, within a few minutes' walk of each other. Classes run in
          English because the student base is international — Portuguese,
          British, Swedish, German, Dutch, and a rotating cast of visitors who
          stay for a week or a season.
        </p>
        <p>
          What makes Lagos different from Lisbon or Porto is that most people
          here are active. They surf, they run the cliff paths, they cycle the
          back roads. Yoga is not the main event. It is the recovery, the
          balance, and the thing that keeps everything else sustainable. That
          changes what studios prioritise and what you should expect.
        </p>
      </section>

      <section>
        <h2>The studios: who they are and what they do</h2>

        <h3>
          <a href="https://heatlagos.com" target="_blank" rel="noopener noreferrer">
            Heat Lagos
          </a>{" "}
          — infrared-heated Pilates, Yoga, Sculpt & Recovery
        </h3>
        <p>
          <strong>What makes it different:</strong> Heat Lagos is the only
          infrared-heated studio in Lagos. Classes run at around 30°C — warm
          enough to deepen the practice without the oppressive humidity of
          traditional hot yoga at 40°C. The heat comes from infrared panels that
          warm the body directly, not forced air that dries out your throat.
        </p>
        <p>
          <strong>Class types:</strong> Heat Flow (heated Vinyasa), Heat Power
          (demanding heated yoga), Heat Yin (long still holds in the warmth),
          Heat Pilates, Heat Sculpt, Heat Mobility and Heat Recovery.
        </p>
        <p>
          <strong>Who it is for:</strong> People who want to sweat, build
          strength, and recover properly. Surfers, runners, cyclists and
          gym-goers use Heat Lagos as their balance. Complete beginners are
          welcome — the teachers cue clearly and offer options for every level.
        </p>
        <p>
          <strong>Price:</strong> Intro Offer €79 for 2 weeks unlimited. Drop-in
          €22. Vacation Week €59 for 7 days. Monthly memberships from €125.
        </p>
        <p>
          <strong>Language:</strong> English in every class.
        </p>

        <h3>
          <a href="https://inlight.pt" target="_blank" rel="noopener noreferrer">
            InLight Studio
          </a>{" "}
          — established Vinyasa, Hatha, Rocket & Ashtanga
        </h3>
        <p>
          <strong>What makes it different:</strong> InLight is the longest-running
          studio in Lagos old town. Bright, spacious, and well-established with
          a full daily schedule.
        </p>
        <p>
          <strong>Class types:</strong> Vinyasa, Hatha, Yin, Rocket Yoga, Ashtanga.
        </p>
        <p>
          <strong>Who it is for:</strong> Students who want traditional styles in a
          classic yoga studio environment. Good for travellers who want a drop-in
          class without committing to a heated format.
        </p>

        <h3>
          <a href="https://algarve-alchemy.com" target="_blank" rel="noopener noreferrer">
            Algarve Alchemy
          </a>{" "}
          — yoga, pilates, sauna & ice bath
        </h3>
        <p>
          <strong>What makes it different:</strong> Alchemy combines yoga and
          pilates with contrast therapy — infrared sauna and ice bath. The space
          is sunlit and above Black & White Cafe in the old town.
        </p>
        <p>
          <strong>Class types:</strong> Yoga, pilates, special events, coworking,
          contrast journeys.
        </p>
        <p>
          <strong>Who it is for:</strong> People who want wellness as a full
          experience, not just a class. The contrast therapy makes it a
          destination rather than a quick stop.
        </p>

        <h3>Soluna Space Lagos — wellness, yoga & creative events</h3>
        <p>
          <strong>What makes it different:</strong> Soluna is a wellness and events
          space that hires out its two studios for yoga, movement, therapies, and
          creative events. It is less a fixed yoga studio and more a platform for
          rotating teachers and formats.
        </p>
        <p>
          <strong>Class types:</strong> Rotating schedule of yoga, movement,
          workshops, and holistic therapies.
        </p>
        <p>
          <strong>Who it is for:</strong> Students who want variety and are happy
          to check the schedule week by week. Good for workshops and one-off
          events.
        </p>

        <h3>
          <a href="https://inharmony-centre.com" target="_blank" rel="noopener noreferrer">
            In Harmony Centre
          </a>{" "}
          — integrative health near the marina
        </h3>
        <p>
          <strong>What makes it different:</strong> In Harmony is a full
          integrative health centre close to Lagos Marina. It offers pregnancy
          yoga alongside regular classes and personal development workshops.
        </p>
        <p>
          <strong>Class types:</strong> Yoga including pregnancy yoga, personal
          development workshops.
        </p>
        <p>
          <strong>Price:</strong> Drop-in yoga classes €15.
        </p>
        <p>
          <strong>Who it is for:</strong> People who want health services
          alongside yoga. Good for prenatal students and those interested in
          integrative wellness.
        </p>

        <h3>
          <a href="https://instagram.com/le_dome_yoga" target="_blank" rel="noopener noreferrer">
            Le Dome
          </a>{" "}
          — Vinyasa, Yin, Hatha & pilates in English and French
        </h3>
        <p>
          <strong>What makes it different:</strong> Le Dome offers classes in
          English and French, making it a natural fit for the large French
          community in the Algarve.
        </p>
        <p>
          <strong>Class types:</strong> Vinyasa, Yin, Hatha yoga, pilates.
        </p>
        <p>
          <strong>Price:</strong> Drop-in €14. Multiple class passes available.
        </p>
        <p>
          <strong>Who it is for:</strong> French speakers and those who want a
          bilingual teaching environment.
        </p>

        <h3>The Movement Lab — yoga, pilates & contemporary dance</h3>
        <p>
          <strong>What makes it different:</strong> The Movement Lab brings a
          dance and movement perspective to yoga and pilates, with contemporary
          and urban dance classes on the schedule too.
        </p>
        <p>
          <strong>Class types:</strong> Yoga, pilates, contemporary dance, urban
          dance.
        </p>
        <p>
          <strong>Price:</strong> Drop-in classes from €12. 10-class cards
          available.
        </p>
        <p>
          <strong>Who it is for:</strong> Students who want cross-training
          between yoga, pilates, and dance.
        </p>
      </section>

      <section>
        <h2>How to choose: a simple framework</h2>
        <p>
          <strong>If you want heat and intensity:</strong> Heat Lagos. Infrared
          heated classes, strength-focused formats, and a recovery-first approach
          to active bodies.
        </p>
        <p>
          <strong>If you want traditional styles in a classic studio:</strong>{" "}
          InLight Studio. Established schedule, experienced teachers, no heat.
        </p>
        <p>
          <strong>If you want wellness as an experience:</strong> Algarve
          Alchemy. Yoga plus sauna and ice bath in a beautiful space.
        </p>
        <p>
          <strong>If you want variety and workshops:</strong> Soluna Space.
          Rotating teachers and formats, event-focused.
        </p>
        <p>
          <strong>If you want integrative health services:</strong> In Harmony
          Centre. Pregnancy yoga, therapies, and personal development.
        </p>
        <p>
          <strong>If you want bilingual classes (English/French):</strong> Le
          Dome. Strong French community connection.
        </p>
        <p>
          <strong>If you want dance alongside yoga:</strong> The Movement Lab.
          Contemporary and urban dance on the same schedule.
        </p>
      </section>

      <section>
        <h2>For travellers: what you need to know</h2>
        <p>
          Most Lagos studios welcome drop-ins. Heat Lagos offers a 7-day
          Vacation Week pass for €59 — unlimited classes for a full week — plus
          single drop-ins at €22. InLight, Le Dome, and In Harmony all offer
          single class options.
        </p>
        <p>
          All studios listed here teach in English. Some (Le Dome) also teach
          in French. You do not need to speak Portuguese to attend any class in
          Lagos.
        </p>
        <p>
          If you are visiting for surf, running, or hiking, consider pairing
          your activity with recovery. A hard surf morning followed by a yin or
          mobility class in the evening is the difference between waking up
          stiff and waking up ready for the next session.
        </p>
      </section>

      <section>
        <h2>For new residents: building a routine</h2>
        <p>
          If you have just moved to Lagos or the western Algarve, the best
          approach is to try 2-3 studios in your first two weeks. Most offer
          intro deals that make this affordable. Once you find the teachers and
          formats that fit your body, commit to a monthly membership.
        </p>
        <p>
          Lagos is small. You will see the same faces in different studios. The
          community is friendly and unpretentious. Show up, do the work, and
          you will be welcomed.
        </p>
      </section>
    </SeoPageShell>
  );
}
