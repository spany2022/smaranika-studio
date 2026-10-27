import Image from "@/components/ui/Img";
import { ArrowRight } from "lucide-react";
import { photos, stats } from "@/content/site";
import Monogram from "@/components/ui/Monogram";

export default function Philosophy() {
  return (
    <section id="story" aria-labelledby="story-title" className="relative overflow-hidden bg-ivory py-24 text-ink md:py-36">
      {/* Oversized watermark monogram */}
      <Monogram className="pointer-events-none absolute -right-[8vw] top-10 h-[34vw] text-forest/[0.035]" />

      <div className="mx-auto grid max-w-[1500px] gap-14 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        {/* Images */}
        <div className="relative lg:col-span-6 lg:pr-10">
          <div data-mask className="relative aspect-[4/5] w-full overflow-hidden md:w-[82%]">
            <div data-parallax="0.12" className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src={photos.brideWindow.src}
                alt={photos.brideWindow.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
                style={{ objectPosition: photos.brideWindow.focus }}
              />
            </div>
          </div>
          <figure
            data-reveal
            className="relative -mt-24 ml-auto w-[58%] border-[10px] border-ivory bg-ivory md:-mt-40 md:w-[48%]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photos.photographerBride.src}
                alt={photos.photographerBride.alt}
                fill
                sizes="(min-width: 1024px) 22vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="eyebrow mt-3 !text-[0.58rem] text-taupe">Behind the lens</figcaption>
          </figure>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center lg:col-span-6 lg:pl-6">
          <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-gold">
            <span className="h-px w-10 bg-gold/70" />
            Behind every frame
          </p>
          <h2 id="story-title" data-lines className="display text-[clamp(2.6rem,5.4vw,5.6rem)] text-forest">
            <span className="line-mask"><span>We Don&rsquo;t Just</span></span>
            <span className="line-mask"><span>Capture Weddings.</span></span>
            <span className="line-mask"><span className="italic text-gold">We Preserve</span></span>
            <span className="line-mask"><span className="italic text-gold">Feelings.</span></span>
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
            <p data-reveal className="text-[0.98rem] leading-[1.85] text-ink/75">
              From the quiet anticipation before the ceremony to the tears, laughter, and celebration that
              follow, we document your wedding as it unfolds. Our approach blends honest moments with
              cinematic artistry, creating photographs and films that bring you back to how it all felt.
            </p>
            <p data-reveal className="text-[0.98rem] leading-[1.85] text-ink/75">
              <em className="font-serif text-xl not-italic text-forest">Smaranika</em> comes from{" "}
              <em>smarana</em>, remembrance. A smaranika is a keepsake, something made so a moment is never
              forgotten. That promise sits behind every photograph and every film we make.
            </p>
          </div>

          {stats.length > 0 && (
            <dl data-reveal className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="eyebrow !text-[0.58rem] text-taupe">{s.label}</dt>
                  <dd className="display mt-2 text-4xl text-forest">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <div data-reveal className="mt-12 flex flex-wrap items-end justify-between gap-6">
            <p className="font-script text-[2.6rem] leading-none text-gold md:text-5xl">with love, Smaranika</p>
            <a href="#approach" className="link-line eyebrow !text-[0.66rem] text-forest">
              Our approach <ArrowRight className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
