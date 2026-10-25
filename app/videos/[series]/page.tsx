import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { VideoCard } from "@/components/videos/VideoCard";
import { videoSeries, videos, type VideoSeriesSlug } from "@/data/videos";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return Object.keys(videoSeries).map((series) => ({ series }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const info = videoSeries[series as VideoSeriesSlug];
  if (!info) return {};
  return buildMetadata({ title: info.name, description: info.description, path: `/videos/${series}` });
}

export default async function VideoSeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const { series } = await params;
  const info = videoSeries[series as VideoSeriesSlug];
  if (!info) notFound();

  const seriesVideos = videos.filter((video) => video.series === series);

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">{info.name}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">{info.description}</p>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {seriesVideos.map((video) => (
          <VideoCard key={video.youtubeId + video.title} video={video} />
        ))}
      </div>
    </Container>
  );
}
