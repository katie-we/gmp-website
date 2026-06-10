/* global React */

// About page — reads structured metadata from window.GMP.about,
// fetches the prose body from content/about.md, parses with marked.js,
// substitutes figure + stats anchors before storing in state (so the result
// is React-stable across re-renders).

function V6AboutPage() {
  const ABOUT = window.GMP.about;
  const { stats, formatted } = window.GMP.site;
  const [bodyHtml, setBodyHtml] = React.useState("");
  const [loadError, setLoadError] = React.useState(null);

  React.useEffect(() => {
    if (!window.marked) {
      setLoadError("Markdown parser failed to load.");
      return;
    }
    fetch("content/about.md")
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.text();
      })
      .then(md => {
        const html = window.marked.parse(md);

        // Substitute figure anchor with two-photo figure
        const f = ABOUT.figure;
        const figureHtml = `
          <figure>
            <img src="${f.leftSrc}" alt="${f.leftAlt}" />
            <img src="${f.rightSrc}" alt="${f.rightAlt}" />
            <figcaption>${f.caption}</figcaption>
          </figure>
        `;

        // Substitute stats anchor with stats strip (numbers from site.js)
        const statsItems = ABOUT.statsLabels.map(({ statKey, label }) => {
          const value = (formatted && formatted[statKey]) || stats[statKey];
          return `
            <div class="v6-about-stat">
              <b>${value}</b>
              <div class="v6-about-stat-l">${label}</div>
            </div>
          `;
        }).join("");
        const statsHtml = `<div class="v6-about-stats">${statsItems}</div>`;

        const finalHtml = html
          .replace(`<!--figure:${f.anchor}-->`, figureHtml)
          .replace(`<!--${ABOUT.statsAnchor}-->`, statsHtml);

        setBodyHtml(finalHtml);
      })
      .catch(err => setLoadError("Could not load essay: " + err.message));
  }, []);

  // End-card body: substitute {subscribers}
  const endBody = ABOUT.endCard.body.replace("{subscribers}", formatted.subscribers);

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="about" />

      <section className="v6-about-hero">
        <div className="v6-about-hero-text">
          <span className="v6-page-head-eyebrow">{ABOUT.hero.eyebrow}</span>
          <h1>{ABOUT.hero.h1Pre}<em>{ABOUT.hero.h1Em}</em>{ABOUT.hero.h1Post}</h1>
          <p>{ABOUT.hero.dek}</p>
        </div>
        <div className="v6-about-hero-img" style={{backgroundImage:`url(${ABOUT.portrait.src})`}}>
          <div className="v6-about-hero-img-cap">
            <span>{ABOUT.portrait.captionLine1}</span>
            <span>{ABOUT.portrait.captionLine2}</span>
          </div>
        </div>
      </section>

      <section className="v6-about-essay">
        <aside className="v6-about-essay-side">
          <div>
            <b>{ABOUT.sidebar.readTime}</b>
            read
          </div>
          <div>
            <span style={{display:'block', fontWeight:600, color:'var(--ink)', marginBottom:6}}>Last updated</span>
            {ABOUT.sidebar.lastUpdated}
          </div>
          <div className="v6-about-essay-toc">
            <span style={{
              fontFamily:'"Cormorant Garamond",Georgia,serif', fontStyle:'italic',
              color:'var(--accent)', fontSize:18, marginBottom:8
            }}>Inside</span>
            {ABOUT.toc.map(item => (
              <a key={item.id} href={`#${item.id}`}>{item.label}</a>
            ))}
          </div>
        </aside>

        <div className="v6-about-prose">
          {loadError ? (
            <p style={{color:'var(--ink-soft)', fontStyle:'italic'}}>{loadError}</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: bodyHtml || "<p>Loading…</p>" }} />
          )}
        </div>

        <div></div>
      </section>

      <section className="v6-about-end">
        <span className="v6-page-head-eyebrow">{ABOUT.endCard.eyebrow}</span>
        <h2>{ABOUT.endCard.h2Pre}<em>{ABOUT.endCard.h2Em}</em>{ABOUT.endCard.h2Post}</h2>
        <p>{endBody}</p>
        <div style={{display:'inline-flex', gap:12}}>
          <a href="#" className="v6-cta v6-cta-primary">
            {ABOUT.endCard.primaryCta} <span className="v6-cta-arrow">&rarr;</span>
          </a>
          <a href={ABOUT.endCard.secondaryHref} className="v6-cta v6-cta-ghost">
            {ABOUT.endCard.secondaryCta}
          </a>
        </div>
      </section>

      <V6PageFoot />
    </article>
  );
}

window.V6AboutPage = V6AboutPage;
