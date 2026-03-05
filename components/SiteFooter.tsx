import Link from "next/link";
import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--surface-soft)]">
      <div className="h-1 w-full bg-gradient-to-r from-[#22d3ee] via-[#3b82f6] to-[#34d399]" />
      <Container>
        <div className="grid gap-8 py-10 md:grid-cols-[1.2fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-light">
              Let&apos;s build
            </p>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl">
              Reliable systems for products that need trust, speed, and clear operations.
            </h2>
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-[var(--accent)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              felixsarpong25@gmail.com
            </a>
          </div>

          <div className="grid gap-3 text-sm text-muted md:justify-items-end">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/projects" className="nav-link nav-link-muted">
                works
              </Link>
              <Link href="/writing" className="nav-link nav-link-muted">
                shelf
              </Link>
              <Link href="/resume" className="nav-link nav-link-muted">
                resume
              </Link>
              <Link href="/contact" className="nav-link nav-link-muted">
                contact
              </Link>
            </div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-light">
              © {new Date().getFullYear()} Felix Sarpong
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
