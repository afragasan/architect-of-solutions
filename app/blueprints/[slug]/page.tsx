import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Prose } from "@/components/blog/Prose";
import { MDXContent } from "@/components/mdx/MDXContent";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAllWork().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return {};
  return buildMetadata({ title: entry.title, description: entry.summary, path: `/blueprints/${entry.slug}` });
}

export default async function WorkEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) notFound();

  return (
    <Container className="py-16">
      <article>
        <header className="max-w-3xl">
          <span className="text-xs font-semibold tracking-wide text-brand-amber-dark uppercase">
            {entry.type === "build" ? "Build" : "Case study"}
          </span>
          <h1 className="mt-2 font-heading text-3xl font-bold text-brand-slate sm:text-4xl">{entry.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{entry.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <ul className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <li key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                  {tag}
                </li>
              ))}
            </ul>
            {entry.repoUrl && (
              <a
                href={entry.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-brand-amber-dark hover:underline"
              >
                View repo →
              </a>
            )}
          </div>
        </header>

        <div className="mt-10 max-w-3xl">
          <Prose>
            <MDXContent code={entry.body} />
          </Prose>
        </div>
      </article>
    </Container>
  );
}
