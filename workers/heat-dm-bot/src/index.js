/**
 * Heat Lagos — Instagram / Facebook DM auto-reply bot.
 *
 * Routes:
 *   GET  /webhook   - Meta webhook verification handshake
 *   POST /webhook   - Meta message events -> Claude reply -> Graph API send
 *   GET  /learned   - studio approval page for answers the bot has learned
 *
 * Learning: hand-typed studio replies are saved as pending Q&A, approved on the
 * /learned page, then reused (injected into the prompt) for similar questions.
 *
 * (Legal pages live on the main site at heatlagos.com/privacy and /terms,
 * served by Cloudflare Pages — not from this Worker.)
 *
 * Secrets / vars:
 *   META_VERIFY_TOKEN   - webhook handshake string (var)
 *   META_APP_SECRET     - verifies X-Hub-Signature-256 (secret)
 *   META_PAGE_TOKEN     - Facebook Page token, sends Messenger replies (secret)
 *   IG_ACCESS_TOKEN     - Instagram Login token, sends Instagram DM replies (secret)
 *   ANTHROPIC_API_KEY   - Claude API key (secret)
 *   WHATSAPP_TOKEN      - WhatsApp Cloud API system user token (secret)
 *   WHATSAPP_PHONE_ID   - WhatsApp phone number ID from Meta dashboard (secret)
 */

const FB_GRAPH = "https://graph.facebook.com/v21.0";
const IG_GRAPH = "https://graph.instagram.com/v21.0";
const MODEL = "claude-haiku-4-5";

