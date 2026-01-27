import { Container } from "@/components/Container";

export const metadata = {
  title: "Resume",
  description: "Download Felix Sarpong's resume and view professional links.",
};

export default function ResumePage() {
  return (
    <Container>
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Resume</h1>
        <p className="mt-4 text-base text-slate-600">
          A concise overview of experience focused on fintech, distributed
          systems, and reliability engineering.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="/Felix_Sarpong_Resume.pdf"
            className="btn-primary px-6 py-2 text-sm font-semibold"
          >
            Download PDF
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
          >
            GitHub
          </a>
        </div>
      </section>
    </Container>
  );
}
