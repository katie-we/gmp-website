# GMP Site Copy Update — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the full copy-and-structure spec (GMP_Site_Copy_Update_Spec_for_Claude_Code.md) to the existing Next.js 14 static site.

**Architecture:** Static Next.js 14 (`output: 'export'`). Content lives in plain JS data files and inline JSX. URL changes (practices→skills, letters→writing) are handled by creating new route folders and deleting the old ones — no server-side redirects needed since the site is not yet deployed.

**Tech Stack:** Next.js 14 App Router, static export, Tailwind-free (custom CSS in `styles/`), `data/` for site-wide config and skills, `content/letters.js` for archive content, `components/` for shared UI.

**Spec source:** `/Users/katiewest/Downloads/GMP_Site_Copy_Update_Spec_for_Claude_Code.md`

**Key constraint:** `output: 'export'` — no server redirects. Delete old pages; create new ones at new URLs. Update all internal links.

---

## File Map

| File | Action | Why |
|---|---|---|
| `data/site.js` | Modify | 12→14 yrs, update description |
| `data/skills.js` | Create | Replaces `data/practices.js` — six Middle Skills with new fields |
| `data/practices.js` | Delete | Replaced by skills.js |
| `components/Nav.jsx` | Modify | New 5-item nav |
| `components/Footer.jsx` | Modify | Matching nav |
| `components/Ticker.jsx` | Modify | New ticker items |
| `components/LettersFeed.jsx` | Modify | New filter groups, updated topic labels, links → /writing/ |
| `styles/v6.css` | Modify | Add .v6-offer CSS for two-tier section |
| `styles/v6-pages.css` | Modify | Add .v6-prac-a-meta column, .v6-skills-intro paragraph |
| `app/layout.jsx` | Modify | Update "12-year" → "14-year" in description |
| `app/page.jsx` | Rewrite | New home page structure |
| `app/practices/page.jsx` | Delete | Replaced by /skills |
| `app/skills/page.jsx` | Create | Skills page (was /practices) |
| `app/letters/page.jsx` | Delete | Replaced by /writing |
| `app/letters/[slug]/page.jsx` | Delete | Replaced by /writing/[slug] |
| `app/writing/page.jsx` | Create | Writing page (was /letters) |
| `app/writing/[slug]/page.jsx` | Create | Individual writing pages |
| `app/about/page.jsx` | Rewrite | New body copy, stats, pull quote, Section 4 |
| `app/course/page.jsx` | Create | Pre-launch waitlist page |
| `app/sitemap.js` | Modify | Update /practices→/skills, /letters→/writing, add /course |
| `content/letters.js` | Modify | Update topic slugs to new skill names |

---

## Task 1: Update data/site.js

**Files:**
- Modify: `data/site.js`

- [ ] **Replace the entire file:**

```js
export const SITE = {
  name: 'Growth Mindset Parenting',
  url: 'https://growthmindsetparenting.com',
  description:
    'Practical, plainspoken parenting advice from a 14-year middle school teacher and father of three. Evidence-based skills for parents of kids ages 9–15.',
  author: {
    name: 'Sean Kane',
    title: '14-year middle school teacher. Father of three.',
    location: 'Austin, TX',
    tiktok: 'https://www.tiktok.com/@growthmindsetparenting',
    instagram: 'https://www.instagram.com/growth.mindset.parenting',
  },
  stats: {
    instagramFollowers: '100K+',
    tiktokFollowers: '37K+',
    totalFollowing: '140K',
    teachingYears: 14,
    studentsTeached: '1,000+',
    sons: 3,
  },
};
```

- [ ] **Commit:** `git add data/site.js && git commit -m "data: update teaching years 12→14, remove subscriber count, update stats"`

---

## Task 2: Update Nav.jsx and Footer.jsx

**Files:**
- Modify: `components/Nav.jsx`
- Modify: `components/Footer.jsx`

**Canonical nav:** Skills / Writing / Course / About / Work with me

- [ ] **Replace NAV_LINKS in `components/Nav.jsx`:**

Replace the `NAV_LINKS` constant (lines 5–9) with:

```js
const NAV_LINKS = [
  { href: '/skills', label: 'Skills' },
  { href: '/writing', label: 'Writing' },
  { href: '/course', label: 'Course' },
  { href: '/about', label: 'About' },
  { href: '/about#contact', label: 'Work with me' },
];
```

Also update the nav CTA link (currently `/letters#subscribe`) to `/writing#subscribe`:
- Line 33: `<Link href="/writing#subscribe" className="v6-nav-cta">`
- Line 74: `<Link href="/writing#subscribe" className="v6-nav-drawer-cta">`

- [ ] **Replace footer nav in `components/Footer.jsx`:**

```jsx
<nav className="v6-foot-links">
  <Link href="/skills">Skills</Link>
  <Link href="/writing">Writing</Link>
  <Link href="/course">Course</Link>
  <Link href="/about">About</Link>
  <Link href="/about#contact">Work with me</Link>
  <Link href="/privacy" style={{ color: 'var(--ink-mute)', fontSize: 13 }}>Privacy</Link>
  <a href="/feed.xml" style={{ color: 'var(--ink-mute)', fontSize: 13 }}>RSS</a>
</nav>
```

- [ ] **Commit:** `git add components/Nav.jsx components/Footer.jsx && git commit -m "nav: update to Skills/Writing/Course/About/Work with me"`

---

## Task 3: Update Ticker.jsx

**Files:**
- Modify: `components/Ticker.jsx`

- [ ] **Replace TICKER_ITEMS:**

```js
const TICKER_ITEMS = [
  'Three sons',
  '14 years teaching',
  'One newsletter, weekly',
  'Six Middle Skills',
  '140K reading and watching',
  'Austin, TX',
];
```

- [ ] **Commit:** `git add components/Ticker.jsx && git commit -m "ticker: update to new brand copy"`

---

## Task 4: Create data/skills.js, delete data/practices.js

**Files:**
- Create: `data/skills.js`
- Delete: `data/practices.js`

The six Middle Skills in canonical order. The `meta` field replaces the old `time` field — it's the right-column verb cue on the Skills page. The `slug` is used for anchor links on the Skills page.

- [ ] **Create `data/skills.js`:**

```js
export const SKILLS = [
  {
    n: '01',
    tag: 'Emotional Literacy',
    title: 'Naming what\'s happening inside.',
    body: 'Before kids can manage a feeling, they have to know what it is. Most middle schoolers are running on big sensations they can\'t name — and what comes out as anger is usually fear, fatigue, or shame underneath. Your job is to give them the vocabulary, the patience, and the room to feel a thing without becoming it.',
    meta: 'Name it before you fix it →',
    slug: 'emotional-literacy',
  },
  {
    n: '02',
    tag: 'Resilience',
    title: 'Staying in it.',
    body: 'Resilience isn\'t grit or toughness. It\'s the capacity to feel uncomfortable for long enough to learn from it — the loop of challenge, regulation, action, reflection that builds real durability. Kids don\'t get resilient because hard things stop. They get resilient because they keep showing up to hard things and notice they survived.',
    meta: 'Let them be uncomfortable →',
    slug: 'resilience',
  },
  {
    n: '03',
    tag: 'Reflection',
    title: 'Looking back honestly.',
    body: 'Experience doesn\'t become identity automatically — it becomes identity through reflection. Without it, mistakes harden into shame and patterns repeat. With it, kids start to see themselves clearly: what they did, why, what they\'d do differently. You scaffold reflection by asking the questions they can\'t yet ask themselves.',
    meta: 'Ask, don\'t lecture →',
    slug: 'reflection',
  },
  {
    n: '04',
    tag: 'Relationship',
    title: 'Staying connected.',
    body: 'This is the skill underneath every other skill. Trust, repair, honest communication, collaboration — they all live here, and they all develop through repetition with you first. The middle years are when kids are pulling away and reaching out at the same time. Your job is to stay reachable.',
    meta: 'Stay reachable →',
    slug: 'relationship',
  },
  {
    n: '05',
    tag: 'Autonomy',
    title: 'Standing on their own.',
    body: 'Autonomy isn\'t independence — not yet. It\'s the gradual handoff of ownership: from you running their life to them running their life, one capacity at a time. Confidence, accountability, and executive function start to converge here, and the only way to build it is to let them try, fail, and try again with less help each time.',
    meta: 'Hand off, one piece at a time →',
    slug: 'autonomy',
  },
  {
    n: '06',
    tag: 'Communication',
    title: 'Saying it well.',
    body: 'Tone, listening, expressing disagreement without weaponizing it, repairing rupture when it happens — these are the skills that hold every relationship a kid will ever have. And like every other skill on this list, they\'re taught by being modeled. Your voice in conflict is the voice they\'ll borrow when they\'re in conflict with someone else.',
    meta: 'Model the voice you want to hear →',
    slug: 'communication',
  },
];
```

