import { builds, caseStudies, type Build, type CaseStudy } from "@/.velite";
import { featuredWorkSlug } from "@/data/latest";
import { videoSeries, videos } from "@/data/videos";

export type WorkEntry = Build | CaseStudy;

function byDateDesc<T extends { date: string }>(a: T, b: T) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export function getAllWork(): WorkEntry[] {
  return [...builds, ...caseStudies].sort(byDateDesc);
}

export function getWorkByType(type: "build" | "case-study"): WorkEntry[] {
  return getAllWork().filter((entry) => entry.type === type);
}

export function getWorkBySlug(slug: string): WorkEntry | undefined {
  return getAllWork().find((entry) => entry.slug === slug);
}

export function getFeaturedWork(): WorkEntry | undefined {
  return getWorkBySlug(featuredWorkSlug) ?? getAllWork().find((entry) => entry.featured) ?? getAllWork()[0];
}

export function getLatestVideo() {
  const latest = [...videos].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];
  return latest && { ...latest, seriesName: videoSeries[latest.series].name };
}
