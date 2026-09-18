/**
 * Heat Lagos - Premium member monthly friend coupon
 *
 * Premium = active (non-expired) holders of:
 *   - Yearly Unlimited €990: pass 751518 or 796836
 *   - 12-Month Unlimited Commitment €125: pass 751520
 *
 * Each month: one BSport-native single-use 100% coupon for Drop-in (766017),
 * emailed via Resend. Friend redeems at checkout / front desk.
 *
 * Automator owns the schedule (no Worker cron). Call POST /run.
 */

const BSPORT_BASE = "https://api.production.bsport.io/api/v1";
const BSPORT_MGMT = "https://public.production.bsport.io/api/v1";
const COMPANY_ID = "5821";
const TZ = "Europe/Lisbon";

/** Yearly + 12-month commitment pass template IDs */
const PREMIUM_PASS_IDS = [751518, 796836, 751520];
/** Single Drop-in (1 class) - friend redeems 100% off this */
const FRIEND_PASS_ID = 766017;

const DEFAULT_TEST_EMAIL = "sebastian.brosche@gmail.com";
const FROM_EMAIL_RESEND = "Heat Lagos <daily@heatlagos.com>";
const AGENTMAIL_INBOX = "grok-yogaforbjj@agentmail.to";
const FROM_EMAIL_AGENTMAIL = "Heat Lagos <grok-yogaforbjj@agentmail.to>";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-cron-secret, Authorization",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    let path = url.pathname.replace(/\/$/, "") || "/";
    if (path.startsWith("/api/friend-coupon")) {
      path = path.slice("/api/friend-coupon".length) || "/";
    }

    try {
      if (path === "/health" || path === "/") {
        return json({
          ok: true,
          service: "heat-friend-coupon",
          premiumPassIds: PREMIUM_PASS_IDS,
          friendPassId: FRIEND_PASS_ID,
          timezone: TZ,
          scheduleOwner: "Automator (no Worker cron)",
        });
      }

      if (path === "/members" && request.method === "GET") {
        assertCron(request, env);
        const members = await listPremiumMembers(env);
        return json({ count: members.length, members });
      }

      if (path === "/validate" && request.method === "GET") {
        const code = (url.searchParams.get("code") || "").trim().toUpperCase();
        if (code.length < 8) return json({ error: "Missing code" }, 400);
        return json(await validateCode(env, code));
      }

      if (path === "/run" && request.method === "POST") {
        assertCron(request, env);
        const body = await request.json().catch(() => ({}));
        const mode = String(body.mode || url.searchParams.get("mode") || "test").toLowerCase();
        const dryRun = body.dry_run === true || url.searchParams.get("dry_run") === "true";
        const force = body.force === true;
        const month = body.month || lisbonYearMonth();
        return json(
          await runMonthlyIssue(env, {
            mode: mode === "live" ? "live" : "test",
            dryRun,
            force,
            month,
            testEmail: body.test_email || env.TEST_EMAIL || DEFAULT_TEST_EMAIL,
          })
        );
      }

      return json({ error: "Not found" }, 404);
    } catch (err) {
      const status = err.status || 500;
      console.error(err);
      return json({ error: err.message || "Server error" }, status);
    }
  },
};

function assertCron(request, env) {
  const want = env.CRON_SECRET;
  if (!want) {
    const e = new Error("CRON_SECRET not configured");
    e.status = 500;
    throw e;
  }
  const got =
    request.headers.get("x-cron-secret") ||
    (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!got || got !== want) {
    const e = new Error("Unauthorized");
    e.status = 401;
    throw e;
  }
}

function classicToken(env) {
  return env.BSPORT_API_TOKEN || env.BSPORT_SESSION_TOKEN || "";
}

function jwtKey(env) {
  return env.BSPORT_JWT_TOKEN || "";
}

async function bsport(env, path, { method = "GET", body = null, params = {} } = {}) {
  const token = classicToken(env);
  if (!token) throw new Error("BSPORT_API_TOKEN not configured");

  const u = new URL(`${BSPORT_BASE}${path}`);
  u.searchParams.set("company", COMPANY_ID);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") u.searchParams.set(k, String(v));
  }

  const headers = {
    Authorization: `Token ${token}`,
    Accept: "application/json",
  };
  if (body != null) headers["Content-Type"] = "application/json";

  const res = await fetch(u.toString(), {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text().catch(() => "");
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text.slice(0, 400) };
  }
  if (!res.ok) {
    throw new Error(
      `bSport ${res.status} on ${path}: ${JSON.stringify(data).slice(0, 300)}`
    );
  }
  return data;
}

