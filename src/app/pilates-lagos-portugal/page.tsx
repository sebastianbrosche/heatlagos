import type { Metadata } from "next";
import ClassPreview from "@/components/ClassPreview";
import LocationPreview from "@/components/LocationPreview";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/pilates-lagos-portugal";

export const metadata: Metadata = {
  title: "Pilates in Lagos, Portugal",
  description:
    "Pilates in Lagos in an infrared heated studio. Strength, control and mobility for active locals and expats. English-speaking classes in the western Algarve.",
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "Pilates in Lagos, Portugal | Heat Lagos",
    description:
      "Heated Pilates in Lagos: strength, control and mobility in an infrared studio. English-speaking classes for active locals and expats.",
  },
};

const STUDIO_ID = "https://www.heatlagos.com/#studio";

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Heated Pilates in Lagos",
  serviceType: "Mat Pilates class in an infrared heated studio",
  description:
    "Slow, precise infrared-heated mat Pilates in Lagos, Portugal. Builds deep strength, core connection and mobility. English-speaking instruction.",
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
        eyebrow="Pilates in Lagos"
        title="Pilates in Lagos, Portugal"
        lede="Heated Pilates in a boutique infrared studio in the centre of Lagos. Slow, precise, quietly powerful work that builds deep core strength, control and mobility — taught in English to a community of active locals, expats and travellers across the western Algarve."
        heroImage="/Pilates.jpg"
        heroImageAlt="Heat Pilates class in Lagos"
        extras={
          <>
            <ClassPreview classes={["Heat Pilates", "Heat Sculpt", "Heat Power"]} />
            <LocationPreview />
          </>
        }
      >
        <section>
          <h2>What our Pilates classes are actually like</h2>
          <p>
            Heat Pilates is mat-based, breath-led and structured. We teach
            clean technique first, then load it through deliberate sequences
            that build deep stabiliser strength, hip and shoulder control,
            and a calm, focused mind. The infrared heat warms the muscles
            from the inside, so the body is ready to move properly from the
            first exercise instead of needing twenty minutes to wake up.
          </p>
          <p>
            Classes run for around 50 minutes. You leave feeling longer,
            stronger and more connected — not exhausted.
          </p>
        </section>

        <section>
          <h2>Who Pilates at Heat is for</h2>
          <ul>
            <li>
              <strong>Surfers, runners and cyclists.</strong> Pilates fixes
              the small imbalances that come from hours of repetitive
              movement and protects the back, hips and shoulders that take
              the load.
            </li>
            <li>
              <strong>People over 50 building long-term strength.</strong>{" "}
              Pilates is one of the most studied, sustainable ways to keep
              hips, spine and core strong as you age. We teach it with
              patience and precision so you actually progress.
            </li>
            <li>
              <strong>Anyone returning to movement.</strong> If you have come
              back from injury, pregnancy, a long break or a long winter,
              this is the safest entry point into the schedule.
            </li>
            <li>
              <strong>Strong people who want more control.</strong> If you
              already train heavy at the gym, Pilates teaches you to move the
              load with the right muscles and the right shapes.
            </li>
          </ul>
        </section>

        <section>
          <h2>Heated mat versus reformer</h2>
          <p>
            Heat Lagos is a mat Pilates studio, not a reformer studio. That
            means classes are accessible at a very wide range of fitness
            levels, the room can hold a real community, and the heat works
            on every part of the body at once. The mat format also travels
            with you — what you learn on the mat in Lagos is what you can
            practise back home.
          </p>
        </section>

        <section>
          <h2>Why infrared changes the Pilates experience</h2>
          <p>
            Most studios run cold. Pilates done cold often feels like a
            warm-up that never stops being a warm-up. Infrared at around
            30°C means tissues are already pliable when class starts, the
            joints feel looser, and the work goes deeper without forcing
            anything. Lower humidity than traditional hot yoga means
            breathing stays comfortable throughout.
          </p>
        </section>

        <section>
          <h2>How to combine Pilates with the rest of your week</h2>
          <p>
            Most members pair Pilates with one strength class (Heat Sculpt
            or Heat Power) and one recovery class (Heat Mobility, Heat
            Recovery or Heat Yin). That gives a balanced week of strength,
            sweat and reset, and is exactly the kind of mix active people
            in the Algarve actually need.
          </p>
        </section>

        <section>
          <h2>Practical info for visitors and new members</h2>
          <ul>
            <li>
              <strong>Where:</strong> Edificio da Fabrica da Ribeira, Av. dos
              Descobrimentos, Loja G, Lagos. A short walk from the marina
              and historic centre.
            </li>
            <li>
              <strong>From the surrounding area:</strong> Luz 12-13 min,
              Burgau 15-16 min, Portimão 19-23 min by car.
            </li>
            <li>
              <strong>Bring:</strong> water and comfortable clothes. Mats and
              props are provided.
            </li>
            <li>
              <strong>Language:</strong> English in every class.
            </li>
          </ul>
        </section>

        <section>
          <h2>How to start with Pilates at Heat</h2>
          <p>
            New to the studio? The 2-week Intro Offer is the easiest way in —
            it covers every class on the schedule, so you can take three or
            four Pilates classes plus a recovery session in the same
            fortnight and decide what fits. Visiting Lagos? The Vacation
            Week pass gives you 7 days unlimited. Or take a single drop-in
            and decide afterwards.
          </p>
        </section>
      </SeoPageShell>
    </>
  );
}
