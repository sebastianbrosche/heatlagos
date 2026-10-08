"use client";

import { useEffect, useState, type ReactNode } from "react";

// Hides its children after the given cutoff (ISO with offset, Lisbon time).
export default function EarlyBirdGate({
  until,
  children,
}: {
  until: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (Date.now() >= new Date(until).getTime()) setOpen(false);
  }, [until]);
  if (!open) return null;
  return <>{children}</>;
}
