"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Same-origin Worker routes on heatlagos.com; workers.dev fallback for local/preview */
const API_BASE =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1")
    ? "https://heat-checkin.sebastian-brosche.workers.dev"
    : "/api/checkin";

type ClassSummary = {
  id: number;
  name: string;
  dateStart: string;
  durationMinute: number;
  startMs: number;
  endMs: number;
  booked: number;
  capacity: number | null;
};

type Attendee = {
  userId: string;
  bookingId: number;
  name: string;
  attendanceBsport?: boolean;
};

type AttendanceMap = Record<string, "present" | "missing">;

const TWO_H_MS = 2 * 60 * 60 * 1000;
const TEN_M_MS = 10 * 60 * 1000;
const FIFTEEN_M_MS = 15 * 60 * 1000;

function storageKey(classId: number) {
  return `attendance_${classId}`;
}

function loadAttendance(classId: number): AttendanceMap {
  try {
    const raw = localStorage.getItem(storageKey(classId));
    if (raw) return JSON.parse(raw) as AttendanceMap;
  } catch {
    /* ignore */
  }
  return {};
}

function saveAttendance(classId: number, state: AttendanceMap) {
  try {
    localStorage.setItem(storageKey(classId), JSON.stringify(state));
  } catch {
    /* ignore */
  }
}

function getInitials(name: string) {
  if (!name || name.startsWith("Member ")) return "?";
  return name
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function formatClassTime(iso: string, durationMin: number) {
  const start = new Date(iso);
  const end = new Date(start.getTime() + durationMin * 60 * 1000);
  const day = start.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "Europe/Lisbon",
  });
  const t0 = start.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon",
  });
  const t1 = end.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Lisbon",
  });
  return `${day} · ${t0} – ${t1}`;
}

function isInPrimaryWindow(c: ClassSummary, now: number) {
  return now >= c.startMs - TWO_H_MS && now <= c.endMs + TEN_M_MS;
}

function isInLiveRefreshWindow(c: ClassSummary, now: number) {
  // Every minute from 15 min before start until 10 min after end
  return now >= c.startMs - FIFTEEN_M_MS && now <= c.endMs + TEN_M_MS;
}

function classStatusLabel(c: ClassSummary, now: number) {
  if (now < c.startMs - TWO_H_MS) return "Later";
  if (now < c.startMs) {
    const mins = Math.round((c.startMs - now) / 60000);
    return mins <= 15 ? `Starts in ${mins} min` : `In ${mins} min`;
  }
  if (now <= c.endMs) return "In progress";
  if (now <= c.endMs + TEN_M_MS) return "Just finished";
  return "Past";
}

