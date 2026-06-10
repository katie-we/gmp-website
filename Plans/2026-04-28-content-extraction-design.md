---
title: Content Extraction Design — Workshop Website
date: 2026-04-28
tags:
  - growth-mindset
  - website
  - design
  - workshop
---

# Content Extraction Design

> [!summary]
> Pull the content data (letters archive, course catalog, testimonials, stats, About essay) out of the JSX page files and into clean config files + one Markdown file. Add a `SITE_GUIDE.md` cookbook so any future Claude session can edit the site fast and safe. No build step, no migration, no monthly cost.

## Goal

Make weekly content updates (new letters, new testimonials, subscriber-count changes, About-copy rewrites) **fast, safe, and obvious** — both for me (Claude) editing on Katie's behalf, and for any future session picking up the project cold.

## Why

Today, content lives mixed inside JSX page files:

- 50 letters in `scripts/letters.jsx`
- 6 mini-courses, 8 curriculum modules, 3 testimonials, 6 FAQs in `scripts/course.jsx`
- A long-form essay in `scripts/about.jsx`
- Subscriber count `4,820` repeated in 5+ places across files
- Pricing `$497`/`$97`/`$597` repeated across homepage, course page, and FAQ

**Two problems with this:**

1. **Risk** — editing JSX strings in a 16KB component file means one stray bracket can break a page. Every edit is a small landmine.
2. **Friction** — to change the subscriber count, I have to grep across files and update 5 spots. To add a letter, I have to copy a 7-line object literal into a JSX array and not break the brackets. Adds up over time.

Pulling content out into clean files solves both: lower edit risk (touch one focused file, not a sprawling component), and one-line edits propagate everywhere.

## Non-goals

- Not migrating to a CMS (Webflow/Framer/Sanity). Decided in brainstorm — would actually make Claude editing harder.
- Not adding a build step (no Vite, Webpack, etc.). Site stays React+Babel-in-browser.
- Not rewriting layouts. Page components keep their JSX structure; only the data they read changes.
- Not extracting design configs (V6_VOICE / V6_ENERGY / V6_FRAME). Those are design system, not content.
- Not extracting individual page hero copy. Once-per-page metadata, no duplication risk, fine inline.

## Architecture

A new `content/` folder at the project root, sibling to `scripts/`, `styles/`, `assets/`.

```
Website/
├── content/                    ← NEW
│   ├── site.js                 ← Global stats, prices, brand, year, location
│   ├── practices.js            ← The 6 practices (full data; homepage reads a short version, Practices page reads the full version — both from this file)
│   ├── letters.js              ← Letter tags + archive (starts ~5 entries)
│   ├── courses.js              ← Minis, curriculum, FAQ, flagship pricing
│   ├── testimonials.js         ← Testimonials array
│   ├── about.js                ← About page metadata (hero, TOC, photos, stats, end card)
│   └── about.md                ← About essay body (Markdown prose)
├── SITE_GUIDE.md               ← NEW — cookbook for Claude
├── index.html                  ← (existing, updated to load content/*.js)
├── practices.html              ← (existing, updated)
├── letters.html                ← (existing, updated)
├── course.html                 ← (existing, updated)
├── about.html                  ← (existing, updated, also loads marked.js)
├── scripts/                    ← (existing, components updated to read from window.GMP)
├── styles/                     ← (no changes)
└── assets/                     ← (no changes)
```

### How content files plug in

The site uses Babel-in-browser, no module system. Pattern: each content file exposes its data on a single global `window.GMP` namespace.

**Example — `content/site.js`:**

```js
window.GMP = window.GMP || {};
window.GMP.site = {
  brand: "Growth Mindset Parenting",
  brandShort: "GMP",
  author: "Sean Kane",
  location: "Chicago, IL",
  year: 2026,

  stats: {
    subscribers: 4820,
    parentsEnrolled: 1240,
    yearsTeaching: 12,
    sons: 3,
    practiceCount: 6,
    flagshipModules: 8,
    flagshipLessons: 43
  },

  pricing: {
    flagship: "$497",
    flagshipInstallments: "3 × $179",
    mini: "$97",
    bundle: "$597"
  }
};
```

