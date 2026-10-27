"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Img";
import { approach } from "@/content/site";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function Approach() {
  const steps = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-step]", steps.current);
    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: (self) => self.isActive && setActive(i),
      }),
    );
    let line: gsap.core.Tween | undefined;
    if (!prefersReducedMotion()) {
      line = gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: steps.current, start: "top 55%", end: "bottom 55%", scrub: true },
        },
      );
    }
    return () => {
      triggers.forEach((t) => t.kill());
      line?.scrollTrigger?.kill();
      line?.kill();
    };
  }, []);

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative bg-ivory py-24 text-ink md:py-36">
      <div className="mx-auto max-w-[1500px] px-5 md:px-10">
        <div className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-gold">
              <span className="h-px w-10 bg-gold/70" />
              Our signature approach
            </p>
            <h2 id="approach-title" data-lines className="display text-[clamp(2.6rem,5.6vw,6rem)] text-forest">
              <span className="line-mask"><span>From The First Hello</span></span>
              <span className="line-mask"><span className="italic text-gold">To The Final Frame.</span></span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm self-end leading-[1.85] text-ink/70 lg:col-span-4">
            A calm, considered process, so that on the day itself you can stop thinking about anything
            other than each other.
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Sticky image stack (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+4vh)] aspect-[4/5] max-h-[78vh] w-full overflow-hidden">
              {approach.map((s, i) => (
                <div
                  key={s.no}
                  className="absolute inset-0 transition-[opacity,clip-path] duration-[1200ms] ease-[var(--ease-film)]"
                  style={{
                    opacity: i === active ? 1 : 0,
                    clipPath: i === active ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                  }}
                  aria-hidden={i !== active}
                >
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="45vw"
                    className="object-cover"
                    style={{ objectPosition: s.photo.focus }}
                  />
                </div>
              ))}
              <div className="absolute bottom-6 left-6 rounded-full bg-ivory/90 px-4 py-2 font-serif text-lg italic text-forest">
                {approach[active].no} — {approach[active].title}
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="relative lg:col-span-6 lg:pl-16">
            <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/10 lg:left-[calc(4rem-25px)]">
              <div ref={progress} className="h-full w-full origin-top bg-gold" />
            </div>
            <ol ref={steps} className="space-y-20 lg:space-y-0">
              {approach.map((s, i) => (
                <li key={s.no} data-step className="relative pl-10 lg:flex lg:min-h-[72vh] lg:flex-col lg:justify-center lg:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-2 size-[15px] rounded-full border transition-colors duration-500 lg:-left-[32px] lg:top-auto ${
                      i <= active ? "border-gold bg-gold" : "border-ink/25 bg-ivory"
                    }`}
                  />
                  <span className="display block text-[5.5rem] leading-none text-gold/30 md:text-[7rem]">{s.no}</span>
                  <h3 className="-mt-6 font-serif text-[clamp(2rem,3vw,3rem)] text-forest md:-mt-8">{s.title}</h3>
                  <p className="mt-4 max-w-md leading-[1.85] text-ink/70">{s.body}</p>
                  <div className="relative mt-8 aspect-[4/3] overflow-hidden lg:hidden">
                    <Image
                      src={s.photo.src}
                      alt={s.photo.alt}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      style={{ objectPosition: s.photo.focus }}
                    />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
