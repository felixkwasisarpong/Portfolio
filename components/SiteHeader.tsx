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
    <header className="border-b border-slate-200">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="text-sm font-semibold tracking-wide">
            Felix Sarpong
          </Link>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-slate-900"
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
