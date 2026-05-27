import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "Blog — Wellness, Yoga & Pilates in Lagos",
  description:
    "Guides, insights and honest stories about yoga, pilates, infrared training and wellness life in Lagos, Portugal. Written by the Heat Lagos team.",
  alternates: {
    canonical: "https://www.heatlagos.com/blog",
  },
  openGraph: {
    type: "website",
    url: "https://www.heatlagos.com/blog",
    title: "Blog — Wellness, Yoga & Pilates in Lagos | Heat Lagos",
    description:
      "Guides and stories about yoga, pilates, infrared training and wellness in Lagos, Portugal.",
  },
};

const posts = [
  {
    slug: "best-yoga-studios-lagos",
    title: "10 Best Yoga Studios in Lagos, Portugal (2026)",
    excerpt:
      "The honest top 10 yoga studios in Lagos, ranked by class variety, teacher quality, and what makes each one worth visiting. No sponsorships, no pay-to-play.",
    date: "May 26, 2026",
    category: "Lagos Rankings",
  },
  {
    slug: "best-pilates-studios-lagos",
    title: "10 Best Pilates Studios in Lagos, Portugal (2026)",
    excerpt:
      "The honest top 10 pilates studios in Lagos, ranked by equipment, teacher quality, and what makes each one different. No sponsorships, no pay-to-play.",
    date: "May 26, 2026",
    category: "Lagos Rankings",
  },
  {
    slug: "best-wellness-spots-lagos",
    title: "10 Best Wellness Spots in Lagos for Yoga, Pilates and Recovery",
    excerpt:
      "The top wellness spots in Lagos - yoga, pilates, massage, sauna, and recovery. Ranked by what each offers and who it suits.",
    date: "May 26, 2026",
    category: "Lagos Wellness",
  },
  {
    slug: "surf-recovery-lagos",
    title: "10 Best Surf Recovery Classes in Lagos, Portugal (2026)",
    excerpt:
      "The best yoga, pilates, massage, and recovery options in Lagos for surfers. Where to recover between sessions and prevent injury.",
    date: "May 26, 2026",
    category: "Surf Recovery",
  },
  {
    slug: "fitness-things-to-do-lagos",
    title: "Top 10 Things to Do in Lagos for Fitness Lovers",
    excerpt:
      "The best active experiences in Lagos, Portugal. Surf, hike, kayak, yoga, and more. For travellers who want to move.",
    date: "May 26, 2026",
    category: "Active Lagos",
  },
  {
    slug: "digital-nomad-yoga-pilates-lagos",
    title: "Best Yoga and Pilates for Digital Nomads in Lagos, Portugal (2026)",
    excerpt:
      "A practical guide to yoga, pilates, and staying active in Lagos as a digital nomad. Drop-in friendly, no memberships, flexible schedules.",
    date: "May 26, 2026",
    category: "Digital Nomads",
  },
  {
    slug: "golf-lagos-algarve",
    title: "Golf in Lagos, Portugal: Best Courses and Where to Play",
    excerpt:
      "Palmares, Espiche, Boavista — the honest breakdown of where to play, what it costs, and how to recover after 18 holes.",
    date: "May 26, 2026",
    category: "Golf",
  },
  {
    slug: "boutique-fitness-lagos",
    title: "10 Best Boutique Fitness Studios in Lagos, Portugal (2026)",
    excerpt:
      "The best boutique fitness studios in Lagos. Small classes, specialised training, and premium experiences. Ranked honestly.",
    date: "May 26, 2026",
    category: "Boutique Fitness",
  },
  {
    slug: "infrared-yoga-algarve",
    title: "Where to Find the Best Infrared Yoga and Pilates in the Algarve",
    excerpt:
      "A guide to infrared-heated yoga and pilates across the Algarve. Where to find it, how it works, and what the alternatives are.",
    date: "May 26, 2026",
    category: "Infrared Fitness",
  },
  {
    slug: "healthy-cafes-lagos",
    title: "10 Best Healthy Cafes and Spots to Eat After Yoga in Lagos",
    excerpt:
      "The best healthy cafes and restaurants in Lagos, Portugal. Vegetarian, vegan, and post-workout food worth eating.",
    date: "May 26, 2026",
    category: "Healthy Food",
  },
  {
    slug: "yoga-lagos-guide",
    title: "The Complete Guide to Yoga in Lagos, Portugal (2026)",
    excerpt:
      "An honest breakdown of every yoga studio in Lagos, what they offer, and how to find the right class for your body and your schedule.",
    date: "May 25, 2026",
    category: "Lagos Guide",
  },
  {
    slug: "hot-yoga-vs-infrared",
    title: "Hot Yoga vs Infrared Yoga: What's Actually the Difference?",
    excerpt:
      "Traditional hot yoga blasts you at 40°C. Infrared yoga warms you from the inside at 30°C. Here's what that means for your body, your breath and your practice.",
    date: "May 25, 2026",
    category: "Infrared Science",
  },
  {
    slug: "lagos-wellness-visitor-guide",
    title: "Where to Work Out in Lagos: A Guide for Visitors and New Residents",
    excerpt:
      "Surf in the morning, recover in the evening. A practical wellness itinerary for anyone visiting Lagos for a week, a month, or a season.",
    date: "May 25, 2026",
    category: "Visitor Guide",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <Marquee />
      <main className="px-5 sm:px-6 lg:px-20 pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-brand sm:text-[11px]">
            From the studio
          </p>
          <h1 className="font-serif text-[2.2rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
            Heat Blog
          </h1>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed sm:mt-8 sm:text-xl">
            Guides, insights and honest stories about yoga, pilates, infrared
            training and wellness life in Lagos, Portugal. Written by the team at
            Heat Lagos.
          </p>

          <div className="mt-16 flex flex-col gap-12 sm:mt-20 sm:gap-16">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group border-t border-white/10 pt-8 sm:pt-10"
              >
                <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-foreground/50">
                  <span className="text-brand">{post.category}</span>
                  <span>·</span>
                  <span>{post.date}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <h2 className="font-serif text-2xl leading-tight transition-colors group-hover:text-brand sm:text-3xl">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-4 text-foreground/70 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-brand transition-colors hover:text-brand-soft"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
