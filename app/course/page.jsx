import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Link from 'next/link';

export const metadata = {
  title: 'Middle Skills — The Course | Growth Mindset Parenting',
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
  { n: '01', title: 'Emotional Literacy', desc: 'How kids recognize, name, and regulate emotion. Why “calm down” doesn’t work — and what actually does.' },
  { n: '02', title: 'Resilience', desc: 'The challenge → regulation → action → reflection loop. How kids build durability — and how to stop solving their problems for them.' },
  { n: '03', title: 'Reflection', desc: 'How experience becomes identity — and the questions parents ask to scaffold honest self-observation instead of shame.' },
  { n: '04', title: 'Relationship', desc: 'Trust, repair, and the daily work of staying close while your kid pulls away. The skill underneath every other skill.' },
  { n: '05', title: 'Autonomy', desc: 'The handoff from you running their life to them running it. Confidence, accountability, and executive function — taught, not assumed.' },
  { n: '06', title: 'Communication', desc: 'Tone, listening, disagreement, and repair. Your voice in conflict is the voice they’ll borrow.' },
];

const FAQS = [
  {
    n: '01',
    q: 'Is this a self-paced course or a cohort?',
    a: 'Both, gently. The lessons are self-paced — you work through them on your schedule, with lifetime access. But there’s also a monthly office hour where I meet with enrolled parents to talk through what’s actually happening in their houses. Show up to none, all of them, or whichever ones fit your month.',
  },
  {
    n: '02',
    q: 'How is this different from your free newsletter?',
    a: 'The newsletter is short, one piece of teaching at a time, distributed weekly. The course is the whole curriculum — sequenced, scripted, with worksheets and the 90-day plan you can actually run. The newsletter is the front door. The course is the house.',
  },
  {
    n: '03',
    q: 'What ages does it work for?',
    a: 'It’s built for parents of kids roughly 9 to 15 — the middle years, where the brain is unusually open and the parent is still the most trusted teacher. Some parts scale up and down; the core skills hold across that whole window.',
  },
  {
    n: '04',
    q: 'Does my partner need to take it with me?',
    a: 'No, but it helps if you both eventually do. The course includes co-parenting modules and a track for solo and shared parenting both.',
  },
  {
    n: '05',
    q: 'Is there a refund policy?',
    a: '30 days, no questions, no funnels. If it isn’t useful, write me, I’ll send the money back the same day.',
  },
  {
    n: '06',
    q: 'Can my school or parent group buy it as a group?',
    a: 'Yes. There’s a group rate for 10+ enrollments and a school license for libraries. Email me directly.',
  },
];

