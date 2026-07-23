import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.heatlagos.com";

/** Money / class landings */
const LANDINGS: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/infrared-classes-lagos", priority: 0.9, changeFrequency: "monthly" },
  { path: "/pilates-lagos-portugal", priority: 0.9, changeFrequency: "monthly" },
  { path: "/yoga-lagos-portugal", priority: 0.9, changeFrequency: "monthly" },
  { path: "/mobility-class-lagos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/muscle-recovery-surfing-lagos", priority: 0.8, changeFrequency: "monthly" },
  { path: "/things-to-do-lagos-wellness", priority: 0.7, changeFrequency: "monthly" },
  { path: "/why-infrared", priority: 0.8, changeFrequency: "monthly" },
  { path: "/bikram-yoga-lagos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/b2b-wellness-partnerships", priority: 0.8, changeFrequency: "monthly" },
  // Canonical offer pages only (A/B letter variants are noindex + kept out of sitemap)
  { path: "/hot-yoga-pilates-intro-offer", priority: 0.9, changeFrequency: "weekly" },
  { path: "/hot-yoga-pilates-vacation", priority: 0.9, changeFrequency: "weekly" },
  // GBP / Maps booking target (domain shows as heatlagos.com; page owns the choice UI)
  { path: "/book", priority: 0.95, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.9, changeFrequency: "weekly" },
];

// All blog posts under src/app/blog/<slug>/page.tsx
const BLOG_POSTS = [
  "mobility-class-what-to-expect",
  "sculpt-class-lagos",
  "pilates-for-beginners-lagos",
  "parking-lagos-guide",
  "yoga-lagos-guide",
  "hot-yoga-vs-infrared",
  "lagos-wellness-visitor-guide",
  "best-yoga-studios-lagos",
  "best-pilates-studios-lagos",
  "best-wellness-spots-lagos",
  "surf-recovery-lagos",
  "fitness-things-to-do-lagos",
  "digital-nomad-yoga-pilates-lagos",
  "boutique-fitness-lagos",
  "infrared-yoga-algarve",
  "golf-lagos-algarve",
  "healthy-cafes-lagos",
  "yoga-for-surfers-recovery",
  "reformer-pilates-lagos",
  "hot-yoga-lagos",
  "pilates-near-me-lagos",
  "yoga-near-me-lagos",
  "gym-lagos-portugal",
  // were live but missing from sitemap (Y4B-916)
  "infrared-pilates-vs-regular",
  "first-hot-yoga-class-lagos",
  "bikram-yoga-lagos-guide",
  "2027-boutique-fitness-trends-heavy-weights",
  "weighted-pilates-dumbbells",
  "what-is-sculpt-barre",
  "pilates-hiit-explained",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const landings = LANDINGS.map((item) => ({
    url: `${BASE}${item.path === "/" ? "/" : item.path}`,
    lastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));

  const posts = BLOG_POSTS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...landings, ...posts];
}
