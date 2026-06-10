---
title: Content Extraction Implementation Plan — Workshop Website
date: 2026-04-28
tags:
  - growth-mindset
  - website
  - plan
  - workshop
---

# Content Extraction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move all variable content (letters archive, course catalog, testimonials, site stats, About essay) out of JSX page files into clean `content/*.js` and `content/about.md` files; add a `SITE_GUIDE.md` cookbook so future Claude sessions can edit the site fast and safe.

**Architecture:** A new `content/` folder at the project root holds plain JS files that populate `window.GMP.<namespace>` globals. Each HTML page loads only the content files it needs, in DOM order before page scripts. Page components (`scripts/*.jsx`) stop defining inline data arrays and instead destructure from `window.GMP`. About page additionally loads `marked.js` from CDN and fetches `content/about.md` at runtime.

**Tech Stack:** React 18 + Babel-standalone (browser-only, no build step), CDN-loaded marked.js for Markdown parsing on About page. No test framework — verification is headless Chrome render + grep.

**Spec:** [`Plans/2026-04-28-content-extraction-design.md`](2026-04-28-content-extraction-design.md)

**Important repo notes:**
- This project is **not a git repository** — skip all commit steps. Verification by file inspection + browser render only.
- A local Python http server runs on **port 8765** (already running from prior session). If not running: `cd /Users/katiewest/Documents/Growth_Mindset/Website && python3 -m http.server 8765 &`
- Verification command for any page: `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/<page>.html"`

---

## File Structure (final state after this plan)

```
Website/
├── content/                       ← NEW
│   ├── site.js
│   ├── practices.js
│   ├── letters.js
│   ├── courses.js
│   ├── testimonials.js
│   ├── about.js
│   └── about.md
├── SITE_GUIDE.md                  ← NEW
├── index.html                     ← modified (loads site.js + practices.js)
├── practices.html                 ← modified (loads site.js + practices.js)
├── letters.html                   ← modified (loads site.js + letters.js)
├── course.html                    ← modified (loads site.js + courses.js + testimonials.js)
├── about.html                     ← modified (loads site.js + about.js + marked.js CDN)
├── scripts/
│   ├── v6-workshop.jsx            ← modified (reads window.GMP.practices, .site)
│   ├── v6-page-shell.jsx          ← unchanged
│   ├── practices.jsx              ← modified (reads window.GMP.practices)
│   ├── letters.jsx                ← modified (reads window.GMP.letters; graceful low-volume)
│   ├── course.jsx                 ← modified (reads window.GMP.courses, .testimonials, .site)
│   └── about.jsx                  ← modified (reads window.GMP.about; fetches about.md)
├── styles/                        ← unchanged
└── assets/                        ← unchanged
```

**Responsibility per file:**
- `content/site.js` — single source of truth for global stats, prices, brand, year, location
- `content/practices.js` — the 6 practices (homepage takes a slim subset, Practices page renders full)
- `content/letters.js` — letter tags + archive (5 placeholders at launch) + most-read list
- `content/courses.js` — flagship metadata, 6 mini-courses, 8 curriculum modules, 6 FAQs
- `content/testimonials.js` — testimonials array (3 placeholders, will grow)
- `content/about.js` — structured About page metadata (hero, TOC, figure, stats, end card)
- `content/about.md` — the essay body in pure Markdown
- `SITE_GUIDE.md` — root-level cookbook for editing

---

## Task 1: Scaffold `content/` folder and write `site.js`

**Files:**
- Create: `content/site.js`

- [ ] **Step 1: Create the folder**

```bash
mkdir -p /Users/katiewest/Documents/Growth_Mindset/Website/content
```

- [ ] **Step 2: Write `content/site.js`**

```js
/* Growth Mindset Parenting — global site config
   Single source of truth for stats, prices, brand strings.
   Update values here; they propagate everywhere. */

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
    flagshipLessons: 43,
    flagshipWorksheets: 9
  },

  pricing: {
    flagship: "$497",
    flagshipInstallments: "3 × $179",
    mini: "$97",
    bundle: "$597"
  },

  // Convenience: pre-formatted strings used in copy
  formatted: {
    subscribers: "4,820",
    parentsEnrolled: "1,240"
  }
};
```

- [ ] **Step 3: Syntax-check via Node**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/site.js
```

Expected: no output (success). Node accepts `window` as undefined-but-syntactically-valid identifier.

- [ ] **Step 4: Verify file is served**

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8765/content/site.js
```

Expected: `200`

---

## Task 2: Write `content/practices.js`

**Files:**
- Create: `content/practices.js`
- Source data: `scripts/practices.jsx:3-10` (full data) and `scripts/v6-workshop.jsx:128-135` (homepage subset)

- [ ] **Step 1: Write the file**

The full version (from `practices.jsx`) is the canonical source. The homepage shows a slimmed view (no `pull`, `script`, `time` fields). Single source — homepage maps over and selects fields it needs.

```js
/* Growth Mindset Parenting — the 6 practices
   Canonical source. Homepage and Practices page both read from here.
   Homepage uses the slim view (n, tag, title, body); Practices page
   uses the full view (adds pull, script, time). */

window.GMP = window.GMP || {};
window.GMP.practices = [
  {
    n: "01",
    tag: "Foundations",
    title: "Be the weather",
    body: "The mood you carry is the climate they live in. Calm parent, calm room — it's not magic, it's contagion, and it's the practice everything else rests on.",
    bodyShort: "The mood you carry is the climate they live in.",
    pull: "If you bring a storm, you'll get a storm back. Every time.",
    script: "Pause at the door. Three breaths. Walk in like the kind of person you'd want to live with.",
    time: "5–10 min, daily"
  },
  {
    n: "02",
    tag: "Regulation",
    title: "Use the cooler",
    body: "Adrenaline and cortisol don't write good consequences. The cooler is the gap between feeling and response — a deliberate pause where you stop reacting and start designing.",
    bodyShort: "Adrenaline and cortisol don't write good consequences. Pause, then design.",
    pull: "Hot decisions rot. Cool ones keep.",
    script: "“I hear you. I need a minute. We'll talk in five.” Then actually take five.",
    time: "When triggered"
  },
  {
    n: "03",
    tag: "Standards",
    title: "Inspect, don't expect",
    body: "Expectation is passive. Inspection is the work. Kids rise to what gets noticed and named, not what gets wished for from the couch.",
    bodyShort: "Expectation is passive. Inspection is the work.",
    pull: "What you tolerate, you teach. What you inspect, you raise.",
    script: "“Show me your plate. Show me your homework. Show me your shoes.” Cheerful, not punitive.",
    time: "Built into transitions"
  },
  {
    n: "04",
    tag: "Praise",
    title: "Three to one",
    body: "Three observations of growth for every correction. Name the behavior, not the kid. ‘You worked hard on that’ beats ‘you're so smart’ every time.",
    bodyShort: "Three observations of growth for every correction. Name the behavior.",
    pull: "Praise the move, not the trait.",
    script: "“You tried it twice before asking for help. That's exactly the muscle.”",
    time: "All day"
  },
  {
    n: "05",
    tag: "Skill-building",
    title: "I do, we do, you do",
    body: "Modeling is teaching. The fastest way to make a kid independent is to be embarrassingly explicit about how the thing is done, do it together, then step away.",
    bodyShort: "Modeling is teaching. Scaffold the skill, then step away.",
    pull: "Independence is taught. Confusion is what we hand them otherwise.",
    script: "“Watch me. Now do it with me. Now I'll watch you. I'll be in the next room.”",
    time: "20 min, once per skill"
  },
  {
    n: "06",
    tag: "Repair",
    title: "Bad moment, great opportunity",
    body: "Meltdowns are feedback loops. The repair afterward is the actual lesson — and it's the one that makes them brave enough to try the hard thing again tomorrow.",
    bodyShort: "Meltdowns are feedback loops. The repair is the lesson.",
    pull: "The lesson lives in the apology, not the argument.",
    script: "“I lost it earlier. Here's what I should have done. Can we try the rest of tonight again?”",
    time: "Within 2 hrs of rupture"
  }
];
```

