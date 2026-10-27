"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { lockScroll, scrollToTarget, setLenis } from "@/lib/scroll";

/**
 * Lenis smooth scrolling on pointer devices, synced to GSAP's ticker.
 * Touch devices and reduced-motion visitors keep native scrolling.
 * Also routes in-page anchor links through a single smooth scroll.
 */
export default function SmoothScroll() {
  useEffect(() => {
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    if (!prefersReducedMotion()) {
      lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95 });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time: number) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const target = hash === "#" || hash === "#top" ? document.body : document.querySelector<HTMLElement>(hash);
      if (!target) return;
      e.preventDefault();
      // An anchor inside a menu or dialog navigates away from it: release
      // the scroll lock now so the scroll below isn't swallowed.
      const dialog = a.closest("dialog");
      if (dialog?.open) dialog.close();
      lockScroll(false);
      scrollToTarget(target, 0);
      history.replaceState(null, "", hash === "#top" ? location.pathname : hash);
      // Move focus for keyboard and screen-reader users without a second jump.
      if (target !== document.body) {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
