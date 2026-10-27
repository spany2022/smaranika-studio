"use client";

import { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Img";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { stories, storyCategories, type Story } from "@/content/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Modal from "@/components/ui/Modal";
import Cta from "@/components/ui/Cta";

export default function Stories() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [openStory, setOpenStory] = useState<Story | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      setPinned(true);
      const t = track.current!;
      const distance = () => t.scrollWidth - window.innerWidth;
      const tween = gsap.to(t, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => bar.current && gsap.set(bar.current, { scaleX: self.progress }),
        },
      });
      t.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
        const img = panel.querySelector("[data-drift]");
        if (img)
          gsap.fromTo(
            img,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
      });
      return () => setPinned(false);
    });
    mm.add("(max-width: 1023px)", () => {
      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) =>
        gsap.from(panel, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 88%", toggleActions: "play none none none" },
        }),
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="stories" ref={section} aria-labelledby="stories-title" className="relative bg-forest-deep text-ivory">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-16 pt-24 md:px-10 md:pt-36 lg:grid-cols-12 lg:pb-20">
        <div className="lg:col-span-7">
          <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne/70" />
            Featured love stories
          </p>
          <h2 id="stories-title" data-lines className="display text-[clamp(2.8rem,6vw,6.4rem)]">
            <span className="line-mask"><span>Every Love Story</span></span>
            <span className="line-mask"><span className="italic text-champagne">Deserves Its Own Film.</span></span>
          </h2>
        </div>
        <div className="flex flex-col justify-end gap-8 lg:col-span-5">
          <p data-reveal className="max-w-md leading-[1.85] text-ivory/70">
            No two celebrations are alike, so no two stories are told the same way. Step into a few of the
            days, places and people that have shaped our work.
          </p>
          <ul data-reveal className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Story categories">
            {storyCategories.map((c) => (
              <li key={c} className="eyebrow flex items-center gap-2 !text-[0.6rem] text-ivory/55">
                <span className="size-1 rounded-full bg-gold" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={pin} className="relative lg:h-[100svh] lg:overflow-hidden">
        <div
          ref={track}
          className={`flex flex-col gap-20 px-5 pb-24 md:px-10 lg:h-full lg:flex-row lg:items-center lg:gap-[6vw] lg:pb-0 lg:pl-10 lg:pr-[10vw] ${
            pinned ? "lg:w-max" : "lg:snap-x lg:snap-mandatory lg:overflow-x-auto no-scrollbar"
          }`}
        >
          {stories.map((s, i) => {
            const portrait = s.cover.height > s.cover.width;
            return (
              <article
                key={s.slug}
                data-panel
                className={`group relative shrink-0 lg:snap-start ${portrait ? "lg:w-[34vw]" : "lg:w-[52vw]"} ${
                  i % 2 ? "lg:self-end lg:pb-[6vh]" : "lg:self-start lg:pt-[8vh]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenStory(s)}
                  data-cursor="View story"
                  aria-label={`Explore story: ${s.title}`}
                  className="relative block w-full overflow-hidden text-left"
                >
                  <div className={`relative w-full overflow-hidden ${portrait ? "aspect-[4/5]" : "aspect-[4/5] md:aspect-[3/2]"} lg:aspect-auto lg:h-[58vh]`}>
                    <div data-drift className="absolute -inset-x-[8%] inset-y-0">
                      <Image
                        src={s.cover.src}
                        alt={s.cover.alt}
                        fill
                        sizes={portrait ? "(min-width: 1024px) 36vw, 100vw" : "(min-width: 1024px) 56vw, 100vw"}
                        className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                        style={{ objectPosition: s.cover.focus }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 font-serif text-lg italic text-ivory/90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </button>
                <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
                  <div>
                    <p className="eyebrow !text-[0.6rem] text-gold">
                      {s.type}
                      {s.location && <span className="text-ivory/50"> · {s.location}</span>}
                    </p>
                    <h3 className="mt-3 font-serif text-[clamp(1.9rem,2.6vw,2.8rem)] leading-[1.05]">{s.title}</h3>
                    {s.couple && <p className="mt-1 font-script text-2xl text-champagne">{s.couple}</p>}
                    <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-ivory/65">{s.description}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenStory(s)}
                    className="link-line eyebrow justify-self-start !text-[0.62rem] text-champagne"
                  >
                    Explore story <ArrowUpRight className="size-3.5" />
                  </button>
                </div>
              </article>
            );
          })}

          {/* Closing panel */}
          <div data-panel className="flex shrink-0 flex-col justify-center gap-8 border-t border-ivory/10 pt-14 lg:w-[30vw] lg:border-l lg:border-t-0 lg:pl-[4vw] lg:pt-0">
            <p className="font-script text-5xl text-gold">Yours, next.</p>
            <p className="max-w-xs font-serif text-3xl leading-tight">
              Every story here began with a single message.
            </p>
            <Cta href="#inquiry" variant="gold" icon={<ArrowRight className="size-3.5" />} className="self-start">
              Let&rsquo;s plan your story
            </Cta>
          </div>
        </div>

        {pinned && (
          <div className="absolute inset-x-10 bottom-8 flex items-center gap-5" aria-hidden="true">
            <span className="eyebrow !text-[0.58rem] text-ivory/50">Scroll to explore</span>
            <div className="h-px flex-1 bg-ivory/15">
              <div ref={bar} className="h-full origin-left scale-x-0 bg-champagne" />
            </div>
          </div>
        )}
      </div>

      <Modal open={!!openStory} onClose={() => setOpenStory(null)} label={openStory?.title ?? "Story"} className="overflow-y-auto">
        {openStory && <StoryView story={openStory} onClose={() => setOpenStory(null)} />}
      </Modal>
    </section>
  );
}

function StoryView({ story, onClose }: { story: Story; onClose: () => void }) {
  const [hero, ...rest] = story.gallery;
  return (
    <article className="min-h-full bg-ink">
      <div className="relative h-[78svh] min-h-[480px] overflow-hidden">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          sizes="100vw"
          className="animate-[push-in_14s_linear_forwards] object-cover"
          style={{ objectPosition: hero.focus }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/30" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1400px] px-5 pb-12 md:px-10">
          <p className="eyebrow text-champagne">
            {story.type}
            {story.location && ` · ${story.location}`}
          </p>
          <h2 className="display mt-4 max-w-4xl text-[clamp(2.6rem,6vw,6rem)]">{story.title}</h2>
          {story.couple && <p className="mt-2 font-script text-4xl text-champagne">{story.couple}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <p className="max-w-2xl font-serif text-[clamp(1.5rem,2.4vw,2.2rem)] leading-snug text-ivory/85">
          {story.description}
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-6">
          {rest.map((p, i) => {
            const portrait = p.height > p.width;
            return (
              <figure
                key={p.src}
                className={`relative overflow-hidden ${portrait ? "aspect-[4/5]" : "aspect-[3/2]"} ${
                  i === 0 && !portrait ? "md:col-span-2 md:aspect-[21/9]" : ""
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: p.focus }}
                />
              </figure>
            );
          })}
        </div>
        <div className="mt-16 flex flex-col items-start gap-6 border-t border-ivory/10 pt-12 md:flex-row md:items-center md:justify-between">
          <p className="font-serif text-3xl">Imagining a day like this?</p>
          <Cta href="#inquiry" onClick={onClose} variant="gold" icon={<ArrowRight className="size-3.5" />}>
            Let&rsquo;s plan your story
          </Cta>
        </div>
      </div>
    </article>
  );
}
