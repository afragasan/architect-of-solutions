import Link from "next/link";
import type { BlogPost } from "@/.velite";

type LatestVideo = { title: string; url: string; series: string; publishedAt: string };
type LatestIssue = { title: string; url: string; publishedAt: string };

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function LatestCard({
  eyebrow,
  title,
  meta,
  href,
  external = false,
}: {
  eyebrow: string;
  title: string;
  meta: string;
  href: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="block rounded-lg border border-slate-200 p-5 transition hover:border-brand-amber hover:shadow-sm"
    >
      <span className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">{eyebrow}</span>
      <h3 className="mt-2 font-heading font-semibold text-brand-slate">{title}</h3>
      <p className="mt-1 text-xs text-slate-500">{meta}</p>
    </Link>
  );
}

export function LatestStrip({
  latestPost,
  latestVideo,
  latestIssue,
}: {
  latestPost?: BlogPost;
  latestVideo: LatestVideo;
  latestIssue: LatestIssue;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {latestPost && (
        <LatestCard
          eyebrow="Latest article"
          title={latestPost.title}
          meta={formatDate(latestPost.date)}
          href={`/blog/${latestPost.slug}`}
        />
      )}
      <LatestCard
        eyebrow={`Latest video — ${latestVideo.series}`}
        title={latestVideo.title}
        meta={formatDate(latestVideo.publishedAt)}
        href={latestVideo.url}
        external
      />
      <LatestCard
        eyebrow="Latest newsletter issue"
        title={latestIssue.title}
        meta={formatDate(latestIssue.publishedAt)}
        href={latestIssue.url}
        external
      />
    </div>
  );
}
