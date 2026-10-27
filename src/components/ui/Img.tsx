"use client";

import Image, { type ImageLoader, type ImageProps } from "next/image";

// Unsplash (imgix) resizes on its own CDN, so sample photos skip the Next.js
// optimiser hop. Local studio photos in /public still use the optimiser.
const unsplashLoader: ImageLoader = ({ src, width, quality }) => {
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality ?? 75));
  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  return url.toString();
};

export default function Img(props: ImageProps) {
  const isUnsplash = typeof props.src === "string" && props.src.startsWith("https://images.unsplash.com/");
  return <Image {...props} alt={props.alt} loader={isUnsplash ? unsplashLoader : props.loader} />;
}
