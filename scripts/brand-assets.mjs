// Derives transparent brand assets from the supplied circular logo.
import sharp from "sharp";

const src = "public/brand/smaranika-logo.webp";
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h } = info;
const cx = w / 2, cy = h / 2;

// Sample the circle colour near the centre-bottom (pure green area).
const at = (x, y) => { const i = (y * w + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };
const g = at(Math.round(cx), Math.round(h * 0.85));
console.log("size", w, h, "green", g, "#" + g.map((v) => v.toString(16).padStart(2, "0")).join(""));

// Estimate circle radius by scanning from centre to the right until the pixel turns light.
let r = 0;
for (let x = Math.round(cx); x < w; x++) { const [R, G, B] = at(x, Math.round(h * 0.85 - (h * 0.85 - cy) )); if (R > 200 && G > 200 && B > 200 && x > cx + w * 0.4) { r = x - cx; break; } }
const radius = (r || w * 0.47) * 0.96;
console.log("radius", radius);

const gl = 0.2126 * g[0] + 0.7152 * g[1] + 0.0722 * g[2];
const mark = Buffer.alloc(w * h * 4);
const icon = Buffer.from(data);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
  const i = (y * w + x) * 4;
  const inside = Math.hypot(x - cx, y - cy) < radius;
  const L = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  const a = inside ? Math.max(0, Math.min(1, (L - gl - 12) / (235 - gl - 12))) : 0;
  mark[i] = mark[i + 1] = mark[i + 2] = 255; mark[i + 3] = Math.round(a * 255);
  const d = Math.hypot(x - cx, y - cy);
  icon[i + 3] = d < radius / 0.96 * 0.995 ? 255 : 0;
}
await sharp(mark, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).png().toFile("public/brand/smaranika-mark.png");
await sharp(icon, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).resize(512, 512).png().toFile("src/app/icon.png");
await sharp(icon, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).resize(180, 180).flatten({ background: "#ffffff" }).png().toFile("src/app/apple-icon.png");
const m = await sharp("public/brand/smaranika-mark.png").metadata();
console.log("mark", m.width, m.height);
