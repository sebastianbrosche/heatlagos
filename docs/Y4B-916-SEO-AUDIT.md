# Y4B-916 — Heat Lagos technical local SEO audit

**Date:** 2026-07-23  
**Agent:** ##grok  
**Site:** https://www.heatlagos.com  
**Repo:** sebastianbrosche/heatlagos  
**Parent:** HET-2 · framework Y4B-340  

Cognee recall used: no (tenant search timed out). Local memory: `seo_routine.md`, `project_heatlagos_marketing.md`, `GROK_SEO_HANDOFF.md`.

---

## Scorecard (live, pre-fix)

| Check | Status | Notes |
|-------|--------|--------|
| `robots.txt` sitemap line | Pass | Points to `https://www.heatlagos.com/sitemap.xml` |
| Host prefers www | Pass | robots Host + site serves www |
| Sitemap live | Pass | 44 URLs (pre-fix), all HTTP 200 |
| Sitemap completeness | **Fail** | 2 live blog posts missing (see below) |
| JSON-LD LocalBusiness / HealthClub | Pass | On all sampled pages via `SchemaMarkup` |
| `priceRange` in schema | **Fail** | Live rendered `"??"` (euro glyph encoding) |
| GTM | Pass | `GTM-5WTJ6L62` in layout |
| GA4 raw `G-L61V7HF6H2` in HTML | N/A | Expected via GTM container, not inline |
| Blog → Book a class | Pass | `SeoPageShell` default `/#book` |
| Blog → class landings | Pass (partial) | Footer/nav hit pilates/yoga/infrared; body CTAs still thin on some posts |
| A/B offer variants in sitemap | **Fail** | 8 letter variants at priority 0.9 (ads noise) |
| GSC verified + sitemap submitted | **Needs owner** | SA list not run this pass (Node not on PATH without fnm); confirm in Search Console |

---

## Findings

### Fixed in this PR

1. **Sitemap gaps** — added:
   - `/blog/infrared-pilates-vs-regular`
   - `/blog/first-hot-yoga-class-lagos`
2. **Sitemap noise** — removed 8 paid A/B landings (`intro-offer-b…e`, `vacation-b…e`). Canonicals stay live for ads.
3. **A/B indexing** — those 8 pages now `robots: noindex, nofollow` and canonical to main offer URLs; also listed under `robots.txt` disallow.
4. **Schema `priceRange`** — `"€€"` → `"$$"` so live JSON-LD stops showing `"??"`.

### Still open (not this PR)

| Item | Ticket / next |
|------|----------------|
| GSC property ownership + sitemap submit confirmation | Owner click in GSC, or SA access |
| Article / BlogPosting JSON-LD per post (only studio graph today) | Follow-up under Y4B-916 or Y4B-914 |
| Hub/spoke internal links + freshness for rank lift | **Y4B-914** |
| GBP map pack + review engine | **Y4B-915** |
| Rank baseline DataForSEO (Lagos PT) | **Y4B-914** |

---

## Deploy notes

- Push to `main` → Cloudflare Pages on `sebastianbrosche/heatlagos`.
- After deploy, re-check:
  - `sitemap.xml` URL count (expect 37: landings + 25 posts, no A/B)
  - homepage JSON-LD `priceRange` === `"$$"`
  - A/B pages send `noindex`

---

## Evidence paths

- Raw crawl notes: `docs/seo-audit-y4b-916-raw.txt`
- Code: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/SchemaMarkup.tsx`, 8 A/B `page.tsx` metadata blocks
