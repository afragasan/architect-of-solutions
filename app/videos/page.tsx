import { Container } from "@/components/layout/Container";
import { VideoSeriesGroup } from "@/components/videos/VideoSeriesGroup";
import { videoSeries, videos, type VideoSeriesSlug } from "@/data/videos";
import { social } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Videos",
  description: "Build logs, explainers, and architecture teardowns, grouped by series.",
  path: "/videos",
});

export default function VideosPage() {
  const seriesSlugs = Object.keys(videoSeries) as VideoSeriesSlug[];

  return (
    <Container className="py-16">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-brand-slate">Videos</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Grouped by series, not a chronological feed. Players load only when you click play.
          </p>
        </div>
        <a
          href={social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-brand-amber-dark hover:underline"
        >
          Watch on YouTube →
        </a>
      </div>

      <div className="mt-12 space-y-16">
        {seriesSlugs.map((slug) => (
          <VideoSeriesGroup
            key={slug}
            slug={slug}
            videos={videos.filter((video) => video.series === slug)}
            linkToSeriesPage
          />
        ))}
      </div>
    </Container>
  );
}
