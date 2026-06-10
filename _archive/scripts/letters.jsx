/* global React */

// Letters page — reads archive from window.GMP.letters.
// Tag counts compute live from the archive; pagination hides at low volume.

const PAGINATION_THRESHOLD = 12;

function computeTagCounts(archive) {
  const counts = { all: 0, essay: 0, note: 0 };
  archive.forEach(year => {
    if (year.feat) {
      counts.all += 1;
      counts.essay += 1;
    }
    (year.rows || []).forEach(r => {
      counts.all += 1;
      counts[r.type] = (counts[r.type] || 0) + 1;
    });
  });
  return counts;
}

function V6Letter({ row, idx }) {
  const isEssay = row.type === "essay";
  return (
    <a className="v6-letter" href="#" key={idx}>
      <div className="v6-letter-date">
        <b>{row.date.n}</b>
        <span>{row.date.d.toUpperCase()}</span>
      </div>
      <div className="v6-letter-body">
        <div className={"v6-letter-tag " + (isEssay ? "is-essay" : "is-note")}>
          <span className="v6-letter-tag-dot"></span>
          {row.tag}
        </div>
        <h3 className="v6-letter-title">{row.title}</h3>
        {row.dek && <p className="v6-letter-dek">{row.dek}</p>}
        <div className="v6-letter-meta">
          {row.meta && <span>{row.meta}</span>}
        </div>
      </div>
    </a>
  );
}

function V6LetterFeat({ feat }) {
  return (
    <a className="v6-letter-feat" href="#">
      <div className="v6-letter-feat-img" style={{ backgroundImage: `url(${feat.img})` }}>
        <span className="v6-letter-feat-num">{feat.n}</span>
      </div>
      <div>
        <div className="v6-letter-tag is-essay" style={{marginBottom:8}}>
          <span className="v6-letter-tag-dot"></span>
          {feat.tag} &middot; {feat.date.d} {feat.date.n}
        </div>
        <h2>{feat.title}</h2>
        <p>{feat.dek}</p>
        <div className="v6-letter-meta">
          <span>{feat.meta}</span>
        </div>
      </div>
    </a>
  );
}

function V6LettersPage() {
  const { tags, archive: LETTERS, mostRead } = window.GMP.letters;
  const { formatted } = window.GMP.site;
  const [tag, setTag] = React.useState("all");
  const [page, setPage] = React.useState(1);

  const tagCounts = computeTagCounts(LETTERS);
  const totalLetters = tagCounts.all;
  const showPagination = totalLetters > PAGINATION_THRESHOLD;

  return (
    <article className="v6-page" data-theme="terracotta">
      <V6PageNav active="letters" />

      <V6PageHead
        eyebrow="Letters"
        title="A Sunday note. An occasional <em>essay</em>. Plainspoken parenting, written by a teacher."
        meta={[
          { b: String(totalLetters), l: totalLetters === 1 ? "Letter in archive" : "Letters in archive" },
          { b: formatted.subscribers, l: "Subscribers" },
          { b: "Free", l: "Always" }
        ]}
      />

      <div className="v6-letters">
        <div className="v6-letters-feed">
          {LETTERS.map((y, yi) => (
            <section key={y.year}>
              <div className="v6-letter-year">
                <h2>{y.year}</h2>
                <span className="v6-letter-year-meta">{y.meta}</span>
              </div>
              {y.feat && <V6LetterFeat feat={y.feat} />}
              {y.rows.map((r, i) => <V6Letter row={r} idx={`${yi}-${i}`} key={`${yi}-${i}`} />)}
            </section>
          ))}

          {showPagination && (
            <div className="v6-letters-pager">
              <a href="#" className="v6-letters-pager-btn is-disabled">&larr; Newer</a>
              <a href="#" className="v6-letters-pager-btn is-current">1</a>
              <a href="#" className="v6-letters-pager-btn">Older &rarr;</a>
            </div>
          )}
        </div>

        <aside className="v6-letters-side">
          <div className="v6-letters-side-card">
            <h3>The Sunday Letter</h3>
            <p>One classroom-tested practice in your inbox, every Sunday. Free, plainspoken, unsubscribe in one click.</p>
            <form className="v6-letters-side-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="you@yourkitchen.com" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div>
            <div style={{
              fontFamily:'"Cormorant Garamond",Georgia,serif',
              fontStyle:'italic', fontSize:22, color:'var(--accent)',
              marginBottom:12
            }}>Filter the archive</div>
            <div className="v6-letters-side-tags">
              {tags.map(t => {
                const n = tagCounts[t.id] || 0;
                return (
                  <button key={t.id}
                    onClick={() => setTag(t.id)}
                    className={"v6-letters-side-tag" + (tag === t.id ? " is-active" : "")}>
                    {t.label}
                    {n > 0 && <span className="v6-letters-side-tag-n">{n}</span>}
                  </button>
                );
              })}
            </div>
          </div>
          {mostRead && mostRead.length > 0 && (
            <div className="v6-letters-side-card" style={{background:'var(--card-sage)'}}>
              <h3>Most-read</h3>
              <ol style={{margin:0, paddingLeft:18, fontFamily:'"Source Serif 4",Georgia,serif', fontSize:14, lineHeight:1.5, color:'var(--ink)'}}>
                {mostRead.map((title, i) => <li key={i}>{title}</li>)}
              </ol>
            </div>
          )}
        </aside>
      </div>

      <V6PageFoot />
    </article>
  );
}

window.V6LettersPage = V6LettersPage;
