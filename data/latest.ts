// Manual config for v1. `lib/content.ts` wraps these in async getters so a
// future swap to live YouTube Data API / Beehiiv API calls doesn't change
// any call sites — only the function bodies.

export const latestVideo = {
  title: "Why I'm building my portfolio in public",
  youtubeId: "REPLACE_YOUTUBE_ID",
  series: "Build Log",
  url: "https://www.youtube.com/@alejandrofragasantos",
  publishedAt: "2026-09-01",
};

export const latestNewsletterIssue = {
  title: "Issue #1: Why compliance is a systems problem",
  url: "https://alejandrofraga.beehiiv.com",
  publishedAt: "2026-09-01",
};

// The slug of the Work entry (build or case study) featured on the home page.
export const featuredWorkSlug = "compliance-agent-lab";
