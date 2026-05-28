import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import SubscribeForm from '../../components/SubscribeForm';
import JsonLd from '../../components/JsonLd';
import { SITE } from '../../data/site';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Sean Kane',
  description:
    'Twelve years teaching middle school. Three sons. One conviction: the same practices that unlock kids in a classroom unlock them at home.',
};

const PERSON_FULL_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sean Kane',
  url: SITE.url,
  jobTitle: 'Parenting educator and former middle school English teacher',
  description: 'Twelve-year middle school English teacher who applies classroom growth-mindset practices to home parenting. Father of three sons.',
  knowsAbout: [
    'adolescent development',
    'middle school parenting',
    'growth mindset',
    'emotional regulation',
    'classroom management',
    'positive discipline',
    'scaffolded learning',
  ],
  alumniOf: { '@type': 'EducationalOrganization', name: 'Chicago Public Schools' },
  sameAs: [SITE.author.tiktok, SITE.author.instagram],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'Teaching Certificate',
    description: '12-year middle school English teacher, Chicago Public Schools',
  },
};

export default function AboutPage() {
  return (
    <article className="v6-page theme-terracotta" itemScope itemType="https://schema.org/Person">
      <JsonLd data={PERSON_FULL_SCHEMA} />
      <Nav active="/about" />

      <section className="v6-about-hero">
        <div className="v6-about-hero-text">
          <span className="v6-page-head-eyebrow">About Sean</span>
          <h1>From <em>room 201</em> to the kitchen table.</h1>
          <p>
            Twelve years teaching middle school. Three sons. One unshakeable
            conviction that the same growth-mindset practices that unlock kids in
            a classroom unlock them at home — just with fewer interruptions
            and better snacks.
          </p>
        </div>
        <figure className="v6-about-hero-img">
          <img
            src="/images/sean-hero.jpg"
            alt="Sean Kane — parenting educator and former middle school teacher, Austin TX"
            width={600}
            height={750}
            style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: 8 }}
          />
          <figcaption className="v6-about-hero-img-cap">
            <span>Sean Kane &middot; Austin, TX</span>
          </figcaption>
        </figure>
      </section>

      <section className="v6-about-essay">
        <aside className="v6-about-essay-side" aria-label="Article info">
          <div><b>11 min</b> read</div>
          <div>
            <span style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Last updated</span>
            May 2026
          </div>
          <nav className="v6-about-essay-toc" aria-label="Table of contents">
            <span style={{ fontFamily: 'var(--serif-display)', fontStyle: 'italic', color: 'var(--accent)', fontSize: 18, marginBottom: 8, display: 'block' }}>Inside</span>
            <a href="#room-201">i. Room 201</a>
            <a href="#what-worked">ii. What worked there</a>
            <a href="#kitchen">iii. Kitchen table</a>
            <a href="#now">iv. Now</a>
            <a href="#contact">v. Get in touch</a>
          </nav>
        </aside>

        <div className="v6-about-prose" itemProp="description">
          <h2 id="room-201">Room 201.</h2>
          <p>
            For twelve years I taught seventh-grade language arts in a public middle school
            on Chicago&apos;s north side. My classroom was room 201 — a corner room with bad
            lighting, a stubborn radiator, and thirty-one chairs that I rearranged the way
            other people rearrange furniture: weekly, hopefully, with strong opinions.
          </p>
          <p>
            I loved that room. I loved that age. Seventh graders are widely considered to be
            the worst people on earth, but they are also, secretly, some of the most generous,
            curious, and unintentionally hilarious humans I&apos;ve ever spent time with. They will
            tell you the truth about your lesson before you&apos;ve finished writing the date on
            the board.
          </p>
          <blockquote>
            What I learned in twelve years was simple: kids do not rise to what you wish for
            them. They rise to what you build, name, and inspect.
          </blockquote>
          <p>
            That is the entire job. It looks like a hundred small things — a routine for
            walking in the door, a phrase for praise, a pause before consequence, a script for
            apology — but the headline is the same. <strong>Build the practices. Name
            them. Inspect them gently. Repair when they break.</strong> Wishing is not a strategy.
            Yelling is the absence of one.
          </p>

          <h2 id="what-worked">What worked there.</h2>
          <p>
            Six practices kept showing up, year after year, room after room, kid after kid.
            They worked in honors classes and remedial classes; they worked with the kid who
            cried at her locker and the kid who set fire to a notebook (once, I want to be
            clear). They worked because they weren&apos;t about the kid — they were about the
            adult and the room.
          </p>
          <figure className="v6-about-figure">
            <Image src="/images/sean-teaching.jpg" alt="Sean in the classroom" width={500} height={375} />
            <Image src="/images/sean-studio.jpg" alt="Sean writing" width={500} height={375} />
            <figcaption>Left: the classroom, circa 2017. Right: where the newsletter actually gets written.</figcaption>
          </figure>
          <p>
            The practices aren&apos;t original. None of them are mine. I borrowed every single one
            from someone better — from Lemov, from Yeager, from a school librarian
            named Mrs. Esparza who saved my career in 2014 by telling me to stop talking and
            start watching. What I did was sand them down to the version that worked
            with thirty seventh-graders on a Tuesday when the heat was out, and then wrote them
            down so I wouldn&apos;t forget.
          </p>

          <h2 id="kitchen">Kitchen table.</h2>
          <p>
            My eldest is Henry. He was born during my fifth year of teaching, and for the
            first three years of his life, my wife and I parented him by guessing. We read the
            books. We did the bedtimes. He mostly turned out fine, in the way that kids of two
            well-meaning, sleep-deprived, extremely literate parents do.
          </p>
          <p>
            Then his brother Sam was born, and three years later, Theo, and somewhere in the
            middle of that I noticed something embarrassing: I was a better teacher than I was a
            parent. The worst parts of my parenting were the parts where I&apos;d forgotten to be
            the adult I was at school. I was wishing where I should have been inspecting. I was
            reacting where I should have been pausing. I was lecturing where I should have been
            modeling.
          </p>
          <blockquote>
            My wife used to say I had an unfair advantage. I didn&apos;t. I had twelve years
            of practice with other people&apos;s kids.
          </blockquote>
          <p>
            So I took the practices home. I wrote them on an index card on the fridge. I taught
            them to my sons the way I&apos;d taught poetry to a hundred seventh graders —
            embarrassingly explicitly, with humor, with patience, and with the underlying belief
            that they were capable of learning them. They were. They all are.
          </p>

          <div className="v6-about-stats" role="list">
            <div className="v6-about-stat" role="listitem">
              <b itemProp="yearsOfExperience">12</b>
              <div className="v6-about-stat-l">Years teaching middle school</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>3</b>
              <div className="v6-about-stat-l">Sons</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>{SITE.stats.subscribers}</b>
              <div className="v6-about-stat-l">Saturday letter readers</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>{SITE.stats.instagramFollowers}</b>
              <div className="v6-about-stat-l">Instagram followers</div>
            </div>
            <div className="v6-about-stat" role="listitem">
              <b>{SITE.stats.tiktokFollowers}</b>
              <div className="v6-about-stat-l">TikTok followers</div>
            </div>
          </div>

          <h2 id="now">What I&apos;m doing now.</h2>
          <p>
            In 2024 I left full-time teaching to write about all of this. The Saturday letter is
            the thing I&apos;m proudest of: short, plainspoken, free, every Saturday, no funnels.
          </p>
          <p>
            I still substitute teach when my old school asks me to. I still believe that the
            classroom is the most underrated parenting research lab in the country. And I
            still rearrange the furniture in my own kitchen, weekly, hopefully, with strong
            opinions, while three sons watch me carry chairs around and ask me what I&apos;m doing.
          </p>
          <p>I tell them: I&apos;m building the room.</p>

          <h2 id="contact">Get in touch.</h2>
          <p>
            I read every email. I take a small number of speaking engagements each year (schools,
            faith communities, parent groups, teacher trainings), and a smaller number of 1:1
            coaching clients when my schedule allows. The fastest way to reach me is the Saturday
            letter — reply to any one and it lands in my inbox.
          </p>
        </div>
      </section>

      <section className="v6-about-end">
        <span className="v6-page-head-eyebrow">Start where you are</span>
        <h2>One <em>practice.</em> One Saturday. Free.</h2>
        <p>
          Join {SITE.stats.subscribers} parents and teachers who like their advice plainspoken.
        </p>
        <div style={{ maxWidth: 400, margin: '0 auto 16px' }}>
          <SubscribeForm
            variant="light"
            inputPlaceholder="your@email.com"
            buttonLabel="Subscribe free →"
          />
        </div>
        <Link href="/practices" className="v6-cta v6-cta-ghost">
          The six practices
        </Link>
      </section>

      <Footer />
    </article>
  );
}