**Example — `content/letters.js`:**

```js
window.GMP = window.GMP || {};
window.GMP.letters = {
  tags: [
    { id: "all", label: "All" },
    { id: "essay", label: "Essays" },
    { id: "note", label: "Sunday notes" },
    // … (counts computed live from the archive at render time)
  ],
  archive: [
    {
      year: 2026,
      feat: { /* one image-led featured essay, optional */ },
      rows: [
        { type: "note", date: { d: "Apr", n: "26" }, tag: "Sunday note", title: "...", meta: "3 min" },
        // … (~5 placeholder entries at launch, grows weekly)
      ]
    }
  ],
  mostRead: ["Be the weather", "Three to one, explained", "Co-parenting like a teaching team"]
};
```

### How HTML loads content files

Each page's HTML loads content files **before** page scripts:

```html
<!-- letters.html (example) -->
<script type="text/babel" src="content/site.js"></script>
<script type="text/babel" src="content/letters.js"></script>
<script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
<script type="text/babel" src="scripts/letters.jsx"></script>
```

All scripts use `type="text/babel"` so Babel-standalone processes them in DOM order. Mixing plain `<script>` and `type="text/babel"` would break ordering — content files use `type="text/babel"` even though they contain no JSX (transpilation is a no-op for plain JS, and ordering stays sane). By the time `letters.jsx` runs, `window.GMP.site` and `window.GMP.letters` are populated.

**Which content files load on which page:**

| Page | Content files needed |
|---|---|
| `index.html` | `site.js`, `practices.js` |
| `practices.html` | `site.js`, `practices.js` |
| `letters.html` | `site.js`, `letters.js` |
| `course.html` | `site.js`, `courses.js`, `testimonials.js` |
| `about.html` | `site.js`, `about.js` (+ `marked.js` CDN, fetches `about.md` at runtime) |

### How page components consume content

**Before (today):**

```jsx
const LETTERS_2026 = { year: "2026", rows: [ /* 11 entries inline */ ] };
const LETTERS_2025 = { /* 29 entries inline */ };
const LETTERS_2024 = { /* 11 entries inline */ };
const LETTERS = [LETTERS_2026, LETTERS_2025, LETTERS_2024];
```

**After:**

```jsx
const { archive: LETTERS, tags: LETTER_TAGS, mostRead } = window.GMP.letters;
const { stats } = window.GMP.site;
// rest of component unchanged
```

Same render logic, different data source.

### About page — the Markdown wrinkle

About is the one page with long-form prose, not just structured data. Two-file approach:

- **`content/about.js`** — structured metadata (hero copy, TOC anchors, figure photos, stats strip, end-card CTA)
- **`content/about.md`** — the essay body in pure Markdown

