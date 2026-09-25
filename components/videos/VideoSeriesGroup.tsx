import Link from "next/link";
import type { Video, VideoSeriesSlug } from "@/data/videos";
import { videoSeries } from "@/data/videos";
import { VideoCard } from "@/components/videos/VideoCard";

export function VideoSeriesGroup({
  slug,
  videos,
  linkToSeriesPage = true,
}: {
  slug: VideoSeriesSlug;
  videos: Video[];
  linkToSeriesPage?: boolean;
}) {
  const series = videoSeries[slug];

  return (
    <section>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <div className="min-w-0">
          <h2 className="font-heading text-2xl font-bold text-brand-slate">{series.name}</h2>
          <p className="mt-1 text-sm text-slate-600">{series.description}</p>
        </div>
        {linkToSeriesPage && (
          <Link href={`/videos/${slug}`} className="shrink-0 text-sm font-medium text-brand-amber-dark hover:underline">
            View all →
          </Link>
        )}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <VideoCard key={video.youtubeId + video.title} video={video} />
        ))}
      </div>
    </section>
  );
}
