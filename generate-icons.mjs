import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// TimeCraft icon: dark rounded background with amber clock hands
// Creates a modern, clean app icon

const SIZE = 1024;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1d2e"/>
      <stop offset="100%" style="stop-color:#0d0f18"/>
    </linearGradient>
    <linearGradient id="ring" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#f59e0b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#ea580c"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="12" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${SIZE}" height="${SIZE}" rx="220" fill="url(#bg)"/>

  <!-- Subtle radial glow -->
  <circle cx="512" cy="480" r="320" fill="rgba(251,191,36,0.06)"/>

  <!-- Clock circle outline -->
  <circle cx="512" cy="480" r="280" fill="none" stroke="url(#ring)" stroke-width="18" opacity="0.9"/>

  <!-- Hour markers -->
  ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
    const angle = (i * 30 - 90) * (Math.PI / 180);
    const x1 = 512 + Math.cos(angle) * 248;
    const y1 = 480 + Math.sin(angle) * 248;
    const x2 = 512 + Math.cos(angle) * 268;
    const y2 = 480 + Math.sin(angle) * 268;
    const w = i % 3 === 0 ? 8 : 4;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fbbf24" stroke-width="${w}" stroke-linecap="round" opacity="0.7"/>`;
  }).join("\n  ")}

  <!-- Hour hand (pointing ~10 o'clock) -->
  <line x1="512" y1="480" x2="${512 + Math.cos((-90 + 300) * Math.PI / 180) * 150}" y2="${480 + Math.sin((-90 + 300) * Math.PI / 180) * 150}" stroke="#fbbf24" stroke-width="22" stroke-linecap="round" filter="url(#glow)"/>

  <!-- Minute hand (pointing ~2 o'clock) -->
  <line x1="512" y1="480" x2="${512 + Math.cos((-90 + 60) * Math.PI / 180) * 210}" y2="${480 + Math.sin((-90 + 60) * Math.PI / 180) * 210}" stroke="#f8fafc" stroke-width="14" stroke-linecap="round" opacity="0.95"/>

  <!-- Center dot -->
  <circle cx="512" cy="480" r="18" fill="url(#accent)"/>
  <circle cx="512" cy="480" r="8" fill="#1a1d2e"/>

  <!-- "TC" text at bottom -->
  <text x="512" y="920" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="bold" font-size="120" fill="url(#accent)" letter-spacing="8">TC</text>
</svg>`;

// Generate all sizes
const androidSizes = {
  "mipmap-mdpi": 48,
  "mipmap-hdpi": 72,
  "mipmap-xhdpi": 96,
  "mipmap-xxhdpi": 144,
  "mipmap-xxxhdpi": 192,
};

const foregroundSize = {
  "mipmap-mdpi": 108,
  "mipmap-hdpi": 162,
  "mipmap-xhdpi": 216,
  "mipmap-xxhdpi": 324,
  "mipmap-xxxhdpi": 432,
};

const resDir = "android/app/src/main/res";

async function generate() {
  const svgBuf = Buffer.from(svg);

  // Generate launcher icons
  for (const [folder, size] of Object.entries(androidSizes)) {
    const dir = join(resDir, folder);
    const buf = await sharp(svgBuf).resize(size, size).png().toBuffer();
    writeFileSync(join(dir, "ic_launcher.png"), buf);
    writeFileSync(join(dir, "ic_launcher_round.png"), buf);
    console.log(`  ${folder}/ic_launcher.png (${size}x${size})`);
  }

  // Generate foreground icons (adaptive icon)
  for (const [folder, size] of Object.entries(foregroundSize)) {
    const dir = join(resDir, folder);
    const buf = await sharp(svgBuf).resize(size, size).png().toBuffer();
    writeFileSync(join(dir, "ic_launcher_foreground.png"), buf);
    console.log(`  ${folder}/ic_launcher_foreground.png (${size}x${size})`);
  }

  // Generate Play Store icon (512x512)
  const playStore = await sharp(svgBuf).resize(512, 512).png().toBuffer();
  writeFileSync("app-icon-512.png", playStore);
  console.log("  app-icon-512.png (512x512) - for Google Play");

  console.log("\nAll icons generated!");
}

generate().catch(console.error);
