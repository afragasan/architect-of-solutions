import type { Video } from "@/data/videos";
import { VideoLinkCard } from "@/components/videos/VideoLinkCard";

export function VideoCard({ video }: { video: Video }) {
  return <VideoLinkCard youtubeId={video.youtubeId} title={video.title} description={video.description} />;
}
