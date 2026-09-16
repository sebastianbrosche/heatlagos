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
 * Do not restore 2 weeks unlimited without an explicit Sebastian ask.
 * That pass (Bsport 751566, 79€ → 39€ promo) was removed from this list
 * on purpose. The remaining intro path is 2 for 1 Intro Offer at 22€.
 *
 * Do not restore the prepaid annual pass (Bsport 751518) or the
 * twelve-month billed membership (Bsport 751520) without an
 * explicit Sebastian ask. Both were taken off this list on purpose.
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
