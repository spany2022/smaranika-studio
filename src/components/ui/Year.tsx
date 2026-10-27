"use client";

import { useClientValue } from "@/lib/useClientValue";

/** Current year, resolved on the client so the page can stay fully static. */
export default function Year() {
  const year = useClientValue(() => new Date().getFullYear(), null);
  return <>{year ?? ""}</>;
}
