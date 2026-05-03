import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/why-infrared";

export const metadata: Metadata = {
  title: "Why Infrared?",
  description:
    "What an infrared room actually does to a body — five real effects, with the evidence behind each. Flexibility, joints, cardio, recovery, nervous system. No detox myths.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Why Infrared? | Heat Lagos",
    description:
      "Five real effects of infrared yoga and pilates — with the evidence. Flexibility, joints, cardio, recovery, nervous system.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Infrared? Five Real Effects",
  description:
    "What an infrared room actually does to a body — flexibility, joints, cardiovascular load, recovery, nervous system. With the evidence behind each.",
  url: URL,
  mainEntityOfPage: URL,
  inLanguage: "en",
  author: { "@id": STUDIO_ID },
  publisher: { "@id": STUDIO_ID },
  image: "https://www.heatlagos.com/DSC07970.JPG",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <SeoPageShell
        eyebrow="Heat, honestly"
        title="Why Infrared?"
        lede="What an infrared room actually does to a body — five real effects, with the evidence behind each. No mysticism, no detox myths."
        heroImage="/DSC07970.JPG"
        heroImageAlt="Heat Lagos infrared studio"
      >
        <section>
          <h2>Your body warms up faster</h2>
          <ul>
            <li>
              Collagen and connective tissue get more pliable with heat —
              heated stretch produces more range of motion than stretch alone.
            </li>
            <li>
              Far-infrared reaches several centimetres into soft tissue.
              Fan-blown hot air mostly warms the skin.
            </li>
            <li>
              You find your hips, hamstrings and thoracic spine in five
              minutes instead of fifteen.
            </li>
          </ul>
        </section>

        <section>
          <h2>Joints feel better</h2>
          <ul>
            <li>
              Heat triggers vasodilation — more blood reaches the joint,
              inflammatory metabolites clear faster, protective muscle
              guarding relaxes.
            </li>
            <li>
              Clinical Rheumatology, 2009: a four-week course of infrared
              sessions cut pain and stiffness in patients with rheumatoid
              arthritis and ankylosing spondylitis. No flare-ups.
            </li>
            <li>
              Useful if you&apos;re over 40, carry training wear, or manage
              chronic stiffness.
            </li>
          </ul>
        </section>

        <section>
          <h2>A cardio bonus on top of the practice</h2>
          <ul>
            <li>
              Heart rate and peripheral circulation rise even before you
              start moving.
            </li>
            <li>
              Same family of effects as moderate aerobic exercise — which is
              why Japanese cardiologists prescribe far-infrared (Waon
              therapy) to heart-failure patients.
            </li>
            <li>
              Doesn&apos;t replace cardio. Stacks measurable cardiovascular
              load onto a practice that, in a cold room, has very little.
            </li>
          </ul>
        </section>

        <section>
          <h2>Faster recovery</h2>
          <ul>
            <li>
              Heat exposure raises HSP70, a heat-shock protein that helps
              cells repair after physical stress.
            </li>
            <li>
              2022 study on elite footballers: far-infrared cut peak DOMS by
              roughly 60% and brought athletes back to baseline 1-3 days
              faster.
            </li>
            <li>
              Two sessions a week works as active recovery for harder training
              outside the studio — surf, gym, running, BJJ, climbing.
            </li>
          </ul>
        </section>

        <section>
          <h2>The nervous system shifts</h2>
          <ul>
            <li>
              Heat exposure influences serotonin, BDNF and cortisol — the
              same systems SSRIs target, plus the stress hormone.
            </li>
            <li>
              A 2016 JAMA Psychiatry trial showed a single hyperthermia
              session produced measurable mood improvements lasting up to
              six weeks.
            </li>
            <li>
              You don&apos;t need to be clinically anything to feel it. Stress,
              sleep and low-grade anxiety all respond.
            </li>
          </ul>
        </section>

        <section>
          <h2>What we don&apos;t claim</h2>
          <p>
            Sweat is mostly about thermoregulation, not detox. Your liver and
            kidneys handle waste clearance. If anyone is selling you infrared
            yoga as a detox, ignore that part — and pay attention to the
            five things above instead.
          </p>
        </section>

        <section>
          <h2>Why infrared, not regular hot yoga</h2>
          <ul>
            <li>
              <strong>Cleaner, drier air.</strong> Easier to breathe through
              pranayama and pilates.
            </li>
            <li>
              <strong>Deeper warming.</strong> Heat reaches tissue, not just
              skin.
            </li>
            <li>
              <strong>Silent.</strong> No fans, no hum — meditative work
              actually feels meditative.
            </li>
            <li>
              <strong>30-32°C, not 40-42°C.</strong> You get the deep
              warming, sweat, cardio and recovery without thermoregulation
              fighting you for resources mid-class.
            </li>
          </ul>
        </section>

        <section>
          <h2>And about the ocean across the street</h2>
          <p>
            Heat then cold is one of the better-evidenced recovery protocols
            out there. Finish class warm and mobile, walk five minutes, spend
            two or three minutes in the Atlantic, and your nervous system is
            properly reset before the rest of the day.
          </p>
        </section>

        <section>
          <h2>In short</h2>
          <p>
            Five real things — more range of motion, happier joints, a
            measurable cardio load, faster recovery, a calmer nervous system.
            Movement and controlled heat, delivered deeper and cleaner than
            a fan-forced room.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
