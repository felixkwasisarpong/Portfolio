import Link from "next/link";
import { Container } from "@/components/Container";

const navItems = [
  { href: "/projects", label: "Works" },
  { href: "/resume", label: "Resume" },
  { href: "/writing", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-[4.5rem] flex-wrap items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="inline-grid h-9 w-9 place-items-center rounded-full border border-slate-900 bg-slate-900 text-xs font-bold tracking-[0.16em] text-white">
                FS
              </span>
              <span className="text-sm font-semibold tracking-wide text-slate-900 transition group-hover:text-rose-700">
                Felix Kwasi Sarpong
              </span>
            </Link>
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="hidden rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 md:inline-flex"
            >
              felixsarpong25@gmail.com
            </a>
          </div>

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
        <div className="pb-3 md:hidden">
          <a
            href="mailto:felixsarpong25@gmail.com"
            className="inline-flex rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
          >
            felixsarpong25@gmail.com
          </a>
        </div>
      </Container>
    </header>
  );
}
