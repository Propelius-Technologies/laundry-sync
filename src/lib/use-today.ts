"use client";

import { useMemo, useSyncExternalStore } from "react";

/*
 * Today changes at most once a day and nothing on the page needs to react to
 * midnight, so there is nothing to subscribe to.
 */
const subscribe = () => () => {};

/** A primitive snapshot, so every call during one day compares equal. */
function getDayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
}

const getServerDayKey = () => null;

/**
 * The visitor's local date at midnight, or null during server rendering and
 * hydration.
 *
 * The null lets date-driven mockups render date-neutral HTML on the server,
 * which cannot know the visitor's day or timezone. React then re-renders with
 * the real date straight after hydration, so no mismatch is possible.
 */
export function useToday(): Date | null {
  const key = useSyncExternalStore(subscribe, getDayKey, getServerDayKey);

  return useMemo(() => {
    if (!key) return null;
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month, day);
  }, [key]);
}
