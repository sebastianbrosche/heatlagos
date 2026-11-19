/**
 * Black Week 2026 (Sebastian, 19 Nov 2026).
 * BSport coupon BLACK26 (id 150774): 25% off pass 782779 "1 Month Unlimited"
 * (160€ to 120€, one-off, no subscription) and pass 751509 "10 Class
 * Package" (180€ to 135€, valid 3 months). One use per member in total.
 * Coupon expiration_date 2026-11-27 in BSport.
 * Visible from Fri 20 Nov 00:00 Lisbon until Fri 27 Nov 23:59 Lisbon.
 * After the window the banner and card lines hide themselves. The payment
 * options themselves stay (never remove them).
 */
export const BLACK_WEEK = {
  code: "BLACK26",
  from: "2026-11-20T00:00:00+00:00",
  until: "2026-11-28T00:00:00+00:00",
  offers: [
    {
      id: "cta-black-week-1month",
      name: "1 Month Unlimited",
      price: "120€",
      wasPrice: "160€",
      detail: "One month of unlimited classes. No subscription.",
      href: "https://backoffice.bsport.io/customer/payment/pass/782779/?membership=5821&force=true",
    },
    {
      id: "cta-black-week-10class",
      name: "10 Class Package",
      price: "135€",
      wasPrice: "180€",
      detail: "10 classes, valid for 3 months.",
      href: "https://backoffice.bsport.io/customer/payment/pass/751509/?membership=5821&force=true",
    },
  ],
};
