import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { studio } from "@/content/site";
import Monogram from "@/components/ui/Monogram";

export const metadata: Metadata = {
  title: "Privacy notice",
  description: "How Smaranika Studio handles the details you share with us.",
};

// Plain-language notice. Have it reviewed against your local requirements
// (e.g. India's DPDP Act) before launch.
export default function Privacy() {
  return (
    <main className="min-h-screen bg-ivory px-5 py-16 text-ink md:px-10 md:py-24">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="link-line eyebrow !text-[0.62rem] text-forest">
          <ArrowLeft className="size-3.5" /> Back to Smaranika
        </Link>
        <Monogram className="mt-14 h-14 text-forest" label="Smaranika Studio" />
        <h1 className="display mt-10 text-6xl text-forest">Privacy notice</h1>
        <div className="mt-10 space-y-6 leading-[1.85] text-ink/75 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-forest">
          <p>
            We only ask for what we need to reply to you, and we treat it with the same care we give your
            photographs.
          </p>
          <h2>What we collect</h2>
          <p>
            When you send an inquiry we receive the details you choose to share: your name and your partner&rsquo;s
            name, email address, phone or WhatsApp number, wedding date and location, the type of celebration,
            the services you&rsquo;re interested in and any message you write.
          </p>
          <h2>How we use it</h2>
          <p>
            We use these details only to respond to your inquiry, check our availability and, if you choose to
            work with us, to plan your celebration. We never sell your information or share it for marketing.
          </p>
          <h2>WhatsApp</h2>
          <p>
            If you contact us through WhatsApp, your message is handled by WhatsApp under its own privacy
            policy. This website does not store the details you type into the inquiry form unless a form service
            is configured to deliver them to our studio inbox.
          </p>
          <h2>Your choices</h2>
          <p>
            You can ask us at any time to see, correct or delete the information you&rsquo;ve shared with us
            {studio.email ? (
              <>
                {" "}by writing to <a className="underline decoration-gold underline-offset-4" href={`mailto:${studio.email}`}>{studio.email}</a>
              </>
            ) : null}
            .
          </p>
        </div>
      </div>
    </main>
  );
}
