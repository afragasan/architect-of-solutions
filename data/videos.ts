export type VideoSeriesSlug = "build-log" | "explainers" | "architecture-teardowns";

export type Video = {
  youtubeId: string;
  title: string;
  description: string;
  series: VideoSeriesSlug;
  publishedAt: string; // ISO date
};

export const videoSeries: Record<VideoSeriesSlug, { name: string; description: string }> = {
  "build-log": {
    name: "Build Log",
    description: "Building this site and other projects in public, decision by decision.",
  },
  explainers: {
    name: "Explainers",
    description: "Short breakdowns of a concept — agentic governance, compliance as code, resilience patterns.",
  },
  "architecture-teardowns": {
    name: "Architecture Teardowns",
    description: "Walking through a real system's architecture, trade-offs included.",
  },
};

// Placeholder entries — replace `youtubeId` with real video IDs as they're published.
export const videos: Video[] = [
  {
    youtubeId: "REPLACE_YOUTUBE_ID",
    title: "Why I'm building my portfolio in public",
    description: "Kicking off the build log series: goals, stack, and the first commits.",
    series: "build-log",
    publishedAt: "2026-10-23",
  },
  {
    youtubeId: "REPLACE_YOUTUBE_ID",
    title: "Compliance as code, in five minutes",
    description: "What it means to treat compliance requirements as testable code instead of a document.",
    series: "explainers",
    publishedAt: "2026-08-15",
  },
];