const SYSTEM_PROMPT = `You are the friendly front-desk assistant for Heat Lagos, an
infrared-heated Pilates, Yoga, Sculpt, Mobility and Recovery studio in Lagos, Portugal.
You reply to direct messages on Instagram, Facebook and WhatsApp.

ONLY use the facts below. Never invent prices, class times, schedules, teacher names,
policies or studio details.

MOST IMPORTANT RULE: only reply when you have a clear answer grounded in the facts below
or in an approved answer provided to you. If you do NOT have a clear answer, do NOT guess
and do NOT send a generic holding message. Instead reply with exactly this token and
nothing else: NO_ANSWER. The studio will then answer that message personally, and you will
learn from their reply for next time. It is always better to stay silent than to guess.

The studio:
- Infrared radiant panels warm the body directly. The room sits at about 30C, gentler
  and easier to breathe than traditional hot yoga (which runs 40C+ with forced air),
  with lower humidity.
- All classes are taught in English (we do not teach in Portuguese). Complete beginners
  are welcome; teachers give options for every level.
- If someone writes to you in Portuguese, you may reply in Portuguese, but make clear that
  the classes themselves are taught in English.

Classes (all heated):
- Heat Pilates (50 min): slow, precise mat work for deep core strength.
- Heat Sculpt (50 min): weights and resistance for full-body strength.
- Heat Power (60 min): a challenging, physically demanding power yoga.
- Heat Flow (60 min): breath-led, fluid yoga flow.
- Heat Mobility (45 min): targeted joint and tissue work for easier movement.
- Heat Recovery (45 min): mobility, breathwork, yin holds and deep rest.
- Heat Yin (60 min): long, still, deep holds.

Recommending a class:
- First-timers: Heat Pilates is a great first class, more physically challenging but
  easy to follow. Heat Yin is also very easy to follow and gentle. If they are tired or
  run-down, Heat Recovery is lovely. Do not steer a complete beginner to Heat Flow as
  their very first class; it is not demanding, but the sequencing can feel confusing
  before they know the studio.
- Fat loss, toning or the hardest workout: recommend Heat Sculpt. It is also the most
  physically intense class overall.
- Recovery after surfing, running or the gym: any of Heat Recovery, Heat Mobility or
  Heat Yin works well; let them pick by the vibe they want.

Prices (every membership includes all classes; all bookable on the website):
- 2-for-1 Intro Offer: this means two classes for the price of one for a single new
  student (pay 22 EUR, get a second class free, about 11 EUR each). It is NOT two people
  sharing one pass; everyone needs their own account and signup. There is no deadline or
  window to claim it.
- Intro Offer: 79 EUR, 2 weeks unlimited, for new students. The best way to start.
- Single Drop-in: 22 EUR, one class.
- Vacation Week: 59 EUR, 7 days unlimited (great for visitors to Lagos).
- 10 Class Package: 180 EUR, valid 3 months.
- Essential: 95 EUR/month, 8 classes a month, rolling subscription.
- 12 Month Membership: 125 EUR/month, unlimited, rolling subscription (best value).
- 1 Month: 160 EUR, unlimited, no commitment.
- Yearly: 1200 EUR, unlimited, saves 300 EUR.

What to bring & facilities:
- Mats are provided free. You are welcome to bring your own mat if you like to double up
  for extra cushioning. If asked what mats we use or recommend, Shakti Warrior mats and
  the Manduka Pro series are both great.
- Wear normal fitness wear, whatever you would wear to the gym.
- Towels: from 1 July a towel is mandatory for hygiene. Rent one of ours for 3 EUR, or
  bring your own.
- No showers yet. We plan to add one this autumn. The ocean is right across the street
  if you want to cool off after class.
- Free water refill station at the studio. Bring your own bottle.

Parking:
- No parking right outside the studio. There is paid parking across the street but it
  fills up quickly. The easiest option is free parking about 5 minutes away, in the big
  sand car park next to the fire station.

Heat & health:
- The infrared heat is gentle at 30C, but people with low blood pressure can feel dizzy
  in heated classes. If that's you, choose a spot in a corner or near the exit. You are
  always welcome to take a break or rest at any point in class - this is not a military
  camp, we want you to feel good.
- If someone mentions a specific medical condition beyond low blood pressure, say a team
  member will be happy to advise and invite them to email hello@heatlagos.com.

Booking & schedule:
- The full, live class schedule and all bookings are on https://www.heatlagos.com. It
  updates daily and you book straight from the page.
- You do NOT know specific class times or today's timetable. For "what time" or "what's
  on today" questions, point people to the schedule on the website. Never state a time.
- Classes are booked in advance online. Currently you can cancel up to 3 hours before
  class. Say "currently" or "for now", as this policy may change; do not present 3 hours
  as a permanent fixed rule.

Arriving & studio etiquette:
- Doors open 15 minutes before class, which gives you time to settle your mind before you
  begin. With a good reason we can let you in a couple of minutes late, but we are not the
  kind of studio where you drift in 15 minutes after the start. The calm vibe matters to
  us, and arriving late disrupts the class for the teacher and everyone else. Be warm
  about this, not preachy.

Lost property:
- We never throw away lost items. If someone left something behind, reassure them we have
  it and they can pop in to pick it up anytime; we will keep it safe for them.

Gift cards:
- Not available yet, but coming soon. Invite them to follow @heat_lagos or subscribe to
  the newsletter for the launch.

Private & group bookings:
- We can host group and event bookings (for example friends, hen parties or corporate
  groups). We do not offer one-on-one private sessions. To arrange a group, invite them
  to email hello@heatlagos.com.

Memberships & policies:
- You can cancel a membership any time, unless you are on a 12-month contract.
- You can freeze a membership for up to 8 weeks per year.

Family & kids:
- Classes are for adults. There is no kids area inside the studio, but the Family Hub
  next door has a nice play area, so one parent can relax there while the other practices.

Pregnancy & postpartum:
- Dedicated pregnancy and postpartum courses start this October. Invite them to subscribe
  to the newsletter or follow @heat_lagos on Instagram for updates and dates.

Location & contact:
- Edificio da Fabrica da Ribeira, Av. dos Descobrimentos, Loja G, 8600-854 Lagos,
  Portugal. The beach is right across the street.
- hello@heatlagos.com / +351 927 290 812.

Style:
- Warm, concise, helpful. This is a DM, so keep replies to 1-3 short sentences.
- Match Stine's warm, casual tone and word choice (she writes simply and kindly, often
  with a friendly emoji).
- NEVER use em-dashes. Use a comma, period or normal hyphen instead.
- When someone shows interest, point them to https://www.heatlagos.com to book.
- No medical advice. For group or retreat enquiries, be warm and welcoming and ask them
  to email the specifics to hello@heatlagos.com.
- If a question is not covered by the facts above or an approved answer (for example
  injuries, refunds, complaints, account or billing issues), reply with NO_ANSWER so the
  studio can handle it personally. Do not guess.`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname.startsWith("/learned")) {
      return handleLearnedUI(url, env);
    }

    if (request.method === "GET" && url.pathname === "/admin/scan-dms") {
      return handleScanDMs(url, env);
    }

    if (request.method === "GET" && url.pathname === "/admin/test") {
      return handleTestReply(url, env);
    }

    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && token === env.META_VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      }
      return new Response("Forbidden", { status: 403 });
    }

    if (request.method === "POST") {
      const raw = await request.text();
      if (!(await verifySignature(request, raw, env.META_APP_SECRET))) {
        return new Response("Bad signature", { status: 403 });
      }
      let payload;
      try {
        payload = JSON.parse(raw);
      } catch {
        return new Response("Bad JSON", { status: 400 });
      }
      const handler =
        payload.object === "whatsapp_business_account"
          ? handleWhatsApp
          : handleEvents;
      ctx.waitUntil(handler(payload, env));
      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    return new Response("Heat Lagos DM bot", { status: 200 });
  },

  // Weekly cron: refresh the Instagram long-lived token so it never expires.
  async scheduled(event, env, ctx) {
    ctx.waitUntil(refreshIgToken(env));
  },
};

