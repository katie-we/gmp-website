/* Growth Mindset Parenting — Letters archive
   Add new letters by appending to archive[0].rows.
   To feature a letter, move it to archive[0].feat (one per year).
   Tag counts compute live from the archive — don't hardcode. */

window.GMP = window.GMP || {};
window.GMP.letters = {
  // Tag definitions for the sidebar filter. Counts are computed live
  // from the archive at render time — do not hardcode counts here.
  tags: [
    { id: "all", label: "All" },
    { id: "essay", label: "Essays" },
    { id: "note", label: "Sunday notes" },
    { id: "regulation", label: "Regulation" },
    { id: "school", label: "School & teachers" },
    { id: "discipline", label: "Discipline" },
    { id: "marriage", label: "Co-parenting" },
    { id: "praise", label: "Praise" },
    { id: "boys", label: "Raising boys" }
  ],

  // Archive grouped by year. Newest year first.
  // At launch: 5 placeholder entries (1 feat + 4 rows). Add new letters by prepending to rows.
  archive: [
    {
      year: 2026,
      meta: "the launch archive",
      feat: {
        n: "01",
        date: { d: "Mar", n: "29" },
        tag: "Essay · 7 min read",
        title: "Be the weather: why the parent's mood is the family's climate",
        dek: "If you bring a storm, you'll get a storm back. Every time. The most important practice, written plainly.",
        img: "assets/sean-teaching.jpg",
        meta: "Top of the archive"
      },
      rows: [
        {
          type: "note",
          date: { d: "Apr", n: "26" },
          tag: "Sunday note",
          title: "On the difference between a rule and a ritual",
          meta: "3 min · 12 replies"
        },
        {
          type: "note",
          date: { d: "Apr", n: "19" },
          tag: "Sunday note",
          title: "The two-minute repair script we use after every rupture",
          meta: "2 min"
        },
        {
          type: "essay",
          date: { d: "Apr", n: "12" },
          tag: "Essay · 8 min read",
          title: "What “inspect, don't expect” looks like at 7am with three kids and a packed lunch",
          dek: "The unsexy logistics of standards — a Tuesday morning, photographed.",
          meta: "Cited by Edutopia"
        },
        {
          type: "note",
          date: { d: "Apr", n: "5" },
          tag: "Sunday note",
          title: "Why I stopped saying “good job” — and what I say instead",
          meta: "3 min · popular"
        }
      ]
    }
  ],

  // Sidebar "Most-read" list. Update as the archive grows.
  mostRead: [
    "Be the weather",
    "What inspect-don't-expect looks like at 7am",
    "The two-minute repair script"
  ]
};
