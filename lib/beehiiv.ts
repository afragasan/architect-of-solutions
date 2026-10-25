import type { NewsletterIssue } from "@/lib/types";

type BeehiivPost = {
  title: string;
  web_url: string;
  publish_date: number; // unix seconds
};

type BeehiivPostsResponse = {
  data: BeehiivPost[];
};

/**
 * Fetches recent newsletter issues from Beehiiv's API.
 * Returns null (rather than throwing) when the API isn't configured or the
 * request fails, so callers can fall back to linking out to the public
 * Beehiiv archive instead of breaking the page.
 */
export async function getNewsletterArchive(limit = 20): Promise<NewsletterIssue[] | null> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !publicationId) return null;

  try {
    const res = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/posts?limit=${limit}&status=confirmed`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const json = (await res.json()) as BeehiivPostsResponse;
    return json.data.map((post) => ({
      title: post.title,
      url: post.web_url,
      publishedAt: new Date(post.publish_date * 1000).toISOString(),
    }));
  } catch {
    return null;
  }
}