// Instagram long-lived tokens last ~60 days and can be extended any time after
// they are 24h old. We refresh weekly and store the new token in KV, which the
// fetch handler reads first. The current token is taken from KV (or the
// IG_ACCESS_TOKEN secret on the very first run).
async function refreshIgToken(env) {
  const current =
    (await env.TOKENS?.get("IG_ACCESS_TOKEN")) || env.IG_ACCESS_TOKEN;
  if (!current) {
    console.log("refresh skipped: no current IG token");
    return;
  }
  const res = await fetch(
    `${IG_GRAPH.replace("/v21.0", "")}/refresh_access_token` +
      `?grant_type=ig_refresh_token&access_token=${current}`,
  );
  if (!res.ok) {
    console.log("ig token refresh failed:", res.status, await res.text());
    return;
  }
  const data = await res.json();
  if (data.access_token) {
    await env.TOKENS.put("IG_ACCESS_TOKEN", data.access_token);
    console.log("ig token refreshed, expires_in:", data.expires_in);
  }
}

async function handleEvents(payload, env) {
  // "instagram" events reply via graph.instagram.com with the IG token;
  // "page" (Messenger) events reply via graph.facebook.com with the Page token.
  const isInstagram = payload.object === "instagram";
  const base = isInstagram ? IG_GRAPH : FB_GRAPH;
  const token = isInstagram
    ? (await env.TOKENS?.get("IG_ACCESS_TOKEN")) ||
      env.IG_ACCESS_TOKEN ||
      env.META_PAGE_TOKEN
    : env.META_PAGE_TOKEN;

  const channel = isInstagram ? "instagram" : "messenger";

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const text = event.message?.text;
      if (!text) continue;

      // Outbound echo: if the studio typed this reply by hand (not the bot),
      // capture it as a pending answer to learn from.
      if (event.message?.is_echo) {
        const userId = event.recipient?.id;
        if (userId) await captureManualReply(env, userId, channel, text);
        continue;
      }

      const senderId = event.sender?.id;
      if (!senderId) continue;
      // Remember this question so a later manual reply can be paired with it.
      await env.TOKENS?.put("q:" + senderId, text, { expirationTtl: 604800 });

      // Kill switch: when paused, capture/learn but never auto-reply to members.
      if (!(await botEnabled(env))) continue;

      try {
        const reply = await draftReply(text, env);
        if (reply) {
          await sendMessage(base, token, senderId, reply);
          // Mark as bot-sent so its echo isn't mislearned as a manual reply.
          await env.TOKENS?.put("sent:" + hash(senderId + "|" + reply), "1", {
            expirationTtl: 3600,
          });
        }
      } catch (err) {
        console.log("reply failed:", err.message);
      }
    }
  }
}

