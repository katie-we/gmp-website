/* global React */

// Shared chrome for all V6 Workshop interior pages.
// Mirrors the homepage nav/footer exactly so the site reads as one.

function V6PageNav({ active }) {
  const links = [
    { id: "home", label: "Home", href: "index.html" },
    { id: "practices", label: "Practices", href: "practices.html" },
    { id: "letters", label: "Letters", href: "letters.html" },
    { id: "course", label: "Course", href: "course.html" },
    { id: "about", label: "About", href: "about.html" }
  ];
  return (
    <nav className="v6-nav">
      <a href="index.html" className="v6-nav-mark">
        <span className="v6-nav-mark-g">GMP</span>
        <span className="v6-nav-mark-text">Growth Mindset Parenting</span>
      </a>
      <div className="v6-nav-links">
        {links.map(l => (
          <a key={l.id} href={l.href} aria-current={active === l.id ? "page" : undefined}
             style={active === l.id ? { color: "var(--accent)", fontWeight: 700 } : null}>
            {l.label}
          </a>
        ))}
      </div>
      <a className="v6-nav-cta" href="#">Subscribe &rarr;</a>
    </nav>
  );
}

function V6PageFoot() {
  return (
    <footer className="v6-pg-foot">
      <div>Sean Kane &middot; Chicago, IL</div>
      <div style={{display: "flex", gap: 24}}>
        <a href="practices.html">Practices</a>
        <a href="letters.html">Letters</a>
        <a href="course.html">Course</a>
        <a href="about.html">About</a>
        <a href="#">Speaking</a>
      </div>
      <div>&copy; 2026 Growth Mindset Parenting</div>
    </footer>
  );
}

function V6PageHead({ eyebrow, title, meta }) {
  return (
    <header className="v6-page-head">
      <div>
        <span className="v6-page-head-eyebrow">{eyebrow}</span>
      </div>
      <h1 className="v6-page-head-h1" dangerouslySetInnerHTML={{__html: title}} />
      <div className="v6-page-head-meta">
        {(meta || []).map((m, i) => (
          <div key={i}><b>{m.b}</b>{m.l}</div>
        ))}
      </div>
    </header>
  );
}

window.V6PageNav = V6PageNav;
window.V6PageFoot = V6PageFoot;
window.V6PageHead = V6PageHead;
