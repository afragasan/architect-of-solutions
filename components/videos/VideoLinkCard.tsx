import { youtubeThumbnailUrl, youtubeWatchUrl } from "@/lib/youtube";

export function VideoThumbnailLink({ youtubeId, title }: { youtubeId: string; title: string }) {
  return (
    <a
      href={youtubeWatchUrl(youtubeId)}
      target="_blank"
      rel="noopener"
      aria-label={`Watch on YouTube: ${title}`}
      className="not-prose group relative block aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-900"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external thumbnail, no need for next/image optimization here */}
      <img
        src={youtubeThumbnailUrl(youtubeId)}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover opacity-80 transition group-hover:opacity-60"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-amber shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-7 w-7 text-brand-slate">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </a>
  );
}

export function VideoLinkCard({
  youtubeId,
  title,
  description,
}: {
  youtubeId: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <VideoThumbnailLink youtubeId={youtubeId} title={title} />
      <h3 className="mt-3 font-heading font-semibold text-brand-slate">
        <a href={youtubeWatchUrl(youtubeId)} target="_blank" rel="noopener" className="hover:text-brand-amber-dark">
          {title}
        </a>
      </h3>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
    </div>
  );
}
