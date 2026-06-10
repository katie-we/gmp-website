/**
 * Mobile smoke test — verifies all bug fixes at 375px viewport.
 * Run: node smoke-test.mjs
 * Requires server running at http://localhost:3456
 */
import { chromium } from 'playwright';

const BASE = 'http://localhost:3456';
const MOBILE = { width: 375, height: 812 };

const PAGES = [
  { path: '/',         name: 'Home' },
  { path: '/about/',   name: 'About' },
  { path: '/letters/', name: 'Letters' },
  { path: '/practices/', name: 'Practices' },
  { path: '/letters/on-the-difference-between-a-rule-and-a-ritual/', name: 'Article' },
];

let passed = 0;
let failed = 0;

function ok(label)   { console.log(`  ✅ ${label}`); passed++; }
function fail(label) { console.log(`  ❌ ${label}`); failed++; }

async function checkOverflow(page, context) {
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const viewWidth   = await page.evaluate(() => window.innerWidth);
  if (scrollWidth <= viewWidth) {
    ok(`No horizontal overflow (scrollWidth=${scrollWidth}px, viewport=${viewWidth}px)`);
  } else {
    fail(`HORIZONTAL OVERFLOW — scrollWidth=${scrollWidth}px exceeds viewport ${viewWidth}px by ${scrollWidth - viewWidth}px`);
  }
}

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: MOBILE });
const page = await ctx.newPage();

// ── HOME PAGE ────────────────────────────────────────────────────────────────
console.log('\n📱 Home page');
await page.goto(`${BASE}/`);
await checkOverflow(page);

// TikTok handle fix — @growth.mindset.parenting should not overflow its card
const showH3 = await page.locator('.v6-show h3').first();
const showH3Box  = await showH3.boundingBox();
const cardBox    = await page.locator('.v6-show').first().boundingBox();
if (showH3Box && cardBox && showH3Box.x + showH3Box.width <= cardBox.x + cardBox.width + 2) {
  ok('TikTok handle stays within card bounds');
} else {
  fail(`TikTok handle overflows card (h3 right=${showH3Box?.x + showH3Box?.width}, card right=${cardBox?.x + cardBox?.width})`);
}

// City check — should say Austin, TX not Chicago
const heroCapText = await page.locator('.v6-hero-cap').textContent();
if (heroCapText.includes('Austin, TX')) ok('Hero caption shows Austin, TX');
else fail(`Hero caption says: "${heroCapText}" (expected Austin, TX)`);

// ── LETTERS PAGE ─────────────────────────────────────────────────────────────
console.log('\n📱 Letters page');
await page.goto(`${BASE}/letters/`);
await checkOverflow(page);

// Header stacks: "Letters" eyebrow should appear before the h1
const eyebrowTop = await page.locator('.v6-page-head-eyebrow').boundingBox();
const h1Top      = await page.locator('.v6-page-head-h1').boundingBox();
if (eyebrowTop && h1Top && eyebrowTop.y < h1Top.y) {
  ok('"Letters" eyebrow stacks above heading');
} else {
  fail('"Letters" eyebrow is NOT above the heading — layout not stacking');
}

// Date column: should be noticeably narrower than the title column
const dateBox  = await page.locator('.v6-letter-date').first().boundingBox();
const titleBox = await page.locator('.v6-letter-title').first().boundingBox();
if (dateBox && titleBox && dateBox.width < titleBox.width * 0.35) {
  ok(`Date column (${Math.round(dateBox.width)}px) is narrow vs title (${Math.round(titleBox.width)}px)`);
} else {
  fail(`Date column too wide: date=${Math.round(dateBox?.width)}px, title=${Math.round(titleBox?.width)}px`);
}

// ── ABOUT PAGE ───────────────────────────────────────────────────────────────
console.log('\n📱 About page');
await page.goto(`${BASE}/about/`);
await checkOverflow(page);

// H1 font size should be ≤ 48px on mobile (was 96px, fixed to 44px)
const h1FontSize = await page.locator('.v6-about-hero-text h1').evaluate(
  el => parseFloat(getComputedStyle(el).fontSize)
);
if (h1FontSize <= 48) ok(`About h1 font-size = ${h1FontSize}px (≤ 48px ✓)`);
else fail(`About h1 font-size = ${h1FontSize}px — still too large (should be ≤ 48px)`);

// City check
const captionText = await page.locator('.v6-about-hero-img-cap span').first().textContent();
if (captionText.includes('Austin, TX')) ok('About photo caption shows Austin, TX');
else fail(`About caption says: "${captionText}"`);

// ── PRACTICES PAGE ───────────────────────────────────────────────────────────
console.log('\n📱 Practices page');
await page.goto(`${BASE}/practices/`);
await checkOverflow(page);

// ── ARTICLE PAGE ─────────────────────────────────────────────────────────────
console.log('\n📱 Article page');
await page.goto(`${BASE}/letters/on-the-difference-between-a-rule-and-a-ritual/`);
await checkOverflow(page);

await browser.close();

// ── RESULTS ──────────────────────────────────────────────────────────────────
const total = passed + failed;
console.log(`\n${'─'.repeat(50)}`);
console.log(`Results: ${passed}/${total} passed`);
if (failed > 0) {
  console.log(`\n⚠️  ${failed} check(s) failed — do not mark as done.`);
  process.exit(1);
} else {
  console.log('\n✅ All checks passed.');
}