async function bsportMgmt(env, path, { method = "GET", body = null, params = {} } = {}) {
  const key = jwtKey(env);
  if (!key) throw new Error("BSPORT_JWT_TOKEN not configured");

  const u = new URL(`${BSPORT_MGMT}${path}`);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") u.searchParams.set(k, String(v));
  }

  const headers = {
    Accept: "application/json",
    "X-Api-Key": key,
    "X-Client-ID": "heat",
    "X-Company-ID": COMPANY_ID,
    "X-Timezone-Name": TZ,
  };
  if (body != null) headers["Content-Type"] = "application/json";

  const res = await fetch(u.toString(), {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const text = await res.text().catch(() => "");
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text.slice(0, 400) };
  }
  if (!res.ok) {
    throw new Error(
      `bSport mgmt ${res.status} on ${path}: ${JSON.stringify(data).slice(0, 300)}`
    );
  }
  return data;
}

/** Lisbon calendar YYYY-MM */
function lisbonYearMonth(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(d);
  const y = parts.find((p) => p.type === "year").value;
  const m = parts.find((p) => p.type === "month").value;
  return `${y}-${m}`;
}

function lisbonToday() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** Last day of month YYYY-MM-DD in Lisbon calendar sense (date-only). */
function monthEndDate(yearMonth) {
  const [y, m] = yearMonth.split("-").map(Number);
  const last = new Date(Date.UTC(y, m, 0)); // day 0 of next month
  const dd = String(last.getUTCDate()).padStart(2, "0");
  return `${y}-${String(m).padStart(2, "0")}-${dd}`;
}

function monthLabel(yearMonth) {
  const [y, m] = yearMonth.split("-").map(Number);
  const d = new Date(Date.UTC(y, m - 1, 1));
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

function randomCodeSuffix(len = 6) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(len));
  let out = "";
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

/**
 * Non-expired holders of premium pass templates (deduped by client_id).
 * Includes commitment months that start later this cycle as long as ending_date >= today.
 */
async function listPremiumMembers(env) {
  const today = lisbonToday();
  const byClient = new Map();

  for (const passId of PREMIUM_PASS_IDS) {
    let page = 1;
    for (;;) {
      const data = await bsportMgmt(env, "/management/client-passes/", {
        params: { pass_id: passId, page_size: 100, page },
      });
      for (const row of data.results || []) {
        if (row.is_disabled) continue;
        const end = row.ending_date;
        if (end && end < today) continue;
        const cid = Number(row.client_id);
        if (!cid) continue;
        const cur = byClient.get(cid) || {
          clientId: cid,
          passIds: new Set(),
          clientPassIds: [],
        };
        cur.passIds.add(passId);
        cur.clientPassIds.push(row.id);
        byClient.set(cid, cur);
      }
      if (!data.next) break;
      page += 1;
    }
  }

  const members = [];
  for (const cur of byClient.values()) {
    const detail = await resolveMember(env, cur.clientId);
    members.push({
      clientId: cur.clientId,
      email: detail.email,
      name: detail.name,
      firstName: detail.firstName,
      acceptEmail: detail.acceptEmail,
      passIds: [...cur.passIds],
      clientPassIds: cur.clientPassIds,
    });
  }

  members.sort((a, b) => String(a.email || "").localeCompare(String(b.email || "")));
  return members;
}

async function resolveMember(env, clientId) {
  try {
    const m = await bsport(env, `/member/${clientId}/`);
    const first =
      m.firstname ||
      m.first_name ||
      (m.name ? String(m.name).split(/\s+/)[0] : null) ||
      "there";
    const name =
      m.name ||
      `${m.firstname || m.first_name || ""} ${m.lastname || m.last_name || ""}`.trim() ||
      first;
    return {
      email: m.email || null,
      name,
      firstName: first,
      acceptEmail: m.accept_email !== false && m.is_email_accepted !== false,
    };
  } catch {
    try {
      const c = await bsportMgmt(env, `/management/clients/${clientId}/`);
      const first =
        c.first_name ||
        c.firstname ||
        (c.name ? String(c.name).split(/\s+/)[0] : null) ||
        "there";
      return {
        email: c.email || null,
        name: c.name || first,
        firstName: first,
        acceptEmail: c.is_email_accepted !== false,
      };
    } catch {
      return { email: null, name: `Member ${clientId}`, firstName: "there", acceptEmail: true };
    }
  }
}

