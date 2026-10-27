"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { celebrationTypes, serviceOptions, studio } from "@/content/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { useClientValue } from "@/lib/useClientValue";
import { PREFILL_EVENT, type Prefill } from "@/components/ui/EnquireLink";
import { WhatsAppIcon } from "@/components/ui/Icons";
import Monogram from "@/components/ui/Monogram";

type Values = {
  name: string;
  partner: string;
  email: string;
  phone: string;
  date: string;
  dateUndecided: boolean;
  location: string;
  type: string;
  services: string[];
  details: string;
  consent: boolean;
  company: string; // honeypot
};

const empty: Values = {
  name: "",
  partner: "",
  email: "",
  phone: "",
  date: "",
  dateUndecided: false,
  location: "",
  type: "",
  services: [],
  details: "",
  consent: false,
  company: "",
};

type Errors = Partial<Record<keyof Values, string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "whatsapp" }
  | { kind: "error"; message: string };

const localToday = () => {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: Values, today: string): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(v.phone.trim()) || digits.length < 8 || digits.length > 15)
    e.phone = "Please enter a valid phone or WhatsApp number, with country code if outside India.";
  if (!v.dateUndecided) {
    if (!v.date) e.date = "Please choose your date, or tick “Date not fixed yet”.";
    else if (v.date < today) e.date = "That date has already passed.";
  }
  if (v.location.trim().length < 2) e.location = "Where will you celebrate?";
  if (!v.type) e.type = "Please choose a celebration type.";
  if (!v.consent) e.consent = "Please agree so we can reply to your inquiry.";
  return e;
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function toMessage(v: Values) {
  const lines = [
    "Hello Smaranika Studio! I'd like to check availability.",
    "",
    `Name: ${v.name.trim()}${v.partner.trim() ? ` & ${v.partner.trim()}` : ""}`,
    `Email: ${v.email.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Date: ${v.dateUndecided || !v.date ? "Not fixed yet" : formatDate(v.date)}`,
    `Location: ${v.location.trim()}`,
    `Celebration: ${v.type}`,
  ];
  if (v.services.length) lines.push(`Services: ${v.services.join(", ")}`);
  if (v.details.trim()) lines.push("", v.details.trim());
  return lines.join("\n");
}

