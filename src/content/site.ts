/**
 * Smaranika Studio — site content & configuration.
 *
 * Everything a non-developer may want to change lives here: contact details,
 * copy, photographs, films and stories.
 *
 * IMPORTANT — TEMPORARY MEDIA
 * All photographs and films referenced below are temporary sample media from
 * Unsplash and Pexels, chosen to match the creative direction. Replace each
 * `src` with Smaranika's own work (drop files in /public/work and use
 * "/work/filename.jpg") before launch. Never present the samples as the
 * studio's own weddings.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position, used to keep faces and details in frame. */
  focus?: string;
};

const unsplash = (id: string, w = 2400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=max&w=${w}&q=80`;

const L = { width: 2400, height: 1600 };
const P = { width: 1600, height: 2400 };

/* ------------------------------------------------------------------ */
/* Studio details — fill these in. Empty values are hidden on the site. */
/* ------------------------------------------------------------------ */

export const studio = {
  name: "Smaranika Studio",
  shortName: "Smaranika",
  tagline: "Every love story deserves its own film.",
  /** Digits only with country code, e.g. "919876543210". Required for WhatsApp. */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  location: process.env.NEXT_PUBLIC_STUDIO_LOCATION ?? "",
  socials: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "",
    youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL ?? "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "",
  },
  /**
   * Optional form service endpoint (Formspree, Web3Forms, Getform, your own API…)
   * that accepts a JSON POST. When empty, the inquiry form hands the details
   * to WhatsApp instead of pretending a booking was stored.
   */
  inquiryEndpoint: process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT ?? "",
  /** Shown in the footer while sample media is in use. Set false at launch. */
  usingSampleMedia: true,
};

export const nav = [
  { label: "Stories", href: "#stories" },
  { label: "Films", href: "#films" },
  { label: "Approach", href: "#approach" },
  { label: "Services", href: "#services" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#inquiry" },
];

/* ------------------------------------------------------------------ */
/* Photo library (temporary samples)                                    */
/* ------------------------------------------------------------------ */

const photoLibrary = {
  mandap: { src: unsplash("1587271636175-90d58cdad458"), ...L, alt: "A couple seated beneath a floral mandap during their wedding ceremony" },
  brideRed: { src: unsplash("1610173827043-9db50e0d8ef9"), ...P, alt: "A bride in a red lehenga and gold jewellery, eyes lowered with a soft smile", focus: "50% 30%" },
  hennaHands: { src: unsplash("1621801306185-8c0ccf9c8eb8"), ...L, alt: "Two hands adorned with henna and bangles holding each other" },
  coupleLights: { src: unsplash("1722952934708-749c22eb2e58"), ...P, alt: "A bride and groom in traditional attire beneath warm string lights", focus: "50% 35%" },
  woodsPath: { src: unsplash("1735052712464-9d24b69be5f5"), ...P, alt: "A bride and groom embracing on a tree-lined path", focus: "50% 60%" },
  ritualHands: { src: unsplash("1597157639073-69284dc0fdaf"), ...L, alt: "Hands joined during a wedding ritual, wrapped in gold and red" },
  attireFlowers: { src: unsplash("1783188223242-07c15cabbf18"), ...P, alt: "Wedding attire hanging amid bougainvillea and floral garlands" },
  canopyCouple: { src: unsplash("1727430256509-0f897d6f4765"), ...P, alt: "A couple holding hands beneath a canopy of flowers", focus: "50% 40%" },
  traditionalCouple: { src: unsplash("1665960213508-48f07086d49c"), ...P, alt: "A couple in richly embroidered traditional wedding attire", focus: "50% 30%" },
  riverCouple: { src: unsplash("1630526720753-aa4e71acf67d"), ...P, alt: "A couple in traditional wedding clothes standing by a river at dusk", focus: "50% 45%" },
  ritualCanopy: { src: unsplash("1587271407850-8d438ca9fdf2"), ...L, alt: "A couple performing a wedding ritual beneath a floral canopy" },
  ringHenna: { src: unsplash("1542042161784-26ab9e041e89"), ...L, alt: "A ring being placed on a henna-adorned hand" },
  sherwaniKiss: { src: unsplash("1599462616558-2b75fd26a283"), width: 1600, height: 3080, alt: "A groom in a white sherwani kissing his bride's forehead", focus: "50% 30%" },
  hennaGroup: { src: unsplash("1505932794465-147d1f1b2c97"), ...L, alt: "Several hands decorated with intricate mehendi patterns" },
  jewellery: { src: unsplash("1782384337918-5fbdb9126803"), ...P, alt: "A bride wearing intricate traditional jewellery", focus: "50% 30%" },
  palaceCouple: { src: unsplash("1756190564669-215843660e93"), width: 2400, height: 1860, alt: "A couple in traditional attire holding hands in a candlelit palace courtyard" },
  confettiArch: { src: unsplash("1744804298431-57953e4eaba0"), width: 1600, height: 2280, alt: "A couple celebrating beneath a floral arch as confetti falls" },
  stage: { src: unsplash("1744805624954-a6686543c3ff"), ...P, alt: "A wedding stage dressed with hanging florals and soft lights" },
  archway: { src: unsplash("1761472606347-bfebc5a3e546"), ...P, alt: "An ornate archway with chandeliers leading into a wedding venue" },
  beachDance: { src: unsplash("1615966650071-855b15f29ad1"), width: 2400, height: 1440, alt: "A couple silhouetted dancing on the shore at golden hour" },
  sunsetKiss: { src: unsplash("1606490194859-07c18c9f0968"), ...P, alt: "A bride and groom sharing a kiss in a field at sunset", focus: "50% 40%" },
  goldenField: { src: unsplash("1547911139-c06c87da7115"), ...L, alt: "A bride and groom face to face in a grass field, backlit by the setting sun" },
  meadow: { src: unsplash("1519379169146-d4b170447caa"), ...L, alt: "A bride and groom standing together on a quiet green meadow" },
  sunsetHands: { src: unsplash("1716813344739-51ac117d5ecc"), width: 1600, height: 2080, alt: "A bride and groom holding hands as the sun sets behind them" },
  hillWalk: { src: unsplash("1532712938310-34cb3982ef74"), ...L, alt: "A couple walking together across a hillside at dusk" },
  bouquet: { src: unsplash("1519741497674-611481863552"), ...L, alt: "A groom beside a bride holding her bouquet in warm light" },
  silhouette: { src: unsplash("1721635513002-287a3a3b2fa1"), ...L, alt: "A couple holding hands, silhouetted against the evening sky" },
  roadWalk: { src: unsplash("1606216836549-f60d04e4a20b"), ...P, alt: "A bride and groom walking along a country road in golden light" },
  brideWindow: { src: unsplash("1643216583837-f6d664d48eac"), ...P, alt: "A bride in a lace gown looking out of a window before the ceremony", focus: "50% 30%" },
  brideMirror: { src: unsplash("1722805740076-7c51a8669afc"), width: 1600, height: 2000, alt: "A bride getting ready in front of a mirror" },
  bridalShoes: { src: unsplash("1525096590600-f5d442a7f796"), ...L, alt: "A bridesmaid helping the bride with her shoes" },
  danceFloor: { src: unsplash("1714972383570-44ddc9738355"), ...L, alt: "Guests celebrating on a lively dance floor" },
  laughingCouple: { src: unsplash("1708569176813-746f00614012"), ...L, alt: "A bride and groom laughing together" },
  firstDance: { src: unsplash("1648154164366-d067faecdc51"), ...P, alt: "A bride and groom dancing at their reception" },
  celebrating: { src: unsplash("1762319981432-609103ab4a75"), ...L, alt: "A bride and groom celebrating with friends" },
  photographerCouple: { src: unsplash("1756143058493-2d14887e41e6"), ...L, alt: "A photographer capturing a bride and groom on a mountain overlook" },
  photographerBride: { src: unsplash("1791422170727-6e56f8ea6c37"), ...L, alt: "A photographer with her camera beside a bride" },
  filmmaker: { src: unsplash("1637985626750-110489d6b82d"), width: 1600, height: 2000, alt: "A filmmaker reviewing footage on a cinema camera" },
} satisfies Record<string, Photo>;

export const photos: Record<keyof typeof photoLibrary, Photo> = photoLibrary;

/* ------------------------------------------------------------------ */
/* Hero opening sequence                                                */
/* ------------------------------------------------------------------ */

export type HeroShot =
  | { kind: "video"; src: string; poster: Photo; seconds: number }
  | { kind: "image"; photo: Photo; seconds: number };

export const heroShots: HeroShot[] = [
  {
    kind: "video",
    // Temporary sample film (Pexels #29575270). Replace with the studio's showreel.
    src: "https://videos.pexels.com/video-files/29575270/12730290_1920_1080_30fps.mp4",
    poster: photos.beachDance,
    seconds: 5,
  },
  { kind: "image", photo: photos.beachDance, seconds: 6 },
  { kind: "image", photo: photos.palaceCouple, seconds: 6 },
  { kind: "image", photo: photos.goldenField, seconds: 6 },
];

/* ------------------------------------------------------------------ */
/* Featured love stories                                                */
/* ------------------------------------------------------------------ */

export type Story = {
  slug: string;
  title: string;
  /** Leave undefined until the couple has approved being named. */
  couple?: string;
  location?: string;
  type: string;
  description: string;
  cover: Photo;
  gallery: Photo[];
};

export const storyCategories = [
  "Wedding Stories",
  "Pre-Wedding Films",
  "Destination Weddings",
  "Traditional Weddings",
  "Intimate Celebrations",
  "Engagements & Portraits",
];

export const stories: Story[] = [
  {
    slug: "marigold-mandap",
    title: "Vows Beneath the Marigolds",
    type: "Traditional Wedding",
    description:
      "Candlelight, old stone and the hush before the pheras. A day held together by ritual, family and a thousand small glances.",
    cover: photos.palaceCouple,
    gallery: [photos.palaceCouple, photos.ritualCanopy, photos.mandap, photos.ritualHands, photos.ringHenna],
  },
  {
    slug: "monsoon-woods",
    title: "A Walk Through the Monsoon Woods",
    type: "Pre-Wedding Film",
    description:
      "Rain-washed paths, borrowed umbrellas and the easy laughter of two people who already know they're home.",
    cover: photos.woodsPath,
    gallery: [photos.woodsPath, photos.riverCouple, photos.canopyCouple, photos.traditionalCouple],
  },
  {
    slug: "sea-and-sky",
    title: "Where the Sea Met the Sky",
    type: "Destination Wedding",
    description:
      "A barefoot celebration at the edge of the ocean, written in salt air and the last gold light of the evening.",
    cover: photos.beachDance,
    gallery: [photos.beachDance, photos.silhouette, photos.hillWalk, photos.goldenField],
  },
  {
    slug: "haldi-henna",
    title: "Haldi, Henna & Everything Golden",
    type: "Intimate Celebration",
    description:
      "Turmeric-stained laughter, mehendi stories and the women who made the morning unforgettable.",
    cover: photos.hennaGroup,
    gallery: [photos.hennaGroup, photos.hennaHands, photos.attireFlowers, photos.jewellery],
  },
  {
    slug: "before-i-do",
    title: "The Quiet Before Forever",
    type: "Engagement & Couple Portraits",
    description:
      "An unhurried golden hour, just the two of them, a field of tall grass and nowhere else to be.",
    cover: photos.sunsetKiss,
    gallery: [photos.sunsetKiss, photos.sunsetHands, photos.meadow, photos.bouquet],
  },
  {
    slug: "light-and-laughter",
    title: "A Night of Light and Laughter",
    type: "Wedding Reception",
    description:
      "Fairy lights, a packed dance floor and the moment the whole room rose to its feet for them.",
    cover: photos.coupleLights,
    gallery: [photos.coupleLights, photos.celebrating, photos.laughingCouple, photos.danceFloor],
  },
];

/* ------------------------------------------------------------------ */
/* Films                                                                */
/* ------------------------------------------------------------------ */

export type Film = {
  id: string;
  title: string;
  kind: string;
  poster: Photo;
  /** Direct MP4 URL, or leave empty and set `youtubeId` instead. */
  src?: string;
  youtubeId?: string;
};

// Temporary sample clips from Pexels. Replace with Smaranika's own films.
export const featuredFilm: Film = {
  id: "highlight",
  title: "A Wedding Highlight Film",
  kind: "Highlight Film",
  poster: photos.riverCouple,
  src: "https://videos.pexels.com/video-files/40474721/17295834_1920_1080_60fps.mp4",
};

export const films: Film[] = [
  {
    id: "rituals",
    title: "Sacred Rituals",
    kind: "Full Wedding Film",
    poster: photos.ritualCanopy,
    src: "https://videos.pexels.com/video-files/31139763/13305464_1920_1080_50fps.mp4",
  },
  {
    id: "haldi",
    title: "The Haldi Morning",
    kind: "Event Film",
    poster: photos.hennaHands,
    src: "https://videos.pexels.com/video-files/12597431/12597431-hd_1280_720_25fps.mp4",
  },
  {
    id: "details",
    title: "In the Details",
    kind: "Cinematic Teaser",
    poster: photos.mandap,
    src: "https://videos.pexels.com/video-files/3936463/3936463-hd_1280_720_25fps.mp4",
  },
];

export const filmFormats = [
  "Wedding Highlight Films",
  "Full Wedding Films",
  "Pre-Wedding Cinematography",
  "Destination Wedding Films",
  "Event & Celebration Films",
];

/* ------------------------------------------------------------------ */
/* Approach                                                             */
/* ------------------------------------------------------------------ */

export const approach = [
  {
    no: "01",
    title: "The Connection",
    body: "It begins with a conversation. We get to know the two of you, your families, your personalities and the feeling you want to hold on to.",
    photo: photos.canopyCouple,
  },
  {
    no: "02",
    title: "The Preparation",
    body: "Together we shape the schedule, scout the light and locations, and map the rituals and moments that matter most, so nothing is left to chance.",
    photo: photos.brideWindow,
  },
  {
    no: "03",
    title: "The Celebration",
    body: "On the day we move quietly through it all, catching real emotions, meaningful rituals and the cinematic details you may never have noticed.",
    photo: photos.ritualCanopy,
  },
  {
    no: "04",
    title: "The Keepsake",
    body: "We carefully edit, colour and score every frame into a collection of photographs and films you'll return to for the rest of your life.",
    photo: photos.sunsetHands,
  },
];

/* ------------------------------------------------------------------ */
/* Services — no pricing or packages until the studio supplies them.    */
/* ------------------------------------------------------------------ */

export const services = [
  { title: "Wedding Photography", prefill: { service: "Photography", type: "Wedding" }, body: "Honest, editorial photographs of every ritual, glance and celebration, from the first light of the morning to the final farewell.", photo: photos.brideRed },
  { title: "Wedding Cinematography", prefill: { service: "Cinematography", type: "Wedding" }, body: "Your day told as a film, with natural sound, considered pacing and a score that brings every feeling back.", photo: photos.filmmaker },
  { title: "Pre-Wedding Photography & Films", prefill: { service: "Pre-Wedding Shoot", type: "Pre-Wedding Shoot" }, body: "A relaxed, story-led session somewhere that means something to you both, captured in stills and motion.", photo: photos.riverCouple },
  { title: "Destination Weddings", prefill: { type: "Destination Wedding" }, body: "We travel wherever your story takes you, planning light, locations and logistics around your celebration.", photo: photos.hillWalk },
  { title: "Engagements & Couple Sessions", prefill: { service: "Photography", type: "Engagement" }, body: "Intimate portraits for the beginning of something beautiful: rings, promises and the two of you.", photo: photos.ringHenna },
  { title: "Reception & Special Events", prefill: { type: "Reception / Sangeet / Mehendi" }, body: "Sangeet, mehendi, haldi and receptions, documented with the same care as the ceremony itself.", photo: photos.firstDance },
  { title: "Wedding Highlight Films", prefill: { service: "Highlight Film" }, body: "A short cinematic edit of your wedding, made to be watched again and again and shared with the people you love.", photo: photos.sherwaniKiss },
  { title: "Custom Photography & Film Collections", prefill: { service: "Custom Collection" }, body: "A collection shaped around your celebration, combining the coverage, films and keepsakes that suit you.", photo: photos.jewellery },
];

export const celebrationTypes = [
  "Wedding",
  "Pre-Wedding Shoot",
  "Destination Wedding",
  "Engagement",
  "Reception / Sangeet / Mehendi",
  "Other Celebration",
];

export const serviceOptions = [
  "Photography",
  "Cinematography",
  "Pre-Wedding Shoot",
  "Highlight Film",
  "Full Wedding Film",
  "Custom Collection",
];

/* ------------------------------------------------------------------ */
/* Journal gallery                                                      */
/* ------------------------------------------------------------------ */

export const journalFilters = ["All", "Ceremony", "Portraits", "Details", "Preparations", "Celebrations"] as const;
export type JournalFilter = (typeof journalFilters)[number];

export const journal: { photo: Photo; tag: Exclude<JournalFilter, "All"> }[] = [
  { photo: photos.brideRed, tag: "Portraits" },
  { photo: photos.ritualHands, tag: "Ceremony" },
  { photo: photos.stage, tag: "Details" },
  { photo: photos.brideMirror, tag: "Preparations" },
  { photo: photos.confettiArch, tag: "Celebrations" },
  { photo: photos.goldenField, tag: "Portraits" },
  { photo: photos.ringHenna, tag: "Details" },
  { photo: photos.mandap, tag: "Ceremony" },
  { photo: photos.bridalShoes, tag: "Preparations" },
  { photo: photos.sherwaniKiss, tag: "Portraits" },
  { photo: photos.celebrating, tag: "Celebrations" },
  { photo: photos.archway, tag: "Details" },
  { photo: photos.traditionalCouple, tag: "Portraits" },
  { photo: photos.ritualCanopy, tag: "Ceremony" },
  { photo: photos.firstDance, tag: "Celebrations" },
  { photo: photos.attireFlowers, tag: "Preparations" },
  { photo: photos.roadWalk, tag: "Portraits" },
  { photo: photos.laughingCouple, tag: "Celebrations" },
];

/* ------------------------------------------------------------------ */
/* Love notes — only genuine, client-approved testimonials go here.     */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  quote: string;
  names: string;
  location?: string;
  storySlug?: string;
  /** e.g. "Google Reviews", "WedMeGood" — link if possible. */
  source?: string;
  sourceUrl?: string;
  photo?: Photo;
};

export const testimonials: Testimonial[] = [
  // Example shape (do not publish invented reviews):
  // {
  //   quote: "…",
  //   names: "Ananya & Rohan",
  //   location: "Udaipur",
  //   source: "Google Reviews",
  //   sourceUrl: "https://g.page/…",
  //   photo: photos.palaceCouple,
  // },
];

/** Optional, only verified figures supplied by the studio. */
export const stats: { value: string; label: string }[] = [];
