# Heat Lagos — Landing Page Plan

## Mål
Én enkelt landingpage på `heatlagos.com`. Ingen undersider, ingen medlemsområde.
Alt innhold scroller i seksjoner på samme side. Inspirert av prescription.pt (samme nivå av visuell kvalitet, varmere palett).

## Stack
- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Ingen database, ingen auth (rent statisk landing)

## Merkevare
- Primær: `#FC966A` (varm oransje)
- Sekundær: `#8A8682` (varm stein)
- Tagline: "Infrared heated Pilates, Yoga & Sculpt 🔥 Mobility, Recovery & Yin ✨"
- Kontakt: hello@heatlagos.com / +351 927 290 812
- Instagram: https://www.instagram.com/heat_lagos/
- Facebook: https://www.facebook.com/profile.php?id=61588436283019

## Sideseksjoner (i rekkefølge)
1. **Topbar/marquee** — rullende "Intro offer" over videoen, klikk = scroll til memberships
2. **Hero** — fullskjerm video, overliggende tekst "Infrared Pilates, Yoga & More", Discover-knapp
3. **Heat Classes** — 7 klasser gruppert i 3 kategorier:
   - Infrared Pilates: Pilates
   - Yoga & Sculpt: Sculpt, Power Yoga, Flow Yoga
   - Mobility & Recovery: Mobility, Recovery, Yin
   Hvert kort: bilde, navn, kort beskrivelse. (Video per klasse kan legges inn senere når assets finnes.)
4. **Heat Teachers** — profilbilde-grid med "Our Teachers"-heading og aktivt bilde nederst
5. **Heat Schedule** — placeholder for bsports-embed (iframe når URL foreligger)
6. **Heat Memberships** — priskort med alle tilbud:
   - Intro Offer — 3 classes / 55 EUR
   - 2 week unlimited — 79 EUR
   - 12 month membership — 125 EUR/mnd (subscription)
   - Yearly — 1200 EUR (sparer 300 vs. 12-month)
   - Vacation week — 7 days unlimited / 59 EUR
   - Summer membership — 3 mnd unlimited / 390 EUR (frist 31. mai)
   - 1 month — 160 EUR
   - 10 class package
   - Single drop-in — 22 EUR
7. **Where to find us** — adresse, parkering, Google Maps-lenke
8. **Footer** — kontakt, sosiale lenker, "Teacher trainings — coming soon"

## Meny (sticky header)
Lenker (scroll til seksjon på samme side):
- About us
- Heat Classes
- Heat Teachers
- Heat Schedule
- Heat Memberships
- Teacher trainings (coming)
- Where to find us
- Login (ekstern / placeholder)
- Intro Offer-knapp (CTA)

## Todo-liste
- [ ] Scaffold Next.js + Tailwind-prosjekt i `/Users/kainorstrom/Documents/heatlagos`
- [ ] Sett opp Tailwind-tema med brand-fargene og typografi
- [ ] Legg til placeholder-assets-mappe (`public/video/`, `public/classes/`, `public/teachers/`)
- [ ] Bygg sticky header med scroll-lenker + Intro Offer CTA
- [ ] Bygg rullende topbar/marquee over hero
- [ ] Bygg hero med video-bakgrunn + overliggende tittel og Discover-knapp
- [ ] Bygg Heat Classes-seksjon med 3 kategorier og 7 klassekort
- [ ] Bygg Heat Teachers-seksjon (grid + aktivt bilde)
- [ ] Bygg Heat Schedule-seksjon (bsports-embed placeholder)
- [ ] Bygg Heat Memberships-seksjon med alle prisene
- [ ] Bygg Where to find us-seksjon med maps-lenke
- [ ] Bygg footer med kontakt og sosiale lenker
- [ ] Verifiser i nettleser (responsiv + scroll-oppførsel)
- [ ] Skriv kort README med dev-/build-kommandoer
- [ ] Legg til review-seksjon nederst i denne filen

## Åpne spørsmål (trenger svar før/underveis)
1. **Video-fil:** Har du en hero-video (mp4)? Hvis ikke, skal jeg bruke en stillbilde-placeholder?
2. **Bilder til klasser og lærere:** Finnes disse allerede, eller skal jeg bruke plassholdere til du leverer?
3. **bsports-embed URL:** Har du embed-koden for schedule og memberships, eller skal jeg bare legge inn placeholder?
4. **Adresse / Maps:** Hva er adressen til studio i Lagos, og hvilken Google Maps-lenke skal brukes?
5. **Login-lenke:** Skal "Login"-knappen i menyen lenke til bsports, eller skjules inntil videre?
6. **Domene/deploy:** Skal jeg sette opp deploy (f.eks. Vercel) nå, eller vente til siden er ferdig?
7. **Font:** Samme fonter som prescription.pt (serif + monospace-lignende uppercase)? Jeg foreslår "Instrument Serif" + "Inter" — ok?

---

# Connectivity & Portability Plan (Google + Meta + phone)

