import Link from "next/link";

export function BlogTagFilter({ tags, active }: { tags: string[]; active?: string }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filter posts by tag">
      <Link
        href="/newsletter"
        className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
          !active ? "bg-brand-slate text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
        }`}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/newsletter?tag=${encodeURIComponent(tag)}`}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            active === tag ? "bg-brand-slate text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {tag}
        </Link>
      ))}
    </nav>
  );
}
