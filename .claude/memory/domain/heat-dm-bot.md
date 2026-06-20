# Heat DM bot

Cloudflare Worker that auto-replies to DMs on Instagram, Messenger and WhatsApp.
Source: `workers/heat-dm-bot/src/index.js`. One file, kept simple.

## State / control
- 2026-06-20 — Kill switch: KV `BOT_ENABLED` must equal `"true"` to send. Anything else =
  paused (fail-safe OFF). Currently PAUSED; learning capture still runs while paused.
- 2026-06-20 — No separate staging env. We refine answers by roleplay + the test endpoint.

## How replies work
- 2026-06-20 — System prompt holds all studio facts. Bot replies ONLY when it has a clear
  grounded answer; otherwise it outputs `NO_ANSWER` and the Worker sends nothing, so Stine
  answers personally and the bot learns. Verified working (e.g. refund question stays silent).
- 2026-06-20 — Learning loop: Stine's manual replies captured as pending Q&A in D1 `learned`,
  approved at the /learned page, then reused by keyword match.

## Admin URLs (key is KV `LEARN_KEY`, currently `hl_aprv_7Kq2m9Vx4Zt8`)
- `/learned?key=...` — approve/reject learned answers.
- `/admin/test?key=...&q=...` — ask the live bot a question, see its real reply (sends nothing).
- `/admin/scan-dms?key=...` — pull recent IG conversations into `learned` as pending.
- `/admin/bsport-probe?key=...` — probe Bsport endpoints from the Worker.

## Roadmap
- 2026-06-20 — Live schedule reads from Bsport (no key needed). Bot-driven class
  cancellation needs the Bsport write API key (see tools/bsport.md).
- 2026-06-20 — Messenger needs META_PAGE_TOKEN; WhatsApp needs a permanent System User token.
