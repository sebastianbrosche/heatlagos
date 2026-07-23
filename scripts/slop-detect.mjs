#!/usr/bin/env node
/**
 * Content slop detector — flags AI-tell phrases in marketing/blog copy.
 * Exit 1 if any HIGH hits (or --strict for medium).
 *
 * Usage:
 *   node scripts/slop-detect.mjs
 *   node scripts/slop-detect.mjs --path src/app/blog
 *   node scripts/slop-detect.mjs --strict
 *   node scripts/slop-detect.mjs --fix-hints
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const fixHints = args.includes("--fix-hints");
const pathIdx = args.indexOf("--path");
const onlyPath = pathIdx >= 0 ? args[pathIdx + 1] : null;

const EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".md", ".mdx", ".html"]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "out",
  "dist",
  ".git",
  "coverage",
  ".agents",
  "my-agent",
]);

/** @type {{ re: RegExp, severity: 'high'|'medium', id: string, note: string }[]} */
const RULES = [
  {
    id: "answer-to-shift",
    severity: "high",
    re: /\b(is|are)\s+our\s+answer\s+to\b/i,
    note: 'Kill "our answer to X". Say what the class/product is.',
  },
  {
    id: "version-of-this",
    severity: "high",
    re: /\bour\s+version\s+of\s+this\b/i,
    note: 'Kill "our version of this". Name the product and what it does.',
  },
  {
    id: "this-shift",
    severity: "high",
    re: /\b(this|that)\s+shift\b/i,
    note: 'Vague trend hand-wave. Name the actual change.',
  },
  {
    id: "in-todays",
    severity: "high",
    re: /\bin\s+today'?s\s+(world|market|landscape|age)\b/i,
    note: "AI opener. Delete or start with a fact.",
  },
  {
    id: "in-a-world",
    severity: "high",
    re: /\bin\s+a\s+world\s+where\b/i,
    note: "AI opener. Delete.",
  },
  {
    id: "delve",
    severity: "high",
    re: /\bdelve(s|d|ing)?\b/i,
    note: 'Never "delve". Use look at / cover / explain.',
  },
  {
    id: "landscape",
    severity: "medium",
    re: /\b(wellness|fitness|gym|market|competitive)\s+landscape\b/i,
    note: 'Corporate "landscape". Say scene / options / market.',
  },
  {
    id: "leverage",
    severity: "medium",
    re: /\bleverage\b/i,
    note: 'Usually means "use". Prefer use / apply.',
  },
  {
    id: "seamlessly",
    severity: "high",
    re: /\bseamlessly\b/i,
    note: "Empty adverb. Cut it.",
  },
  {
    id: "robust",
    severity: "medium",
    re: /\brobust\b/i,
    note: "Corporate filler. Be specific.",
  },
  {
    id: "elevate",
    severity: "high",
    re: /\belevate\s+(your|the)\b/i,
    note: "Marketing mush. Cut or say the real outcome.",
  },
  {
    id: "unlock",
    severity: "medium",
    re: /\bunlock\b/i,
    note: "Often empty. Prefer get / open / enable with a concrete object.",
  },
  {
    id: "game-changer",
    severity: "high",
    re: /\bgame[-\s]?chang(er|ing)\b/i,
    note: "Banned hype.",
  },
  {
    id: "cutting-edge",
    severity: "high",
    re: /\bcutting[-\s]?edge\b/i,
    note: "Banned hype.",
  },
  {
    id: "ever-evolving",
    severity: "high",
    re: /\bever[-\s]?evolving\b/i,
    note: "AI filler.",
  },
  {
    id: "its-worth-noting",
    severity: "high",
    re: /\bit'?s\s+worth\s+noting\b/i,
    note: "Just say the note.",
  },
  {
    id: "at-the-end-of-the-day",
    severity: "high",
    re: /\bat\s+the\s+end\s+of\s+the\s+day\b/i,
    note: "Delete.",
  },
  {
    id: "dive-into",
    severity: "medium",
    re: /\b(deeper\s+)?dive\s+into\b/i,
    note: 'Prefer "look at" / "cover" / link without the dive.',
  },
  {
    id: "lets-explore",
    severity: "high",
    re: /\blet'?s\s+explore\b/i,
    note: "AI tour-guide. Just explain.",
  },
  {
    id: "whether-youre",
    severity: "medium",
    re: /\bwhether\s+you'?re\b/i,
    note: "Often a false duality. Split into two sentences or cut.",
  },
  {
    id: "not-just-x-but",
    severity: "medium",
    re: /\bnot\s+just\s+.+\s+but\s+(also\s+)?/i,
    note: "Common AI rhythm. Prefer one clear claim.",
  },
  {
    id: "more-than-just",
    severity: "medium",
    re: /\bmore\s+than\s+just\b/i,
    note: "Often empty. Say what it actually is.",
  },
  {
    id: "designed-to",
    severity: "medium",
    re: /\bdesigned\s+to\s+(help|empower|enable|allow)\b/i,
    note: "Corporate purpose fluff. Say the outcome.",
  },
  {
    id: "perfect-for-anyone",
    severity: "high",
    re: /\bperfect\s+for\s+anyone\b/i,
    note: "Means nothing. Name who it is for.",
  },
  {
    id: "empower",
    severity: "medium",
    re: /\bempower(s|ed|ing)?\b/i,
    note: "Corporate. Prefer concrete verbs.",
  },
  {
    id: "foster",
    severity: "medium",
    re: /\bfoster(s|ed|ing)?\b/i,
    note: "Corporate. Prefer build / support.",
  },
  {
    id: "holistic",
    severity: "medium",
    re: /\bholistic\b/i,
    note: "Wellness cliche unless quoting a real therapy label.",
  },
  {
    id: "journey-metaphor",
    severity: "medium",
    re: /\b(fitness|wellness|healing|transformation)\s+journey\b/i,
    note: "Metaphor fatigue. Say the program/class.",
  },
  {
    id: "vibrant-community",
    severity: "high",
    re: /\bvibrant\s+community\b/i,
    note: "Startup brochure. Cut.",
  },
  {
    id: "genuinely-honestly",
    severity: "medium",
    re: /\b(genuinely|honestly|straightforwardly)\b/i,
    note: "Heat/seo voice rule: drop filler adverbs unless needed.",
  },
  {
    id: "em-dash",
    severity: "high",
    re: /\u2014/,
    note: "Em dash banned in public Heat/Sebastian copy. Use hyphen, colon, or split.",
  },
  {
    id: "fits-into-it",
    severity: "high",
    re: /\bfits\s+into\s+(it|this|that)\b/i,
    note: "Vague wrap-up. Name the product and what it does.",
  },
  {
    id: "here-is-what",
    severity: "medium",
    re: /\bhere\s+is\s+what\s+(is\s+happening|you\s+need|we\s+mean)\b/i,
    note: "AI throat-clear. Start with the content.",
  },
];

