"use client";

import { useEffect, useState } from "react";
import { CalendarHeart } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/Icons";

/** Thumb-reachable booking actions on phones, hidden near the form itself. */
export default function MobileBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // The form and the closing footer carry the same actions, so step aside there.
    const targets = [document.getElementById("inquiry"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => !!el,
    );
    const visible = new Set<Element>();
    let pastHero = false;
    const sync = () => setShow(pastHero && visible.size === 0);
    const onScroll = () => {
      pastHero = window.scrollY > window.innerHeight * 0.8;
      sync();
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      sync();
    });
    targets.forEach((t) => io.observe(t));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-40 grid grid-cols-[1fr_auto] gap-2 transition-[transform,opacity] duration-500 ease-[var(--ease-soft)] md:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[140%] opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      inert={!show}
    >
      <a
        href="#inquiry"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-champagne px-5 eyebrow !text-[0.62rem] text-ink shadow-[0_10px_30px_rgba(0,0,0,.25)]"
      >
        <CalendarHeart className="size-4" /> Check your date
      </a>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="inline-flex size-12 items-center justify-center rounded-full bg-forest text-ivory shadow-[0_10px_30px_rgba(0,0,0,.25)]"
      >
        <WhatsAppIcon className="size-5" />
      </a>
    </div>
  );
}