// Master on/off switch. The bot only auto-replies when KV BOT_ENABLED === "true".
// Anything else (missing, "false") means paused — fail-safe to OFF.
async function botEnabled(env) {
  return (await env.TOKENS?.get("BOT_ENABLED")) === "true";
}

async function handleWhatsApp(payload, env) {
  const token = env.WHATSAPP_TOKEN;
  const phoneNumberId = env.WHATSAPP_PHONE_ID;
  if (!token || !phoneNumberId) {
    console.log("whatsapp: missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID");
    return;
  }

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      if (change.field !== "messages") continue;
      for (const msg of change.value?.messages ?? []) {
        if (msg.type !== "text") continue;
        const from = msg.from;
        const text = msg.text?.body;
        if (!from || !text) continue;

        await env.TOKENS?.put("q:" + from, text, { expirationTtl: 604800 });

        // Kill switch: when paused, never auto-reply to members.
        if (!(await botEnabled(env))) continue;

        try {
          const reply = await draftReply(text, env);
          if (reply) await sendWhatsApp(phoneNumberId, token, from, reply);
        } catch (err) {
          console.log("whatsapp reply failed:", err.message);
        }
      }
    }
  }
}

async function sendWhatsApp(phoneNumberId, token, to, text) {
  const res = await fetch(
    `${FB_GRAPH}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    },
  );
  if (!res.ok) throw new Error("wa send " + res.status + " " + (await res.text()));
}

async function draftReply(message, env) {
  let system = SYSTEM_PROMPT;
  const matches = matchAnswers(message, await approvedAnswers(env));
  if (matches.length) {
    system +=
      "\n\nThe studio has approved these answers to questions like this. If one " +
      "fits, base your reply on it and do not contradict it:\n" +
      matches.map((m) => `- Q: ${m.question}\n  A: ${m.answer}`).join("\n");
  }

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 300,
      system,
      messages: [{ role: "user", content: message }],
    }),
  });
  if (!res.ok) throw new Error("anthropic " + res.status + " " + (await res.text()));
  const data = await res.json();
  const reply = data.content?.[0]?.text?.trim();
  // The bot returns NO_ANSWER when it has no clear answer. Send nothing so the
  // studio replies personally (and the bot learns from that reply).
  if (!reply || reply.includes("NO_ANSWER")) return null;
  return reply;
}

async function sendMessage(base, token, recipientId, text) {
  const res = await fetch(`${base}/me/messages?access_token=${token}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      messaging_type: "RESPONSE",
    }),
  });
  if (!res.ok) throw new Error("send " + res.status + " " + (await res.text()));
}

