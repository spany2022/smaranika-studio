import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Pinyon_Script } from "next/font/google";
import Script from "next/script";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Cursor from "@/components/motion/Cursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Smaranika Studio — Wedding Photography & Cinematic Films",
    template: "%s — Smaranika Studio",
  },
  description:
    "Smaranika Studio captures weddings, pre-wedding stories and celebrations through honest photography and cinematic films. Every love story deserves its own film.",
  openGraph: {
    title: "Smaranika Studio — Wedding Photography & Cinematic Films",
    description: "Every love story deserves its own film.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#081f06",
};

// Opt into motion before first paint so reveal states never flash, and so
// visitors who prefer reduced motion (or have no JS) always see everything.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion-ok')}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${pinyon.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>
        <Script id="motion-preference" strategy="beforeInteractive">
          {motionScript}
        </Script>
        <SmoothScroll />
        <Cursor />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
