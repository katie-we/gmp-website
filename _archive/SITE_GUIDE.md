# Site Guide — Workshop Website

> **For future Claude sessions:** Read this first before editing the site. It tells you where everything lives and how to make safe edits.

## File map

```
Website/
├── content/                       ← edit me
│   ├── site.js                    ← global stats, prices, brand
│   ├── practices.js               ← the 6 practices
│   ├── letters.js                 ← letters archive (grows weekly)
│   ├── courses.js                 ← course catalog + FAQ
│   ├── testimonials.js            ← testimonials (grows)
│   ├── about.js                   ← About page metadata
│   └── about.md                   ← About essay body (Markdown)
├── *.html                         ← page entry points (rarely edit)
├── scripts/*.jsx                  ← page components (rarely edit; design-tied)
├── styles/*.css                   ← visual design (edit for styling changes)
└── assets/*.jpg                   ← Sean's photos
```

The pattern: **content/ is for content, scripts/ is for components, styles/ is for design.**

## How to…

| Want to… | Edit this file | Then edit |
|---|---|---|
| Add a Sunday letter | `content/letters.js` | Prepend an object to `archive[0].rows` |
| Mark a letter as featured | `content/letters.js` | Move it to `archive[0].feat` (one feat per year max) |
| Change subscriber count | `content/site.js` | Update `stats.subscribers` AND `formatted.subscribers` |
| Update a course price | `content/site.js` | Update `pricing.flagship` / `pricing.mini` / `pricing.bundle` |
| Add a testimonial | `content/testimonials.js` | Append `{stars, quote, name, meta}` |
| Update an FAQ answer | `content/courses.js` | Find the entry in `faq` and edit `q` or `a` |
| Add a new mini-course | `content/courses.js` | Append to `minis` |
| Rewrite an About section | `content/about.md` | Find the `<h2 id="...">` heading; edit the prose below it |
| Change About stats labels | `content/about.js` | Edit `statsLabels` (numbers come from site.js) |
| Swap a photo | `assets/` + relevant content file | Drop new file in `assets/`, update path |
| Tweak homepage hero copy | `scripts/v6-workshop.jsx` | Edit `V6_VOICE.friendly.{eyebrow,pre,em,post,mark,subhead,ctaP,ctaS,sundayEyebrow,sundayH,sundayP}` (this is a writing-posture choice, not a stat — stays inline) |
| Change theme accent color | `styles/themes.css` | Edit `.theme-terracotta` block (or set body class to a different theme) |

## Conventions

- **Theme:** `terracotta` is active. Defined in `styles/themes.css`. Activated by `.theme-terracotta` class on `<body>` (the `data-theme` attribute on `<html>` is decorative).
- **Single source of truth:** subscriber count, parent count, prices, lesson counts live in `content/site.js` ONLY. Read everywhere else.
- **Photos:** all in `assets/`. Available files: `sean-{hero,studio,teaching,square,candid,wide}.jpg`.
- **Theme accent variable:** `var(--accent)` resolves to terracotta (the orange-clay tone).
- **Local server:** `cd Website && python3 -m http.server 8765`. Visit http://localhost:8765/.
- **Subscriber count substitution:** The homepage's `V6_VOICE` presets bake in `4,820` as a literal in copy strings. At render time, a `subSwapAll` helper replaces `4,820`/`4820` with `window.GMP.site.formatted.subscribers`. So when you bump the count in `site.js`, all V6_VOICE strings auto-update.

## Don't do this

- ❌ **Don't edit JSX strings** when a content file holds the data. If you find yourself editing `scripts/letters.jsx` to add a letter, stop — go to `content/letters.js` instead.
- ❌ **Don't break the script load order** in HTML files. Content scripts (`content/*.js`) MUST appear BEFORE page scripts (`scripts/*.jsx`). All scripts use `type="text/babel"` so Babel-standalone runs them in DOM order.
- ❌ **Don't introduce build steps** (Vite, Webpack, esbuild). The site is React + Babel-in-browser by design — non-technical owner, no build pipeline.
- ❌ **Don't hardcode counts or prices** in components. Read from `window.GMP.site`.
- ❌ **Don't delete or rename `assets/`** files without updating their references in content files.
- ❌ **Don't edit the design system configs** (`V6_VOICE` / `V6_ENERGY` / `V6_FRAME` in `scripts/v6-workshop.jsx`) for stat updates — those are A/B variants of writing posture, not content. Update `content/site.js` instead.

## Architecture note

Each content file exposes data on `window.GMP.<namespace>`:

- `window.GMP.site` (stats, pricing, brand, formatted)
- `window.GMP.practices` (6 practices, full data)
- `window.GMP.letters` (tags, archive, mostRead)
- `window.GMP.courses` (flagship, minis, curriculum, faq)
- `window.GMP.testimonials` (array)
- `window.GMP.about` (metadata; body is fetched from `content/about.md`)

Page components destructure from `window.GMP` at the top of their function bodies. No imports, no module system — keeps the site Babel-in-browser friendly.

## Mobile note

Site is desktop-first today (1440px). Mobile optimization is a separate workstream — see `Plans/` for the mobile design + plan when it's written.

## Common pitfalls

- **The 4,820 trap:** `V6_VOICE` presets in `scripts/v6-workshop.jsx` literally contain "4,820" because the design-tool source baked it in. Don't be fooled into thinking it's hardcoded — it's substituted at render via `subSwapAll`. To change the number, edit `content/site.js`.
- **The pagination trap:** Letters page hides pagination when `archive.length <= PAGINATION_THRESHOLD` (12). Don't add pagination markup — when the archive grows past 12, it appears automatically.
- **The TOC slug trap:** About page TOC anchors must match the heading `id`s in `content/about.md`. The Markdown file uses **explicit `<h2 id="...">` HTML** (not `## Heading`) to guarantee slug stability. If you change a heading text, keep the id.
- **The grep trap when verifying:** Headless Chrome's `--dump-dom` includes the entire script source (Babel-compiled JSX) in the output. So `grep "v6-letters-pager"` may return hits even when the element is conditionally hidden. To check actual rendered DOM, grep for `class="v6-..."` (rendered HTML attribute) not `className: "v6-..."` (Babel-compiled JS object key).

## Plans

- `Plans/2026-04-28-content-extraction-design.md` — design doc for this content layer
- `Plans/2026-04-28-content-extraction-plan.md` — implementation plan executed 2026-04-28
- (next) `Plans/YYYY-MM-DD-mobile-optimization-design.md` — mobile responsive workstream