async function verifySignature(request, raw, appSecret) {
  if (!appSecret) return true;
  const header = request.headers.get("x-hub-signature-256");
  if (!header?.startsWith("sha256=")) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(appSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(raw));
  const expected = [...new Uint8Array(sig)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return timingSafeEqual(header.slice(7), expected);
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---- Learning: capture, reuse and approve studio answers --------------------

// Save a hand-typed studio reply as a pending Q&A (skipping the bot's own
// sends, which are marked in KV). The studio approves it before it is reused.
async function captureManualReply(env, userId, channel, answer) {
  if (!env.DB) return;
  if (await env.TOKENS?.get("sent:" + hash(userId + "|" + answer))) return;
  const question = await env.TOKENS?.get("q:" + userId);
  if (!question) return;
  try {
    await env.DB.prepare(
      "INSERT INTO learned (question, answer, channel, status) VALUES (?, ?, ?, 'pending')",
    )
      .bind(question, answer, channel)
      .run();
  } catch (err) {
    console.log("learn insert failed:", err.message);
  }
}

async function approvedAnswers(env) {
  if (!env.DB) return [];
  try {
    const { results } = await env.DB.prepare(
      "SELECT question, answer FROM learned WHERE status = 'approved'",
    ).all();
    return results ?? [];
  } catch (err) {
    console.log("learned query failed:", err.message);
    return [];
  }
}

// Cheap keyword overlap so we only inject answers relevant to this message.
function matchAnswers(message, rows, limit = 3) {
  const words = new Set((message.toLowerCase().match(/[a-z0-9]+/g) ?? []));
  return rows
    .map((r) => {
      let score = 0;
      for (const w of r.question.toLowerCase().match(/[a-z0-9]+/g) ?? []) {
        if (w.length > 2 && words.has(w)) score++;
      }
      return { ...r, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h << 5) - h + s.charCodeAt(i);
    h |= 0;
  }
  return (h >>> 0).toString(16);
}

function esc(s) {
  return String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
}

// Simple password-in-URL page where the studio approves or rejects the answers
// the bot has learned. Linked from nowhere; share the URL with the key.
async function handleLearnedUI(url, env) {
  const key = await env.TOKENS?.get("LEARN_KEY");
  if (!env.DB || !key || url.searchParams.get("key") !== key) {
    return new Response("Forbidden", { status: 403 });
  }

  const id = url.searchParams.get("id");
  if (url.pathname === "/learned/approve" && id) {
    await env.DB.prepare("UPDATE learned SET status='approved' WHERE id=?")
      .bind(id)
      .run();
    return Response.redirect(url.origin + "/learned?key=" + key, 302);
  }
  if (url.pathname === "/learned/reject" && id) {
    await env.DB.prepare("UPDATE learned SET status='rejected' WHERE id=?")
      .bind(id)
      .run();
    return Response.redirect(url.origin + "/learned?key=" + key, 302);
  }

  const { results } = await env.DB.prepare(
    "SELECT id, question, answer, channel, created_at FROM learned WHERE status='pending' ORDER BY created_at DESC",
  ).all();

  const cards = (results ?? [])
    .map(
      (r) => `
    <div style="border:1px solid #e5e0db;border-radius:12px;padding:16px;margin:16px 0">
      <div style="color:#8A8682;font-size:12px">${esc(r.channel)} · ${esc(r.created_at)}</div>
      <p><strong>Q:</strong> ${esc(r.question)}</p>
      <p><strong>A:</strong> ${esc(r.answer)}</p>
      <a href="/learned/approve?id=${r.id}&key=${esc(key)}"
         style="background:#FC966A;color:#fff;text-decoration:none;padding:8px 16px;border-radius:8px;margin-right:8px">Approve</a>
      <a href="/learned/reject?id=${r.id}&key=${esc(key)}"
         style="color:#8A8682">Reject</a>
    </div>`,
    )
    .join("");

  const html = `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Heat Lagos — answers to approve</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:24px auto;padding:0 16px;color:#3a3633">
<h1 style="color:#FC966A">Answers to approve</h1>
<p style="color:#8A8682">Approve an answer to let the bot reuse it for the next person who asks something similar.</p>
${cards || "<p>Nothing waiting — you're all caught up 🎉</p>"}
</body></html>`;
  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

// Scan recent Instagram conversations and save real customer Q&A pairs as
// pending entries in the learned table. Protected by the same LEARN_KEY.
async function handleScanDMs(url, env) {
  const key = await env.TOKENS?.get("LEARN_KEY");
  if (!key || url.searchParams.get("key") !== key) {
    return new Response("Forbidden", { status: 403 });
  }

  const token =
    (await env.TOKENS?.get("IG_ACCESS_TOKEN")) || env.IG_ACCESS_TOKEN;
  if (!token) {
    return new Response("No IG token found", { status: 500 });
  }

  // Fetch up to 30 recent conversations
  const convoRes = await fetch(
    `${IG_GRAPH}/me/conversations?platform=instagram&fields=id,participants&limit=30&access_token=${token}`,
  );
  if (!convoRes.ok) {
    const err = await convoRes.text();
    return new Response("IG conversations error: " + err, { status: 500 });
  }
  const convoData = await convoRes.json();
  const conversations = convoData.data ?? [];

  let saved = 0;
  let skipped = 0;
  const log = [];

  for (const convo of conversations) {
    // Fetch last 20 messages in this conversation
    const msgRes = await fetch(
      `${IG_GRAPH}/${convo.id}/messages?fields=id,from,to,message,created_time&limit=20&access_token=${token}`,
    );
    if (!msgRes.ok) continue;
    const msgData = await msgRes.json();
    const msgs = (msgData.data ?? []).reverse(); // oldest first

    // Find the studio's own IG user id from the first studio message
    const studioId = msgs.find((m) => m.from?.username === "heat_lagos")?.from?.id;

    // Walk messages: when a customer asks something, look for the next studio reply
    for (let i = 0; i < msgs.length - 1; i++) {
      const m = msgs[i];
      const isCustomer = studioId ? m.from?.id !== studioId : m.from?.username !== "heat_lagos";
      if (!isCustomer) continue;
      const question = m.message?.trim();
      if (!question || question.length < 5) continue;

      // Find the next studio reply
      const reply = msgs.slice(i + 1).find((r) => {
        const isStudio = studioId ? r.from?.id === studioId : r.from?.username === "heat_lagos";
        return isStudio && r.message?.trim().length > 5;
      });
      if (!reply) continue;

      const answer = reply.message.trim();
      // Skip if we already have this pair
      try {
        const existing = await env.DB.prepare(
          "SELECT id FROM learned WHERE question=? AND answer=?",
        ).bind(question, answer).first();
        if (existing) { skipped++; continue; }

        await env.DB.prepare(
          "INSERT INTO learned (question, answer, channel, status) VALUES (?, ?, 'instagram', 'pending')",
        ).bind(question, answer).run();
        saved++;
        log.push({ q: question.slice(0, 80), a: answer.slice(0, 80) });
      } catch (err) {
        log.push({ err: err.message });
      }
    }
  }

  const rows = log.map((l) =>
    l.err
      ? `<li style="color:red">${esc(l.err)}</li>`
      : `<li><strong>Q:</strong> ${esc(l.q)}<br><strong>A:</strong> ${esc(l.a)}</li>`,
  ).join("");

  const learnKey = key;
  const html = `<!doctype html><html><head><meta charset="utf-8">
<title>Heat Lagos — DM scan</title></head>
<body style="font-family:system-ui,sans-serif;max-width:640px;margin:24px auto;padding:0 16px;color:#3a3633">
<h1 style="color:#FC966A">DM scan complete</h1>
<p>Conversations scanned: <strong>${conversations.length}</strong> &nbsp;|&nbsp;
   Saved: <strong>${saved}</strong> &nbsp;|&nbsp;
   Skipped (duplicate): <strong>${skipped}</strong></p>
<p><a href="/learned?key=${esc(learnKey)}">Go to approval page &rarr;</a></p>
<ul style="line-height:1.8">${rows || "<li>No new Q&amp;A pairs found.</li>"}</ul>
</body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
}

// Roleplay/test endpoint: ask the live bot a question and see its real reply
// (or whether it would stay silent). Protected by LEARN_KEY. Does not send
// anything to anyone; it only runs draftReply and shows the result.
async function handleTestReply(url, env) {
  const key = await env.TOKENS?.get("LEARN_KEY");
  if (!key || url.searchParams.get("key") !== key) {
    return new Response("Forbidden", { status: 403 });
  }
  const q = url.searchParams.get("q");
  if (!q) {
    return new Response(
      JSON.stringify({ error: "add ?q=your+question" }),
      { headers: { "content-type": "application/json" } },
    );
  }
  let reply, error;
  try {
    reply = await draftReply(q, env);
  } catch (err) {
    error = err.message;
  }
  return new Response(
    JSON.stringify(
      {
        question: q,
        reply: reply ?? null,
        silent: reply == null,
        note: reply == null ? "Bot would stay silent (NO_ANSWER) so Stine answers." : undefined,
        error,
      },
      null,
      2,
    ),
    { headers: { "content-type": "application/json" } },
  );
}
