/** Hub-and-spoke map for Heat Lagos local SEO (Y4B-914). */

export type ClusterLink = { href: string; label: string };

export const LANDINGS = {
  infrared: {
    href: "/infrared-classes-lagos",
    label: "Infrared classes in Lagos",
  },
  pilates: {
    href: "/pilates-lagos-portugal",
    label: "Pilates in Lagos, Portugal",
  },
  yoga: {
    href: "/yoga-lagos-portugal",
    label: "Yoga in Lagos, Portugal",
  },
  mobility: {
    href: "/mobility-class-lagos",
    label: "Mobility class in Lagos",
  },
  surf: {
    href: "/muscle-recovery-surfing-lagos",
    label: "Surf recovery in Lagos",
  },
  bikram: {
    href: "/bikram-yoga-lagos",
    label: "Bikram / 26&2 yoga with Nadine",
  },
  intro: {
    href: "/hot-yoga-pilates-intro-offer",
    label: "Two-week intro offer",
  },
  blog: {
    href: "/blog",
    label: "All Heat Lagos guides",
  },
} as const;

export type ClusterConfig = {
  landings: ClusterLink[];
  related: ClusterLink[];
};

/**
 * Per-post spokes. Every post gets landings (class money pages) + 3–5 related
 * posts. Hubs for broad queries (yoga lagos, pilates lagos) are the ranking lists
 * + near-me guides; class product pages sit one hop away.
 */
