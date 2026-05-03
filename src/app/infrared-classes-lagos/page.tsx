import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import Schedule from "@/components/Schedule";
import SeoPageShell from "@/components/SeoPageShell";
import TeachersStrip from "@/components/TeachersStrip";

const URL = "https://www.heatlagos.com/infrared-classes-lagos";

export const metadata: Metadata = {
  title: "Infrared Classes in Lagos, Portugal",
  description:
    "Infrared heated Pilates, yoga, sculpt and recovery classes in Lagos. English-speaking studio for active locals, expats and visitors across the western Algarve.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Infrared Classes in Lagos, Portugal | Heat Lagos",
    description:
      "Infrared heated Pilates, yoga, sculpt and recovery classes in Lagos. English-speaking studio for the western Algarve.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Infrared Heated Classes in Lagos",
  serviceType: "Infrared heated fitness and yoga classes",
  description:
    "Infrared heated Pilates, yoga, sculpt, mobility, recovery and yin classes in a boutique studio in Lagos, Portugal. All classes taught in English.",
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
        eyebrow="Infrared in Lagos"
        title="Infrared Classes in Lagos, Portugal"
        lede="A boutique infrared-heated studio in the heart of Lagos, with Pilates, yoga, sculpt, mobility, recovery and yin classes designed for active people who want to move better, get stronger and recover well."
        heroImage="/DSC08008.JPG"
        heroImageAlt="Heat Lagos infrared studio interior"
        extras={
          <>
            <ClassPreview
              classes={[
                "Heat Pilates",
                "Heat Sculpt",
                "Heat Power",
                "Heat Flow",
                "Heat Mobility",
                "Heat Recovery",
                "Heat Yin",
              ]}
            />
            <TeachersStrip
              heading="The teachers behind the schedule."
              teachers={["Stine", "Sebastian", "Anastasiia"]}
            />
            <Schedule hideHeading />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>What infrared training feels like at Heat</h2>
          <p>
            The studio is heated to around 30°C using radiant infrared panels.
            Instead of pushing hot, dry air around the room, the panels warm
            the body directly — your skin and muscles get warm before the air
            does. The result is a focused, slightly humid environment that
            feels strong without feeling overwhelming, and that makes the body
            ready to move from the very first stretch.
          </p>
          <p>
            Infrared is gentler than the 40°C+ rooms used in traditional hot
            yoga, which means it suits a wider range of people. Beginners can
            learn proper form without gasping for breath. Experienced
            practitioners get a deeper, more sustained warmth than they would
            in an unheated studio.
          </p>
        </section>

        <section>
          <h2>Who Heat is built for</h2>
          <p>
            Heat Lagos is not a generic gym, and not a one-style yoga studio.
            We are designed for three groups of people who already live or
            travel in this part of the Algarve:
          </p>
          <ul>
            <li>
              <strong>Active people on the edge.</strong> Surfers, runners,
              cyclists, BJJ athletes and gym-goers who train hard and need
              recovery, mobility and a nervous-system reset more than they
              need another high-intensity session.
            </li>
            <li>
              <strong>Long-term wellbeing seekers.</strong> Residents in their
              50s and 60s who want a sustainable routine, real instruction and
              measurable progress over months and years. The goal is
              independence — the more you train with us, the better you should
              know your own body.
            </li>
            <li>
              <strong>Busy parents and stretched professionals.</strong>{" "}
              People with limited time who need a class that genuinely resets
              the body and the mind, not just another item on the calendar.
            </li>
          </ul>
        </section>

        <section>
          <h2>The full spectrum, in one studio</h2>
          <p>
            Our schedule covers the whole range from intense strength to deep
            recovery, so you can pick the right class for the right day.
          </p>
          <ul>
            <li>
              <strong>Strength &amp; sweat.</strong> Heat Pilates, Heat Sculpt
              and Heat Power for control, full-body strength and breath-led
              power yoga.
            </li>
            <li>
              <strong>Movement &amp; flow.</strong> Heat Flow for creative,
              breath-led sequences in a warm room.
            </li>
            <li>
              <strong>Recovery &amp; release.</strong> Heat Mobility, Heat
              Recovery and Heat Yin for joint health, breathwork and long,
              still holds.
            </li>
          </ul>
          <p>
            Most members combine two or three formats across the week — one
            harder session, one mobility class, one recovery or yin. That mix
            is exactly what active people in Lagos tend to need.
          </p>
        </section>

        <section>
          <h2>English-speaking, expat-friendly</h2>
          <p>
            Every class at Heat Lagos is taught in English by experienced
            international instructors. Our community already includes Swedish,
            British, German, Dutch and Portuguese members — locals, long-term
            expats and travellers staying for a week or a season. You will
            never have to translate cues, ask twice or feel out of place.
          </p>
        </section>

        <section>
          <h2>Easy to reach from across the western Algarve</h2>
          <p>
            The studio is on Avenida dos Descobrimentos, a short walk from the
            Lagos waterfront and historic centre. Drive times from the
            surrounding area are all comfortable:
          </p>
          <ul>
            <li>Praia da Luz — about 12-13 minutes</li>
            <li>Burgau — about 15-16 minutes</li>
            <li>Portimão — about 19-23 minutes depending on route</li>
          </ul>
          <p>
            That makes Heat a sensible weekly choice whether you live in Lagos
            itself, in Luz, Burgau, Praia da Rocha or further along the coast
            in Portimão.
          </p>
        </section>

        <section>
          <h2>Practical details</h2>
          <ul>
            <li>
              <strong>What to bring:</strong> water and clothes you can move
              in. Mats, props, weights and resistance equipment are all
              provided.
            </li>
            <li>
              <strong>Studio temperature:</strong> around 30°C, lower humidity
              than traditional hot yoga.
            </li>
            <li>
              <strong>Booking:</strong> drop in once, use the 2-week intro,
              buy a 10-class pack, take a Vacation Week pass, or join one of
              our monthly or yearly memberships.
            </li>
          </ul>
        </section>

        <section>
          <h2>How to start</h2>
          <p>
            If you have never been to a heated class, the easiest place to
            begin is the 2-week Intro Offer — it gives you unlimited access to
            every class on the schedule, so you can find which formats fit
            your body and your week. From there, most people settle into a
            monthly or yearly membership and use Heat as their year-round
            routine.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
