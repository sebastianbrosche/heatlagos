import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/blog/first-hot-yoga-class-lagos";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: "What to Expect at Your First Hot Yoga Class in Lagos",
  description:
    "First heated yoga class in Lagos? What to wear, how infrared heat feels, how hard it should be, and how to leave feeling better not wrecked.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "What to Expect at Your First Hot Yoga Class in Lagos | Heat Lagos",
    description:
      "A practical first-timer guide to heated yoga in Lagos: heat level, kit list, intensity, and recovery tips.",
  },
};

export default function FirstHotYogaClassLagos() {
  return (
    <SeoPageShell
      eyebrow="Beginner Guide"
      title="What to Expect at Your First Hot Yoga Class in Lagos"
      lede="Heated yoga is intense for some people and surprisingly approachable for others. This is what actually happens in a first class at an infrared studio in Lagos."
    >
      <section>
        <h2>What &quot;hot&quot; means here</h2>
        <p>
          Many people search for hot yoga and expect a 40C Bikram-style room.
          At Heat Lagos we use infrared heat around 30C. You will sweat. You
          will feel warm muscles. You should still be able to breathe and
          follow instructions without the room feeling like a sauna.
        </p>
      </section>

      <section>
        <h2>What to bring</h2>
        <ul>
          <li>Water bottle (full before you arrive)</li>
          <li>Towel (strongly recommended for heated classes)</li>
          <li>Fitted clothes you can move in; bare feet are normal</li>
          <li>Arrive 10 minutes early so you are not rushing into heat</li>
        </ul>
        <p>
          Mats and basic props are available in studio. You do not need to buy
          anything for the first visit.
        </p>
      </section>

      <section>
        <h2>How hard will it feel?</h2>
        <p>
          Teachers offer options. Beginners are expected. If a pose is too
          much, take a knee, sit, or rest in child&apos;s pose. The goal of a
          first class is to learn the room and your breath, not to match the
          person next to you.
        </p>
        <p>
          Heat Power and Heat Flow are the main heated yoga formats. Heat
          Mobility and Heat Recovery are better if you want a gentler first
          visit into the heated space.
        </p>
      </section>

      <section>
        <h2>After class</h2>
        <p>
          Drink water, cool down slowly, and give yourself a few minutes before
          jumping into the rest of the day. Mild muscle fatigue the next day is
          normal. Dizziness is not: sit down, tell a teacher, and take it
          slower next time.
        </p>
        <p>
          Ready when you are: book a single class or start with the intro offer
          so you can try a few formats in your first two weeks.
        </p>
      </section>
    </SeoPageShell>
  );
}
