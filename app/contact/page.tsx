import { Container } from "@/components/Container";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Felix Sarpong.",
};

export default function ContactPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Contact</h1>

        <p className="mt-4 max-w-2xl text-base text-slate-600">
          I’m open to backend and full-stack engineering roles, as well as
          conversations around system design, architecture reviews, and
          reliability-focused work. If you’re building or maintaining
          production systems and want to talk, feel free to reach out.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-900">Email</p>
            <a
              href="mailto:hello@felixsarpong.dev"
              className="mt-2 inline-block text-sm text-slate-600 transition hover:text-slate-900"
            >
              felixsarpong25@gmail.com
            </a>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <p className="text-sm font-semibold text-slate-900">Elsewhere</p>
            <div className="mt-2 space-y-1 text-sm">
              <a
                href="https://www.linkedin.com/in/felix-kwasi-sarpong/"
                target="_blank"
                rel="noreferrer"
                className="block text-slate-600 transition hover:text-slate-900"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/felixsarpong"
                target="_blank"
                rel="noreferrer"
                className="block text-slate-600 transition hover:text-slate-900"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}