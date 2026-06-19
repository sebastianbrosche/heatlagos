# Heat Lagos — Agent Guide

Read this first. It explains how the heatlagos.com codebase is organized so you can make edits confidently.

Owner: Sebastian Brosche. Site: https://www.heatlagos.com. Repo: kingofthecodecastle/heatlagos (private).

## Tech stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4
- Deployed on **Cloudflare Pages** (Vercel is retired — do not deploy to Vercel)
- Google Tag Manager already installed (`GTM-5WTJ6L62`) in `src/app/layout.tsx`

## How to deploy

Target: **Cloudflare Pages**. Do **not** deploy to Vercel.

Commit and push to `main`:

```
git add .
git commit -m "your message"
git push origin main
```

If the Cloudflare Pages project is connected to this repo, it builds + deploys on push. Next.js 16 runs on Pages via the `@opennextjs/cloudflare` adapter.

> ⚠️ Setup status: the `@opennextjs/cloudflare` adapter + the Cloudflare Pages project wiring are the current **pending** task. Until that's done, a push to `main` does not auto-deploy. See `docs/CLAUDE_OPS.md`.

**Always run `npm run build` before pushing.** If it fails, fix the error. A failing build won't deploy, but it wastes everyone's time.

## Automation & connected services

Google (Search Console, GA4, Gmail/Calendar/Drive), Meta (Instagram/Facebook), Cloudflare, GitHub and Linear are wired up for automation. The full inventory, credential/env-var contract, helper scripts (`scripts/`), and **operator identity** (which Claude is which) live in **`docs/CLAUDE_OPS.md`** — read it before touching anything credential- or deploy-related.

## Where to edit what

### Text content (all hardcoded in JSX — no CMS)

| Section | File |
|---|---|
| Hero (top of homepage) | `src/components/Hero.tsx` |
| About | `src/components/About.tsx` (paragraphs in `Paragraphs()`) |
| Class list + descriptions | `src/components/Classes.tsx` (`CATEGORIES` array) |
| Teacher bios | `src/components/Teachers.tsx` (`TEACHERS` array) |
| Schedule heading | `src/components/Schedule.tsx` |
| Memberships | `src/components/Memberships.tsx` |
| "Before you come" | `src/components/BeforeYouCome.tsx` |
| Workshops | `src/components/Workshops.tsx` |
| FAQ Q&A | `src/components/FAQ.tsx` |
| Location | `src/components/Location.tsx` |
| Footer links | `src/components/Footer.tsx` (`EXPLORE_LINKS`) |
| Header nav | `src/components/Header.tsx` (`NAV_LINKS`) |

### Subpages

Each lives in its own folder under `src/app/<slug>/page.tsx`:

- `/yoga-lagos-portugal`
- `/pilates-lagos-portugal`
- `/infrared-classes-lagos`
- `/mobility-class-lagos`
- `/muscle-recovery-surfing-lagos`
- `/why-infrared`
- `/things-to-do-lagos-wellness`

**To add a new subpage:**

1. Create `src/app/<new-slug>/page.tsx` — copy an existing subpage as template
2. Update the `metadata` export (title, description, canonical URL)
3. Add the URL to `src/app/sitemap.ts`
4. (Optional) Add to navigation: `Header.tsx` and/or `Footer.tsx`

### Images and video

All media lives in `public/`. Reference from JSX as `/filename.ext` (leading slash).

- Hero video: `public/video.mp4`
- Class images: `public/Pilates.jpg`, `public/Power.jpg`, `public/Recovery.jpg`, etc.
- Teacher headshots: `public/<name> profilbilde.jpg`
- Studio detail shots: `public/DSC*.JPG`, `public/detail.JPG`, `public/heat flow.JPG`

**To swap an image:** drop the new file in `public/`. Either keep the same filename (overwrites) or use a new filename and update the JSX reference.

### SEO

- **Global metadata** (default title, description, OG): `src/app/layout.tsx` — `export const metadata`
- **Per-page metadata**: each `src/app/<slug>/page.tsx` exports its own `metadata`
- **Sitemap**: `src/app/sitemap.ts` — must include every public URL
- **Robots**: `src/app/robots.ts`
- **Schema markup (JSON-LD)**: `src/components/SchemaMarkup.tsx` for global; service schema is inlined in each subpage
- **Dynamic OG image**: `src/app/opengraph-image.tsx`

### Google Tag Manager / Analytics

GTM container `GTM-5WTJ6L62` is already wired up. To add GA4, Meta Pixel, or any other tag, configure it in the GTM dashboard at tagmanager.google.com — no code change required.

## Design rules

The current visual design is approved by the owner's family — preserve it.

- **Do** edit text, copy, images, video, SEO metadata, and subpage content freely
- **Don't** change Tailwind classes that affect layout/spacing/color without an explicit request
- **Don't** restructure or refactor components "for cleanliness"
- **Don't** add new dependencies unless explicitly asked
- **Match** the pattern in surrounding code when adding new sections

If a requested change would alter styling, confirm with Sebastian before doing it.

## Conventions

- Existing image filenames mix conventions (spaces, mixed case) — that's intentional, don't rename them. New files: prefer lowercase-with-dashes (e.g. `new-teacher.jpg`)
- Use straight ASCII quotes (`"`, `'`) in JSX strings — smart quotes can break things
- Components are functional React with TypeScript; keep that pattern
- Tailwind utility classes only — no separate CSS files except `src/app/globals.css`

## Common edits — quick recipes

**Change a headline**
1. `grep -r "current text" src/`
2. Edit the string in the file found
3. `npm run build` → push

**Update a teacher's bio**
- Open `src/components/Teachers.tsx`, find the entry in `TEACHERS`, edit the `bio` field

**Add a new class**
- Open `src/components/Classes.tsx`, add an entry to `CATEGORIES` matching existing structure (`name`, `duration`, `description`, `image` path)

**Swap the hero video**
- Replace `public/video.mp4` (or upload a new file and update `VIDEO_DESKTOP`/`VIDEO_MOBILE` constants in `Hero.tsx`)

**Update a page title for SEO**
- Edit the `metadata.title` export in the relevant `page.tsx`

**Add a new image to a section**
- Drop file in `public/`, reference as `/your-file.jpg` in the JSX

## Repo + access

- Repo: https://github.com/kingofthecodecastle/heatlagos (private)
- Owner: Kai Norstrom (`kingofthecodecastle`)
- Sebastian (`sebastianbrosche`) has push access — commit directly to `main`
- Backup is Sebastian's responsibility (e.g. GitHub Action mirroring to his own account, daily local clone, BackHub, etc.)

## When things break

If a deploy fails:
1. Check the Cloudflare Pages build log (or the GitHub commit status check)
2. Run `npm run build` locally — the error will be the same
3. Fix and push again
4. If you're stuck, ping Kai

The previous successful deploy stays live until a new one succeeds, so a broken build doesn't take the site down.
