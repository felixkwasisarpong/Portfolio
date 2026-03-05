import { Container } from "@/components/Container";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Felix Sarpong.",
};

export default function ContactPage() {
  return (
    <Container>
      <section className="kj-section mt-12 fade-up">
        <p className="section-kicker">Contact</p>
        <h1 className="section-title mt-3 max-w-4xl">
          Let&apos;s talk about backend systems, payments, or safe agent workflows.
        </h1>
        <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
          I&apos;m open to backend and full-stack engineering roles, architecture conversations, and reliability-focused work. If you&apos;re building or maintaining production systems, reach out.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="card p-6">
            <p className="section-kicker">Primary</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">Email</h2>
            <a
              href="mailto:felixsarpong25@gmail.com"
              className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-foreground transition hover:text-[var(--accent)]"
            >
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />
              felixsarpong25@gmail.com
            </a>
            <p className="mt-3 text-sm text-muted">I usually reply fastest by email.</p>
          </div>

          <div className="card p-6">
            <p className="section-kicker">Elsewhere</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-foreground">Profiles</h2>
            <div className="mt-4 space-y-3 text-sm">
              <a
                href="https://www.linkedin.com/in/felix-kwasi-sarpong/"
                target="_blank"
                rel="noreferrer"
                className="surface-soft flex items-center justify-between rounded-xl px-4 py-3 font-medium text-muted transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
              >
                <span>LinkedIn</span>
                <span>↗</span>
              </a>
              <a
                href="https://github.com/felixkwasisarpong"
                target="_blank"
                rel="noreferrer"
                className="surface-soft flex items-center justify-between rounded-xl px-4 py-3 font-medium text-muted transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
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
