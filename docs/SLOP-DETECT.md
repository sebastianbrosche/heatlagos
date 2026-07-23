# Content slop detector

Phrase-level scan for AI-brochure copy (Heat / Sebastian voice rules).

## Run (this repo)

```bash
npm run slop
npm run slop:strict
node scripts/slop-detect.mjs --path src/app/blog --fix-hints
```

Exit **1** if any **HIGH** hits. `--strict` also fails on MEDIUM.

## Global (any project)

```bash
node C:\Users\Admin\scripts\slop-detect.mjs --path src --fix-hints
```

Uses project `scripts/slop-detect.mjs` when present, else `C:\Users\Admin\scripts\slop-detect-core.mjs`.

## Agent rule

Before shipping blog or marketing copy: run `npm run slop` (or global script) and clear HIGH hits. Prefer rewriting HIGH before merge/deploy.

## Examples of HIGH (must rewrite)

| Bad | Better |
|-----|--------|
| Pilates Strong is our answer to this shift | What Pilates Strong is: mat Pilates + 1–5kg weights… |
| our version of this | Name the product and what it does |
| in today's world / in a world where | Delete; start with a fact |
| delve / seamlessly / game-changer / cutting-edge | Delete or concrete verb |
| em dash (—) | Hyphen, colon, or split sentence |

MEDIUM (landscape, genuinely, holistic, dive into) is noise worth cleaning over time; not always wrong (e.g. "contrast journey" as product name).
