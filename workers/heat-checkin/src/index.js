/**
 * Heat Lagos check-in API — proxies bSport so the browser never sees the API token.
 *
 * Routes (also available under /api/checkin/* on heatlagos.com):
 *   GET /classes          → nearby classes for swipe navigation
 *   GET /class?id=OFFER   → one class + active bookings with member names
 *   GET /health
 */

const BSPORT_BASE = "https://api.production.bsport.io/api/v1";
const COMPANY_ID = "5821";
const TZ = "Europe/Lisbon";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (request.method !== "GET") {
      return json({ error: "Method not allowed" }, 405);
    }

    const url = new URL(request.url);
    // Support both workers.dev paths and /api/checkin/* on heatlagos.com
    let path = url.pathname.replace(/\/$/, "") || "/";
    if (path.startsWith("/api/checkin")) {
      path = path.slice("/api/checkin".length) || "/";
    }

    try {
      if (path === "/health" || path === "/") {
        return json({ ok: true, service: "heat-checkin" });
      }
      if (path === "/classes") {
        return json(await listClasses(env, url.searchParams));
      }
      if (path === "/class") {
        const id = url.searchParams.get("id");
        if (!id) return json({ error: "Missing id" }, 400);
        return json(await getClassWithAttendees(env, id));
      }
      return json({ error: "Not found" }, 404);
    } catch (err) {
      console.error(err);
      return json({ error: err.message || "Server error" }, 500);
    }
  },
};

async function bsport(env, path, params = {}) {
  const token = env.BSPORT_API_TOKEN;
  if (!token) throw new Error("BSPORT_API_TOKEN not configured");

  const u = new URL(`${BSPORT_BASE}${path}`);
  u.searchParams.set("company", COMPANY_ID);
  for (const [k, v] of Object.entries(params)) {
    if (v != null && v !== "") u.searchParams.set(k, String(v));
  }

  const res = await fetch(u.toString(), {
    headers: {
      Authorization: `Token ${token}`,
      Accept: "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`bSport ${res.status} on ${path}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

/** Lisbon calendar date YYYY-MM-DD */
function lisbonDate(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function addDays(isoDate, days) {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function summarizeOffer(o) {
  const startMs = Date.parse(o.date_start);
  const durationMin = o.duration_minute || 60;
  const endMs = startMs + durationMin * 60 * 1000;
  return {
    id: o.id,
    activityId: o.activity,
    name: o.name_override || o.activity_name || "Class",
    dateStart: o.date_start,
    durationMinute: durationMin,
    endMs,
    startMs,
    booked: o.validated_booking_count ?? (o.bookings?.length || 0),
    capacity: o.effectif ?? o.tot_slots ?? null,
    coachId: o.coach,
    color: o.meta_activity_color || null,
  };
}

/**
 * Classes spanning yesterday → +2 days so swipe can reach last/next,
 * ordered by start time.
 */
async function listClasses(env, params) {
  const now = Date.now();
  const today = lisbonDate(new Date(now));
  const minDate = params.get("min") || addDays(today, -1);
  const maxDate = params.get("max") || addDays(today, 2);

  const data = await bsport(env, "/offer/", {
    min_date: minDate,
    max_date: maxDate,
    page_size: 100,
    ordering: "date_start",
  });

  const classes = (data.results || []).map(summarizeOffer);
  classes.sort((a, b) => a.startMs - b.startMs);

  const defaultIndex = pickDefaultIndex(classes, now);

  return {
    serverTime: new Date(now).toISOString(),
    timezone: TZ,
    defaultIndex,
    classes,
  };
}

/**
 * Primary window: from 2h before start until 10 min after end.
 * Prefer the earliest class still in that window; if none, next upcoming.
 */
function pickDefaultIndex(classes, now) {
  if (!classes.length) return -1;

  const TWO_H = 2 * 60 * 60 * 1000;
  const TEN_M = 10 * 60 * 1000;

  let best = -1;
  for (let i = 0; i < classes.length; i++) {
    const c = classes[i];
    const windowStart = c.startMs - TWO_H;
    const windowEnd = c.endMs + TEN_M;
    if (now >= windowStart && now <= windowEnd) {
      if (best === -1) best = i;
      else {
        // Prefer in-progress / just-finished over later "upcoming within 2h"
        const cur = classes[best];
        const curActive = now >= cur.startMs && now <= cur.endMs + TEN_M;
        const nextActive = now >= c.startMs && now <= c.endMs + TEN_M;
        if (nextActive && !curActive) best = i;
        else if (nextActive === curActive && c.startMs < cur.startMs) best = i;
      }
    }
  }
  if (best !== -1) return best;

  // Fallback: next class starting after now, else last past class
  for (let i = 0; i < classes.length; i++) {
    if (classes[i].startMs >= now) return i;
  }
  return classes.length - 1;
}

async function getClassWithAttendees(env, offerId) {
  const [offer, bookingData] = await Promise.all([
    bsport(env, `/offer/${offerId}/`),
    bsport(env, "/booking/", {
      offer: offerId,
      page_size: 100,
    }),
  ]);

  const summary = summarizeOffer(offer);
  const raw = bookingData.results || [];

  // Active bookings only (not canceled / deleted)
  const active = raw.filter(
    (b) =>
      !b.is_deleted &&
      !b.date_canceled &&
      (b.booking_status_code === 0 ||
        b.booking_status_code === "OK" ||
        b.booking_status_code == null)
  );

  const memberIds = [
    ...new Set(active.map((b) => b.member).filter(Boolean)),
  ];

  const nameByMember = await fetchMemberNames(env, memberIds);

  const attendees = active
    .map((b) => {
      const userId = String(b.member || b.consumer || b.id);
      const name =
        nameByMember.get(b.member) ||
        nameByMember.get(String(b.member)) ||
        `Member ${userId}`;
      return {
        userId,
        bookingId: b.id,
        name,
        attendanceBsport: b.attendance === true || b.roll_call_attendance === true,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  // Dedupe by userId
  const seen = new Set();
  const unique = attendees.filter((a) => {
    if (seen.has(a.userId)) return false;
    seen.add(a.userId);
    return true;
  });

  return {
    serverTime: new Date().toISOString(),
    class: summary,
    attendees: unique,
  };
}

async function fetchMemberNames(env, memberIds) {
  const map = new Map();
  if (!memberIds.length) return map;

  // Batch in chunks of 40
  const chunkSize = 40;
  for (let i = 0; i < memberIds.length; i += chunkSize) {
    const chunk = memberIds.slice(i, i + chunkSize);
    const data = await bsport(env, "/member/", {
      id__in: chunk.join(","),
      page_size: 100,
    });
    for (const m of data.results || []) {
      map.set(m.id, m.name || `${m.first_name || ""} ${m.last_name || ""}`.trim() || `Member ${m.id}`);
    }
  }

  // Fill gaps with single fetches (id__in can miss if API ignores filter shape)
  const missing = memberIds.filter((id) => !map.has(id));
  await Promise.all(
    missing.slice(0, 30).map(async (id) => {
      try {
        const m = await bsport(env, `/member/${id}/`);
        map.set(id, m.name || `${m.firstname || m.first_name || ""} ${m.lastname || m.last_name || ""}`.trim() || `Member ${id}`);
      } catch {
        map.set(id, `Member ${id}`);
      }
    })
  );

  return map;
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...CORS,
    },
  });
}
