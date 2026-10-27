# architect-of-solutions

Source for [alejandrofraga.com](https://alejandrofraga.com) — Alejandro Fraga's portfolio, built in public. This repo is the artifact as much as the site is: every architectural decision behind the site itself gets written up in the newsletter and previewed on the [newsletter page](https://alejandrofraga.com/newsletter).

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript + Tailwind CSS v4
- [Velite](https://velite.js.org) for schema-validated MDX content (`content/work`)
- [Beehiiv](https://www.beehiiv.com) is the single place articles are published. The site pulls post teasers from its API (home and `/newsletter`) and links out to read them; the signup box posts to `/api/subscribe`, which calls Beehiiv server-side
- YouTube hosts videos; the site shows thumbnails and descriptions that link out
- Hosted on AWS Amplify

No database in v1. See `data/*.ts` for the small amount of manually-configured data (videos and series, proof-strip numbers, certifications).

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs Velite in watch mode alongside `next dev`, so editing an MDX file under `content/` hot-reloads the site.

## Content structure

- `content/work/builds/*.mdx` — own code projects
- `content/work/case-studies/*.mdx` — sanitized case studies
- Articles are written in Beehiiv, not in this repo. Publish them as web + email so they get a public URL and show up here.

Every Work entry (build or case study) must contain these `##` headings, in order — Velite's build-time schema check fails the build if one is missing or out of order:

1. Business problem & constraints
2. Architecture
3. Key decisions & trade-offs
4. Code
5. Evidence
6. Demo
7. What I'd do differently

## Environment variables

Copy `.env.example` to `.env.local` and fill in `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID`. Without them, article lists show an empty state and the signup form reports an error. In Amplify, set the same variables in the console; `amplify.yml` copies them into `.env.production` so server code can read them. Once the Beehiiv custom domain is live, set `NEXT_PUBLIC_NEWSLETTER_URL=https://newsletter.alejandrofraga.com`.

## Deploying

Hosted on AWS Amplify (`amplify.yml` at the repo root). Amplify runs `npm run build`, which runs `velite build --strict` before `next build`.
