import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/blog/sculpt-hiit-class";

export const metadata: Metadata = {
  title: "Sculpt HIIT: A Faster, Interval-Based Take on Sculpt",
  description:
    "Sculpt HIIT runs faster than a normal sculpt class, on 40 seconds of work and 20 of rest, built around rep pyramids. Here is what that changes and who it suits.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Sculpt HIIT: A Faster, Interval-Based Take on Sculpt | Heat Lagos",
    description:
      "40 seconds on, 20 off, built around rep pyramids. What Sculpt HIIT is, how it differs from a normal sculpt class, and who it is for.",
  },
};

export default function SculptHiitClass() {
  return (
    <SeoPageShell
      clusterSlug="sculpt-hiit-class"
      canonicalUrl={URL}
      datePublished="2026-07-23"
      dateModified="2026-07-23"
      eyebrow="Class Guide"
      title="Sculpt HIIT: A Faster, Interval-Based Take on Sculpt"
      lede="Sculpt HIIT is what happens when you take a sculpt class and run it on the clock. The moves are faster, the format is interval-based at 40 seconds on and 20 off, and the reps climb and fall in a pyramid rather than sitting at a steady count. Same idea, different engine, and it feels nothing like a standard sculpt class."
    >
      <section>
        <h2>What HIIT means here</h2>
        <p>
          HIIT is high-intensity interval training: short bursts of hard work with
          short rest, repeated. In Sculpt HIIT that structure is 40 seconds of
          work followed by 20 seconds of rest. The 40 seconds is meant to be genuinely
          hard and the 20 is barely enough to catch your breath before the next
          round, which is what keeps the heart rate up and turns a strength class
          into something with a real cardio edge.
        </p>
      </section>

      <section>
        <h2>The pyramid, and why it feels different</h2>
        <p>
          A normal sculpt class tends to hold a steady rep count, something like
          8 reps done twice. Sculpt HIIT does the same total but arranges it as a
          pyramid: 1 rep, then 2, then 3, then 4, then back down through 3, 2 and
          1. Add those up and it is still 16, exactly the same as 8 times 2, so on
          paper nothing has changed.
        </p>
        <p>
          In the room it changes a lot. Climbing up the pyramid lets you build into
          the movement and find the pattern, and then coming back down while the
          muscle is already tired is where it bites. The emphasis lands
          differently too. Instead of grinding out one fixed number you are
          managing effort across a rising and falling load, which trains
          control and stamina alongside the strength, and it stops the class
          feeling repetitive.
        </p>
      </section>

      <section>
        <h2>How Sculpt HIIT differs from a normal sculpt class</h2>
        <p>
          The building blocks are the same, but three things shift. The pace is
          faster, since the clock is driving rather than a slow, deliberate tempo.
          The cardio demand is higher because the 40-on, 20-off structure keeps
          your heart rate elevated the whole way through. And the pyramid changes
          where the challenge sits, loading the back half of each block when the
          muscle is already fatigued. If a standard sculpt class is about
          controlled strength, Sculpt HIIT leans toward conditioning and stamina
          without losing the sculpt foundation.
        </p>
      </section>

      <section>
        <h2>Who Sculpt HIIT is for</h2>
        <p>
          It suits people who already enjoy sculpt and want a faster, sweatier
          version, anyone chasing cardio and strength in one class, and people who
          get bored of steady rep counts and like the game of working through a
          pyramid. It is more demanding than a standard sculpt class, so if you are
          brand new to this kind of training, start with regular Sculpt and move
          across once the movements feel familiar. As always, tell the teacher
          about any injuries before you begin.
        </p>
      </section>

      <section>
        <h2>Trying Sculpt HIIT at Heat</h2>
        <p>
          Sculpt HIIT is going on the schedule as a small-group class in the
          infrared heat. It pairs well with a slower recovery or mobility session
          later in the week so your body gets the reset it needs to adapt. If you
          are new to the studio, the intro offer is the easiest way to try it
          alongside{" "}
          <a href="/blog/sculpt-class-lagos">our regular Sculpt class</a> and see
          which one you prefer.
        </p>
      </section>
    </SeoPageShell>
  );
}
