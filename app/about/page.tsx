import { Container } from "@/components/layout/Container";
import { certifications } from "@/data/certifications";
import { bookingUrl, resumeUrl, social } from "@/data/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "Alejandro Fraga's background, certifications, and how to get in touch.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-brand-slate">About</h1>
        <div className="prose prose-slate mt-6 max-w-none">
          <p>
            I&apos;m a Solutions Architect who spends most of my time at the intersection of compliance,
            cyber resilience, and — more recently — agentic AI systems. My background is enterprise
            infrastructure at Dell, where I&apos;ve worked on immutable backup architecture protecting
            over a thousand customers and on the telemetry systems behind a 30%+ reduction in MTTR.
          </p>
          <p>
            What I care about isn&apos;t the diagram — it&apos;s the trade-off behind it. Anyone can pick a
            solution; the interesting part is what you gave up to get it. That&apos;s the lens behind every
            write-up on this site, and increasingly, it&apos;s the lens I want to bring to consulting work.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-brand-slate px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-slate-light"
          >
            Download resume
          </a>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-brand-slate px-5 py-2.5 text-sm font-semibold text-brand-slate transition hover:bg-slate-50"
          >
            Book a call
          </a>
        </div>

        <div className="mt-4 flex gap-4 text-sm">
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-amber-dark hover:underline">
            LinkedIn
          </a>
          <a href={social.x} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-amber-dark hover:underline">
            X
          </a>
          <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="font-medium text-brand-amber-dark hover:underline">
            YouTube
          </a>
        </div>

        <div className="mt-16">
          <h2 className="font-heading text-xl font-bold text-brand-slate">Certifications</h2>
          <ul className="mt-4 space-y-3">
            {certifications.map((cert) => (
              <li key={cert.name} className="flex items-baseline justify-between border-b border-slate-100 pb-3">
                <div>
                  <p className="font-medium text-brand-slate">{cert.name}</p>
                  <p className="text-sm text-slate-500">{cert.issuer}</p>
                </div>
                <span className="text-sm text-slate-500">{cert.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
