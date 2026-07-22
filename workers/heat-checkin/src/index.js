/**
 * Heat Lagos check-in API — proxies bSport so the browser never sees the API token.
 *
 * Routes (also available under /api/checkin/* on heatlagos.com):
 *   GET  /classes              → nearby classes for swipe navigation
 *   GET  /class?id=OFFER       → one class + attendees + waitlist
 *   GET  /members?q=…          → search members by name/email (for add-member)
 *   POST /add-to-class         → add member onto class (waitlist promote or walk-in; may overbook)
 *   GET  /health
 */

const BSPORT_BASE = "https://api.production.bsport.io/api/v1";
const BSPORT_MGMT = "https://public.production.bsport.io/api/v1";
const COMPANY_ID = "5821";
const TZ = "Europe/Lisbon";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }

    const url = new URL(request.url);
    let path = url.pathname.replace(/\/$/, "") || "/";
    if (path.startsWith("/api/checkin")) {
      path = path.slice("/api/checkin".length) || "/";
    }

    try {
      if (path === "/health" || path === "/") {
        return json({ ok: true, service: "heat-checkin" });
      }
      if (path === "/classes" && request.method === "GET") {
        return json(await listClasses(env, url.searchParams));
      }
      if (path === "/class" && request.method === "GET") {
        const id = url.searchParams.get("id");
        if (!id) return json({ error: "Missing id" }, 400);
        return json(await getClassWithAttendees(env, id));
      }
      if (path === "/members" && request.method === "GET") {
        const q = (url.searchParams.get("q") || url.searchParams.get("search") || "").trim();
        if (q.length < 2) return json({ members: [], error: "Type at least 2 characters" }, 400);
        return json(await searchMembers(env, q));
      }
      if (path === "/add-to-class" && request.method === "POST") {
        const body = await request.json().catch(() => ({}));
        return json(await addToClass(env, body));
      }
      if (request.method !== "GET" && request.method !== "POST") {
        return json({ error: "Method not allowed" }, 405);
      }
      return json({ error: "Not found" }, 404);
    } catch (err) {
      console.error(err);
      return json({ error: err.message || "Server error" }, 500);
    }
  },
};

function classicToken(env) {
  return env.BSPORT_API_TOKEN || env.BSPORT_SESSION_TOKEN || "";
}

function jwtKey(env) {
  return env.BSPORT_JWT_TOKEN || env.BSPORT_API_TOKEN || "";
}

async function bsport(env, path, params = {}) {
  const token = classicToken(env);
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
    data = { raw: text.slice(0, 300) };
  }
  if (!res.ok) {
    const detail =
      data?.detail ||
      data?.non_field_errors?.[0] ||
      data?.error ||
      text.slice(0, 200) ||
      res.statusText;
    throw new Error(`bSport mgmt ${res.status} on ${path}: ${detail}`);
  }
  return data;
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

/** Preferred first names as shown on heatlagos.com */
const COACH_DISPLAY = {
  136954: "Stine",
  136955: "Sebastian",
  137174: "Anastasiia",
  137176: "Anastasiia",
  137175: "Agata",
  139837: "Nadine",
  143247: "Alizee",
  98364: "Liana",
};

function summarizeOffer(o, coachNameById = new Map()) {
  const startMs = Date.parse(o.date_start);
  const durationMin = o.duration_minute || 60;
  const endMs = startMs + durationMin * 60 * 1000;
  const coachId = o.coach_override || o.coach || null;
  const teacherName =
    (coachId && (COACH_DISPLAY[coachId] || coachNameById.get(coachId))) || null;
  const capacity = o.effectif ?? o.tot_slots ?? null;
  const booked = o.validated_booking_count ?? (o.bookings?.length || 0);
  const waitlistCount = o.nb_option ?? 0;
  return {
    id: o.id,
    activityId: o.activity,
    name: o.name_override || o.activity_name || "Class",
    dateStart: o.date_start,
    durationMinute: durationMin,
    endMs,
    startMs,
    booked,
    capacity,
    waitlistCount,
    overbooked: capacity != null && booked > capacity,
    coachId,
    teacherName,
    color: o.meta_activity_color || null,
  };
}

async function fetchCoachNames(env, coachIds) {
  const map = new Map();
  const unique = [...new Set(coachIds.filter(Boolean))];
  await Promise.all(
    unique.map(async (id) => {
      if (COACH_DISPLAY[id]) {
        map.set(id, COACH_DISPLAY[id]);
        return;
      }
      try {
        const c = await bsport(env, `/coach/${id}/`);
        const first =
          c?.user?.first_name ||
          (c?.user?.name ? String(c.user.name).split(/\s+/)[0] : null);
        if (first) map.set(id, first);
      } catch {
        /* leave missing */
      }
    })
  );
  return map;
}