- [ ] **Step 2: Syntax-check**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/practices.js
```

Expected: no output.

---

## Task 3: Write `content/letters.js` (5 placeholder entries)

**Files:**
- Create: `content/letters.js`
- Source data for placeholders: `scripts/letters.jsx:32-42` (took the 5 strongest current entries)

- [ ] **Step 1: Write the file**

```js
/* Growth Mindset Parenting — Letters archive
   Add new letters by appending to archive[0].rows.
   To feature a letter, move it to archive[0].feat (one per year).
   Tag counts compute live from the archive — don't hardcode. */

window.GMP = window.GMP || {};
window.GMP.letters = {
  // Tag definitions for the sidebar filter. The `n` count is computed live
  // from the archive at render time (do not hardcode counts here).
  tags: [
    { id: "all", label: "All" },
    { id: "essay", label: "Essays" },
    { id: "note", label: "Sunday notes" },
    { id: "regulation", label: "Regulation" },
    { id: "school", label: "School & teachers" },
    { id: "discipline", label: "Discipline" },
    { id: "marriage", label: "Co-parenting" },
    { id: "praise", label: "Praise" },
    { id: "boys", label: "Raising boys" }
  ],

  // Archive grouped by year. Newest year first.
  // At launch: 5 placeholder entries. Add new letters by prepending to rows.
  archive: [
    {
      year: 2026,
      meta: "the launch archive",
      feat: {
        n: "01",
        date: { d: "Mar", n: "29" },
        tag: "Essay · 7 min read",
        title: "Be the weather: why the parent's mood is the family's climate",
        dek: "If you bring a storm, you'll get a storm back. Every time. The most important practice, written plainly.",
        img: "assets/sean-teaching.jpg",
        meta: "Top of the archive"
      },
      rows: [
        {
          type: "note",
          date: { d: "Apr", n: "26" },
          tag: "Sunday note",
          title: "On the difference between a rule and a ritual",
          meta: "3 min · 12 replies"
        },
        {
          type: "note",
          date: { d: "Apr", n: "19" },
          tag: "Sunday note",
          title: "The two-minute repair script we use after every rupture",
          meta: "2 min"
        },
        {
          type: "essay",
          date: { d: "Apr", n: "12" },
          tag: "Essay · 8 min read",
          title: "What “inspect, don't expect” looks like at 7am with three kids and a packed lunch",
          dek: "The unsexy logistics of standards — a Tuesday morning, photographed.",
          meta: "Cited by Edutopia"
        },
        {
          type: "note",
          date: { d: "Apr", n: "5" },
          tag: "Sunday note",
          title: "Why I stopped saying “good job” — and what I say instead",
          meta: "3 min · popular"
        }
      ]
    }
  ],

  // Sidebar "Most-read" list. Update as the archive grows.
  mostRead: [
    "Be the weather",
    "What inspect-don't-expect looks like at 7am",
    "The two-minute repair script"
  ]
};
```

- [ ] **Step 2: Syntax-check**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/letters.js
```

Expected: no output.

---

## Task 4: Write `content/courses.js`

**Files:**
- Create: `content/courses.js`
- Source data: `scripts/course.jsx:3-44` (COURSE_MINIS, COURSE_CURRIC, COURSE_FAQ)

- [ ] **Step 1: Write the file**

```js
/* Growth Mindset Parenting — Course catalog
   Holds the flagship metadata, 6 mini-courses, 8 curriculum modules, FAQs.
   Pricing comes from content/site.js (single source of truth). */

window.GMP = window.GMP || {};
window.GMP.courses = {
  // Flagship metadata. Stable; rarely changes.
  flagship: {
    name: "Middle Skills",
    eyebrow: "The Course",
    tagline: "parent like a teacher.",
    pitch: "The full six-practice system, taught the way I taught seventh graders.",
    sub: "Eight modules. Forty-three video lessons. Nine worksheets. A 90-day plan you can actually run, plus a monthly office hour with me. Built for parents who want a system, not a slogan.",
    inclusions: [
      "43 video lessons across 8 modules",
      "9 printable worksheets & scripts",
      "90-day implementation plan",
      "Monthly live office hour with Sean",
      "Private parent community",
      "Lifetime access & updates"
    ]
  },

  // The 6 mini-courses (on-ramps to the flagship)
  minis: [
    { n: "01", tag: "Foundations · Mini", title: "Be the weather", body: "The four-week practice for the parent who wants the room to feel different by Friday.", weeks: "4 weeks", lessons: "12 lessons" },
    { n: "02", tag: "Regulation · Mini", title: "Use the cooler", body: "How to install the pause between feeling and response — and what to actually say in the gap.", weeks: "3 weeks", lessons: "9 lessons" },
    { n: "03", tag: "Standards · Mini", title: "Inspect, don't expect", body: "The unsexy logistics of standards. Eight rituals that move from hoping to noticing.", weeks: "4 weeks", lessons: "11 lessons" },
    { n: "04", tag: "Praise · Mini", title: "Three to one", body: "Praise the move, not the trait. The teacher's ratio that builds resilience without inflation.", weeks: "3 weeks", lessons: "9 lessons" },
    { n: "05", tag: "Skill-building · Mini", title: "I do, we do, you do", body: "Modeling is teaching. The scaffold that makes a kid independent in three steps and four weeks.", weeks: "4 weeks", lessons: "10 lessons" },
    { n: "06", tag: "Repair · Mini", title: "Bad moment, great opportunity", body: "Meltdowns are feedback. The repair script, the timing, and the language that closes the loop.", weeks: "3 weeks", lessons: "8 lessons" }
  ],

  // 8-module curriculum for the flagship
  curriculum: [
    { n: "01", title: "Be the weather",                desc: "Practice 01, taught from the ground up. Climate, contagion, and the parent's mood as the family's operating system.", lessons: ["The pause at the door", "Three breaths, two doorways", "Naming your own weather", "When the storm wins"] },
    { n: "02", title: "Use the cooler",                desc: "Practice 02 — the gap between feeling and response. The five-minute reset, scripts, and what to do when there's no time.", lessons: ["Hot decisions vs. cool decisions", "The 5-minute reset", "Scripts for no time", "Repair after a hot one"] },
    { n: "03", title: "Inspect, don't expect",         desc: "Practice 03 — standards that get noticed. Building rituals into transitions, the breakfast inspection, the morning loop.", lessons: ["Cheerful inspection", "The morning loop", "Standards on the go", "When standards slip"] },
    { n: "04", title: "Three to one praise",           desc: "Practice 04 — the ratio. Praise the move, not the trait. Catching the small wins. Making praise specific, brief, and frequent.", lessons: ["The ratio, explained", "Catching the small wins", "Specific, brief, frequent", "When praise stops working"] },
    { n: "05", title: "I do, we do, you do",           desc: "Practice 05 — the scaffold. Modeling, supported practice, and stepping away. The move from confusion to independence.", lessons: ["Modeling, embarrassingly", "Supported practice", "The hand-off", "What to do when they fall back"] },
    { n: "06", title: "Bad moment, great opportunity", desc: "Practice 06 — repair. The two-hour window, the script, the apology that lands. How rupture becomes the lesson.", lessons: ["The two-hour window", "The repair script", "Apology that lands", "Bringing the lesson forward"] },
    { n: "07", title: "The Sunday meeting",            desc: "How families plan a week without losing it. Twenty-five minutes, four agenda items, fewer arguments by Wednesday.", lessons: ["The 25-minute structure", "The four agenda items", "Running it with the kids", "When the meeting falls apart"] },
    { n: "08", title: "Putting it all together",       desc: "Your custom Middle Skills plan: the practices that fit your family, the rituals that make them stick, and the calendar that runs itself.", lessons: ["Your family's plan", "The 90-day calendar", "Office hours: 1:1 with Sean", "Graduation — what's next"] }
  ],

  // FAQ entries — append as questions come in
  faq: [
    { q: "Is this a self-paced course or a cohort?", a: "Both, slightly. Middle Skills is self-paced — lifetime access, work it on your schedule. But there's a live monthly office hour with Sean and a small private community where parents share what's working." },
    { q: "How is this different from your free Letters?", a: "The Letters are short, single-practice essays. Middle Skills is the whole system, taught from the ground up, with worksheets, scripts, video walkthroughs, and a 90-day plan you can actually run." },
    { q: "What ages does it work for?", a: "Roughly 4 to 14 — the practices are built for kids who can hold a brief conversation. They scale up and down, and they hold up across all three of mine (currently 6, 9, and 12)." },
    { q: "Do I need a partner to do this with me?", a: "No. About 40% of Middle Skills students enroll solo. The Sunday meeting and co-parenting modules have a track for solo and shared parenting both." },
    { q: "Is there a refund policy?", a: "Yes — 30 days, no questions, no funnels. If it isn't useful, write me; I'll send the money back the same day." },
    { q: "Can my school or parent group buy it as a group?", a: "Yes. There's a group rate for 10+ enrollments and a school license for libraries. Email me directly." }
  ]
};
```