function walk(dir, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const ent of entries) {
    if (ent.name.startsWith(".") && ent.name !== ".md") {
      if (SKIP_DIRS.has(ent.name)) continue;
    }
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(full, out);
    } else if (EXTS.has(path.extname(ent.name))) {
      out.push(full);
    }
  }
  return out;
}

function scanFile(file) {
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/);
  /** @type {{ file: string, line: number, id: string, severity: string, match: string, note: string }[]} */
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // skip import-only lines
    if (/^\s*import\s+/.test(line)) continue;
    for (const rule of RULES) {
      const m = line.match(rule.re);
      if (m) {
        hits.push({
          file: path.relative(ROOT, file),
          line: i + 1,
          id: rule.id,
          severity: rule.severity,
          match: m[0],
          note: rule.note,
        });
      }
    }
  }
  return hits;
}

const start = onlyPath
  ? path.resolve(ROOT, onlyPath)
  : path.resolve(ROOT, "src");
if (!fs.existsSync(start)) {
  console.error(`Path not found: ${start}`);
  process.exit(2);
}

const files = fs.statSync(start).isFile() ? [start] : walk(start);
const allHits = files.flatMap(scanFile);
const high = allHits.filter((h) => h.severity === "high");
const medium = allHits.filter((h) => h.severity === "medium");

function printHits(list, label) {
  if (!list.length) return;
  console.log(`\n## ${label} (${list.length})`);
  for (const h of list) {
    console.log(`${h.file}:${h.line}  [${h.id}] "${h.match}"`);
    if (fixHints) console.log(`    → ${h.note}`);
  }
}

console.log(`slop-detect: scanned ${files.length} files under ${path.relative(ROOT, start) || "."}`);
printHits(high, "HIGH");
printHits(medium, "MEDIUM");

const fail = high.length > 0 || (strict && medium.length > 0);
console.log(
  `\nsummary: high=${high.length} medium=${medium.length} ${fail ? "FAIL" : "OK"}`,
);
process.exit(fail ? 1 : 0);
