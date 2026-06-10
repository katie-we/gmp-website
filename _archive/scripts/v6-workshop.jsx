/* global React */

const V6_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "voice": "friendly",
  "energy": "signature",
  "frame": "workshop"
}/*EDITMODE-END*/;

// VOICE — reshapes the entire hero copy package (eyebrow, headline, subhead,
// CTA pair). Each preset is a coherent SEO-tuned posture, not a single string.
const V6_VOICE = {
  friendly: {
    label: "Friendly",
    sub: "Teacher-dad, plainspoken",
    eyebrow: "Hey, I'm Sean.",
    pre: "I taught middle\u00a0school for ", em: "twelve years", post: ". Now I'm a dad. ",
    mark: "It turns out the same growth-mindset practices that unlock kids in a classroom unlock them at home.",
    subhead: "From room 214 to the kitchen table \u2014 same six practices, fewer interruptions.",
    ctaP: "Get the free parenting field guide",
    ctaS: "Watch the 90-second intro",
    sundayEyebrow: "The Sunday letter",
    sundayH: "One practice. One Sunday a month. Free.",
    sundayP: "Joining 4,820 parents and teachers who like their advice plainspoken."
  },
  authoritative: {
    label: "Authoritative",
    sub: "Research-backed, structured",
    eyebrow: "Growth-mindset parenting, plainly stated.",
    pre: "Sharing everything that worked in ", em: "my classroom", post: " \u2014 ",
    mark: "so the same six research-backed practices can work at your kitchen table.",
    subhead: "Twelve years in the classroom. Six tested practices. One coherent system for parents who want to raise resilient kids without losing their weekends.",
    ctaP: "See the curriculum",
    ctaS: "Read the research",
    sundayEyebrow: "Free parenting newsletter",
    sundayH: "Research-backed parenting, every Sunday.",
    sundayP: "One classroom-tested practice in your inbox \u2014 read by 4,820 parents and teachers."
  },
  urgent: {
    label: "Urgent",
    sub: "Tonight\u2011actionable, no fluff",
    eyebrow: "Calm parenting. Real discipline. No yelling.",
    pre: "Everything that worked in ", em: "my classroom", post: ", ",
    mark: "working at your kitchen table \u2014 starting tonight.",
    subhead: "Plainspoken parenting advice. No funnels, no fluff, no \u201cgentle parenting\u201d sermons. Twelve years in the classroom; six practices to start using this week.",
    ctaP: "Start the practices tonight",
    ctaS: "Join 4,820 parents",
    sundayEyebrow: "Sunday reset",
    sundayH: "Reset the week in five minutes, every Sunday.",
    sundayP: "One thing to do Monday morning. Always free. Unsubscribe in one click."
  }
};

// ENERGY — controls visual loudness. Touches accent saturation, type scale,
// card weight, ticker visibility, and supporting-section density.
const V6_ENERGY = {
  quiet: {
    label: "Quiet",
    sub: "Aesop\u2011restrained",
    chromaScale: 0.35,        // multiplier on card chroma
    headlineWeight: 600,
    headlineSize: 64,
    h2Size: 64,
    showTicker: false,
    showQuote: true,
    showShows: false,
    cardRadius: 6,
    cardBorder: "0.5px",
    ctaRadius: 4
  },
  signature: {
    label: "Signature",
    sub: "Confident, photo\u2011forward",
    chromaScale: 1.0,
    headlineWeight: 800,
    headlineSize: 76,
    h2Size: 88,
    showTicker: true,
    showQuote: true,
    showShows: true,
    cardRadius: 16,
    cardBorder: "1.5px",
    ctaRadius: 999
  },
  loud: {
    label: "Loud",
    sub: "Broadcast, ticker on max",
    chromaScale: 2.4,
    headlineWeight: 900,
    headlineSize: 92,
    h2Size: 108,
    showTicker: true,
    showQuote: false,
    showShows: true,
    cardRadius: 24,
    cardBorder: "2.5px",
    ctaRadius: 999
  }
};

