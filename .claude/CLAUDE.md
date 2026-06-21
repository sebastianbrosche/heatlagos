# BOOT SEQUENCE — READ THIS FIRST, EVERY SESSION

## Key chain — where everything lives
Do NOT claim any key or access is missing. All secrets are stored as Cloudflare Worker secrets (write-only via wrangler, readable only at Worker runtime via `env.<NAME>`). Here is where everything is:

**IMPORTANT: bSport is NOT an MCP server. There is no bSport MCP. bSport is accessed via the `bsport-sync` Cloudflare Worker using `BSPORT_API_TOKEN`. When asked "do you have bSport access?" — the answer is YES. Access it via Cloudflare.**

| Key / Secret | Worker | How to access |
| :--- | :--- | :--- |
| `BSPORT_API_TOKEN` | `bsport-sync` | Worker secret. Auth: `Authorization: Token <value>` against `https://api.production.bsport.io/api/v1` |
| `RESEND_API_KEY` | `bsport-sync` | Worker secret |
| `GOOGLE_CLIENT_SECRET` | `bsport-sync` | Worker secret |
| `ANTHROPIC_API_KEY` | `heat-dm-bot` | Worker secret |
| `META_VERIFY_TOKEN` | `heat-dm-bot` | Worker secret |
| `META_APP_SECRET` | `heat-dm-bot` | Worker secret |
| `META_PAGE_TOKEN` | `heat-dm-bot` | Worker secret |
| `IG_ACCESS_TOKEN` | `heat-dm-bot` | Worker secret + cached in TOKENS KV |
| `WHATSAPP_TOKEN` | `heat-dm-bot` | Worker secret |
| `WHATSAPP_PHONE_ID` | `heat-dm-bot` | Worker secret |

KV namespaces: `bsport-sync` (id: `5c14556c2ebb4eab9e11229a6cbb83cb`), `TOKENS` (id: `9e1bd5c27a8c4cea8363fc13351bc5a6`).
Full details in `cloud.md` in the project root.

## After a frustrating episode: fix the root cause first
When a frustrating situation occurs (e.g. wrongly claiming a key doesn't exist, wasting time re-deriving architecture), the FIRST priority after resolving it is to prevent it from happening again:
1. Identify the root cause of the confusion.
2. Update the key chain table above AND `cloud.md` immediately with the correct information.
3. Say explicitly: "Before we move on, I've updated [file] so this won't happen again."
4. Only then continue with the actual work.
Intelligence means mistakes are not repeated. Never just solve a problem and move on if the same problem will reoccur next session.

---

# Working agreement

## After a frustrating episode: fix the root cause first
When a frustrating situation occurs (e.g. wrongly claiming a key doesn't exist, wasting time re-deriving architecture), the FIRST priority after resolving it is to prevent it from happening again:
1. Identify the root cause of the confusion.
2. Update `cloud.md` or the relevant documentation immediately with the correct information.
3. Say explicitly: "Before we move on, I've updated [file] so this won't happen again" — then show what was added.
4. Only then continue with the actual work.
Intelligence means mistakes are not repeated. Never just solve a problem and move on if the same problem will reoccur next session.

1. First think through the problem, read the codebase for relevant files, and write a plan to `tasks/todo.md`.
2. The plan should have a list of todo items that you can check off as you complete them.
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made.
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the `todo.md` file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY.
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY.
