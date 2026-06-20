# Cloudflare

All Heat Lagos infrastructure is on Cloudflare. Never use Vercel.

## Token (value NOT here — secrets never go in git)
- 2026-06-20 — Canonical Cloudflare API token lives in D1 `creds` key `CF_TOKEN`. It works
  for BOTH Workers and Pages. Read it from D1, then run wrangler as
  `CLOUDFLARE_API_TOKEN=<that value> npx wrangler ...`. User wants ONE broad reusable
  token, never scoped ones.
- 2026-06-20 — Account ID `cb8ab13b857925cdb9b3c0fd9d4ec4bf` (not secret).

## DM bot Worker
- 2026-06-20 — Worker `heat-dm-bot` at `heat-dm-bot.sebastian-brosche.workers.dev`.
  Source `workers/heat-dm-bot/src/index.js`. Deploy from that dir with the token above.
- 2026-06-20 — Future domain (owner request, not done): `worker.heatlagos.com`.
- 2026-06-20 — KV namespace `TOKENS` id `9e1bd5c27a8c4cea8363fc13351bc5a6`.
- 2026-06-20 — D1 database `heat_ops` id `de98183a-1263-46d6-a62b-f05d66f7486f`.

## Credential stores (where secrets actually live)
- 2026-06-20 — D1 `creds` table (k/v/note/updated_at) is the runtime credential store the
  Worker and agents read. NOT in git. Query via Cloudflare MCP `d1_database_query`. Save
  every new credential here. Worker also has its own secrets (`wrangler secret list`).
- RULE: memory files (this folder) are committed to git, so they hold pointers and IDs
  only, never secret values.
