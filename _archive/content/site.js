/* Growth Mindset Parenting — global site config
   Single source of truth for stats, prices, brand strings.
   Update values here; they propagate everywhere. */

window.GMP = window.GMP || {};
window.GMP.site = {
  brand: "Growth Mindset Parenting",
  brandShort: "GMP",
  author: "Sean Kane",
  location: "Chicago, IL",
  year: 2026,

  stats: {
    subscribers: 4820,
    parentsEnrolled: 1240,
    yearsTeaching: 12,
    sons: 3,
    practiceCount: 6,
    flagshipModules: 8,
    flagshipLessons: 43,
    flagshipWorksheets: 9
  },

  pricing: {
    flagship: "$497",
    flagshipInstallments: "3 × $179",
    mini: "$97",
    bundle: "$597"
  },

  // Convenience: pre-formatted strings used in copy
  formatted: {
    subscribers: "4,820",
    parentsEnrolled: "1,240"
  }
};
