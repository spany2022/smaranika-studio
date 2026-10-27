"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * A restrained companion cursor for fine pointers. The native cursor stays
 * visible; this ring only adds context labels such as "View story".
 * Elements opt in with data-cursor="Label".
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [state, setState] = useState<"idle" | "link" | "label" | "hidden">("hidden");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches || !ring.current) return;

    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      xTo(e.clientX);
      yTo(e.clientY);
      const t = e.target as HTMLElement;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? "");
        setState("label");
      } else if (t.closest("a, button, [role='button'], input, select, textarea, label")) {
        setState("link");
      } else {
        setState("idle");
      }
    };
    const onLeave = () => setState("hidden");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const size = state === "label" ? 96 : state === "link" ? 44 : 22;

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      style={{ opacity: state === "hidden" ? 0 : 1, transition: "opacity .3s" }}
    >
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-center mix-blend-difference"
        style={{
          width: size,
          height: size,
          borderColor: state === "label" ? "transparent" : "rgba(247,243,237,.7)",
          background: state === "label" ? "rgba(230,210,181,.95)" : "transparent",
          transition: "width .45s cubic-bezier(.22,1,.36,1), height .45s cubic-bezier(.22,1,.36,1), background .3s, border-color .3s",
          mixBlendMode: state === "label" ? "normal" : "difference",
        }}
      >
        <span
          className="eyebrow !text-[0.58rem] !tracking-[0.22em] text-ink"
          style={{ opacity: state === "label" ? 1 : 0, transition: "opacity .25s" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