- [ ] **Step 2: Syntax-check**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/courses.js
```

Expected: no output.

---

## Task 5: Write `content/testimonials.js`

**Files:**
- Create: `content/testimonials.js`
- Source data: `scripts/course.jsx:31-35` (COURSE_TESTI)

- [ ] **Step 1: Write the file**

```js
/* Growth Mindset Parenting — Testimonials
   Append new testimonials to the array as they come in.
   Course page renders the first 3; All-testimonials page (future) renders all. */

window.GMP = window.GMP || {};
window.GMP.testimonials = [
  {
    stars: 5,
    quote: "I read the practices on a Sunday and on Monday morning my house felt different. Not magic — just the first time I'd ever been given a script.",
    name: "Maria L.",
    meta: "Mom of two · Houston, TX"
  },
  {
    stars: 5,
    quote: "I'm a teacher too, and I kept thinking: this is the parent training I wish my kids' parents had. Sean writes like a colleague who's done both jobs.",
    name: "Daniel K.",
    meta: "Middle school teacher · Brooklyn, NY"
  },
  {
    stars: 5,
    quote: "The repair script alone was worth the price. We use it two or three times a week. The kids ask for it now — “can we do the redo?”",
    name: "Priya & Arjun S.",
    meta: "Parents of three · Toronto, ON"
  }
];
```

- [ ] **Step 2: Syntax-check**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/testimonials.js
```

Expected: no output.

---

## Task 6: Write `content/about.js` (metadata)

**Files:**
- Create: `content/about.js`
- Source data: `scripts/about.jsx` — extract hero, TOC, figure, stats, end-card; LEAVE the prose body for `about.md`

- [ ] **Step 1: Write the file**

```js
/* Growth Mindset Parenting — About page metadata
   Structured fields for the About page (everything except the essay body).
   The prose body lives in content/about.md. */

window.GMP = window.GMP || {};
window.GMP.about = {
  // Hero block
  hero: {
    eyebrow: "About Sean",
    h1Pre: "From ",
    h1Em: "room 214",
    h1Post: " to the kitchen table.",
    dek: "Twelve years teaching middle school. Three sons. One unshakeable conviction that the same growth-mindset practices that unlock kids in a classroom unlock them at home — just with fewer interruptions and better snacks."
  },

  // Hero portrait
  portrait: {
    src: "assets/sean-square.jpg",
    captionLine1: "Sean Kane · Chicago, IL",
    captionLine2: "Photo: Anna Sotelo, 2025"
  },

  // Sticky sidebar metadata
  sidebar: {
    readTime: "11 min",
    lastUpdated: "April 2026"
  },

  // TOC anchors. Each `id` MUST match the heading id rendered from about.md.
  toc: [
    { id: "room-214",   label: "i. Room 214" },
    { id: "what-worked", label: "ii. What worked there" },
    { id: "kitchen",    label: "iii. Kitchen table" },
    { id: "now",        label: "iv. Now" },
    { id: "contact",    label: "v. Get in touch" }
  ],

  // Two-photo figure embedded mid-essay (rendered by about.jsx after Markdown)
  // The figure is positioned by a placeholder anchor in about.md: <!--figure:classroom-desk-->
  figure: {
    anchor: "classroom-desk",
    leftSrc: "assets/sean-teaching.jpg",
    leftAlt: "Sean in the classroom",
    rightSrc: "assets/sean-studio.jpg",
    rightAlt: "At his desk",
    caption: "Left: room 214, fifth period, 2017. Right: where this newsletter actually gets written, six years later."
  },

  // Stats strip embedded mid-essay (rendered after the "Kitchen table" section)
  // Anchor in about.md: <!--stats-->
  // Numbers come from content/site.js — only labels live here.
  statsAnchor: "stats",
  statsLabels: [
    { statKey: "yearsTeaching",     label: "Years teaching middle school" },
    { statKey: "sons",              label: "Sons (Henry, Sam, Theo)" },
    { statKey: "subscribers",       label: "Sunday newsletter readers" },
    { statKey: "parentsEnrolled",   label: "Parents enrolled in Middle Skills" }
  ],

  // End-card CTA
  endCard: {
    eyebrow: "Start where you are",
    h2Pre: "One ",
    h2Em: "practice.",
    h2Post: " One Sunday. Free.",
    body: "Join {subscribers} parents and teachers who like their advice plainspoken. The Sunday letter takes three minutes to read and ten years to internalize. We're all working on it together.",
    primaryCta: "Subscribe, free",
    secondaryCta: "Or see the course",
    secondaryHref: "course.html"
  }
};
```

- [ ] **Step 2: Syntax-check**

```bash
node --check /Users/katiewest/Documents/Growth_Mindset/Website/content/about.js
```

Expected: no output.

---

## Task 7: Write `content/about.md` (essay body)

**Files:**
- Create: `content/about.md`
- Source data: `scripts/about.jsx:51-171` (prose paragraphs and h2 headings)

The Markdown file uses **explicit HTML headings with `id` attributes** to guarantee the TOC anchors match. Inline embeds for the figure and stats use HTML comments as anchors that `about.jsx` post-processes.

- [ ] **Step 1: Write the file**