export const BLOG_CLUSTER: Record<string, ClusterConfig> = {
  "bikram-yoga-lagos-guide": {
    landings: [LANDINGS.bikram, LANDINGS.yoga, LANDINGS.intro],
    related: [
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/hot-yoga-vs-infrared", label: "Hot yoga vs infrared" },
      { href: "/blog/first-hot-yoga-class-lagos", label: "First hot yoga class in Lagos" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios in Lagos" },
    ],
  },
  "hot-yoga-lagos": {
    landings: [LANDINGS.yoga, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/first-hot-yoga-class-lagos", label: "First hot yoga class in Lagos" },
      { href: "/blog/hot-yoga-vs-infrared", label: "Hot yoga vs infrared" },
      { href: "/blog/bikram-yoga-lagos-guide", label: "Bikram yoga in Lagos, explained" },
      { href: "/blog/yoga-near-me-lagos", label: "Yoga classes near me in Lagos" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios in Lagos" },
    ],
  },
  "first-hot-yoga-class-lagos": {
    landings: [LANDINGS.yoga, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/hot-yoga-vs-infrared", label: "Hot yoga vs infrared" },
      { href: "/blog/bikram-yoga-lagos-guide", label: "Bikram yoga in Lagos, explained" },
      { href: "/blog/pilates-for-beginners-lagos", label: "Pilates for beginners" },
    ],
  },
  "hot-yoga-vs-infrared": {
    landings: [LANDINGS.infrared, LANDINGS.yoga, LANDINGS.intro],
    related: [
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/infrared-yoga-algarve", label: "Infrared yoga in the Algarve" },
      { href: "/blog/infrared-pilates-vs-regular", label: "Infrared vs regular Pilates" },
      { href: "/blog/first-hot-yoga-class-lagos", label: "First hot yoga class" },
    ],
  },
  "infrared-pilates-vs-regular": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/pilates-near-me-lagos", label: "Pilates near me in Lagos" },
      { href: "/blog/reformer-pilates-lagos", label: "Reformer vs mat Pilates" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios in Lagos" },
      { href: "/blog/hot-yoga-vs-infrared", label: "Hot yoga vs infrared" },
    ],
  },
  "infrared-yoga-algarve": {
    landings: [LANDINGS.infrared, LANDINGS.yoga, LANDINGS.intro],
    related: [
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/hot-yoga-vs-infrared", label: "Hot yoga vs infrared" },
      { href: "/blog/yoga-lagos-guide", label: "Yoga Lagos guide" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios" },
    ],
  },
  "yoga-near-me-lagos": {
    landings: [LANDINGS.yoga, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios in Lagos" },
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/yoga-lagos-guide", label: "Yoga Lagos guide" },
      { href: "/blog/yoga-for-surfers-recovery", label: "Yoga for surfers" },
    ],
  },
  "yoga-lagos-guide": {
    landings: [LANDINGS.yoga, LANDINGS.intro],
    related: [
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios in Lagos" },
      { href: "/blog/yoga-near-me-lagos", label: "Yoga near me in Lagos" },
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/boutique-fitness-lagos", label: "Boutique fitness in Lagos" },
    ],
  },
  "best-yoga-studios-lagos": {
    landings: [LANDINGS.yoga, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/yoga-near-me-lagos", label: "Yoga near me in Lagos" },
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/yoga-lagos-guide", label: "Yoga Lagos guide" },
    ],
  },
  "pilates-near-me-lagos": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios in Lagos" },
      { href: "/blog/pilates-for-beginners-lagos", label: "Pilates for beginners" },
      { href: "/blog/reformer-pilates-lagos", label: "Reformer vs mat Pilates" },
      { href: "/blog/infrared-pilates-vs-regular", label: "Infrared vs regular Pilates" },
    ],
  },
  "pilates-for-beginners-lagos": {
    landings: [LANDINGS.pilates, LANDINGS.intro],
    related: [
      { href: "/blog/pilates-near-me-lagos", label: "Pilates near me in Lagos" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/reformer-pilates-lagos", label: "Reformer vs mat" },
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
    ],
  },
  "reformer-pilates-lagos": {
    landings: [LANDINGS.pilates, LANDINGS.intro],
    related: [
      { href: "/blog/pilates-near-me-lagos", label: "Pilates near me in Lagos" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/infrared-pilates-vs-regular", label: "Infrared vs regular Pilates" },
      { href: "/blog/pilates-for-beginners-lagos", label: "Pilates for beginners" },
    ],
  },
  "best-pilates-studios-lagos": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/pilates-near-me-lagos", label: "Pilates near me in Lagos" },
      { href: "/blog/reformer-pilates-lagos", label: "Reformer vs mat Pilates" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios" },
      { href: "/blog/infrared-pilates-vs-regular", label: "Infrared vs regular Pilates" },
    ],
  },
  "sculpt-class-lagos": {
    landings: [LANDINGS.infrared, LANDINGS.pilates, LANDINGS.intro],
    related: [
      { href: "/blog/2027-boutique-fitness-trends-heavy-weights", label: "2027 trend: Pilates meets heavy weights" },
      { href: "/blog/pilates-for-beginners-lagos", label: "Pilates for beginners" },
      { href: "/blog/boutique-fitness-lagos", label: "Boutique fitness in Lagos" },
      { href: "/blog/gym-lagos-portugal", label: "Gym options in Lagos" },
    ],
  },
  "2027-boutique-fitness-trends-heavy-weights": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/weighted-pilates-dumbbells", label: "Weighted Pilates with dumbbells" },
      { href: "/blog/what-is-sculpt-barre", label: "What is sculpt barre" },
      { href: "/blog/sculpt-hiit-class", label: "Sculpt HIIT explained" },
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
    ],
  },
  "weighted-pilates-dumbbells": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/2027-boutique-fitness-trends-heavy-weights", label: "2027 trend: Pilates meets heavy weights" },
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
      { href: "/blog/infrared-pilates-vs-regular", label: "Infrared vs regular Pilates" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios in Lagos" },
    ],
  },
  "what-is-sculpt-barre": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
      { href: "/blog/sculpt-hiit-class", label: "Sculpt HIIT explained" },
      { href: "/blog/weighted-pilates-dumbbells", label: "Weighted Pilates with dumbbells" },
      { href: "/blog/boutique-fitness-lagos", label: "Boutique fitness in Lagos" },
    ],
  },
  "sculpt-hiit-class": {
    landings: [LANDINGS.pilates, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
      { href: "/blog/what-is-sculpt-barre", label: "What is sculpt barre" },
      { href: "/blog/weighted-pilates-dumbbells", label: "Weighted Pilates with dumbbells" },
      { href: "/blog/mobility-class-what-to-expect", label: "Mobility class guide" },
    ],
  },
  "mobility-class-what-to-expect": {
    landings: [LANDINGS.mobility, LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class in Lagos" },
      { href: "/blog/yoga-for-surfers-recovery", label: "Yoga for surfers" },
      { href: "/blog/surf-recovery-lagos", label: "Surf recovery classes" },
      { href: "/blog/pilates-for-beginners-lagos", label: "Pilates for beginners" },
    ],
  },
  "yoga-for-surfers-recovery": {
    landings: [LANDINGS.surf, LANDINGS.yoga, LANDINGS.mobility],
    related: [
      { href: "/blog/surf-recovery-lagos", label: "Surf recovery in Lagos" },
      { href: "/blog/mobility-class-what-to-expect", label: "Mobility class guide" },
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
      { href: "/blog/best-wellness-spots-lagos", label: "Best wellness spots" },
    ],
  },
  "surf-recovery-lagos": {
    landings: [LANDINGS.surf, LANDINGS.mobility, LANDINGS.intro],
    related: [
      { href: "/blog/yoga-for-surfers-recovery", label: "Yoga for surfers" },
      { href: "/blog/mobility-class-what-to-expect", label: "Mobility class" },
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/best-wellness-spots-lagos", label: "Wellness spots in Lagos" },
    ],
  },
  "gym-lagos-portugal": {
    landings: [LANDINGS.infrared, LANDINGS.pilates, LANDINGS.intro],
    related: [
      { href: "/blog/2027-boutique-fitness-trends-heavy-weights", label: "2027 trend: Pilates meets heavy weights" },
      { href: "/blog/boutique-fitness-lagos", label: "Boutique fitness in Lagos" },
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
    ],
  },
  "boutique-fitness-lagos": {
    landings: [LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/2027-boutique-fitness-trends-heavy-weights", label: "2027 trend: Pilates meets heavy weights" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/sculpt-class-lagos", label: "Sculpt class" },
      { href: "/blog/gym-lagos-portugal", label: "Gym options in Lagos" },
    ],
  },
  "best-wellness-spots-lagos": {
    landings: [LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/healthy-cafes-lagos", label: "Healthy cafes in Lagos" },
      { href: "/blog/lagos-wellness-visitor-guide", label: "Visitor wellness guide" },
    ],
  },
  "lagos-wellness-visitor-guide": {
    landings: [LANDINGS.intro, LANDINGS.infrared],
    related: [
      { href: "/blog/parking-lagos-guide", label: "Parking in Lagos" },
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/best-wellness-spots-lagos", label: "Wellness spots" },
      { href: "/blog/digital-nomad-yoga-pilates-lagos", label: "Digital nomad guide" },
    ],
  },
  "fitness-things-to-do-lagos": {
    landings: [LANDINGS.infrared, LANDINGS.intro],
    related: [
      { href: "/blog/surf-recovery-lagos", label: "Surf recovery" },
      { href: "/blog/golf-lagos-algarve", label: "Golf in Lagos" },
      { href: "/blog/best-wellness-spots-lagos", label: "Wellness spots" },
      { href: "/blog/boutique-fitness-lagos", label: "Boutique fitness" },
    ],
  },
  "digital-nomad-yoga-pilates-lagos": {
    landings: [LANDINGS.pilates, LANDINGS.yoga, LANDINGS.intro],
    related: [
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios" },
      { href: "/blog/best-pilates-studios-lagos", label: "Best Pilates studios" },
      { href: "/blog/healthy-cafes-lagos", label: "Healthy cafes" },
    ],
  },
  "healthy-cafes-lagos": {
    landings: [LANDINGS.intro],
    related: [
      { href: "/blog/best-wellness-spots-lagos", label: "Wellness spots" },
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/digital-nomad-yoga-pilates-lagos", label: "Digital nomad guide" },
      { href: "/blog/lagos-wellness-visitor-guide", label: "Visitor guide" },
    ],
  },
  "golf-lagos-algarve": {
    landings: [LANDINGS.mobility, LANDINGS.surf, LANDINGS.intro],
    related: [
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/mobility-class-what-to-expect", label: "Mobility class" },
      { href: "/blog/surf-recovery-lagos", label: "Surf recovery" },
      { href: "/blog/best-wellness-spots-lagos", label: "Wellness spots" },
    ],
  },
  "parking-lagos-guide": {
    landings: [LANDINGS.intro],
    related: [
      { href: "/blog/lagos-wellness-visitor-guide", label: "Visitor wellness guide" },
      { href: "/blog/fitness-things-to-do-lagos", label: "Fitness things to do" },
      { href: "/blog/best-yoga-studios-lagos", label: "Best yoga studios" },
      { href: "/blog/hot-yoga-lagos", label: "Hot yoga in Lagos" },
    ],
  },
};

export function getCluster(slug: string): ClusterConfig | null {
  return BLOG_CLUSTER[slug] ?? null;
}