export default function CheckinClient() {
  const [classes, setClasses] = useState<ClassSummary[]>([]);
  const [index, setIndex] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceMap>({});
  const [loadingList, setLoadingList] = useState(true);
  const [loadingClass, setLoadingClass] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [now, setNow] = useState(() => Date.now());
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [swipeHint, setSwipeHint] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const currentClass = classes[index] ?? null;

  // Tick clock every 30s for status labels + window checks
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const loadClassList = useCallback(async (preferId?: number) => {
    setLoadingList(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/classes`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Classes ${res.status}`);
      const data = (await res.json()) as {
        classes: ClassSummary[];
        defaultIndex: number;
      };
      const list = data.classes || [];
      setClasses(list);

      let nextIndex = data.defaultIndex >= 0 ? data.defaultIndex : 0;
      if (preferId != null) {
        const found = list.findIndex((c) => c.id === preferId);
        if (found >= 0) nextIndex = found;
      }
      setIndex(nextIndex);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load classes");
    } finally {
      setLoadingList(false);
    }
  }, []);

  const loadAttendees = useCallback(async (classId: number, silent = false) => {
    if (!silent) setLoadingClass(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/class?id=${classId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`Class ${res.status}`);
      const data = (await res.json()) as {
        attendees: Attendee[];
        class: ClassSummary;
      };
      setAttendees(data.attendees || []);

      // Merge local attendance; default missing
      const saved = loadAttendance(classId);
      const next: AttendanceMap = { ...saved };
      for (const a of data.attendees || []) {
        if (!next[a.userId]) {
          // Seed from bSport attendance when first seen
          next[a.userId] = a.attendanceBsport ? "present" : "missing";
        }
      }
      // Drop people who unbooked
      const liveIds = new Set((data.attendees || []).map((a) => a.userId));
      for (const key of Object.keys(next)) {
        if (!liveIds.has(key)) delete next[key];
      }
      setAttendance(next);
      saveAttendance(classId, next);
      setLastRefresh(new Date());
    } catch (e) {
      if (!silent) {
        setError(e instanceof Error ? e.message : "Failed to load attendees");
        setAttendees([]);
      }
    } finally {
      if (!silent) setLoadingClass(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    void loadClassList();
  }, [loadClassList]);

  // Load attendees when class changes
  useEffect(() => {
    if (!currentClass) return;
    setSearch("");
    void loadAttendees(currentClass.id);
  }, [currentClass?.id, loadAttendees]);

  // Minute refresh in the 15-min-before → 10-min-after window
  useEffect(() => {
    if (!currentClass) return;
    const tick = () => {
      const t = Date.now();
      setNow(t);
      if (isInLiveRefreshWindow(currentClass, t)) {
        void loadAttendees(currentClass.id, true);
      }
    };
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [currentClass, loadAttendees]);

  // When primary window expires, re-pick default class
  useEffect(() => {
    if (!classes.length) return;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      const cur = classes[index];
      if (cur && isInPrimaryWindow(cur, n)) return;
      // Find first class in primary window
      const next = classes.findIndex((c) => isInPrimaryWindow(c, n));
      if (next >= 0 && next !== index) setIndex(next);
    }, 60_000);
    return () => clearInterval(t);
  }, [classes, index]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = i + delta;
        if (next < 0 || next >= classes.length) {
          setSwipeHint((h) => h + 1);
          return i;
        }
        return next;
      });
    },
    [classes.length]
  );

  // Keyboard: arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "r") {
        e.preventDefault();
        if (currentClass) void loadAttendees(currentClass.id);
        else void loadClassList();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, currentClass, loadAttendees, loadClassList]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
    // Swipe right → previous class; swipe left → next class
    if (dx > 0) go(-1);
    else go(1);
  };

  const toggle = (userId: string) => {
    if (!currentClass) return;
    setAttendance((prev) => {
      const next = {
        ...prev,
        [userId]: prev[userId] === "present" ? "missing" : "present",
      } as AttendanceMap;
      saveAttendance(currentClass.id, next);
      return next;
    });
  };

  const markAll = (status: "present" | "missing") => {
    if (!currentClass) return;
    const next: AttendanceMap = {};
    for (const a of attendees) next[a.userId] = status;
    setAttendance(next);
    saveAttendance(currentClass.id, next);
  };

  const { present, missing } = useMemo(() => {
    let p = 0;
    let m = 0;
    for (const a of attendees) {
      if ((attendance[a.userId] || "missing") === "present") p++;
      else m++;
    }
    return { present: p, missing: m };
  }, [attendees, attendance]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return attendees;
    return attendees.filter((a) => a.name.toLowerCase().includes(q));
  }, [attendees, search]);

  const progressPct =
    present + missing > 0 ? Math.round((present / (present + missing)) * 100) : 0;

  const canPrev = index > 0;
  const canNext = index < classes.length - 1;
  const liveRefresh =
    currentClass != null && isInLiveRefreshWindow(currentClass, now);

  return (
    <div
      className="checkin-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        .checkin-root {
          --bg: #f8faf9;
          --surface: #ffffff;
          --border: #e8eeec;
          --text: #1a2e2a;
          --text-secondary: #5c736c;
          --primary: #0f766e;
          --primary-soft: #ccfbf1;
          --present: #059669;
          --present-bg: #ecfdf5;
          --missing: #e11d48;
          --missing-bg: #fff1f2;
          --shadow: 0 1px 3px rgba(15, 40, 35, 0.04),
            0 4px 16px rgba(15, 40, 35, 0.06);
          --radius: 16px;
          --radius-sm: 10px;
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          padding: 20px 16px 40px;
          -webkit-font-smoothing: antialiased;
        }
        .checkin-root * {
          box-sizing: border-box;
        }
        .checkin-container {
          max-width: 560px;
          margin: 0 auto;
        }
        .checkin-header {
          background: linear-gradient(135deg, #0f766e 0%, #0d9488 100%);
          color: white;
          padding: 24px 22px 20px;
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          margin-bottom: 16px;
          position: relative;
          overflow: hidden;
        }
        .checkin-header::after {
          content: "";
          position: absolute;
          top: -40%;
          right: -20%;
          width: 180px;
          height: 180px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
        }
        .checkin-header h1 {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0 0 4px;
          position: relative;
        }
        .checkin-header .subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin: 0;
          position: relative;
        }
        .checkin-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .checkin-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--text);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s, opacity 0.15s;
        }
        .checkin-nav-btn:disabled {
          opacity: 0.35;
          cursor: default;
        }
        .checkin-nav-btn:not(:disabled):hover {
          background: var(--bg);
        }
        .checkin-nav-meta {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .checkin-nav-meta strong {
          display: block;
          color: var(--text);
          font-size: 13px;
          margin-bottom: 2px;
        }
        .checkin-class-card {
          background: var(--surface);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 18px 20px;
          margin-bottom: 14px;
          border: 1px solid var(--border);
        }
        .checkin-class-name {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }
        .checkin-class-time {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 10px;
        }
        .checkin-status-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 14px;
        }
        .checkin-badge {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--primary-soft);
          color: var(--primary);
        }
        .checkin-badge.live {
          background: #fef3c7;
          color: #b45309;
        }
        .checkin-stats {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .checkin-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 999px;
          background: var(--bg);
        }
        .checkin-pill .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .checkin-pill.present .dot {
          background: var(--present);
        }
        .checkin-pill.missing .dot {
          background: var(--missing);
        }
        .checkin-pill .n {
          font-weight: 700;
        }
        .checkin-progress {
          flex: 1;
          height: 6px;
          background: var(--border);
          border-radius: 999px;
          overflow: hidden;
          min-width: 40px;
        }
        .checkin-progress > div {
          height: 100%;
          background: linear-gradient(90deg, var(--present), #34d399);
          border-radius: 999px;
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .checkin-controls {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
          flex-wrap: wrap;
        }
        .checkin-search {
          flex: 1;
          min-width: 160px;
          position: relative;
        }
        .checkin-search input {
          width: 100%;
          padding: 11px 14px 11px 40px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 14px;
          font-family: inherit;
          background: var(--surface);
          color: var(--text);
        }
        .checkin-search input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-soft);
        }
        .checkin-search svg {
          position: absolute;
          left: 13px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: var(--text-secondary);
          pointer-events: none;
        }
        .checkin-btn {
          padding: 10px 16px;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.15s, color 0.15s;
        }
        .checkin-btn.secondary {
          background: var(--surface);
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }
        .checkin-btn.secondary:hover {
          background: var(--bg);
          color: var(--text);
        }
        .checkin-btn.primary {
          background: var(--primary);
          color: white;
        }
        .checkin-list {
          background: var(--surface);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          border: 1px solid var(--border);
          overflow: hidden;
        }
        .checkin-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
        }
        .checkin-item:last-child {
          border-bottom: none;
        }
        .checkin-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #ccfbf1, #99f6e4);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          flex-shrink: 0;
        }
        .checkin-name {
          flex: 1;
          min-width: 0;
          font-size: 15px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .checkin-status {
          padding: 8px 18px;
          border: none;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          min-width: 96px;
          flex-shrink: 0;
          transition: transform 0.15s, background 0.15s;
        }
        .checkin-status.present {
          background: var(--present-bg);
          color: var(--present);
        }
        .checkin-status.missing {
          background: var(--missing-bg);
          color: var(--missing);
        }
        .checkin-status:hover {
          transform: scale(1.03);
        }
        .checkin-empty,
        .checkin-error,
        .checkin-loading {
          text-align: center;
          padding: 48px 24px;
          color: var(--text-secondary);
          font-size: 14px;
        }
        .checkin-error {
          background: #fff1f2;
          color: var(--missing);
          border-radius: var(--radius);
        }
        .checkin-footer {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 18px;
          opacity: 0.75;
          line-height: 1.5;
        }
        .checkin-skeleton {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border);
        }
        .checkin-skeleton-av {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: linear-gradient(90deg, #e8eeec 25%, #f1f5f4 50%, #e8eeec 75%);
          background-size: 200% 100%;
          animation: checkin-shimmer 1.4s infinite;
        }
        .checkin-skeleton-line {
          height: 14px;
          border-radius: 6px;
          background: linear-gradient(90deg, #e8eeec 25%, #f1f5f4 50%, #e8eeec 75%);
          background-size: 200% 100%;
          animation: checkin-shimmer 1.4s infinite;
        }
        @keyframes checkin-shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      <div className="checkin-container">
        <div className="checkin-header">
          <h1>Class Check-in</h1>
          <p className="subtitle">
            Swipe or use arrows for last / next class · Heat Lagos
          </p>
        </div>

        {error && (
          <div className="checkin-error" style={{ marginBottom: 14 }}>
            <p style={{ margin: "0 0 8px", fontWeight: 600 }}>
              Couldn’t load data
            </p>
            <p style={{ margin: "0 0 12px", fontSize: 12, opacity: 0.85 }}>
              {error}
            </p>
            <button
              type="button"
              className="checkin-btn primary"
              onClick={() => void loadClassList(currentClass?.id)}
            >
              Try again
            </button>
          </div>
        )}

        {loadingList && !classes.length ? (
          <div className="checkin-list">
            {[60, 55, 70].map((w) => (
              <div className="checkin-skeleton" key={w}>
                <div className="checkin-skeleton-av" />
                <div style={{ flex: 1 }}>
                  <div
                    className="checkin-skeleton-line"
                    style={{ width: `${w}%`, marginBottom: 8 }}
                  />
                  <div
                    className="checkin-skeleton-line"
                    style={{ width: `${w - 20}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : !classes.length ? (
          <div className="checkin-empty">No classes in the schedule window</div>
        ) : (
          <>
            <div className="checkin-nav">
              <button
                type="button"
                className="checkin-nav-btn"
                aria-label="Previous class"
                disabled={!canPrev}
                onClick={() => go(-1)}
              >
                ‹
              </button>
              <div className="checkin-nav-meta" key={swipeHint}>
                <strong>
                  Class {index + 1} of {classes.length}
                </strong>
                Swipe left / right to change
              </div>
              <button
                type="button"
                className="checkin-nav-btn"
                aria-label="Next class"
                disabled={!canNext}
                onClick={() => go(1)}
              >
                ›
              </button>
            </div>

            {currentClass && (
              <div className="checkin-class-card">
                <div className="checkin-class-name">{currentClass.name}</div>
                <div className="checkin-class-time">
                  {formatClassTime(
                    currentClass.dateStart,
                    currentClass.durationMinute
                  )}
                </div>
                <div className="checkin-status-row">
                  <span className="checkin-badge">
                    {classStatusLabel(currentClass, now)}
                  </span>
                  {liveRefresh && (
                    <span className="checkin-badge live">
                      Live list · updates every min
                    </span>
                  )}
                  {currentClass.capacity != null && (
                    <span
                      className="checkin-badge"
                      style={{
                        background: "var(--bg)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {attendees.length || currentClass.booked}/
                      {currentClass.capacity} booked
                    </span>
                  )}
                </div>
                <div className="checkin-stats">
                  <div className="checkin-pill present">
                    <span className="dot" />
                    Present <span className="n">{present}</span>
                  </div>
                  <div className="checkin-pill missing">
                    <span className="dot" />
                    Missing <span className="n">{missing}</span>
                  </div>
                  <div className="checkin-progress">
                    <div style={{ width: `${progressPct}%` }} />
                  </div>
                </div>
              </div>
            )}

            <div className="checkin-controls">
              <div className="checkin-search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  placeholder="Search attendees…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button
                type="button"
                className="checkin-btn secondary"
                onClick={() => markAll("present")}
              >
                All Present
              </button>
              <button
                type="button"
                className="checkin-btn secondary"
                onClick={() => markAll("missing")}
              >
                All Missing
              </button>
              <button
                type="button"
                className="checkin-btn secondary"
                onClick={() =>
                  currentClass
                    ? void loadAttendees(currentClass.id)
                    : void loadClassList()
                }
              >
                Refresh
              </button>
            </div>

            {loadingClass ? (
              <div className="checkin-list">
                {[1, 2, 3, 4].map((i) => (
                  <div className="checkin-skeleton" key={i}>
                    <div className="checkin-skeleton-av" />
                    <div style={{ flex: 1 }}>
                      <div
                        className="checkin-skeleton-line"
                        style={{ width: "55%", marginBottom: 8 }}
                      />
                      <div
                        className="checkin-skeleton-line"
                        style={{ width: "35%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="checkin-empty">
                {search
                  ? "No matching attendees"
                  : "No attendees booked for this class"}
              </div>
            ) : (
              <div className="checkin-list">
                {filtered.map((a) => {
                  const status = attendance[a.userId] || "missing";
                  return (
                    <div className="checkin-item" key={a.userId}>
                      <div className="checkin-avatar">
                        {getInitials(a.name)}
                      </div>
                      <div className="checkin-name">{a.name}</div>
                      <button
                        type="button"
                        className={`checkin-status ${status}`}
                        onClick={() => toggle(a.userId)}
                        aria-label={`Mark ${a.name} ${
                          status === "present" ? "missing" : "present"
                        }`}
                      >
                        {status === "present" ? "Present" : "Missing"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        <p className="checkin-footer">
          Attendance saved on this device
          {lastRefresh && (
            <>
              <br />
              Last update{" "}
              {lastRefresh.toLocaleTimeString(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </>
          )}
          <br />
          Ctrl/Cmd+R refresh · ← → change class
        </p>
      </div>
    </div>
  );
}
