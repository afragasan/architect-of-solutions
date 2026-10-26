import Link from "next/link";
import type { WorkEntry } from "@/lib/content";
import { VideoThumbnailLink } from "@/components/videos/VideoLinkCard";

export function FeaturedBuild({ entry }: { entry: WorkEntry }) {
  return (
    <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
      <div>
        <span className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">
          Featured {entry.type === "build" ? "build" : "case study"}
        </span>
        <h2 className="mt-2 font-heading text-2xl font-bold text-brand-slate sm:text-3xl">{entry.title}</h2>
        <p className="mt-3 text-slate-600">{entry.summary}</p>
        {entry.evidenceHighlight && (
          <p className="mt-4 rounded-md bg-slate-50 px-4 py-3 text-sm font-medium text-brand-slate">
            {entry.evidenceHighlight}
          </p>
        )}
        <Link
          href={`/work/${entry.slug}`}
          className="mt-6 inline-block rounded-md bg-brand-slate px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-slate-light"
        >
          Read the full write-up →
        </Link>
      </div>
      <div>
        {entry.demoVideoId && (
          <VideoThumbnailLink youtubeId={entry.demoVideoId} title={`${entry.title} — 60 second demo`} />
        )}
      </div>
    </div>
  );
}
