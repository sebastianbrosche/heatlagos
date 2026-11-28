/**
 * December 2026 gift card (Stine proposal, approved 28 Nov 2026).
 * BSport gift card id 24423 "10 class package gift card (December)", 150 EUR,
 * Fixed, unlimited validity, card payment. It is a gift for someone else.
 * Redeemed at the studio as one normal 10 Class Package (pass 751509, 10 credits,
 * 3 months) billed at 150 EUR and paid with the gift card.
 * Visible Tue 1 Dec 00:00 Lisbon until Thu 31 Dec 23:59 Lisbon (until is exclusive,
 * Fri 1 Jan 2027 00:00 Lisbon, UTC+0 in winter).
 * REMOVE at the end of December: delete this file, GiftCardBanner and its two uses
 * (src/app/page.tsx, src/app/book/page.tsx), and set BSport gift card 24423 disabled.
 * Do not touch any other offer.
 */
export const GIFT_CARD_DEC = {
  from: "2026-12-01T00:00:00+00:00",
  until: "2027-01-01T00:00:00+00:00",
  id: "cta-gift-card-10class",
  name: "10 Class Package gift card",
  price: "150€",
  wasPrice: "180€",
  detail:
    "Give someone 10 classes at Heat, valid for 3 months once they start. A gift for someone else, so it cannot be used by the buyer.",
  href: "https://backoffice.bsport.io/checkout/5821/giftcard/24423?force=true",
};
