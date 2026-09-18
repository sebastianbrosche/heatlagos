#!/usr/bin/env node
/**
 * Heat pricing deletion lock.
 *
 * Fails if a public Yearly 990 new-sale path is back in marketing source
 * or the static export. Also fails if banned 2-week unlimited or month-13
 * free copy is restored as a customer-facing offer.
 *
 * Usage:
 *   node scripts/pricing-deletion-lock.mjs
 *   node scripts/pricing-deletion-lock.mjs --path src
 *   node scripts/pricing-deletion-lock.mjs --path out
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const args = process.argv.slice(2);
const pathIdx = args.indexOf("--path");
const onlyPath = pathIdx >= 0 ? args[pathIdx + 1] : null;

const EXTS = new Set([".tsx", ".ts", ".jsx", ".js", ".html", ".json"]);
const SKIP_DIRS = new Set([
  "node_modules",
  ".next",
  "dist",
  ".git",
  "coverage",
  ".agents",
  "my-agent",
  "tasks",
  "docs",
  "workers",
]);

/** @type {{ id: string, re: RegExp, note: string }[]} */
const RULES = [
  {
    id: "cta-yearly",
    re: /cta-yearly/,
    note: "Public Yearly buy CTA id must stay off the marketing site.",
  },
  {
    id: "pass-751518",
    re: /751518/,
    note: "BSport pass for the prepaid annual deal must not be linked publicly.",
  },
  {
    id: "product-796836",
    re: /796836/,
    note: "BSport product for the prepaid annual deal must not be linked publicly.",
  },
  {
    id: "yearly-membership-offer",
    re: /Yearly Membership/,
    note: "JSON-LD / copy must not sell Yearly Membership.",
  },
  {
    id: "990-price",
    re: /990\s*€|990€|990\s*EUR/i,
    note: "Public 990 new-sale price must stay off heatlagos.com.",
  },
  {
    id: "schema-990",
    re: /["']price["']\s*:\s*["']990["']|price:\s*["']990["']/,
    note: "Schema Offer must not list price 990.",
  },
  {
    id: "join-now-yearly",
    re: /Join now - Yearly/,
    note: "Join now overlay must not target Yearly.",
  },
  {
    id: "marquee-yearly",
    re: /Yearly\s*·/,
    note: "Marquee ticker must not sell Yearly.",
  },
  {
    id: "banned-2wk-pass",
    re: /751566/,
    note: "Do not restore the banned 2 weeks unlimited pass checkout.",
  },
  {
    id: "banned-month-13",
    re: /Month 13 is free|Month 13 free/i,
    note: "Do not restore free month-13 / 12+1 customer copy.",
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
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name) || ent.name.startsWith(".")) continue;
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
  /** @type {{ file: string, line: number, id: string, match: string, note: string }[]} */
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const rule of RULES) {
      const m = line.match(rule.re);
      if (m) {
        hits.push({
          file: path.relative(ROOT, file),
          line: i + 1,
          id: rule.id,
          match: m[0],
          note: rule.note,
        });
      }
    }
  }
  return hits;
}

const targets = onlyPath
  ? [path.resolve(ROOT, onlyPath)]
  : [path.resolve(ROOT, "src"), path.resolve(ROOT, "out")].filter((p) =>
      fs.existsSync(p),
    );

if (!targets.length) {
  console.error("pricing-deletion-lock: no src/ or out/ to scan");
  process.exit(2);
}

const files = targets.flatMap((start) =>
  fs.statSync(start).isFile() ? [start] : walk(start),
);
const hits = files.flatMap(scanFile);

console.log(
  `pricing-deletion-lock: scanned ${files.length} files under ${targets
    .map((t) => path.relative(ROOT, t) || ".")
    .join(", ")}`,
);

if (hits.length) {
  console.log(`\n## FAIL (${hits.length})`);
  for (const h of hits) {
    console.log(`${h.file}:${h.line}  [${h.id}] "${h.match}"`);
    console.log(`    → ${h.note}`);
  }
  console.log("\nsummary: FAIL public banned sale path remains");
  process.exit(1);
}

console.log("\nsummary: OK no public Yearly 990 / banned intro sale path");
process.exit(0);
