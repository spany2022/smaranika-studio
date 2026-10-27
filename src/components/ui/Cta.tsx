"use client";

import { useRef, type ReactNode, type MouseEvent as RMouseEvent } from "react";
import { gsap } from "@/lib/gsap";

type Variant = "gold" | "light" | "dark" | "forest";

const styles: Record<Variant, string> = {
  gold: "bg-champagne text-ink hover:bg-gold-soft",
  light: "border border-ivory/35 text-ivory hover:bg-ivory hover:text-ink hover:border-ivory",
  dark: "border border-ink/25 text-ink hover:bg-forest hover:text-ivory hover:border-forest",
  forest: "bg-forest text-ivory hover:bg-forest-mid",
};

type Props = {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  external?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  cursor?: string;
};

/** Pill call-to-action with a subtle magnetic pull on fine pointers. */
export default function Cta({
  href,
  onClick,
  variant = "gold",
  children,
  icon,
  className = "",
  external,
  type = "button",
  disabled,
  cursor,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: RMouseEvent) => {
    const el = ref.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const r = el.getBoundingClientRect();
    gsap.to(el, {
      x: ((e.clientX - r.left) / r.width - 0.5) * 10,
      y: ((e.clientY - r.top) / r.height - 0.5) * 8,
      duration: 0.5,
      ease: "power3.out",
    });
  };
  const onLeave = () => ref.current && gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });

  const cls = `group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 eyebrow !text-[0.68rem] transition-colors duration-500 disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-500 group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cls}
        data-cursor={cursor}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cls}
      disabled={disabled}
      data-cursor={cursor}
    >
      {inner}
    </button>
  );
}
