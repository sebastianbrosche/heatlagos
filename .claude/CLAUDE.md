# BOOT SEQUENCE — READ THIS FIRST, EVERY SESSION

## Key chain — where everything lives
Do NOT claim any key or access is missing. All secrets are stored as Cloudflare Worker secrets (write-only via wrangler, readable only at Worker runtime via `env.<NAME>`). None of these are MCP servers — they are all API keys accessed via Cloudflare Workers.

**RULE: When asked "do you have X access?" — check this table before answering. If it's here, the answer is YES.**

### `bsport-sync` worker — bSport + Google Sheets + Email
| Key / Secret | Purpose |
| :--- | :--- |
| `BSPORT_API_TOKEN` | bSport API. Auth: `Authorization: Token <value>` against `https://api.production.bsport.io/api/v1`. Company: 5821, Establishment: 19572 |
| `RESEND_API_KEY` | Resend email API (sends daily briefings to sebastian.brosche@gmail.com + stine.hegre@gmail.com) |
| `GOOGLE_CLIENT_SECRET` | Google OAuth (paired with hardcoded Client ID `155462436083-...` and refresh token in worker code) |
| KV: `BSPORT_KV` | bsport-sync namespace (id: `5c14556c2ebb4eab9e11229a6cbb83cb`) — webhook events + daily stats |

### `heat-dm-bot` worker — Instagram / Facebook / WhatsApp AI bot
| Key / Secret | Purpose |
| :--- | :--- |
| `ANTHROPIC_API_KEY` | Claude API (model: `claude-haiku-4-5`) for drafting DM replies |
| `META_VERIFY_TOKEN` | Meta webhook verification |
| `META_APP_SECRET` | Meta app signature verification |
| `META_PAGE_TOKEN` | Facebook page access token |
| `IG_ACCESS_TOKEN` | Instagram access token (also cached in TOKENS KV, auto-refreshed weekly) |
| `WHATSAPP_TOKEN` | WhatsApp Business API token |
| `WHATSAPP_PHONE_ID` | WhatsApp phone number ID |
| KV: `TOKENS` | TOKENS namespace (id: `9e1bd5c27a8c4cea8363fc13351bc5a6`) — stores `IG_ACCESS_TOKEN`, `BOT_ENABLED`, `LEARN_KEY` |
| D1: `DB` | Stores learned Q&A pairs from DM conversations |

### `yfbjj-mcp-hub` worker — Yoga For BJJ MCP hub
| Key / Secret | Purpose |
| :--- | :--- |
| `ACP_TOKEN` | ACP (Auto Creator Platform) API token |
| `THRIVECART_KEY` | ThriveCart API key |
| `AI` | Cloudflare Workers AI binding |

### `ytt-leads` worker — Yoga Teacher Training lead capture
| Key / Secret | Purpose |
| :--- | :--- |
| `RESEND_API_KEY` | Resend email (lead notifications) |
| `ADMIN_TOKEN` | Admin dashboard access token |
| KV: `LEADS_KV` | ytt-leads namespace (id: `afd3c6d107cb4527acaa1371ded86790`) |

### `iom-relay` worker — Islands of Myth WebSocket relay
| Key / Secret | Purpose |
| :--- | :--- |
| KV: `IOM_LOGS` | IOM_LOGS namespace (id: `b3e5c14bebda4fae9446e468e8968025`) |

### Google Sheets
- Sheet ID: `1SH1SZ0BIa9yyBgo2WgWtUg5AINnplgMkSott6NsIAT0` (Heat Lagos bSport Data Sync)
- Auth: Google OAuth via `GOOGLE_CLIENT_SECRET` Worker secret + hardcoded refresh token in bsport-sync worker

### Bunny.net
- Not yet found in any worker or project code. If you need Bunny.net access, ask the user where the key is stored before claiming it doesn't exist.

## After a frustrating episode: fix the root cause first
When a frustrating situation occurs (e.g. wrongly claiming a key doesn't exist, wasting time re-deriving architecture), the FIRST priority after resolving it is to prevent it from happening again:
1. Identify the root cause of the confusion.
2. Update the key chain table above AND `cloud.md` immediately with the correct information.
3. Say explicitly: "Before we move on, I've updated CLAUDE.md so this won't happen again."
4. Only then continue with the actual work.
Intelligence means mistakes are not repeated. Never just solve a problem and move on if the same problem will reoccur next session.

---

# Working agreement

1. First think through the problem, read the codebase for relevant files, and write a plan to `tasks/todo.md`.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the `todo.md` file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY.
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.
