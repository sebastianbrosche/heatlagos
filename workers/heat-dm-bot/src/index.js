/**
 * Heat Lagos — Instagram / Facebook DM auto-reply bot + legal pages.
 *
 * Routes:
 *   GET  /privacy   - privacy policy (for Meta app settings)
 *   GET  /terms     - terms of service (for Meta app settings)
 *   GET  /webhook   - Meta webhook verification handshake
 *   POST /webhook   - Meta message events -> Claude reply -> Graph API send
 *
 * Secrets / vars:
 *   META_VERIFY_TOKEN  - webhook handshake string (var)
 *   META_APP_SECRET    - verifies X-Hub-Signature-256 (secret)
 *   META_PAGE_TOKEN    - Facebook Page token, sends Messenger replies (secret)
 *   IG_ACCESS_TOKEN    - Instagram Login token, sends Instagram DM replies (secret)
 *   ANTHROPIC_API_KEY  - Claude API key (secret)
 */

const FB_GRAPH = "https://graph.facebook.com/v21.0";
const IG_GRAPH = "https://graph.instagram.com/v21.0";
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

    if (request.method === "GET") {
      if (url.pathname === "/privacy") return html(PRIVACY_HTML);
      if (url.pathname === "/terms") return html(TERMS_HTML);

      const mode = url.searchParams.get("hub.mode");
      const token = url.searchParams.get("hub.verify_token");
      const challenge = url.searchParams.get("hub.challenge");
      if (mode === "subscribe" && token === env.META_VERIFY_TOKEN) {
        return new Response(challenge, { status: 200 });
      }
      if (url.pathname === "/webhook") return new Response("Forbidden", { status: 403 });
      return new Response("Heat Lagos DM bot", { status: 200 });
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
      ctx.waitUntil(handleEvents(payload, env));
      return new Response("EVENT_RECEIVED", { status: 200 });
    }

    return new Response("Heat Lagos DM bot", { status: 200 });
  },
};

function html(body) {
  return new Response(body, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

async function handleEvents(payload, env) {
  const isInstagram = payload.object === "instagram";
  const base = isInstagram ? IG_GRAPH : FB_GRAPH;
  const token = isInstagram
    ? env.IG_ACCESS_TOKEN || env.META_PAGE_TOKEN
    : env.META_PAGE_TOKEN;

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const senderId = event.sender?.id;
      const text = event.message?.text;
      if (!senderId || !text || event.message?.is_echo) continue;

      try {
        const reply = await draftReply(text, env.ANTHROPIC_API_KEY);
        if (reply) await sendMessage(base, token, senderId, reply);
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

const PAGE_CSS =
  "body{max-width:760px;margin:40px auto;padding:0 20px;font:16px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#1a1a1a}h1{font-size:1.8rem}h2{font-size:1.15rem;margin-top:1.8em}a{color:#c2552b}small{color:#666}";

const PRIVACY_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Heat Lagos - Privacy Policy</title><style>${PAGE_CSS}</style></head><body>
<h1>Privacy Policy</h1><small>Last updated 20 June 2026</small>
<p>This policy explains what information Heat Lagos collects, how we use it, and the
choices you have. It covers our website and the messages you send us on Instagram and
Facebook.</p>
<h2>Who we are</h2><p>Heat Lagos is an infrared Pilates, yoga and recovery studio in
Lagos, Portugal, operating heatlagos.com. We are the data controller for the data
described here. Contact: <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.</p>
<h2>Information we collect</h2><p>When you visit our website we use analytics cookies
(Google) to count visits. When you contact us we receive what you send (name, email or
phone, message). When you message our Instagram or Facebook accounts, Meta passes us
your message and public profile name so we can reply. Bookings are handled by our
scheduling provider (Bsport) under its own policy.</p>
<h2>Messaging and automation</h2><p>To answer common questions quickly we use an
automated assistant (the Claude AI service by Anthropic) that can read messages sent to
our Instagram and Facebook accounts and draft or send replies. A human can step in at
any time. We access only conversations people start with us; we do not read your other
private messages and do not post on your behalf. Message content is used solely to
respond to you, is not sold, and is not used for advertising. Anthropic processes the
text to generate a reply and does not use it to train its models.</p>
<h2>How we use your information</h2><p>To reply to you, manage bookings and memberships,
keep the website working, and meet legal obligations. Our legal bases are consent,
performance of a contract, and our legitimate interest in running the studio.</p>
<h2>Who we share data with</h2><p>Trusted providers acting on our behalf only: Meta
(Instagram/Facebook), Google (analytics), Bsport (bookings), Cloudflare (hosting),
Anthropic (the reply assistant). We do not sell your personal data.</p>
<h2>Your rights and data deletion</h2><p>Under the GDPR you can access, correct, delete,
restrict or object to use of your data, and withdraw consent, and complain to the
Portuguese authority (CNPD). <strong>To delete your data</strong>, including message
history, email <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a> with subject
"Delete my data" and the handle you messaged from; we complete deletion within 30 days,
free. You can also remove our access from the "Apps and Websites" settings in your Meta
account.</p>
<h2>Retention, transfers and children</h2><p>We keep data only as long as needed.
Some providers are outside the EEA and rely on GDPR safeguards. Our services are for
adults; we do not knowingly collect data from children under 16.</p>
<h2>Changes &amp; contact</h2><p>We may update this policy; the date above shows the
last change. Questions: <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.</p>
</body></html>`;

const TERMS_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Heat Lagos - Terms of Service</title><style>${PAGE_CSS}</style></head><body>
<h1>Terms of Service</h1><small>Last updated 20 June 2026</small>
<p>These terms govern your use of Heat Lagos' website, classes, and our Instagram and
Facebook messaging. By using them you agree to these terms.</p>
<h2>The service</h2><p>Heat Lagos provides infrared Pilates, yoga and recovery classes
in Lagos, Portugal, information about them, and an assistant that answers questions over
Instagram and Facebook direct messages.</p>
<h2>Bookings and payments</h2><p>Class bookings, memberships and payments are handled by
our scheduling provider (Bsport). Prices and schedules may change; the website shows
current details.</p>
<h2>Automated messaging</h2><p>Replies to your direct messages may be generated
automatically by an AI assistant. They are for general information only and are not
professional, medical, or legal advice. For anything important, a team member will
follow up, or you can email <a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.</p>
<h2>Acceptable use</h2><p>Do not misuse the service, send unlawful or abusive content,
or attempt to disrupt it. We may decline to respond to or block such use.</p>
<h2>Intellectual property</h2><p>The Heat Lagos name, content and branding belong to
Heat Lagos and may not be used without permission.</p>
<h2>Disclaimer and liability</h2><p>The service is provided "as is". Exercise carries
inherent risks; consult a physician before starting. To the extent permitted by law,
Heat Lagos is not liable for indirect or consequential loss arising from use of the
website or messaging service.</p>
<h2>Changes, law &amp; contact</h2><p>We may update these terms; the date above shows the
last change. These terms are governed by the laws of Portugal. Questions:
<a href="mailto:hello@heatlagos.com">hello@heatlagos.com</a>.</p>
</body></html>`;
