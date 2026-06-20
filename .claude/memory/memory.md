# Memory index

Read this file at the start of every session. Load the others only when relevant.

Entry format everywhere: `date — what — why`.

## Files
- `general.md` — environment, credential stores, standing user preferences.
- `tools/bsport.md` — Bsport API: base URL, company/establishment IDs, the API key, endpoints.
- `tools/cloudflare.md` — Cloudflare token, Worker, KV, D1 IDs and how to deploy.
- `domain/heat-dm-bot.md` — the DM bot: how it works, kill switch, learning loop, admin URLs.

## Most important standing facts
- 2026-06-20 — Credentials the user gives MUST be saved immediately to BOTH the right
  memory file here AND the runtime store (D1 `creds` table / Worker secret). Losing a
  credential the user already provided is the worst failure. Never ask for the same
  credential twice.
- 2026-06-20 — The bot must NEVER use em-dashes. Hard rule, in the bot prompt and in chat.
- 2026-06-20 — Never suggest the owner (Stine, the CEO) do work the bot/agent should do.
