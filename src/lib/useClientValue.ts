"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Reads a browser-only value without a hydration mismatch: the server (and
 * the hydration pass) see `serverValue`, the client then re-renders with
 * `get()`. `get` must return a primitive or otherwise stable value.
 */
export function useClientValue<T>(get: () => T, serverValue: T): T {
  return useSyncExternalStore(noopSubscribe, get, () => serverValue);
}
