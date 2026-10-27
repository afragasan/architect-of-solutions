import { newsletter } from "@/data/site-config";
import type { NewsletterPost } from "@/lib/types";

type BeehiivPost = {
  id: string;
  title: string;
  subtitle?: string | null;
  preview_text?: string | null;
  thumbnail_url?: string | null;
  web_url?: string | null;
  content_tags?: string[] | null;
  publish_date?: number | null; // unix seconds
};

type BeehiivPostsResponse = {
  data: BeehiivPost[];
};

const API_BASE = "https://api.beehiiv.com/v2";

/**
 * Fetches published newsletter posts from Beehiiv, newest first.
 * Returns null (rather than throwing) when the API isn't configured or the
 * request fails, so pages can show an empty state instead of breaking.
 * Posts without a public web_url (email-only) are skipped.
 */
export async function getBeehiivPosts(limit = 50): Promise<NewsletterPost[] | null> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) return null;

  try {
    const res = await fetch(
      `${API_BASE}/publications/${publicationId}/posts?limit=${limit}&status=confirmed&order_by=publish_date&direction=desc`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const json = (await res.json()) as BeehiivPostsResponse;
    return json.data
      .filter((post) => post.web_url && post.publish_date)
      .map((post) => ({
        id: post.id,
        title: post.title,
        subtitle: post.subtitle || undefined,
        previewText: post.preview_text || undefined,
        thumbnailUrl: post.thumbnail_url || undefined,
        url: post.web_url as string,
        publishedAt: new Date((post.publish_date as number) * 1000).toISOString(),
        tags: post.content_tags ?? [],
      }));
  } catch {
    return null;
  }
}

export function getBeehiivTags(posts: NewsletterPost[]): string[] {
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

/** Adds UTM params so Beehiiv attributes the visit to this site. */
export function withUtm(url: string, campaign: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", "alejandrofraga.com");
    u.searchParams.set("utm_medium", "site");
    u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}

export async function subscribeToBeehiiv(
  email: string,
  medium: string
): Promise<"ok" | "not-configured" | "failed"> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !publicationId) return "not-configured";

  try {
    const res = await fetch(`${API_BASE}/publications/${publicationId}/subscriptions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        utm_source: "alejandrofraga.com",
        utm_medium: medium,
        referring_site: newsletter.siteUrl,
      }),
    });
    return res.ok ? "ok" : "failed";
  } catch {
    return "failed";
  }
}