/**
 * bSport keeps canceled sessions in /offer/ with available=false (and usually
 * tot_slots=0). The member schedule hides them; check-in must too.
 * Management API exposes the same as is_cancelled=true.
 */
function isCanceledOffer(o) {
  if (!o || typeof o !== "object") return true;
  if (o.available === false) return true;
  if (o.is_cancelled === true || o.is_canceled === true) return true;
  // Canceled sessions also show tot_slots=0 with zero bookings; do not use
  // tot_slots alone (live classes use it for remaining/allocated seats).
  return false;
}

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

  const rawAll = data.results || [];
  // Drop canceled / removed-from-schedule sessions (systemic: offer list includes them)
  const raw = rawAll.filter((o) => !isCanceledOffer(o));
  const dropped = rawAll.length - raw.length;

  // Optional second opinion from management API (is_cancelled) — never fails the list
  let canceledIds = new Set();
  try {
    const mgmt = await bsportMgmt(env, "/management/classes/", {
      params: {
        period_start: `${minDate}T00:00:00`,
        period_end: `${addDays(maxDate, 1)}T00:00:00`,
        page_size: 100,
      },
    });
    for (const c of mgmt.results || []) {
      if (c.is_cancelled === true) canceledIds.add(Number(c.id));
    }
  } catch (e) {
    console.warn("management classes cancel-check skipped:", e.message || e);
  }

  const coachIds = raw.map((o) => o.coach_override || o.coach).filter(Boolean);
  const coachNames = await fetchCoachNames(env, coachIds);

  const classes = raw
    .filter((o) => !canceledIds.has(Number(o.id)))
    .map((o) => summarizeOffer(o, coachNames));
  classes.sort((a, b) => a.startMs - b.startMs);

  const defaultIndex = pickDefaultIndex(classes, now);

  return {
    serverTime: new Date(now).toISOString(),
    timezone: TZ,
    defaultIndex,
    classes,
    meta: {
      source: "bsport_classic_offer",
      window: { minDate, maxDate },
      rawCount: rawAll.length,
      droppedCanceled: dropped + (raw.length - classes.length),
    },
  };
}

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
        const cur = classes[best];
        const curActive = now >= cur.startMs && now <= cur.endMs + TEN_M;
        const nextActive = now >= c.startMs && now <= c.endMs + TEN_M;
        if (nextActive && !curActive) best = i;
        else if (nextActive === curActive && c.startMs < cur.startMs) best = i;
      }
    }
  }
  if (best !== -1) return best;

  for (let i = 0; i < classes.length; i++) {
    if (classes[i].startMs >= now) return i;
  }
  return classes.length - 1;
}

function isActiveBooking(b) {
  return (
    !b.is_deleted &&
    !b.date_canceled &&
    (b.booking_status_code === 0 ||
      b.booking_status_code === "OK" ||
      b.booking_status_code == null)
  );
}

function mapBookingRow(b, nameByMember) {
  const userId = String(b.member || b.consumer || b.id);
  const name =
    nameByMember.get(b.member) ||
    nameByMember.get(String(b.member)) ||
    `Member ${userId}`;
  return {
    userId,
    bookingId: b.id,
    name,
    passId: b.consumer_payment_pack || null,
    attendanceBsport: b.attendance === true || b.roll_call_attendance === true,
  };
}

function dedupeByUserId(rows) {
  const seen = new Set();
  return rows.filter((a) => {
    if (seen.has(a.userId)) return false;
    seen.add(a.userId);
    return true;
  });
}

