# General

## Business
- 2026-06-20 — Heat Lagos: infrared-heated Pilates/Yoga/Sculpt/Mobility/Recovery studio in
  Lagos, Portugal. Owner Sebastian; Stine is the manager/CEO who answers DMs. The DM bot
  exists so Stine answers each "dumb" question once, then the bot handles it forever after.

## Standing preferences (the owner has stated these forcefully)
- 2026-06-20 — Always Cloudflare, never Vercel.
- 2026-06-20 — Bot must NEVER use em-dashes. Hard rule.
- 2026-06-20 — Never make Stine (the CEO) do work the bot/agent should do.
- 2026-06-20 — Never ask for a credential the owner already gave. Save it on first receipt
  to D1 `creds` + the relevant Worker secret, and record the pointer in memory. Check D1
  before asking for anything.
- 2026-06-20 — Keep code changes simple and minimal (see .claude/CLAUDE.md working agreement).

## Where things live
- 2026-06-20 — Secrets: D1 `creds` table (id de98183a-1263-46d6-a62b-f05d66f7486f) and
  Worker secrets. NOT in git. Memory files hold pointers/IDs only.
- 2026-06-20 — Connected via MCP: Cloudflare, Gmail/Calendar/Drive, GitHub, Linear.
