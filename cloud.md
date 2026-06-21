# SYSTEM ARCHITECTURE & KEY CHAIN MAP
# READ THIS FIRST at the start of every session. Do not claim a key is missing without checking here.

## 1. Cloudflare Workers & Their Secrets

### `bsport-sync` worker
- **`BSPORT_API_TOKEN`** — bSport API bearer token. Stored as a Worker secret (not in KV). Used as `Authorization: Token <value>` against `https://api.production.bsport.io/api/v1`.
- **`RESEND_API_KEY`** — Resend email API key. Worker secret.
- **`GOOGLE_CLIENT_SECRET`** — Google OAuth client secret. Worker secret.
- KV binding: `BSPORT_KV` → namespace `bsport-sync` (id: `5c14556c2ebb4eab9e11229a6cbb83cb`) — stores webhook events (`webhook:<uuid>`) and daily stats (`stats:<date>`).
- Hardcoded in code: Google Client ID `155462436083-...`, Refresh Token, Sheet ID `1SH1SZ0BIa9yyBgo2WgWtUg5AINnplgMkSott6NsIAT0`.

### `heat-dm-bot` worker
- **`ANTHROPIC_API_KEY`** — Anthropic API key. Worker secret.
- **`META_VERIFY_TOKEN`** — Meta webhook verify token. Worker secret.
- **`META_APP_SECRET`** — Meta app secret. Worker secret.
- **`META_PAGE_TOKEN`** — Meta/Facebook page token. Worker secret.
- **`IG_ACCESS_TOKEN`** — Instagram access token. Worker secret (also cached in TOKENS KV).
- **`WHATSAPP_TOKEN`** — WhatsApp bearer token. Worker secret.
- **`WHATSAPP_PHONE_ID`** — WhatsApp phone number ID. Worker secret.
- KV binding: `TOKENS` → namespace `TOKENS` (id: `9e1bd5c27a8c4cea8363fc13351bc5a6`) — stores `IG_ACCESS_TOKEN`, `BOT_ENABLED`, `LEARN_KEY`.
- D1 binding: `DB` — stores learned Q&A pairs from DM conversations.
- Model: `claude-haiku-4-5`

---

## 2. KV Namespaces (all in Cloudflare account)

| Title | ID | Used by |
| :--- | :--- | :--- |
| `bsport-sync` | `5c14556c2ebb4eab9e11229a6cbb83cb` | bsport-sync worker |
| `TOKENS` | `9e1bd5c27a8c4cea8363fc13351bc5a6` | heat-dm-bot worker |
| `ytt-leads` | `afd3c6d107cb4527acaa1371ded86790` | ytt-leads worker |
| `IOM_LOGS` | `b3e5c14bebda4fae9446e468e8968025` | iom-relay worker |

---

## 3. Other Workers (for context)

| Worker | Purpose |
| :--- | :--- |
| `heat-dm-bot` | AI DM responder for Instagram, Facebook, WhatsApp |
| `bsport-sync` | bSport webhook receiver → Google Sheets + daily email |
| `yfbjj-mcp-hub` | MCP hub |
| `bold-thunder-4d2a` | Unknown |
| `yogaforbjj-blog-proxy` | Blog proxy for yogaforbjj |
| `blog-proxy` | Blog proxy |
| `iom-relay` | IOM relay |
| `bsport-sync` | bSport data sync |
| `ytt-leads` | Lead capture |
| `yogaforbjj-mockup-worker` | Mockup worker |

---

## 4. Verification Routine (run at session start)

```
# List KV namespaces
npx wrangler kv namespace list

# List keys in TOKENS namespace
npx wrangler kv key list --namespace-id=9e1bd5c27a8c4cea8363fc13351bc5a6

# List Worker secrets (cannot read values, only names)
npx wrangler secret list --name=bsport-sync
npx wrangler secret list --name=heat-dm-bot
```

Worker secrets are write-only via wrangler — values cannot be read back. Access them only at runtime via `env.<SECRET_NAME>` inside the Worker.

---

## 5. bSport Integration Details

- API base: `https://api.production.bsport.io/api/v1`
- Auth: `Authorization: Token <BSPORT_API_TOKEN>`
- Company ID: `5821` / Establishment ID: `19572`
- Webhook endpoint: `https://bsport-sync.sebastian-brosche.workers.dev/api/bsport-webhook`

---

## 6. GitHub & MCP Access

- Repo: `sebastianbrosche/heatlagos` — full read/write via MCP github tools.
- MCP servers available: GitHub, Cloudflare, Canva, Gmail, Google Calendar, Google Drive, Linear.

---

## 7. Google Sheets

- Sheet ID: `1SH1SZ0BIa9yyBgo2WgWtUg5AINnplgMkSott6NsIAT0`
- Auth: OAuth via Google Client ID + refresh token (hardcoded in bsport-sync worker code).
