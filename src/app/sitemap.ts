import type { MetadataRoute } from "next";

const BASE = "https://www.heatlagos.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE}/infrared-classes-lagos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/pilates-lagos-portugal`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/yoga-lagos-portugal`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE}/mobility-class-lagos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/muscle-recovery-surfing-lagos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/things-to-do-lagos-wellness`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