## Goal
Same Google/Meta/GitHub access and context from any device (Stine's laptop now,
her phone later), surviving fresh sessions. New sessions = fresh containers that
lose everything in `/root`, so the setup must live in the **repo** (scripts +
docs) and the **environment** (credentials), not in uploaded files.

## Plan
- [x] Move helper scripts into the repo under `scripts/` (`google_sa.py`,
      `google_user.py`, `meta.py`), reading all credentials from env vars.
- [x] Document the connected services + env-var contract (`docs/CLAUDE_OPS.md`,
      `AGENTS.md`) with an operator-identity fingerprint.
- [x] Credential storage decided: **plain env vars** in the Claude Code
      environment (secrets never in git; safety classifier blocked the
      consolidate-to-git approach, confirming the call).
- [x] Produce the ready-to-paste env-var block (in chat).
- [x] Commit + push, then merge to `main` (skills + scripts + docs permanent).
- [x] Discovered Gmail/Calendar/Drive/Cloudflare/Linear MCP connectors →
      dropped manual Gmail/Photos tokens; Photos out of scope.
- [x] Install `launch-your-agent` + `wrap-up` skills.
- [x] Switch deploy target Vercel → Cloudflare Pages in docs.
- [ ] **USER:** rotate exposed secrets; paste env-var block; start a fresh
      session (network=Full).
- [ ] Verify Search Console/GA4 from env + Meta reachable in the new session.
- [ ] Resume Meta: link Page + Instagram, mint `META_PAGE_TOKEN`, plan App Review.
- [ ] Wire `@opennextjs/cloudflare` adapter + Pages project.
- [ ] Build the SEO "Visitor Pass" + narrative Schedule pages (from SEO email).
- [ ] `/launch-your-agent` → launch the Heat Lagos DM agent.

## Review (connectivity & portability)

What got done this session, all committed to `main`:
- **Helper scripts** (`scripts/google_sa.py`, `google_user.py`, `meta.py`) —
  stdlib + openssl, env-var driven, no secrets.
- **`docs/CLAUDE_OPS.md`** — connected-services inventory, env-var contract,
  usage, network policy, and operator identity (`HL-OPS-FB809683537B`) so
  Stine's Claude and Sebastian's Claude never get confused.
- **`AGENTS.md`** — Vercel removed, Cloudflare Pages set as deploy target,
  pointer to the ops doc.
- **`.gitignore`** — blocks credential files from ever being committed.
- **Skills** — `launch-your-agent` + `wrap-up` vendored (Apache-2.0).

Connectivity outcome:
- ✅ GitHub, Gmail/Calendar/Drive, Cloudflare, Linear (connectors); Search
  Console + GA4 (service account, verified live).
- 🚧 Meta app created but blocked by the "Trusted" network policy until a new
  session picks up the "Full" setting.
- Secrets live only in the Claude Code env-vars box (portable, not in git).

Key learnings:
- Network/policy changes apply to **new sessions** only.
- Connectors (account-scoped) are the cleanest portability path; env vars cover
  the rest. GitHub Actions secrets only reach Actions runs, not Claude sessions.
- Several credentials were pasted in chat → flagged for rotation.

## Notes
- Network change to "full" applies to new sessions only (confirmed via 403).
- Environment-variables box is world-visible to environment users — drives the
  Option A vs B decision below.
- Secrets were pasted in chat → rotate after migrating into the environment.

## Review

### Det som er bygd
- Next.js 16 + React 19 + Tailwind 4 + TypeScript prosjekt scaffoldet fra bunnen i `/Users/kainorstrom/Documents/heatlagos`
- Én `page.tsx` som rendrer alle seksjoner i én landing
- 9 komponenter under `src/components/`:
  - `Header.tsx` — sticky header, scroll-lenker, Login + Intro Offer CTA, mobilmeny
  - `Marquee.tsx` — rullende "Intro Offer"-bar under headeren, klikk scroller til memberships
  - `Hero.tsx` — full-høyde hero (gradient-bakgrunn som video-placeholder), tittel + Discover-knapp
  - `About.tsx` — kort About-seksjon med intro og feature-chips
  - `Classes.tsx` — 7 klasser i 3 kategorier (Infrared Pilates / Yoga & Sculpt / Mobility & Recovery)
  - `Teachers.tsx` — 4 lærer-kort + bredt "In studio, together"-banner nederst
  - `Schedule.tsx` — Bsports-embed placeholder (erstattes når embed-URL finnes)
  - `Memberships.tsx` — alle 9 priskort inkl. intro offer, unlimited, yearly osv.
  - `Location.tsx` — adresse, parkering, kontakt, Google Maps-iframe + "Get Directions"-knapp
  - `Footer.tsx` — full footer med lenker, kontakt, Instagram/Facebook, Teacher Trainings (coming soon)
- Brand-tokens satt i `globals.css`: `--brand #FC966A`, `--stone #8A8682`, mørk varm bakgrunn
- Fonter: Instrument Serif (headlines/italic) + Inter (body)
- Smooth scroll på `html` + hash-ankere på alle seksjoner

