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
