"use client";

import { useEffect, useState, type ReactNode } from "react";

// Shows its children only inside [from, until) (ISO with offset, Lisbon time).
// Without `from` it is visible until the cutoff (server render shows it).
export default function EarlyBirdGate({
  from,
  until,
  children,
}: {
  from?: string;
  until: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(!from);
  useEffect(() => {
    const now = Date.now();
    const started = !from || now >= new Date(from).getTime();
    setOpen(started && now < new Date(until).getTime());
  }, [from, until]);
  if (!open) return null;
  return <>{children}</>;
}