- [ ] **Delete `data/practices.js`:**
```bash
rm /Users/katiewest/Documents/Growth_Mindset/Website/data/practices.js
```

- [ ] **Commit:** `git add data/skills.js && git rm data/practices.js && git commit -m "data: replace practices.js with skills.js — six Middle Skills"`

---

## Task 5: Add CSS for new sections

**Files:**
- Modify: `styles/v6.css` — add offer section styles
- Modify: `styles/v6-pages.css` — add skills page meta column + intro paragraph

### v6.css additions

- [ ] **Add the following CSS block to `styles/v6.css` AFTER the `.v6-sub-form button:hover` rule (after line 644):**

```css
/* ── Offer section (two-tier, replaces jump on home) ──────────────────── */
.v6-offer { padding: 0 0 96px; }
.v6-offer-header { margin-bottom: 32px; }
.v6-offer-eyebrow {
  display: inline-block;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
.v6-offer-header h2 {
  font-family: var(--sans);
  font-weight: 800;
  font-size: 32px;
  letter-spacing: -0.025em;
  line-height: 1.1;
  color: var(--ink);
  margin: 0;
}
.v6-offer-ss2-header { margin: 64px 0 32px; }
.v6-offer-ss1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.v6-offer-ss2 {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
/* Larger cards in SS1 */
.v6-offer-ss1 .v6-card { min-height: 320px; }
/* Smaller cards in SS2 */
.v6-offer-ss2 .v6-card { min-height: 240px; }
.v6-offer-ss2 .v6-card-title { font-size: 22px; line-height: 1.2; }
.v6-offer-ss2 .v6-card-body { font-size: 14px; }
@media (max-width: 900px) {
  .v6-offer-ss1 { grid-template-columns: 1fr; }
  .v6-offer-ss2 { grid-template-columns: 1fr; }
}
```

### v6-pages.css additions

- [ ] **Add after the last `.v6-prac-a-cadence` rule (after line 1527) and BEFORE the `@media (max-width: 767px)` block:**

```css
/* Skills page — meta column + intro paragraph */
.v6-skills-intro {
  font-family: var(--serif-text);
  font-size: 18px;
  line-height: 1.7;
  color: var(--ink-soft);
  max-width: 72ch;
  padding: 32px 0 48px;
  border-bottom: 1.5px solid var(--rule);
  margin-bottom: 0;
}
.v6-prac-a-meta {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--accent);
  padding-top: 12px;
  text-align: right;
  align-self: start;
}
/* Skills page uses 4-column row */
.v6-skills-row {
  display: grid;
  grid-template-columns: 80px 140px 1fr 180px;
  gap: 40px;
  align-items: start;
  padding: 48px 0;
  border-bottom: 1.5px solid var(--rule);
  color: var(--ink);
}
.v6-skills-cta-block {
  border-top: 1.5px solid var(--ink);
  padding: 64px 0 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}
.v6-skills-cta-lead {
  font-family: var(--sans);
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 0 0 8px;
}
.v6-skills-cta-primary {
  font-family: var(--sans);
  font-weight: 700;
  font-size: 18px;
  color: var(--accent);
  text-decoration: none;
  transition: gap 0.15s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.v6-skills-cta-primary:hover { gap: 14px; }
.v6-skills-cta-secondary {
  font-family: var(--sans);
  font-weight: 600;
  font-size: 15px;
  color: var(--ink-soft);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.v6-skills-cta-secondary:hover { color: var(--ink); }
@media (max-width: 900px) {
  .v6-skills-row {
    grid-template-columns: 80px 1fr;
    gap: 16px 24px;
  }
  .v6-prac-a-tag { grid-column: 2; grid-row: 1; }
  .v6-prac-a-num { grid-column: 1; grid-row: 1 / 3; }
  .v6-prac-a-text { grid-column: 2; grid-row: 2; }
  .v6-prac-a-meta { grid-column: 2; grid-row: 3; text-align: left; }
}
```

- [ ] **Commit:** `git add styles/v6.css styles/v6-pages.css && git commit -m "css: add offer section and skills page meta column styles"`

---

## Task 6: Update app/layout.jsx

**Files:**
- Modify: `app/layout.jsx`

- [ ] **Change the description string in layout.jsx:**

Old:
```js
'Practical, plainspoken parenting advice from a 12-year middle school teacher and father of three. Evidence-based practices for parents of tweens and teens.',
```
New:
```js
'Practical, plainspoken parenting advice from a 14-year middle school teacher and father of three. Evidence-based skills for parents of kids ages 9–15.',
```

- [ ] **Commit:** `git add app/layout.jsx && git commit -m "meta: update site description to 14-year"`

---

## Task 7: Rewrite app/page.jsx (Home)

**Files:**
- Rewrite: `app/page.jsx`

This replaces the existing home page with the new two-tier offer structure, updated hero, new skills preview, updated quote, 2-card channels, and updated subscribe CTA.

- [ ] **Replace `app/page.jsx` entirely:**

