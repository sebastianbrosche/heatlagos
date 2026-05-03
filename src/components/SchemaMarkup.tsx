const BASE = "https://www.heatlagos.com";
const STUDIO_ID = `${BASE}/#studio`;

const STUDIO = {
  "@type": ["HealthClub", "LocalBusiness"],
  "@id": STUDIO_ID,
  name: "Heat Lagos",
  alternateName: "Heat Lagos — Infrared Heated Studio",
  url: BASE,
  image: `${BASE}/og-image.png`,
  logo: `${BASE}/logo%20heat.png`,
  description:
    "Infrared-heated Pilates, Yoga, Sculpt, Mobility, Recovery and Yin studio in Lagos, Portugal. English-speaking instructors, classes for active locals, expats and travellers.",
  telephone: "+351927290812",
  email: "hello@heatlagos.com",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  paymentAccepted: "Credit Card, Debit Card, Apple Pay, Google Pay",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Edificio da Fabrica da Ribeira, Av. dos Descobrimentos, Loja G",
    addressLocality: "Lagos",
    addressRegion: "Faro",
    postalCode: "8600-854",
    addressCountry: "PT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 37.098189,
    longitude: -8.6688908,
  },
  areaServed: [
    { "@type": "City", name: "Lagos" },
    { "@type": "Place", name: "Praia da Luz" },
    { "@type": "Place", name: "Burgau" },
    { "@type": "City", name: "Portimão" },
    { "@type": "AdministrativeArea", name: "Algarve" },
  ],
  sameAs: [
    "https://www.instagram.com/heat_lagos/",
    "https://www.facebook.com/profile.php?id=61588436283019",
  ],
  knowsLanguage: ["en"],
  amenityFeature: [
    {
      "@type": "LocationFeatureSpecification",
      name: "Infrared heating",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Mats and equipment provided",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "Showers / changing rooms",
      value: true,
    },
    {
      "@type": "LocationFeatureSpecification",
      name: "English-speaking instructors",
      value: true,
    },
  ],
};

const SERVICES = [
  {
    name: "Heat Pilates",
    description:
      "Slow, precise infrared-heated mat Pilates that builds deep strength, control and core connection. 50 minutes.",
    serviceType: "Pilates class",
  },
  {
    name: "Heat Sculpt",
    description:
      "Full-body strength class with weights and resistance props in an infrared-heated room. 50 minutes.",
    serviceType: "Sculpt class",
  },
  {
    name: "Heat Power",
    description:
      "Physically demanding heated yoga that meets you where you are. Strong, breath-led and grounding. 60 minutes.",
    serviceType: "Power yoga class",
  },
  {
    name: "Heat Flow",
    description:
      "Creative, breath-led yoga sequences in an infrared-heated room. Warm, fluid and connected. 60 minutes.",
    serviceType: "Flow yoga class",
  },
  {
    name: "Heat Mobility",
    description:
      "Targeted joint and tissue work to improve range of motion and free up restricted movement. 45 minutes.",
    serviceType: "Mobility class",
  },
  {
    name: "Heat Recovery",
    description:
      "Mobility, breathwork, long yin holds and guided deep rest layered into a single restorative class. 45 minutes.",
    serviceType: "Recovery class",
  },
  {
    name: "Heat Yin",
    description:
      "Long, still holds that reach the deeper layers of the body. Meditative and unhurried. 60 minutes.",
    serviceType: "Yin yoga class",
  },
];

const OFFERS = [
  {
    name: "Intro Offer",
    price: "79",
    description: "2 weeks unlimited for new students.",
  },
  {
    name: "Summer Membership",
    price: "390",
    description: "3 months unlimited for the full Lagos summer.",
  },
  {
    name: "12 Month Membership",
    price: "125",
    description: "Rolling monthly subscription, unlimited classes. Lowest monthly rate.",
    unit: "month",
  },
  {
    name: "1 Month Unlimited",
    price: "160",
    description: "One-off monthly unlimited, no subscription commitment.",
  },
  {
    name: "Yearly Membership",
    price: "1200",
    description: "Annual unlimited paid up front. Save €300 versus the 12-month plan.",
  },
  {
    name: "10 Class Package",
    price: "180",
    description: "Flexible 10-pack, valid for 3 months.",
  },
  {
    name: "Vacation Week",
    price: "59",
    description: "7 days unlimited for travellers staying in Lagos.",
  },
  {
    name: "Single Drop-in",
    price: "22",
    description: "One class, no commitment.",
  },
];

const FAQS = [
  {
    question: "What is an infrared heated class?",
    answer:
      "An infrared heated class uses radiant heat panels that warm the body directly rather than blowing hot air around the room. The studio sits at around 30°C, which supports a strong, focused practice with lower humidity than traditional hot yoga.",
  },
  {
    question: "How is infrared different from regular hot yoga?",
    answer:
      "Traditional hot yoga is usually heated to 40°C or more with forced air. Our infrared studio runs at around 30°C, which feels gentler and is easier to breathe in, while still warming muscles deeply for movement and recovery.",
  },
  {
    question: "How hot is the studio?",
    answer:
      "Around 30°C — warm enough to feel the heat working through the muscles, but not as intense as traditional hot yoga rooms.",
  },
  {
    question: "Do I need experience to join a class?",
    answer:
      "No. We welcome complete beginners alongside experienced students. Our teachers offer options for every level inside each class, so you can start where you are and progress over time.",
  },
  {
    question: "Which class should I choose if I want strength?",
    answer:
      "Start with Heat Pilates, Heat Sculpt or Heat Power. Pilates builds deep core and stabiliser strength, Sculpt adds weights and resistance for a full-body session, and Power is a physically demanding heated yoga.",
  },
  {
    question: "Which class should I choose if I need recovery?",
    answer:
      "Heat Mobility, Heat Recovery and Heat Yin are the best place to start. They are slower, gentler, and built around joint work, breath and stillness — ideal after surfing, running, gym training, or a stressful week.",
  },
  {
    question: "Are all classes taught in English?",
    answer:
      "Yes. Every class at Heat Lagos is taught in English. We are built for the international community living in and visiting the Algarve.",
  },
  {
    question: "Can I join a class while on holiday in Lagos?",
    answer:
      "Yes. We offer single drop-ins, a 7-day Vacation Week pass, and a 2-week Intro Offer. All make it easy to join while you are visiting Lagos, Luz, Burgau or Portimão.",
  },
];

export default function SchemaMarkup() {
  const graph = [
    STUDIO,
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Heat Lagos",
      publisher: { "@id": STUDIO_ID },
      inLanguage: "en",
    },
    {
      "@type": "OfferCatalog",
      "@id": `${BASE}/#memberships`,
      name: "Heat Lagos memberships",
      itemListElement: OFFERS.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        price: offer.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        url: `${BASE}/#memberships`,
        seller: { "@id": STUDIO_ID },
      })),
    },
    ...SERVICES.map((service) => ({
      "@type": "Service",
      name: service.name,
      serviceType: service.serviceType,
      description: service.description,
      provider: { "@id": STUDIO_ID },
      areaServed: { "@id": STUDIO_ID },
    })),
    {
      "@type": "FAQPage",
      "@id": `${BASE}/#faq`,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
