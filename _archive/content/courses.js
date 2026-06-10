/* Growth Mindset Parenting — Course catalog
   Holds the flagship metadata, 6 mini-courses, 8 curriculum modules, FAQs.
   Pricing comes from content/site.js (single source of truth). */

window.GMP = window.GMP || {};
window.GMP.courses = {
  // Flagship metadata. Stable; rarely changes.
  flagship: {
    name: "Middle Skills",
    eyebrow: "The Course",
    tagline: "parent like a teacher.",
    pitch: "The full six-practice system, taught the way I taught seventh graders.",
    sub: "Eight modules. Forty-three video lessons. Nine worksheets. A 90-day plan you can actually run, plus a monthly office hour with me. Built for parents who want a system, not a slogan.",
    inclusions: [
      "43 video lessons across 8 modules",
      "9 printable worksheets & scripts",
      "90-day implementation plan",
      "Monthly live office hour with Sean",
      "Private parent community",
      "Lifetime access & updates"
    ]
  },

  // The 6 mini-courses (on-ramps to the flagship)
  minis: [
    { n: "01", tag: "Foundations · Mini", title: "Be the weather", body: "The four-week practice for the parent who wants the room to feel different by Friday.", weeks: "4 weeks", lessons: "12 lessons" },
    { n: "02", tag: "Regulation · Mini", title: "Use the cooler", body: "How to install the pause between feeling and response — and what to actually say in the gap.", weeks: "3 weeks", lessons: "9 lessons" },
    { n: "03", tag: "Standards · Mini", title: "Inspect, don't expect", body: "The unsexy logistics of standards. Eight rituals that move from hoping to noticing.", weeks: "4 weeks", lessons: "11 lessons" },
    { n: "04", tag: "Praise · Mini", title: "Three to one", body: "Praise the move, not the trait. The teacher's ratio that builds resilience without inflation.", weeks: "3 weeks", lessons: "9 lessons" },
    { n: "05", tag: "Skill-building · Mini", title: "I do, we do, you do", body: "Modeling is teaching. The scaffold that makes a kid independent in three steps and four weeks.", weeks: "4 weeks", lessons: "10 lessons" },
    { n: "06", tag: "Repair · Mini", title: "Bad moment, great opportunity", body: "Meltdowns are feedback. The repair script, the timing, and the language that closes the loop.", weeks: "3 weeks", lessons: "8 lessons" }
  ],

  // 8-module curriculum for the flagship
  curriculum: [
    { n: "01", title: "Be the weather",                desc: "Practice 01, taught from the ground up. Climate, contagion, and the parent's mood as the family's operating system.", lessons: ["The pause at the door", "Three breaths, two doorways", "Naming your own weather", "When the storm wins"] },
    { n: "02", title: "Use the cooler",                desc: "Practice 02 — the gap between feeling and response. The five-minute reset, scripts, and what to do when there's no time.", lessons: ["Hot decisions vs. cool decisions", "The 5-minute reset", "Scripts for no time", "Repair after a hot one"] },
    { n: "03", title: "Inspect, don't expect",         desc: "Practice 03 — standards that get noticed. Building rituals into transitions, the breakfast inspection, the morning loop.", lessons: ["Cheerful inspection", "The morning loop", "Standards on the go", "When standards slip"] },
    { n: "04", title: "Three to one praise",           desc: "Practice 04 — the ratio. Praise the move, not the trait. Catching the small wins. Making praise specific, brief, and frequent.", lessons: ["The ratio, explained", "Catching the small wins", "Specific, brief, frequent", "When praise stops working"] },
    { n: "05", title: "I do, we do, you do",           desc: "Practice 05 — the scaffold. Modeling, supported practice, and stepping away. The move from confusion to independence.", lessons: ["Modeling, embarrassingly", "Supported practice", "The hand-off", "What to do when they fall back"] },
    { n: "06", title: "Bad moment, great opportunity", desc: "Practice 06 — repair. The two-hour window, the script, the apology that lands. How rupture becomes the lesson.", lessons: ["The two-hour window", "The repair script", "Apology that lands", "Bringing the lesson forward"] },
    { n: "07", title: "The Sunday meeting",            desc: "How families plan a week without losing it. Twenty-five minutes, four agenda items, fewer arguments by Wednesday.", lessons: ["The 25-minute structure", "The four agenda items", "Running it with the kids", "When the meeting falls apart"] },
    { n: "08", title: "Putting it all together",       desc: "Your custom Middle Skills plan: the practices that fit your family, the rituals that make them stick, and the calendar that runs itself.", lessons: ["Your family's plan", "The 90-day calendar", "Office hours: 1:1 with Sean", "Graduation — what's next"] }
  ],

  // FAQ entries — append as questions come in
  faq: [
    { q: "Is this a self-paced course or a cohort?", a: "Both, slightly. Middle Skills is self-paced — lifetime access, work it on your schedule. But there's a live monthly office hour with Sean and a small private community where parents share what's working." },
    { q: "How is this different from your free Letters?", a: "The Letters are short, single-practice essays. Middle Skills is the whole system, taught from the ground up, with worksheets, scripts, video walkthroughs, and a 90-day plan you can actually run." },
    { q: "What ages does it work for?", a: "Roughly 4 to 14 — the practices are built for kids who can hold a brief conversation. They scale up and down, and they hold up across all three of mine (currently 6, 9, and 12)." },
    { q: "Do I need a partner to do this with me?", a: "No. About 40% of Middle Skills students enroll solo. The Sunday meeting and co-parenting modules have a track for solo and shared parenting both." },
    { q: "Is there a refund policy?", a: "Yes — 30 days, no questions, no funnels. If it isn't useful, write me; I'll send the money back the same day." },
    { q: "Can my school or parent group buy it as a group?", a: "Yes. There's a group rate for 10+ enrollments and a school license for libraries. Email me directly." }
  ]
};
