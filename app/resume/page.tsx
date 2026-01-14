import { Container } from "@/components/Container";

export const metadata = {
  title: "Resume",
  description: "Download Felix Sarpong's resume and view professional links.",
};

export default function ResumePage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Resume</h1>
        <p className="mt-4 text-base text-slate-600">
          A concise overview of experience focused on fintech, distributed
          systems, and reliability engineering.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/resume.pdf"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Download PDF
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            GitHub
          </a>
        </div>
      </section>
    </Container>
  );
}
