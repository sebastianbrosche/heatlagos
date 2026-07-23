import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://www.heatlagos.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/checkin",
          // Paid A/B landings: keep for ads, hide from organic crawl (Y4B-916)
          "/hot-yoga-pilates-intro-offer-b",
          "/hot-yoga-pilates-intro-offer-c",
          "/hot-yoga-pilates-intro-offer-d",
          "/hot-yoga-pilates-intro-offer-e",
          "/hot-yoga-pilates-vacation-b",
          "/hot-yoga-pilates-vacation-c",
          "/hot-yoga-pilates-vacation-d",
          "/hot-yoga-pilates-vacation-e",
        ],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
