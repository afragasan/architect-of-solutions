"use client";

import { useState } from "react";
import { youtubeEmbedUrl, youtubeThumbnailUrl } from "@/lib/youtube";

export function LazyYouTubeEmbed({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="not-prose aspect-video w-full overflow-hidden rounded-lg border border-slate-200">
        <iframe
          src={youtubeEmbedUrl(youtubeId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      aria-label={`Play video: ${title}`}
      className="not-prose group relative block aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-900"
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- external thumbnail, no need for next/image optimization here */}
      <img
        src={youtubeThumbnailUrl(youtubeId)}
        alt=""
        className="h-full w-full object-cover opacity-80 transition group-hover:opacity-60"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-amber shadow-lg transition group-hover:scale-110">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7 text-brand-slate">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-sm font-medium text-white">
        {title}
      </span>
    </button>
  );
}