`about.html` adds one CDN script tag for [marked.js](https://marked.js.org/) (~30KB, standard Markdown parser):

```html
<script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js"></script>
```

`about.jsx` fetches `about.md`, parses with `marked()`, drops the resulting HTML into the prose container via `dangerouslySetInnerHTML`. Section anchors (`#room-214`, `#kitchen`, etc.) are preserved because Markdown headings + a slugifier produce the same `id`s the TOC links to.

> [!note] Why Markdown for About specifically
> Sean's a writer; he writes drafts in Markdown-or-similar prose format. Pasting a new About essay = drop it in `about.md`. Surgical edits ("rewrite the third paragraph of Kitchen Table") = find the section, edit the line. Both modes feel native.

### Letters at low volume — graceful scaling

Katie flagged: launch will have ~5 letters, not 50. The page already renders any volume; we make these adjustments to look right at low N:

- **Pagination row** hides when archive fits on one page (default threshold: 12 entries)
- **Year-grouped sections** still render — at launch all entries are in 2026, so just one year shows
- **Tag filter counts** compute live from the archive, so they grow with content (no hardcoded "Essays · 18")
- **Most-read sidebar** shows up to 4 entries; capped by `mostRead` array length

These are small conditional renders inside `letters.jsx`. No layout changes.

## SITE_GUIDE.md

A one-page cookbook at the project root. Loaded by future Claude sessions as their first read. Sections:

### File map
Where each thing lives, in plain English. Quick orientation.

### How to… cookbook
The handful of common asks, with the exact file + field to edit:

- **Add a Sunday letter** → append to `content/letters.js` → `archive[0].rows`
- **Mark a letter as featured** → move to `archive[0].feat`
- **Change subscriber count** → `content/site.js` → `stats.subscribers`
- **Update a course price** → `content/site.js` → `pricing`
- **Add a testimonial** → append to `content/testimonials.js`
- **Update an FAQ answer** → `content/courses.js` → `faq`
- **Rewrite an About section** → `content/about.md`, find the `## section` heading
- **Update About stats strip** → `content/about.js` → `stats`
- **Swap a photo** → drop new file in `assets/`, update path in the relevant content file
- **Add a new mini-course** → `content/courses.js` → `minis`
- **Tweak the homepage hero copy** → `scripts/v6-workshop.jsx` → `V6_VOICE.friendly` (still inline because it's design-tied)

### Conventions
- Theme is `terracotta` (active selector is the `.theme-terracotta` class on `<body>`, defined in `styles/themes.css`; the `data-theme` attribute on `<html>` is decorative)
- Paths are flat — pages and content folders sit at the project root
- Subscriber count, pricing, etc. live in `content/site.js` ONLY — never hardcode in JSX
- Photo files: `assets/sean-{hero|studio|teaching|square|candid|wide}.jpg` (all six exist)

### Don't do this
- Don't edit JSX strings directly when a content file holds the data
- Don't break the script load order in HTML (content files MUST load before page scripts)
- Don't introduce build steps, bundlers, or module imports — site is React+Babel-in-browser by design
- Don't hardcode counts/prices in components — read from `window.GMP.site`

### Mobile note (preview of next spec)
Site is desktop-first today (1440px). Mobile optimization is the next workstream — separate spec.

## Migration order

Low-risk to higher-risk; each step independently testable.

1. **Create `content/` folder + write all content files.** No HTML changes yet, no JSX changes yet. The content files are written but not loaded.
2. **Update HTML files to load content scripts** in the right order, before page scripts. Page components still use their inline data; content files load but go unused.
3. **Migrate one page at a time** — letters → courses → about → site-globals. Each migration: change the page component to read from `window.GMP.*`, delete the inline data, verify in browser. If anything breaks, revert that page only.
4. **Migrate cross-cutting globals** — subscriber counts, prices, brand strings — last. These appear in multiple files; one careful sweep with explicit before/after grep.
5. **Write `SITE_GUIDE.md`** — last, after migration is verified, so the doc reflects reality.

Each step is reversible by reverting one file. No single step touches more than 2-3 files.

## Risks

- **Script load order bugs.** If `content/letters.js` loads after `scripts/letters.jsx`, the data isn't ready when the component mounts → blank page. Mitigation: explicit script ordering in HTML, smoke test each page after its migration.
- **About page Markdown rendering.** `marked.js` from CDN could fail to load → blank essay body. Mitigation: fallback message if `window.marked` is undefined, plus a visible "Loading…" state. Low risk — marked.js is tiny and CDN is reliable.
- **Slug mismatch on About TOC anchors.** Markdown-generated heading `id`s must match the TOC's `href`s. Mitigation: hand-set heading slugs in the Markdown (use HTML headings with explicit `id`s, or use marked's `gfm` slug option that matches the existing pattern).

## Open questions

None — all decisions made in brainstorm. Ready to plan implementation.

## What this design enables next

- Mobile optimization spec (next, bigger workstream)
- Possible future: a "letter detail" page (one URL per letter, full essay body) — content layer is already structured for it
- Possible future: hooking content files to a real CMS at scale (Sanity/Tina) — content layer is the right shape; only the loader changes
