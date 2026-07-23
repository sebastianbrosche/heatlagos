# Y4B-915 — GBP map pack + review engine (Heat Lagos)

**Date:** 2026-07-23 · **Agent:** ##grok  
**Places snapshot:** `docs/gbp-places-snapshot-2026-07-23.json`  
**Maps CID:** 12993217545226822724  
**Place ID:** `ChIJe-p6C2YxGw0RRCSeMIQuUbQ`  
**Public URL:** https://maps.google.com/?cid=12993217545226822724

GBP edits need **your Google login** (agent cannot post). Code/schema NAP side is shipped on heatlagos.com.

---

## Live public profile (API)

| Field | Value | Match to site? |
|-------|--------|----------------|
| Name | Heat Lagos - Hot Yoga, Pilates & Sculpt | OK (brand + money terms) |
| Address | Edificio da Fabrica da Ribeira, Av. dos Descobrimentos Loja G, 8600-584 Lagos | OK vs schema/footer |
| Phone | +351 927 290 812 | OK |
| Website | `https://heatlagos.com/` | Prefer **www.heatlagos.com** (canonical) |
| Rating | **5.0 / 32 reviews** | Strong |
| Types (API) | gym, health, establishment | Weak for yoga/pilates pack |
| Status | OPERATIONAL | OK |

---

## Owner checklist (do in business.google.com) — ~20 min

### 1. Primary / secondary categories
Keep primary as close to **Yoga studio** or **Pilates studio** as Google allows (not generic gym).

Secondary (keep / add if missing):
- Yoga classes
- Pilates studio
- Fitness center
- Wellness center
- (Optional) Bikram yoga studio only if you still want “hot yoga” capture

### 2. Website field
Set to: `https://www.heatlagos.com/`

### 3. Booking / appointment link
Point to intro or schedule: `https://www.heatlagos.com/hot-yoga-pilates-intro-offer` or `https://www.heatlagos.com/#book`

### 4. Services (short, local keywords)
| Service | Description seed |
|---------|------------------|
| Infrared Pilates Lagos | Mat Pilates in infrared heat, English teachers, drop-ins welcome |
| Hot / heated yoga Lagos | Infrared heated yoga (Power, Flow, Yin), not 40C Bikram by default |
| Heat Sculpt Lagos | Resistance sculpt class in infrared room |
| Mobility + recovery | Surf/sport recovery, mobility, Yin |
| Intro offer | 2 weeks unlimited for new locals |

### 5. Attributes
Wi‑Fi, restroom, women-owned if true, LGBTQ+ friendly if true, wheelchair access (confirm), online classes no.

### 6. Q&A (seed, answer as business)
1. **Do you offer hot yoga in Lagos?** Yes. Infrared heated yoga around 30C. See heatlagos.com/blog/hot-yoga-lagos  
2. **Is it Pilates or reformer?** Mat Pilates in infrared heat (no reformer machines).  
3. **English teachers?** Yes, all classes.  
4. **Parking?** See heatlagos.com/blog/parking-lagos-guide  
5. **Intro offer for locals?** 2 weeks unlimited: heatlagos.com/hot-yoga-pilates-intro-offer  

### 7. Photos (this week)
From Drive folder or IG @heat_lagos. Rename before upload:
- `heat-lagos-infrared-pilates-class-lagos.jpg`
- `heat-lagos-hot-yoga-studio-lagos.jpg`
- `heat-sculpt-class-lagos-portugal.jpg`
- `heat-lagos-studio-exterior-batata.jpg`

Upload 5+ this week; goal 2 photos + 1 short reel weekly after.

---

## Weekly GBP post pack (draft — you paste/publish)

### Post A — commercial (locals)
**Title idea:** Two weeks unlimited for new students  
**Body:**  
New to Heat Lagos? Two weeks unlimited infrared Pilates, yoga, Sculpt and recovery for €79. English classes in central Lagos near Batata. Book: heatlagos.com/hot-yoga-pilates-intro-offer  
**CTA:** Book / Learn more → intro URL  
**Photo:** class in heat

### Post B — educational  
**Body:**  
Hot yoga in Lagos does not have to mean a 40C room. Our infrared classes run around 30C: you still sweat, you can still breathe. Guide: heatlagos.com/blog/hot-yoga-vs-infrared  
**CTA:** Read more

### Post C — community / local  
**Body:**  
Surf in the morning, mobility or Yin in the evening. Recovery classes for Lagos locals and long-stay expats: heatlagos.com/muscle-recovery-surfing-lagos  

Rotate A/B/C. Never auto-post without your OK.

---

## Review engine (locals only)

**Goal:** +4–8 new Google reviews / month that mention **class type + Lagos**.

### Who to ask
- Buyers of **local memberships / intro offer** (not Vacation Week tourists)
- After class 3–5 of intro pack, or after first month membership

### Channel priority
1. In-person (front desk / teacher) after a good class  
2. WhatsApp/SMS the same day  
3. Email 24h later if no review  

### Review link
Paste once into Linear / `docs/GBP-REVIEW-LINK.txt` when you copy from GBP “Get more reviews”.  
Until then use Maps profile: https://maps.google.com/?cid=12993217545226822724

### Message template (WhatsApp)
```
Hey [Name] — so glad you loved [Sculpt / Pilates / Power] today.
If you have 30 seconds, a Google review helps other people in Lagos find us:
[REVIEW_LINK]
Mention the class + Lagos if you can. Thank you 🙏
— Heat
```

### What NOT to do
- No review gating (only send link after positive filter is a grey area; prefer ask everyone who completed intro)
- No fake reviews
- No bulk tourist asks after one drop-in

### Optional product hook (later)
bsport post-class automation → same template; still needs the review URL in secrets.

---

## Site-side shipped (this sprint)

- LocalBusiness JSON-LD: NAP, geo, **openingHours**, **aggregateRating 5/32**, **hasMap** + Maps `sameAs`
- 11 money blog posts re-indexed (were `noindex` — including best yoga/pilates studios)
- Cluster hub/spoke + Article schema (Y4B-914)

---

## Success metrics (2–4 weeks)

| Metric | Now | Target |
|--------|-----|--------|
| Google reviews | 32 | 40+ |
| Map pack “yoga lagos” / “pilates lagos” | not winning | top 3 local |
| Organic “yoga studio lagos algarve” | #22 | top 10 |

Re-check Places rating/count + DataForSEO local pack after owner completes checklist.
