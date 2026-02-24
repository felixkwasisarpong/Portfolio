import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata = {
  title: "Resume",
  description: "Download Felix Sarpong's resume and view professional links.",
};

export default function ResumePage() {
  return (
    <Container>
      <section className="kj-section mt-12 fade-up">
        <p className="section-kicker">Resume</p>
        <h1 className="section-title mt-3">Experience snapshot and profile links.</h1>
        <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
          A concise overview focused on fintech systems, backend engineering, distributed workflows, and reliability-focused delivery.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-6">
            <p className="section-kicker">Download</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Current resume (PDF)
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Use the PDF for applications or recruiter outreach. It reflects the current backend / fintech / agent tooling focus represented in this portfolio.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="/Felix_Sarpong_Resume.pdf" className="btn-primary px-5 py-2.5 text-sm font-semibold">
                Download PDF
              </a>
              <Link href="/contact" className="btn-secondary px-5 py-2.5 text-sm font-semibold">
                Contact
              </Link>
            </div>
          </div>

          <div className="card p-6">
            <p className="section-kicker">Profiles</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Links
            </h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/in/felix-kwasi-sarpong/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:text-[#e45447]"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/felixkwasisarpong"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 font-medium text-slate-700 transition hover:border-slate-300 hover:text-[#e45447]"
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