```markdown
<h2 id="room-214">Room 214.</h2>

For twelve years I taught seventh-grade language arts in a public middle school on Chicago's north side. My classroom was room 214 — a corner room with bad lighting, a stubborn radiator, and thirty-one chairs that I rearranged the way other people rearrange furniture: weekly, hopefully, with strong opinions.

I loved that room. I loved that age. Seventh graders are widely considered to be the worst people on earth, but they are also, secretly, some of the most generous, curious, and unintentionally hilarious humans I've ever spent time with. They will tell you the truth about your lesson before you've finished writing the date on the board.

> What I learned in twelve years was simple: kids do not rise to what you wish for them. They rise to what you build, name, and inspect.

That is the entire job. It looks like a hundred small things — a routine for walking in the door, a phrase for praise, a pause before consequence, a script for apology — but the headline is the same. **Build the practices. Name them. Inspect them gently. Repair when they break.** Wishing is not a strategy. Yelling is the absence of one.

<h2 id="what-worked">What worked there.</h2>

Six practices kept showing up, year after year, room after room, kid after kid. They worked in honors classes and remedial classes; they worked with the kid who cried at her locker and the kid who set fire to a notebook (once, I want to be clear). They worked because they weren't about the kid — they were about the adult and the room.

<!--figure:classroom-desk-->

The practices aren't original. None of them are mine. I borrowed every single one from someone better — from Lemov, from Brooks-Gunn, from a school librarian named Mrs. Esparza who saved my career in 2014 by telling me to stop talking and start watching. What I did was sand them down to the version that worked with thirty seventh-graders on a Tuesday when the heat was out, and then write them down so I wouldn't forget.

<h2 id="kitchen">Kitchen table.</h2>

My eldest is named Henry. He was born during my fifth year of teaching, and for the first three years of his life, my wife and I parented him by guessing. We read the books. We did the bedtimes. We bought the right number of small wooden toys. He mostly turned out fine, in the way that kids of two well-meaning, sleep-deprived, extremely literate parents do.

Then his brother Sam was born, and three years later, Theo, and somewhere in the middle of that I noticed something embarrassing: I was a better teacher than I was a parent. The worst parts of my parenting were the parts where I'd forgotten to be the adult I was at school. I was wishing where I should have been inspecting. I was reacting where I should have been pausing. I was lecturing where I should have been modeling.

> My wife used to say I had an unfair advantage. I didn't. I had twelve years of practice with other people's kids.

So I took the practices home. I wrote them on an index card on the fridge. I taught them to Henry the way I'd taught poetry to a hundred seventh graders — embarrassingly explicitly, with humor, with patience, and with the underlying belief that he was capable of learning them. He was. They all are.

<!--stats-->

<h2 id="now">What I'm doing now.</h2>

In 2024 I left full-time teaching to write about all of this. The Sunday letter is the thing I'm proudest of: short, plainspoken, free, every Sunday, no funnels. The course — [Middle Skills](course.html) — is the full version of the system, taught from the ground up. The mini-courses are on-ramps; the flagship is the whole road.

I still substitute teach when my old school asks me to. I still believe that the classroom is the most underrated parenting research lab in the country. And I still rearrange the furniture in my own kitchen, weekly, hopefully, with strong opinions, while three sons watch me carry chairs around and ask me what I'm doing.

I tell them: I'm building the room.

<h2 id="contact">Get in touch.</h2>

I read every email. I take a small number of speaking engagements each year (schools, faith communities, parent groups, teacher trainings), and a smaller number of 1:1 coaching clients when my schedule allows. The fastest way to reach me is the Sunday letter — reply to any one and it lands in my inbox.
```

- [ ] **Step 2: Verify file is served**

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8765/content/about.md
```

Expected: `200`

---

## Task 8: Update HTML files to load content scripts

**Files:**
- Modify: `index.html`
- Modify: `practices.html`
- Modify: `letters.html`
- Modify: `course.html`
- Modify: `about.html`

**Important:** content scripts MUST appear BEFORE page scripts. All scripts use `type="text/babel"` so Babel-standalone executes them in DOM order.

- [ ] **Step 1: Update `index.html` — add site.js + practices.js**

In `index.html`, find this block:

```html
  <script type="text/babel" src="scripts/v6-workshop.jsx"></script>
```

Insert two lines BEFORE it:

```html
  <script type="text/babel" src="content/site.js"></script>
  <script type="text/babel" src="content/practices.js"></script>
  <script type="text/babel" src="scripts/v6-workshop.jsx"></script>
```

- [ ] **Step 2: Update `practices.html`**

Find:

```html
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/practices.jsx"></script>
```

Insert content scripts before:

```html
  <script type="text/babel" src="content/site.js"></script>
  <script type="text/babel" src="content/practices.js"></script>
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/practices.jsx"></script>
```

- [ ] **Step 3: Update `letters.html`**

Find:

```html
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/letters.jsx"></script>
```

Replace with:

```html
  <script type="text/babel" src="content/site.js"></script>
  <script type="text/babel" src="content/letters.js"></script>
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/letters.jsx"></script>
```

- [ ] **Step 4: Update `course.html`**

Find:

```html
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/course.jsx"></script>
```

Replace with:

```html
  <script type="text/babel" src="content/site.js"></script>
  <script type="text/babel" src="content/courses.js"></script>
  <script type="text/babel" src="content/testimonials.js"></script>
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/course.jsx"></script>
```

- [ ] **Step 5: Update `about.html` (also adds marked.js CDN)**

Find:

```html
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>

  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/about.jsx"></script>
```

Replace with:

```html
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/marked@12/marked.min.js" crossorigin="anonymous"></script>

  <script type="text/babel" src="content/site.js"></script>
  <script type="text/babel" src="content/about.js"></script>
  <script type="text/babel" src="scripts/v6-page-shell.jsx"></script>
  <script type="text/babel" src="scripts/about.jsx"></script>
```

- [ ] **Step 6: Smoke-test all 5 pages still render with inline data unchanged**

This is a no-op for behavior — content files are loaded but components still use inline data. Verify nothing broke.

```bash
for page in index practices letters course about; do
  code=$(/usr/bin/curl -s -o /dev/null -w "%{http_code}" "http://localhost:8765/$page.html")
  echo "$code  $page.html"
done
```

Expected: all `200`.

```bash
for page in index practices letters course about; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/$page.html" 2>/dev/null > "/tmp/${page}_dom.html"
  size=$(wc -c < "/tmp/${page}_dom.html")
  brand=$(grep -c "Growth Mindset Parenting" "/tmp/${page}_dom.html")
  echo "$page  size=$size  brand=$brand"
done
```

Expected: all pages render (size >40KB), all show "Growth Mindset Parenting" 4+ times. Same numbers as before this task.

---

## Task 9: Migrate `scripts/letters.jsx` to read from `window.GMP`

**Files:**
- Modify: `scripts/letters.jsx`

This is the highest-value migration (most growing content) and the biggest delete (50 entries → reads from content file).

- [ ] **Step 1: Replace inline data block + add graceful low-volume rendering**

Open `scripts/letters.jsx`. Replace lines 1-100 (everything from the top through `const LETTERS = [LETTERS_2026, LETTERS_2025, LETTERS_2024];`) with:

```jsx
/* global React */

// Letters page — reads archive from window.GMP.letters.
// Tag counts compute live from the archive; pagination hides at low volume.

const PAGINATION_THRESHOLD = 12;

