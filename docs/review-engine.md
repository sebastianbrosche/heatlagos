# Heat Lagos — Review Engine (NURTURE automation)

Goal: systematically turn class attendees into Google (priority) + TripAdvisor reviews, escalating gently until they review, then thank them + add a class credit. Sebastian's spec, 2026-06-18.

## Links
- **Google review (PRIORITY):** https://search.google.com/local/writereview?placeid=ChIJe-p6C2YxGw0RRCSeMIQuUbQ
- TripAdvisor (alternate): [TODO get Heat Lagos TripAdvisor listing URL]
- Place: Heat Lagos - Hot Yoga, Pilates & Sculpt, Av. dos Descobrimentos Loja G, 8600-854 Lagos. place_id ChIJe-p6C2YxGw0RRCSeMIQuUbQ.

## Flow (escalating ask)
1. **After 1st class** (~3-4h later): Ask #1 -> Google link.
2. **No review after ~3 days:** Reminder #2 (Google again; can alternate to TripAdvisor, but Google first).
3. **Attends 2nd class, still no review:** Ask #3 (keep gently bugging).
4. Continue light nudges every ~5-7 days until they review or opt out.
5. **Detect review** -> stop asking -> **Thank-you + add account CREDIT** + tell them about the credit.

## Review detection
- Monitor new Google reviews via Google Business Profile / Places API + GBP email notifications; match reviewer first name to the member (fuzzy + timing). TripAdvisor: monitor listing.
- Imperfect, so also stop on: member replies that they did it, or a tracked-link click.
- We already get GBP review notifications (e.g. Sarah, Weitt). Use those as the trigger to thank + credit.

## Message copy (Heat voice, no em dashes)
**Ask #1 - how was your first class?**
Hi [name], it was so good to have you on the mat at Heat. How did your first class feel? If you enjoyed it, the single biggest thing you can do for a small studio like ours is leave a quick Google review, it genuinely makes a huge difference. Takes about 30 seconds: [Google link]. Thank you, and see you again soon.

**Reminder #2 (no review, ~3 days)**
Hi [name], hope you are still feeling good after your class at Heat. If you have a spare moment, a quick review would mean the world to us. Google: [link] (or TripAdvisor if you prefer: [link]). Thank you so much.

**Ask #3 (2nd class, still no review)**
Hi [name], loved having you back at Heat. Since you are becoming a regular, would you mind dropping us a quick review? It helps other people in Lagos find us. Google: [link]. It really does help, thank you.

**Thank-you + credit (after they review)**
Hi [name], thank you so much for the review, it means a lot to us and to the whole Heat community. As a thank you, I have added a credit to your account, so your next class is on us. See you on the mat soon.

## Build / dependencies
- TRIGGERS (1st class, 2nd class attended), SENDING messages, and ADDING CREDITS all require bsport BACK-OFFICE API access — currently gated (the public API key 403s on member/booking; scope-upgrade requested from Alba, or use the session-token method like Automation #1).
- The ask emails can run as bsport NATIVE automations (same engine as the existing "first class welcome email" / Automation #1) once back-office access is live, OR via Resend with attendance data.
- Review-ask copy + Google link are READY now. TripAdvisor URL still needed.
- This is part of NURTURE [[project-bsport-automations]] [[project-gbp-heatlagos]].
