import Link from "next/link";
import { PostTeaserCard } from "@/components/newsletter/PostTeaserCard";
import { EmptyPosts } from "@/components/newsletter/EmptyPosts";
import { VideoLinkCard } from "@/components/videos/VideoLinkCard";
import type { NewsletterPost } from "@/lib/types";

type LatestVideo = {
  youtubeId: string;
  title: string;
  description: string;
  seriesName: string;
};

export function LatestStrip({ posts, latestVideo }: { posts: NewsletterPost[]; latestVideo?: LatestVideo }) {
  return (
    <div className="space-y-12">
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">Latest articles</h3>
          <Link href="/blog" className="shrink-0 text-sm font-medium text-brand-amber-dark hover:underline">
            All articles →
          </Link>
        </div>
        <div className="mt-4">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostTeaserCard key={post.id} post={post} campaign="home" />
              ))}
            </div>
          ) : (
            <EmptyPosts />
          )}
        </div>
      </div>

      {latestVideo && (
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">
              Latest video: {latestVideo.seriesName}
            </h3>
            <Link href="/videos" className="shrink-0 text-sm font-medium text-brand-amber-dark hover:underline">
              All videos →
            </Link>
          </div>
          <div className="mt-4 max-w-md">
            <VideoLinkCard
              youtubeId={latestVideo.youtubeId}
              title={latestVideo.title}
              description={latestVideo.description}
            />
          </div>
        </div>
      )}
    </div>
  );
}
