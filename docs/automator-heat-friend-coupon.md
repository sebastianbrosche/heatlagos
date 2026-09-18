# Automator: Heat premium friend coupon (arm after Stine)

**Schedule:** `0 9 1 * *` timezone `Europe/Lisbon` (09:00 on the 1st).

**Do not** put this cron on Delegator or as a Cloudflare Worker cron. Automator owns it.

## Action

`POST https://heat-friend-coupon.sebastian-brosche.workers.dev/run`

Headers:
- `content-type: application/json`
- `x-cron-secret: <CRON_SECRET from wrangler secret heat-friend-coupon>`

Body until Stine OK:
```json
{"mode":"test"}
```

Body after Stine email confirmation:
```json
{"mode":"live"}
```

## Gates

1. Heat Stine gate: no `mode=live` until Stine Hegre confirms by email.
2. Prefer Resend `daily@heatlagos.com` once domain verified; Worker auto-falls back to AgentMail.
3. On non-2xx or `created`/`emailed` mismatch vs `premiumCount`, notify Sebastian.

## Docs

`docs/premium-friend-coupon.md`
