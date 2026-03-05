import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/projects", label: "works" },
  { href: "/resume", label: "resume" },
  { href: "/writing", label: "shelf" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[rgba(12,18,32,0.82)] backdrop-blur-lg">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex min-w-0 items-center gap-4 text-sm">
            <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-[-0.02em] text-foreground">

              Home
            </Link>
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="inline-flex items-center gap-2 font-medium tracking-[-0.01em] text-muted transition hover:text-[var(--accent)]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              felixsarpong25@gmail.com
            </a>
            <Link
              href="/about"
              className="hidden text-muted-light transition hover:text-foreground sm:inline"
            >
              about
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium tracking-[-0.01em] text-muted sm:gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="nav-link nav-link-muted">
              contact
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}
