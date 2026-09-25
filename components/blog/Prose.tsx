export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-slate max-w-none break-words prose-headings:font-heading prose-a:text-brand-amber-dark prose-code:break-words">
      {children}
    </div>
  );
}
