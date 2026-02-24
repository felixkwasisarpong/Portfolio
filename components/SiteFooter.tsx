import { Container } from "@/components/Container";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/70 py-0 text-sm text-slate-500 backdrop-blur">
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />
      <Container>
        <div className="grid gap-4 py-6 md:grid-cols-[1fr_auto_auto] md:items-center">
          <div>
            <p className="text-sm font-semibold text-slate-700">Felix Sarpong</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400">
              Backend systems • Fintech • Agent tooling
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600">
            <Link className="transition hover:text-slate-900" href="/projects">
              Works
            </Link>
            <Link className="transition hover:text-slate-900" href="/writing">
              Writing
            </Link>
            <Link className="transition hover:text-slate-900" href="/resume">
              Resume
            </Link>
            <Link className="transition hover:text-slate-900" href="/contact">
              Contact
            </Link>
          </div>
          <div className="text-xs md:text-right">
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="font-medium text-slate-600 transition hover:text-slate-900"
            >
              felixsarpong25@gmail.com
            </a>
            <p className="mt-1 text-slate-400">© {new Date().getFullYear()}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
