import { withUtm } from "@/lib/beehiiv";
import type { NewsletterPost } from "@/lib/types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export function PostTeaserCard({ post, campaign }: { post: NewsletterPost; campaign: string }) {
  const teaser = post.subtitle ?? post.previewText;

  return (
    <a
      href={withUtm(post.url, campaign)}
      target="_blank"
      rel="noopener"
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 transition hover:border-brand-amber hover:shadow-sm"
    >
      {post.thumbnailUrl && (
        // eslint-disable-next-line @next/next/no-img-element -- external Beehiiv thumbnail, no need for next/image optimization here
        <img src={post.thumbnailUrl} alt="" loading="lazy" className="aspect-video w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <time className="text-xs font-medium text-slate-500">{formatDate(post.publishedAt)}</time>
        <h3 className="mt-2 font-heading text-lg font-semibold text-brand-slate group-hover:text-brand-amber-dark">
          {post.title}
        </h3>
        {teaser && <p className="mt-2 text-sm text-slate-600">{teaser}</p>}
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {tag}
              </li>
            ))}
          </ul>
        )}
        <span className="mt-auto pt-4 text-sm font-medium text-brand-amber-dark">Read on the newsletter →</span>
      </div>
    </a>
  );
}
