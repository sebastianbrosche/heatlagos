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
| Google Search Console | service account | ✅ full access incl. `sc-domain:heatlagos.com`, `yogateachertrainingportugal.eu` |
| Google Analytics (GA4) | service account | ✅ account/properties reachable |
| Google Drive / Docs | service account | ✅ auth works; only sees files **shared with** the SA email |
| Gmail (stine.hegre@gmail.com) | user OAuth refresh token | ✅ full access (read/send/modify/delete) |
| Google Photos | user OAuth refresh token | ⚠️ connected, but Google's 2025 API limits restrict full-library reads |
| Instagram + Facebook | Meta app | 🚧 app created; needs network=Full + Page/IG token + App Review |

Service-account address (share Search Console / GA4 / Drive resources with it):
`claudecode@kimiclaw-bot-1.iam.gserviceaccount.com`

---

## 3. Required environment variables (set in Claude Code env, NOT in git)

```
GOOGLE_SA_KEY               = <full service-account JSON, single line>
GOOGLE_OAUTH_CLIENT_ID      = <OAuth desktop client id>
GOOGLE_OAUTH_CLIENT_SECRET  = <OAuth desktop client secret>
GMAIL_REFRESH_TOKEN         = <refresh token for stine.hegre@gmail.com>
PHOTOS_REFRESH_TOKEN        = <refresh token for Photos>
META_APP_ID                 = 1005398102280025
META_APP_SECRET             = <meta app secret>
META_PAGE_TOKEN             = <long-lived Page token — added once obtained>
```

⚠️ The environment-variables box is visible to anyone who can open this
environment. Keep the environment private to Stine. Rotate any credential that
has been exposed in chat.

---

## 4. How to use (helper scripts in `scripts/`)

```bash
# Google service-account resources (Search Console, GA4, shared Drive/Docs)
python3 scripts/google_sa.py call "https://www.googleapis.com/auth/webmasters.readonly" \
  "https://www.googleapis.com/webmasters/v3/sites"

# Gmail (and Photos) via stored refresh token
python3 scripts/google_user.py call GMAIL_REFRESH_TOKEN \
  "https://gmail.googleapis.com/gmail/v1/users/me/profile"

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
- Build the always-on **DM webhook** in the deployed Vercel app (this container
  is ephemeral and can't host a webhook).
- Rotate all credentials once migrated, since they were pasted in chat.
