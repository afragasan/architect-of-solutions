import { Container } from "@/components/layout/Container";
import { NewsletterSignupBox } from "@/components/newsletter/NewsletterSignupBox";
import { siteConfig, social } from "@/data/site-config";

const SOCIAL_LINKS = [
  {
    href: social.x,
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    href: social.linkedin,
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.114 20.452H3.558V9h3.556z",
  },
  {
    href: social.youtube,
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .502 5.814 3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12z",
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-brand-slate">
      <Container className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="font-heading text-lg font-bold text-white">{siteConfig.name}</p>
          <p className="mt-2 max-w-sm text-sm text-slate-300">{siteConfig.description}</p>
          <div className="mt-4 flex gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="text-slate-300 transition hover:text-brand-amber"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d={item.path} />
                </svg>
              </a>
            ))}
          </div>
          <p className="mt-8 text-xs text-slate-400">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>
        <div className="w-full lg:w-96">
          <NewsletterSignupBox variant="dark" />
        </div>
      </Container>
    </footer>
  );
}
