import { Container } from "@/components/layout/Container";
import { NewsletterSignupBox } from "@/components/newsletter/NewsletterSignupBox";
import { getNewsletterArchive } from "@/lib/beehiiv";
import { newsletter } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Newsletter",
  description: `Read the archive of ${newsletter.publicationName} and subscribe for new issues.`,
  path: "/newsletter",
});

export const revalidate = 3600;

export default async function NewsletterPage() {
  const archive = await getNewsletterArchive();

  return (
    <Container className="py-16">
      <h1 className="font-heading text-3xl font-bold text-brand-slate">{newsletter.publicationName}</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        The archive is what convinces people to subscribe — read a few issues, then sign up below.
      </p>

      <div className="mt-8 max-w-md">
        <NewsletterSignupBox />
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-xl font-bold text-brand-slate">Archive</h2>

        {archive && archive.length > 0 ? (
          <ul className="mt-6 divide-y divide-slate-200">
            {archive.map((issue) => (
              <li key={issue.url} className="py-4">
                <a href={issue.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <p className="font-heading font-semibold text-brand-slate group-hover:text-brand-amber-dark">
                    {issue.title}
                  </p>
                  <time className="text-sm text-slate-500">
                    {new Date(issue.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-slate-600">
            Browse the full archive on Beehiiv:{" "}
            <a
              href={newsletter.archiveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-amber-dark hover:underline"
            >
              {newsletter.archiveUrl}
            </a>
          </p>
        )}
      </div>
    </Container>
  );
}
