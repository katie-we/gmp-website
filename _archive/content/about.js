/* Growth Mindset Parenting — About page metadata
   Structured fields for the About page (everything except the essay body).
   The prose body lives in content/about.md. */

window.GMP = window.GMP || {};
window.GMP.about = {
  // Hero block
  hero: {
    eyebrow: "About Sean",
    h1Pre: "From ",
    h1Em: "room 214",
    h1Post: " to the kitchen table.",
    dek: "Twelve years teaching middle school. Three sons. One unshakeable conviction that the same growth-mindset practices that unlock kids in a classroom unlock them at home — just with fewer interruptions and better snacks."
  },

  // Hero portrait
  portrait: {
    src: "assets/sean-square.jpg",
    captionLine1: "Sean Kane · Chicago, IL",
    captionLine2: "Photo: Anna Sotelo, 2025"
  },

  // Sticky sidebar metadata
  sidebar: {
    readTime: "11 min",
    lastUpdated: "April 2026"
  },

  // TOC anchors. Each `id` MUST match the heading id rendered from about.md.
  toc: [
    { id: "room-214",   label: "i. Room 214" },
    { id: "what-worked", label: "ii. What worked there" },
    { id: "kitchen",    label: "iii. Kitchen table" },
    { id: "now",        label: "iv. Now" },
    { id: "contact",    label: "v. Get in touch" }
  ],

  // Two-photo figure embedded mid-essay (rendered by about.jsx after Markdown)
  // The figure is positioned by a placeholder anchor in about.md: <!--figure:classroom-desk-->
  figure: {
    anchor: "classroom-desk",
    leftSrc: "assets/sean-teaching.jpg",
    leftAlt: "Sean in the classroom",
    rightSrc: "assets/sean-studio.jpg",
    rightAlt: "At his desk",
    caption: "Left: room 214, fifth period, 2017. Right: where this newsletter actually gets written, six years later."
  },

  // Stats strip embedded mid-essay (rendered after the "Kitchen table" section)
  // Anchor in about.md: <!--stats-->
  // Numbers come from content/site.js — only labels live here.
  statsAnchor: "stats",
  statsLabels: [
    { statKey: "yearsTeaching",     label: "Years teaching middle school" },
    { statKey: "sons",              label: "Sons (Henry, Sam, Theo)" },
    { statKey: "subscribers",       label: "Sunday newsletter readers" },
    { statKey: "parentsEnrolled",   label: "Parents enrolled in Middle Skills" }
  ],

  // End-card CTA
  endCard: {
    eyebrow: "Start where you are",
    h2Pre: "One ",
    h2Em: "practice.",
    h2Post: " One Sunday. Free.",
    body: "Join {subscribers} parents and teachers who like their advice plainspoken. The Sunday letter takes three minutes to read and ten years to internalize. We're all working on it together.",
    primaryCta: "Subscribe, free",
    secondaryCta: "Or see the course",
    secondaryHref: "course.html"
  }
};