function computeTagCounts(archive) {
  const counts = { all: 0, essay: 0, note: 0 };
  archive.forEach(year => {
    if (year.feat) {
      counts.all += 1;
      counts.essay += 1;
    }
    (year.rows || []).forEach(r => {
      counts.all += 1;
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
  });
  return counts;
}
```

- [ ] **Step 2: Update `V6LettersPage` to read from `window.GMP`**

Find the `function V6LettersPage()` block. Replace with:

```jsx
function V6LettersPage() {
  const { tags, archive: LETTERS, mostRead } = window.GMP.letters;
  const { stats, formatted } = window.GMP.site;
  const [tag, setTag] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const tagCounts = computeTagCounts(LETTERS);
  const totalLetters = tagCounts.all;
  const showPagination = totalLetters > PAGINATION_THRESHOLD;

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="letters" />

      <V6PageHead
        eyebrow="Letters"
        title="A Sunday note. An occasional <em>essay</em>. Plainspoken parenting, written by a teacher."
        meta={[
          { b: String(totalLetters), l: totalLetters === 1 ? "Letter in archive" : "Letters in archive" },
          { b: formatted.subscribers, l: "Subscribers" },
          { b: "Free", l: "Always" }
        ]}
      />

      <div className="v6-letters">
        <div className="v6-letters-feed">
          {LETTERS.map((y, yi) => (
            <section key={y.year}>
              <div className="v6-letter-year">
                <h2>{y.year}</h2>
                <span className="v6-letter-year-meta">{y.meta}</span>
              </div>
              {y.feat && <V6LetterFeat feat={y.feat} />}
              {y.rows.map((r, i) => <V6Letter row={r} idx={`${yi}-${i}`} key={`${yi}-${i}`} />)}
            </section>
          ))}

          {showPagination && (
            <div className="v6-letters-pager">
              <a href="#" className="v6-letters-pager-btn is-disabled">&larr; Newer</a>
              <a href="#" className="v6-letters-pager-btn is-current">1</a>
              <a href="#" className="v6-letters-pager-btn">Older &rarr;</a>
            </div>
          )}
        </div>

        <aside className="v6-letters-side">
          <div className="v6-letters-side-card">
            <h3>The Sunday Letter</h3>
            <p>One classroom-tested practice in your inbox, every Sunday. Free, plainspoken, unsubscribe in one click.</p>
            <form className="v6-letters-side-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="you@yourkitchen.com" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div>
            <div style={{
              fontFamily:'"Cormorant Garamond",Georgia,serif',
              fontStyle:'italic', fontSize:22, color:'var(--accent)',
              marginBottom:12
            }}>Filter the archive</div>
            <div className="v6-letters-side-tags">
              {tags.map(t => {
                const n = tagCounts[t.id] || 0;
                return (
                  <button key={t.id}
                    onClick={() => setTag(t.id)}
                    className={"v6-letters-side-tag" + (tag === t.id ? " is-active" : "")}>
                    {t.label}
                    {n > 0 && <span className="v6-letters-side-tag-n">{n}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          {mostRead && mostRead.length > 0 && (
            <div className="v6-letters-side-card" style={{background:'var(--card-sage)'}}>
              <h3>Most-read</h3>
              <ol style={{margin:0, paddingLeft:18, fontFamily:'"Source Serif 4",Georgia,serif', fontSize:14, lineHeight:1.5, color:'var(--ink)'}}>
                {mostRead.map((title, i) => <li key={i}>{title}</li>)}
              </ol>
            </div>
          )}
        </aside>
      </div>

      <V6PageFoot />
    </article>
  );
}

window.V6LettersPage = V6LettersPage;
```

- [ ] **Step 3: Render and verify**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/letters.html" 2>/dev/null > /tmp/letters_dom.html
echo "=== size ==="
wc -c /tmp/letters_dom.html
echo "=== meta numbers ==="
grep -oE '<b[^>]*>[^<]+</b><[^>]*>[^<]*Letter|Subscribers|Always' /tmp/letters_dom.html | head -10
echo "=== year sections ==="
grep -oE '<h2>2026' /tmp/letters_dom.html | wc -l
echo "=== letter rows ==="
grep -oE 'class="v6-letter\b' /tmp/letters_dom.html | wc -l
echo "=== pagination present? (should be 0 at <12 letters) ==="
grep -c "v6-letters-pager" /tmp/letters_dom.html
echo "=== feat present? ==="
grep -c "v6-letter-feat\b" /tmp/letters_dom.html
echo "=== tag counts (should compute live) ==="
grep -oE 'v6-letters-side-tag-n[^>]*>[0-9]+' /tmp/letters_dom.html | head -5
```

Expected:
- Size > 30KB
- "5" appears in meta box (4 rows + 1 feat = 5 total)
- "2026" appears as h2
- 4-5 letter rows + 1 feat
- Pagination block: 0 (we have 5 entries, threshold is 12)
- Tag counts: "all 5", "essay 2", "note 3"

---

## Task 10: Migrate `scripts/course.jsx` to read from `window.GMP`

**Files:**
- Modify: `scripts/course.jsx`

- [ ] **Step 1: Replace inline data block at top of file**

Open `scripts/course.jsx`. Replace lines 1-44 (everything from `/* global React */` through the end of `COURSE_FAQ`) with:

```jsx
/* global React */

// Course page — reads catalog and pricing from window.GMP.
// All numbers (lessons, modules, prices, parent count) come from content/site.js
// or content/courses.js — never hardcode.

const { flagship: COURSE_FLAGSHIP, minis: COURSE_MINIS, curriculum: COURSE_CURRIC, faq: COURSE_FAQ } = window.GMP.courses;
const COURSE_TESTI = window.GMP.testimonials;
```

- [ ] **Step 2: Update `V6CoursePage` to use site stats + pricing**

The component already references `COURSE_MINIS`, `COURSE_CURRIC`, `COURSE_FAQ`, `COURSE_TESTI` — those names are now imports above. Now also wire pricing and stats.

Find the `function V6CoursePage()` block. Update only the parts that reference hardcoded numbers/prices. Specifically:

(a) At the top of the function body, add:

```jsx
function V6CoursePage() {
  const { pricing, stats, formatted } = window.GMP.site;
  const flagshipPrice = pricing.flagship;            // "$497"
  const flagshipInst = pricing.flagshipInstallments; // "3 × $179"
  const miniPrice = pricing.mini;                    // "$97"
  const bundlePrice = pricing.bundle;                // "$597"
  // … rest of component
```

(b) Replace the V6PageHead `meta` array with the dynamic version:

```jsx
      <V6PageHead
        eyebrow={COURSE_FLAGSHIP.eyebrow}
        title={`${COURSE_FLAGSHIP.name} &mdash; <em>${COURSE_FLAGSHIP.tagline}</em>`}
        meta={[
          { b: flagshipPrice, l: `Or ${flagshipInst}` },
          { b: "Self-paced", l: "Lifetime access" },
          { b: "30-day", l: "Refund, no questions" }
        ]}
      />
```

(c) Replace the `v6-course-hero-meta-item` block to use `stats`:

```jsx
          <div className="v6-course-hero-meta">
            <div className="v6-course-hero-meta-item"><b>{stats.flagshipLessons}</b>Video lessons</div>
            <div className="v6-course-hero-meta-item"><b>0{stats.flagshipWorksheets}</b>Worksheets</div>
            <div className="v6-course-hero-meta-item"><b>90 days</b>Plan</div>
            <div className="v6-course-hero-meta-item"><b>{formatted.parentsEnrolled}</b>Parents enrolled</div>
          </div>
```

(d) Replace the `v6-course-hero-card` flagship card content. Find:

```jsx
          <div className="v6-course-hero-card-price">
            <span className="v6-course-hero-card-price-big">$497</span>
            <span className="v6-course-hero-card-price-meta">one-time &middot; or 3 &times; $179</span>
          </div>
```

Replace with:

```jsx
          <div className="v6-course-hero-card-price">
            <span className="v6-course-hero-card-price-big">{flagshipPrice}</span>
            <span className="v6-course-hero-card-price-meta">one-time &middot; or {flagshipInst}</span>
          </div>
```

(e) Replace the inclusions `<ul>` with the dynamic version:

```jsx
          <ul>
            {COURSE_FLAGSHIP.inclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
```

(f) Replace the enroll button price inside the card:

```jsx
          <a href="#" className="v6-cta v6-cta-primary" style={{justifyContent:'center'}}>
            Enroll &mdash; {flagshipPrice} <span className="v6-cta-arrow">&rarr;</span>
          </a>
```

(g) Replace the path-flag flagship card price block. Find:

```jsx
              <div className="v6-path-flag-price" style={{textAlign:'right'}}>
                <b>From the path</b>
                $497
              </div>
```

Replace with:

```jsx
              <div className="v6-path-flag-price" style={{textAlign:'right'}}>
                <b>From the path</b>
                {flagshipPrice}
              </div>
```

(h) Replace the bundle price line near it:

```jsx
              <span style={{fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic', fontSize:15, color:'var(--accent-soft)'}}>
                Or bundle all six minis for {bundlePrice}
              </span>
```

(i) Replace the mini-courses map to use `miniPrice`. Find the `COURSE_MINIS.map(m => ...)` block and update the price reference:

```jsx
              <div className="v6-path-mini-meta">
                <span>{m.weeks} &middot; {m.lessons}</span>
                <b>{miniPrice}</b>
              </div>
```

(j) Replace the curriculum h2 to use stats:

```jsx
          <h2 style={{
            fontFamily:'var(--sans)', fontWeight:800,
            fontSize:64, lineHeight:1, letterSpacing:'-0.03em',
            margin:'8px 0 16px', textWrap:'balance'
          }}>{stats.flagshipModules} modules. {stats.flagshipLessons} lessons. One whole system.</h2>
```

(k) Replace the testimonials h2:

```jsx
          <h2 style={{
            fontFamily:'var(--sans)', fontWeight:800,
            fontSize:56, lineHeight:1, letterSpacing:'-0.03em',
            margin:'8px 0 0', textWrap:'balance'
          }}>{formatted.parentsEnrolled} parents and counting. Here's what they've said.</h2>
```

(l) Update the testimonial card render to handle stars-as-number:

```jsx
          {COURSE_TESTI.map((t, i) => (
            <div className="v6-testi-card" key={i}>
              <div className="v6-testi-stars">{"★".repeat(t.stars)}</div>
              <blockquote className="v6-testi-q">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="v6-testi-attrib">
                <span className="v6-testi-attrib-name">{t.name}</span>
                <span className="v6-testi-attrib-meta">{t.meta}</span>
              </div>
            </div>
          ))}
```

(m) Update the enroll bar at the bottom:

```jsx
      <section className="v6-enroll">
        <div>
          <span style={{
            fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic',
            fontSize:24, color:'var(--accent)'
          }}>Ready when you are.</span>
          <h2>Enroll in <em>{COURSE_FLAGSHIP.name}.</em></h2>
          <p>Lifetime access. Monthly office hours. Private parent community. 30-day refund, no questions, no funnels.</p>
        </div>
        <div className="v6-enroll-cta">
          <a href="#" className="v6-cta v6-cta-primary" style={{justifyContent:'center', background:'var(--accent)'}}>
            Enroll &mdash; {flagshipPrice} <span className="v6-cta-arrow">&rarr;</span>
          </a>
          <a href="#" className="v6-cta v6-cta-ghost" style={{justifyContent:'center', color:'var(--paper)', borderColor:'var(--paper)'}}>
            Or {flagshipInst}
          </a>
        </div>
      </section>
```

- [ ] **Step 3: Render and verify**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/course.html" 2>/dev/null > /tmp/course_dom.html
echo "=== size ==="
wc -c /tmp/course_dom.html
echo "=== prices appear correctly ==="
grep -oE '\$497|\$97|\$597|3 × \$179' /tmp/course_dom.html | sort | uniq -c
echo "=== mini-courses (should be 6) ==="
grep -oE 'class="v6-path-mini\b' /tmp/course_dom.html | wc -l
echo "=== curriculum modules (should be 8) ==="
grep -oE 'class="v6-curric-mod\b' /tmp/course_dom.html | wc -l
echo "=== testimonials (should be 3) ==="
grep -oE 'class="v6-testi-card\b' /tmp/course_dom.html | wc -l
echo "=== FAQ (should be 6) ==="
grep -oE 'class="v6-faq-item\b' /tmp/course_dom.html | wc -l
echo "=== parents enrolled count ==="
grep -oE '1,240 parents' /tmp/course_dom.html | head -1
```

Expected: prices, 6 minis, 8 modules, 3 testimonials, 6 FAQs, "1,240 parents" appears.

---

## Task 11: Migrate `scripts/about.jsx` (Markdown rendering + content metadata)

**Files:**
- Modify: `scripts/about.jsx`

About is the most involved migration: structure replaced, Markdown body fetched and rendered, post-processed to insert figure + stats blocks.

- [ ] **Step 1: Replace the entire `V6AboutPage` component**

Open `scripts/about.jsx`. Replace the entire file with:

```jsx
/* global React */

// About page — reads structured metadata from window.GMP.about,
// fetches the prose body from content/about.md, parses with marked.js,
// and post-processes to insert figure + stats blocks at HTML comment anchors.

function V6AboutPage() {
  const ABOUT = window.GMP.about;
  const { stats, formatted } = window.GMP.site;
  const [bodyHtml, setBodyHtml] = React.useState("");
  const [loadError, setLoadError] = React.useState(null);

  React.useEffect(() => {
    if (!window.marked) {
      setLoadError("Markdown parser failed to load.");
      return;
    }
    fetch("content/about.md")
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(md => {
        const html = window.marked.parse(md);
        setBodyHtml(html);
      })
      .catch(err => setLoadError("Could not load essay: " + err.message));
  }, []);

  // Post-render: replace the figure and stats anchor comments with real DOM.
  // We do this by rendering the parsed HTML, then walking the DOM after mount.
  const proseRef = React.useRef(null);
  React.useEffect(() => {
    if (!proseRef.current || !bodyHtml) return;
    const html = proseRef.current.innerHTML;

    // Replace figure anchor with two-photo figure
    const figureHtml = `
      <figure>
        <img src="${ABOUT.figure.leftSrc}" alt="${ABOUT.figure.leftAlt}" />
        <img src="${ABOUT.figure.rightSrc}" alt="${ABOUT.figure.rightAlt}" />
        <figcaption>${ABOUT.figure.caption}</figcaption>
      </figure>
    `;

    // Replace stats anchor with stats strip (numbers from site.js)
    const statsItems = ABOUT.statsLabels.map(({ statKey, label }) => {
      const value = (formatted && formatted[statKey]) || stats[statKey];
      return `
        <div class="v6-about-stat">
          <b>${value}</b>
          <div class="v6-about-stat-l">${label}</div>
        </div>
      `;
    }).join("");
    const statsHtml = `<div class="v6-about-stats">${statsItems}</div>`;

    let updated = html
      .replace(`<!--figure:${ABOUT.figure.anchor}-->`, figureHtml)
      .replace(`<!--${ABOUT.statsAnchor}-->`, statsHtml);

    if (updated !== html) {
      proseRef.current.innerHTML = updated;
    }
  }, [bodyHtml]);

  // End-card body: substitute {subscribers}
  const endBody = ABOUT.endCard.body.replace("{subscribers}", formatted.subscribers);

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="about" />

      <section className="v6-about-hero">
        <div className="v6-about-hero-text">
          <span className="v6-page-head-eyebrow">{ABOUT.hero.eyebrow}</span>
          <h1>{ABOUT.hero.h1Pre}<em>{ABOUT.hero.h1Em}</em>{ABOUT.hero.h1Post}</h1>
          <p>{ABOUT.hero.dek}</p>
        </div>
        <div className="v6-about-hero-img" style={{backgroundImage:`url(${ABOUT.portrait.src})`}}>
          <div className="v6-about-hero-img-cap">
            <span>{ABOUT.portrait.captionLine1}</span>
            <span>{ABOUT.portrait.captionLine2}</span>
          </div>
        </div>
      </section>

      <section className="v6-about-essay">
        <aside className="v6-about-essay-side">
          <div>
            <b>{ABOUT.sidebar.readTime}</b>
            read
          </div>
          <div>
            <span style={{display:'block', fontWeight:600, color:'var(--ink)', marginBottom:6}}>Last updated</span>
            {ABOUT.sidebar.lastUpdated}
          </div>
          <div className="v6-about-essay-toc">
            <span style={{
              fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic',
              color:'var(--accent)', fontSize:18, marginBottom:8
            }}>Inside</span>
            {ABOUT.toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </aside>

        <div className="v6-about-prose" ref={proseRef}>
          {loadError ? (
            <p style={{color:'var(--ink-soft)', fontStyle:'italic'}}>{loadError}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: bodyHtml || "<p>Loading…</p>" }} />
          )}
        </div>

        <div></div>
      </section>

      <section className="v6-about-end">
        <span className="v6-page-head-eyebrow">{ABOUT.endCard.eyebrow}</span>
        <h2>{ABOUT.endCard.h2Pre}<em>{ABOUT.endCard.h2Em}</em>{ABOUT.endCard.h2Post}</h2>
        <p>{endBody}</p>
        <div style={{display:'inline-flex', gap:12}}>
          <a href="#" className="v6-cta v6-cta-primary">
            {ABOUT.endCard.primaryCta} <span className="v6-cta-arrow">&rarr;</span>
          </a>
          <a href={ABOUT.endCard.secondaryHref} className="v6-cta v6-cta-ghost">
            {ABOUT.endCard.secondaryCta}
          </a>
        </div>
      </section>

      <V6PageFoot />
    </article>
  );
}

window.V6AboutPage = V6AboutPage;
```

> [!note] Why two `useEffect` blocks
> The first fetches and parses the Markdown into `bodyHtml`. React renders that via `dangerouslySetInnerHTML`. The second runs AFTER that render, walks the resulting DOM, finds the figure/stats anchor comments, and replaces them with the structured blocks. Splitting it this way guarantees we operate on real mounted DOM, not a string before render.

- [ ] **Step 2: Render and verify**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=6000 "http://localhost:8765/about.html" 2>/dev/null > /tmp/about_dom.html
echo "=== size ==="
wc -c /tmp/about_dom.html
echo "=== TOC anchors (5 expected) ==="
grep -oE 'href="#(room-214|what-worked|kitchen|now|contact)"' /tmp/about_dom.html | sort | uniq
echo "=== prose H2s present? ==="
grep -oE '<h2 id="[^"]+">[^<]+' /tmp/about_dom.html | head -10
echo "=== blockquote present? ==="
grep -c "<blockquote>" /tmp/about_dom.html
echo "=== figure rendered? ==="
grep -oE 'src="assets/sean-(teaching|studio)\.jpg"' /tmp/about_dom.html | sort | uniq -c
echo "=== stats strip rendered? ==="
grep -oE 'class="v6-about-stat\b' /tmp/about_dom.html | wc -l
echo "=== subscriber count substituted? ==="
grep -oE 'Join 4,820' /tmp/about_dom.html | head -1
```

Expected:
- Size > 30KB
- 5 TOC anchors found
- 5 H2s with the expected IDs
- ≥2 blockquotes
- Both figure photos rendered exactly once each
- 4 stats cards rendered
- "Join 4,820" appears once

> [!warning] Headless Chrome and `fetch()`
> The headless render uses `--virtual-time-budget=6000` (longer than other pages) to give the `fetch("content/about.md")` time to complete. If verification shows "Loading…" instead of prose, increase the budget further or smoke-test in a real browser.

---

## Task 12: Migrate `scripts/practices.jsx` to read from `window.GMP`

**Files:**
- Modify: `scripts/practices.jsx`

- [ ] **Step 1: Replace the inline data array at top of file**

Open `scripts/practices.jsx`. Replace lines 1-10 (everything from `/* global React */` through the end of `const v6Practices = [...]`) with:

```jsx
/* global React */

const v6Practices = window.GMP.practices;
```

The rest of the file (`V6PracOptionA`, `V6PracOptionB`, `V6PracOptionC`, `V6PracticesPage`) is unchanged — it already references `v6Practices`.

- [ ] **Step 2: Render and verify**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/practices.html" 2>/dev/null > /tmp/practices_dom.html
echo "=== size ==="
wc -c /tmp/practices_dom.html
echo "=== practice rows (should be 6 in default Option A) ==="
grep -oE 'class="v6-prac-a-row"' /tmp/practices_dom.html | wc -l
echo "=== practice titles ==="
grep -oE '<h3>(Be the weather|Use the cooler|Inspect[^<]+|Three to one|I do, we do[^<]+|Bad moment[^<]+)' /tmp/practices_dom.html | sort | uniq
```

Expected: size >40KB, 6 rows, all 6 practice titles found.

---

## Task 13: Migrate `scripts/v6-workshop.jsx` (homepage) to read from `window.GMP`

**Files:**
- Modify: `scripts/v6-workshop.jsx`

The homepage uses a slim view of practices (the `bodyShort` field) and references stats + pricing for the ticker and offer cards.

- [ ] **Step 1: Remove the inline `v6Lessons` array**

Open `scripts/v6-workshop.jsx`. Find lines 128-135 (`const v6Lessons = [...]`). Delete that block.

- [ ] **Step 2: Inside `V6Workshop()`, derive `v6Lessons` from `window.GMP.practices`**

Find the `function V6Workshop()` block. After the opening `{`, add:

```jsx
function V6Workshop() {
  const SITE = window.GMP.site;
  const PRACTICES = window.GMP.practices;
  // Slim view for the homepage: 6 practices with short bodies
  const v6Lessons = PRACTICES.map(p => ({
    tag: p.tag,
    title: p.title,
    body: p.bodyShort
  }));
  // ... existing code
```

- [ ] **Step 3: Wire ticker, subscribe count, and Sunday letter pitch to `SITE`**

Find the ticker block (line 229-244, the `energy.showTicker && (...)` block). Replace with:

```jsx
      {energy.showTicker && (
        <div className="v6-ticker">
          <div className="v6-ticker-track">
            <span>{SITE.stats.yearsTeaching} years teaching</span><span>·</span>
            <span>{SITE.stats.sons === 3 ? "Three sons" : `${SITE.stats.sons} sons`}</span><span>·</span>
            <span>One Sunday letter</span><span>·</span>
            <span>{SITE.formatted.subscribers} subscribers</span><span>·</span>
            <span>Chicago made</span><span>·</span>
            <span>{SITE.stats.yearsTeaching} years teaching</span><span>·</span>
            <span>{SITE.stats.sons === 3 ? "Three sons" : `${SITE.stats.sons} sons`}</span><span>·</span>
            <span>One Sunday letter</span><span>·</span>
            <span>{SITE.formatted.subscribers} subscribers</span><span>·</span>
            <span>Chicago made</span><span>·</span>
          </div>
        </div>
      )}
```

- [ ] **Step 4: Update the Sunday letter pitch in V6_VOICE friendly preset**

Find `V6_VOICE.friendly.sundayP` at line ~24. The current value is:

```js
sundayP: "Joining 4,820 parents and teachers who like their advice plainspoken."
```

Replace the string with a function that reads from SITE — but since V6_VOICE is defined OUTSIDE the component, easier to template inside the component instead. Find the section that uses `voice.sundayP` (in the offers card 02 and the subscribe section). The offer card builds copy inline inside `V6Workshop`, so do the substitution there.

Update the `v6Offers[1]` (card 02):

```jsx
    { n: "02",
      eyebrow: voice.sundayEyebrow,
      title: voice.sundayH,
      body: voice.sundayP.replace(/4,820|\b4820\b/g, SITE.formatted.subscribers),
      cta: "Subscribe", bg: "card-blush", href: "letters.html" },
```

Update the subscribe section paragraph at the bottom (find `<p>{voice.sundayP}</p>` near the `v6-sub` block):

```jsx
            <p>{voice.sundayP.replace(/4,820|\b4820\b/g, SITE.formatted.subscribers)}</p>
```

- [ ] **Step 5: Update footer copyright year + author**

Find the `v6-foot-meta` block (footer):

```jsx
        <div className="v6-foot-meta">
          <span>{SITE.author} · {SITE.location}</span>
          <span>© {SITE.year}</span>
        </div>
```

- [ ] **Step 6: Render and verify**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=4000 "http://localhost:8765/index.html" 2>/dev/null > /tmp/index_dom.html
echo "=== size ==="
wc -c /tmp/index_dom.html
echo "=== practice cards (should be 6) ==="
grep -oE 'class="v6-prac\b' /tmp/index_dom.html | wc -l
echo "=== ticker subscribers ==="
grep -oE '4,820 subscribers' /tmp/index_dom.html | wc -l
echo "=== footer ==="
grep -oE 'Sean Kane · Chicago, IL|© 2026' /tmp/index_dom.html | sort | uniq -c
echo "=== practice titles ==="
grep -oE '<h3 class="v6-prac-title">[^<]+' /tmp/index_dom.html | sort | uniq
```

Expected: 6 practice cards, "4,820 subscribers" appears (multiple times in ticker), footer shows "Sean Kane · Chicago, IL" + "© 2026", all 6 practice titles found.

---

## Task 14: Final sweep — verify no hardcoded counts/prices remain in JSX

**Files:**
- Inspect: `scripts/*.jsx` (no edits expected; this is a verification pass)

- [ ] **Step 1: Grep for known hardcoded values**

```bash
cd /Users/katiewest/Documents/Growth_Mindset/Website
echo "=== subscriber count (should NOT appear in scripts/) ==="
grep -rn "4,820\|4820" scripts/ || echo "  (none — good)"
echo "=== parents enrolled (should NOT appear in scripts/) ==="
grep -rn "1,240\|1240 parents\|1240 enrolled" scripts/ || echo "  (none — good)"
echo "=== prices (should NOT appear in scripts/) ==="
grep -rn '\$497\|\$97 \|\$597\|3 × \$179\|3 &times; \$179' scripts/ || echo "  (none — good)"
echo "=== years teaching (should appear only in V6_VOICE copy) ==="
grep -rn "twelve years\|12 years" scripts/
echo "=== flagship lessons/modules (should NOT appear in scripts/) ==="
grep -rn "43 video\|43 lessons\|Forty-three\|Eight modules\|8 modules" scripts/ || echo "  (none — good)"
```

Expected: no hits for subscriber count, parents enrolled, prices, flagship lessons/modules. "twelve years" / "12 years" may appear in `V6_VOICE` copy strings — that's fine (it's a writing-tone choice, not a stat to track centrally).

- [ ] **Step 2: If any hardcoded values surfaced, fix them**

For each unexpected hit, replace the literal with a `window.GMP.site.stats.*` or `pricing.*` reference. Re-render the affected page and verify.

- [ ] **Step 3: Re-render all 5 pages, confirm no regressions**

```bash
for page in index practices letters course about; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox --dump-dom --virtual-time-budget=6000 "http://localhost:8765/$page.html" 2>/dev/null > "/tmp/${page}_dom.html"
  size=$(wc -c < "/tmp/${page}_dom.html")
  brand=$(grep -c "Growth Mindset Parenting" "/tmp/${page}_dom.html")
  echo "$page  size=$size  brand=$brand"
done
```

Expected: all pages render at the same approximate size as before, brand string appears 4+ times on each.

---

## Task 15: Write `SITE_GUIDE.md`

**Files:**
- Create: `SITE_GUIDE.md`

- [ ] **Step 1: Write the file**

```markdown
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
| Add a new mini-course | `content/courses.js` | Append to `minis` (and increase `practiceCount` in site.js if applicable) |
| Rewrite an About section | `content/about.md` | Find the `## section` heading; edit the prose |
| Update About stats labels | `content/about.js` | Edit `statsLabels` |
| Swap a photo | `assets/` + relevant content file | Drop new file in `assets/`, update path |
| Tweak homepage hero copy | `scripts/v6-workshop.jsx` | Edit `V6_VOICE.friendly.{eyebrow,pre,em,post,mark,subhead,...}` (this is a design choice, not a stat — stays inline) |
| Change theme accent color | `styles/themes.css` | Edit `.theme-terracotta` block (or set body class to a different theme) |

## Conventions

- **Theme:** `terracotta` is active. Defined in `styles/themes.css`. Activated by `.theme-terracotta` class on `<body>` (the `data-theme` attribute on `<html>` is decorative).
- **Single source of truth:** subscriber count, parent count, prices live in `content/site.js` ONLY. Read everywhere else.
- **Photos:** all in `assets/`. Available files: `sean-{hero,studio,teaching,square,candid,wide}.jpg`.
- **Theme accent variable:** `var(--accent)` resolves to terracotta (the orange-clay tone).
- **Local server:** `cd Website && python3 -m http.server 8765`. Visit http://localhost:8765/.

## Don't do this

- ❌ **Don't edit JSX strings** when a content file holds the data. If you find yourself editing `scripts/letters.jsx` to add a letter, stop — go to `content/letters.js` instead.
- ❌ **Don't break the script load order** in HTML files. Content scripts (`content/*.js`) MUST appear BEFORE page scripts (`scripts/*.jsx`). All scripts use `type="text/babel"` so Babel-standalone runs them in DOM order.
- ❌ **Don't introduce build steps** (Vite, Webpack, esbuild). The site is React + Babel-in-browser by design — non-technical owner, no build pipeline.
- ❌ **Don't hardcode counts or prices** in components. Read from `window.GMP.site`.
- ❌ **Don't delete or rename `assets/`** files without updating their references in content files.
- ❌ **Don't edit the design system configs** (`V6_VOICE` / `V6_ENERGY` / `V6_FRAME` in `scripts/v6-workshop.jsx`) unless the user is explicitly asking to change posture/copy presets. Those are A/B variants, not content.

## Architecture note

Each content file exposes data on `window.GMP.<namespace>`:

- `window.GMP.site` (stats, pricing, brand)
- `window.GMP.practices` (6 practices)
- `window.GMP.letters` (tags, archive, mostRead)
- `window.GMP.courses` (flagship, minis, curriculum, faq)
- `window.GMP.testimonials` (array)
- `window.GMP.about` (metadata; body is fetched from `content/about.md`)

Page components destructure from `window.GMP` at the top of their function bodies. No imports, no module system — keeps the site Babel-in-browser friendly.

## Mobile note

Site is desktop-first today (1440px). Mobile optimization is a separate workstream — see future plan in `Plans/`.
```

- [ ] **Step 2: Verify file is served**

```bash
/usr/bin/curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8765/SITE_GUIDE.md
```

Expected: `200`

---

## Final acceptance gate

After all 15 tasks complete:

- [ ] **All 5 pages render at original size or close to it** (verify via headless Chrome render — see Task 14 Step 3)
- [ ] **Subscriber count "4,820" appears on every page** that uses it (homepage ticker, letters meta, about end-card, course "1,240 parents")
- [ ] **Pagination is hidden on letters page** (5 entries < threshold of 12)
- [ ] **About page shows TOC, prose, figure, stats strip** in correct positions
- [ ] **No hardcoded counts/prices remain in `scripts/`** (verify via Task 14 grep)
- [ ] **`SITE_GUIDE.md` is at project root** and accurate
- [ ] **`content/` folder contains exactly 7 files**: site.js, practices.js, letters.js, courses.js, testimonials.js, about.js, about.md

When all green: **content extraction is complete**. Mobile optimization is the next workstream.
