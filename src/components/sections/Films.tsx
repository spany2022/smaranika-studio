"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Img";
import { Play } from "lucide-react";
import { featuredFilm, films, filmFormats, type Film } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Modal from "@/components/ui/Modal";

export default function Films() {
  const frame = useRef<HTMLDivElement>(null);
  const [film, setFilm] = useState<Film | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        frame.current,
        { clipPath: "inset(18% 6% 18% 6%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top 95%", end: "top 25%", scrub: 0.6 },
        },
      );
      gsap.fromTo(
        frame.current!.querySelector("[data-film-img]"),
        { scale: 1.2 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: frame.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="films" aria-labelledby="films-title" className="relative overflow-hidden bg-ink py-24 text-ivory md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne/70" />
              More than a photograph
            </p>
            <h2 id="films-title" data-lines className="display text-[clamp(2.8rem,6vw,6.4rem)]">
              <span className="line-mask"><span>Relive the Day.</span></span>
              <span className="line-mask"><span className="italic text-champagne">Feel It All Again.</span></span>
            </h2>
          </div>
          <p data-reveal className="max-w-sm leading-[1.85] text-ivory/65">
            Sound, movement and the voices of the people you love. Our films are composed, scored and
            graded to feel like the day itself, so you can return to it whenever you need to.
          </p>
        </div>

        {/* Featured film */}
        <div ref={frame} className="relative">
          <button
            type="button"
            onClick={() => setFilm(featuredFilm)}
            data-cursor="Play film"
            aria-label={`Play film: ${featuredFilm.title}`}
            className="group relative block w-full overflow-hidden bg-forest-deep text-left"
          >
            <Perforations />
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-video lg:aspect-[2.35/1]">
              <div data-film-img className="absolute inset-0">
                <Image
                  src={featuredFilm.poster.src}
                  alt={featuredFilm.poster.alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-[1800ms] ease-[var(--ease-soft)] group-hover:scale-[1.04]"
                  style={{ objectPosition: featuredFilm.poster.focus ?? "50% 40%" }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex size-24 items-center justify-center rounded-full border border-champagne/60 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-soft)] group-hover:scale-110 group-hover:bg-champagne md:size-32">
                  <span className="absolute inset-0 animate-ping rounded-full border border-champagne/30 [animation-duration:2.8s]" />
                  <Play className="ml-1 size-6 fill-champagne text-champagne transition-colors group-hover:fill-ink group-hover:text-ink md:size-8" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:flex-row md:items-end md:justify-between md:p-10">
                <div>
                  <p className="eyebrow !text-[0.6rem] text-champagne">Featured · {featuredFilm.kind}</p>
                  <h3 className="mt-2 font-serif text-[clamp(1.8rem,3.4vw,3.4rem)] leading-none">{featuredFilm.title}</h3>
                </div>
                <span className="eyebrow !text-[0.6rem] text-ivory/60">Watch the film</span>
              </div>
            </div>
            <Perforations />
          </button>
        </div>

        {/* More films */}
        <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p data-reveal className="eyebrow mb-6 text-ivory/50">Our films</p>
            <ul data-reveal className="space-y-3">
              {filmFormats.map((f) => (
                <li key={f} className="flex items-center gap-3 border-b border-ivory/10 pb-3 font-serif text-xl text-ivory/85">
                  <span className="size-1 rounded-full bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:px-0 lg:col-span-9">
            {films.map((f, i) => (
              <button
                key={f.id}
                type="button"
                data-reveal
                onClick={() => setFilm(f)}
                data-cursor="Play film"
                aria-label={`Play film: ${f.title}`}
                className={`group w-[72vw] shrink-0 snap-start text-left sm:w-auto ${i === 1 ? "sm:mt-14" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={f.poster.src}
                    alt={f.poster.alt}
                    fill
                    sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 100vw"
                    className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-soft)] group-hover:scale-[1.06]"
                    style={{ objectPosition: f.poster.focus }}
                  />
                  <div className="absolute inset-0 bg-ink/25 transition-colors duration-700 group-hover:bg-ink/5" />
                  <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full border border-ivory/50 backdrop-blur-sm transition-colors duration-500 group-hover:border-champagne group-hover:bg-champagne">
                    <Play className="ml-0.5 size-4 fill-ivory text-ivory group-hover:fill-ink group-hover:text-ink" />
                  </span>
                </div>
                <p className="eyebrow mt-5 !text-[0.58rem] text-gold">{f.kind}</p>
                <h3 className="mt-2 font-serif text-2xl">{f.title}</h3>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Modal open={!!film} onClose={() => setFilm(null)} label={film ? `Film: ${film.title}` : "Film"} className="!bg-black">
        {film && <FilmPlayer film={film} />}
      </Modal>
    </section>
  );
}

function Perforations() {
  return (
    <div
      aria-hidden="true"
      className="h-5 w-full bg-ink md:h-7"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, transparent 0 14px, rgba(247,243,237,.13) 14px 26px, transparent 26px 40px)",
        backgroundSize: "40px 40%",
        backgroundPosition: "0 50%",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

function FilmPlayer({ film }: { film: Film }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 px-4 py-20 md:px-16">
      <div className="relative aspect-video w-full max-w-[min(1400px,calc((100dvh-12rem)*16/9))] overflow-hidden bg-ink">
        {film.youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={film.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <video
            className="absolute inset-0 h-full w-full object-contain"
            src={film.src}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={film.title}
          />
        )}
      </div>
      <div className="text-center">
        <p className="eyebrow !text-[0.6rem] text-champagne">{film.kind}</p>
        <p className="mt-2 font-serif text-2xl md:text-3xl">{film.title}</p>
      </div>
    </div>
  );
}
