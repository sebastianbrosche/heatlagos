import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/why-infrared";

export const metadata: Metadata = {
  title: "Why Infrared? Five Evidence-Backed Reasons",
  description:
    "What an infrared room actually does to a body that's about to move for an hour. Five reasons it matters — flexibility, joints, cardiovascular load, recovery, nervous system — with the evidence behind each one.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Why Infrared? | Heat Lagos",
    description:
      "What infrared yoga and pilates actually do to the body — flexibility, joints, cardio, recovery, nervous system. With the evidence behind each one, and what we don't claim.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Why Infrared? Five Reasons to Practice in a Heated Studio",
  description:
    "What an infrared room does to a body that's about to move for an hour — flexibility, joints, cardiovascular conditioning, recovery and nervous-system effects, with the evidence behind each one.",
  url: URL,
  mainEntityOfPage: URL,
  inLanguage: "en",
  author: { "@id": STUDIO_ID },
  publisher: { "@id": STUDIO_ID },
  image: "https://www.heatlagos.com/DSC07970.JPG",
  about: [
    "Infrared yoga",
    "Infrared pilates",
    "Hot yoga",
    "Heat therapy",
    "Recovery",
  ],
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
        lede="What an infrared room actually does to a body that's about to move for an hour. Five reasons it matters — and the evidence behind each one."
        heroImage="/DSC07970.JPG"
        heroImageAlt="Heat Lagos infrared studio"
      >
        <section>
          <p>
            We get this question often. Most people walking into the studio
            for the first time have done yoga before — usually in a cold
            room, sometimes in a hot one. The infrared part is what makes
            them curious, and sometimes a little skeptical. Fair enough.
          </p>
          <p>
            Infrared isn&apos;t a wellness trend. It&apos;s the same band of
            energy you feel when sun warms your skin on a cool morning.
            Hospitals use radiant infrared warmers in delivery rooms to keep
            premature babies alive. Cardiologists in Japan use far-infrared
            therapy on heart-failure patients. Olympic recovery rooms run
            far-infrared panels next to ice baths. The physics are genuinely
            useful, and they&apos;ve been used in serious medical settings
            for decades.
          </p>
          <p>
            The reason a yoga and pilates studio installs infrared panels in
            the ceiling instead of a fan-forced heater isn&apos;t aesthetic.
            It&apos;s that the heat reaches you in a different way — and
            that difference does specific things to a body that&apos;s about
            to move for an hour. These are the five we think matter.
          </p>
        </section>

        <section>
          <h2>Your tissue actually warms up</h2>
          <p>
            Walk into a cold studio, start a flow, and the first ten minutes
            are mostly your body trying to bring its tissue temperature into
            a useful range. In a heated room, that work is done before your
            second breath.
          </p>
          <p>
            This isn&apos;t vague. Collagen — the main passive resistive
            material in muscle and tendon — becomes more extensible as it
            warms. Heated tissue has lower viscosity. You move further at
            lower load. Heat combined with stretch produces better
            range-of-motion outcomes than stretching alone, and the better
            systematic reviews put this down to a mix of collagen
            extensibility, viscoelastic shifts and reduced muscle-spindle
            reactivity.
          </p>
          <p>
            Far-infrared specifically reaches several centimetres into soft
            tissue rather than just warming the skin. Convection heat — the
            air-blown kind — works the other way around: it warms the air
            around you, then your skin, and the heat propagates inward from
            there. Slower, less consistent, harder to breathe in.
          </p>
          <p>
            The practical version: you find your hips, your hamstrings, your
            thoracic spine quickly. For pilates, where small precise
            movements depend on a warm and pliable lumbo-pelvic system, this
            is the difference between a session that earns mobility and one
            that just rehearses your existing limits.
          </p>
        </section>

        <section>
          <h2>Joints feel better</h2>
          <p>
            This is one of the few claims about infrared that sits on solid
            clinical ground.
          </p>
          <p>
            A 2009 study in Clinical Rheumatology followed patients with
            rheumatoid arthritis and ankylosing spondylitis through a
            four-week course of infrared sauna sessions. Pain and stiffness
            dropped during sessions, fatigue decreased, and there were no
            flare-ups or adverse effects. A randomised trial on chronic low
            back pain found similar results.
          </p>
          <p>
            The mechanism is unspectacular: heat triggers vasodilation, which
            means more blood reaches the joint, inflammatory metabolites are
            cleared faster, pain thresholds rise, and the protective muscle
            guarding around a painful joint relaxes. Heat has been part of
            physiotherapy for chronic musculoskeletal pain for decades. The
            thing that&apos;s different about an infrared studio is that you
            get the heat and the movement in the same hour, instead of
            stacking them in sequence.
          </p>
          <p>
            For anyone over 40, anyone managing wear from years of training,
            runners with cranky knees, climbers with cranky shoulders — this
            is one of the more useful things the room does for you.
          </p>
        </section>

        <section>
          <h2>Your cardiovascular system gets a lift</h2>
          <p>This one tends to surprise people.</p>
          <p>
            A Japanese cardiologist named Tei developed something called Waon
            therapy in the 1990s — a structured far-infrared treatment for
            heart-failure patients who were too sick to do regular cardio.
            The first studies, published in the Journal of the American
            College of Cardiology, showed measurable improvements in
            vascular function and cardiac output after two weeks. The
            proposed mechanism is upregulation of nitric oxide synthase,
            which is the same family of effects you get from moderate aerobic
            training. The whole point of Waon was to give people who
            couldn&apos;t tolerate cardio a way in.
          </p>
          <p>
            For a healthy person doing yoga or pilates in an infrared room,
            this means your cardiovascular system is working a layer harder
            than it would in a cold studio. Heart rate runs higher.
            Peripheral circulation increases. Over weeks, the vascular
            adaptations look like the ones you accumulate from regular
            cardio. It doesn&apos;t replace cardio. It stacks something
            measurable on top of a practice that, in a cold room, isn&apos;t
            strongly cardiovascular at all.
          </p>
        </section>

        <section>
          <h2>Recovery is faster</h2>
          <p>
            The recovery side is where the data has gotten strongest in the
            last few years.
          </p>
          <p>
            A 2022 study on elite female footballers found that far-infrared
            applied every 24 hours after match exercise cut peak DOMS by
            around 60% and brought athletes back to baseline one to three
            days faster than the control group. A 2024 trial comparing
            infrared sauna, traditional sauna, warm water immersion and
            passive recovery found infrared came out best on fatigue and
            muscle damage markers — which suggests the wavelength itself is
            doing some of the work, not just the heat.
          </p>
          <p>
            The mechanism is partly heat shock proteins, particularly HSP70.
            These act as molecular chaperones and help cells repair damaged
            proteins after physical stress. A study in the International
            Journal of Yoga compared the same sequence done in heated and
            unheated rooms, and the heated group expressed significantly
            more HSP70 after four weeks. The other half of the mechanism is
            simpler: better blood flow clears metabolic waste from worked
            muscles faster.
          </p>
          <p>
            If you train hard outside of yoga — surf, gym, BJJ, running,
            cycling — two infrared sessions a week work as active recovery
            with a real physiological signature. Not the vague kind. The
            measurable kind.
          </p>
        </section>

        <section>
          <h2>The nervous system shifts</h2>
          <p>
            This is the effect most people don&apos;t expect, and it&apos;s
            probably the most clinically interesting one in the literature.
          </p>
          <p>
            A 2016 randomised trial in JAMA Psychiatry showed that a single
            whole-body hyperthermia session produced a real reduction in
            depressive symptoms — measurable up to six weeks afterwards. The
            proposed mechanism involves the raphe nuclei, the brain&apos;s
            main serotonin-producing region, which is also what SSRI
            antidepressants target. Heat exposure also raises BDNF, supports
            neuroplasticity, and lowers cortisol.
          </p>
          <p>
            You don&apos;t need to be clinically depressed to feel a version
            of this. Most people leaving an infrared yoga class describe a
            kind of post-session calm that doesn&apos;t quite match what they
            get from cold yoga or a regular sauna alone. The likely reason
            is that you&apos;re stacking three nervous-system regulators in
            the same hour: parasympathetic activation from the breath and
            slow movement of yoga, the endorphin and serotonin response to
            controlled hyperthermia, and the cortisol drop that follows.
          </p>
          <p>
            If you&apos;re managing chronic stress, sleep that has stopped
            working, or low-grade anxiety, this stack is probably more
            useful than any one of those interventions alone.
          </p>
        </section>

        <section>
          <h2>What we don&apos;t claim</h2>
          <p>
            We should be straightforward about what&apos;s overhyped. The
            most common claim around infrared studios is &quot;detox through
            sweat.&quot; This one doesn&apos;t really hold up. Your liver
            and kidneys do almost all of your metabolic waste clearance, and
            sweat is mostly about thermoregulation, not toxin elimination.
            There are studies showing trace amounts of heavy metals in sweat,
            but the quantities are small relative to what your kidneys handle
            anyway.
          </p>
          <p>
            If anyone is selling you infrared yoga as a detox, ignore that
            part. Pay attention to everything above instead.
          </p>
        </section>

        <section>
          <h2>Why infrared, specifically</h2>
          <p>
            It&apos;s worth being honest about why an infrared studio works
            differently from a fan-heated hot yoga room.
          </p>
          <p>
            <strong>The air stays cleaner.</strong> Infrared panels heat the
            body directly through radiant energy rather than blowing hot air
            at you. Lower humidity. Less dust and circulating particles.
            Much easier to breathe through pranayama, breath-led pilates, or
            any kind of respiratory sensitivity. In day-to-day terms, this
            is the biggest practical difference.
          </p>
          <p>
            <strong>The heat reaches deeper.</strong> Convection warms your
            skin and works inward; infrared warms tissue more directly. The
            subjective version is that you feel warm rather than hot — the
            room sits at 30-32°C while your muscles feel like they&apos;re
            in a 40°C room.
          </p>
          <p>
            <strong>It&apos;s silent.</strong> No fans. No hum. For a
            meditative practice this matters more than people realise.
          </p>
          <p>
            <strong>The temperature is lower, on purpose.</strong> Most
            infrared studios run around 30-32°C, well below the 40-42°C of
            conventional Bikram-style rooms. There&apos;s a clear
            physiological reason this works for more people. Heat causes
            vasodilation, which lowers blood pressure on its own. A 2019
            pilot study on Bikram practitioners identified vasodilation and
            plasma volume shifts as factors that can pull blood pressure
            down during practice — which is why students with naturally low
            blood pressure, or anyone new to heated work, tolerate 30-32°C
            far better than 40°C+. The other consequence is workout quality.
            Above 40°C, holding a strong plank, an inversion, or a precise
            pilates position becomes harder because thermoregulation is
            competing for resources with everything else you&apos;re asking
            your body to do. At 30-32°C you still get the deep tissue
            warming, the sweat, the cardiovascular load and the recovery
            benefits. You can also actually train hard.
          </p>
        </section>

        <section>
          <h2>And about the ocean across the street</h2>
          <p>
            When the studio happens to sit a few minutes from the Atlantic,
            that&apos;s not a marketing line — it&apos;s an extension of the
            practice if you want it. Heat-then-cold contrast is one of the
            better-evidenced recovery protocols out there. The rapid
            temperature swing creates a vascular pump (vessels dilate,
            constrict, dilate again), drives circulation, and triggers a
            strong parasympathetic rebound after the initial cold-shock
            response. Research suggests that ending a session with cold
            exposure produces stronger and longer-lasting parasympathetic
            activation than the reverse.
          </p>
          <p>
            In practice: you finish a class warm and mobile, you walk five
            minutes, you spend two or three minutes in the ocean, and you go
            back to your day with your nervous system properly reset.
            It&apos;s not the reason to take the class. But when the
            geography allows it, the combined effect is bigger than either
            piece alone.
          </p>
        </section>

        <section>
          <h2>The short version</h2>
          <p>
            Infrared yoga and pilates work because they combine two things
            that already have independent evidence behind them — movement
            and controlled heat exposure — and deliver the heat in a way
            that&apos;s deeper, cleaner and more efficient than a fan-forced
            hot studio. Flexibility gains driven by collagen physics. Joint
            relief from documented vasodilation. A mild cardiovascular load
            that mirrors what cardiologists prescribe to heart-failure
            patients. Faster recovery via heat shock proteins and improved
            circulation. A real shift in nervous-system state with measurable
            effects on mood.
          </p>
          <p>
            If you&apos;re choosing between a cold studio and an infrared
            one, the question isn&apos;t whether infrared adds something.
            It&apos;s whether the specific things it adds — deeper warming,
            joint comfort, mild cardiovascular load, faster recovery and a
            calmer nervous system on the way out the door — are worth it for
            the kind of body you&apos;re trying to build and maintain.
          </p>
          <p>
            For most people who train, who work at desks, who get older, or
            who simply want their practice to do more in less time, the
            answer is yes.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
