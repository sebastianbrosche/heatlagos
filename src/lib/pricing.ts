export type Plan = {
  id?: string;
  name: string;
  price: string;
  wasPrice?: string;
  unit?: string;
  /** Shown above the headline price when a compared rate is needed. */
  originalRate?: string;
  description: string;
  badge?: string;
  highlight?: boolean;
  glow?: boolean;
  note?: string;
  href?: string;
};

/**
 * Homepage + /book: single source of truth for pass checkout links.
 *
 * 23 Sep 2026 Sebastian: restore plain €79 two-week unlimited as a PAYMENT
 * option. Removing a temporary promo/banner is NOT permission to remove the
 * payment option. Never remove payment options without his explicit remove
 * plus a second confirm.
 *
 * Banned: €39 / 79→39 / 50%-off promo copy. Allowed: plain €79 (BSport
 * 751566 active; 751496 Intro Offer re-enable in BSport UI if needed).
 *
 * Free month-13 / 12+1 wording stays banned.
 * Do not advertise Yearly (€990, Bsport 751518) publicly; deal period over
 * as of 18 Sep 2026. Plain 12-Month Commitment (€125, Bsport 751520) stays.
 */
export const PLANS: Plan[] = [
  {
    id: "cta-2for1",
    name: "2 for 1 Intro Offer",
    price: "22€",
    description: "Two classes for 22€. Valid 14 days. New students.",
    note: "2 classes / 14 days",
    highlight: true,
    href: "https://backoffice.bsport.io/customer/payment/pass/751510/?membership=5821&force=true",
  },
  {
    id: "cta-2week",
    name: "2 Weeks Unlimited",
    price: "79€",
    description:
      "Two weeks of unlimited access to every class on the schedule.",
    note: "14 days unlimited",
    href: "https://backoffice.bsport.io/customer/payment/pass/751566/?membership=5821&force=true",
  },
  {
    id: "cta-12month",
    name: "12 Month Membership",
    price: "125€",
    unit: "/month",
    description:
      "Unlimited classes. Billed monthly for 12 months. 12-Month Commitment.",
    note: "12-Month Commitment",
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
    price: "160€",
    description: "One-off monthly unlimited, no subscription commitment.",
    href: "https://backoffice.bsport.io/customer/payment/pass/751517/?membership=5821&force=true",
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
