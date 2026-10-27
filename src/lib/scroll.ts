"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Scrolls to an in-page target (element or "#id"), with or without Lenis. */
export function scrollToTarget(target: string | HTMLElement, offset = 0) {
  const el =
    typeof target === "string"
      ? document.querySelector<HTMLElement>(target === "#" || target === "#top" ? "body" : target)
      : target;
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.6 });
    return;
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

/** Lock / unlock page scroll for dialogs. */
export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}
