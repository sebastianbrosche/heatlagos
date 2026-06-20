# Heat Lagos DM auto-reply bot

A Cloudflare Worker that auto-answers Instagram and Facebook DMs for Heat Lagos
using Claude. It runs 24/7 (independent of any Claude session) and replies with
studio info, pricing and a booking link.

## Architecture

```
Instagram / Messenger DM
        │  (Meta webhook)
        ▼
  heat-dm-bot Worker  ──►  Claude API (drafts reply)
        │
        └──►  Meta Graph API (sends reply back)
```

## One-time deploy

From this folder (`workers/heat-dm-bot/`):

```bash
# 1. Deploy the Worker (needs a Cloudflare API token with Workers Scripts: Edit)
export CLOUDFLARE_API_TOKEN=...        # or `wrangler login`
npx wrangler deploy

# 2. Set the three secrets
npx wrangler secret put META_APP_SECRET     # from Meta App > Settings > Basic
npx wrangler secret put META_PAGE_TOKEN     # long-lived Page token (see below)
npx wrangler secret put ANTHROPIC_API_KEY   # from platform.claude.com
```

`wrangler deploy` prints the public URL, e.g.
`https://heat-dm-bot.<subdomain>.workers.dev`. The webhook endpoint is that URL.

## Wire up Meta

In the Meta App dashboard (App ID `1005398102280025`):

1. **Webhooks** → add callback URL = the Worker URL, verify token =
   `heat_lagos_verify_9f3a2c7b` (matches `META_VERIFY_TOKEN` in `wrangler.toml`).
2. Subscribe to fields: **`messages`** (and `messaging_postbacks`) for both the
   **Instagram** and **Messenger** products.
3. Link the Instagram Business/Creator account to the Heat Lagos Facebook Page,
   then connect that Page to the app so the Page token can send DMs.

## The Page access token

`META_PAGE_TOKEN` must be a **long-lived Page token** with `pages_messaging`
and `instagram_manage_messages`. Quickest path:

1. Graph API Explorer → select the app and the Heat Lagos Page → add scopes
   `pages_messaging`, `pages_manage_metadata`, `instagram_basic`,
   `instagram_manage_messages` → Generate Access Token.
2. Exchange the short-lived token for a long-lived one, then get the Page token
   (these are also wrapped in `scripts/meta.py`).

## Testing before App Review

While the app is in **Development mode** the bot can already message anyone with
a **role on the app** (admin / developer / tester). Add your own IG/FB account as
a tester, DM the studio account, and you should get an auto-reply. To answer the
**public**, submit **App Review** for `instagram_manage_messages` /
`pages_messaging` (this needs the published privacy policy at
`heatlagos.com/privacy`).

## State & memory (for future Claude sessions)

All operational credentials and identifiers (Meta/IG app ids + secrets, page id,
business portfolio id, Cloudflare account id + Workers token, Anthropic key,
worker URL, verify token, current status) are stored in a private **Cloudflare D1
database** named `heat_ops` (id `de98183a-1263-46d6-a62b-f05d66f7486f`) in the
Heat Lagos account. Read it via the Cloudflare MCP:

```
d1_database_query  database_id=de98183a-1263-46d6-a62b-f05d66f7486f
  SELECT k, v, note FROM creds;
```

The bot is deployed and the Meta webhook is active for `instagram` and `page`.
Pending to go fully live: an Instagram Login access token (`IG_ACCESS_TOKEN`
worker secret) and the messaging permissions, then subscribe the Page/IG account.

## Editing the bot's behaviour

The personality, facts and pricing live in `SYSTEM_PROMPT` in `src/index.js`.
Edit and re-run `npx wrangler deploy`. The model is set by `MODEL` (currently
`claude-haiku-4-5` — cheap and fast for DMs).

## Learning from manual replies

When someone DMs a question the bot can't answer well and **the studio replies
by hand** in the Instagram/Messenger inbox, that reply is saved as a *pending*
Q&A. It is **not** reused until approved, on this page:

```
https://heat-dm-bot.sebastian-brosche.workers.dev/learned?key=<LEARN_KEY>
```

The key is stored in KV (`TOKENS` namespace, key `LEARN_KEY`). Approve an answer
and the bot will reuse it for similar questions from then on (it is injected into
the prompt, matched by keyword overlap). Reject one to discard it.

Storage: the `learned` table in the `heat_ops` D1 database
(`question, answer, channel, status`).

## Token auto-refresh

`IG_ACCESS_TOKEN` lives in the `TOKENS` KV namespace, not just as a secret. A
daily cron (`0 3 * * *`) calls Instagram's `refresh_access_token`, which extends
the long-lived token another ~60 days, and writes the new value back to KV. The
fetch handler reads KV first and falls back to the secret. No manual rotation.