```jsx
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ticker from '../components/Ticker';
import SubscribeForm from '../components/SubscribeForm';
import JsonLd from '../components/JsonLd';
import { SKILLS } from '../data/skills';
import { SITE } from '../data/site';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Growth Mindset Parenting | Sean Kane',
  description:
    'Six skills for the middle years. Plainspoken parenting from a 14-year teacher and dad of three.',
  openGraph: {
    title: 'Growth Mindset Parenting',
    description: 'Six skills for the middle years. Plainspoken parenting from a 14-year teacher.',
    images: [{ url: '/images/sean-hero.jpg' }],
  },
};

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school teacher',
  description: 'Fourteen-year middle school teacher applying classroom skills to home parenting. Father of three sons.',
  sameAs: [SITE.author.tiktok, SITE.author.instagram],
  knowsAbout: ['adolescent development', 'growth mindset', 'middle school parenting', 'emotional regulation', 'positive discipline'],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Growth Mindset Parenting',
  url: SITE.url,
  description: SITE.description,
  author: { '@type': 'Person', name: 'Sean Kane' },
  potentialAction: {
    '@type': 'ReadAction',
    target: [`${SITE.url}/writing/`],
  },
};

export default function HomePage() {
  return (
    <main className="v6-root">
      <JsonLd data={PERSON_SCHEMA} />
      <JsonLd data={WEBSITE_SCHEMA} />

      <Nav />

      {/* HERO */}
      <section className="v6-hero" aria-label="Introduction">
        <div className="v6-hero-text">
          <div className="v6-hero-eyebrow">
            <span className="v6-dot" aria-hidden="true" />
            For the middle years &mdash; <span style={{ color: 'var(--accent)', fontWeight: 700 }}>ages 9 to 15.</span>
          </div>
          <h1 className="v6-hero-h1">
            Middle school isn&apos;t when things fall apart.{' '}
            <em>It&apos;s when they have the best shot of going right.</em>
          </h1>
          <p className="v6-hero-sub">
            Your kid&apos;s brain is unusually open in these years, and you&apos;re the most trusted teacher they have. I write for parents who want to spend this window building the skills their kid is still learning &mdash; and the ones they&apos;re still building themselves.
          </p>
          <div className="v6-hero-actions">
            <Link href="#subscribe" className="v6-cta v6-cta-primary">
              Get my free Middle Skills Field Guide{' '}
              <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <figure className="v6-hero-photo">
          <Image
            src="/images/sean-hero.jpg"
            alt="Sean Kane — teacher and father of three"
            width={600}
            height={750}
            priority
            style={{ width: '100%', height: 'auto', aspectRatio: '4/5', objectFit: 'cover', borderRadius: 8 }}
          />
          <div className="v6-hero-cap" aria-hidden="true">
            <span>Sean Kane</span>
            <span>Austin, TX</span>
          </div>
        </figure>
      </section>

      <Ticker />

      {/* OFFER — two-tier */}
      <section className="v6-offer" aria-label="Start here">

        {/* SS1 — free resources */}
        <div className="v6-offer-header">
          <span className="v6-offer-eyebrow">Start here</span>
          <h2>Two free ways to begin teaching at home.</h2>
        </div>
        <div className="v6-offer-ss1">
          <Link href="#subscribe" className="v6-card card-cream">
            <div className="v6-card-top">
              <span className="v6-card-eyebrow">FREE &middot; 9-MINUTE READ</span>
            </div>
            <h3 className="v6-card-title">The six skills your middle schooler is still building &mdash; and how you teach them at home.</h3>
            <p className="v6-card-body">A short field guide from fourteen years of teaching middle school. Read it on your phone tonight; try the first move tomorrow.</p>
            <div className="v6-card-cta">
              Get the Field Guide
              <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
          <Link href="#subscribe" className="v6-card card-blush">
            <div className="v6-card-top">
              <span className="v6-card-eyebrow">THE NEWSLETTER &middot; WEEKLY</span>
            </div>
            <h3 className="v6-card-title">One letter, every Saturday. Bring your coffee.</h3>
            <p className="v6-card-body">Short, plainspoken, one skill or one story at a time. Six out of ten subscribers open every one &mdash; writing that parents actually want to read.</p>
            <div className="v6-card-cta">
              Subscribe
              <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        </div>

        {/* SS2 — paid & services */}
        <div className="v6-offer-header v6-offer-ss2-header">
          <span className="v6-offer-eyebrow">When you want more</span>
          <h2>Three ways to work with me.</h2>
        </div>
        <div className="v6-offer-ss2">
          <Link href="/course" className="v6-card card-clay">
            <div className="v6-card-top">
              <span className="v6-card-eyebrow">COURSE &middot; COMING SOON</span>
            </div>
            <h3 className="v6-card-title">The six skills your kid is building, and how to teach each one.</h3>
            <p className="v6-card-body">A self-paced course for parents who want the full curriculum: six modules, one per Middle Skill, with readings, scripts, and the tactics that work in your kitchen.</p>
            <div className="v6-card-cta">
              Join the waitlist
              <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
          <Link href="/about#contact" className="v6-card card-sage">
            <div className="v6-card-top">
              <span className="v6-card-eyebrow">1:1 &middot; LIMITED</span>
            </div>
            <h3 className="v6-card-title">Coaching for parents who want a teacher in their corner.</h3>
            <p className="v6-card-body">We look at your kid, your situation, your week &mdash; and build a plan you&apos;ll actually run. Engagements are custom, openings are limited, and I work with each family directly.</p>
            <div className="v6-card-cta">
              Apply
              <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
          <Link href="/about#contact" className="v6-card card-ink">
            <div className="v6-card-top">
              <span className="v6-card-eyebrow">SPEAKING</span>
            </div>
            <h3 className="v6-card-title">Talks for schools, faculties, and parent organizations.</h3>
            <p className="v6-card-body">Keynotes and workshops on raising kids in the middle years &mdash; the developmental science, the parent&apos;s role, the moves that work. For any room full of people who want something real.</p>
            <div className="v6-card-cta">
              Inquire
              <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
            </div>
          </Link>
        </div>
      </section>

      {/* SIX MIDDLE SKILLS */}
      <section className="v6-work" aria-label="The six Middle Skills">
        <div className="v6-work-head">
          <span className="v6-work-eyebrow">WHAT THEY&apos;RE BUILDING</span>
          <h2>The six Middle Skills.</h2>
        </div>
        <div className="v6-work-grid" role="list">
          {SKILLS.map((s) => (
            <Link key={s.n} href={`/skills#${s.slug}`} className="v6-prac" role="listitem">
              <div className="v6-prac-num" aria-hidden="true">{s.n}</div>
              <div className="v6-prac-tag">{s.tag}</div>
              <h3 className="v6-prac-title">{s.title}</h3>
              <p className="v6-prac-body">{s.body.slice(0, 120)}&hellip;</p>
              <div className="v6-prac-arrow" aria-hidden="true">&rarr;</div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="v6-quote" aria-label="A note from Sean">
        <div className="v6-quote-grid">
          <figure className="v6-quote-photo">
            <Image
              src="/images/sean-square.jpg"
              alt="Sean Kane"
              width={400}
              height={500}
              style={{ width: '100%', height: 'auto', borderRadius: 12 }}
            />
          </figure>
          <blockquote>
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>A note from Sean</p>
            <p className="v6-quote-q">
              &ldquo;Fourteen years in middle school classrooms taught me one thing above all:{' '}
              <em>this age isn&apos;t a problem to manage, it&apos;s a window to spend on purpose.</em>{' '}
              People always said working with middle schoolers sounded rough &mdash; I never got it.
              I love this age. Now I get to do the work with three of my own.&rdquo;
            </p>
            <div className="v6-quote-attrib">
              <span className="v6-quote-name">Sean Kane</span>
              <span className="v6-quote-title">Fourteen years in middle school &middot; Dad of three</span>
            </div>
          </blockquote>
        </div>
      </section>

      {/* CHANNELS — 2 cards */}
      <section className="v6-shows" aria-label="More ways into the work">
        <div className="v6-work-head" style={{ marginBottom: 32 }}>
          <span className="v6-work-eyebrow">Find Sean</span>
          <h2>More ways into the work</h2>
          <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, color: 'var(--ink-soft)', marginTop: 8 }}>
            Two minutes or twenty &mdash; same teacher, same skills.
          </p>
        </div>
        <div className="v6-shows-grid">
          <a href={SITE.author.tiktok} className="v6-show v6-show-yt" target="_blank" rel="noopener noreferrer">
            <span className="v6-show-tag">VIDEOS</span>
            <h3>Three-minute practices</h3>
            <p>Short clips on what middle schoolers are doing and what to do about it. One move per video, three minutes or less, watch while the kettle boils.</p>
            <div className="v6-card-cta">Watch <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </a>
          <Link href="/writing" className="v6-show v6-show-essay">
            <span className="v6-show-tag">BLOG</span>
            <h3>The long read</h3>
            <p>Back issues of the newsletter and longer essays on the six Middle Skills, the developmental window, and teaching at home &mdash; for the parent who wants to think this through on a Sunday morning.</p>
            <div className="v6-card-cta">Read <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE CTA */}
      <section className="v6-sub" id="subscribe" aria-label="Subscribe to the newsletter">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">THE NEWSLETTER</span>
            <h2>One letter, every Saturday. Bring your coffee.</h2>
            <p>Plainspoken, classroom-tested, short enough to read with your coffee. Free.</p>
          </div>
          <SubscribeForm
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Subscribe →"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
```

- [ ] **Commit:** `git add app/page.jsx && git commit -m "home: new two-tier offer, skills preview, updated hero and copy"`

---

## Task 8: Create app/skills/page.jsx and delete app/practices/page.jsx

**Files:**
- Create: `app/skills/page.jsx`
- Delete: `app/practices/page.jsx`

- [ ] **Create `app/skills/page.jsx`:**

```jsx
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SKILLS } from '../../data/skills';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'The Six Middle Skills',
  description:
    'Six skills your kid is building in the middle years — and how parents teach into each one. From Sean Kane, 14-year middle school teacher.',
  openGraph: { title: 'The Six Middle Skills | Growth Mindset Parenting' },
};

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Six Middle Skills',
  description: 'Six skills middle schoolers are building, taught by parents.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
  itemListElement: SKILLS.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.tag,
    description: s.body,
  })),
};

export default function SkillsPage() {
  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={HOWTO_SCHEMA} />
      <Nav active="/skills" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">The Skills</span>
        </div>
        <h1 className="v6-page-head-h1">
          Six skills your kid is building. Six skills you can teach.
        </h1>
        <div className="v6-page-head-meta">
          <div><b>06</b> Middle Skills</div>
          <div><b>14 yrs</b> In the classroom</div>
          <div><b>5 min</b> Average read</div>
        </div>
      </header>

      <p className="v6-skills-intro">
        Most of what looks like attitude in middle school &mdash; the eye-rolls, the slammed
        doors, the &ldquo;I don&apos;t care&rdquo; &mdash; is actually a skill the kid hasn&apos;t
        built yet. The same six skills, every kid, every year, in some order. Below is what each
        one is, what it looks like when it&apos;s missing, and the part of the work that&apos;s yours.
      </p>

      <section className="v6-prac-a-list" aria-label="The six Middle Skills">
        {SKILLS.map((s) => (
          <div key={s.n} id={s.slug} className="v6-skills-row">
            <div className="v6-prac-a-num" aria-hidden="true">{s.n}</div>
            <div className="v6-prac-a-tag">{s.tag}</div>
            <div className="v6-prac-a-text">
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </div>
            <div className="v6-prac-a-meta">{s.meta}</div>
          </div>
        ))}
      </section>

      {/* CTA block */}
      <div className="v6-skills-cta-block">
        <p className="v6-skills-cta-lead">Where to go next.</p>
        <Link href="#subscribe" className="v6-skills-cta-primary">
          Get the Middle Skills Field Guide &rarr;
        </Link>
        <Link href="/course" className="v6-skills-cta-secondary">
          Or join the Course waitlist &rarr;
        </Link>
        <Link href="/writing#subscribe" className="v6-skills-cta-secondary">
          Or subscribe to the weekly newsletter &rarr;
        </Link>
      </div>

      <section className="v6-sub" id="subscribe" aria-label="Subscribe">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">THE NEWSLETTER</span>
            <h2>One letter, every Saturday.</h2>
            <p>Free, plainspoken, one skill at a time.</p>
          </div>
          <SubscribeForm inputPlaceholder="sean@growthmindsetparenting.com" />
        </div>
      </section>

      <Footer />
    </article>
  );
}
```

- [ ] **Delete the old practices page:**
```bash
rm /Users/katiewest/Documents/Growth_Mindset/Website/app/practices/page.jsx
rmdir /Users/katiewest/Documents/Growth_Mindset/Website/app/practices 2>/dev/null || true
```

- [ ] **Commit:** `git add app/skills/ && git rm app/practices/page.jsx && git commit -m "skills: create /skills page, remove /practices"`

---

## Task 9: Update content/letters.js topic slugs

**Files:**
- Modify: `content/letters.js`

The new filter system uses the six Middle Skills as primary topics. Update every letter's `topic` field using this mapping:

| Old topic | New topic |
|---|---|
| `foundations` | `emotional-literacy` |
| `regulation` | `resilience` |
| `standards` | `reflection` |
| `praise` | `relationship` |
| `skill-building` | `autonomy` |
| `repair` | `communication` |

- [ ] **Run a global find-and-replace on `content/letters.js`:**

Search for each old topic value and replace with new:
- `topic: 'foundations'` → `topic: 'emotional-literacy'`
- `topic: 'regulation'` → `topic: 'resilience'`
- `topic: 'standards'` → `topic: 'reflection'`
- `topic: 'praise'` → `topic: 'relationship'`
- `topic: 'skill-building'` → `topic: 'autonomy'`
- `topic: 'repair'` → `topic: 'communication'`

- [ ] **Commit:** `git add content/letters.js && git commit -m "content: update topic slugs to six Middle Skills naming"`

---

## Task 10: Update LettersFeed.jsx — new filter groups + writing links

**Files:**
- Modify: `components/LettersFeed.jsx`

Three changes:
1. Update `TOPIC_LABELS` to new skill names
2. Add two-group filter UI (skills primary, secondary topics below)
3. Update all `/letters/${slug}/` links → `/writing/${slug}/`

- [ ] **Replace `components/LettersFeed.jsx` entirely:**

```jsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const PRIMARY_SKILLS = [
  { key: 'emotional-literacy', label: 'Emotional Literacy' },
  { key: 'resilience',         label: 'Resilience' },
  { key: 'reflection',         label: 'Reflection' },
  { key: 'relationship',       label: 'Relationship' },
  { key: 'autonomy',           label: 'Autonomy' },
  { key: 'communication',      label: 'Communication' },
];