export default function CoursePage() {
  return (
    <article className="v6-page theme-terracotta">
      <JsonLd data={COURSE_SCHEMA} />
      <Nav active="/course" />

      {/* ===== PAGE HEADER ===== */}
      <header className="v6-page-head" aria-label="Course introduction">
        <div>
          <span className="v6-page-head-eyebrow">The Course</span>
        </div>
        <h1 className="v6-page-head-h1">
          Middle Skills &mdash; <em>develop the whole kid</em>
        </h1>
        <div className="v6-page-head-meta">
          <div><b>06</b>Skills</div>
          <div><b>Self-paced</b>Lifetime access</div>
          <div><b>Coming soon</b>Join the waitlist</div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="v6-course-hero" aria-label="About the course">
        <div className="v6-course-hero-text">
          <div style={{ fontFamily: '"Lora", Georgia, serif', fontStyle: 'italic', fontSize: 28, color: 'var(--accent)' }}>
            The flagship
          </div>
          <h1>The whole curriculum taught the way I taught middle schoolers.</h1>
          <p className="v6-course-hero-sub">
            Six modules, one per Middle Skill. The same skills I taught for fourteen years in middle school classrooms &mdash; now adapted for the parents teaching them at home. Each module covers what the skill is, how it develops, what gets in the way, and the specific moves that help your kid build it.
          </p>
          <p className="v6-course-hero-sub">
            It&apos;s not a system. It&apos;s not a hack. It&apos;s a curriculum &mdash; readings, short videos, scripts, worksheets, and the kind of tactical detail you can actually use at the dinner table tonight. Self-paced so you can take it on your own timeline; monthly office hours with me when you want to talk it through with a teacher and other parents doing the work.
          </p>
          <div className="v6-course-hero-meta">
            <div className="v6-course-hero-meta-item"><b>18</b>Video lessons</div>
            <div className="v6-course-hero-meta-item"><b>09</b>Worksheets</div>
            <div className="v6-course-hero-meta-item"><b>90 days</b>Plan</div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="#waitlist" className="v6-cta v6-cta-primary">
              Join the waitlist <span className="v6-cta-arrow">&rarr;</span>
            </Link>
            <Link href="#curriculum" className="v6-cta v6-cta-ghost">
              See the curriculum
            </Link>
          </div>
        </div>

        <aside className="v6-course-hero-card">
          <span className="v6-course-hero-card-eyebrow">Middle Skills</span>
          <div style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 36, lineHeight: 1.0, letterSpacing: '-0.025em', textWrap: 'balance' }}>
            The whole curriculum.
          </div>
          <ul>
            <li>18 video lessons across 6 modules</li>
            <li>Printable worksheets &amp; scripts</li>
            <li>Monthly live office hour with Sean</li>
            <li>Private parent community</li>
            <li>Lifetime access &amp; updates</li>
          </ul>
          <Link href="#waitlist" className="v6-cta v6-cta-primary" style={{ justifyContent: 'center' }}>
            Join the waitlist &rarr;
          </Link>
          <div style={{ fontFamily: '"Lora", Georgia, serif', fontStyle: 'italic', fontSize: 15, color: 'var(--ink-soft)', textAlign: 'center' }}>
            No spam. No countdown. Just a quiet email when the doors open.
          </div>
        </aside>
      </section>

      {/* ===== CURRICULUM ===== */}
      <section className="v6-curric" id="curriculum" aria-label="Course curriculum">
        <header className="v6-curric-head">
          <span className="v6-page-head-eyebrow">Curriculum</span>
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 'clamp(40px,4.4vw,64px)', lineHeight: 1, letterSpacing: '-0.03em', margin: '8px 0 16px', textWrap: 'balance' }}>
            Six modules. ~20 lessons. One whole curriculum.
          </h2>
          <p style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 18, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0 }}>
            Each module is roughly 90 minutes of video, broken into 4&ndash;6 short lessons, plus a worksheet you&apos;ll actually use. Watch in order, or skip to the skill your kid is working on right now.
          </p>
        </header>
        <div className="v6-curric-grid">
          {MODULES.map((mod) => (
            <article key={mod.n} className="v6-curric-mod">
              <div className="v6-curric-mod-num">{mod.n}</div>
              <div>
                <h3>{mod.title}</h3>
                <p>{mod.desc}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-mute)', margin: 0 }}>Lessons coming soon.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ===== IS THIS FOR YOU ===== */}
      <section className="v6-fit" aria-label="Is this course for you?">
        <header className="v6-fit-head">
          <div>
            <span className="v6-page-head-eyebrow">Is this for you?</span>
            <h2>Who Middle Skills was built for.</h2>
          </div>
          <p className="v6-fit-head-aside">
            I&apos;d rather you skip this course than buy something that isn&apos;t going to work for you. So here&apos;s the honest version of who it&apos;s for, and who it isn&apos;t.
          </p>
        </header>
        <div className="v6-fit-grid">
          <div className="v6-fit-card v6-fit-card-yes">
            <h3>This course is for parents who&hellip;</h3>
            <ul>
              <li>Have a kid (or kids) somewhere between 9 and 15</li>
              <li>See parenting as a practice</li>
              <li>Are aiming for relationship, not outcomes</li>
              <li>Want a curriculum, not a content drip</li>
              <li>Trust that this work is taught, not enforced</li>
              <li>Are willing to do their own growing alongside their kid&apos;s</li>
              <li>Want depth over checklists</li>
              <li>Would rather understand what&apos;s happening developmentally than memorize a script</li>
            </ul>
          </div>
          <div className="v6-fit-card v6-fit-card-no">
            <h3>This course is not for parents who&hellip;</h3>
            <ul>
              <li>Want a one-size-fits-all blueprint</li>
              <li>See middle school as a phase to survive</li>
              <li>Are looking for a way to make their kid more compliant</li>
              <li>Need a fix by Friday</li>
              <li>Believe their kid&apos;s behavior is a character problem rather than a skill gap</li>
              <li>Aren&apos;t ready to examine their own patterns alongside their kid&apos;s</li>
              <li>Are shopping for tactics without context</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {/* Note: placeholder quotes — replace with real IG/TikTok comments before launch */}
      <section className="v6-testi" aria-label="What parents are saying">
        <header className="v6-testi-head">
          <span className="v6-page-head-eyebrow">From Instagram &amp; TikTok</span>
          <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 'clamp(40px,4.4vw,56px)', lineHeight: 1, letterSpacing: '-0.03em', margin: '8px 0 0', textWrap: 'balance' }}>
            What parents keep telling us.
          </h2>
        </header>
        <div className="v6-testi-grid">
          <div className="v6-testi-card">
            <div className="v6-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote className="v6-testi-q">
              &ldquo;I read the practices on a Sunday and on Monday morning my house felt different. Not magic &mdash; just the first time I&apos;d ever been given a script.&rdquo;
            </blockquote>
            <div className="v6-testi-attrib">
              <span className="v6-testi-attrib-name">Maria L.</span>
              <span className="v6-testi-attrib-meta">Mom of two &middot; Houston, TX</span>
            </div>
          </div>
          <div className="v6-testi-card">
            <div className="v6-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote className="v6-testi-q">
              &ldquo;I&apos;m a teacher too, and I kept thinking: this is the parent training I wish my kids&apos; parents had. Sean writes like a colleague who&apos;s done both jobs.&rdquo;
            </blockquote>
            <div className="v6-testi-attrib">
              <span className="v6-testi-attrib-name">Daniel K.</span>
              <span className="v6-testi-attrib-meta">Middle school teacher &middot; Brooklyn, NY</span>
            </div>
          </div>
          <div className="v6-testi-card">
            <div className="v6-testi-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote className="v6-testi-q">
              &ldquo;The repair script alone was worth it. We use it two or three times a week. The kids ask for it now &mdash; &lsquo;can we do the redo?&rsquo;&rdquo;
            </blockquote>
            <div className="v6-testi-attrib">
              <span className="v6-testi-attrib-name">Priya &amp; Arjun S.</span>
              <span className="v6-testi-attrib-meta">Parents of three &middot; Toronto, ON</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="v6-faq" aria-label="Frequently asked questions">
        <div className="v6-faq-grid">
          <div>
            <span className="v6-page-head-eyebrow">FAQ</span>
            <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 800, fontSize: 'clamp(40px,4.4vw,56px)', lineHeight: 0.98, letterSpacing: '-0.03em', margin: '8px 0 16px', textWrap: 'balance' }}>
              Questions parents actually ask.
            </h2>
            <p style={{ fontFamily: '"Source Serif 4", Georgia, serif', fontSize: 17, lineHeight: 1.55, color: 'var(--ink-soft)', margin: 0, maxWidth: '36ch' }}>
              Don&apos;t see yours?{' '}
              <a href={`mailto:sean@growthmindsetparenting.com`} style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                Email me directly
              </a>{' '}
              &mdash; I read every one.
            </p>
          </div>
          <div className="v6-faq-list">
            {FAQS.map((faq) => (
              <div key={faq.n} className="v6-faq-item">
                <h3>{faq.q}<span>{faq.n}</span></h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WAITLIST CTA ===== */}
      <section className="v6-enroll" id="waitlist" aria-label="Join the waitlist">
        <div>
          <div style={{ fontFamily: '"Lora", Georgia, serif', fontStyle: 'italic', fontSize: 24, color: 'var(--accent)', marginBottom: 12 }}>Coming soon</div>
          <h2>Join the waitlist for <em>Middle Skills.</em></h2>
          <p>Lifetime access, monthly office hours, and a private parent community when it opens. I&apos;ll send one note the day the doors open &mdash; nothing else.</p>
        </div>
        <div className="v6-enroll-cta">
          <SubscribeForm
            inputPlaceholder="sean@growthmindsetparenting.com"
            buttonLabel="Join the waitlist →"
          />
        </div>
      </section>

      <Footer />
    </article>
  );
}
