type TradeoffItem = {
  decision: string;
  rationale: string;
  alternative: string;
};

export function TradeoffsCallout({ items }: { items: TradeoffItem[] }) {
  return (
    <div className="not-prose my-8 rounded-lg border-2 border-brand-amber/40 bg-brand-amber/5 p-6">
      <p className="mb-4 text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">
        Key decisions &amp; trade-offs
      </p>
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.decision} className="border-l-2 border-brand-amber pl-4">
            <p className="font-heading font-semibold text-brand-slate">{item.decision}</p>
            <p className="mt-1 text-sm text-slate-700">{item.rationale}</p>
            <p className="mt-2 text-sm text-slate-500">
              <span className="font-medium text-slate-600">What I gave up: </span>
              {item.alternative}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