async function getClassWithAttendees(env, offerId) {
  const [offer, bookingData] = await Promise.all([
    bsport(env, `/offer/${offerId}/`),
    bsport(env, "/booking/", {
      offer: offerId,
      page_size: 100,
    }),
  ]);

  if (isCanceledOffer(offer)) {
    return {
      serverTime: new Date().toISOString(),
      class: {
        ...summarizeOffer(offer),
        canceled: true,
      },
      attendees: [],
      waitlist: [],
      error: "This class is canceled and is not on the live schedule.",
    };
  }

  const coachId = offer.coach_override || offer.coach;
  const coachNames = await fetchCoachNames(env, coachId ? [coachId] : []);
  const summary = summarizeOffer(offer, coachNames);
  summary.canceled = false;
  const raw = bookingData.results || [];

  // Confirmed booking IDs from offer (authoritative seat list)
  const confirmedIds = new Set(
    (Array.isArray(offer.bookings) ? offer.bookings : []).map((id) => Number(id))
  );
  // Waitlist / option IDs from offer
  const optionIds = new Set(
    (Array.isArray(offer.booking_options) ? offer.booking_options : []).map((id) =>
      Number(id)
    )
  );

  // Active confirmed attendees (not canceled). Prefer confirmedIds when present.
  let active = raw.filter(isActiveBooking);
  if (confirmedIds.size > 0) {
    const confirmed = active.filter((b) => confirmedIds.has(Number(b.id)));
    // If offer.bookings is populated, use it; still include any active booking
    // not on waitlist so overbooks always show.
    const extra = active.filter(
      (b) => !confirmedIds.has(Number(b.id)) && !optionIds.has(Number(b.id))
    );
    active = [...confirmed, ...extra];
  } else {
    // No offer.bookings list — exclude known waitlist options
    active = active.filter((b) => !optionIds.has(Number(b.id)));
  }

  // Waitlist rows: option IDs (fetch missing), plus any non-canceled options in raw
  let waitlistBookings = raw.filter(
    (b) => optionIds.has(Number(b.id)) && !b.is_deleted && !b.date_canceled
  );
  const have = new Set(waitlistBookings.map((b) => Number(b.id)));
  const missingOptionIds = [...optionIds].filter((id) => !have.has(id));
  if (missingOptionIds.length) {
    const fetched = await Promise.all(
      missingOptionIds.map(async (id) => {
        try {
          return await bsport(env, `/booking/${id}/`);
        } catch {
          return null;
        }
      })
    );
    waitlistBookings = [
      ...waitlistBookings,
      ...fetched.filter(Boolean).filter((b) => !b.is_deleted && !b.date_canceled),
    ];
  }

  const memberIds = [
    ...new Set(
      [...active, ...waitlistBookings]
        .map((b) => b.member)
        .filter(Boolean)
    ),
  ];
  const nameByMember = await fetchMemberNames(env, memberIds);

  const attendees = dedupeByUserId(
    active
      .map((b) => mapBookingRow(b, nameByMember))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
  );

  const waitlist = dedupeByUserId(
    waitlistBookings
      .map((b) => mapBookingRow(b, nameByMember))
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
  );

  // Live seat counts from actual lists (supports overbook > capacity)
  const bookedLive = attendees.length;
  const capacity = summary.capacity;
  summary.booked = bookedLive;
  summary.waitlistCount = Math.max(summary.waitlistCount || 0, waitlist.length);
  summary.overbooked = capacity != null && bookedLive > capacity;

  return {
    serverTime: new Date().toISOString(),
    class: summary,
    attendees,
    waitlist,
  };
}

/**
 * Search members by name or email for walk-in / add-to-class.
 */
async function searchMembers(env, query) {
  const q = String(query || "").trim();
  if (q.length < 2) return { members: [] };

  const seen = new Map();

  const push = (m) => {
    if (!m) return;
    const id = Number(m.id || m.member_id || m.client_id || m.pk);
    if (!id || seen.has(id)) return;
    const name =
      m.name ||
      `${m.first_name || m.firstname || ""} ${m.last_name || m.lastname || ""}`.trim() ||
      m.email ||
      `Member ${id}`;
    const email = m.email || m.mail || null;
    seen.set(id, {
      userId: String(id),
      memberId: id,
      name,
      email,
      passId: m.pass_id || m.consumer_payment_pack || null,
    });
  };

  // Classic API search (most reliable for Heat token)
  const tryClassic = async (params) => {
    try {
      const data = await bsport(env, "/member/", {
        page_size: 20,
        ...params,
      });
      for (const m of data.results || data || []) push(m);
    } catch {
      /* try next */
    }
  };

  await tryClassic({ search: q });
  if (seen.size < 5) await tryClassic({ name: q });
  if (seen.size < 5 && q.includes("@")) await tryClassic({ email: q });

  // Management clients fallback
  if (seen.size === 0) {
    try {
      const data = await bsportMgmt(env, "/management/clients/", {
        params: { search: q, page_size: 20, q },
      });
      const rows = data.results || data.clients || data || [];
      for (const m of Array.isArray(rows) ? rows : []) push(m);
    } catch {
      /* ignore */
    }
  }

  // Always refine: bSport "search" can return loose hits
  const needle = q.toLowerCase();
  const tokens = needle.split(/\s+/).filter(Boolean);
  let members = [...seen.values()].filter((m) => {
    const hay = `${m.name || ""} ${m.email || ""}`.toLowerCase();
    return tokens.every((t) => hay.includes(t));
  });

  if (members.length === 0) {
    try {
      const data = await bsport(env, "/member/", {
        page_size: 100,
        ordering: "-date_joined",
      });
      for (const m of data.results || []) {
        const hay = `${m.name || ""} ${m.first_name || ""} ${m.last_name || ""} ${m.email || ""}`.toLowerCase();
        if (tokens.every((t) => hay.includes(t))) push(m);
      }
      members = [...seen.values()].filter((m) => {
        const hay = `${m.name || ""} ${m.email || ""}`.toLowerCase();
        return tokens.every((t) => hay.includes(t));
      });
    } catch {
      /* ignore */
    }
  }

  members.sort((a, b) => a.name.localeCompare(b.name));
  return { members: members.slice(0, 20) };
}

