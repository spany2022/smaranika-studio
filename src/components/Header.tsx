"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, studio } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { lockScroll } from "@/lib/scroll";
import Monogram from "@/components/ui/Monogram";
import { WhatsAppIcon, InstagramIcon } from "@/components/ui/Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > 500 && y > last + 2 ? true : y < last - 2 ? false : (h) => h);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-champagne focus:px-5 focus:py-3 focus:text-ink"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-700 ease-[var(--ease-soft)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${scrolled && !open ? "bg-forest-deep/80 backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-[var(--header-h)] max-w-[1600px] items-center justify-between gap-6 px-5 text-ivory md:px-10">
          <a href="#top" aria-label="Smaranika Studio — back to top" className="relative z-10 shrink-0">
            <Monogram className="h-9 text-ivory md:h-10" />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className={`eyebrow !text-[0.66rem] transition-colors duration-300 hover:text-champagne ${
                      active === n.href ? "text-champagne" : "text-ivory/80"
                    }`}
                    aria-current={active === n.href ? "true" : undefined}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href="#inquiry"
              className="hidden items-center gap-2 rounded-full border border-champagne/50 px-5 py-2.5 eyebrow !text-[0.62rem] text-champagne transition-colors duration-500 hover:bg-champagne hover:text-ink sm:inline-flex"
            >
              Check your date
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/25 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 z-40 flex flex-col bg-forest-deep text-ivory transition-[clip-path] duration-[900ms] ease-[var(--ease-film)] lg:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center px-7 pt-[var(--header-h)]">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li
                key={n.href}
                className="overflow-hidden"
                style={{
                  transition: `transform .9s var(--ease-soft) ${open ? 0.15 + i * 0.05 : 0}s, opacity .6s ${open ? 0.15 + i * 0.05 : 0}s`,
                  transform: open ? "none" : "translateY(30px)",
                  opacity: open ? 1 : 0,
                }}
              >
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-1.5 font-serif text-[2.6rem] leading-tight"
                >
                  <span className="eyebrow !text-[0.6rem] text-gold">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap items-center gap-3 border-t border-ivory/10 px-7 py-6">
          <a
            href="#inquiry"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-full bg-champagne px-5 py-3 eyebrow !text-[0.62rem] text-ink"
          >
            Check your date <ArrowUpRight className="size-3.5" />
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ivory/25 px-5 py-3 eyebrow !text-[0.62rem]"
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          {studio.socials.instagram && (
            <a href={studio.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="ml-auto">
              <InstagramIcon className="size-5" />
            </a>
          )}
        </div>
      </div>
    </>
  );
}
