import sharp from "sharp";

const W = 1024;
const H = 500;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1d2e"/>
      <stop offset="100%" style="stop-color:#0d0f18"/>
    </linearGradient>
    <linearGradient id="amber" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fbbf24"/>
      <stop offset="100%" style="stop-color:#ea580c"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Decorative glow -->
  <circle cx="180" cy="250" r="200" fill="rgba(251,191,36,0.06)"/>
  <circle cx="850" cy="250" r="180" fill="rgba(168,85,247,0.04)"/>

  <!-- Clock icon (left side) -->
  <circle cx="180" cy="250" r="120" fill="none" stroke="url(#amber)" stroke-width="8" opacity="0.8"/>
  ${[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
    const angle = (i * 30 - 90) * Math.PI / 180;
    const x1 = 180 + Math.cos(angle) * 100;
    const y1 = 250 + Math.sin(angle) * 100;
    const x2 = 180 + Math.cos(angle) * 112;
    const y2 = 250 + Math.sin(angle) * 112;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#fbbf24" stroke-width="${i%3===0?4:2}" stroke-linecap="round" opacity="0.6"/>`;
  }).join("\n  ")}
  <line x1="180" y1="250" x2="${180+Math.cos(210*Math.PI/180)*65}" y2="${250+Math.sin(210*Math.PI/180)*65}" stroke="#fbbf24" stroke-width="10" stroke-linecap="round"/>
  <line x1="180" y1="250" x2="${180+Math.cos(-30*Math.PI/180)*90}" y2="${250+Math.sin(-30*Math.PI/180)*90}" stroke="#f8fafc" stroke-width="6" stroke-linecap="round" opacity="0.9"/>
  <circle cx="180" cy="250" r="8" fill="#fbbf24"/>

  <!-- App name -->
  <text x="380" y="210" font-family="Arial,Helvetica,sans-serif" font-weight="bold" font-size="80" fill="#fbbf24">Time</text>
  <text x="618" y="210" font-family="Arial,Helvetica,sans-serif" font-weight="bold" font-size="80" fill="#f8fafc">Craft</text>

  <!-- Tagline -->
  <text x="380" y="270" font-family="Arial,Helvetica,sans-serif" font-size="28" fill="#94a3b8">All your time tools in one place</text>

  <!-- Feature pills -->
  <rect x="380" y="310" width="140" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="450" y="334" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Timezones</text>

  <rect x="535" y="310" width="130" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="600" y="334" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Holidays</text>

  <rect x="680" y="310" width="150" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="755" y="334" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Countdown</text>

  <rect x="380" y="360" width="140" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="450" y="384" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Work time</text>

  <rect x="535" y="360" width="110" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="590" y="384" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Batch</text>

  <rect x="660" y="360" width="150" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.3)" stroke-width="1"/>
  <text x="735" y="384" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="16" fill="#fbbf24">Date span</text>

  <!-- 5 languages note -->
  <text x="380" y="440" font-family="Arial,Helvetica,sans-serif" font-size="18" fill="#64748b">EN | NB | PT-BR | SV | DA</text>
</svg>`;

const buf = Buffer.from(svg);
const out = await sharp(buf).resize(1024, 500).png().toBuffer();
const { writeFileSync } = await import("fs");
writeFileSync("feature-graphic-1024x500.png", out);
console.log("feature-graphic-1024x500.png created!");
