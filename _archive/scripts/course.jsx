/* global React */

// Course page — reads catalog and pricing from window.GMP.
// All numbers (lessons, modules, prices, parent count) come from content/site.js
// or content/courses.js — never hardcode.

const { flagship: COURSE_FLAGSHIP, minis: COURSE_MINIS, curriculum: COURSE_CURRIC, faq: COURSE_FAQ } = window.GMP.courses;
const COURSE_TESTI = window.GMP.testimonials;

function V6CoursePage() {
  const { pricing, stats, formatted } = window.GMP.site;
  const flagshipPrice = pricing.flagship;
  const flagshipInst = pricing.flagshipInstallments;
  const miniPrice = pricing.mini;
  const bundlePrice = pricing.bundle;

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="course" />

      <V6PageHead
        eyebrow={COURSE_FLAGSHIP.eyebrow}
        title={`${COURSE_FLAGSHIP.name} &mdash; <em>${COURSE_FLAGSHIP.tagline}</em>`}
        meta={[
          { b: flagshipPrice, l: `Or ${flagshipInst}` },
          { b: "Self-paced", l: "Lifetime access" },
          { b: "30-day", l: "Refund, no questions" }
        ]}
      />

      <section className="v6-course-hero">
        <div className="v6-course-hero-text">
          <div style={{
            fontFamily:'"Cormorant Garamond",Georgia,serif',
            fontStyle:'italic', fontSize:28, color:'var(--accent)'
          }}>The flagship</div>
          <h1>The full <em>six-practice</em> system, taught the way I taught seventh graders.</h1>
          <p className="v6-course-hero-sub">{COURSE_FLAGSHIP.sub}</p>
          <div className="v6-course-hero-meta">
            <div className="v6-course-hero-meta-item"><b>{stats.flagshipLessons}</b>Video lessons</div>
            <div className="v6-course-hero-meta-item"><b>0{stats.flagshipWorksheets}</b>Worksheets</div>
            <div className="v6-course-hero-meta-item"><b>90 days</b>Plan</div>
            <div className="v6-course-hero-meta-item"><b>{formatted.parentsEnrolled}</b>Parents enrolled</div>
          </div>
          <div style={{display:'flex', gap:12}}>
            <a href="#" className="v6-cta v6-cta-primary">Enroll now <span className="v6-cta-arrow">&rarr;</span></a>
            <a href="#" className="v6-cta v6-cta-ghost">See the curriculum</a>
          </div>
        </div>

        <aside className="v6-course-hero-card">
          <span className="v6-course-hero-card-eyebrow">{COURSE_FLAGSHIP.name}</span>
          <div style={{
            fontFamily:'var(--sans)', fontWeight:800, fontSize:36, lineHeight:1.0,
            letterSpacing:'-0.025em', textWrap:'balance'
          }}>The whole system, in one course.</div>
          <div className="v6-course-hero-card-price">
            <span className="v6-course-hero-card-price-big">{flagshipPrice}</span>
            <span className="v6-course-hero-card-price-meta">one-time &middot; or {flagshipInst}</span>
          </div>
          <ul>
            {COURSE_FLAGSHIP.inclusions.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
          <a href="#" className="v6-cta v6-cta-primary" style={{justifyContent:'center'}}>
            Enroll &mdash; {flagshipPrice} <span className="v6-cta-arrow">&rarr;</span>
          </a>
          <div style={{
            fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic',
            fontSize:15, color:'var(--ink-soft)', textAlign:'center'
          }}>
            30-day refund, no funnels.
          </div>
        </aside>
      </section>

      <section className="v6-path">
        <header className="v6-path-head">
          <div className="v6-path-head-text">
            <span className="v6-page-head-eyebrow">The path</span>
            <h2>Start with one practice. Or take the whole system.</h2>
          </div>
          <div className="v6-path-head-aside">
            Each mini-course is a single practice, taught in three to four weeks. They're
            on-ramps. <b>{COURSE_FLAGSHIP.name}</b> is the whole road &mdash; the six practices plus the
            rituals, scripts, and 90-day plan that make them stick. If you finish a mini and want
            the rest, the price applies toward the flagship.
          </div>
        </header>

        <div className="v6-path-grid" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
          {COURSE_MINIS.map(m => (
            <a className="v6-path-mini" href="#" key={m.n}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline'}}>
                <span className="v6-path-mini-n">{m.n}</span>
                <span className="v6-path-mini-tag">{m.tag}</span>
              </div>
              <h3>{m.title}</h3>
              <p style={{
                fontFamily:'"Source Serif 4",Georgia,serif',
                fontSize:15, lineHeight:1.5, color:'var(--ink-soft)', margin:0
              }}>{m.body}</p>
              <div className="v6-path-mini-meta">
                <span>{m.weeks} &middot; {m.lessons}</span>
                <b>{miniPrice}</b>
              </div>
            </a>
          ))}

          <a className="v6-path-flag" href="#" style={{
            gridColumn: '1 / -1', gridRow: 'auto',
            display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:48,
            padding:48
          }}>
            <div>
              <div className="v6-path-flag-eyebrow">The whole system</div>
              <h3 style={{fontSize:64, marginTop:8}}>{COURSE_FLAGSHIP.name}</h3>
              <p style={{marginTop:16, fontSize:17, maxWidth:'48ch'}}>
                All six practices, taught the way I taught middle school. {stats.flagshipModules} modules, {stats.flagshipLessons} lessons, a 90-day plan, a community, and a monthly office hour. The version
                you take if you want the whole road, not just one on-ramp.
              </p>
            </div>
            <div className="v6-path-flag-meta" style={{flexDirection:'column', alignItems:'flex-end', justifyContent:'space-between', gap:24}}>
              <div className="v6-path-flag-price" style={{textAlign:'right'}}>
                <b>From the path</b>
                {flagshipPrice}
              </div>
              <span className="v6-cta v6-cta-primary" style={{background:'var(--accent)'}}>
                Enroll now <span className="v6-cta-arrow">&rarr;</span>
              </span>
              <span style={{fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic', fontSize:15, color:'var(--accent-soft)'}}>
                Or bundle all six minis for {bundlePrice}
              </span>
            </div>
          </a>
        </div>
      </section>

      <section className="v6-curric">
        <header className="v6-curric-head">
          <span className="v6-page-head-eyebrow">Curriculum</span>
          <h2 style={{
            fontFamily:'var(--sans)', fontWeight:800,
            fontSize:64, lineHeight:1, letterSpacing:'-0.03em',
            margin:'8px 0 16px', textWrap:'balance'
          }}>{stats.flagshipModules} modules. {stats.flagshipLessons} lessons. One whole system.</h2>
          <p style={{
            fontFamily:'"Source Serif 4",Georgia,serif',
            fontSize:18, lineHeight:1.55, color:'var(--ink-soft)', margin:0
          }}>
            Each module is roughly 90 minutes of video, broken into 4&ndash;6 short lessons,
            plus a worksheet you'll actually use. Watch in order, or skip to the practice
            your week is breaking on.
          </p>
        </header>
        <div className="v6-curric-grid">
          {COURSE_CURRIC.map(m => (
            <article className="v6-curric-mod" key={m.n}>
              <div className="v6-curric-mod-num">{m.n}</div>
              <div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <ul>
                  {m.lessons.map(l => <li key={l}>{l}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="v6-testi">
        <header className="v6-testi-head">
          <span className="v6-page-head-eyebrow">What parents are saying</span>
          <h2 style={{
            fontFamily:'var(--sans)', fontWeight:800,
            fontSize:56, lineHeight:1, letterSpacing:'-0.03em',
            margin:'8px 0 0', textWrap:'balance'
          }}>{formatted.parentsEnrolled} parents and counting. Here's what they've said.</h2>
        </header>
        <div className="v6-testi-grid">
          {COURSE_TESTI.map((t, i) => (
            <div className="v6-testi-card" key={i}>
              <div className="v6-testi-stars">{"★".repeat(t.stars)}</div>
              <blockquote className="v6-testi-q">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="v6-testi-attrib">
                <span className="v6-testi-attrib-name">{t.name}</span>
                <span className="v6-testi-attrib-meta">{t.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="v6-faq">
        <div className="v6-faq-grid">
          <div>
            <span className="v6-page-head-eyebrow">FAQ</span>
            <h2 style={{
              fontFamily:'var(--sans)', fontWeight:800,
              fontSize:56, lineHeight:0.98, letterSpacing:'-0.03em',
              margin:'8px 0 16px', textWrap:'balance'
            }}>Questions parents actually ask.</h2>
            <p style={{
              fontFamily:'"Source Serif 4",Georgia,serif',
              fontSize:17, lineHeight:1.55, color:'var(--ink-soft)', margin:0,
              maxWidth: '36ch'
            }}>
              Don't see yours? <a href="#" style={{color:'var(--accent)', fontWeight:600, textDecoration:'none'}}>Email me directly</a> &mdash; I read everything.
            </p>
          </div>
          <div className="v6-faq-list">
            {COURSE_FAQ.map((f, i) => (
              <div className="v6-faq-item" key={i}>
                <h3>{f.q}<span>{String(i+1).padStart(2,'0')}</span></h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v6-enroll">
        <div>
          <span style={{
            fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic',
            fontSize:24, color:'var(--accent)'
          }}>Ready when you are.</span>
          <h2>Enroll in <em>{COURSE_FLAGSHIP.name}.</em></h2>
          <p>Lifetime access. Monthly office hours. Private parent community. 30-day refund, no questions, no funnels.</p>
        </div>
        <div className="v6-enroll-cta">
          <a href="#" className="v6-cta v6-cta-primary" style={{justifyContent:'center', background:'var(--accent)'}}>
            Enroll &mdash; {flagshipPrice} <span className="v6-cta-arrow">&rarr;</span>
          </a>
          <a href="#" className="v6-cta v6-cta-ghost" style={{justifyContent:'center', color:'var(--paper)', borderColor:'var(--paper)'}}>
            Or {flagshipInst}
          </a>
        </div>
      </section>

      <V6PageFoot />
    </article>
  );
}

window.V6CoursePage = V6CoursePage;
