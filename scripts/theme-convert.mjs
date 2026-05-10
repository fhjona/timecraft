// One-shot conversion: rewrite hardcoded slate-* utility classes so each one
// pairs a light-mode value with a `dark:` override that preserves any
// preceding Tailwind modifiers (hover:, focus:, sm:, etc.). Idempotent —
// already-converted tokens are skipped because the start-of-class boundary
// fails when the previous char is `:`.
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(process.cwd());
const files = [
  "src/App.tsx",
  "src/components/DateSpanCalculator.tsx",
  "src/components/TimezoneConverter.tsx",
  "src/components/HolidayCalculator.tsx",
  "src/components/CountdownWidget.tsx",
  "src/components/WorkTimeCalculator.tsx",
  "src/components/BatchCalculator.tsx",
  "src/components/SettingsPanel.tsx",
];

// Map: dark-mode token -> light-mode counterpart.
const map = {
  "bg-slate-950": "bg-slate-100",
  "bg-slate-900": "bg-white",
  "bg-slate-800": "bg-slate-100",
  "bg-slate-700": "bg-slate-200",
  "border-slate-700": "border-slate-300",
  "border-slate-600": "border-slate-400",
  "text-slate-200": "text-slate-900",
  "text-slate-300": "text-slate-700",
  "text-slate-400": "text-slate-600",
  "text-slate-500": "text-slate-500",
  "text-white": "text-slate-900",
};

const replacements = Object.entries(map).map(([dark, light]) => {
  const esc = dark.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Lookbehind: must be at start of a class slot (not preceded by another class char or colon).
  // Modifier capture: any number of "<word>:" segments, but NOT containing "dark:".
  // Token + optional /N opacity suffix.
  // Lookahead: end of class slot.
  const re = new RegExp(
    `(?<=^|[\\s"'\`{])((?:(?!dark:)[a-z][\\w-]*:)*)${esc}(\\/\\d+)?(?=[\\s"'\`}]|$)`,
    "g"
  );
  return { re, dark, light };
});

let totalChanges = 0;
for (const rel of files) {
  const path = resolve(root, rel);
  let src;
  try {
    src = readFileSync(path, "utf8");
  } catch (e) {
    console.error(`skip ${rel}: ${e.message}`);
    continue;
  }
  let count = 0;
  for (const { re, dark, light } of replacements) {
    src = src.replace(re, (_match, mods = "", suffix = "") => {
      count++;
      return `${mods}${light}${suffix} dark:${mods}${dark}${suffix}`;
    });
  }
  if (count > 0) {
    writeFileSync(path, src);
    totalChanges += count;
    console.log(`${rel}: ${count} replacements`);
  } else {
    console.log(`${rel}: no changes`);
  }
}
console.log(`\nTotal: ${totalChanges} replacements across ${files.length} files`);
