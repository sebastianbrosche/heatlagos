import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/blog/lagos-wellness-visitor-guide";

export const metadata: Metadata = {
  title: "Where to Work Out in Lagos: A Guide for Visitors and New Residents",
  description:
    "Surf in the morning, recover in the evening. A practical wellness itinerary for anyone visiting Lagos for a week, a month, or a season.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Where to Work Out in Lagos: A Guide for Visitors | Heat Lagos",
    description:
      "A practical wellness guide for visitors and new residents in Lagos, Portugal.",
  },
};

export default function LagosWellnessVisitorGuide() {
  return (
    <SeoPageShell
      eyebrow="Visitor Guide"
      title="Where to Work Out in Lagos: A Guide for Visitors and New Residents"
      lede="Surf in the morning, recover in the evening. A practical wellness itinerary for anyone visiting Lagos for a week, a month, or a season."
    >
      <section>
        <h2>Lagos is an outdoor town with an indoor problem</h2>
        <p>
          The western Algarve sells itself on the outdoor life. Surf at Praia do
          Canavial, run the cliff paths at Ponta da Piedade, swim before
          breakfast, hike to Sagres. Most days the weather makes it easy.
        </p>
        <p>
          The problem is what happens when you do that every day. Surfers get
          tight shoulders and locked-up hips. Runners get shortened hip flexors
          and stiff calves. Cyclists get a permanently flexed spine. Even a week
          of this without recovery changes how your body feels.
        </p>
        <p>
          Lagos has good indoor options, but they are scattered. This guide
          puts them in one place so you can plan your week properly — outdoor
          adventure plus indoor recovery and strength.
        </p>
      </section>

      <section>
        <h2>The studios: what each offers</h2>

        <h3>Heat Lagos — infrared Pilates, Yoga, Sculpt &amp; Recovery</h3>
        <p>
          The only infrared-heated studio in Lagos. Classes at around 30°C
          using radiant heat panels that warm muscles directly. Best for:
          recovery after surf, building strength without loading joints, and
          long yin holds that undo tightness from outdoor sports.
        </p>
        <p>
          <strong>Visitor-friendly:</strong> Single drop-in €22. 7-day
          Vacation Week €59 unlimited. 2-week Intro Offer €79. All classes in
          English. Located on Avenida dos Descobrimentos, central Lagos.
        </p>

        <h3>InLight Studio — traditional Vinyasa, Hatha, Rocket &amp; Ashtanga</h3>
        <p>
          Long-established studio in Lagos old town. Bright, spacious, daily
          schedule. Best for: travellers who want a familiar yoga format without
          heat, and students who prefer traditional styles.
        </p>
        <p>
          <strong>Visitor-friendly:</strong> Drop-in classes available. Website
          at inlight.pt.
        </p>

        <h3>Algarve Alchemy — yoga, pilates, sauna &amp; ice bath</h3>
        <p>
          Wellness space above Black &amp; White Cafe in the old town. Classes
          plus contrast therapy. Best for: people who want the full wellness
          experience — class, then sauna, then ice bath.
        </p>

        <h3>The Movement Lab — yoga, pilates &amp; dance</h3>
        <p>
          Movement-focused studio with contemporary and urban dance alongside
          yoga and pilates. Best for: people who want cross-training between
          yoga and dance. Drop-in from €12.
        </p>

        <h3>Gyms and functional training</h3>
        <p>
          Lagos has several gyms for weights and cardio. Most are Portuguese-run
          with some English-speaking staff. If your week needs heavy lifting or
          structured programming, a gym pass for €30-50/week is easy to find.
        </p>
      </section>

      <section>
        <h2>A sample week: outdoor + indoor balance</h2>

        <p>
          <strong>Monday:</strong> Morning surf at Praia do Canavial. Afternoon
          Heat Mobility at Heat Lagos — 45 minutes of joint and tissue work
          that undoes paddling.
        </p>
        <p>
          <strong>Tuesday:</strong> Morning run along the coast to Ponta da
          Piedade. Evening Heat Yin — long holds in the warmth for calves,
          hamstrings, and hip flexors.
        </p>
        <p>
          <strong>Wednesday:</strong> Rest day. Walk the old town, eat well.
          Optional gentle Heat Flow if you want to move without intensity.
        </p>
        <p>
          <strong>Thursday:</strong> Morning bike ride toward Sagres. Afternoon
          Heat Pilates — core and stabiliser work that protects the lower back
          after hours in the saddle.
        </p>
        <p>
          <strong>Friday:</strong> Morning surf. Evening Heat Recovery — the
          deepest reset on the schedule. Mobility, breathwork, long holds, guided
          rest.
        </p>
        <p>
          <strong>Saturday:</strong> Long hike or second surf. Take the
          evening off.
        </p>
        <p>
          <strong>Sunday:</strong> Heat Sculpt or Heat Power if you want
          intensity. Heat Yin if you want stillness. Or skip everything and
          swim.
        </p>
      </section>

      <section>
        <h2>For new residents: building a sustainable routine</h2>
        <p>
          If you have just moved to Lagos or the western Algarve, resist the
          urge to go all-in on outdoor sports and ignore recovery. The climate
          makes it feel like you can surf or run every day. You can, for a while.
          But three months in without recovery work and your body will let you
          know.
        </p>
        <p>
          A sustainable week for a Lagos resident looks like: 3-4 outdoor
          sessions (surf, run, cycle, hike), 2-3 indoor sessions (Pilates for
          core, yoga or yin for mobility and recovery), and one full rest day.
        </p>
        <p>
          Most members at Heat Lagos are residents, not tourists. The monthly
          and yearly memberships are built for that life — two or three classes
          a week that keep everything else sustainable.
        </p>
      </section>

      <section>
        <h2>Practical info</h2>
        <p>
          <strong>Language:</strong> All studios listed here teach in English.
          Some (Le Dome) also offer French.
        </p>
        <p>
          <strong>Booking:</strong> Most studios require advance booking, especially
          in summer. Heat Lagos uses bsport — book online or through the app.
        </p>
        <p>
          <strong>What to bring:</strong> Water bottle, comfortable clothes, and
          a towel if you are doing heated classes. Mats and props are provided
          everywhere listed.
        </p>
        <p>
          <strong>Timing:</strong> Lagos gets busy in July and August. Book
          classes a few days ahead. September and October are quieter and the
          surf is better.
        </p>
      </section>

      <section>
        <h2>Getting started</h2>
        <p>
          If you are visiting for a week, the Heat Lagos Vacation Week pass
          (€59, 7 days unlimited) is the simplest way to try everything without
          committing. Drop into InLight or Algarve Alchemy for a single class
          to compare.
        </p>
        <p>
          If you are staying for the season, start with a monthly membership at
          one studio and add drop-ins elsewhere. Lagos is small enough that you
          can studio-hop without it being a hassle.
        </p>
      </section>
    </SeoPageShell>
  );
}
