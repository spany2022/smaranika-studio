"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "@/components/ui/Img";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { journal, journalFilters, type JournalFilter } from "@/content/site";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Modal from "@/components/ui/Modal";

export default function Journal() {
  const [filter, setFilter] = useState<JournalFilter>("All");
  const [open, setOpen] = useState<number | null>(null);
  const grid = useRef<HTMLUListElement>(null);

  const items = useMemo(() => (filter === "All" ? journal : journal.filter((j) => j.tag === filter)), [filter]);

  // Gentle entrance whenever the visible set changes.
  useEffect(() => {
    if (prefersReducedMotion() || !grid.current) return;
    const els = grid.current.querySelectorAll("li");
    const tween = gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.05,
        scrollTrigger: { trigger: grid.current, start: "top 85%", toggleActions: "play none none none" },
      },
    );
    ScrollTrigger.refresh();
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [filter]);

  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + items.length) % items.length)),
    [items.length],
  );
  const onKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    },
    [step],
  );

  const touchX = useRef(0);
  const current = open !== null ? items[open] : null;

  return (
    <section id="journal" aria-labelledby="journal-title" className="relative bg-ivory py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-12 flex flex-col gap-10 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-gold">
              <span className="h-px w-10 bg-gold/70" />
              The wedding journal
            </p>
            <h2 id="journal-title" data-lines className="display text-[clamp(2.6rem,5.6vw,6rem)] text-forest">
              <span className="line-mask"><span>Frames We Keep</span></span>
              <span className="line-mask"><span className="italic text-gold">Coming Back To.</span></span>
            </h2>
          </div>
          <div data-reveal role="group" aria-label="Filter the journal" className="flex flex-wrap gap-2">
            {journalFilters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                aria-pressed={filter === f}
                className={`rounded-full border px-4 py-2 eyebrow !text-[0.6rem] transition-colors duration-300 ${
                  filter === f ? "border-forest bg-forest text-ivory" : "border-ink/15 text-ink/70 hover:border-forest hover:text-forest"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul ref={grid} className="columns-2 gap-3 md:columns-3 md:gap-5 xl:columns-4" aria-live="polite">
          {items.map((item, i) => (
            <li key={item.photo.src} className="mb-3 break-inside-avoid md:mb-5">
              <button
                type="button"
                onClick={() => setOpen(i)}
                data-cursor="View"
                aria-label={`Open image: ${item.photo.alt}`}
                className="group relative block w-full overflow-hidden"
              >
                <Image
                  src={item.photo.src}
                  alt={item.photo.alt}
                  width={item.photo.width}
                  height={item.photo.height}
                  sizes="(min-width: 1280px) 24vw, (min-width: 768px) 32vw, 50vw"
                  className="h-auto w-full transition-transform duration-[1400ms] ease-[var(--ease-soft)] group-hover:scale-[1.045]"
                />
                <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/55 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="eyebrow !text-[0.55rem] text-ivory">{item.tag}</span>
                  <Maximize2 className="size-4 text-ivory" aria-hidden="true" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Modal open={open !== null} onClose={() => setOpen(null)} label="Image viewer" onKey={onKey}>
        {current && (
          <div
            className="flex h-full w-full flex-col"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <div className="relative flex-1">
              <Image
                key={current.photo.src}
                src={current.photo.src}
                alt={current.photo.alt}
                fill
                sizes="100vw"
                quality={85}
                className="animate-[modal-in_.6s_var(--ease-soft)] object-contain p-4 pt-20 md:p-20"
              />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 pb-6 md:px-10">
              <button
                type="button"
                onClick={() => step(-1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 hover:bg-ivory hover:text-ink"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-5" />
              </button>
              <p className="flex-1 text-center text-sm text-ivory/70">
                <span className="eyebrow mr-3 !text-[0.58rem] text-champagne tabular-nums">
                  {String((open ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <span className="hidden md:inline">{current.photo.alt}</span>
              </p>
              <button
                type="button"
                onClick={() => step(1)}
                className="inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 hover:bg-ivory hover:text-ink"
                aria-label="Next image"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
