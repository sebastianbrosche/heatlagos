# Memory index

Read this file at the start of every session. Load the others only when relevant.

Entry format everywhere: `date — what — why`.

## ⛏️ WHERE CREDENTIALS LIVE — READ THIS BEFORE LOOKING FOR ANY KEY

ALL secrets are stored in the **D1 `creds` table** (database `heat_ops`, id
`de98183a-1263-46d6-a62b-f05d66f7486f`). This is the toolbox. Do NOT hunt the repo, the
transcript, or env vars for a key. Go straight here.

How to read a credential value (via Cloudflare MCP):
`d1_database_query(database_id="de98183a-1263-46d6-a62b-f05d66f7486f", sql="SELECT v, note FROM creds WHERE k=?", params=["CF_TOKEN"])`

The Worker also has its own copies of the secrets it needs at runtime
(`CLOUDFLARE_API_TOKEN=<CF_TOKEN> npx wrangler secret list` from `workers/heat-dm-bot/`).

When the user gives a new credential: INSERT it into D1 `creds` immediately (and add it as
a Worker secret if the Worker needs it), then note its existence here. Secret VALUES never
go in these git-tracked memory files, only the pointer that they live in D1 `creds`.

### Inventory of keys currently in D1 `creds` (names only — values are in the table)
- Cloudflare: `CF_TOKEN` (canonical, Workers + Pages), `CLOUDFLARE_ACCOUNT_ID`, `D1_DB_ID`
- Anthropic: `ANTHROPIC_API_KEY`
- Meta/FB: `META_APP_ID`, `META_APP_SECRET`, `META_VERIFY_TOKEN`, `FB_PAGE_ID`, `BUSINESS_PORTFOLIO_ID`
- Instagram: `IG_APP_ID`, `IG_APP_SECRET`, `IG_HANDLE`
- WhatsApp: `WHATSAPP_PHONE_ID`, `WHATSAPP_WABA_ID`
- Bsport: `BSPORT_API_BASE`, `BSPORT_API_STATUS`. ⚠️ `BSPORT_API_KEY` is MISSING — owner
  provided it before but it was lost; must be re-pasted once and saved here.
- Worker/site: `WORKER_URL`, `WORKER_CUSTOM_DOMAIN`, `LEARN_URL`, `PRIVACY_URL`, `TERMS_URL`
- Status/roadmap rows: `STATUS_BOT`, `STATUS_WHATSAPP`, `STATUS_LEARNING`, `TODO_NEXT`,
  `CHANNELS_PENDING`, `TOWEL_POLICY`, `POLICY_TOKENS`, `EMAIL_TARGET`

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
