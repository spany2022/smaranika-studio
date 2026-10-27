import Image from "@/components/ui/Img";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, photos, studio } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import Monogram from "@/components/ui/Monogram";
import Cta from "@/components/ui/Cta";
import Year from "@/components/ui/Year";
import { FacebookIcon, InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/ui/Icons";

export default function Finale() {
  const socials = [
    { href: studio.socials.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: studio.socials.youtube, label: "YouTube", Icon: YouTubeIcon },
    { href: studio.socials.facebook, label: "Facebook", Icon: FacebookIcon },
  ].filter((s) => s.href);

  return (
    <footer className="relative bg-ink text-ivory">
      {/* Final call */}
      <section aria-labelledby="finale-title" className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
        <div data-parallax="0.18" className="absolute -inset-y-[10%] inset-x-0 -z-10">
          <Image
            src={photos.silhouette.src}
            alt={photos.silhouette.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,14,5,.85)_0%,rgba(6,14,5,.35)_45%,rgba(6,14,5,.95)_100%)]" />
        <div className="mx-auto w-full max-w-[1500px] px-5 py-32 text-center md:px-10">
          <p data-reveal className="font-script text-4xl text-champagne md:text-5xl">once upon your day</p>
          <h2 id="finale-title" data-lines className="display mx-auto mt-6 text-[clamp(2.8rem,7vw,7.6rem)]">
            <span className="line-mask"><span>Your Day Happens Once.</span></span>
            <span className="line-mask"><span className="italic text-champagne">Your Story Lives Forever.</span></span>
          </h2>
          <p data-reveal className="mx-auto mt-8 max-w-md leading-[1.85] text-ivory/75">
            Let&rsquo;s create something you&rsquo;ll return to for the rest of your life.
          </p>
          <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta href="#inquiry" variant="gold" icon={<ArrowUpRight className="size-3.5" />}>
              Check your date
            </Cta>
            <Cta href={whatsappUrl()} external variant="light" icon={<WhatsAppIcon />}>
              Chat on WhatsApp
            </Cta>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-ivory/10">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20">
          <div className="md:col-span-5">
            <Monogram className="h-16 text-ivory" label="Smaranika Studio" />
            <p className="mt-6 max-w-xs font-serif text-2xl leading-snug text-ivory/80">{studio.tagline}</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow mb-5 !text-[0.58rem] text-gold">Explore</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-ivory/70 transition-colors hover:text-champagne">{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow mb-5 !text-[0.58rem] text-gold">Get in touch</p>
            <ul className="space-y-3 text-sm text-ivory/70">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-champagne">
                  <WhatsAppIcon /> WhatsApp
                </a>
              </li>
              {studio.email && (
                <li><a href={`mailto:${studio.email}`} className="hover:text-champagne">{studio.email}</a></li>
              )}
              {studio.phoneDisplay && (
                <li><a href={`tel:${studio.phoneDisplay.replace(/[^\d+]/g, "")}`} className="hover:text-champagne">{studio.phoneDisplay}</a></li>
              )}
              {studio.location && <li>{studio.location}</li>}
            </ul>
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-3">
                {socials.map(({ href, label, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-ivory/20 transition-colors hover:border-champagne hover:text-champagne"
                    >
                      <Icon className="size-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-ivory/10 px-5 py-6 text-xs text-ivory/45 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            &copy; <Year /> {studio.name}. All rights reserved.
          </p>
          {studio.usingSampleMedia && (
            <p>Sample imagery and film from Unsplash &amp; Pexels, shown for preview.</p>
          )}
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-champagne">Privacy notice</Link>
            <a href="#top" className="hover:text-champagne">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
