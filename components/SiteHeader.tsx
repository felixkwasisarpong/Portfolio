import Link from "next/link";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-18 flex-wrap items-center justify-between gap-4 py-3">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="inline-grid h-9 w-9 place-items-center rounded-full border border-slate-900 bg-slate-900 text-xs font-bold tracking-[0.16em] text-white">
              FS
            </span>
            <span className="text-sm font-semibold tracking-wide text-slate-900 transition group-hover:text-sky-700">
              Felix Kwasi Sarpong
            </span>
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-2 text-sm text-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-3 py-1.5 font-medium transition hover:border-slate-200 hover:bg-white hover:text-slate-900"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
