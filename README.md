# architect-of-solutions

Source for [alejandrofraga.com](https://alejandrofraga.com) — Alejandro Fraga's portfolio, built in public. This repo is the artifact as much as the site is: every architectural decision behind the site itself gets written up on the [blog](https://alejandrofraga.com/blog).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [Velite](https://velite.js.org) for schema-validated MDX content (`content/work`, `content/blog`)
- [Beehiiv](https://www.beehiiv.com) for the newsletter
- Hosted on AWS Amplify

No database in v1 — the site is fully static/SSG. See `data/*.ts` for the small amount of manually-configured data (latest video/newsletter issue, video series, proof-strip numbers, certifications).

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs Velite in watch mode alongside `next dev`, so editing an MDX file under `content/` hot-reloads the site.

## Content structure

- `content/work/builds/*.mdx` — own code projects
- `content/work/case-studies/*.mdx` — sanitized case studies
- `content/blog/*.mdx` — blog posts

Every Work entry (build or case study) must contain these `##` headings, in order — Velite's build-time schema check fails the build if one is missing or out of order:

1. Business problem & constraints
2. Architecture
3. Key decisions & trade-offs
4. Code
5. Evidence
6. Demo
7. What I'd do differently

## Environment variables

Copy `.env.example` to `.env.local` and fill in the Beehiiv keys to enable the live newsletter archive. Without them, the newsletter archive page falls back to linking out to the public Beehiiv archive.

## Deploying

Hosted on AWS Amplify (`amplify.yml` at the repo root). Amplify runs `npm run build`, which runs `velite build --strict` before `next build`.
