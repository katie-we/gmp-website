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
      <section className="msk-section" aria-label="The six Middle Skills">
        <p className="msk-eyebrow">WHAT THEY&apos;RE BUILDING</p>
        <h2 className="msk-title">The six Middle Skills.</h2>
        <div className="msk-grid">
          {SKILLS.map((s) => (
            <Link key={s.n} href={`/skills#${s.slug}`} className="msk-card">
              <span className="msk-num">{s.n}</span>
              <h3 className="msk-name">{s.tag}</h3>
              <p className="msk-desc">{s.title}</p>
              <p className="msk-body">{s.body}</p>
              <span className="msk-arrow" aria-hidden="true">&rarr;</span>
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
