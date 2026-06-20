/**
 * Heat Lagos — Instagram / Facebook DM auto-reply bot.
 *
 * A single Cloudflare Worker that:
 *   1. Answers Meta's webhook verification handshake (GET).
 *   2. Receives message events (POST) for Instagram DMs and Messenger.
 *   3. Asks Claude to draft a short, on-brand reply.
 *   4. Sends the reply back through the Meta Graph API.
 *
 * Secrets / vars (set with `wrangler secret put` or in wrangler.toml [vars]):
 *   META_VERIFY_TOKEN  - shared string used only for the webhook handshake (var)
 *   META_APP_SECRET    - app secret, used to verify the X-Hub-Signature-256 (secret)
 *   META_PAGE_TOKEN    - long-lived Page access token used to send replies (secret)
 *   ANTHROPIC_API_KEY  - Claude API key (secret)
 */

const GRAPH = "https://graph.facebook.com/v21.0";
const MODEL = "claude-haiku-4-5";

const SYSTEM_PROMPT = `You are the friendly front-desk assistant for Heat Lagos, an
infrared-heated Pilates, Yoga, Sculpt, Mobility and Recovery studio in Lagos, Portugal.
You reply to Instagram and Facebook direct messages.

Facts you can use:
- Classes: Infrared Pilates, Power Yoga, Flow Yoga, Sculpt, Mobility, Recovery, Yin.
- Room is infrared-heated to about 30-32C. Towels provided.
- Intro offer: 3 classes for 55 EUR. Single drop-in 22 EUR. Memberships and class
  packs also available.
- Booking and full schedule: https://www.heatlagos.com (Book button).
- Location: Edificio da Fabrica da Ribeira, Av. dos Descobrimentos, Loja G,
  8600-854 Lagos, Portugal. The beach is right across the street.
- Contact a human: hello@heatlagos.com / +351 927 290 812.

Style:
- Warm, concise, and helpful. This is a DM, so keep replies to 1-3 short sentences.
- Always point people to the website to book when they show interest.
- Do not give medical advice. For injuries, refunds, complaints or anything you are
  unsure about, say a team member will follow up personally, and invite them to email
  hello@heatlagos.com.
- Never invent prices, schedules or policies that are not listed above.`;

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Webhook verification handshake.
    if (request.method === "GET") {
      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && token === env.META_VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      }
      return new Response("Forbidden", { status: 403 });
    }

    // 2. Incoming events.
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

      // Acknowledge immediately; process replies in the background so Meta
      // never sees a slow response and retries.
      ctx.waitUntil(handleEvents(payload, env));
      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    return new Response("Heat Lagos DM bot", { status: 200 });
  },
};

async function handleEvents(payload, env) {
  // Both "instagram" and "page" objects deliver messages under entry[].messaging[].
  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id;
      const text = event.message?.text;

      // Skip echoes of our own messages, delivery receipts, reactions, etc.
      if (!senderId || !text || event.message?.is_echo) continue;

      try {
        const reply = await draftReply(text, env.ANTHROPIC_API_KEY);
        if (reply) await sendMessage(senderId, reply, env.META_PAGE_TOKEN);
      } catch (err) {
        console.log("reply failed:", err.message);
      }
    }
  }
}

async function draftReply(message, apiKey) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: message }],
    }),
  });
  if (!res.ok) throw new Error("anthropic " + res.status + " " + (await res.text()));
  const data = await res.json();
  return data.content?.[0]?.text?.trim();
}

async function sendMessage(recipientId, text, pageToken) {
  const res = await fetch(`${GRAPH}/me/messages?access_token=${pageToken}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
      messaging_type: "RESPONSE",
    }),
  });
  if (!res.ok) throw new Error("graph send " + res.status + " " + (await res.text()));
}

async function verifySignature(request, raw, appSecret) {
  // If no app secret is configured, skip verification (useful for first tests).
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
