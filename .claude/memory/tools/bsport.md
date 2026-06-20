# Bsport (booking platform)

Heat Lagos runs all scheduling and bookings on Bsport. The owner uses it daily.

## Identifiers (not secret)
- 2026-06-20 — Company ID `5821` — Heat Lagos on Bsport (from the website booking widget).
- 2026-06-20 — Establishment ID `19572` — confirmed live via the API.
- 2026-06-20 — API base `https://api.production.bsport.io` — found in cdn.bsport.io widget.js.
- 2026-06-20 — Booking/pass links use host `backoffice.bsport.io`
  (e.g. `/customer/payment/pass/<id>/?membership=5821`).
- 2026-06-20 — Bsport mobile app: iOS id1356621554, Android com.bsport.

## API key (value NOT here — secrets never go in git)
- 2026-06-20 — The owner has provided the Bsport API key before; a prior session failed to
  persist it and it was lost when the container was wiped. When re-provided, save it to
  D1 `creds` key `BSPORT_API_KEY` AND as Worker secret `BSPORT_API_KEY`. Then it survives.
  NEVER write the value into this file. Check D1 first before ever asking the owner again.

## Endpoints (probed from the Worker; this sandbox container is network-blocked from Bsport)
- 2026-06-20 — `GET /core-data/v1/establishment/?company=5821` → 200, no auth. Returns
  establishment 19572. Proves public reads work without a key.
- 2026-06-20 — `GET /core-data/v1/company/5821/` → 403 (needs auth).
- 2026-06-20 — Exact schedule/session resource name not yet confirmed; reads are open, so
  a live-schedule feature is buildable once that resource is identified.
- 2026-06-20 — WRITE actions (cancel/book a class) require the authenticated API key.

## Why this matters
- Goal: member DMs "cancel me today" → Worker fires a webhook/email → a scheduled agent
  calls Bsport with the key and cancels → bot confirms the refund. Needs the write key.
