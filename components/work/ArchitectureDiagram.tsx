import Image from "next/image";

type ArchitectureDiagramProps = {
  alt: string;
  caption?: string;
  src?: string;
};

export function ArchitectureDiagram({ alt, caption, src }: ArchitectureDiagramProps) {
  return (
    <figure className="not-prose my-8">
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={675}
          sizes="(min-width: 768px) 768px, 100vw"
          className="h-auto w-full rounded-lg border border-slate-200"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex aspect-video w-full items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500"
        >
          {alt}
        </div>
      )}
      {caption && <figcaption className="mt-2 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  );
}