### Kjøre lokalt
- `cd /Users/kainorstrom/Documents/heatlagos && npm run dev` (default port 3000)
- Serveren kjører nå på **http://localhost:3100** — åpne i nettleser for å se siden

### Placeholders som må erstattes senere
- Hero bakgrunn (gradient nå) → ekte video i `public/video/hero.mp4`
- Klasse- og lærer-kort (gradient-tiles) → ekte bilder/video
- Schedule-seksjon → faktisk Bsports-embed `<iframe>`
- "Heat Teachers" navn/roller er plassholdere

### Filstruktur
```
heatlagos/
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── .gitignore
├── tasks/todo.md
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── globals.css
    │   └── page.tsx
    └── components/
        ├── About.tsx
        ├── Classes.tsx
        ├── Footer.tsx
        ├── Header.tsx
        ├── Hero.tsx
        ├── Location.tsx
        ├── Marquee.tsx
        ├── Memberships.tsx
        ├── Schedule.tsx
        └── Teachers.tsx
```


---

# Heat Lagos — DM/Email Concierge Expansion Plan (2026-06-20)

## Goal
Stine answers any given "dumb" question (prices, schedule, what to bring, etc.)
**once**. After that the bot handles it for every future asker, across every
channel she gets messages on: Instagram, Facebook Messenger, WhatsApp, and email.
When Stine does reply manually, the bot learns that answer and reuses it.

## Pieces

### 1. Instagram token auto-refresh  — DONE
- [x] Created KV namespace `TOKENS` (id 9e1bd5c2...) to hold the rotating token.
- [x] Worker reads `IG_ACCESS_TOKEN` from KV first, falls back to the secret.
- [x] Added daily cron (`0 3 * * *`) calling `refresh_access_token` and writing
      the new 60-day token back to KV. Verified the endpoint returns a fresh
      token with `instagram_business_manage_messages`.
- Result: the IG token now never expires; no manual rotation needed.

### 2. Facebook Messenger  — needs a Page token (low effort)
- The worker already handles `page` events (FB_GRAPH + META_PAGE_TOKEN). Code is
  done; just needs the token + Page subscribed to the app webhook for `messages`.
- [ ] Generate a long-lived Page token (pages_messaging) for the Heat Lagos Page.
- [ ] `wrangler secret put META_PAGE_TOKEN`.
- [ ] Subscribe the Page to the app's `messages`/`messaging_postbacks` fields.

### 3. WhatsApp  — needs a dedicated number (medium effort)
- WhatsApp Cloud API: a WhatsApp Business Account + a phone number NOT used on a
  normal WhatsApp app. Different webhook payload + send endpoint than Messenger.
- [ ] Provision/confirm the phone number + WABA in Meta.
- [ ] Add a `whatsapp_business_account` branch to the worker (parse + send).
- [ ] Subscribe the WhatsApp webhook; set `WHATSAPP_TOKEN` + phone number id.

### 4. Email concierge  — biggest piece (decision needed)
- Bot reads Stine's incoming Gmail and handles common questions.
- DECISION: auto-send vs draft-for-approval vs hybrid (confident => send, else draft).
- [ ] Stand up Gmail access (OAuth refresh token) for a scheduled poller.
- [ ] Classify incoming mail; answer the easy ones using the shared knowledge base.

### 5. Learning loop (shared across all channels)
- Capture Stine's manual replies (IG/Messenger `is_echo` outbound, sent emails),
  pair each with the question it answered, and store as a Q&A in a shared store.
- On every new inbound message, retrieve the closest learned Q&A and feed it to
  Claude as authoritative context so the same answer goes out next time.
- DECISION: reuse manual answers immediately, or have Stine approve first.
- [ ] Create `learned` store (D1 table).
- [ ] Capture outbound/manual answers per channel.
- [ ] Retrieve + inject on inbound (keyword first; embeddings if volume grows).

## Notes
- Keep each channel a thin branch on the existing worker; one shared knowledge
  base and one shared `draftReply`. Simplicity first.

## Review — 2026-06-20 (this session)
- DONE #1 Instagram token auto-refresh: KV `TOKENS` + daily cron `0 3 * * *`
  calling `refresh_access_token`; worker reads token from KV (secret fallback).
  Verified the refresh endpoint returns a fresh 60-day token.
- DONE #5 Learning loop (IG + Messenger): hand-typed studio replies are captured
  as pending Q&A (`learned` table in heat_ops D1), approved at `/learned?key=...`,
  then injected into future replies by keyword match. Capture skips the bot's own
  sends via a KV marker. Verified: auth (403 w/o key), list, approve, reuse.
- Per decision, manual answers are SAVED then APPROVED before reuse (not auto).
- NEXT (need credentials/owner action, not code):
  - Messenger: generate a long-lived Page token -> `wrangler secret put META_PAGE_TOKEN`
    -> subscribe the Page to `messages`. Code path already live.
  - WhatsApp: register +351 927 290 812 in WhatsApp Cloud API (must not be on a
    consumer WhatsApp app) -> add `whatsapp` branch + token.
  - Email: hybrid (send when confident, else draft). Needs Gmail OAuth + poller.
