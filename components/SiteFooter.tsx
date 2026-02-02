import { Container } from "@/components/Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/70 bg-white/70 py-6 text-sm text-slate-500 backdrop-blur">
      <Container>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Felix Sarpong</span>
   
        </div>
      </Container>
    </footer>
  );
}
