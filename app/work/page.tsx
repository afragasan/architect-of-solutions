import { Container } from "@/components/layout/Container";
import { WorkEntryCard } from "@/components/work/WorkEntryCard";
import { WorkTypeFilter } from "@/components/work/WorkTypeFilter";
import { getAllWork } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Work",
  description: "Builds and sanitized case studies — the business problem, the architecture, and the trade-offs behind each one.",
  path: "/work",
});

export default async function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const entries = getAllWork().filter((entry) => !type || entry.type === type);

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">Work</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Own builds and sanitized case studies from production work, every entry following the same
        template: problem, architecture, trade-offs, code, evidence, demo, and what I&apos;d do differently.
      </p>
      <div className="mt-8">
        <WorkTypeFilter active={type} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {entries.map((entry) => (
          <WorkEntryCard key={entry.slug} entry={entry} />
        ))}
      </div>
    </Container>
  );
}
