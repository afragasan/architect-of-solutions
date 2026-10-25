import { blogPosts, builds, caseStudies, type Build, type BlogPost, type CaseStudy } from "@/.velite";
import { featuredWorkSlug, latestNewsletterIssue, latestVideo } from "@/data/latest";
import type { NewsletterIssue } from "@/lib/types";

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

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(byDateDesc);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getAllBlogPosts().find((post) => post.slug === slug);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.tags.includes(tag));
}

export function getAllBlogTags(): string[] {
  return Array.from(new Set(getAllBlogPosts().flatMap((post) => post.tags))).sort();
}

export function getLatestBlogPost(): BlogPost | undefined {
  return getAllBlogPosts()[0];
}

// Async on purpose: the v1 implementation just returns manual config, but the
// call sites (home page) already await these, so swapping in a real YouTube
// Data API / Beehiiv API call later needs no changes outside this file.
export async function getLatestVideo() {
  return latestVideo;
}

export async function getLatestNewsletterIssue(): Promise<NewsletterIssue> {
  return latestNewsletterIssue;
}
