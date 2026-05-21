import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ticker from '../components/Ticker';
import SubscribeForm from '../components/SubscribeForm';
import JsonLd from '../components/JsonLd';
import { PRACTICES } from '../data/practices';
import { SITE } from '../data/site';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Growth Mindset Parenting | Sean Kane',
  description:
    'Six classroom-tested practices for parents of tweens and middle schoolers. From a 12-year teacher and dad of three.',
  openGraph: {
    title: 'Growth Mindset Parenting',
    description: 'Six classroom-tested practices for parents of tweens and middle schoolers.',
    images: [{ url: '/images/sean-hero.jpg' }],
  },
};

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school teacher',
  description: 'Twelve-year middle school English teacher applying classroom practices to home parenting. Father of three sons.',
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
    target: [`${SITE.url}/letters/`],
  },
};

const JUMP_CARDS = [
  { color: 'card-cream', n: '01', eyebrow: 'Start here', title: 'The Six Practices', body: 'The classroom-tested system, adapted for the kitchen table. Six tools, each with a script.', href: '/practices', cta: 'Read the practices' },
  { color: 'card-blush', n: '02', eyebrow: 'Sunday letter', title: 'Letters', body: 'A free Sunday note from Sean. Short, plainspoken, one practice at a time.', href: '/letters', cta: 'Browse the archive' },
  { color: 'card-clay', n: '03', eyebrow: 'The system', title: 'Parent like a teacher', body: 'What twelve years in the classroom taught me about the three years at the kitchen table.', href: '/about', cta: 'Sean\'s story' },
  { color: 'card-sage', n: '04', eyebrow: '1:1 coaching', title: 'Coaching', body: 'A small number of families each quarter. Real plans, real follow-through.', href: '/about#contact', cta: 'Get in touch' },
  { color: 'card-ink', n: '05', eyebrow: 'Talks & schools', title: 'Speaking', body: 'Parent groups, schools, faith communities. One talk that actually changes behavior.', href: '/about#contact', cta: 'Book a talk' },
];

export default function HomePage() {
  return (
    <main className="v6-root theme-terracotta">
      <JsonLd data={PERSON_SCHEMA} />
      <JsonLd data={WEBSITE_SCHEMA} />

      <Nav />

      {/* HERO */}
      <section className="v6-hero" aria-label="Introduction">
        <div className="v6-hero-text">
          <div className="v6-hero-eyebrow">
            <span className="v6-dot" aria-hidden="true" />
            Teacher. Dad. <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Practicist.</span>
          </div>
          <h1 className="v6-hero-h1">
            I taught middle school for twelve years.{' '}
            <em>Everything I learned</em> is on the fridge.
          </h1>
          <p className="v6-hero-sub">
            Six classroom-tested practices for parents of tweens and middle schoolers.
            Plainspoken. Free. Backed by twelve years of evidence — my students.
          </p>
          <div className="v6-hero-actions">
            <Link href="/practices" className="v6-cta v6-cta-primary">
              The six practices <span className="v6-cta-arrow" aria-hidden="true">&rarr;</span>
            </Link>
            <Link href="/letters" className="v6-cta v6-cta-ghost">
              Browse the letters
            </Link>
          </div>
          <span className="v6-hero-mark">
            {SITE.stats.subscribers} parents reading every Sunday.
          </span>
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
            <span>Chicago, IL</span>
          </div>
        </figure>
      </section>

      <Ticker />

      {/* JUMP INTO */}
      <section className="v6-jump" aria-label="Jump into">
        <div className="v6-jump-head">
          <span className="v6-jump-eyebrow">Jump into</span>
          <h2>Tools and stories for parents who want a system that holds.</h2>
        </div>
        <nav className="v6-jump-grid" aria-label="Site sections">
          {JUMP_CARDS.map((c) => (
            <Link key={c.n} href={c.href} className={`v6-card ${c.color}`}>
              <div className="v6-card-top">
                <span className="v6-card-n">{c.n}</span>
                <span className="v6-card-eyebrow">{c.eyebrow}</span>
              </div>
              <h3 className="v6-card-title">{c.title}</h3>
              <p className="v6-card-body">{c.body}</p>
              <div className="v6-card-cta">
                {c.cta}
                <span className="v6-card-arrow" aria-hidden="true">&rarr;</span>
              </div>
            </Link>
          ))}
        </nav>
      </section>

      {/* PRACTICES PREVIEW */}
      <section className="v6-work" aria-label="The six practices">
        <div className="v6-work-head">
          <span className="v6-work-eyebrow">The Practices</span>
          <h2>Six things I do every day — in the classroom, and at home.</h2>
        </div>
        <div className="v6-work-grid" role="list">
          {PRACTICES.map((p) => (
            <Link key={p.n} href={`/practices#${p.slug}`} className="v6-prac" role="listitem">
              <div className="v6-prac-num" aria-hidden="true">{p.n}</div>
              <div className="v6-prac-tag">{p.tag}</div>
              <h3 className="v6-prac-title">{p.title}</h3>
              <p className="v6-prac-body">{p.body}</p>
              <div className="v6-prac-arrow" aria-hidden="true">&rarr;</div>
            </Link>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="v6-quote" aria-label="About Sean">
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
            <p style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>From the about page</p>
            <p className="v6-quote-q">
              &ldquo;My wife used to say I had an unfair advantage. I didn&apos;t.{' '}
              I had <em>twelve years of practice</em> with other people&apos;s kids.&rdquo;
            </p>
            <div className="v6-quote-attrib">
              <span className="v6-quote-name">Sean Kane</span>
              <span className="v6-quote-title">Teacher, 2012–2024. Dad, permanently.</span>
            </div>
          </blockquote>
        </div>
      </section>

      {/* WHERE TO FIND */}
      <section className="v6-shows" aria-label="Where to find Sean">
        <div className="v6-work-head" style={{ marginBottom: 32 }}>
          <span className="v6-work-eyebrow">Find Sean</span>
          <h2>Where else to find this work.</h2>
        </div>
        <div className="v6-shows-grid">
          <a href={SITE.author.tiktok} className="v6-show v6-show-podcast" target="_blank" rel="noopener noreferrer">
            <span className="v6-show-tag">TikTok</span>
            <h3>@growth.mindset.parenting</h3>
            <p>Short videos on the practices in real life. {SITE.stats.followers} followers. New posts most weeks.</p>
            <div className="v6-card-cta">Watch <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </a>
          <Link href="/letters" className="v6-show v6-show-yt">
            <span className="v6-show-tag">Sunday Letter</span>
            <h3>The Letters</h3>
            <p>One practice, written plainly, every Sunday. Free. {SITE.stats.subscribers} subscribers. Unsubscribe in one click.</p>
            <div className="v6-card-cta">Browse the archive <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </Link>
          <Link href="/about#contact" className="v6-show v6-show-essay">
            <span className="v6-show-tag">Speaking & Coaching</span>
            <h3>Work with Sean</h3>
            <p>Parent groups, schools, and 1:1 coaching. A small number of engagements each quarter.</p>
            <div className="v6-card-cta">Get in touch <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="v6-sub" id="subscribe" aria-label="Subscribe to the Sunday letter">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">The Sunday Letter</span>
            <h2>One practice. Every Sunday. Free.</h2>
            <p>
              Join {SITE.stats.subscribers} parents and teachers. Plainspoken, three minutes to read,
              ten years to internalize. Unsubscribe in one click.
            </p>
          </div>
          <SubscribeForm
            inputPlaceholder="you@yourkitchen.com"
            buttonLabel="Subscribe free →"
          />
        </div>
      </section>

      <Footer />
    </main>
  );
}
