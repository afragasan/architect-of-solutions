import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { siteConfig } from "@/data/site-config";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/videos", label: "Videos" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="relative border-b border-slate-200">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-bold text-brand-slate">
          {siteConfig.name}
        </Link>
        <nav className="hidden gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-brand-amber-dark"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <MobileNav links={NAV_LINKS} />
      </Container>
    </header>
  );
}
