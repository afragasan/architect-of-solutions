import { Container } from "@/components/layout/Container";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { EmptyPosts } from "@/components/newsletter/EmptyPosts";
import { PostTeaserCard } from "@/components/newsletter/PostTeaserCard";
import { getBeehiivPosts, getBeehiivTags } from "@/lib/beehiiv";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Articles on agentic AI governance, compliance as code, and cyber resilience, published on the newsletter.",
  path: "/blog",
});

export const revalidate = 3600;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const allPosts = (await getBeehiivPosts()) ?? [];
  const tags = getBeehiivTags(allPosts);
  const posts = tag ? allPosts.filter((post) => post.tags.includes(tag)) : allPosts;

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">Blog</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Articles are published on the newsletter. Here is a preview of each one; click through to read it in full.
      </p>
      {tags.length > 0 && (
        <div className="mt-8">
          <BlogTagFilter tags={tags} active={tag} />
        </div>
      )}
      <div className="mt-8">
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostTeaserCard key={post.id} post={post} campaign="blog" />
            ))}
          </div>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </Container>
  );
}
