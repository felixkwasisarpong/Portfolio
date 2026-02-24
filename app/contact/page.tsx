import { Container } from "@/components/Container";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Felix Sarpong.",
};

export default function ContactPage() {
  return (
    <Container>
      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Contact</p>
          </div>
          <h1 className="section-title mt-4">Let’s talk about backend systems, payments, or agent tooling.</h1>
          <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
            I’m open to backend and full-stack engineering roles, architecture
            conversations, and reliability-focused work. If you’re building or
            maintaining production systems, reach out.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card fade-up fade-up-delay-1 p-6">
            <p className="section-kicker">Primary</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Email</h2>
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="mt-3 inline-block text-lg font-semibold text-slate-800 transition hover:text-rose-700"
            >
              felixsarpong25@gmail.com
            </a>
            <p className="mt-3 text-sm text-slate-600">
              I usually reply fastest by email.
            </p>
          </div>

          <div className="card fade-up fade-up-delay-2 p-6">
            <p className="section-kicker">Elsewhere</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">Profiles</h2>
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