// FRAME — reshapes the hero composition + the offerings grid layout.
const V6_FRAME = {
  workshop: {
    label: "Workshop",
    sub: "Big portrait, color\u2011card grid",
    heroCols: "1.4fr 1fr",
    photoAspect: "4 / 5",
    photoTreatment: "color",
    gridStyle: "bento"        // mixed sizes
  },
  studio: {
    label: "Studio",
    sub: "Square portrait, even cards",
    heroCols: "1fr 1fr",
    photoAspect: "1 / 1",
    photoTreatment: "duotone",
    gridStyle: "even"         // 5 equal cards
  },
  dispatch: {
    label: "Dispatch",
    sub: "Wide cinematic, list cards",
    heroCols: "1.8fr 1fr",
    photoAspect: "3 / 4",
    photoTreatment: "mono",
    gridStyle: "stack"        // tall narrow rows
  }
};

function V6Workshop() {
  const [t, setTweak] = (window.useTweaks || (() => [V6_TWEAK_DEFAULTS, () => {}]))(V6_TWEAK_DEFAULTS);

  const SITE = window.GMP.site;
  // Slim view of practices for the homepage (uses bodyShort, not full body)
  const v6Lessons = window.GMP.practices.map(p => ({
    tag: p.tag,
    title: p.title,
    body: p.bodyShort
  }));

  // Substitute live subscriber count into any V6_VOICE string field that
  // mentions "4,820" (the original hardcoded value baked into the voice presets).
  // Lets V6_VOICE stay literal in the source while still updating with site.js.
  const subSwap = (s) => typeof s === "string"
    ? s.replace(/4,820|\b4820\b/g, SITE.formatted.subscribers)
    : s;
  const subSwapAll = (preset) => {
    const out = {};
    for (const k in preset) out[k] = subSwap(preset[k]);
    return out;
  };

  const voice = subSwapAll(V6_VOICE[t.voice] || V6_VOICE.friendly);
  const energy = V6_ENERGY[t.energy] || V6_ENERGY.signature;
  const frame = V6_FRAME[t.frame] || V6_FRAME.workshop;

  // CSS variables driven by the three controls. These cascade into v6.css
  // via custom-properties — one knob, many touch points.
  const rootStyle = {
    "--v6-headline-weight": energy.headlineWeight,
    "--v6-headline-size": energy.headlineSize + "px",
    "--v6-h2-size": energy.h2Size + "px",
    "--v6-card-radius": energy.cardRadius + "px",
    "--v6-card-border": energy.cardBorder,
    "--v6-cta-radius": energy.ctaRadius + "px",
    "--v6-chroma-scale": energy.chromaScale,
    "--v6-hero-cols": frame.heroCols,
    "--v6-photo-aspect": frame.photoAspect
  };

  const v6Offers = [
    { n: "01", eyebrow: "Free \u00b7 5 minutes", title: "The 6 practices that change everything",
      body: "A short field guide built from twelve years of teaching. Read it on your phone tonight; use it tomorrow morning.",
      cta: "Get the guide", bg: "card-cream", href: "practices.html" },
    { n: "02", eyebrow: voice.sundayEyebrow, title: voice.sundayH, body: voice.sundayP, cta: "Subscribe", bg: "card-blush", href: "letters.html" },
    { n: "03", eyebrow: "Course \u00b7 6 weeks", title: "Parent like a teacher",
      body: "A self-paced cohort for parents who want a real system: regulation, repair, scaffolding, and the daily rhythms that make them stick.",
      cta: "Join the waitlist", bg: "card-clay", href: "course.html" },
    { n: "04", eyebrow: "1:1 \u00b7 limited", title: "Coaching",
      body: "Six private sessions to install the practices in your house. Co-build a plan you'll actually run.",
      cta: "Apply", bg: "card-sage", href: "about.html#contact" },
    { n: "05", eyebrow: "Speaking", title: "Talks & schools",
      body: "Keynotes for schools, faith communities, parent groups. Workshops for teachers who want their tools at home, too.",
      cta: "Inquire", bg: "card-ink", href: "about.html#contact" }
  ];

  const TweaksPanel = window.TweaksPanel;
  const TweakSection = window.TweakSection;
  const TweakRadio = window.TweakRadio;

  return (
    <article
      className="v6-root"
      data-energy={t.energy}
      data-frame={t.frame}
      data-photo={frame.photoTreatment}
      data-grid={frame.gridStyle}
      style={rootStyle}
    >
      <nav className="v6-nav">
        <a href="index.html" className="v6-nav-mark">
          <span className="v6-nav-mark-g">GMP</span>
          <span className="v6-nav-mark-text">Growth Mindset Parenting</span>
        </a>
        <div className="v6-nav-links">
          <a href="index.html" aria-current="page" style={{ color: "var(--accent)", fontWeight: 700 }}>Home</a>
          <a href="practices.html">Practices</a>
          <a href="letters.html">Letters</a>
          <a href="course.html">Course</a>
          <a href="about.html">About</a>
        </div>
        <a className="v6-nav-cta" href="#subscribe">Subscribe &rarr;</a>
      </nav>

      <section className="v6-hero">
        <div className="v6-hero-text">
          <div className="v6-hero-eyebrow">
            <span className="v6-dot"></span>
            {voice.eyebrow}
          </div>
          <h1 className="v6-hero-h1">
            {voice.pre}<em>{voice.em}</em>{voice.post}
            <br/><span className="v6-hero-mark">{voice.mark}</span>
          </h1>
          <p className="v6-hero-sub">{voice.subhead}</p>
          <div className="v6-hero-actions">
            <a href="#" className="v6-cta v6-cta-primary">
              {voice.ctaP}
              <span className="v6-cta-arrow">&rarr;</span>
            </a>
            <a href="#" className="v6-cta v6-cta-ghost">{voice.ctaS}</a>
          </div>
        </div>
        <figure className="v6-hero-photo">
          <img src="assets/sean-hero.jpg" alt="Sean Kane" />
          <figcaption className="v6-hero-cap">
            <span>Sean Kane</span>
            <span>Chicago, IL</span>
          </figcaption>
        </figure>
      </section>

      {energy.showTicker && (
        <div className="v6-ticker">
          <div className="v6-ticker-track">
            <span>{SITE.stats.yearsTeaching} years teaching</span><span>&middot;</span>
            <span>{SITE.stats.sons === 3 ? "Three sons" : `${SITE.stats.sons} sons`}</span><span>&middot;</span>
            <span>One Sunday letter</span><span>&middot;</span>
            <span>{SITE.formatted.subscribers} subscribers</span><span>&middot;</span>
            <span>Chicago made</span><span>&middot;</span>
            <span>{SITE.stats.yearsTeaching} years teaching</span><span>&middot;</span>
            <span>{SITE.stats.sons === 3 ? "Three sons" : `${SITE.stats.sons} sons`}</span><span>&middot;</span>
            <span>One Sunday letter</span><span>&middot;</span>
            <span>{SITE.formatted.subscribers} subscribers</span><span>&middot;</span>
            <span>Chicago made</span><span>&middot;</span>
          </div>
        </div>
      )}

      <section className="v6-jump">
        <header className="v6-jump-head">
          <span className="v6-jump-eyebrow">Jump into</span>
          <h2>Tools and stories for parents who want a system that holds.</h2>
        </header>

        <div className="v6-jump-grid">
          {v6Offers.map((o) => (
            <a className={`v6-card ${o.bg}`} href={o.href} key={o.n}>
              <div className="v6-card-top">
                <span className="v6-card-n">{o.n}</span>
                <span className="v6-card-eyebrow">{o.eyebrow}</span>
              </div>
              <h3 className="v6-card-title">{o.title}</h3>
              <p className="v6-card-body">{o.body}</p>
              <span className="v6-card-cta">
                {o.cta}
                <span className="v6-card-arrow">&rarr;</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="v6-work">
        <header className="v6-work-head">
          <span className="v6-work-eyebrow">The Work</span>
          <h2>Six practices I borrowed from the classroom and brought home.</h2>
        </header>
        <div className="v6-work-grid">
          {v6Lessons.map((l, i) => (
            <article className="v6-prac" key={l.title}>
              <div className="v6-prac-num">{String(i+1).padStart(2,'0')}</div>
              <div className="v6-prac-tag">{l.tag}</div>
              <h3 className="v6-prac-title">{l.title}</h3>
              <p className="v6-prac-body">{l.body}</p>
              <span className="v6-prac-arrow">&rarr;</span>
            </article>
          ))}
        </div>
      </section>

      {energy.showQuote && (
        <section className="v6-quote">
          <div className="v6-quote-grid">
            <figure className="v6-quote-photo">
              <img src="assets/sean-studio.jpg" alt="Sean at his desk" />
            </figure>
            <div className="v6-quote-text">
              <span className="v6-work-eyebrow">A note from Sean</span>
              <blockquote className="v6-quote-q">
                &ldquo;My wife used to say I had an unfair advantage. I didn't. I had
                <em> twelve years of practice</em> with other people's kids.
                The lesson plans that worked there work here, too &mdash; just with
                fewer interruptions and better snacks.&rdquo;
              </blockquote>
              <div className="v6-quote-attrib">
                <span className="v6-quote-name">Sean Kane</span>
                <span className="v6-quote-title">Teacher, twelve years &middot; Dad of three</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {energy.showShows && (
        <section className="v6-shows">
          <header className="v6-jump-head">
            <h2>Where else to find me</h2>
            <p>Listen, watch, read &mdash; same practices, different rooms.</p>
          </header>
          <div className="v6-shows-grid">
            <a href="#" className="v6-show v6-show-podcast">
              <div className="v6-show-tag">Parenting podcast</div>
              <h3>The Kitchen Table</h3>
              <p>Honest parenting conversations &mdash; weekly episodes, classroom-tested takeaways.</p>
              <span className="v6-card-cta">Listen <span className="v6-card-arrow">&rarr;</span></span>
            </a>
            <a href="#" className="v6-show v6-show-yt">
              <div className="v6-show-tag">Parenting videos</div>
              <h3>Three-minute practices</h3>
              <p>Short, classroom-tested clips you can watch while the kettle boils.</p>
              <span className="v6-card-cta">Watch <span className="v6-card-arrow">&rarr;</span></span>
            </a>
            <a href="#" className="v6-show v6-show-essay">
              <div className="v6-show-tag">Parenting essays</div>
              <h3>The long form</h3>
              <p>Deep reads on regulation, repair, and raising resilient kids &mdash; written by a teacher.</p>
              <span className="v6-card-cta">Read <span className="v6-card-arrow">&rarr;</span></span>
            </a>
          </div>
        </section>
      )}

      <section className="v6-sub" id="subscribe">
        <div className="v6-sub-card">
          <div className="v6-sub-text">
            <span className="v6-work-eyebrow">{voice.sundayEyebrow}</span>
            <h2>{voice.sundayH}</h2>
            <p>{voice.sundayP}</p>
          </div>
          <form className="v6-sub-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@yourkitchen.com" />
            <button type="submit">Subscribe <span className="v6-cta-arrow">&rarr;</span></button>
          </form>
        </div>
      </section>

      <footer className="v6-foot">
        <div className="v6-foot-mark">
          <span className="v6-nav-mark-g">{SITE.brandShort}</span>
          <span>{SITE.brand}</span>
        </div>
        <div className="v6-foot-links">
          <a href="practices.html">Practices</a>
          <a href="letters.html">Letters</a>
          <a href="course.html">Course</a>
          <a href="about.html#contact">Coaching</a>
          <a href="about.html#contact">Speaking</a>
          <a href="about.html">About</a>
        </div>
        <div className="v6-foot-meta">
          <span>{SITE.author} &middot; {SITE.location}</span>
          <span>&copy; {SITE.year}</span>
        </div>
      </footer>

      {TweaksPanel && (
        <TweaksPanel title="Tweaks · The Workshop">
          <TweakSection
            label="Voice"
            description="Reshapes hero copy, CTAs, and the Sunday letter pitch in one move. SEO-tuned."
          />
          <TweakRadio
            label={voice.sub}
            value={t.voice}
            options={Object.entries(V6_VOICE).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={v => setTweak('voice', v)}
          />

          <TweakSection
            label="Energy"
            description="Visual loudness — type scale, color saturation, ticker, card weight, supporting sections."
          />
          <TweakRadio
            label={energy.sub}
            value={t.energy}
            options={Object.entries(V6_ENERGY).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={v => setTweak('energy', v)}
          />

          <TweakSection
            label="Frame"
            description="Composition — hero proportions, photo treatment, and the offerings grid layout."
          />
          <TweakRadio
            label={frame.sub}
            value={t.frame}
            options={Object.entries(V6_FRAME).map(([k, v]) => ({ value: k, label: v.label }))}
            onChange={v => setTweak('frame', v)}
          />
        </TweaksPanel>
      )}
    </article>
  );
}

window.V6Workshop = V6Workshop;
