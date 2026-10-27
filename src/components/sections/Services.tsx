import Image from "@/components/ui/Img";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import EnquireLink from "@/components/ui/EnquireLink";
import Cta from "@/components/ui/Cta";

const aspects = ["aspect-[4/3] md:aspect-[4/5]", "aspect-[4/3] md:aspect-[3/4]", "aspect-[4/3] md:aspect-[4/5]", "aspect-[4/3] md:aspect-[2/3]"];
// Staggered column offsets give the grid an editorial rhythm instead of a card row.
const offsets = ["", "md:mt-24 xl:mt-28", "xl:mt-10", "md:mt-24 xl:mt-40"];

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-forest text-ivory">
      <div className="mx-auto max-w-[1500px] px-5 py-24 md:px-10 md:py-36">
        <div className="mb-16 grid gap-8 md:mb-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-champagne">
              <span className="h-px w-10 bg-champagne/70" />
              Services &amp; celebrations
            </p>
            <h2 id="services-title" data-lines className="display text-[clamp(2.6rem,5.6vw,6rem)]">
              <span className="line-mask"><span>Crafted for Every</span></span>
              <span className="line-mask"><span className="italic text-champagne">Chapter of Your Story.</span></span>
            </h2>
          </div>
          <div className="flex flex-col items-start justify-end gap-8 lg:col-span-5">
            <p data-reveal className="max-w-md leading-[1.85] text-ivory/70">
              From the first portrait session to the last dance, each collection is shaped around your
              celebration. Tell us what you are planning and we&rsquo;ll suggest what suits you best.
            </p>
            <div data-reveal>
              <Cta href="#inquiry" variant="gold" icon={<ArrowRight className="size-3.5" />}>
                Let&rsquo;s plan your story
              </Cta>
            </div>
          </div>
        </div>

        <ol className="grid gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-24">
          {services.map((s, i) => (
            <li key={s.title} className={`group ${offsets[i % offsets.length]}`}>
              <EnquireLink prefill={s.prefill} className="block" tabIndex={-1} aria-hidden="true">
                <div data-mask className={`relative overflow-hidden ${aspects[i % aspects.length]}`}>
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 1280px) 24vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-soft)] group-hover:scale-[1.05]"
                    style={{ objectPosition: s.photo.focus }}
                  />
                </div>
              </EnquireLink>
              <div data-reveal className="mt-7 grid grid-cols-[auto_1fr] gap-x-5">
                <span className="font-serif text-xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.8rem,2.2vw,2.1rem)] leading-tight">{s.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ivory/65">{s.body}</p>
                  <EnquireLink prefill={s.prefill} className="link-line eyebrow mt-6 !text-[0.62rem] text-champagne">
                    Enquire <span className="sr-only">about {s.title}</span> <ArrowUpRight className="size-3.5" />
                  </EnquireLink>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
