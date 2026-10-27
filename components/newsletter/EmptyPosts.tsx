import { newsletter } from "@/data/site-config";

export function EmptyPosts() {
  return (
    <p className="text-slate-600">
      The first issue is coming soon. Subscribe below, or follow along on{" "}
      <a
        href={newsletter.archiveUrl}
        target="_blank"
        rel="noopener"
        className="font-medium text-brand-amber-dark hover:underline"
      >
        the newsletter site
      </a>
      .
    </p>
  );
}
