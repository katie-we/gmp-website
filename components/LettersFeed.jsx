'use client';
import { useState } from 'react';
import Link from 'next/link';
import SubscribeForm from './SubscribeForm';

const TOPIC_LABELS = {
  regulation: 'Regulation',
  repair: 'Repair',
  standards: 'Standards',
  praise: 'Praise',
  foundations: 'Foundations',
  'skill-building': 'Skill-building',
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

export default function LettersFeed({ letters, totalPages }) {
  const [activeTopic, setActiveTopic] = useState(null);

  // Count letters per topic (preserve display order)
  const topicOrder = ['regulation', 'repair', 'standards', 'praise', 'skill-building', 'foundations'];
  const topicCounts = {};
  letters.forEach((l) => {
    if (l.topic) topicCounts[l.topic] = (topicCounts[l.topic] || 0) + 1;
  });
  const topics = topicOrder.filter((t) => topicCounts[t]);

  const displayed = activeTopic ? letters.filter((l) => l.topic === activeTopic) : letters;

  return (
    <div className="v6-letters">
      <section className="v6-letters-feed" aria-label="Letters archive">
        {displayed.map((letter) => (
          <LetterRow key={letter.slug} letter={letter} />
        ))}

        {!activeTopic && totalPages > 1 && (
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
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>
            The Saturday Letter
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink-soft)', margin: '0 0 16px' }}>
            One classroom-tested practice in your inbox, every Saturday. Free, plainspoken, unsubscribe in one click.
          </p>
          <SubscribeForm
            variant="light"
            inputPlaceholder="your@email.com"
            buttonLabel="Subscribe free"
          />
        </div>

        <div className="v6-letters-side-card" style={{ background: 'var(--card-sage)' }}>
          <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 16, margin: '0 0 12px' }}>
            Browse by topic
          </h3>
          <div className="v6-letters-side-tags">
            {topics.map((topic) => (
              <button
                key={topic}
                className={`v6-letters-side-tag${activeTopic === topic ? ' is-active' : ''}`}
                onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
                style={{ cursor: 'pointer', border: 'none', fontFamily: 'inherit' }}
              >
                {TOPIC_LABELS[topic]}
                <span className="v6-letters-side-tag-n">{topicCounts[topic]}</span>
              </button>
            ))}
          </div>
          {activeTopic && (
            <button
              onClick={() => setActiveTopic(null)}
              style={{
                marginTop: 12,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                color: 'var(--ink-soft)',
                padding: 0,
              }}
            >
              ← All letters
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
