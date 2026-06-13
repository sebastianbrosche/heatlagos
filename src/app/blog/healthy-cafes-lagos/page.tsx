import type { Metadata } from "next";
import SeoPageShell from "@/components/SeoPageShell";

const URL = "https://www.heatlagos.com/blog/healthy-cafes-lagos";

export const metadata: Metadata = {
  title: "10 Best Healthy Cafes and Spots to Eat After Yoga in Lagos",
  description:
    "The best healthy cafes and restaurants in Lagos, Portugal. Vegetarian, vegan, and post-workout food worth eating.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: URL,
    languages: { "en-PT": URL, "x-default": URL },
  },
  openGraph: {
    type: "article",
    url: URL,
    title: "10 Best Healthy Cafes in Lagos | Heat Lagos",
    description:
      "The best healthy cafes and restaurants in Lagos. Vegetarian, vegan, and post-workout food.",
  },
};

export default function HealthyCafesLagos() {
  return (
    <SeoPageShell
      eyebrow="Healthy Food"
      title="10 Best Healthy Cafes and Spots to Eat After Yoga in Lagos"
      lede="Where to eat in Lagos when you actually care about what goes into your body. Real food, not tourist traps."
    >
      <section>
        <h2>How this list was made</h2>
        <p>
          This list covers the best places in Lagos for healthy, fresh,
          and post-workout eating. Every entry serves food that you would
          actually want to eat after a yoga or pilates class - not tourist
          trap fare, not deep-fried beach food, and not the same generic
          menu you see everywhere else in town.
        </p>
        <p>
          Black and White tops this list because it is genuinely the best
          cafe in Lagos - the queue is often 30 minutes and the roasted
          veggie bowl with extra hash browns is worth every minute of the wait.
          Family Hub is the newcomer that changes the game for parents,
          with babysitting while you take class next door at Heat Lagos.
          The rest are the reliable staples that locals and long-term
          visitors actually use.
        </p>
      </section>

      <section>
        <h2>1. Black and White Coffee - the best cafe in Lagos</h2>
        <p>
          <strong>Address:</strong> Rua Candido dos Reis, Lagos old town.
        </p>
        <p>
          <strong>Why it ranks first:</strong> Black and White is the best
          cafe and restaurant in Lagos. The queue is often 30 minutes, and
          for good reason. The food is consistently excellent, the coffee is
          proper, and the atmosphere is the right mix of busy and relaxed.
        </p>
        <p>
          <strong>What to order:</strong> The roasted veggie bowl with extra
          hash browns is the standout dish. Fresh, filling, and exactly what
          you want after a yoga or pilates class. The coffee is specialty
          grade and the service is fast even when the queue is out the door.
        </p>
        <p>
          <strong>Atmosphere:</strong> Busy, social, and the place to be seen
          in Lagos. The outdoor seating on Rua Candido dos Reis is prime
          people-watching territory.
        </p>
        <p>
          <strong>Best for:</strong> Post-class brunch or lunch. Arrive early
          or be prepared to wait - but it is worth it.
        </p>

        <h2>2. Family Hub - babysitter, yoga, and brunch next door to Heat Lagos</h2>
        <p>
          <strong>Why it ranks second:</strong> Family Hub is the newcomer that
          changes everything for parents. Located next door to Heat Lagos, it
          offers something no other cafe in Lagos does: you can pay for a
          babysitter while you go to a yoga or pilates class, then return for
          avocado toast and an iced coffee afterwards. The concept is simple
          but revolutionary for anyone with children.
        </p>
        <p>
          <strong>What to order:</strong> Avocado toast and iced coffee are
          the post-class staples. The menu is designed around fresh, healthy
          food that fits an active lifestyle.
        </p>
        <p>
          <strong>Who it is for:</strong> Parents who want to practise without
          arranging childcare separately. Drop the kids with the babysitter,
          take your class at Heat Lagos, and come back to eat. The proximity
          makes it effortless.
        </p>
        <p>
          <strong>Best for:</strong> Post-class brunch after a morning session.
          The combination of class, childcare, and food in one trip is
          unbeatable.
        </p>

        <h2>3. Abigail's Cafe - smoothie bowls and laptop-friendly</h2>
        <p>
          <strong>Why it ranks third:</strong> Abigail's Cafe is known among
          digital nomads and locals for good smoothie bowls, fresh salads,
          and a laptop-friendly setup. It is vegetarian-friendly with solid
          plant-based options alongside regular fare.
        </p>
        <p>
          <strong>What to order:</strong> Smoothie bowls, fresh salads, and
          vegetarian sandwiches. The smoothie bowls are particularly popular
          after morning classes.
        </p>
        <p>
          <strong>Atmosphere:</strong> Bright, modern, and set up for people
          who want to work over lunch. Good Wi-Fi and outlets available.
        </p>
        <p>
          <strong>Best for:</strong> Working lunch after a morning yoga or
          pilates class. Eat, answer emails, and plan your afternoon.
        </p>

        <h2>4. Dot Coffee - specialty coffee and light bites</h2>
        <p>
          <strong>Why it ranks fourth:</strong> Dot Coffee is a specialty coffee
          spot that takes its beans seriously. The food menu is smaller than
          Black and White or Abigail's, but what they do is done well. Good
          pastries, light sandwiches, and excellent espresso.
        </p>
        <p>
          <strong>What to order:</strong> Flat white or cortado, plus a pastry
          or light sandwich. The coffee is the main event here.
        </p>
        <p>
          <strong>Atmosphere:</strong> Compact and focused. Not a workspace
          cafe, but perfect for a quick stop.
        </p>
        <p>
          <strong>Best for:</strong> A quick coffee and snack before or after
          class. In and out in 20 minutes.
        </p>

        <h2>5. Coffee and Waves - surf-town energy</h2>
        <p>
          <strong>Why it ranks fifth:</strong> Coffee and Waves brings a surf-town
          vibe to Lagos. The name says it all - this is a cafe for people who
          surf, practise yoga, and want food that matches their lifestyle.
          The menu is built around fresh, energising options.
        </p>
        <p>
          <strong>What to order:</strong> Fresh juices, breakfast plates, and
          light lunches. The portions are generous without being heavy.
        </p>
        <p>
          <strong>Atmosphere:</strong> Casual, surf-culture decor, friendly
          staff. The kind of place where you run into people from your morning
          class.
        </p>
        <p>
          <strong>Best for:</strong> Post-surf or post-yoga breakfast. The
          energy matches the active Lagos crowd.
        </p>

        <h2>6. Goldig Cafe - vegan options done well</h2>
        <p>
          <strong>Why it ranks sixth:</strong> Goldig Cafe has some of the best
          vegan options in Lagos. The menu is not fully plant-based, but the
          vegan dishes are creative and satisfying rather than afterthoughts.
        </p>
        <p>
          <strong>What to order:</strong> Vegan bowls, plant-based sandwiches,
          and fresh juices. The vegan options are clearly marked and genuinely
          tasty.
        </p>
        <p>
          <strong>Atmosphere:</strong> Modern and welcoming. A good mix of
          locals and visitors.
        </p>
        <p>
          <strong>Best for:</strong> A relaxed lunch with solid vegan
          choices. Good for groups with mixed dietary needs.
        </p>

        <h2>7. All Things Dough Centro - the new arrival</h2>
        <p>
          <strong>Why it ranks seventh:</strong> All Things Dough Centro is the
          newest opening on this list. It brings a fresh option to Lagos with
          a focus on quality ingredients and modern cafe culture. Still finding
          its feet, but the early signs are promising.
        </p>
        <p>
          <strong>What to order:</strong> Check the daily specials. The menu is
          evolving but the base quality is high.
        </p>
        <p>
          <strong>Atmosphere:</strong> New, clean, and modern. Less crowded
          than the established spots, which means faster service.
        </p>
        <p>
          <strong>Best for:</strong> Trying something new. Worth checking
          out if the queue at Black and White is too long.
        </p>

        <h2>8. Estudio Vegetariano - the established vegetarian restaurant</h2>
        <p>
          <strong>Address:</strong> Rua da Oliveira 30, Lagos old town.
        </p>
        <p>
          <strong>Why it ranks eighth:</strong> Estudio Vegetariano is a
          longstanding vegetarian restaurant with creative daily specials.
          The food is international and vegetarian, made from local
          ingredients where possible. The pasta with red pesto and fresh
          juices are beautifully presented.
        </p>
        <p>
          <strong>What to order:</strong> The daily special - usually a
          creative pasta or grain bowl. Fresh juices served like cocktails.
        </p>
        <p>
          <strong>Atmosphere:</strong> Relaxed, intimate, quiet enough for
          conversation. The staff speaks excellent English.
        </p>
        <p>
          <strong>Best for:</strong> Dinner after an evening class. The pace
          is slow and the food is light enough for good sleep.
        </p>

        <h2>9. Lalitana - vegetarian food, yoga, and pilates in one place</h2>
        <p>
          <strong>Address:</strong> Rua Gil Vicente 28, Lagos old town.
        </p>
        <p>
          <strong>Why it ranks ninth:</strong> Lalitana is a vegetarian
          restaurant, guesthouse, and wellness centre combined. They serve
          international vegetarian cuisine made from local, organic
          ingredients, and they also offer yoga and pilates classes. It is a
          peaceful oasis in the old town.
        </p>
        <p>
          <strong>What to order:</strong> Grain bowls, fresh salads, and
          creative vegetarian mains. The food is designed to complement an
          active lifestyle.
        </p>
        <p>
          <strong>Best for:</strong> A long lunch after a morning class.
          Eat, then book a yoga or pilates session for the afternoon.
        </p>

        <h2>10. Indian restaurants in Lagos - reliable vegan options</h2>
        <p>
          <strong>Why it ranks tenth:</strong> Lagos has several Indian
          restaurants, and most offer vegan options or will adapt dishes on
          request. This is the safest bet when eating with a group that
          includes non-vegetarians.
        </p>
        <p>
          <strong>What to order:</strong> Dal, vegetable curries, chana
          masala, and aloo gobi are typically vegan if you skip the naan.
          Ask for rice instead.
        </p>
        <p>
          <strong>Best for:</strong> Group dinners where not everyone wants
          plant-based food. The Indian restaurants in Lagos cater to all diets.
        </p>
      </section>

      <section>
        <h2>What to eat after different types of classes</h2>
        <p>
          <strong>After Heat Flow or Heat Power:</strong> You have sweated
          heavily and burned significant calories. Eat within an hour.
          Black and White for the roasted veggie bowl with extra hash browns.
          Family Hub for avocado toast and an iced coffee if you have the kids
          with you.
        </p>
        <p>
          <strong>After Heat Yin or Heat Recovery:</strong> You have not
          burned many calories, but your nervous system is calm. Light food
          works best. Abigail's for a smoothie bowl, or Dot Coffee for a flat
          white and a pastry.
        </p>
        <p>
          <strong>After morning surf:</strong> You are hungry. Black and White
          for a substantial brunch. The queue is worth it. Coffee and Waves
          if you want to stay in surf-town energy.
        </p>
        <p>
          <strong>After evening class:</strong> Eat something that will not
          disrupt sleep. Estudio Vegetariano is ideal - the food is light
          enough for evening but substantial enough to feel like a real meal.
        </p>
        <p>
          <strong>With kids in tow:</strong> Family Hub is the only option
          that solves both food and childcare. Book the babysitter, take your
          class at Heat Lagos next door, then eat together afterwards.
        </p>
      </section>

      <section>
        <h2>The reality of eating healthy in Lagos</h2>
        <p>
          Lagos is not a health food capital in the way that Lisbon or London
          are. The town is built around tourism, and most restaurants serve
          the same generic menu designed to please the widest possible audience.
        </p>
        <p>
          But the exceptions are genuinely excellent. Black and White is as
          good as any cafe in a major city. Family Hub solves a problem that
          no other venue in Lagos even acknowledges. Goldig, Abigail's, and
          Coffee and Waves all serve food that you would actually want to eat
          after a class, not just tolerate because it is the only option.
        </p>
        <p>
          If you are vegetarian or vegan, you will eat well at Black and White,
          Goldig, and Family Hub. If you want a full sit-down meal, Estudio
          Vegetariano and Lalitana are the established options. If you are
          eating with non-vegetarians, the Indian restaurants and Cult n' Art
          offer something for everyone.
        </p>
      </section>

      <section>
        <h2>Related guides</h2>
        <p>
          <a href="/blog/best-wellness-spots-lagos">
            10 Best Wellness Spots in Lagos
          </a>{" "}
          - where to practise yoga, pilates, and recover.
        </p>
        <p>
          <a href="/blog/fitness-things-to-do-lagos">
            Top 10 Things to Do in Lagos for Fitness Lovers
          </a>{" "}
          - surf, hike, kayak, and active experiences.
        </p>
        <p>
          <a href="/blog/digital-nomad-yoga-pilates-lagos">
            Best Yoga and Pilates for Digital Nomads
          </a>{" "}
          - practical guide for remote workers in Lagos.
        </p>
      </section>
    </SeoPageShell>
  );
}
