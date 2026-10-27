import Link from "next/link";
import type { WorkEntry } from "@/lib/content";

export function WorkEntryCard({ entry }: { entry: WorkEntry }) {
  return (
    <Link
      href={`/blueprints/${entry.slug}`}
      className="group block rounded-lg border border-slate-200 p-6 transition hover:border-brand-amber hover:shadow-sm"
    >
      <span className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">
        {entry.type === "build" ? "Build" : "Case study"}
      </span>
      <h3 className="mt-2 font-heading text-xl font-semibold text-brand-slate group-hover:text-brand-slate-light">
        {entry.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600">{entry.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}
