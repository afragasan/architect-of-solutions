import Link from "next/link";
import type { BlogPost } from "@/.velite";

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-slate-200 p-6 transition hover:border-brand-amber hover:shadow-sm"
    >
      <time className="text-xs font-medium text-slate-500">
        {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </time>
      <h3 className="mt-2 font-heading text-xl font-semibold text-brand-slate group-hover:text-brand-slate-light">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{post.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
