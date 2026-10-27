import Link from "next/link";

const FILTERS = [
  { value: undefined, label: "All" },
  { value: "build", label: "Builds" },
  { value: "case-study", label: "Case studies" },
] as const;

export function WorkTypeFilter({ active }: { active?: string }) {
  return (
    <nav className="flex flex-wrap gap-2" aria-label="Filter blueprints by type">
      {FILTERS.map((filter) => {
        const isActive = active === filter.value;
        const href = filter.value ? `/blueprints?type=${filter.value}` : "/blueprints";
        return (
          <Link
            key={filter.label}
            href={href}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              isActive
                ? "bg-brand-slate text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {filter.label}
          </Link>
        );
      })}
    </nav>
  );
}
