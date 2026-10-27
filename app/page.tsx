import { Container } from "@/components/layout/Container";
import { ProofStrip } from "@/components/home/ProofStrip";
import { FeaturedBuild } from "@/components/home/FeaturedBuild";
import { LatestStrip } from "@/components/home/LatestStrip";
import { getBeehiivPosts } from "@/lib/beehiiv";
import { getFeaturedWork, getLatestVideo } from "@/lib/content";

export const revalidate = 3600;

export default async function HomePage() {
  const featured = getFeaturedWork();
  const latestPosts = ((await getBeehiivPosts(3)) ?? []).slice(0, 3);
  const latestVideo = getLatestVideo();

  return (
    <>
      <section className="bg-brand-slate">
        <Container className="py-20">
          <h1 className="max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl">
            I design AI systems you can oversee, audit, and undo
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            As solution architect I focus on governance and observability required for agentic AI: compliance written as code,
            a human signature on every consequential action, and a recovery path for
            every mistake.
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
            <LatestStrip posts={latestPosts} latestVideo={latestVideo} />
          </div>
        </Container>
      </section>
    </>
  );
}
