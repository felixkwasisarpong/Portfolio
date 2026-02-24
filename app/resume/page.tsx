import { Container } from "@/components/Container";

export const metadata = {
  title: "Resume",
  description: "Download Felix Sarpong's resume and view professional links.",
};

export default function ResumePage() {
  return (
    <Container>
      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Resume</p>
          </div>
          <h1 className="section-title mt-4">Experience snapshot and profile links.</h1>
          <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
            A concise overview focused on fintech systems, backend engineering,
            distributed workflows, and reliability-focused delivery.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card fade-up fade-up-delay-1 p-6">
            <p className="section-kicker">Download</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              Current resume (PDF)
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Use the PDF for applications or recruiter outreach. It reflects the
              current backend/fintech/agent tooling focus in this portfolio.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/Felix_Sarpong_Resume.pdf"
                className="btn-primary px-6 py-2.5 text-sm font-semibold"
              >
                Download PDF
              </a>
              <a
                href="/contact"
                className="btn-secondary px-6 py-2.5 text-sm font-semibold"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="card fade-up fade-up-delay-2 p-6">
            <p className="section-kicker">Profiles</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              Links
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/in/felix-kwasi-sarpong/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/felixkwasisarpong"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
              >
                <span>GitHub</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
