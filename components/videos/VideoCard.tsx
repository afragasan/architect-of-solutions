import type { Video } from "@/data/videos";
import { LazyYouTubeEmbed } from "@/components/videos/LazyYouTubeEmbed";

export function VideoCard({ video }: { video: Video }) {
  return (
    <div>
      <LazyYouTubeEmbed youtubeId={video.youtubeId} title={video.title} />
      <h3 className="mt-3 font-heading font-semibold text-brand-slate">{video.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{video.description}</p>
    </div>
  );
}
