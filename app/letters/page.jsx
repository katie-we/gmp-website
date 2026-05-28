import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import LettersFeed from '../../components/LettersFeed';
import JsonLd from '../../components/JsonLd';
import { getAllLetters } from '../../lib/letters';
import { SITE } from '../../data/site';

export const metadata = {
  title: 'Letters',
  description:
    'A Saturday note and occasional essay from Sean Kane. Practical, plainspoken parenting advice written by a 12-year teacher. Free.',
};

const BLOG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Growth Mindset Parenting Letters',
  url: `${SITE.url}/letters/`,
  description: 'A Saturday note and occasional essay on classroom-tested parenting practices.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
};

export default function LettersPage() {
  const letters = getAllLetters();
  const totalPages = Math.ceil(letters.length / 20);

  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={BLOG_SCHEMA} />
      <Nav active="/letters" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">Letters</span>
        </div>
        <h1 className="v6-page-head-h1">
          A Saturday note. An occasional <em>essay</em>. Plainspoken parenting, written by a teacher.
        </h1>
        <div className="v6-page-head-meta">
          <div><b>{letters.length}</b> Letters in archive</div>
          <div><b>{SITE.stats.subscribers}</b> Subscribers</div>
          <div><b>Free</b> Always</div>
        </div>
      </header>

      <LettersFeed letters={letters} totalPages={totalPages} />

      <Footer />
    </article>
  );
}
