# Heat Lagos — Strategy

## Problem We Solve
People in Lagos (tourists + locals) want high-quality, low-impact fitness that isn't a generic gym. They don't know infrared exists, can't find mat Pilates anywhere nearby, and have nowhere to recover after surfing or sport. Heat Lagos is the only infrared-heated boutique studio in the Algarve.

## Our Approach
Position as the *mat Pilates + Sculpt* studio first (highest local search intent, no competition). Convert "hot yoga" searchers with the infrared story. Build trust through community, GBP presence, and Instagram. Drive bookings through bsport. Grow teacher-training as a second revenue leg.

## Users / Personas

**Local Regular (Maria, 32, Lagos)** — works in tourism, wants a strong weekly routine. Pilates + Sculpt 2-3x/week. Cares about community and instructors. Books via app. Price-sensitive on drop-in, loyal on membership.

**Algarve Visitor (James, 38, UK/DE/NO)** — 1–2 week holiday, surfs in morning, wants recovery/yoga. Buys Vacation Week (€59) or drop-in (€22). Finds us on Google Maps. Responds to "hot yoga" + "infrared" language.

**YTT Candidate (Anna, 29, Nordic/UK)** — wants to teach, looking for a training in Europe that isn't India. Budget €1,490–1,650. Finds us via Google + travel blogs. Converts on the program quality story.

## Key Metrics
- Weekly active members (target: 60+ by Sep 2026)
- Monthly recurring revenue (memberships + packs)
- GBP listing rank for "pilates lagos", "hot yoga lagos", "infrared yoga algarve"
- YTT spots filled (200h: 15 max, Sculpt TT: 20 max)
- Review velocity (Google + Booking.com)

## Business Stack
- **Bookings:** bsport (backoffice.bsport.io, membership=5821)
- **Website:** heatlagos.com (Next.js, Cloudflare Pages, `heatlagos` project)
- **Email/Automations:** bsport native + Resend
- **SEO/Content:** heatlagos.com/blog, Google Business Profile
- **Social:** Instagram @heat_lagos
- **Analytics:** PostHog (on site), Google Search Console

## Active Development Tracks

### GROW (acquire new students)
- GBP weekly post cadence (2 posts + photos/video)
- IG → GBP upcycling pipeline (need Instagram Graph API token)
- Blog SEO (pilates/yoga/sculpt/infrared keyword cluster)
- BYR listing (158895 + 158889) — both submitted for review

### NURTURE (keep + reactivate members)
- bsport Automation #1: post-first-class follow-up email (staged OFF, id=32442)
- Win-back flow: lapsed members (smartlist + Resend email — not built yet)
- Review loop: Google review ask in post-class automation

## GSC Keyword Data (2026-06-28) — Target Everything Here

Data from three GSC properties. Goal: win every term in this vertical completely.

### heatlagos.com — main site (top performers)
| Query | Clicks | Impressions | CTR | Priority |
|---|---|---|---|---|
| heat lagos | 160 | 239 | 67% | branded, protect |
| pilates lagos | 31 | 297 | 10% | primary money term |
| pilates lagos portugal | 14 | 126 | 11% | strong |
| heat lagos yoga | 12 | 18 | 67% | branded |
| pilates near me | 8 | 54 | 15% | local intent |
| lagos pilates | 7 | 71 | 10% | same as pilates lagos |
| heat yoga | 6 | 9 | 67% | branded |
| heat pilates | 6 | 7 | 67% | branded |
| yoga lagos | 4 | 239 | 1.7% | **BIG gap — 239 impressions, 4 clicks** |
| yoga lagos portugal | 4 | 116 | 3.4% | **big gap** |

### Secondary property — mid-range
| Query | Clicks | Impressions |
|---|---|---|
| pilates | 4 | 68 |
| hot yoga lagos | 4 | 7 |
| yoga near me | 3 | 43 |
| pilates in lagos portugal | 3 | 15 |
| yoga | 3 | 13 |
| tai chi lagos | 3 | 12 |
| lagos yoga | 2 | 52 |
| reformer pilates lagos portugal | 2 | 50 |
| pilates algarve | 2 | 29 |
| hot yoga | 2 | 19 |

### Third property — local/discovery
| Query | Clicks | Impressions |
|---|---|---|
| pilates classes near me | 1 | 121 |
| reformer pilates lagos | 1 | 21 |
| reformer pilates | 1 | 13 |
| gym lagos | 1 | 9 |
| yoga studios near me | 1 | 9 |
| bikram yoga | 1 | 6 |
| sculpt lagos | 1 | 6 |
| pilates class near me | 1 | 3 |
| yoga class near me | 1 | 2 |
| ginasios lagos | 1 | 2 |

### Content already created targeting these terms (2026-06-28)
- `/blog/reformer-pilates-lagos` — reformer vs mat, converts reformer searches
- `/blog/hot-yoga-lagos` — hot yoga lagos, infrared conversion
- `/blog/pilates-near-me-lagos` — near-me local intent, pilates algarve
- `/blog/yoga-near-me-lagos` — yoga near me, yoga class near me, tai chi searchers
- `/blog/gym-lagos-portugal` — gym lagos, ginasios lagos, sculpt, boutique fitness

### Outstanding gaps (next agent: create posts for these)
- "yoga lagos" has 239 impressions, 1.7% CTR — needs a dedicated pillar page or major refresh of yoga-lagos-guide
- "reformer pilates lagos portugal" — already covered in reformer-pilates-lagos post
- "pilates algarve" — partially covered, could build a dedicated /pilates-algarve page
- Any new terms that appear in GSC — run this analysis monthly and fill gaps immediately

## Known Constraints
- No reformers — mat Pilates only. Never say "reformer".
- Infrared, NOT hot yoga (40°C). Ours is 30°C. Convert not correct.
- No em dashes in any public copy.
- Seasonal: peak July–Sept, slow Nov–Mar. Adjust messaging by season.
- bsport API: all calls via PowerShell (browser fetch hangs — connection pool exhaustion).
- Cloudflare deploy: `npm run build` then `npx wrangler pages deploy out --project-name=heatlagos`
- CF token: stored in C:/Users/Admin/.api_tokens.json (see CLAUDE_OPS.md — never commit the value)
