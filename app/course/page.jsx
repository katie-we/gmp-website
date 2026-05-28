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
    desc: "How kids recognize, name, and regulate emotion. Why \"calm down\" doesn't work — and what actually does.",
  },
  {
    n: '02',
    title: 'Resilience',
    desc: "The challenge → regulation → action → reflection loop. How kids build durability — and how to stop solving their problems for them.",
  },
  {
    n: '03',
    title: 'Reflection',
    desc: "How experience becomes identity — and the questions parents ask to scaffold honest self-observation instead of shame.",
  },
  {
    n: '04',
    title: 'Relationship',
    desc: "Trust, repair, and the daily work of staying close while your kid pulls away. The skill underneath every other skill.",
  },
  {
    n: '05',
    title: 'Autonomy',
    desc: "The handoff from you running their life to them running it. Confidence, accountability, and executive function — taught, not assumed.",
  },
  {
    n: '06',
    title: 'Communication',
    desc: "Tone, listening, disagreement, and repair. Your voice in conflict is the voice they'll borrow.",
  },
];

const PREVIEW_CARDS = [
  {
    n: '01', eyebrow: '01 · EMOTIONAL LITERACY',
    title: "Naming what's happening inside.",
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
    a: "Both, gently. The lessons are self-paced — you work through them on your schedule, with lifetime access. But there's also a monthly office hour where I meet with enrolled parents to talk through what's actually happening in their houses. Show up to none, all of them, or whichever ones fit your month.",
  },
  {
    q: 'How is this different from your free newsletter?',
    a: "The newsletter is short, one piece of teaching at a time, distributed weekly. The course is the whole curriculum — sequenced, scripted, with worksheets and the 90-day plan you can actually run. The newsletter is the front door. The course is the house.",
  },
  {
    q: 'What ages does it work for?',
    a: "It's built for parents of kids roughly 9 to 15 — the middle years, where the brain is unusually open and the parent is still the most trusted teacher. Some parts scale up and down; the core skills hold across that whole window.",
  },
  {
    q: 'Does my partner need to take it with me?',
    a: "No, but it helps if you both eventually do. About 40% of enrolled parents take it as a couple. The course includes co-parenting modules and a track for solo and shared parenting both.",
  },
  {
    q: 'Is there a refund policy?',
    a: "30 days, no questions, no funnels. If it isn't useful, write me, I'll send the money back the same day.",
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
  "Are willing to do their own growing alongside their kid's",
  'Want depth over checklists',
  "Would rather understand what's happening developmentally than memorize a script",
];

const NOT_FOR_LIST = [
  'Want a one-size-fits-all blueprint',
  'See middle school as a phase to survive',
  "Are looking for a way to make their kid more compliant",
  'Need a fix by Friday',
  "Believe their kid's behavior is a character problem rather than a skill gap",
  "Aren't ready to examine their own patterns alongside their kid's",
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
          <p style={{ fontFamily: 'var(--serif-text)', fontSize: 20, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: '60ch', marginTop: 16 }}>
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
            variant="light"
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
