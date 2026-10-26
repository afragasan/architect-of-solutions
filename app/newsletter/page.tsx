import { Container } from "@/components/layout/Container";
import { NewsletterSignupBox } from "@/components/newsletter/NewsletterSignupBox";
import { EmptyPosts } from "@/components/newsletter/EmptyPosts";
import { PostTeaserCard } from "@/components/newsletter/PostTeaserCard";
import { getBeehiivPosts } from "@/lib/beehiiv";
import { newsletter } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Newsletter",
  description: `Read the archive of ${newsletter.publicationName} and subscribe for new issues.`,
  path: "/newsletter",
});

export const revalidate = 3600;

export default async function NewsletterPage() {
  const posts = (await getBeehiivPosts()) ?? [];

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">{newsletter.publicationName}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        The archive is what convinces people to subscribe: read a few issues, then sign up below.
      </p>

      <div className="mt-8 max-w-md">
        <NewsletterSignupBox source="newsletter-page" />
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-xl font-bold text-brand-slate">Archive</h2>
        <div className="mt-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostTeaserCard key={post.id} post={post} campaign="newsletter-archive" />
              ))}
            </div>
          ) : (
            <EmptyPosts />
          )}
        </div>
      </div>
    </Container>
  );
}
