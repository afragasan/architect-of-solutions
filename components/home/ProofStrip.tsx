import { proofStrip } from "@/data/proof-strip";

export function ProofStrip() {
  return (
    <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {proofStrip.map((point) => (
        <div key={point.label}>
          <dt className="sr-only">{point.label}</dt>
          <dd>
            <p className="font-heading text-3xl font-bold text-brand-amber sm:text-4xl">{point.value}</p>
            <p className="mt-2 text-sm text-slate-300">{point.label}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
