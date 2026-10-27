"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

export type Prefill = { service?: string; type?: string };

export const PREFILL_EVENT = "smaranika:prefill";

/** Anchor to the inquiry form that also pre-selects the relevant service. */
export default function EnquireLink({
  prefill,
  children,
  className = "",
  ...rest
}: { prefill: Prefill; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#inquiry"
      {...rest}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: prefill }))}
    >
      {children}
    </a>
  );
}
