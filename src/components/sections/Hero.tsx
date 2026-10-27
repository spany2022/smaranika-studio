"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Img";
import { ArrowRight } from "lucide-react";
import { heroShots, type HeroShot } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useClientValue } from "@/lib/useClientValue";
import Monogram from "@/components/ui/Monogram";
import Cta from "@/components/ui/Cta";

const lines = [
  { text: "Some Moments", className: "" },
  { text: "Become Memories.", className: "" },
  { text: "Some Become", className: "md:pl-[12vw]" },
  { text: "Forever.", className: "md:pl-[12vw] italic text-champagne" },
];

const posterOf = (s: HeroShot) => (s.kind === "video" ? s.poster : s.photo);
const stillShots = heroShots.filter((s) => s.kind === "image");

const canPlayBackgroundFilm = () => {
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !prefersReducedMotion() && !conn?.saveData && window.matchMedia("(min-width: 768px)").matches;
};

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const reduced = useClientValue(prefersReducedMotion, false);
  // Only larger screens without Save-Data receive the background film.
  const allowVideo = useClientValue(canPlayBackgroundFilm, false);
  const shots = allowVideo ? heroShots : stillShots;
  const playing = visible && !reduced;

  // Advance through the opening sequence while the hero is visible.
  useEffect(() => {
    if (!playing || shots.length < 2) return;
    const shot = shots[index];
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % shots.length), shot.seconds * 1000);
    return () => window.clearTimeout(id);
  }, [index, playing, shots]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shots[index]?.kind === "video" && playing) {
      v.currentTime = 0;
      v.play().catch(() => setIndex((i) => (i + 1) % shots.length));
    } else {
      v.pause();
    }
  }, [index, playing, shots]);

  // Pause when off-screen or the tab is hidden.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = root.current!;
    let inView = true;
    const sync = () => setVisible(inView && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  // Opening titles, camera push and scroll parallax.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    // The full opening titles play once per visit; later loads get a quick fade.
    const seen = sessionStorage.getItem("smaranika:intro") === "1";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        onComplete: () => sessionStorage.setItem("smaranika:intro", "1"),
      });
      const c = curtain.current!;
      if (!seen) {
        tl.fromTo(c.querySelector(".curtain-mark"), { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 1 })
          .to(c.querySelector(".curtain-mark"), { opacity: 0, duration: 0.5, ease: "power2.in" }, "+=0.25")
          .to(c.querySelector(".curtain-top"), { yPercent: -100, duration: 1.4, ease: "expo.inOut" }, "<0.1")
          .to(c.querySelector(".curtain-bottom"), { yPercent: 100, duration: 1.4, ease: "expo.inOut" }, "<");
      } else {
        tl.to(c, { opacity: 0, duration: 0.6, ease: "power2.out" });
      }
      tl.set(c, { display: "none" })
        .fromTo(bg.current, { scale: 1.18 }, { scale: 1, duration: 2.6, ease: "power3.out" }, seen ? 0 : 1.4)
        .to(".hero-line > span", { yPercent: 0, y: 0, duration: 1.5, stagger: 0.11 }, seen ? 0.15 : 1.75)
        .fromTo(".hero-fade", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.1 }, "<0.45");

      gsap.to(bg.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(content.current, {
        y: -90,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "35% top", end: "bottom top", scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const onPointer = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = root.current!.getBoundingClientRect();
    root.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    root.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      ref={root}
      onPointerMove={onPointer}
      aria-label="Introduction"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink pt-[calc(var(--header-h)+3rem)] text-ivory"
    >
      {/* Film layers */}
      <div ref={bg} className="absolute inset-0 -z-10 will-change-transform">
        {shots.map((shot, i) => {
          const active = i === index;
          return (
            <div
              key={i}
              className="absolute inset-0 overflow-hidden transition-opacity duration-[1800ms] ease-in-out"
              style={{ opacity: active ? 1 : 0 }}
              aria-hidden={!active}
            >
              <Image
                  src={posterOf(shot).src}
                  alt={i === 0 ? posterOf(shot).alt : ""}
                  fill
                  sizes="100vw"
                  quality={75}
                  preload={i === 0}
                  loading={i === 0 ? "eager" : "lazy"}
                  className="object-cover"
                  style={{
                    objectPosition: posterOf(shot).focus,
                    animation: active && playing ? `push-in ${shot.seconds + 2.5}s linear forwards` : undefined,
                  }}
                />
              {shot.kind === "video" && allowVideo && (
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700"
                  src={shot.src}
                  muted
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  onPlaying={(e) => (e.currentTarget.style.opacity = "1")}
                  onEnded={() => setIndex((n) => (n + 1) % shots.length)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Grade, vignette & spotlight */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,5,.55)_0%,rgba(6,14,5,.1)_30%,rgba(6,14,5,.35)_60%,rgba(6,14,5,.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_40%,rgba(6,14,5,.7)_100%)]" />
        <div className="absolute inset-0 bg-[#2b1d08]/20 mix-blend-multiply" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(520px_circle_at_var(--mx,50%)_var(--my,40%),rgba(230,210,181,.14),transparent_65%)] [@media(hover:hover)]:block" />
      </div>

      {/* Copy */}
      <div ref={content} className="relative mx-auto w-full max-w-[1600px] px-5 pb-24 md:px-10 md:pb-[max(7rem,14vh)]">
        <p className="hero-fade eyebrow mb-6 flex items-center gap-4 text-champagne md:mb-8">
          <span className="h-px w-10 bg-champagne/70" />
          Wedding Photography &amp; Cinematic Films
        </p>
        <h1
          data-lines="hero"
          className="display max-w-[16ch] text-[clamp(2.9rem,min(7.4vw,11.5vh),8rem)] md:max-w-none"
        >
          {lines.map((l) => (
            <span key={l.text} className={`line-mask hero-line ${l.className}`}>
              <span>{l.text}</span>
            </span>
          ))}
        </h1>
        <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p className="hero-fade max-w-md text-[0.95rem] leading-relaxed text-ivory/80 md:text-base">
            We capture the emotions, the unscripted moments, and the beautiful details that make your
            story uniquely yours.
          </p>
          <div className="hero-fade flex flex-col gap-3 sm:flex-row">
            <Cta href="#stories" variant="gold" icon={<ArrowRight className="size-3.5" />}>
              Discover our stories
            </Cta>
            <Cta href="#inquiry" variant="light">
              Check your wedding date
            </Cta>
          </div>
        </div>
      </div>

      {/* Scene counter */}
      <div className="hero-fade absolute right-5 top-[calc(var(--header-h)+1.5rem)] hidden items-center gap-3 md:right-10 md:flex" aria-hidden="true">
        <span className="eyebrow !text-[0.6rem] text-ivory/70">Scene</span>
        <div className="flex gap-1.5">
          {shots.map((s, i) => (
            <span key={i} className="relative h-px w-8 overflow-hidden bg-ivory/25">
              {i === index && playing && (
                <span
                  className="absolute inset-0 origin-left bg-champagne"
                  style={{ animation: `shot-progress ${s.seconds}s linear forwards` }}
                />
              )}
              {i < index && <span className="absolute inset-0 bg-champagne/60" />}
            </span>
          ))}
        </div>
        <span className="eyebrow !text-[0.6rem] tabular-nums text-ivory/70">
          {String(index + 1).padStart(2, "0")} / {String(shots.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll cue */}
      <a
        href="#story"
        className="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-ivory/70 md:flex"
        aria-label="Scroll to our story"
      >
        <span className="eyebrow !text-[0.58rem]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/20">
          <span className="absolute inset-0 bg-champagne" style={{ animation: "scroll-cue 2.4s var(--ease-film) infinite" }} />
        </span>
      </a>

      {/* Opening curtain (motion only; CSS fallback hides it if scripts never run) */}
      <div ref={curtain} aria-hidden="true" className="hero-curtain pointer-events-none fixed inset-0 z-[80] hidden">
        <div className="curtain-top absolute inset-x-0 top-0 h-1/2 bg-forest-deep" />
        <div className="curtain-bottom absolute inset-x-0 bottom-0 h-1/2 bg-forest-deep" />
        <div className="curtain-mark absolute inset-0 flex items-center justify-center opacity-0">
          <Monogram className="h-24 text-ivory md:h-32" />
        </div>
      </div>
    </section>
  );
}
