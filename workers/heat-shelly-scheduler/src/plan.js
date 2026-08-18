const TZ = "Europe/Lisbon";
const SHORT_GAP_MIN = 30;
const HEATER_PREHEAT_MIN = 30;
const LIGHTS_BEFORE_MIN = 30;
const LIGHTS_AFTER_MIN = 30;
const FAN_AFTER_DELAY_MIN = 10;
const FAN_AFTER_RUN_MIN = 60;
const FAN_MORNING_BEFORE_MIN = 90;
const FAN_MORNING_STOP_BEFORE_MIN = 30;
const MIN_FAN_RUN_MIN = 10;
const DIM_LAST_MIN = 10;
const FLOW_DIM_AFTER_MIN = 30;
const POST_CLASS_FULL_MIN = 10;
const MIN = 60000;

export { TZ };

export function lisbonYmd(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const g = (t) => parts.find((p) => p.type === t).value;
  return `${g("year")}-${g("month")}-${g("day")}`;
}

export function lisbonHm(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const g = (t) => parts.find((p) => p.type === t).value;
  return `${g("hour")}:${g("minute")}`;
}

export function nextYmd(ymd) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(ymd || "").trim());
  if (!m) throw new Error(`expected YYYY-MM-DD, got ${ymd}`);
  const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function weekDays(startYmd, count = 8) {
  const days = [startYmd];
  let cur = startYmd;
  for (let i = 1; i < count; i++) {
    cur = nextYmd(cur);
    days.push(cur);
  }
  return days;
}

export function planFingerprint(plan) {
  return (plan?.classes || []).map((c) => `${c.id}|${c.startMs}|${c.endMs}|${c.name}`).join(";");
}

export function parseClasses(raw) {
  const list = Array.isArray(raw) ? raw : [];
  return list
    .filter((c) => c && c.is_cancelled !== true && c.is_cancelled !== "true")
    .map((c) => {
      const startMs = Date.parse(c.starts_at);
      const durationMin = Number(c.duration_in_minutes) || 60;
      return {
        id: c.id,
        name: c.name || "class",
        description: c.description || "",
        startMs,
        endMs: startMs + durationMin * MIN,
        durationMin
      };
    })
    .filter((c) => Number.isFinite(c.startMs))
    .sort((a, b) => a.startMs - b.startMs);
}

export function mergeWindows(wins) {
  const sorted = [...wins].sort((a, b) => a.startMs - b.startMs);
  const out = [];
  for (const w of sorted) {
    if (w.endMs <= w.startMs) continue;
    const last = out[out.length - 1];
    if (last && w.startMs <= last.endMs) {
      last.endMs = Math.max(last.endMs, w.endMs);
    } else {
      out.push({ startMs: w.startMs, endMs: w.endMs });
    }
  }
  return out;
}

export function isYangYinClass(cls) {
  const text = `${cls?.description || ""}`;
  return /yang\s*[-/]?\s*yin/i.test(text) || /second half.{0,80}yin/i.test(text) || /pure yin/i.test(text);
}

export function isNonHeatedClass(cls) {
  const text = `${cls?.name || ""} ${cls?.description || ""}`;
  return /non[-\s]?heated|unheated|no\s*heat|without\s*heat/i.test(text);
}

/** Hard exception: Wed 19 Aug 2026 afternoon Pilates is non-heated even if BSport text is missing. */
export function isWed19AfternoonPilates(cls) {
  if (!cls) return false;
  if (!/pilates/i.test(cls.name || "")) return false;
  const start = Number.isFinite(cls.startMs) ? new Date(cls.startMs) : null;
  if (!start) return false;
  if (lisbonYmd(start) !== "2026-08-19") return false;
  const hm = lisbonHm(start);
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + (m || 0) >= 12 * 60;
}

export function skipHeaters(cls) {
  return isNonHeatedClass(cls) || isWed19AfternoonPilates(cls);
}

export function dimStartMs(cls) {
  if (isYangYinClass(cls)) return cls.startMs + FLOW_DIM_AFTER_MIN * MIN;
  return cls.endMs - DIM_LAST_MIN * MIN;
}

export function heaterStartMs(cls, prev) {
  if (!prev) return cls.startMs - HEATER_PREHEAT_MIN * MIN;
  const gapMin = (cls.startMs - prev.endMs) / MIN;
  if (gapMin >= 0 && gapMin <= SHORT_GAP_MIN) return cls.startMs;
  return cls.startMs - HEATER_PREHEAT_MIN * MIN;
}