/**
 * Promote a waitlist member onto the class roster, or book a walk-in member.
 * Uses management booking create (can overbook when staff key allows it).
 */
async function addToClass(env, body) {
  const offerId = Number(body.offerId || body.classId);
  const memberId = Number(body.memberId || body.userId || body.clientId);
  let passId = body.passId != null ? Number(body.passId) : null;
  const waitlistBookingId =
    body.waitlistBookingId != null ? Number(body.waitlistBookingId) : null;

  if (!offerId || !memberId) {
    throw new Error("offerId and memberId are required");
  }

  // Resolve pass from waitlist booking if needed
  if (!passId && waitlistBookingId) {
    try {
      const wb = await bsport(env, `/booking/${waitlistBookingId}/`);
      passId = wb.consumer_payment_pack || null;
    } catch {
      /* continue */
    }
  }

  // Resolve an active pass via management client-passes
  if (!passId) {
    passId = await findActivePassId(env, memberId);
  }
  if (!passId) {
    throw new Error("No active pass found for this member — cannot add to class");
  }

  // Create booking via management API (supports overbook when staff is allowed)
  const created = await bsportMgmt(env, "/management/bookings/", {
    method: "POST",
    body: {
      client_id: memberId,
      client_pass_id: passId,
      class_ids: [offerId],
      session_ids: [offerId],
      should_auto_assign_spot: false,
      should_keep_credits: true,
      should_notify_client: true,
    },
  });

  // Refresh class payload
  const refreshed = await getClassWithAttendees(env, offerId);

  return {
    ok: true,
    created,
    class: refreshed.class,
    attendees: refreshed.attendees,
    waitlist: refreshed.waitlist,
  };
}

async function findActivePassId(env, clientId) {
  try {
    const data = await bsportMgmt(env, "/management/client-passes/", {
      params: {
        client_id: clientId,
        page_size: 50,
      },
    });
    const rows = data.results || data || [];
    const list = Array.isArray(rows) ? rows : [];
    // Prefer enabled / active unlimited-ish packs
    const active = list.filter(
      (p) =>
        p.is_active !== false &&
        p.disabled !== true &&
        p.is_disabled !== true &&
        !p.date_disabled
    );
    const pick =
      active.find((p) => (p.credits_left == null || p.credits_left > 0)) ||
      active[0] ||
      list[0];
    return pick?.id || null;
  } catch {
    // Fallback classic payment packs for member
    try {
      const data = await bsport(env, "/consumer_payment_pack/", {
        member: clientId,
        page_size: 20,
      });
      const rows = data.results || [];
      const pick = rows.find((p) => !p.disabled && !p.date_disabled) || rows[0];
      return pick?.id || null;
    } catch {
      return null;
    }
  }
}

async function fetchMemberNames(env, memberIds) {
  const map = new Map();
  if (!memberIds.length) return map;

  const chunkSize = 40;
  for (let i = 0; i < memberIds.length; i += chunkSize) {
    const chunk = memberIds.slice(i, i + chunkSize);
    const data = await bsport(env, "/member/", {
      id__in: chunk.join(","),
      page_size: 100,
    });
    for (const m of data.results || []) {
      map.set(
        m.id,
        m.name ||
          `${m.first_name || ""} ${m.last_name || ""}`.trim() ||
          `Member ${m.id}`
      );
    }
  }

  const missing = memberIds.filter((id) => !map.has(id));
  await Promise.all(
    missing.slice(0, 30).map(async (id) => {
      try {
        const m = await bsport(env, `/member/${id}/`);
        map.set(
          id,
          m.name ||
            `${m.firstname || m.first_name || ""} ${m.lastname || m.last_name || ""}`.trim() ||
            `Member ${id}`
        );
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
