type EvidenceItem = {
  label: string;
  value: string;
  detail?: string;
};

export function EvidenceMetrics({ items }: { items: EvidenceItem[] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="font-heading text-2xl font-bold text-brand-slate">{item.value}</p>
          <p className="mt-1 text-sm font-medium text-slate-700">{item.label}</p>
          {item.detail && <p className="mt-1 text-xs text-slate-500">{item.detail}</p>}
        </div>
      ))}
    </div>
  );
}