export function buildPlan(rawClasses) {
  const classes = parseClasses(rawClasses);
  const heaters = [];
  const lights = [];
  const fan = [];
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    const prev = classes[i - 1];
    if (!skipHeaters(cls)) {
      heaters.push({
        startMs: heaterStartMs(cls, prev),
        endMs: cls.endMs
      });
    }
    lights.push({
      startMs: cls.startMs - LIGHTS_BEFORE_MIN * MIN,
      endMs: cls.endMs + LIGHTS_AFTER_MIN * MIN
    });
  }
  if (classes.length) {
    const first = classes[0];
    fan.push({
      startMs: first.startMs - FAN_MORNING_BEFORE_MIN * MIN,
      endMs: first.startMs - FAN_MORNING_STOP_BEFORE_MIN * MIN
    });
  }
  for (let i = 0; i < classes.length; i++) {
    const cls = classes[i];
    const next = classes[i + 1];
    const fanStart = cls.endMs + FAN_AFTER_DELAY_MIN * MIN;
    let fanEnd = fanStart + FAN_AFTER_RUN_MIN * MIN;
    if (next) {
      const nextHeat = heaterStartMs(next, cls);
      if (fanStart >= next.startMs) continue;
      fanEnd = Math.min(fanEnd, nextHeat, next.startMs);
    }
    if (fanEnd - fanStart >= MIN_FAN_RUN_MIN * MIN) {
      fan.push({ startMs: fanStart, endMs: fanEnd });
    }
  }
  return {
    classes: classes.map((c) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      startMs: c.startMs,
      endMs: c.endMs,
      durationMin: c.durationMin,
      nonHeated: skipHeaters(c)
    })),
    windows: {
      heaters: mergeWindows(heaters),
      lights: mergeWindows(lights),
      fan: mergeWindows(fan),
      logo: []
    },
    dim: classes
      .map((c) => ({
        startMs: dimStartMs(c),
        endMs: c.endMs,
        name: c.name
      }))
      .filter((w) => w.endMs > w.startMs)
  };
}

export function inWindow(windows, t) {
  return windows.some((w) => t >= w.startMs && t < w.endMs);
}

export function brightnessAt(plan, t) {
  if (!inWindow(plan.windows.lights, t)) return 100;
  const classes = plan.classes || [];
  const inClass = classes.find((c) => t >= c.startMs && t < c.endMs);
  if (inClass) {
    return t >= dimStartMs(inClass) ? 50 : 100;
  }
  const upcoming = classes.find((c) => t < c.startMs);
  if (upcoming && t >= upcoming.startMs - LIGHTS_BEFORE_MIN * MIN) return 100;
  const justEnded = classes.filter((c) => t >= c.endMs).sort((a, b) => b.endMs - a.endMs)[0];
  if (justEnded && t < justEnded.endMs + POST_CLASS_FULL_MIN * MIN) return 100;
  return 75;
}

export function desiredAt(plan, t) {
  const w = plan.windows;
  const lightsOn = inWindow(w.lights, t);
  return {
    heaters: inWindow(w.heaters, t),
    lights: lightsOn,
    fan: inWindow(w.fan, t),
    logo: false,
    brightness: brightnessAt(plan, t)
  };
}

export function flipTimes(plan) {
  const set = new Set();
  for (const key of ["heaters", "lights", "fan"]) {
    for (const w of plan.windows[key] || []) {
      set.add(w.startMs);
      set.add(w.endMs);
    }
  }
  for (const w of plan.dim || []) {
    set.add(w.startMs);
    set.add(w.endMs);
  }
  for (const c of plan.classes || []) {
    set.add(c.startMs);
    set.add(c.endMs + POST_CLASS_FULL_MIN * MIN);
  }
  return [...set].sort((a, b) => a - b);
}

export function nextFlipMs(plan, nowMs) {
  return flipTimes(plan).find((t) => t > nowMs + 500) || null;
}

export function formatWindow(w) {
  return `${lisbonHm(new Date(w.startMs))}-${lisbonHm(new Date(w.endMs))}`;
}

export function summarizePlan(plan) {
  const fmt = (key) => (plan.windows[key] || []).map(formatWindow).join(", ") || "off all day";
  return {
    classes: plan.classes.map((c) => ({
      name: c.name,
      when: `${lisbonHm(new Date(c.startMs))}-${lisbonHm(new Date(c.endMs))}`,
      nonHeated: !!c.nonHeated
    })),
    heaters: fmt("heaters"),
    lights: fmt("lights"),
    fan: fmt("fan"),
    logo: fmt("logo")
  };
}