export default function Inquiry() {
  const [v, setV] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const today = useClientValue(localToday, "");
  const formRef = useRef<HTMLFormElement>(null);
  const hasEndpoint = !!studio.inquiryEndpoint;

  // Pre-select services when a visitor clicks "Enquire" elsewhere on the page.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const { service, type } = (e as CustomEvent<Prefill>).detail;
      setV((prev) => ({
        ...prev,
        type: type ?? prev.type,
        services: service && !prev.services.includes(service) ? [...prev.services, service] : prev.services,
      }));
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setV((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    const found = validate(v, today);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (v.company) return; // bot

    if (!hasEndpoint) {
      // No form service configured: hand the details to WhatsApp, honestly.
      window.open(whatsappUrl(toMessage(v)), "_blank", "noopener,noreferrer");
      setStatus({ kind: "whatsapp" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch(studio.inquiryEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Wedding inquiry — ${v.name.trim()}`,
          name: v.name.trim(),
          partner: v.partner.trim(),
          email: v.email.trim(),
          phone: v.phone.trim(),
          date: v.dateUndecided ? "Not fixed yet" : v.date,
          location: v.location.trim(),
          celebration: v.type,
          services: v.services.join(", "),
          details: v.details.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't send your inquiry just now. Please try again, or send the same details on WhatsApp.",
      });
    }
  };

  const err = (k: keyof Values) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-2 text-xs text-[#f0b6a2]">
        {errors[k]}
      </p>
    ) : null;
  const a11y = (k: keyof Values) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <section id="inquiry" aria-labelledby="inquiry-title" className="relative overflow-hidden bg-forest-deep text-ivory">
      <Monogram className="pointer-events-none absolute -left-[10vw] bottom-0 h-[30vw] text-ivory/[0.025]" />
      <div className="mx-auto grid max-w-[1500px] gap-16 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12 lg:gap-20">
        {/* Intro */}
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow mb-7 flex items-center gap-4 text-champagne">
            <span className="h-px w-10 bg-champagne/70" />
            Check your date
          </p>
          <h2 id="inquiry-title" data-lines className="display text-[clamp(2.6rem,5vw,5.4rem)]">
            <span className="line-mask"><span>Let&rsquo;s Make</span></span>
            <span className="line-mask"><span>Your Date</span></span>
            <span className="line-mask"><span className="italic text-champagne">Unforgettable.</span></span>
          </h2>
          <p data-reveal className="mt-8 max-w-md leading-[1.85] text-ivory/70">
            Tell us a little about your celebration. We&rsquo;ll connect with you to learn about your plans and
            explore how we can tell your story.
          </p>

          <div data-reveal className="mt-10">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-6 border border-ivory/15 p-5 transition-colors duration-500 hover:border-champagne hover:bg-champagne hover:text-ink"
            >
              <span className="flex items-center gap-4">
                <span className="flex size-12 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] transition-colors group-hover:bg-ink/10 group-hover:text-ink">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span>
                  <span className="block font-serif text-2xl">Prefer to chat?</span>
                  <span className="eyebrow !text-[0.58rem] opacity-70">Message us on WhatsApp</span>
                </span>
              </span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {(studio.email || studio.phoneDisplay || studio.location) && (
            <ul data-reveal className="mt-10 space-y-3 text-sm text-ivory/75">
              {studio.email && (
                <li>
                  <a href={`mailto:${studio.email}`} className="inline-flex items-center gap-3 hover:text-champagne">
                    <Mail className="size-4 text-gold" /> {studio.email}
                  </a>
                </li>
              )}
              {studio.phoneDisplay && (
                <li>
                  <a href={`tel:${studio.phoneDisplay.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-3 hover:text-champagne">
                    <Phone className="size-4 text-gold" /> {studio.phoneDisplay}
                  </a>
                </li>
              )}
              {studio.location && (
                <li className="inline-flex items-center gap-3">
                  <MapPin className="size-4 text-gold" /> {studio.location}
                </li>
              )}
            </ul>
          )}
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          {status.kind === "sent" ? (
            <div role="status" className="flex min-h-[520px] flex-col justify-center border border-ivory/10 p-8 md:p-14">
              <span className="flex size-14 items-center justify-center rounded-full bg-champagne text-ink">
                <Check className="size-6" />
              </span>
              <h3 className="display mt-8 text-5xl">Thank you, {v.name.trim().split(" ")[0]}.</h3>
              <p className="mt-5 max-w-md leading-[1.85] text-ivory/70">
                Your inquiry has reached us. We&rsquo;ll read it personally and be in touch soon to hear more about
                your plans.
              </p>
              <p className="mt-8 font-script text-4xl text-champagne">with love, Smaranika</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate className="border border-ivory/10 p-6 md:p-12" aria-describedby="privacy-note">
              <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow !text-[0.58rem] text-ivory/60">Your name *</label>
                  <input id="name" name="name" className="field" autoComplete="name" value={v.name} onChange={(e) => set("name", e.target.value)} {...a11y("name")} />
                  {err("name")}
                </div>
                <div>
                  <label htmlFor="partner" className="eyebrow !text-[0.58rem] text-ivory/60">Partner&rsquo;s name</label>
                  <input id="partner" name="partner" className="field" value={v.partner} onChange={(e) => set("partner", e.target.value)} placeholder="Optional" />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow !text-[0.58rem] text-ivory/60">Email address *</label>
                  <input id="email" name="email" type="email" inputMode="email" className="field" autoComplete="email" value={v.email} onChange={(e) => set("email", e.target.value)} {...a11y("email")} />
                  {err("email")}
                </div>
                <div>
                  <label htmlFor="phone" className="eyebrow !text-[0.58rem] text-ivory/60">Phone or WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" value={v.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91" {...a11y("phone")} />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="date" className="eyebrow !text-[0.58rem] text-ivory/60">Wedding date *</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today || undefined}
                    className="field disabled:opacity-40"
                    value={v.date}
                    disabled={v.dateUndecided}
                    onChange={(e) => set("date", e.target.value)}
                    {...a11y("date")}
                  />
                  <label className="mt-3 inline-flex cursor-pointer items-center gap-2 text-xs text-ivory/60">
                    <input
                      type="checkbox"
                      className="size-3.5 accent-[#b99a68]"
                      checked={v.dateUndecided}
                      onChange={(e) => {
                        set("dateUndecided", e.target.checked);
                        setErrors((p) => ({ ...p, date: undefined }));
                      }}
                    />
                    Date not fixed yet
                  </label>
                  {err("date")}
                </div>
                <div>
                  <label htmlFor="location" className="eyebrow !text-[0.58rem] text-ivory/60">Wedding location *</label>
                  <input id="location" name="location" className="field" autoComplete="address-level2" value={v.location} onChange={(e) => set("location", e.target.value)} placeholder="City, venue or destination" {...a11y("location")} />
                  {err("location")}
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="type" className="eyebrow !text-[0.58rem] text-ivory/60">Celebration type *</label>
                  <select id="type" name="type" className="field cursor-pointer" value={v.type} onChange={(e) => set("type", e.target.value)} {...a11y("type")}>
                    <option value="">Choose one</option>
                    {celebrationTypes.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  {err("type")}
                </div>
                <fieldset className="md:col-span-2">
                  <legend className="eyebrow mb-4 !text-[0.58rem] text-ivory/60">Services you&rsquo;re interested in</legend>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((s) => {
                      const on = v.services.includes(s);
                      return (
                        <label
                          key={s}
                          className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors duration-300 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold ${
                            on ? "border-champagne bg-champagne text-ink" : "border-ivory/20 text-ivory/75 hover:border-ivory/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={on}
                            onChange={() => set("services", on ? v.services.filter((x) => x !== s) : [...v.services, s])}
                          />
                          {s}
                        </label>
                      );
                    })}
                  </div>
                </fieldset>
                <div className="md:col-span-2">
                  <label htmlFor="details" className="eyebrow !text-[0.58rem] text-ivory/60">Tell us about your celebration</label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    className="field resize-y"
                    value={v.details}
                    onChange={(e) => set("details", e.target.value)}
                    placeholder="Your events, guest count, the moments that matter most to you…"
                  />
                </div>
                {/* Honeypot */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Company <input tabIndex={-1} autoComplete="off" value={v.company} onChange={(e) => set("company", e.target.value)} />
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ivory/70">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-1 size-4 shrink-0 accent-[#b99a68]"
                      checked={v.consent}
                      onChange={(e) => set("consent", e.target.checked)}
                      {...a11y("consent")}
                    />
                    <span>
                      I agree to Smaranika Studio using these details to reply to my inquiry. Read our{" "}
                      <Link href="/privacy" className="underline decoration-gold underline-offset-4 hover:text-champagne">privacy notice</Link>.
                    </span>
                  </label>
                  {err("consent")}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <button
                  type="submit"
                  disabled={status.kind === "sending"}
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-champagne px-9 py-4 eyebrow !text-[0.7rem] text-ink transition-colors duration-500 hover:bg-gold-soft disabled:opacity-60"
                >
                  {status.kind === "sending" ? <Loader2 className="size-4 animate-spin" /> : null}
                  {status.kind === "sending" ? "Sending" : "Check availability"}
                  {status.kind !== "sending" && (hasEndpoint ? <ArrowRight className="size-3.5" /> : <WhatsAppIcon />)}
                </button>
                <p id="privacy-note" className="max-w-xs text-xs leading-relaxed text-ivory/50">
                  {hasEndpoint
                    ? "Your details are sent securely to our studio inbox and used only to respond to you."
                    : "Your details will open in WhatsApp, ready for you to send to us. Nothing is stored on this website."}
                </p>
              </div>

              <div aria-live="polite" className="mt-6 empty:hidden">
                {status.kind === "whatsapp" && (
                  <p className="border-l-2 border-champagne pl-4 text-sm leading-relaxed text-ivory/80">
                    We&rsquo;ve opened WhatsApp with your details. Press <strong>send</strong> there and your inquiry will
                    reach us. Nothing opened?{" "}
                    <a href={whatsappUrl(toMessage(v))} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
                      Open WhatsApp
                    </a>
                    .
                  </p>
                )}
                {status.kind === "error" && (
                  <p role="alert" className="border-l-2 border-[#e3a08a] pl-4 text-sm leading-relaxed text-ivory/80">
                    {status.message}{" "}
                    <a href={whatsappUrl(toMessage(v))} target="_blank" rel="noopener noreferrer" className="underline decoration-gold underline-offset-4">
                      Send on WhatsApp
                    </a>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
