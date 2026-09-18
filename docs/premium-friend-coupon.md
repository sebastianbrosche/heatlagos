# Heat Lagos - Premium member monthly friend coupon

**Status:** Worker live. Automator schedule not armed until Stine confirms (Heat Stine gate).
**Owner ask:** Sebastian, 18 Sep 2026.

## What it does

On the 1st of each month (Europe/Lisbon morning), each **premium member** gets one email with a **single-use** BSport promo code.

- Friend uses the code for **one free Drop-in class** (pass `766017`).
- New code every month. Prior-month Heat Friend codes are deactivated on the next run.
- Codes are BSport-native (`POST /api/v1/coupon/`), 100% off, `usage_total=1`.

## Premium definition (company 5821)

Anyone with a **non-disabled, non-expired** client pass on:

| Pass ID | Product |
|--------:|---------|
| 751518 | Yearly Unlimited €990 |
| 796836 | Yearly Unlimited €990 (alternate template) |
| 751520 | 12-Month Unlimited Commitment €125/mo |

Product id `46737` from the brief maps to the commitment offer; entitlement is resolved via pass `751520`.

## Worker

- Name: `heat-friend-coupon`
- URL: `https://heat-friend-coupon.sebastian-brosche.workers.dev`
- Same-origin: `https://www.heatlagos.com/api/friend-coupon/*`
- KV: `heat-friend-coupons` (`55d4e4be5fc34aebb79dda5794e88beb`)
- **No Cloudflare cron.** Automator owns the schedule.

### Endpoints

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/health` | no | Liveness |
| GET | `/members` | `x-cron-secret` | List premium members |
| GET | `/validate?code=` | no | Front-desk / staff check |
| POST | `/run` | `x-cron-secret` | Monthly issue + email |

### POST /run body

```json
{
  "mode": "test",
  "month": "2026-09",
  "dry_run": false,
  "force": false,
  "test_email": "sebastian.brosche@gmail.com"
}
```

- `mode=test` (default): creates real BSport coupons for all premium members, emails **only Sebastian** once (first coupon) with `[TEST]` subject. Stine gate still required before live.
- `mode=live`: emails each premium member at their BSport email. **Do not use until Stine confirms.**
- `dry_run=true`: list only, no coupons, no email.
- `force=true`: re-issue even if KV already has `issue:YYYY-MM:clientId`.

### Secrets

```
npx wrangler secret put BSPORT_API_TOKEN --name heat-friend-coupon
npx wrangler secret put BSPORT_JWT_TOKEN --name heat-friend-coupon
npx wrangler secret put RESEND_API_KEY --name heat-friend-coupon
npx wrangler secret put CRON_SECRET --name heat-friend-coupon
npx wrangler secret put AGENTMAIL_API_KEY --name heat-friend-coupon
npx wrangler secret put AGENTMAIL_INBOX_ID --name heat-friend-coupon
# optional: MAIL_PROVIDER=auto|resend|agentmail
```

Optional: `TEST_EMAIL`, `BSPORT_SESSION_TOKEN` (alias for classic token).

From address matches Heat daily mail: `Heat Lagos <daily@heatlagos.com>` via Resend.

## Redemption (friend / front desk)

1. Friend opens [heatlagos.com/book](https://www.heatlagos.com/book) or pays at the desk for **Drop-in (Single class)** (€22 / pass `766017`).
2. Enter the promo code at checkout (online) or staff applies it on-site in BSport billing.
3. Code is **one use**, 100% off that Drop-in only, expires end of the issue month.
4. Staff can pre-check:  
   `GET https://www.heatlagos.com/api/friend-coupon/validate?code=HEATFRIEND...`  
   Returns `valid`, `reason` (`ok` / `already_used` / `expired` / `inactive` / `not_found`), and expiry.

BSport increments `nb_discounts` when the code is consumed; the Worker does not need a separate redeem write for checkout redemptions.

## Automator handoff

**Schedule:** `0 9 1 * *` (09:00 on the 1st) timezone **Europe/Lisbon**.

**Prompt / action:**

1. Confirm Stine gate: live blast only after Stine email OK. Until then keep `mode=test`.
2. `POST https://heat-friend-coupon.sebastian-brosche.workers.dev/run`  
   Headers: `content-type: application/json`, `x-cron-secret: <CRON_SECRET>`  
   Body: `{"mode":"test"}` until armed; then `{"mode":"live"}`.
3. On non-2xx or `created`/`emailed` anomalies, notify Sebastian.
4. Do **not** put this cron on Delegator or on the Worker.

**Stine gate (locked):** no mass member email until Stine Hegre confirms by email. Test path to Sebastian first.


## Email transport

1. **Resend** from `Heat Lagos <daily@heatlagos.com>` (Heat daily pattern) when the domain is verified on the API key.
2. **Fallback: AgentMail** inbox `grok-yogaforbjj@agentmail.to` when Resend returns domain-unverified (observed 18 Sep 2026 on the box Resend key). Worker tries Resend first (`MAIL_PROVIDER=auto`), then AgentMail.

Before the first **live** blast: either verify `heatlagos.com` on Resend, or accept AgentMail as from-address for the launch. Set `MAIL_PROVIDER=resend` or `agentmail` to force one path.

### Test proof (18 Sep 2026, Europe/Lisbon morning)

- Premium query: **16** members (passes 751518 / 751520; 796836 unused).
- Created **16** BSport single-use coupons for Drop-in `766017`, expire `2026-09-30`.
- Test email to `sebastian.brosche@gmail.com` with code `HEATFRIEND2609T2WWUK` (coupon `140560`, member `sebastian@yogaforbjj.net`).
- Gmail: INBOX + UNREAD, subject `[TEST] Your Heat friend class code for September 2026`.
- Validate: `https://www.heatlagos.com/api/friend-coupon/validate?code=HEATFRIEND2609T2WWUK` → `valid: true`.

## Deploy notes

```bash
cd workers/heat-friend-coupon
npx wrangler deploy
# secrets if missing (copy from heat-checkin / bsport-sync patterns)
```

Repo: `sebastianbrosche/heatlagos` under `workers/heat-friend-coupon/`.
Pages site deploy is unchanged; this is a Worker-only route.

## Success criteria checklist

- [x] Premium member query via management `client-passes` + classic member email
- [x] BSport-native single-use friend coupon (Drop-in 766017)
- [x] Test email path to Sebastian
- [x] Validate / redemption docs
- [x] Automator schedule documented (no Worker cron)
- [ ] Automator armed with `mode=live` after Stine OK
