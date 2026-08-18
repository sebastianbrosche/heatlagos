import { DurableObject } from "cloudflare:workers";
import {
  TZ,
  lisbonYmd,
  lisbonHm,
  nextYmd,
  weekDays,
  planFingerprint,
  buildPlan,
  desiredAt,
  nextFlipMs,
  summarizePlan
} from "./plan.js";

const DEVICES = {
  heater_mirror: { id: "28372f25be18", kind: "switch", group: "heaters" },
  heater_wall: { id: "28372f249dac", kind: "switch", group: "heaters" },
  fan: { id: "28372f276db8", kind: "switch", group: "fan" },
  logo: { id: "28372f25bdd0", kind: "switch", group: "logo" },
  roof_led: { id: "b0a732406a00", kind: "light", group: "lights" },
  mirror_12: { id: "b0a732411f44", kind: "light", group: "lights" },
  mirror_34: { id: "b0a732413de0", kind: "light", group: "lights" }
};
const COMPANY = "5821";
const VENUE = 19572;
const WEEK_DAYS = 8;
const SHELLY_GAP_MS = 1100;

export default {
  async scheduled(event, env) {
    await tick(env, { source: event.cron || "cron" });
  },
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return json({ ok: true, tz: TZ, hm: lisbonHm(), ymd: lisbonYmd() });
    }
    if (!authorized(request, env)) {
      return json({ error: "unauthorized" }, 401);
    }
    if (url.pathname === "/status") {
      const today = lisbonYmd();
      const plan = await loadPlan(env, today);
      const now = Date.now();
      return json({
        now: { ymd: today, hm: lisbonHm(), tz: TZ },
        applyEnabled: applyOn(env),
        lastRebuild: await env.KV.get("last_rebuild", "json"),
        lastApply: await env.KV.get("last_apply", "json"),
        nextFlip: await env.KV.get("next_flip", "json"),
        desired: plan ? desiredAt(plan, now) : null,
        summary: plan ? summarizePlan(plan) : null
      });
    }
    if (url.pathname === "/plan") {
      const ymd = url.searchParams.get("date") || lisbonYmd();
      const plan = await loadPlan(env, ymd);
      return json({ ymd, summary: plan ? summarizePlan(plan) : null, plan });
    }
    if (url.pathname === "/rebuild" && request.method === "POST") {
      const result = await rebuild(env, { force: true, source: "http" });
      await apply(env, { source: "http-rebuild" });
      let next = null;
      let armError = null;
      try {
        next = await armFlip(env);
      } catch (err) {
        armError = String(err && err.message ? err.message : err);
      }
      return json({ ...result, nextFlip: next, armError });
    }
    if (url.pathname === "/apply" && request.method === "POST") {
      const result = await apply(env, { source: "http" });
      const next = await armFlip(env);
      return json({ ...result, nextFlip: next });
    }
    return json({ error: "not found" }, 404);
  }
};

function authorized(request, env) {
  const want = env.CRON_SECRET;
  if (!want) return false;
  const got = request.headers.get("x-cron-secret") || "";
  return got === want;
}

function applyOn(env) {
  return String(env.APPLY_ENABLED || "true").toLowerCase() !== "false";
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" }
  });
}

async function tick(env, { source }) {
  const hm = lisbonHm();
  const today = lisbonYmd();
  const last = await env.KV.get("last_rebuild", "json");
  const missingWeek = !last || Object.keys(last.days || {}).length < WEEK_DAYS;
  const needToday = !last || last.ymd !== today;
  const morningWindow = hm >= "05:00" && hm < "06:00";
  if ((morningWindow && needToday) || missingWeek) {
    await rebuild(env, { force: true, source: `${source}:rebuild` });
    await apply(env, { source: `${source}:morning` });
    return armFlip(env);
  }
  return { skipped: true, hm, reason: "once-a-day" };
}

async function rebuild(env, { force, source }) {
  const today = lisbonYmd();
  const days = weekDays(today, WEEK_DAYS);
  const out = { source, days: {}, changes: [] };
  for (const ymd of days) {
    const raw = await fetchClasses(env, ymd);
    const plan = buildPlan(raw);
    const prevRaw = await env.KV.get(`plan:${ymd}`);
    const prev = prevRaw ? JSON.parse(prevRaw) : null;
    if (planFingerprint(prev) !== planFingerprint(plan) && prev) {
      out.changes.push({ ymd, from: summarizePlan(prev).classes, to: summarizePlan(plan).classes });
    }
    await env.KV.put(`plan:${ymd}`, JSON.stringify(plan));
    out.days[ymd] = summarizePlan(plan);
  }
  await env.KV.put(
    "last_rebuild",
    JSON.stringify({ at: Date.now(), ymd: today, hm: lisbonHm(), source, force: !!force, days: out.days, changes: out.changes })
  );
  return out;
}

async function loadPlan(env, ymd) {
  const raw = await env.KV.get(`plan:${ymd}`);
  return raw ? JSON.parse(raw) : null;
}

