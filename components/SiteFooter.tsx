import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200/70 bg-white/70 py-0 text-sm text-slate-500 backdrop-blur">
      <div className="h-1.5 w-full bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />
      <Container>
        <div className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Felix Sarpong</span>
          <span className="text-xs uppercase tracking-[0.16em] text-slate-400">
            Backend systems • Fintech • Agent tooling
          </span>
        </div>
      </Container>
    </footer>
  );
}