async function createFriendCoupon(env, { code, member, month, expirationDate }) {
  const name = `Heat Friend Class ${month} - ${member.clientId}`;
  // BSport codes: min ~12 chars; unique; single total use; 100% off Drop-in
  const payload = {
    company: Number(COMPANY_ID),
    code,
    name,
    percent_off: 100,
    amount_off: "0.00",
    usage_total: 1,
    usage_per_member: 1,
    is_active: true,
    combinable: false,
    only_on_first_checkout: false,
    only_on_objects: [FRIEND_PASS_ID],
    applies_to: 1,
    expiration_date: expirationDate,
    subscription_mode: 1,
    minimum_amount: "0.00",
    voucher_type: 1,
    coupon_type: 0,
  };
  return bsport(env, "/coupon/", { method: "POST", body: payload });
}

async function deactivateCoupon(env, couponId) {
  try {
    await bsport(env, `/coupon/${couponId}/`, {
      method: "PATCH",
      body: { is_active: false },
    });
    return true;
  } catch (e) {
    console.warn("deactivate failed", couponId, e.message || e);
    return false;
  }
}

/**
 * Deactivate prior-month Heat Friend coupons still active (name prefix match via list).
 */
async function expirePreviousMonthCoupons(env, currentMonth) {
  const list = await bsport(env, "/coupon/", { params: { page_size: 100 } });
  const rows = Array.isArray(list) ? list : list.results || [];
  const deactivated = [];
  for (const c of rows) {
    const name = String(c.name || "");
    if (!name.startsWith("Heat Friend Class ")) continue;
    if (name.includes(`Heat Friend Class ${currentMonth}`)) continue;
    if (!c.is_active) continue;
    const ok = await deactivateCoupon(env, c.id);
    if (ok) deactivated.push({ id: c.id, code: c.code, name: c.name });
  }
  return deactivated;
}

