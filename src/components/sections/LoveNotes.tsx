"use client";

import { useEffect, useState } from "react";
import Image from "@/components/ui/Img";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { photos, studio, testimonials } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";

export default function LoveNotes() {
  const has = testimonials.length > 0;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = has ? testimonials[i] : null;
  const photo = t?.photo ?? photos.laughingCouple;

  // Slow, pausable rotation — never an endless marquee.
  useEffect(() => {
    if (!has || testimonials.length < 2 || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % testimonials.length), 9000);
    return () => window.clearTimeout(id);
  }, [i, has, paused]);

  return (
    <section
      id="love-notes"
      aria-labelledby="notes-title"
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-[1500px] items-center gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="relative lg:col-span-5">
          <div data-mask className="relative aspect-[4/5] overflow-hidden">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="animate-[modal-in_1s_var(--ease-soft)] object-cover"
              style={{ objectPosition: photo.focus }}
            />
          </div>
          <span aria-hidden="true" className="display absolute -right-4 -top-16 text-[12rem] leading-none text-gold/40 md:-right-10">
            &ldquo;
          </span>
        </div>

        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold/70" />
            Love notes
          </p>
          <h2 id="notes-title" data-lines className="display text-[clamp(2.4rem,4.6vw,4.8rem)] text-forest">
            <span className="line-mask"><span>The Best Stories Are</span></span>
            <span className="line-mask"><span className="italic text-gold">The Ones We Share.</span></span>
          </h2>

          {t ? (
            <div className="mt-12" aria-live="polite">
              <blockquote key={i} className="animate-[modal-in_.8s_var(--ease-soft)]">
                <p className="font-serif text-[clamp(1.5rem,2.3vw,2.2rem)] leading-snug text-ink/85">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <cite className="font-script text-4xl not-italic text-forest">{t.names}</cite>
                  {t.location && <span className="eyebrow !text-[0.6rem] text-taupe">{t.location}</span>}
                  {t.source &&
                    (t.sourceUrl ? (
                      <a href={t.sourceUrl} target="_blank" rel="noopener noreferrer" className="link-line eyebrow !text-[0.6rem] text-gold">
                        {t.source} <ArrowUpRight className="size-3" />
                      </a>
                    ) : (
                      <span className="eyebrow !text-[0.6rem] text-gold">{t.source}</span>
                    ))}
                </footer>
              </blockquote>
              {testimonials.length > 1 && (
                <div className="mt-10 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setI((n) => (n - 1 + testimonials.length) % testimonials.length)}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 hover:bg-forest hover:text-ivory"
                    aria-label="Previous love note"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setI((n) => (n + 1) % testimonials.length)}
                    className="inline-flex size-11 items-center justify-center rounded-full border border-ink/20 hover:bg-forest hover:text-ivory"
                    aria-label="Next love note"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <span className="eyebrow ml-2 !text-[0.6rem] tabular-nums text-taupe">
                    {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-12">
              <p data-reveal className="font-serif text-[clamp(1.5rem,2.3vw,2.2rem)] leading-snug text-ink/85">
                Our hope for every couple is simple: that years from now, you&rsquo;ll open your photographs,
                press play on your film, and feel it all again.
              </p>
              <p data-reveal className="mt-6 font-script text-4xl text-forest">The Smaranika team</p>
              <div data-reveal className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-ink/10 pt-8">
                <a
                  href={whatsappUrl("Hello Smaranika Studio! We'd love to share a few words about our experience with you.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line eyebrow !text-[0.62rem] text-forest"
                >
                  <WhatsAppIcon /> One of our couples? Share your story
                </a>
                {studio.socials.instagram && (
                  <a href={studio.socials.instagram} target="_blank" rel="noopener noreferrer" className="link-line eyebrow !text-[0.62rem] text-forest">
                    <InstagramIcon /> More moments on Instagram
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
