# Heat Lagos — Auto-DND on email reply (build spec for Antigravity)

**Goal:** when someone emails **hello@heatlagos.com** asking to stop being contacted (replies containing "unsubscribe", "DND", "stop", "opt out", "remove me", etc.), automatically mark that person as Do-Not-Disturb in bsport: turn off their email-marketing consent **and** apply the DND tag, log it, confirm to them, and notify Heat. No human step required for clear cases; ambiguous cases get flagged for a human.

This honors unsubscribe requests promptly (GDPR / CAN-SPAM compliant) and feeds the broader Heat client-comms automation program (DND-tagged / unsubscribed clients must be excluded from every outbound automation: review engine, follow-ups, win-back).

---

## 1. The action it must perform (bsport — exact, already validated)

bsport management API. **Every path needs a trailing slash** (a POST to a no-slash path 301-redirects and silently becomes a GET).

- **Base:** `https://public.production.bsport.io/api/v1/management/`
- **Headers (all requests):** `X-Api-Key: <BSPORT_JWT>`, `X-Client-ID: heat`, `X-Company-ID: 5821`, `Accept: application/json`
- Company 5821, establishment 19572. The JWT API key currently expires **2027-06-20** — store as a secret/env var and plan for rotation.

**Optimized pipeline — 2 HTTP GETs, no tag:**

**Step 1 — look up the client + get their unsubscribe token:**
`GET /clients/?email=<urlencoded email>` → `results[0]`. Capture `is_email_accepted` and `unsubscribe_link` (a URL like `https://backoffice.bsport.io/c/5821/unsubscribe/{token}`).
- If `count == 0` → not a bsport client (§5).
- If `is_email_accepted` is already `false` → done, skip step 2 (idempotent).

**Step 2 — flip email consent OFF:**
`GET` the `unsubscribe_link` from step 1 (`https://backoffice.bsport.io/c/5821/unsubscribe/{token}`) → sets `is_email_accepted=false`. (Validated on a live client.)

That is the entire action. The unsubscribe token is unique per client and only obtainable from the lookup, so step 1 is required; the client detail endpoint is **read-only** (`/clients/{id}/` = GET/HEAD/OPTIONS only, no PATCH/PUT), so the unsubscribe-link GET is the way to write the consent flag.

- **No DND tag** (dropped, per decision): bsport's own emails respect `is_email_accepted`, so flipping it off is sufficient suppression. Only reintroduce a tag if you later run separate outbound automations that filter by tag instead of by consent (`POST /clients/{id}/tag/` body `{"tag_id":122225}`, tag already exists).
- **Optional verify (skip for max speed):** re-`GET /clients/?email=` and assert `is_email_accepted == false`. For latency-sensitive runs, trust step 2 and only spot-check.

---

## 2. The trigger — how to watch hello@heatlagos.com

Pick based on where hello@ mail actually lands (confirm first: is heatlagos.com MX on Google Workspace or Cloudflare?).

### Option A (RECOMMENDED — simplest, works with Google Workspace): Google Apps Script poller
- Apps Script project bound to the Heat Google Workspace, **time-driven trigger every 5 minutes**.
- Native `GmailApp` access (no OAuth/service-account setup), `UrlFetchApp` for the bsport calls.
- Query: `GmailApp.search('to:hello@heatlagos.com is:unread newer_than:2d')` (plus a processing label to avoid re-handling).
- Pros: zero infra, free, native Gmail, fastest to ship. Cons: up-to-5-min latency, lives in Google not Cloudflare.

### Option B: Cloudflare Worker Cron + Gmail API
- A Worker on a `*/5 * * * *` cron uses the Gmail API (service account with domain-wide delegation on the Workspace, or OAuth refresh token for hello@) to scan + process. bsport calls via `fetch`.
- Pros: lives in your existing Cloudflare stack, central logging (D1/KV). Cons: needs Gmail API auth wiring.

### Option C (real-time): Cloudflare Email Worker, fed by a Google forward
You do NOT need to move heatlagos.com's MX off Google. Keep Google Workspace as the mailbox and forward a copy into Cloudflare:
- In **Google Workspace Admin → Apps → Gmail → Routing** add a rule (or a Gmail filter) that forwards inbound hello@ mail — ideally only messages matching the DND keywords — to a **Cloudflare Email Routing address** on a Cloudflare-managed domain or subdomain (e.g. `dnd@inbound.heatlagos.com` whose MX is on Cloudflare Email Routing).
- That address routes to an **Email Worker** that parses the forwarded message and runs the bsport action.
- The human still receives the original at hello@ in Google; the Worker gets a real-time copy.
- Note: forwarding breaks SPF/DKIM alignment, which is irrelevant here (the Worker only triggers logic, it does not re-send to recipients). Parse the **original sender** from the forwarded message body/headers, not the forwarder.
- Pros: instant, lives in the Cloudflare stack, central D1/KV logging. Cons: a bit more setup than Option A.

**Recommendation:** ship **Option A** now (fast, reliable for a Google mailbox); migrate to B or C later if you want it in the Cloudflare stack or real-time.

---

## 3. End-to-end flow