async function sendResend(env, { to, subject, html, text }) {
  const key = env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.RESEND_FROM || FROM_EMAIL_RESEND,
      to: [to],
      subject,
      html,
      text,
    }),
  });
  const bodyText = await res.text();
  let data = null;
  try {
    data = JSON.parse(bodyText);
  } catch {
    data = { raw: bodyText.slice(0, 300) };
  }
  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${bodyText.slice(0, 300)}`);
  }
  return { provider: "resend", id: data.id || null, raw: data };
}

async function sendAgentMail(env, { to, subject, html, text }) {
  const key = env.AGENTMAIL_API_KEY;
  if (!key) throw new Error("AGENTMAIL_API_KEY not configured");
  const inbox = env.AGENTMAIL_INBOX_ID || AGENTMAIL_INBOX;
  const res = await fetch(
    `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(inbox)}/messages/send`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        to: [to],
        subject,
        html,
        text,
      }),
    }
  );
  const bodyText = await res.text();
  let data = null;
  try {
    data = JSON.parse(bodyText);
  } catch {
    data = { raw: bodyText.slice(0, 300) };
  }
  if (!res.ok) {
    throw new Error(`AgentMail ${res.status}: ${bodyText.slice(0, 300)}`);
  }
  return {
    provider: "agentmail",
    id: data.message_id || data.id || null,
    raw: data,
  };
}

/**
 * Prefer Resend (Heat daily@ pattern) when domain works.
 * Fall back to AgentMail admin inbox when Resend domain is unverified.
 */
async function sendEmail(env, opts) {
  const prefer = String(env.MAIL_PROVIDER || "auto").toLowerCase();
  const errors = [];
  if (prefer === "agentmail") return sendAgentMail(env, opts);
  if (prefer === "resend") return sendResend(env, opts);
  if (env.RESEND_API_KEY) {
    try {
      return await sendEmail(env, opts);
    } catch (e) {
      errors.push(e.message || String(e));
    }
  }
  if (env.AGENTMAIL_API_KEY) {
    try {
      return await sendAgentMail(env, opts);
    } catch (e) {
      errors.push(e.message || String(e));
    }
  }
  throw new Error(`No mail provider succeeded: ${errors.join(" | ") || "none configured"}`);
}

function buildEmail({ firstName, code, month, expirationDate, memberName }) {
  const label = monthLabel(month);
  const subject = `Your Heat friend class code for ${label}`;
  const text = [
    `Hi ${firstName},`,
    ``,
    `Thank you for being a Heat premium member.`,
    ``,
    `This month you get one free class for a friend. Share this code with them:`,
    ``,
    `  ${code}`,
    ``,
    `How they use it:`,
    `1. Buy a Drop-in (single class) on heatlagos.com/book or at the front desk.`,
    `2. Enter the code at checkout for 100% off.`,
    `3. Book any group class. One use only.`,
    ``,
    `Valid until ${expirationDate}. Previous month codes no longer work.`,
    ``,
    `See you in the heat,`,
    `Heat Lagos`,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html><body style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; color:#111; line-height:1.5;">
  <p>Hi ${escapeHtml(firstName)},</p>
  <p>Thank you for being a Heat premium member.</p>
  <p>This month you get <strong>one free class for a friend</strong>. Share this code with them:</p>
  <p style="font-size:22px; letter-spacing:0.08em; font-weight:700; background:#f4f4f5; padding:14px 18px; display:inline-block; border-radius:8px;">${escapeHtml(code)}</p>
  <p><strong>How they use it</strong></p>
  <ol>
    <li>Buy a Drop-in (single class) on <a href="https://www.heatlagos.com/book">heatlagos.com/book</a> or at the front desk.</li>
    <li>Enter the code at checkout for 100% off.</li>
    <li>Book any group class. One use only.</li>
  </ol>
  <p>Valid until <strong>${escapeHtml(expirationDate)}</strong>. Previous month codes no longer work.</p>
  <p>See you in the heat,<br/>Heat Lagos</p>
  <p style="color:#888;font-size:12px;">Issued for ${escapeHtml(memberName || firstName)} · ${escapeHtml(label)}</p>
</body></html>`;

  return { subject, html, text };
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function kvGetJson(env, key) {
  if (!env.COUPONS) return null;
  const raw = await env.COUPONS.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function kvPutJson(env, key, value, expirationTtl) {
  if (!env.COUPONS) return;
  const opts = expirationTtl ? { expirationTtl } : undefined;
  await env.COUPONS.put(key, JSON.stringify(value), opts);
}

async function validateCode(env, code) {
  const upper = code.toUpperCase();
  const fromKv = await kvGetJson(env, `code:${upper}`);
  // Also check live BSport coupon
  let bsportCoupon = null;
  try {
    const list = await bsport(env, "/coupon/", { params: { page_size: 100 } });
    const rows = Array.isArray(list) ? list : list.results || [];
    bsportCoupon = rows.find((c) => String(c.code).toUpperCase() === upper) || null;
  } catch (e) {
    console.warn("coupon list failed", e.message || e);
  }

  if (!bsportCoupon && !fromKv) {
    return { valid: false, reason: "not_found", code: upper };
  }

  const c = bsportCoupon || {};
  const used = (c.nb_discounts || 0) >= (c.usage_total || 1);
  const expired =
    c.expiration_date && c.expiration_date < lisbonToday();
  const inactive = c.is_active === false;
  const valid =
    !!bsportCoupon && c.is_active !== false && !used && !expired;

  return {
    valid,
    code: upper,
    reason: !bsportCoupon
      ? "not_in_bsport"
      : inactive
        ? "inactive"
        : used
          ? "already_used"
          : expired
            ? "expired"
            : "ok",
    couponId: c.id || fromKv?.couponId || null,
    expirationDate: c.expiration_date || fromKv?.expirationDate || null,
    friendPassId: FRIEND_PASS_ID,
    memberClientId: fromKv?.memberClientId || null,
    month: fromKv?.month || null,
    kv: fromKv,
    redemption:
      "Friend buys Drop-in (pass 766017) and enters this code at checkout for 100% off. Front desk can apply the same code on-site.",
  };
}

async function runMonthlyIssue(env, { mode, dryRun, force, month, testEmail }) {
  const expirationDate = monthEndDate(month);
  const startedAt = new Date().toISOString();
  const deactivated = dryRun
    ? []
    : await expirePreviousMonthCoupons(env, month);

  const members = await listPremiumMembers(env);
  const results = [];
  let emailed = 0;
  let created = 0;
  let skipped = 0;

  // Test mode: still create coupons for audit path, but only email Sebastian.
  // Process all members for code creation in live; in test create for all but email only test inbox once summary + one sample, OR create+email one sample.
  // Spec: "test send to Sebastian with a real single-use coupon"
  // Practical: in test mode, issue coupons for all (or first) but redirect every email to testEmail, and prefix subject with [TEST].
  // To avoid spamming Sebastian with N emails, in test mode only email the first successful coupon (or a designated member), and return the full report.

  let testEmailSent = false;

  for (const member of members) {
    if (!member.email) {
      results.push({
        clientId: member.clientId,
        status: "skip_no_email",
      });
      skipped += 1;
      continue;
    }

    const issueKey = `issue:${month}:${member.clientId}`;
    const existing = await kvGetJson(env, issueKey);
    if (existing && !force) {
      results.push({
        clientId: member.clientId,
        email: member.email,
        status: "skip_already_issued",
        code: existing.code,
        couponId: existing.couponId,
      });
      skipped += 1;
      continue;
    }

    const yymm = month.replace("-", "").slice(2); // 2609
    const code = `HEATFRIEND${yymm}${randomCodeSuffix(6)}`;

    if (dryRun) {
      results.push({
        clientId: member.clientId,
        email: member.email,
        name: member.name,
        status: "dry_run",
        wouldCode: code,
      });
      continue;
    }

    let coupon;
    try {
      coupon = await createFriendCoupon(env, {
        code,
        member,
        month,
        expirationDate,
      });
      created += 1;
    } catch (e) {
      results.push({
        clientId: member.clientId,
        email: member.email,
        status: "error_create",
        error: e.message || String(e),
      });
      continue;
    }

    const record = {
      month,
      code,
      couponId: coupon.id,
      memberClientId: member.clientId,
      memberEmail: member.email,
      memberName: member.name,
      passIds: member.passIds,
      expirationDate,
      createdAt: new Date().toISOString(),
      mode,
    };
    await kvPutJson(env, issueKey, record, 60 * 60 * 24 * 120); // ~120 days
    await kvPutJson(env, `code:${code}`, record, 60 * 60 * 24 * 120);

    const mail = buildEmail({
      firstName: member.firstName || "there",
      code,
      month,
      expirationDate,
      memberName: member.name,
    });

    let emailStatus = "not_sent";
    let emailTo = null;
    let resendId = null;

    if (mode === "live") {
      if (!member.acceptEmail) {
        emailStatus = "skip_consent_off";
      } else {
        try {
          const sent = await sendEmail(env, {
            to: member.email,
            subject: mail.subject,
            html: mail.html,
            text: mail.text,
          });
          emailStatus = "sent";
          emailTo = member.email;
          resendId = sent.id || null; // provider message id
          emailed += 1;
        } catch (e) {
          emailStatus = "error_email";
          results.push({
            clientId: member.clientId,
            email: member.email,
            status: "created_email_failed",
            code,
            couponId: coupon.id,
            error: e.message || String(e),
          });
          continue;
        }
      }
    } else {
      // test mode: only one real email to Sebastian, with the real code
      if (!testEmailSent) {
        testEmailSent = true; // one attempt only, even on failure
        try {
          const sent = await sendEmail(env, {
            to: testEmail,
            subject: `[TEST] ${mail.subject}`,
            html:
              `<p style="color:#b45309;"><strong>TEST MODE</strong> - intended member: ${escapeHtml(
                member.email
              )} (${escapeHtml(member.name)}). Stine gate still required before live blast.</p>` +
              mail.html,
            text:
              `TEST MODE - intended member: ${member.email} (${member.name})\n\n` +
              mail.text,
          });
          emailStatus = "sent_test";
          emailTo = testEmail;
          resendId = sent.id || null; // provider message id
          emailed += 1;
        } catch (e) {
          emailStatus = "error_email";
          results.push({
            clientId: member.clientId,
            email: member.email,
            name: member.name,
            status: "created_test_email_failed",
            code,
            couponId: coupon.id,
            error: e.message || String(e),
            expirationDate,
          });
          continue;
        }
      } else {
        emailStatus = "test_suppressed";
      }
    }

    results.push({
      clientId: member.clientId,
      email: member.email,
      name: member.name,
      status: "ok",
      code,
      couponId: coupon.id,
      emailStatus,
      emailTo,
      resendId,
      expirationDate,
    });
  }

  const summary = {
    ok: true,
    service: "heat-friend-coupon",
    mode,
    dryRun,
    month,
    expirationDate,
    startedAt,
    finishedAt: new Date().toISOString(),
    premiumCount: members.length,
    created,
    emailed,
    skipped,
    deactivatedPrevious: deactivated,
    stineGate:
      mode === "live"
        ? "LIVE send - ensure Stine confirmed before using mode=live"
        : "TEST only - do not set mode=live until Stine confirms",
    results,
  };

  await kvPutJson(
    env,
    `run:${month}:${startedAt}`,
    summary,
    60 * 60 * 24 * 180
  );

  return summary;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS,
    },
  });
}
