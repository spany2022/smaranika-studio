"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { lockScroll } from "@/lib/scroll";

type Props = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
  /** Extra keyboard handling, e.g. arrow keys in a lightbox. */
  onKey?: (e: KeyboardEvent) => void;
};

/**
 * Full-screen modal built on the native <dialog> element, which gives us
 * focus trapping, Escape-to-close and an inert page for free.
 */
export default function Modal({ open, onClose, label, children, className = "", onKey }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      opener.current = document.activeElement;
      d.showModal();
      lockScroll(true);
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  useEffect(() => {
    if (!open || !onKey) return;
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-lenis-prevent
      onClose={() => {
        lockScroll(false);
        (opener.current as HTMLElement | null)?.focus?.({ preventScroll: true });
        onClose();
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      className={`m-0 h-[100dvh] max-h-none w-screen max-w-none bg-ink p-0 text-ivory backdrop:bg-ink/90 open:animate-[modal-in_.7s_var(--ease-soft)] ${className}`}
    >
      <button
        type="button"
        onClick={onClose}
        className="fixed right-4 top-4 z-20 inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 bg-ink/60 text-ivory backdrop-blur transition-colors hover:bg-ivory hover:text-ink md:right-8 md:top-6"
        aria-label="Close"
      >
        <X className="size-5" />
      </button>
      {open && children}
    </dialog>
  );
}
