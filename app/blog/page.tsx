import { Container } from "@/components/layout/Container";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { BlogTagFilter } from "@/components/blog/BlogTagFilter";
import { getAllBlogPosts, getAllBlogTags, getBlogPostsByTag } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Blog",
  description: "Articles on agentic AI governance, compliance as code, and cyber resilience — published here first.",
  path: "/blog",
});

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const posts = tag ? getBlogPostsByTag(tag) : getAllBlogPosts();
  const tags = getAllBlogTags();

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">Blog</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Published here first, then shared to LinkedIn — this is the canonical copy and archive.
      </p>
      <div className="mt-8">
        <BlogTagFilter tags={tags} active={tag} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </Container>
  );
}
