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

### Content created/updated targeting these terms (2026-06-28)
- `/blog/reformer-pilates-lagos` — REWRITTEN: names real reformer studios (Pilates Room Lagos, OMA, SPOT), explains reformer vs mat, positions Heat Lagos as the mat option. We DO say "reformer" throughout so we rank; we do NOT claim to have machines.
- `/blog/hot-yoga-lagos` — hot yoga lagos, infrared conversion
- `/blog/pilates-near-me-lagos` — near-me local intent, pilates algarve
- `/blog/yoga-near-me-lagos` — yoga near me, yoga class near me, tai chi searchers
- `/blog/gym-lagos-portugal` — gym lagos, ginasios lagos, sculpt, boutique fitness
- `/blog/yoga-lagos-guide` — REWRITTEN: now a proper Top 5 numbered list beating TripAdvisor on detail. Heat #1, InLight #2, Algarve Alchemy #3, Espiche Yoga #4, Soluna Space #5.

### Competitive intelligence (researched 2026-06-28)
**Who ranks for "yoga lagos":**
- InLight Studio (inlight.pt) — top direct result, most established in Lagos old town
- TripAdvisor "5 Best Lagos Yoga & Pilates" — basic list, no real detail
- BookYogaRetreats / BookRetreats — retreat aggregators, not local studio guides
- GetYourGuide — booking aggregator

**Studio roster in Lagos (for future content — DO NOT get these wrong):**
| Studio | Type | Notes |
|---|---|---|
| Heat Lagos | mat Pilates, infrared yoga, Sculpt, mobility | Only infrared studio in Algarve. We own this site. |
| InLight Studio | Vinyasa, Hatha, Yin, Rocket, Ashtanga | Longest-running yoga studio in Lagos. inlight.pt |
| Algarve Alchemy | Yoga, Pilates, infrared sauna + ice bath | Above Black & White Cafe, old town. algarve-alchemy.com |
| Espiche Yoga | Multi-style, retreats | Village of Espiche just outside Lagos. espicheyoga.com |
| Soluna Space | Rotating teachers, events, workshops | Venue not fixed studio. solunaspacelagos.com |
| Le Dome | Vinyasa, Yin, Hatha, Pilates, English+French | Bilingual. instagram: le_dome_yoga |
| The Movement Lab | Yoga, Pilates, contemporary + urban dance | Cross-training focus |
| In Harmony Centre | Yoga incl. pregnancy yoga, integrative health | Near marina. inharmony-centre.com |
| Pilates Room Lagos | REFORMER + mat Pilates, tower, Wunda chair | Since 2012. Rua Fernao Villarinho. pilatesroomlagos.com |
| OMA The Spa | Cadillac Pilates + spa | First Cadillac studio in Lagos |
| SPOT Pilates | Reformer + mat | Professional studio |

**Key rule on reformer copy:** We DO write about reformer Pilates in content. We mention real reformer studios (Pilates Room Lagos, OMA, SPOT) honestly. We then position Heat Lagos as the mat Pilates option. We never claim to have reformer machines. This is the correct framing — not avoiding the word.

### Outstanding gaps (next agent: pick up here)
- **"pilates algarve"** — 29 impressions, weak CTR. Needs a dedicated `/blog/pilates-algarve` or standalone `/pilates-algarve` page targeting the wider Algarve region beyond Lagos.
- **"pilates lagos portugal" pillar page** — the `/pilates-lagos-portugal` standalone page may need a refresh with more structured content now that we have competitive intel on the studio roster.
- **Monthly GSC pull** — run this keyword analysis every month, fill any new impression gaps immediately. Pattern: impressions with low CTR = we rank but copy/title not converting = rewrite. No impressions = need a new page.
- **Schema markup** — add Article + LocalBusiness JSON-LD schema to the blog posts for rich results in search. Currently blog posts have no structured data.
- **Internal linking** — the new blog posts do not link to each other. Add cross-links between yoga-lagos-guide, reformer-pilates-lagos, hot-yoga-lagos, and pilates-near-me-lagos so PageRank flows between them.

## Known Constraints
- We DO say "reformer" in content — but we never claim to have reformer machines. Frame as: "here are the reformer studios, here is what mat Pilates is, here is why Heat Lagos chose mat."
- Infrared, NOT hot yoga (40 degrees C). Ours is 30 degrees C. Always convert hot yoga searchers, never promise the same experience.
- Infrared, NOT hot yoga (40°C). Ours is 30°C. Convert not correct.
- No em dashes in any public copy.
- Seasonal: peak July–Sept, slow Nov–Mar. Adjust messaging by season.
- bsport API: all calls via PowerShell (browser fetch hangs — connection pool exhaustion).
- Cloudflare deploy: `npm run build` then `npx wrangler pages deploy out --project-name=heatlagos`
- CF token: stored in C:/Users/Admin/.api_tokens.json (see CLAUDE_OPS.md — never commit the value)
