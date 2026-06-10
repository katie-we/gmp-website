import Nav from '../components/Nav';
import Footer from '../components/Footer';
import Ticker from '../components/Ticker';
import SubscribeForm from '../components/SubscribeForm';
import JsonLd from '../components/JsonLd';
import SkillsAccordion from '../components/SkillsAccordion';
import FieldGuideHeroCta from '../components/FieldGuideHeroCta';
import FieldGuideCardOne from '../components/FieldGuideCardOne';
import ChaosSection from '../components/ChaosSection';
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
            <FieldGuideHeroCta />
            <a
              href="https://www.instagram.com/reel/DWFiLYZE_K3/"
              className="v6-cta v6-cta-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch the 90-second intro
            </a>
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

      {/* MISSION */}
      <section className="v6-mission" aria-label="What I'm here to do">
        <div className="v6-mission-inner">
          <div className="v6-mission-eyebrow">
            <span className="v6-dot" aria-hidden="true" />
            What I&rsquo;m here to do
          </div>
          <h2 className="v6-mission-h">
            I help everyday parents turn the hard moments into real{' '}
            <em>connection</em> &mdash; and raise resilient, capable kids while keeping
            their patience, their weekends, and the <em>relationship</em> intact.
          </h2>
          <div className="v6-mission-body">
            <p>
              If you want a home that runs on connection instead of consequences &mdash;
              where the hard days don&rsquo;t harden into hard years &mdash; you&rsquo;re in
              the right place. You don&rsquo;t need to be a perfect parent or a child
              psychologist. You need a handful of practices that cut through the chaos and
              tell you the next right move.
            </p>
            <p>
              I spent fourteen years learning them in a classroom. They work just as well at
              your kitchen table. Here you&rsquo;ll find the field guide, the Saturday Letter,
              the course, and the practices themselves &mdash; built to help you take one
              small action tonight and raise kids who can stand on their own.
            </p>
          </div>
          <a href="#skills" className="v6-mission-cta">
            See where to start
            <span className="v6-mission-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <ChaosSection />

      {/* SIX MIDDLE SKILLS — accordion */}
      <SkillsAccordion />

      {/* QUOTE */}
      <section className="v6-quote" aria-label="A note from Sean">
        <div className="v6-quote-grid">
          <figure className="v6-quote-photo">
            <Image
              src="/images/sean-quote.jpg"
              alt="Sean Kane"
              width={400}
              height={300}
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
          <a href={SITE.author.instagram} className="v6-show v6-show-yt" target="_blank" rel="noopener noreferrer">
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
          <Link href="#subscribe" className="v6-show v6-show-podcast">
            <span className="v6-show-tag">PARENTING PODCAST &middot; COMING SOON</span>
            <h3>The Podcast</h3>
            <p>Honest, classroom-tested conversations on raising kids in the middle years. Subscribe to be the first to know when it launches.</p>
            <div className="v6-card-cta">Get notified <span className="v6-card-arrow" aria-hidden="true">&rarr;</span></div>
          </Link>
        </div>
      </section>

      {/* SUBSCRIBE CTA */}
      <section className="v6-sub" id="subscribe" aria-label="Subscribe to the newsletter">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">THE NEWSLETTER</span>
            <h2>One letter, every Saturday.</h2>
            <p>The developmental science your kid&rsquo;s teachers know &mdash; explained in plain language for parents doing this without a manual.</p>
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