const SECONDARY_TOPICS = [
  { key: 'co-parenting',      label: 'Co-parenting' },
  { key: 'raising-boys',      label: 'Raising boys' },
  { key: 'school-teachers',   label: 'School & teachers' },
];

function LetterRow({ letter }) {
  const isEssay = letter.type === 'essay';
  return (
    <Link href={`/writing/${letter.slug}/`} className="v6-letter">
      <time className="v6-letter-date" dateTime={letter.date}>
        <b>{new Date(letter.date + 'T12:00:00').getDate()}</b>
        <span>{new Date(letter.date + 'T12:00:00').toLocaleString('en-US', { month: 'short' }).toUpperCase()}</span>
      </time>
      <div className="v6-letter-body">
        <div className={`v6-letter-tag ${isEssay ? 'is-essay' : 'is-note'}`}>
          <span className="v6-letter-tag-dot" aria-hidden="true" />
          {letter.tag}
        </div>
        <h2 className="v6-letter-title">{letter.title}</h2>
        {letter.dek && <p className="v6-letter-dek">{letter.dek}</p>}
        {letter.excerpt && !letter.dek && <p className="v6-letter-dek">{letter.excerpt}</p>}
      </div>
    </Link>
  );
}

export default function LettersFeed({ letters, totalPages }) {
  const [activeTopic, setActiveTopic] = useState(null);

  const displayed = activeTopic ? letters.filter((l) => l.topic === activeTopic) : letters;

  const allTopics = [...PRIMARY_SKILLS, ...SECONDARY_TOPICS];
  const hasContent = (key) => letters.some((l) => l.topic === key);

  return (
    <div className="v6-letters">
      <section className="v6-letters-feed" aria-label="Writing archive">
        {displayed.map((letter) => (
          <LetterRow key={letter.slug} letter={letter} />
        ))}

        {!activeTopic && totalPages > 1 && (
          <nav className="v6-letters-pager" aria-label="Pagination">
            <span className="v6-letters-pager-btn is-disabled">&larr; Newer</span>
            <span className="v6-letters-pager-btn is-current">1</span>
            {Array.from({ length: Math.min(totalPages - 1, 4) }, (_, i) => i + 2).map((p) => (
              <Link key={p} href={`/writing/page/${p}/`} className="v6-letters-pager-btn">{p}</Link>
            ))}
            {totalPages > 5 && <span className="v6-letters-pager-meta">of {totalPages}</span>}
            <Link href="/writing/page/2/" className="v6-letters-pager-btn">Older &rarr;</Link>
          </nav>
        )}
      </section>

      <aside className="v6-letters-side" aria-label="Sidebar">
        <div className="v6-letters-side-card">
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>
            The Newsletter
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            One piece of teaching in your inbox, every Saturday. Free, plainspoken, unsubscribe anytime.
          </p>
          <SubscribeForm
            variant="light"
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Subscribe free"
          />
        </div>

        <div className="v6-letters-side-card" style={{ background: 'var(--card-sage)' }}>
          {/* Primary group: six Middle Skills */}
          <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 16, margin: '0 0 4px' }}>
            Browse by skill
          </h3>
          <div className="v6-letters-side-tags" style={{ marginBottom: 20 }}>
            <button
              className={`v6-letters-side-tag${activeTopic === null ? ' is-active' : ''}`}
              onClick={() => setActiveTopic(null)}
              style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
            >
              All {letters.length}
            </button>
            {PRIMARY_SKILLS.filter((s) => hasContent(s.key)).map((s) => (
              <button
                key={s.key}
                className={`v6-letters-side-tag${activeTopic === s.key ? ' is-active' : ''}`}
                onClick={() => setActiveTopic(activeTopic === s.key ? null : s.key)}
                style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Secondary group */}
          {SECONDARY_TOPICS.some((t) => hasContent(t.key)) && (
            <>
              <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-soft)', margin: '0 0 8px' }}>
                More topics
              </h3>
              <div className="v6-letters-side-tags">
                {SECONDARY_TOPICS.filter((t) => hasContent(t.key)).map((t) => (
                  <button
                    key={t.key}
                    className={`v6-letters-side-tag${activeTopic === t.key ? ' is-active' : ''}`}
                    onClick={() => setActiveTopic(activeTopic === t.key ? null : t.key)}
                    style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit', fontSize: 13, opacity: 0.85 }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}

          {activeTopic && (
            <button
              onClick={() => setActiveTopic(null)}
              style={{ marginTop: 12, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)', padding: 0 }}
            >
              ← All writing
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
```

- [ ] **Commit:** `git add components/LettersFeed.jsx && git commit -m "letters-feed: two-group filter, updated topics, /writing/ links"`

---

## Task 11: Create app/writing/page.jsx

**Files:**
- Create: `app/writing/page.jsx` (directory `app/writing/` must be created)

- [ ] **Create `app/writing/page.jsx`:**

```jsx
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import LettersFeed from '../../components/LettersFeed';
import JsonLd from '../../components/JsonLd';
import { getAllLetters } from '../../lib/letters';
import { SITE } from '../../data/site';

export const metadata = {
  title: 'Writing',
  description:
    'Weekly notes and longer essays on the six Middle Skills. Plainspoken parenting, written by a teacher. Free.',
};

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Growth Mindset Parenting Writing',
  url: `${SITE.url}/writing/`,
  description: 'Weekly notes and longer essays on classroom-tested parenting skills.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
};

export default function WritingPage() {
  const letters = getAllLetters();
  const totalPages = Math.ceil(letters.length / 20);

  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={BLOG_SCHEMA} />
      <Nav active="/writing" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">Writing</span>
        </div>
        <h1 className="v6-page-head-h1">
          Weekly notes and longer essays.{' '}
          <em>Plainspoken parenting, written by a teacher.</em>
        </h1>
        <div className="v6-page-head-meta">
          <div><b>{letters.length}</b> Pieces in archive</div>
          <div><b>Weekly</b> Since 2024</div>
          <div><b>Free</b> Always</div>
        </div>
      </header>

      <LettersFeed letters={letters} totalPages={totalPages} />

      <Footer />
    </article>
  );
}
```

- [ ] **Commit:** `git add app/writing/page.jsx && git commit -m "writing: create /writing page"`

---

## Task 12: Create app/writing/[slug]/page.jsx and delete old letters pages

**Files:**
- Create: `app/writing/[slug]/page.jsx`
- Delete: `app/letters/page.jsx`
- Delete: `app/letters/[slug]/page.jsx`

- [ ] **Create `app/writing/[slug]/page.jsx`:**

```jsx
import Nav from '../../../components/Nav';
import Footer from '../../../components/Footer';
import SubscribeForm from '../../../components/SubscribeForm';
import JsonLd from '../../../components/JsonLd';
import { getLetterBySlug, getAllSlugs, getAllLetters } from '../../../lib/letters';
import { SITE } from '../../../data/site';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const letter = getLetterBySlug(params.slug);
  if (!letter) return {};
  return {
    title: letter.title,
    description: letter.excerpt || letter.dek,
    openGraph: {
      title: letter.title,
      description: letter.excerpt || letter.dek,
      type: 'article',
      publishedTime: letter.date,
      authors: ['Sean Kane'],
      images: letter.img ? [{ url: letter.img }] : [{ url: '/images/sean-square.jpg' }],
    },
  };
}

export default function WritingPiecePage({ params }) {
  const letter = getLetterBySlug(params.slug);
  if (!letter) notFound();

  const isEssay = letter.type === 'essay';
  const allLetters = getAllLetters();
  const related = (letter.related || [])
    .map((s) => allLetters.find((l) => l.slug === s))
    .filter(Boolean)
    .slice(0, 3);

  const ARTICLE_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: letter.title,
    description: letter.excerpt || letter.dek,
    datePublished: letter.date,
    author: {
      '@type': 'Person',
      name: 'Sean Kane',
      url: `${SITE.url}/about/`,
      jobTitle: '14-year middle school English teacher and parenting educator',
      sameAs: [SITE.author.tiktok, SITE.author.instagram],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Growth Mindset Parenting',
      url: SITE.url,
    },
    mainEntityOfPage: `${SITE.url}/writing/${letter.slug}/`,
    image: letter.img ? `${SITE.url}${letter.img}` : `${SITE.url}/images/sean-square.jpg`,
    keywords: ['parenting', 'middle school', 'growth mindset', letter.tag],
  };

  return (
    <article className="v6-page theme-terracotta" itemScope itemType="https://schema.org/BlogPosting">
      <JsonLd data={ARTICLE_SCHEMA} />
      <Nav active="/writing" />

      <header className="v6-article-head">
        <Link href="/writing/" className="v6-article-back">&larr; All writing</Link>
        <div className={`v6-letter-tag ${isEssay ? 'is-essay' : 'is-note'}`}>
          <span className="v6-letter-tag-dot" aria-hidden="true" />
          {letter.tag} &middot;{' '}
          <time dateTime={letter.date}>
            {new Date(letter.date + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
        <h1 className="v6-article-h1" itemProp="headline">{letter.title}</h1>
        {letter.dek && <p className="v6-article-dek" itemProp="description">{letter.dek}</p>}
        <Link href="/about/" className="v6-article-byline" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            className="v6-article-byline-avatar"
            src="/images/sean-square.jpg"
            alt="Sean Kane"
            width={48}
            height={48}
          />
          <div>
            <div className="v6-article-byline-name" itemProp="author">Sean Kane</div>
            <div className="v6-article-byline-meta">Fourteen years in the classroom. Three sons at the kitchen table.</div>
          </div>
        </Link>
      </header>

      {letter.img && (
        <figure className="v6-article-hero">
          <img
            src={letter.img}
            alt={letter.title}
            style={{ width: '100%', maxHeight: 480, objectFit: 'cover' }}
          />
        </figure>
      )}

      <div className="v6-article-layout">
        <div className="v6-article-body" itemProp="articleBody">
          {(letter.body || []).map((para, i) => {
            const parts = para.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i}>
                {parts.map((p, j) =>
                  p.startsWith('**') && p.endsWith('**') ? (
                    <strong key={j}>{p.slice(2, -2)}</strong>
                  ) : (
                    p
                  )
                )}
              </p>
            );
          })}

          <div className="v6-article-end" aria-hidden="true">
            <span>&mdash;</span>
            <div>See you Saturday.<br /><em>Sean</em></div>
          </div>

          <section className="v6-article-cta" aria-label="Subscribe">
            <h2>Get the next letter on Saturday.</h2>
            <p>One classroom-tested skill in your inbox, every week. Free, plainspoken, unsubscribe in one click.</p>
            <SubscribeForm />
          </section>
        </div>

        <aside className="v6-article-side">
          <div className="v6-article-side-card">
            <h3>About the newsletter</h3>
            <p>The Saturday newsletter is a weekly note from Sean Kane &mdash; a former middle-school teacher raising three sons. Practical, plainspoken, free.</p>
          </div>

          {related.length > 0 && (
            <div>
              <div className="v6-article-side-eyebrow">Read next</div>
              <ul className="v6-article-related">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/writing/${r.slug}/`}>
                      <div className={`v6-letter-tag ${r.type === 'essay' ? 'is-essay' : 'is-note'}`}>
                        <span className="v6-letter-tag-dot" aria-hidden="true" />
                        {r.tag}
                      </div>
                      <h4>{r.title}</h4>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <Footer />
    </article>
  );
}
```

- [ ] **Delete old letter pages:**
```bash
rm /Users/katiewest/Documents/Growth_Mindset/Website/app/letters/page.jsx
rm /Users/katiewest/Documents/Growth_Mindset/Website/app/letters/\[slug\]/page.jsx
rmdir /Users/katiewest/Documents/Growth_Mindset/Website/app/letters/\[slug\] 2>/dev/null || true
rmdir /Users/katiewest/Documents/Growth_Mindset/Website/app/letters 2>/dev/null || true
```

- [ ] **Commit:** `git add app/writing/ && git rm -r app/letters/ && git commit -m "writing: create /writing/[slug] pages, remove /letters"`

---

## Task 13: Rewrite app/about/page.jsx

**Files:**
- Rewrite: `app/about/page.jsx`

Full rewrite: new subhead, four sections with spec body copy, updated stats (14/3 schools/1000+/140K), pull quote between Section 3 and Section 4, updated CTA.

- [ ] **Replace `app/about/page.jsx` entirely:**

```jsx
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Sean Kane',
  description:
    'Fourteen years teaching middle school. Three sons. The same six skills, in two different rooms.',
};

const PERSON_FULL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school English teacher',
  description: 'Fourteen-year middle school English teacher who applies classroom skills to home parenting. Father of three sons.',
  knowsAbout: [
    'adolescent development',
    'middle school parenting',
    'growth mindset',
    'emotional regulation',
    'classroom management',
    'positive discipline',
    'scaffolded learning',
  ],
  alumniOf: { '@type': 'EducationalOrganization', name: 'Chicago Public Schools' },
  sameAs: [SITE.author.tiktok, SITE.author.instagram],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Teaching Certificate',
    description: '14-year middle school English teacher',
  },
};

export default function AboutPage() {
  return (
    <article className="v6-page theme-terracotta" itemScope itemType="https://schema.org/Person">
      <JsonLd data={PERSON_FULL_SCHEMA} />
      <Nav active="/about" />

      <section className="v6-about-hero">
        <div className="v6-about-hero-text">
          <span className="v6-page-head-eyebrow">About Sean</span>
          <h1>From <em>Room 201</em> to the kitchen table.</h1>
          <p>Fourteen years teaching middle school. Three sons. The same six skills, in two different rooms.</p>
        </div>
        <figure className="v6-about-hero-img">
          <img
            src="/images/sean-hero.jpg"
            alt="Sean Kane — parenting educator and former middle school teacher, Austin TX"
            width={600}
            height={750}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
          />
          <figcaption className="v6-about-hero-img-cap">
            <span>Sean Kane &middot; Austin, TX</span>
          </figcaption>
        </figure>
      </section>

      <section className="v6-about-essay">
        <aside className="v6-about-essay-side" aria-label="Article info">
          <div><b>12 min</b> read</div>
          <div>
            <span style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Last updated</span>
            May 2026
          </div>
          <nav className="v6-about-essay-toc" aria-label="Table of contents">
            <span style={{ fontFamily: 'var(--serif-display)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 18, marginBottom: 8, display: 'block' }}>Inside</span>
            <a href="#room-201">i. Room 201</a>
            <a href="#what-worked">ii. What worked there</a>
            <a href="#kitchen">iii. Kitchen table</a>
            <a href="#now">iv. What I&apos;m doing now</a>
            <a href="#contact">v. Get in touch</a>
          </nav>
        </aside>

        <div className="v6-about-prose" itemProp="description">

          {/* Section 1 */}
          <h2 id="room-201">Room 201.</h2>
          <p>
            I was a middle school educator for fourteen years, starting my career in 5th grade on
            the South Side of Chicago. I moved to the West Side and worked at an all-boys school in
            some of the most formative years of my life. Work brought our family to Austin, Texas,
            where I worked for four years as a 9th-grade teacher and school administrator. Always
            teaching language arts, somehow always from Room 201. Those years taught me an immense
            amount about what works and what won&apos;t work with our kids &mdash; but fatherhood
            made it urgent.
          </p>
          <p>
            The man who taught me most was Dave Deal. Founding Dean of students at the all-boys
            school where I worked, and the most quietly relentless teacher I&apos;ve ever met. His
            high standards were the most respectful thing a child could experience. Every year, his
            first lesson taught the kids that their brain was neuroplastic &mdash; he showed them MRI
            scans to prove it. All of it in the service of a growth mindset: the idea that we can
            always learn, and engage in change. He would tell them, &ldquo;I&apos;m so glad you made
            a mistake. We learn nothing from our successes. We learn everything from these.&rdquo;
          </p>
          <p>
            That was the disposition. Every kid, limitless. Every mistake, useful. Every day a chance
            to grow. Mr. Deal wasn&apos;t a cheerleader and he wasn&apos;t soft &mdash; he was strict,
            structured, and demanding. But he treated every kid like a person becoming, not a problem
            to manage. I followed him around for years trying to learn how he did it.
          </p>
          <p>
            What I eventually figured out was this: the kids who do well in middle school
            aren&apos;t the ones who happen to be born good at it. They&apos;re the ones being
            taught &mdash; actively taught, with patience and repetition &mdash; how to handle their
            feelings, how to stay in something hard, how to look at their own choices honestly, how
            to repair when they&apos;ve broken something. There&apos;s a set of skills underneath
            everything else. And those skills can be taught.
          </p>

          {/* Section 2 */}
          <h2 id="what-worked">What worked there.</h2>
          <figure className="v6-about-figure">
            <Image src="/images/sean-teaching.jpg" alt="Sean in the classroom" width={500} height={375} />
            <figcaption>The classroom, circa 2017.</figcaption>
          </figure>
          <p>
            After fourteen years of watching this developmental window play out with over a thousand
            kids, the patterns started to feel less like patterns and more like a curriculum. Six
            things kids in this age are always building, in some order, whether the adults around
            them notice or not &mdash; emotional literacy, resilience, reflection, relationship,
            autonomy, communication. The adults who taught them connected with kids, and helped them
            grow. And the kids who engaged with that work realized the person I am matters more than
            the scores I earn.
          </p>
          <p>
            You also start to see what the kids in front of you can do that no adult is giving them
            credit for. A twelve-year-old can think honestly about their own behavior if you ask the
            right question and wait long enough for the answer. A thirteen-year-old can apologize
            without prompting if they&apos;ve watched the adults in their life do it first. A
            fourteen-year-old can sit with something difficult instead of running from it &mdash;
            once they&apos;ve done it a few times and noticed they survived.
          </p>
          <p>
            It&apos;s not magic. It&apos;s teaching. And the disposition Dave Deal modeled &mdash;
            this kid is forming, not finished; this moment is data, not a verdict; everything is
            learnable &mdash; turns out to be a daily practice.
          </p>

          {/* Section 3 */}
          <h2 id="kitchen">Kitchen table.</h2>
          <p>
            I became a dad in my late twenties and now have three boys. There wasn&apos;t one moment
            when fatherhood reframed everything I&apos;d learned in the classroom &mdash; it happened
            gradually, over years, as one boy became three and the work I&apos;d been doing with other
            people&apos;s kids became the work I had to do at home, every day, with much less distance
            and much more emotional weight.
          </p>
          <p>
            What I noticed was that I parent like a teacher. Not deliberately at first &mdash;
            it&apos;s just the only way I know how. I name what&apos;s happening when I see it. I ask
            the question instead of declaring the answer. I inspect rather than expect. I model what
            I want to see, more often than I tell them what to do. I structure every routine and follow
            through. I&apos;ve spent fourteen years building these habits with other people&apos;s
            children. They don&apos;t switch off when I walk through the door of my own house.
          </p>
          <p>But teaching your own kids is different, and harder.</p>
          <p>
            The detachment that lets you see other people&apos;s children clearly doesn&apos;t exist
            when the kid in front of you is yours. The emotional stakes change, the strategies change,
            but what remains is the understanding that every kid deserves the support that allows them
            to be their best. In a school year, you become a slice of the child&apos;s story and they
            move on in June. In your home, you are a main character &mdash; and the goal is to remain
            connected, in some way, forever.
          </p>
          <p>
            In 2021 we bought a small flower farm in Texas, which is where I started keeping a real
            practice of being someone who&apos;s still learning. I knew nothing about farming. I had
            to figure it out the same way I tell parents to figure parenting out: try, fail, ask better
            questions, watch the people who know more than you, and keep going. The farm taught me what
            I&apos;d been telling kids for years. Growth happens when the conditions are right. You
            can&apos;t force it.
          </p>
          <p>
            But it also taught me about potential again. Just because you feel lost doesn&apos;t mean
            you can&apos;t grow. Great things happen when we try, fail, learn, and try again. And
            that&apos;s my invitation to parents &mdash; just keep growing.
          </p>

          {/* Stats block */}
          <div className="v6-about-stats" role="list">
            <div className="v6-about-stat" role="listitem">
              <b itemProp="yearsOfExperience">14</b>
              <div className="v6-about-stat-l">yrs &middot; Teaching middle school</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>3</b>
              <div className="v6-about-stat-l">Schools, two cities</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>1,000+</b>
              <div className="v6-about-stat-l">Students taught</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>140K</b>
              <div className="v6-about-stat-l">Following across social</div>
            </div>
          </div>

          {/* Pull quote between Section 3 and Section 4 */}
          <blockquote style={{
            fontFamily: 'var(--serif-display)',
            fontStyle: 'italic',
            fontSize: 26,
            fontWeight: 500,
            color: 'var(--ink)',
            borderLeft: '4px solid var(--accent)',
            paddingLeft: 28,
            margin: '48px 0',
            lineHeight: 1.5,
          }}>
            In a school year, you become a slice of the child&apos;s story and they move on in June.
            In your home, you are a main character &mdash; and the goal is to remain connected, in
            some way, forever.
          </blockquote>

          {/* Section 4 */}
          <h2 id="now">What I&apos;m doing now.</h2>
          <p>
            I&apos;m still teaching &mdash; just not in Room 201. The classroom now is the weekly
            newsletter, the videos, the long essays, the coaching calls with parents who want a
            teacher in their corner. There&apos;s a course coming, built around the six skills,
            designed for parents who want the full curriculum instead of the highlights. And the
            daily work of raising three boys, which is the only part of any of this that
            isn&apos;t optional.
          </p>
          <p>
            I do this work because I still believe in kids. Fourteen years in a classroom
            didn&apos;t burn that out &mdash; it affirmed my vocation. Every kid I taught was
            becoming someone, and most of them have. I want every parent reading this to feel about
            their own kid the way I felt about mine: that this is a person worth knowing, that this
            phase is a chance to do something with, and that the work you&apos;re doing matters even
            when nobody hands you a grade for it.
          </p>
          <p>Your kid is awesome. The trick is staying close enough, and patient enough, and curious enough to see it.</p>

          {/* Contact */}
          <h2 id="contact">Get in touch.</h2>
          <p>
            I read every email. I take a small number of speaking engagements each year (schools,
            faith communities, parent groups, teacher trainings), and a smaller number of 1:1
            coaching clients when my schedule allows. The fastest way to reach me is the Saturday
            newsletter &mdash; reply to any one and it lands in my inbox.
          </p>
        </div>
      </section>

      <section className="v6-about-end">
        <span className="v6-page-head-eyebrow">Two ways forward</span>
        <h2>Start where you are.</h2>
        <div style={{ maxWidth: 400, margin: '0 auto 16px' }}>
          <SubscribeForm
            variant="light"
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Get the weekly newsletter →"
          />
        </div>
        <Link href="/about#contact" className="v6-cta v6-cta-ghost">
          Or work with me directly &rarr;
        </Link>
      </section>

      <Footer />
    </article>
  );
}
```

- [ ] **Commit:** `git add app/about/page.jsx && git commit -m "about: rewrite with 14-year copy, new stats, pull quote, Section 4"`

---

## Task 14: Create app/course/page.jsx

**Files:**
- Create: `app/course/page.jsx`

This is a pre-launch waitlist page. No pricing shown. All "Enroll" buttons read "Join the waitlist." The testimonial section is replaced with a For/Not For two-column qualifier block.

- [ ] **Create `app/course/` directory and `app/course/page.jsx`:**

```jsx
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Middle Skills — The Course',
  description:
    'A self-paced course on the six skills middle schoolers are building — and how parents teach into each one. Join the waitlist.',
  openGraph: { title: 'Middle Skills | Growth Mindset Parenting' },
};

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'Middle Skills',
  description: 'A self-paced course on the six skills middle schoolers are building and how parents teach them.',
  provider: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
  educationalLevel: 'Parents of middle schoolers (ages 9–15)',
};

const MODULES = [
  {
    n: '01',
    title: 'Emotional Literacy',
    desc: 'How kids recognize, name, and regulate emotion. Why "calm down" doesn\'t work — and what actually does.',
  },
  {
    n: '02',
    title: 'Resilience',
    desc: 'The challenge → regulation → action → reflection loop. How kids build durability — and how to stop solving their problems for them.',
  },
  {
    n: '03',
    title: 'Reflection',
    desc: 'How experience becomes identity — and the questions parents ask to scaffold honest self-observation instead of shame.',
  },
  {
    n: '04',
    title: 'Relationship',
    desc: 'Trust, repair, and the daily work of staying close while your kid pulls away. The skill underneath every other skill.',
  },
  {
    n: '05',
    title: 'Autonomy',
    desc: 'The handoff from you running their life to them running it. Confidence, accountability, and executive function — taught, not assumed.',
  },
  {
    n: '06',
    title: 'Communication',
    desc: 'Tone, listening, disagreement, and repair. Your voice in conflict is the voice they\'ll borrow.',
  },
];

const PREVIEW_CARDS = [
  {
    n: '01', eyebrow: '01 · EMOTIONAL LITERACY',
    title: 'Naming what\'s happening inside.',
    body: 'How kids learn to recognize, name, and regulate feelings — and what changes when they do.',
  },
  {
    n: '02', eyebrow: '02 · RESILIENCE',
    title: 'Staying in it.',
    body: 'How kids build the capacity to stay engaged with discomfort long enough to learn from it.',
  },
  {
    n: '03', eyebrow: '03 · REFLECTION',
    title: 'Looking back honestly.',
    body: 'How experience becomes identity — and the questions parents ask to scaffold it.',
  },
  {
    n: '04', eyebrow: '04 · RELATIONSHIP',
    title: 'Staying connected.',
    body: 'The skill underneath every other skill — trust, repair, honest communication, collaboration.',
  },
  {
    n: '05', eyebrow: '05 · AUTONOMY',
    title: 'Standing on their own.',
    body: 'The gradual handoff from you running their life to them running it — one capacity at a time.',
  },
  {
    n: '06', eyebrow: '06 · COMMUNICATION',
    title: 'Saying it well.',
    body: 'Tone, listening, disagreement, and repair — the skills that hold every relationship together.',
  },
];

const FAQS = [
  {
    q: 'Is this a self-paced course or a cohort?',
    a: 'Both, gently. The lessons are self-paced — you work through them on your schedule, with lifetime access. But there\'s also a monthly office hour where I meet with enrolled parents to talk through what\'s actually happening in their houses. Show up to none, all of them, or whichever ones fit your month.',
  },
  {
    q: 'How is this different from your free newsletter?',
    a: 'The newsletter is short, one piece of teaching at a time, distributed weekly. The course is the whole curriculum — sequenced, scripted, with worksheets and the 90-day plan you can actually run. The newsletter is the front door. The course is the house.',
  },
  {
    q: 'What ages does it work for?',
    a: 'It\'s built for parents of kids roughly 9 to 15 — the middle years, where the brain is unusually open and the parent is still the most trusted teacher. Some parts scale up and down; the core skills hold across that whole window.',
  },
  {
    q: 'Does my partner need to take it with me?',
    a: 'No, but it helps if you both eventually do. About 40% of enrolled parents take it as a couple. The course includes co-parenting modules and a track for solo and shared parenting both.',
  },
  {
    q: 'Is there a refund policy?',
    a: '30 days, no questions, no funnels. If it isn\'t useful, write me, I\'ll send the money back the same day.',
  },
  {
    q: 'Can my school or parent group buy it as a group?',
    a: 'Yes. There\'s a group rate for 10+ enrollments and a school license for libraries. Email me directly.',
  },
];

const FOR_LIST = [
  'Have a kid (or kids) somewhere between 9 and 15',
  'See parenting as a practice',
  'Are aiming for relationship, not outcomes',
  'Want a curriculum, not a content drip',
  'Trust that this work is taught, not enforced',
  'Are willing to do their own growing alongside their kid\'s',
  'Want depth over checklists',
  'Would rather understand what\'s happening developmentally than memorize a script',
];

const NOT_FOR_LIST = [
  'Want a one-size-fits-all blueprint',
  'See middle school as a phase to survive',
  'Are looking for a way to make their kid more compliant',
  'Need a fix by Friday',
  'Believe their kid\'s behavior is a character problem rather than a skill gap',
  'Aren\'t ready to examine their own patterns alongside their kid\'s',
  'Are shopping for tactics without context',
];

export default function CoursePage() {
  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={COURSE_SCHEMA} />
      <Nav active="/course" />

      {/* PAGE HEADER */}
      <header className="v6-page-head" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
        <div>
          <h1 className="v6-page-head-h1" style={{ fontSize: 56 }}>
            Middle Skills.
          </h1>
          <p style={{ fontFamily: 'var(--serif-text)', fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 60, marginTop: 16 }}>
            The full course on the six skills your kid is building.
          </p>
          <div className="v6-page-head-meta" style={{ marginTop: 32 }}>
            <div><b>06</b> Middle Skills</div>
            <div><b>Self-paced</b> With monthly office hours</div>
            <div><b>Lifetime</b> Access + updates</div>
            <div><b>Built by</b> A teacher of 14 years</div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
            <Link href="#waitlist" className="v6-cta v6-cta-primary">
              Join the waitlist <span>&rarr;</span>
            </Link>
            <Link href="#curriculum" className="v6-cta v6-cta-ghost">
              See the curriculum
            </Link>
          </div>
        </div>

        {/* Right-rail waitlist box */}
        <div id="waitlist" style={{ background: 'var(--card-clay)', border: '1.5px solid var(--ink)', borderRadius: 16, padding: 32, position: 'sticky', top: 24 }}>
          <p style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 22, margin: '0 0 4px' }}>Middle Skills</p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>Coming this fall.</p>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink-soft)', margin: '0 0 20px' }}>
            A self-paced course on the six skills middle schoolers are building — and how parents teach into each one. Join the waitlist for first access, founder&apos;s pricing, and a personal note when enrollment opens.
          </p>
          <SubscribeForm
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Join the waitlist →"
          />
          <p style={{ fontSize: 12, color: 'var(--ink-mute)', marginTop: 12 }}>No spam. No countdown. Just a quiet email when the doors open.</p>
        </div>
      </header>

      {/* FLAGSHIP SECTION */}
      <section style={{ padding: '64px 0', borderTop: '1.5px solid var(--rule)' }} aria-label="About the course">
        <span className="v6-work-eyebrow">The flagship</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 40, letterSpacing: '-0.025em', margin: '12px 0 24px', maxWidth: '20ch' }}>
          The whole curriculum, taught the way I taught middle schoolers.
        </h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: '65ch', marginBottom: 16 }}>
          Six modules, one per Middle Skill. The same skills I taught for fourteen years in middle school classrooms — now adapted for the parents teaching them at home. Each module covers what the skill is, how it develops, what gets in the way, and the specific moves that help your kid build it.
        </p>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 18, lineHeight: 1.7, color: 'var(--ink-soft)', maxWidth: '65ch' }}>
          It&apos;s not a system. It&apos;s not a hack. It&apos;s a curriculum — readings, short videos, scripts, worksheets, and the kind of tactical detail you can actually use at the dinner table tonight. Self-paced so you can take it on your own timeline; monthly office hours with me when you want to talk it through with a teacher and other parents doing the work.
        </p>
      </section>

      {/* PREVIEW CARDS — six modules */}
      <section style={{ padding: '0 0 80px' }} aria-label="Course modules" id="curriculum">
        <span className="v6-work-eyebrow">The path</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 8px' }}>
          Six skills. Six modules. One course.
        </h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, color: 'var(--ink-soft)', maxWidth: '65ch', marginBottom: 40 }}>
          Each module is a self-contained curriculum on one of the Middle Skills — what it is, why it matters in the middle years, what gets in the way, and the specific moves parents use to teach it. Take them in order or skip to the one you need most this week.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PREVIEW_CARDS.map((card) => (
            <div key={card.n} className="v6-card card-cream" style={{ cursor: 'default' }}>
              <div className="v6-card-top">
                <span className="v6-card-eyebrow">{card.eyebrow}</span>
              </div>
              <h3 className="v6-card-title" style={{ fontSize: 20 }}>{card.title}</h3>
              <p className="v6-card-body">{card.body}</p>
              <div className="v6-card-cta" style={{ color: 'var(--accent)' }}>
                Preview module &rarr;
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK BLOCK — mid-page CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 16, padding: '64px 48px', margin: '0 0 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>The whole course</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>Middle Skills.</h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.75)', maxWidth: '60ch' }}>
          Six modules. The complete curriculum on the skills middle schoolers are building. Self-paced, with monthly office hours, lifetime access, and the kind of tactical depth that takes years of teaching to develop.
        </p>
        <div>
          <Link href="#waitlist" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--accent)', color: 'var(--paper)', fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 16, padding: '14px 28px', borderRadius: 8, textDecoration: 'none' }}>
            Join the waitlist &rarr;
          </Link>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Founders get first access and our best pricing.</p>
      </section>

      {/* FOR / NOT FOR */}
      <section style={{ padding: '0 0 80px' }} aria-label="Is this course for you?">
        <span className="v6-work-eyebrow">Is this for you?</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 8px' }}>
          Who Middle Skills was built for.
        </h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, color: 'var(--ink-soft)', maxWidth: '65ch', marginBottom: 40 }}>
          I&apos;d rather you skip this course than buy something that isn&apos;t going to work for you. So here&apos;s the honest version of who it&apos;s for, and who it isn&apos;t.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 20 }}>This course is for parents who&hellip;</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FOR_LIST.map((item, i) => (
                <li key={i} style={{ fontFamily: 'var(--serif-text)', fontSize: 16, lineHeight: 1.5, color: 'var(--ink)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--accent)', fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 14, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', marginBottom: 20 }}>This course is not for parents who&hellip;</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {NOT_FOR_LIST.map((item, i) => (
                <li key={i} style={{ fontFamily: 'var(--serif-text)', fontSize: 16, lineHeight: 1.5, color: 'var(--ink-soft)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--ink-mute)', fontWeight: 700, flexShrink: 0 }}>&times;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CURRICULUM DETAIL */}
      <section style={{ padding: '0 0 80px', borderTop: '1.5px solid var(--rule)' }} aria-label="Curriculum detail">
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.025em', margin: '48px 0 8px' }}>Six modules. The work, in full.</h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, color: 'var(--ink-soft)', maxWidth: '65ch', marginBottom: 40 }}>
          Each module is roughly 90 minutes of video broken into 4–6 lessons, plus a worksheet you&apos;ll actually use. Watch in order, or skip to the skill your kid is working on right now.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1.5px solid var(--ink)' }}>
          {MODULES.map((mod) => (
            <div key={mod.n} style={{ padding: '32px 0', borderBottom: '1.5px solid var(--rule)', display: 'grid', gridTemplateColumns: '48px 200px 1fr', gap: 32, alignItems: 'start' }}>
              <span style={{ fontFamily: 'var(--serif-display)', fontStyle: 'italic', fontSize: 40, color: 'var(--accent)', fontWeight: 500, lineHeight: 1 }}>{mod.n}</span>
              <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', paddingTop: 8 }}>{mod.title}</span>
              <div>
                <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 16, margin: '0 0 8px', color: 'var(--ink)' }}>{mod.desc}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-mute)', margin: 0 }}>Lessons coming soon.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 0 80px' }} aria-label="FAQ">
        <span className="v6-work-eyebrow">FAQ</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.025em', margin: '12px 0 4px' }}>Questions parents actually ask.</h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 16, color: 'var(--ink-soft)', marginBottom: 40 }}>
          Don&apos;t see yours? Email me directly — I read every one.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1.5px solid var(--rule)' }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ padding: '28px 0', borderBottom: '1.5px solid var(--rule)' }}>
              <p style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 17, margin: '0 0 8px' }}>{faq.q}</p>
              <p style={{ fontFamily: 'var(--serif-text)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-soft)', margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL DARK BLOCK */}
      <section style={{ background: 'var(--ink)', color: 'var(--paper)', borderRadius: 16, padding: '64px 48px', margin: '0 0 80px', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <span style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Ready when you are.</span>
        <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 44, letterSpacing: '-0.03em', margin: 0 }}>Join the waitlist for Middle Skills.</h2>
        <p style={{ fontFamily: 'var(--serif-text)', fontSize: 17, lineHeight: 1.65, color: 'rgba(255,255,255,0.75)', maxWidth: '55ch' }}>
          Lifetime access. Monthly office hours. Private parent community. 30-day refund, no questions, no funnels.
        </p>
        <div style={{ maxWidth: 400 }}>
          <SubscribeForm
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Join the waitlist →"
          />
        </div>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Founders get first access and our best pricing.</p>
      </section>

      <Footer />
    </article>
  );
}
```

- [ ] **Commit:** `git add app/course/page.jsx && git commit -m "course: create pre-launch waitlist page"`

---

## Task 15: Update app/sitemap.js and app/layout.jsx

**Files:**
- Modify: `app/sitemap.js`
- Verify `app/layout.jsx` (description already updated in Task 6)

- [ ] **Replace `app/sitemap.js`:**

```js
import { getAllLetters } from '../lib/letters';
import { SITE } from '../data/site';

const STATIC_PAGES = [
  { url: `${SITE.url}/`,          lastModified: '2026-05-28' },
  { url: `${SITE.url}/skills/`,   lastModified: '2026-05-28' },
  { url: `${SITE.url}/writing/`,  lastModified: '2026-05-28' },
  { url: `${SITE.url}/course/`,   lastModified: '2026-05-28' },
  { url: `${SITE.url}/about/`,    lastModified: '2026-05-28' },
];

export default function sitemap() {
  const letters = getAllLetters();
  const writingUrls = letters.map((letter) => ({
    url: `${SITE.url}/writing/${letter.slug}/`,
    lastModified: letter.date,
  }));

  return [...STATIC_PAGES, ...writingUrls];
}
```

- [ ] **Commit:** `git add app/sitemap.js && git commit -m "sitemap: update to new URL structure"`

---

## Task 16: Build verification

**Files:**
- No changes — verify existing changes compile

- [ ] **Run the build:**
```bash
cd /Users/katiewest/Documents/Growth_Mindset/Website && npm run build
```

Expected output:
- 0 errors
- Static pages exported: `/`, `/skills/`, `/writing/`, `/writing/[slug]/` × 15, `/course/`, `/about/`, `/privacy/`, `/not-found/`
- `out/` directory updated

If build fails:
- Check for `PRACTICES` import remaining anywhere: `grep -r "from.*practices" app/`
- Check for `LETTERS` direct import (should go through `lib/letters`): `grep -rn "from.*content/letters" app/`
- Fix import errors first, then re-run

- [ ] **Commit:** No commit needed if no files changed. If fixes were required: `git add -A && git commit -m "fix: resolve build errors after URL migration"`

---

## Self-Review Checklist

**Spec coverage:**

| Spec section | Covered in |
|---|---|
| Global: 12→14 years | Task 1, 7, 8, 12, 13 |
| Global: Chicago→Austin TX | Task 1 (site.js), present in JSX already |
| Global: nav "Practices"→"Skills" | Task 2 |
| Global: nav "Letters"→"Writing" | Task 2 |
| Global: remove Contact/Partnerships from nav | Task 2 |
| Global: remove subscriber counts | Task 1 (removed from site.js) |
| Global: Sunday→Saturday | Task 7, 10, 11, 13 |
| Global: email placeholder | Tasks 7, 8, 10, 11, 13, 14 |
| Global: practices→skills language | Task 4, 7, 8 |
| Page 1 Home: hero copy | Task 7 |
| Page 1 Home: ticker | Task 3 |
| Page 1 Home: two-tier offer section | Task 5, 7 |
| Page 1 Home: six skills section | Task 4, 7 |
| Page 1 Home: pull quote | Task 7 |
| Page 1 Home: 2-card channels | Task 7 |
| Page 1 Home: footer CTA | Task 7 |
| Page 2 Skills: URL /practices→/skills | Task 8 |
| Page 2 Skills: all copy changes | Task 8 |
| Page 2 Skills: no toggle bar | Not present in build — n/a |
| Page 2 Skills: intro paragraph | Task 8 |
| Page 2 Skills: right-meta verb cues | Task 4, 5, 8 |
| Page 2 Skills: CTA block | Task 8 |
| Page 3 Writing: URL /letters→/writing | Task 11, 12 |
| Page 3 Writing: header copy | Task 11 |
| Page 3 Writing: filter restructure | Task 10 |
| Page 3 Writing: subscribe sidebar | Task 10 |
| Page 4 About: headline/subhead | Task 13 |
| Page 4 About: Section 1–4 body copy | Task 13 |
| Page 4 About: stats (14/3/1000+/140K) | Task 13 |
| Page 4 About: pull quote | Task 13 |
| Page 4 About: CTA block | Task 13 |
| Page 5 Course: new page | Task 14 |
| Page 5 Course: waitlist (no pricing) | Task 14 |
| Page 5 Course: For/Not For block | Task 14 |
| Page 5 Course: 6 modules (not 8) | Task 14 |
| Page 5 Course: FAQ | Task 14 |

**Open items from spec (not implemented — flagged as spec notes):**
- Course launch timing ("Coming this fall") — placeholder in Task 14, confirm with Sean
- "40% take it as a couple" in FAQ A4 — left as-is, spec flagged to verify
- "Six out of ten subscribers open every one" — left as-is, spec flagged to verify
- "Work with me" page — nav links to `/about#contact`; full page not yet specced
- Field Guide delivery/thank-you page — not specced; hero CTA links to `#subscribe`

---

*Plan saved: 2026-05-28 | Spec source: GMP_Site_Copy_Update_Spec_for_Claude_Code.md*
