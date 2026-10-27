"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Declarative scroll motion for server-rendered sections:
 *  - [data-reveal]            fade + rise when entering the viewport
 *  - [data-mask]              soft image unmasking with a gentle zoom-out
 *  - [data-lines]             headline lines slide up from their masks
 *  - [data-parallax="0.15"]   restrained parallax (fraction of own height)
 */
export default function Reveals() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Note: no `once` here or below. Self-killing triggers break GSAP's
      // refresh loop when the page loads already scrolled past them.
      const reveal = (els: Element[]) =>
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.09,
          overwrite: true,
        });
      ScrollTrigger.batch("[data-reveal]", { start: "top 88%", onEnter: reveal, onLeave: reveal });

      gsap.utils.toArray<HTMLElement>("[data-mask]").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
        tl.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.out" });
        if (img) tl.to(img, { scale: 1, duration: 2.2, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-lines]:not([data-lines='hero']):not([data-lines='static'])").forEach((el) => {
        gsap.to(el.querySelectorAll(".line-mask > span"), {
          yPercent: 0,
          y: 0,
          duration: 1.3,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none none" },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "0.12");
        gsap.fromTo(
          el,
          { yPercent: -amount * 50 },
          {
            yPercent: amount * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    });

    // Fonts, filters and late content change the page height after first
    // paint; keep trigger positions in sync with the real layout.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    let lastHeight = document.body.scrollHeight;
    let timer = 0;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 40) return;
      lastHeight = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(refresh, 250);
    });
    ro.observe(document.body);

    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(timer);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return null;
}
