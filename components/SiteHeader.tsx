import Link from "next/link";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/projects", label: "works" },
  { href: "/resume", label: "resume" },
  { href: "/writing", label: "shelf" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-[rgba(250,248,244,0.88)] backdrop-blur-sm">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 py-5">
          <div className="flex min-w-0 items-center gap-4 text-sm">
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="inline-flex items-center gap-2 font-medium tracking-[-0.01em] text-slate-900 transition hover:text-[#e45447]"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-[#e45447]" aria-hidden="true" />
              felixsarpong25@gmail.com
            </a>
            <Link
              href="/about"
              className="hidden text-slate-500 transition hover:text-slate-900 sm:inline"
            >
              about
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium tracking-[-0.01em] text-slate-700 sm:gap-6">
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