async function apply(env, { source }) {
  let plan = await loadPlan(env, lisbonYmd());
  if (!plan) {
    await rebuild(env, { force: true, source: `${source}:missing-plan` });
    plan = await loadPlan(env, lisbonYmd());
  }
  const wanted = desiredAt(plan, Date.now());
  const summary = summarizePlan(plan);
  if (!applyOn(env)) {
    return { skipped: "APPLY_ENABLED=false", wanted, summary };
  }
  const live = await shellyStatus(env);
  const actions = [];
  for (const [key, meta] of Object.entries(DEVICES)) {
    const wantOn = meta.group === "logo" ? false : wanted[meta.group];
    const wantBri = meta.kind === "light" ? wanted.brightness : null;
    const have = live[key] || { on: null, brightness: null };
    const sameOn = have.on === wantOn;
    const sameBri = meta.kind !== "light" || have.brightness === wantBri;
    if (sameOn && sameBri) continue;
    await setDevice(env, meta, wantOn, wantBri);
    actions.push({ device: key, from: have, to: { on: wantOn, brightness: wantBri } });
  }
  const result = {
    source,
    hm: lisbonHm(),
    wanted,
    summary,
    actions
  };
  await env.KV.put("last_apply", JSON.stringify({ at: Date.now(), ...result }));
  return result;
}

async function fetchClasses(env, ymd) {
  const end = nextYmd(ymd);
  const url = `https://public.production.bsport.io/api/v1/management/classes/?period_start=${ymd}&period_end=${end}&page_size=100`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "X-API-Key": env.BSPORT_JWT_TOKEN,
      "X-Client-ID": "heat",
      "X-Company-ID": COMPANY
    }
  });
  if (!res.ok) {
    throw new Error(`bsport classes ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  const results = Array.isArray(data.results) ? data.results : [];
  return results.filter((c) => !c.venue_id || c.venue_id === VENUE);
}

function shellyUrl(env, path) {
  const base = (env.SHELLY_SERVER || "https://shelly-258-eu.shelly.cloud").replace(/\/$/, "");
  return `${base}${path}?auth_key=${encodeURIComponent(env.SHELLY_AUTH_KEY)}`;
}

async function shellyStatus(env) {
  const res = await fetch(shellyUrl(env, "/device/all_status") + "&show_info=true");
  if (!res.ok) throw new Error(`shelly status ${res.status}`);
  const body = await res.json();
  const devices = (body.data && body.data.devices_status) || {};
  const out = {};
  for (const [key, meta] of Object.entries(DEVICES)) {
    const st = devices[meta.id] || {};
    if (st["switch:0"]) out[key] = { on: !!st["switch:0"].output, brightness: null };
    else if (st["rgb:0"]) out[key] = { on: !!st["rgb:0"].output, brightness: st["rgb:0"].brightness ?? 100 };
    else if (st["rgbw:0"]) out[key] = { on: !!st["rgbw:0"].output, brightness: st["rgbw:0"].brightness ?? 100 };
    else if (st["light:0"]) out[key] = { on: !!st["light:0"].output, brightness: st["light:0"].brightness ?? 100 };
    else out[key] = { on: null, brightness: null };
  }
  return out;
}

async function setDevice(env, meta, on, brightness) {
  const path = meta.kind === "light" ? "/v2/devices/api/set/light" : "/v2/devices/api/set/switch";
  const body = { id: meta.id, channel: 0, on: !!on };
  if (meta.kind === "light" && brightness != null) body.brightness = brightness;
  const res = await fetch(shellyUrl(env, path), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    throw new Error(`shelly set ${meta.id} ${res.status} ${await res.text()}`);
  }
  await sleep(SHELLY_GAP_MS);
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function lisbonClockMs(ymd, hm) {
  for (const off of ["+01:00", "+00:00"]) {
    const ms = Date.parse(`${ymd}T${hm}:00${off}`);
    if (!Number.isFinite(ms)) continue;
    const d = new Date(ms);
    if (lisbonYmd(d) === ymd && lisbonHm(d) === hm) return ms;
  }
  return null;
}

async function armFlip(env) {
  if (!env.FLIP) return null;
  const stub = env.FLIP.get(env.FLIP.idFromName("heat"));
  return stub.arm();
}

export class FlipClock extends DurableObject {
  async arm() {
    let plan = await loadPlan(this.env, lisbonYmd());
    if (!plan) {
      await rebuild(this.env, { force: true, source: "alarm-missing-plan" });
      plan = await loadPlan(this.env, lisbonYmd());
    }
    let next = plan ? nextFlipMs(plan, Date.now()) : null;
    if (!next) next = lisbonClockMs(nextYmd(lisbonYmd()), "05:00");
    if (next) await this.ctx.storage.setAlarm(next);
    const info = next ? { at: next, hm: lisbonHm(new Date(next)), ymd: lisbonYmd(new Date(next)) } : null;
    await this.env.KV.put("next_flip", JSON.stringify(info));
    return info;
  }
  async alarm() {
    await apply(this.env, { source: "alarm" });
    await this.arm();
  }
}
