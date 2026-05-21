import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { getLettersPage, getAllLetters } from '../../lib/letters';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Letters',
  description:
    'A Sunday note and occasional essay from Sean Kane. Practical, plainspoken parenting advice written by a 12-year teacher. Free.',
};

function LetterRow({ letter }) {
  const isEssay = letter.type === 'essay';
  return (
    <Link href={`/letters/${letter.slug}/`} className="v6-letter">
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

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Growth Mindset Parenting Letters',
  url: `${SITE.url}/letters/`,
  description: 'A Sunday note and occasional essay on classroom-tested parenting practices.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
};

export default function LettersPage() {
  const { items, totalPages, total } = getLettersPage(1);

  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={BLOG_SCHEMA} />
      <Nav active="/letters" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">Letters</span>
        </div>
        <h1 className="v6-page-head-h1">
          A Sunday note. An occasional <em>essay</em>. Plainspoken parenting, written by a teacher.
        </h1>
        <div className="v6-page-head-meta">
          <div><b>{total}</b> Letters in archive</div>
          <div><b>{SITE.stats.subscribers}</b> Subscribers</div>
          <div><b>Free</b> Always</div>
        </div>
      </header>

      {/* Mobile subscribe (hidden on desktop via CSS) */}
      <div className="v6-letters-side-mobile" id="subscribe">
        <div className="v6-letters-side-card">
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>The Sunday Letter</h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            One classroom-tested practice, every Sunday. Free.
          </p>
          <SubscribeForm inputPlaceholder="your@email.com" buttonLabel="Subscribe free" />
        </div>
      </div>

      <div className="v6-letters">
        <section className="v6-letters-feed" aria-label="Letters archive">
          {items.map((letter) => (
            <LetterRow key={letter.slug} letter={letter} />
          ))}

          {totalPages > 1 && (
            <nav className="v6-letters-pager" aria-label="Pagination">
              <span className="v6-letters-pager-btn is-disabled">&larr; Newer</span>
              <span className="v6-letters-pager-btn is-current">1</span>
              {Array.from({ length: Math.min(totalPages - 1, 4) }, (_, i) => i + 2).map((p) => (
                <Link key={p} href={`/letters/page/${p}/`} className="v6-letters-pager-btn">{p}</Link>
              ))}
              {totalPages > 5 && <span className="v6-letters-pager-meta">of {totalPages}</span>}
              <Link href="/letters/page/2/" className="v6-letters-pager-btn">Older &rarr;</Link>
            </nav>
          )}
        </section>

        <aside className="v6-letters-side" aria-label="Sidebar">
          <div className="v6-letters-side-card">
            <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>The Sunday Letter</h2>
            <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
              One classroom-tested practice in your inbox, every Sunday. Free, plainspoken, unsubscribe in one click.
            </p>
            <SubscribeForm />
          </div>
          <div className="v6-letters-side-card" style={{ background: 'var(--card-sage)' }}>
            <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 16, margin: '0 0 12px' }}>Most-read</h3>
            <ol style={{ margin: 0, paddingLeft: 18, fontFamily: 'var(--serif-text)', fontSize: 14, lineHeight: 1.6 }}>
              <li>Be the weather</li>
              <li>Three to one, explained</li>
              <li>I taught middle school for twelve years</li>
              <li>Bad moment, great opportunity</li>
            </ol>
          </div>
        </aside>
      </div>

      <Footer />
    </article>
  );
}
