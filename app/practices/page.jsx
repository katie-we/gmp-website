import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { PRACTICES } from '../../data/practices';
import { SITE } from '../../data/site';

export const metadata = {
  title: 'The Six Practices',
  description:
    'Six classroom-tested parenting practices with scripts, cadences, and pull quotes. From Sean Kane, 12-year middle school teacher.',
  openGraph: { title: 'The Six Practices | Growth Mindset Parenting' },
};

const HOWTO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'The Six Growth Mindset Parenting Practices',
  description: 'Six classroom-tested practices for parents of tweens and middle schoolers.',
  author: { '@type': 'Person', name: 'Sean Kane', url: SITE.url },
  itemListElement: PRACTICES.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    description: p.body,
  })),
};

export default function PracticesPage() {
  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={HOWTO_SCHEMA} />
      <Nav active="/practices" />

      <header className="v6-page-head">
        <div>
          <span className="v6-page-head-eyebrow">The Practices</span>
        </div>
        <h1 className="v6-page-head-h1">
          Six things I do every day — in the classroom, and at home.
        </h1>
        <div className="v6-page-head-meta">
          <div><b>06</b> Practices</div>
          <div><b>12 yrs</b> Tested with kids</div>
          <div><b>5 min</b> Average read</div>
        </div>
      </header>

      <section className="v6-prac-a-list" aria-label="The six practices">
        {PRACTICES.map((p) => (
          <article key={p.n} id={p.slug} className="v6-prac-a-row">
            <div className="v6-prac-a-num" aria-hidden="true">{p.n}</div>
            <div className="v6-prac-a-tag">{p.tag}</div>
            <div className="v6-prac-a-text">
              <h2>{p.title}</h2>
              <p>{p.body}</p>
              <blockquote className="v6-prac-a-pull">&ldquo;{p.pull}&rdquo;</blockquote>
              <p className="v6-prac-a-script-label">The script:</p>
              <p className="v6-prac-a-script">{p.script}</p>
              <p className="v6-prac-a-cadence">Practice cadence: <strong>{p.time}</strong></p>
            </div>
          </article>
        ))}
      </section>

      <section className="v6-sub" id="subscribe" aria-label="Subscribe">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">The Sunday Letter</span>
            <h2>Get one practice a week, plainspoken.</h2>
            <p>Free, every Sunday. {SITE.stats.subscribers} subscribers. Unsubscribe in one click.</p>
          </div>
          <SubscribeForm />
        </div>
      </section>

      <Footer />
    </article>
  );
}
