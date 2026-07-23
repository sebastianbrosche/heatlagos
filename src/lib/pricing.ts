export type Plan = {
  id?: string;
  name: string;
  price: string;
  wasPrice?: string;
  unit?: string;
  description: string;
  badge?: string;
  highlight?: boolean;
  glow?: boolean;
  note?: string;
  href?: string;
};

/** Homepage + /book — single source of truth for pass checkout links. */
export const PLANS: Plan[] = [
  {
    id: "cta-intro-offer",
    name: "2 for 1 Intro Offer",
    price: "79€",
    description:
      "Two weeks of unlimited access to every class. The best way to try the studio.",
    badge: "Start here",
    note: "New students",
    highlight: true,
    href: "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true",
  },
  {
    id: "cta-12month",
    name: "12 Month Membership",
    price: "125€",
    unit: "/month",
    description: "Our lowest monthly rate. Rolling subscription, unlimited classes.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751520/?membership=5821&force=true",
  },
  {
    id: "cta-essential",
    name: "Essential Membership",
    price: "95€",
    unit: "/month",
    description:
      "8 classes a month on a rolling subscription. Ideal if you train twice a week and want a set routine.",
    note: "8 classes / month",
    href: "https://backoffice.bsport.io/customer/payment/pass/766154/?membership=5821&force=true",
  },
  {
    id: "cta-1month",
    name: "1 Month Unlimited",
    price: "99€",
    wasPrice: "160€",
    description:
      "X-mas is July! 30 days unlimited, one-off, no subscription. Expires 31 July. Save 61€.",
    badge: "Great value",
    highlight: true,
    href: "https://backoffice.bsport.io/customer/payment/pass/751517/?membership=5821&force=true",
  },
  {
    id: "cta-yearly",
    name: "Yearly",
    price: "1 200€",
    description: "Pay up front and save 300€ compared to the 12-month plan.",
    note: "Save 300€",
    href: "https://backoffice.bsport.io/customer/payment/pass/751518/?membership=5821&force=true",
  },
  {
    id: "cta-10class",
    name: "10 Class Package",
    price: "180€",
    description: "Flexible 10-pack for regulars who want variety.",
    note: "Valid for 3 months",
    href: "https://backoffice.bsport.io/customer/payment/pass/751509/?membership=5821&force=true",
  },
  {
    id: "cta-vacation-week",
    name: "Vacation Week",
    price: "59€",
    description: "7 days unlimited - designed for travelers staying in Lagos.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751519/?membership=5821&force=true",
  },
  {
    id: "cta-drop-in",
    name: "Single Drop-in",
    price: "22€",
    description: "One class, no commitment.",
    href: "https://backoffice.bsport.io/customer/payment/pass/766017/?membership=5821&force=true",
  },
];

export function planById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}