1. Poller finds a new inbound message addressed to hello@heatlagos.com (unread, not yet processed).
2. Extract the **sender email** (the `From:` address — strip display name; handle `Reply-To` if present) and the **subject + plaintext body**.
3. **Intent match** (see §4). If no match -> leave untouched (ignore), do nothing.
4. If matched and confidence is HIGH -> run bsport Steps A-D for the sender's email.
5. If matched but AMBIGUOUS -> do not auto-act; label `dnd-review` and notify a human (§6).
6. On success -> label the thread `dnd-done`, append a row to the audit log (§7), send the confirmation reply (§8), mark read.
7. On "not a bsport client" -> still record to a master suppression list (§5) and label `dnd-not-in-bsport` for a human glance.
8. On error -> label `dnd-error`, log the error, do NOT mark read (so it retries / a human sees it). Retry with backoff on bsport 429/5xx.

---

## 4. Intent matching (keep false positives near zero)

HIGH confidence (auto-act) if ANY of these match the subject OR a short body (case-insensitive, word-boundary):
- `unsubscribe`, `un-subscribe`, `opt out`, `opt-out`, `dnd`, `do not disturb`, `do not contact`, `do not email`, `no more emails`, `stop emailing`, `stop sending`, `remove me`, `take me off`, `delete my email`, `mailing list`.
- A reply whose entire body (trimmed) is just `STOP`, `UNSUBSCRIBE`, `DND`, or `NO`.

AMBIGUOUS (flag for human, do NOT auto-act):
- Bare `stop` / `cancel` inside a longer sentence (could mean "stop my membership" or "cancel a class", not email opt-out).
- "don't" near "unsubscribe" (e.g. "don't unsubscribe me yet").
- Non-English phrasings you are not confident about (Heat has PT/intl members) — keep a small PT/ES list: `darse de baja`, `cancelar suscripción`, `no recibir correos`, `cancelar subscrição`, `parar de receber`.

Never act on automated/auto-reply/bounce messages (`auto-submitted` header, `mailer-daemon`, out-of-office). Skip messages from internal/staff addresses.

---

## 5. Sender not found in bsport
- Still honor the request: write them to a **master suppression list** (a sheet / KV / D1 table `heat_suppression`), and if Heat sends via any other channel (GHL, Resend), add the email to those suppression lists too.
- Label `dnd-not-in-bsport`. A human can reconcile (maybe they used a different email than their bsport account).

---

## 6. Safety, idempotency, notifications
- **Idempotent:** before acting, if `is_email_accepted` is already false AND tag present, skip the bsport writes, just confirm + log.
- **Audit log (required):** one row per processed email -> timestamp, sender email, matched keyword, bsport client id, before/after `is_email_accepted`, tag applied, confirmation-sent y/n, result. Store in a Google Sheet (Option A) or D1/KV (Option B/C).
- **Human notify:** for `dnd-review`, `dnd-not-in-bsport`, and `dnd-error`, send a short internal note (or a daily digest) to Sebastian. High-confidence successes just log silently.
- **Rate / abuse:** cap actions per run; bsport 429 -> backoff and retry next cycle.

---

## 7. Confirmation reply (optional but recommended — Heat voice, premium/warm, NOT the blunt grappler voice, no em dashes)
Send from hello@heatlagos.com:

> Subject: You're unsubscribed
>
> Hi [first name],
>
> Done. You have been removed from our email list and will not receive marketing emails from Heat Lagos anymore.
>
> If you ever change your mind, just reply here and we will add you back. And you are always welcome in the studio.
>
> Warm regards,
> Heat Lagos

(Skip the auto-reply for ambiguous/flagged cases — a human handles those.)

---

## 8. Config / secrets the build needs
- `BSPORT_JWT` (the X-Api-Key; expires 2027-06-20, rotate-aware), `X-Client-ID=heat`, `X-Company-ID=5821`.
- DND tag id `122225` (or look it up by name via `GET /tags/`).
- Gmail access for hello@heatlagos.com (Apps Script native, OR a service account with domain-wide delegation / OAuth refresh token for Options B/C).
- Optional: GHL + Resend suppression-list API creds if Heat sends through them.

---

## 9. Test plan
1. From a test address that IS a bsport client, email hello@heatlagos.com with subject "unsubscribe" -> verify within one cycle: `is_email_accepted=false`, tag 122225 applied, confirmation received, audit row written, thread labeled `dnd-done`.
2. Body-only `STOP` from a client -> same result.
3. "I want to cancel my 6am class" -> must NOT unsubscribe (ambiguous, no email-opt-out keyword) -> ignored or `dnd-review`.
4. Unsubscribe from a non-client email -> added to suppression list, labeled `dnd-not-in-bsport`, no bsport error.
5. Re-send an unsubscribe from an already-unsubscribed client -> idempotent (no duplicate writes), still confirmed.
6. Out-of-office / mailer-daemon containing the word "unsubscribe" in a footer -> ignored.

---

## 10. Deliverables for Antigravity
1. The poller/worker (Option A Apps Script recommended) with the trigger.
2. A `markDnd(email)` function implementing the 2-call pipeline in §1 (lookup → GET unsubscribe_link), with idempotency (skip if already off) and optional verify. No DND tag.
3. Intent matcher (§4) with the HIGH/AMBIGUOUS split.
4. Audit log + Gmail labels (`dnd-done`, `dnd-review`, `dnd-error`, `dnd-not-in-bsport`).
5. Confirmation-reply sender (§7).
6. Internal-notify for flagged cases.
7. The 6 test cases (§9) passing.

**Definition of done:** a real reply to hello@heatlagos.com saying "unsubscribe" results, within ~5 minutes and with no human action, in that person being unsubscribed + DND-tagged in bsport, confirmed, and logged.
