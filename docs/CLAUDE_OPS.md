# Heat Lagos — Claude Operations & Connected Services

This document is the shared, portable context for automating Heat Lagos across
Google, Meta, and GitHub. It is committed to the repo so **any** Claude session
on **any** device (laptop or phone) picks it up automatically. It contains **no
secrets** — those live only in the Claude Code environment variables.

---

## 1. Operator identity — avoid confusion between the two Claudes

Two different Claude Code operators work on this repo. They are NOT the same
agent and do not share memory. Always identify which one is acting.

| Operator | Who | Fingerprint | Environment |
|---|---|---|---|
| **Stine's Claude** (this ops setup) | Runs in Stine's cloud environment ("Default", network = Full) | `HL-OPS-FB809683537B` | Owns the Google/Meta automation described here |
| **Sebastian's Claude** | Runs from Sebastian's own PC / his own Claude Code | (sets its own) | Separate setup |

**If you are a Claude session reading this:** you are **Stine's Claude**
(fingerprint `HL-OPS-FB809683537B`) only if you boot in the environment that has
the `CRED_*` / `GOOGLE_*` / `META_*` environment variables below defined. If
those env vars are absent, you are NOT this operator — do not assume this
context applies.

When committing automation/ops changes, reference the fingerprint
`HL-OPS-FB809683537B` in the commit body so authorship is unambiguous.

---

## 2. Connected services (status)

| Service | Auth | Status |
|---|---|---|
| GitHub | session integration | ✅ connected |
| Gmail / Calendar / Drive | **MCP connector** (Stine's Claude account) | ✅ connected; portable to any device via her login — no env vars needed |
| Cloudflare (Workers/D1/KV/R2) | MCP connector | ✅ connected |
| Linear | MCP connector | ✅ connected |
| Google Search Console | service account (`GOOGLE_SA_KEY`) | ✅ full access incl. `sc-domain:heatlagos.com`, `yogateachertrainingportugal.eu` |
| Google Analytics (GA4) | service account (`GOOGLE_SA_KEY`) | ✅ account/properties reachable |
| Instagram + Facebook | Meta app (`META_APP_ID`/`SECRET`) | 🚧 app created; needs network=Full + Page/IG token + App Review |
| Anthropic Managed Agents | `ANTHROPIC_API_KEY` + `/launch-your-agent` skill | 🚧 skill installed on `main`; agent not yet launched |

Google Photos is intentionally **out of scope** (Google's 2025 API limits cripple
full-library reads). Gmail/Calendar/Drive now run via MCP connectors, so the
earlier manual OAuth refresh tokens are no longer used.

Service-account address (share Search Console / GA4 / Drive resources with it):
`claudecode@kimiclaw-bot-1.iam.gserviceaccount.com`

---

## 3. Required environment variables (set in Claude Code env, NOT in git)

```
GOOGLE_SA_KEY               = <full service-account JSON, single line>   # Search Console + GA4
META_APP_ID                 = 1005398102280025
META_APP_SECRET             = <meta app secret>
META_PAGE_TOKEN             = <long-lived Page token — added once obtained>
ANTHROPIC_API_KEY           = <your own key from platform.claude.com — for /launch-your-agent>
```

Gmail / Calendar / Drive / Cloudflare / Linear use **MCP connectors** (tied to
Stine's Claude account), so they need **no env vars**.

⚠️ The environment-variables box is visible to anyone who can open this
environment. Keep the environment private to Stine. **Rotate any credential that
has been exposed in chat** (the Meta secret, the OAuth client secret, and any
Anthropic API key pasted in chat).

---

## 4. How to use (helper scripts in `scripts/`)

```bash
# Google service-account resources (Search Console, GA4, shared Drive/Docs)
python3 scripts/google_sa.py call "https://www.googleapis.com/auth/webmasters.readonly" \
  "https://www.googleapis.com/webmasters/v3/sites"

# Gmail / Calendar / Drive — use the MCP connector tools (no script needed)
#   e.g. Gmail search_threads / get_thread, Calendar list_events, Drive search_files

# Meta Graph API (needs network=Full)
python3 scripts/meta.py apptoken
```

All scripts use only the Python standard library + the `openssl` CLI. No
dependencies to install.

---

## 5. Network policy

The Claude Code environment must allow the hosts each API needs. Google hosts
are covered by the "Trusted" policy; **Meta is not** — `graph.facebook.com`,
`www.facebook.com`, and `graph.instagram.com` require the **Full** network
access level (or a custom allowlist). Network changes apply to **new sessions**
only.

---

## 6. Open follow-ups

- Obtain a long-lived Meta **Page access token** (Facebook Login consent) and an
  Instagram Business account linked to the Heat Lagos Page; store as
  `META_PAGE_TOKEN`.
- Submit Meta **App Review** for `instagram_manage_messages` / `pages_messaging`
  to enable the auto-reply DM bot for real users.
- Build the always-on **DM webhook** as a **Cloudflare Worker / Pages Function**
  (this Claude container is ephemeral and can't host a webhook).
- Wire **Cloudflare Pages** deploy: add the `@opennextjs/cloudflare` adapter +
  Pages project so pushes to `main` build/deploy (Vercel is retired).
- Launch the Heat Lagos agent via `/launch-your-agent` (needs `ANTHROPIC_API_KEY`).
- Rotate all credentials once migrated, since they were pasted in chat.
