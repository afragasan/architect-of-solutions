import { Container } from "@/components/layout/Container";
import { ProofStrip } from "@/components/home/ProofStrip";
import { FeaturedBuild } from "@/components/home/FeaturedBuild";
import { LatestStrip } from "@/components/home/LatestStrip";
import { getFeaturedWork, getLatestBlogPost, getLatestNewsletterIssue, getLatestVideo } from "@/lib/content";

export default async function HomePage() {
  const featured = getFeaturedWork();
  const latestPost = getLatestBlogPost();
  const [latestVideo, latestIssue] = await Promise.all([getLatestVideo(), getLatestNewsletterIssue()]);

  return (
    <>
      <section className="bg-brand-slate">
        <Container className="py-20">
          <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl">
            Solutions Architect. I ship the system, then show you what I gave up to get it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            Compliance-as-code, cyber resilience, and agentic AI systems — built, sanitized from
            enterprise deployments, and written up with the trade-offs left in.
          </p>
          <div className="mt-12">
            <ProofStrip />
          </div>
        </Container>
      </section>

      {featured && (
        <section>
          <Container className="py-16">
            <FeaturedBuild entry={featured} />
          </Container>
        </section>
      )}

      <section className="bg-slate-50">
        <Container className="py-16">
          <h2 className="font-heading text-xl font-bold text-brand-slate">Latest</h2>
          <div className="mt-6">
            <LatestStrip latestPost={latestPost} latestVideo={latestVideo} latestIssue={latestIssue} />
          </div>
        </Container>
      </section>
    </>
  );
}
