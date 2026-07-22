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
  waitlistCount?: number;
  overbooked?: boolean;
  teacherName?: string | null;
  coachId?: number | null;
};

type Attendee = {
  userId: string;
  bookingId: number;
  name: string;
  passId?: number | null;
  attendanceBsport?: boolean;
};

type MemberHit = {
  userId: string;
  memberId: number;
  name: string;
  email?: string | null;
  passId?: number | null;
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

/** Only last class, present class, next class. */
function windowAround(
  all: ClassSummary[],
  centerIdx: number
): { items: ClassSummary[]; localIndex: number } {
  if (!all.length) return { items: [], localIndex: 0 };
  const safe = Math.max(0, Math.min(centerIdx, all.length - 1));
  const items: ClassSummary[] = [];
  if (safe > 0) items.push(all[safe - 1]);
  items.push(all[safe]);
  if (safe < all.length - 1) items.push(all[safe + 1]);
  const localIndex = items.findIndex((c) => c.id === all[safe].id);
  return { items, localIndex: Math.max(0, localIndex) };
}

function pickPrimaryIndex(all: ClassSummary[], now: number, preferredId?: number) {
  if (preferredId != null) {
    const found = all.findIndex((c) => c.id === preferredId);
    if (found >= 0) return found;
  }
  for (let i = 0; i < all.length; i++) {
    if (isInPrimaryWindow(all[i], now)) return i;
  }
  for (let i = 0; i < all.length; i++) {
    if (all[i].startMs >= now) return i;
  }
  return Math.max(0, all.length - 1);
}

export default function CheckinClient() {
  const [allClasses, setAllClasses] = useState<ClassSummary[]>([]);
  const [classes, setClasses] = useState<ClassSummary[]>([]);
  const [index, setIndex] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [waitlist, setWaitlist] = useState<Attendee[]>([]);
  const [attendance, setAttendance] = useState<AttendanceMap>({});
  const [loadingList, setLoadingList] = useState(true);
  const [loadingClass, setLoadingClass] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [memberQuery, setMemberQuery] = useState("");
  const [memberHits, setMemberHits] = useState<MemberHit[]>([]);
  const [memberSearching, setMemberSearching] = useState(false);
  const [memberSearchError, setMemberSearchError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const memberSearchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const currentClass = classes[index] ?? null;

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const applyWindow = useCallback(
    (all: ClassSummary[], centerIdx: number, preferLocalId?: number) => {
      const { items, localIndex } = windowAround(all, centerIdx);
      setClasses(items);
      if (preferLocalId != null) {
        const local = items.findIndex((c) => c.id === preferLocalId);
        setIndex(local >= 0 ? local : localIndex);
      } else {
        setIndex(localIndex);
      }
    },
    []
  );

  const loadClassList = useCallback(
    async (preferId?: number) => {
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
        setAllClasses(list);

        const nowMs = Date.now();
        let center =
          data.defaultIndex >= 0 ? data.defaultIndex : pickPrimaryIndex(list, nowMs);
        if (preferId != null) {
          const found = list.findIndex((c) => c.id === preferId);
          if (found >= 0) center = found;
        }
        applyWindow(list, center, preferId);
        setLastRefresh(new Date());
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load classes");
      } finally {
        setLoadingList(false);
      }
    },
    [applyWindow]
  );

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
        waitlist?: Attendee[];
        class: ClassSummary;
      };
      setAttendees(data.attendees || []);
      setWaitlist(data.waitlist || []);

      if (data.class) {
        const patch = (list: ClassSummary[]) =>
          list.map((c) =>
            c.id === classId
              ? {
                  ...c,
                  ...data.class,
                  teacherName: data.class.teacherName ?? c.teacherName,
                  coachId: data.class.coachId ?? c.coachId,
                  booked: data.class.booked ?? c.booked,
                  capacity: data.class.capacity ?? c.capacity,
                  waitlistCount: data.class.waitlistCount ?? c.waitlistCount,
                  overbooked: data.class.overbooked ?? c.overbooked,
                }
              : c
          );
        setClasses(patch);
        setAllClasses(patch);
      }

      const saved = loadAttendance(classId);
      const next: AttendanceMap = { ...saved };
      for (const a of data.attendees || []) {
        if (!next[a.userId]) {
          next[a.userId] = a.attendanceBsport ? "present" : "missing";
        }
      }
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
        setWaitlist([]);
      }
    } finally {
      if (!silent) setLoadingClass(false);
    }
  }, []);

  useEffect(() => {
    void loadClassList();
  }, [loadClassList]);

  useEffect(() => {
    if (!currentClass) return;
    setMemberQuery("");
    setMemberHits([]);
    setMemberSearchError(null);
    void loadAttendees(currentClass.id);
  }, [currentClass?.id, loadAttendees]);

  useEffect(() => {
    if (memberSearchTimer.current) clearTimeout(memberSearchTimer.current);
    const q = memberQuery.trim();
    if (q.length < 2) {
      setMemberHits([]);
      setMemberSearching(false);
      setMemberSearchError(null);
      return;
    }
    setMemberSearching(true);
    setMemberSearchError(null);
    memberSearchTimer.current = setTimeout(() => {
      void (async () => {
        try {
          const res = await fetch(
            `${API_BASE}/members?q=${encodeURIComponent(q)}`,
            { cache: "no-store" }
          );
          const data = (await res.json().catch(() => ({}))) as {
            members?: MemberHit[];
            error?: string;
          };
          if (!res.ok) {
            throw new Error(data.error || `Search failed (${res.status})`);
          }
          setMemberHits(data.members || []);
        } catch (e) {
          setMemberHits([]);
          setMemberSearchError(
            e instanceof Error ? e.message : "Member search failed"
          );
        } finally {
          setMemberSearching(false);
        }
      })();
    }, 280);
    return () => {
      if (memberSearchTimer.current) clearTimeout(memberSearchTimer.current);
    };
  }, [memberQuery]);

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

  // When primary window moves on, re-center on the new present class
  useEffect(() => {
    if (!allClasses.length) return;
    const t = setInterval(() => {
      const n = Date.now();
      setNow(n);
      const primary = pickPrimaryIndex(allClasses, n);
      const primaryId = allClasses[primary]?.id;
      if (!primaryId) return;
      if (currentClass && isInPrimaryWindow(currentClass, n)) return;
      // Rebuild last / present / next around the new primary
      applyWindow(allClasses, primary);
    }, 60_000);
    return () => clearInterval(t);
  }, [allClasses, currentClass, applyWindow]);

  const go = useCallback(
    (delta: number) => {
      setIndex((i) => {
        const next = i + delta;
        if (next < 0 || next >= classes.length) return i;
        return next;
      });
    },
    [classes.length]
  );

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

  const addToClass = async (
    person: Pick<Attendee, "userId" | "passId"> & {
      bookingId?: number;
      name?: string;
    }
  ) => {
    if (!currentClass) return;
    setAddingId(person.userId);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/add-to-class`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          offerId: currentClass.id,
          memberId: Number(person.userId),
          passId: person.passId ?? undefined,
          waitlistBookingId: person.bookingId,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        attendees?: Attendee[];
        waitlist?: Attendee[];
        class?: ClassSummary;
      };
      if (!res.ok) {
        throw new Error(data.error || `Add failed (${res.status})`);
      }
      if (data.attendees) setAttendees(data.attendees);
      if (data.waitlist) setWaitlist(data.waitlist);
      if (data.class) {
        const patch = (list: ClassSummary[]) =>
          list.map((c) =>
            c.id === currentClass.id ? { ...c, ...data.class! } : c
          );
        setClasses(patch);
        setAllClasses(patch);
      } else {
        await loadAttendees(currentClass.id, true);
      }
      // Clear search after a successful walk-in add
      setMemberQuery("");
      setMemberHits([]);
      setLastRefresh(new Date());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add to class");
    } finally {
      setAddingId(null);
    }
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

  const bookedCount = Math.max(
    attendees.length,
    currentClass?.booked ?? 0
  );
  const capacity = currentClass?.capacity ?? null;
  const isOverbooked =
    capacity != null && bookedCount > capacity
      ? true
      : Boolean(currentClass?.overbooked);

  const progressPct =
    present + missing > 0 ? Math.round((present / (present + missing)) * 100) : 0;

  // Occupancy fill for the "download bar" feel — can exceed 100% when overbooked
  const occupancyPct =
    capacity && capacity > 0
      ? Math.min(100, Math.round((bookedCount / capacity) * 100))
      : progressPct;

  const canPrev = index > 0;
  const canNext = index < classes.length - 1;

  return (
    <div
      className="checkin-root"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <style>{`
        .checkin-root {
          --bg: #1a1512;
          --surface: #2a231f;
          --border: rgba(255, 255, 255, 0.08);
          --text: #f5efe8;
          --text-secondary: #8a8682;
          --brand: #fc966a;
          --brand-soft: #ffb48f;
          --present: #6ee7b7;
          --present-bg: rgba(16, 185, 129, 0.16);
          --missing: #fca5a5;
          --missing-bg: rgba(239, 68, 68, 0.14);
          --radius: 16px;
          --radius-sm: 10px;
          font-family: Inter, var(--font-inter), system-ui, sans-serif;
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
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--surface);
          color: var(--text);
          padding: 16px 14px;
          border-radius: var(--radius);
          border: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .checkin-header-title {
          flex: 1;
          text-align: center;
          min-width: 0;
        }
        .checkin-header h1 {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.5rem;
          font-weight: 400;
          letter-spacing: -0.02em;
          margin: 0;
          line-height: 1.15;
        }
        .checkin-nav-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.15s, color 0.15s, opacity 0.15s;
        }
        .checkin-nav-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }
        .checkin-nav-btn:not(:disabled):hover {
          border-color: rgba(252, 150, 106, 0.45);
          color: var(--brand);
        }
        .checkin-class-card {
          background: var(--surface);
          border-radius: var(--radius);
          padding: 18px 20px;
          margin-bottom: 14px;
          border: 1px solid var(--border);
        }
        .checkin-class-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin: 0 0 6px;
        }
        .checkin-class-name {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.35rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          margin: 0;
          line-height: 1.25;
          flex: 1;
          min-width: 0;
        }
        .checkin-class-name em {
          font-style: italic;
          color: var(--brand);
        }
        .checkin-class-head .checkin-btn {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .checkin-class-time {
          font-size: 13px;
          color: var(--text-secondary);
          margin: 0 0 12px;
        }
        .checkin-status-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          margin-bottom: 14px;
        }
        .checkin-badge {
          font-size: 11px;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 999px;
          background: rgba(252, 150, 106, 0.14);
          color: var(--brand);
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }
        .checkin-badge.muted {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
        }
        .checkin-badge.overbooked {
          background: rgba(239, 68, 68, 0.18);
          color: #fca5a5;
          letter-spacing: 0.08em;
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
          background: rgba(255, 255, 255, 0.04);
          color: var(--text);
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
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
          overflow: hidden;
          min-width: 40px;
        }
        .checkin-progress > div {
          height: 100%;
          background: linear-gradient(90deg, var(--brand), var(--brand-soft));
          border-radius: 999px;
          transition: width 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s;
        }
        .checkin-progress.overbooked > div {
          background: linear-gradient(90deg, #ef4444, #f87171);
        }
        .checkin-progress.overbooked {
          background: rgba(239, 68, 68, 0.18);
          box-shadow: inset 0 0 0 1px rgba(239, 68, 68, 0.25);
        }
        .checkin-btn {
          padding: 10px 16px;
          border: none;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .checkin-btn.secondary {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid var(--border);
        }
        .checkin-btn.secondary:hover {
          border-color: rgba(252, 150, 106, 0.45);
          color: var(--brand);
        }
        .checkin-btn.primary {
          background: var(--brand);
          color: #2a231f;
        }
        .checkin-btn.primary:hover {
          background: var(--brand-soft);
        }
        .checkin-btn.primary:disabled {
          opacity: 0.5;
          cursor: default;
        }
        .checkin-section-label {
          margin: 18px 0 8px;
          padding: 0 4px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--text-secondary);
        }
        .checkin-section-label strong {
          color: var(--brand);
          font-weight: 700;
        }
        .checkin-list {
          background: var(--surface);
          border-radius: var(--radius);
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
          background: rgba(252, 150, 106, 0.16);
          color: var(--brand);
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
          transition: background 0.15s, color 0.15s;
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
          filter: brightness(1.08);
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
          background: var(--missing-bg);
          color: var(--missing);
          border-radius: var(--radius);
          border: 1px solid rgba(239, 68, 68, 0.2);
        }
        .checkin-footer {
          text-align: center;
          font-size: 12px;
          color: var(--text-secondary);
          margin-top: 18px;
          line-height: 1.5;
        }
        .checkin-add-member {
          margin-top: 14px;
          padding: 16px 16px 14px;
          border-radius: var(--radius);
          background: #342c27;
          border: 1px solid rgba(252, 150, 106, 0.18);
        }
        .checkin-add-member .checkin-section-label {
          margin: 0 0 10px;
          padding: 0;
        }
        .checkin-add-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.22);
          color: var(--text);
          font-size: 15px;
          font-family: inherit;
          outline: none;
        }
        .checkin-add-input::placeholder {
          color: var(--text-secondary);
        }
        .checkin-add-input:focus {
          border-color: rgba(252, 150, 106, 0.5);
        }
        .checkin-add-hint {
          margin: 8px 0 0;
          font-size: 12px;
          color: var(--text-secondary);
        }
        .checkin-add-results {
          margin-top: 10px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          border: 1px solid var(--border);
          background: rgba(0, 0, 0, 0.18);
        }
        .checkin-add-results .checkin-item {
          background: transparent;
        }
        .checkin-add-results .checkin-name small {
          display: block;
          font-size: 11px;
          font-weight: 400;
          color: var(--text-secondary);
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
          background: linear-gradient(90deg, #2a231f 25%, #3a322c 50%, #2a231f 75%);
          background-size: 200% 100%;
          animation: checkin-shimmer 1.4s infinite;
        }
        .checkin-skeleton-line {
          height: 14px;
          border-radius: 6px;
          background: linear-gradient(90deg, #2a231f 25%, #3a322c 50%, #2a231f 75%);
          background-size: 200% 100%;
          animation: checkin-shimmer 1.4s infinite;
        }
        @keyframes checkin-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="checkin-container">
        <div className="checkin-header">
          <button
            type="button"
            className="checkin-nav-btn"
            aria-label="Previous class"
            disabled={!canPrev || loadingList || !classes.length}
            onClick={() => go(-1)}
          >
            ‹
          </button>
          <div className="checkin-header-title">
            <h1>Class Check-in</h1>
          </div>
          <button
            type="button"
            className="checkin-nav-btn"
            aria-label="Next class"
            disabled={!canNext || loadingList || !classes.length}
            onClick={() => go(1)}
          >
            ›
          </button>
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
            {currentClass && (
              <div className="checkin-class-card">
                <div className="checkin-class-head">
                  <div className="checkin-class-name">
                    {currentClass.teacherName ? (
                      <>
                        {currentClass.name}
                        <em>, with {currentClass.teacherName}</em>
                      </>
                    ) : (
                      currentClass.name
                    )}
                  </div>
                  <button
                    type="button"
                    className="checkin-btn secondary"
                    onClick={() => void loadAttendees(currentClass.id)}
                  >
                    Refresh
                  </button>
                </div>
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
                  {capacity != null && (
                    <span
                      className={`checkin-badge ${
                        isOverbooked ? "overbooked" : "muted"
                      }`}
                    >
                      {isOverbooked
                        ? `⚠️ ${bookedCount}/${capacity} OVERBOOKED!`
                        : `${bookedCount}/${capacity} booked`}
                    </span>
                  )}
                  {waitlist.length > 0 && (
                    <span className="checkin-badge muted">
                      {waitlist.length} waitlist
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
                  <div
                    className={`checkin-progress${
                      isOverbooked ? " overbooked" : ""
                    }`}
                    title={
                      isOverbooked
                        ? `Overbooked ${bookedCount}/${capacity}`
                        : capacity != null
                          ? `${bookedCount}/${capacity} booked · check-in ${progressPct}%`
                          : `Check-in ${progressPct}%`
                    }
                  >
                    <div
                      style={{
                        width: `${
                          isOverbooked
                            ? Math.max(occupancyPct, progressPct, 100)
                            : Math.max(occupancyPct, progressPct)
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

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
            ) : (
              <>
                <div className="checkin-section-label">
                  Attendees{" "}
                  <strong>{attendees.length}</strong>
                  {capacity != null ? ` / ${capacity}` : null}
                </div>
                {attendees.length === 0 ? (
                  <div className="checkin-empty">
                    No attendees booked for this class
                  </div>
                ) : (
                  <div className="checkin-list">
                    {attendees.map((a) => {
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

                <div className="checkin-section-label">
                  Waitlist <strong>{waitlist.length}</strong>
                </div>
                {waitlist.length === 0 ? (
                  <div className="checkin-empty" style={{ padding: "28px 24px" }}>
                    Nobody on the waitlist
                  </div>
                ) : (
                  <div className="checkin-list">
                    {waitlist.map((w) => (
                      <div className="checkin-item" key={`wl-${w.userId}`}>
                        <div className="checkin-avatar">
                          {getInitials(w.name)}
                        </div>
                        <div className="checkin-name">{w.name}</div>
                        <button
                          type="button"
                          className="checkin-btn primary"
                          disabled={addingId === w.userId}
                          onClick={() => void addToClass(w)}
                          aria-label={`Add ${w.name} to class`}
                        >
                          {addingId === w.userId ? "Adding…" : "Add to class"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="checkin-add-member">
                  <div className="checkin-section-label">
                    Add member
                  </div>
                  <input
                    type="search"
                    className="checkin-add-input"
                    placeholder="Search name or email"
                    value={memberQuery}
                    onChange={(e) => setMemberQuery(e.target.value)}
                    autoComplete="off"
                    enterKeyHint="search"
                    aria-label="Search members to add"
                  />
                  {memberQuery.trim().length > 0 &&
                    memberQuery.trim().length < 2 && (
                      <p className="checkin-add-hint">Type at least 2 characters</p>
                    )}
                  {memberSearching && (
                    <p className="checkin-add-hint">Searching…</p>
                  )}
                  {memberSearchError && (
                    <p className="checkin-add-hint" style={{ color: "var(--missing)" }}>
                      {memberSearchError}
                    </p>
                  )}
                  {!memberSearching &&
                    memberQuery.trim().length >= 2 &&
                    !memberSearchError &&
                    memberHits.length === 0 && (
                      <p className="checkin-add-hint">No members found</p>
                    )}
                  {memberHits.length > 0 && (
                    <div className="checkin-add-results">
                      {memberHits.map((m) => {
                        const alreadyIn = attendees.some(
                          (a) => a.userId === m.userId
                        );
                        return (
                          <div className="checkin-item" key={`add-${m.userId}`}>
                            <div className="checkin-avatar">
                              {getInitials(m.name)}
                            </div>
                            <div className="checkin-name">
                              {m.name}
                              {m.email ? <small>{m.email}</small> : null}
                            </div>
                            <button
                              type="button"
                              className="checkin-btn primary"
                              disabled={
                                alreadyIn || addingId === m.userId
                              }
                              onClick={() =>
                                void addToClass({
                                  userId: m.userId,
                                  passId: m.passId,
                                })
                              }
                              aria-label={
                                alreadyIn
                                  ? `${m.name} already in class`
                                  : `Add ${m.name} to class`
                              }
                            >
                              {alreadyIn
                                ? "In class"
                                : addingId === m.userId
                                  ? "Adding…"
                                  : "Add"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
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
        </p>
      </div>
    </div>
  );
}
