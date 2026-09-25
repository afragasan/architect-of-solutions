import { defineCollection, defineConfig, s } from "velite";

// The seven sections every Work entry (Build or Case Study) must contain,
// written as `## ` headings in the MDX body, in this exact order.
const REQUIRED_WORK_HEADINGS = [
  "Business problem & constraints",
  "Architecture",
  "Key decisions & trade-offs",
  "Code",
  "Evidence",
  "Demo",
  "What I'd do differently",
] as const;

function assertRequiredHeadings(raw: string, slug: string) {
  const found = [...raw.matchAll(/^##\s+(.+?)\s*$/gm)].map((m) => m[1].trim());
  const present = found.filter((h) =>
    (REQUIRED_WORK_HEADINGS as readonly string[]).includes(h)
  );

  const missing = REQUIRED_WORK_HEADINGS.filter((h) => !present.includes(h));
  if (missing.length > 0) {
    throw new Error(
      `Work entry "${slug}" is missing required section(s): ${missing.join(", ")}`
    );
  }

  const outOfOrder = present.some((h, i) => h !== REQUIRED_WORK_HEADINGS[i]);
  if (outOfOrder) {
    throw new Error(
      `Work entry "${slug}" has its sections out of order. Expected: ${REQUIRED_WORK_HEADINGS.join(" -> ")}`
    );
  }
}

const workSchema = (type: "build" | "case-study") =>
  s
    .object({
      title: s.string().max(120),
      slug: s.slug("work"),
      type: s.literal(type),
      summary: s.string().max(240),
      date: s.isodate(),
      tags: s.array(s.string()),
      featured: s.boolean().default(false),
      coverImage: s.image().optional(),
      repoUrl: s.string().url().optional(),
      demoVideoId: s.string().optional(),
      evidenceHighlight: s.string().optional(),
      body: s.mdx(),
      raw: s.raw(),
    })
    .transform(({ raw, ...data }) => {
      assertRequiredHeadings(raw, data.slug);
      return data;
    });

const blogSchema = s
  .object({
    title: s.string().max(120),
    slug: s.slug("blog"),
    summary: s.string().max(240),
    date: s.isodate(),
    tags: s.array(s.string()),
    coverImage: s.image().optional(),
    body: s.mdx(),
  });

export default defineConfig({
  root: "content",
  collections: {
    builds: defineCollection({
      name: "Build",
      pattern: "work/builds/**/*.mdx",
      schema: workSchema("build"),
    }),
    caseStudies: defineCollection({
      name: "CaseStudy",
      pattern: "work/case-studies/**/*.mdx",
      schema: workSchema("case-study"),
    }),
    blogPosts: defineCollection({
      name: "BlogPost",
      pattern: "blog/**/*.mdx",
      schema: blogSchema,
    }),
  },
});
