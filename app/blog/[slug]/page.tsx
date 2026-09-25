import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/blog/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { getAllBlogPosts, getBlogBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.summary, path: `/blog/${post.slug}` });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <Container className="py-16">
      <article className="max-w-3xl">
        <header>
          <time className="text-sm font-medium text-slate-500">
            {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </time>
          <h1 className="mt-2 font-heading text-3xl font-bold text-brand-slate sm:text-4xl">{post.title}</h1>
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {tag}
              </li>
            ))}
          </ul>
        </header>
        <div className="mt-10">
          <Prose>
            <MDXContent code={post.body} />
          </Prose>
        </div>
      </article>
    </Container>
  );
}
