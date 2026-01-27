import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <p className="eyebrow">
          Felix Sarpong
        </p>

        <h1 className="gradient-text mt-4 text-3xl font-semibold sm:text-4xl">
          Backend & Full-Stack Software Engineer
        </h1>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Fintech • Distributed Systems • Product Engineering
        </p>

        <p className="mt-6 max-w-2xl text-lg text-slate-700">
          I design and build reliable backend systems and full-stack applications,
          with a focus on correctness, scalability, and real-world impact.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="btn-primary px-6 py-2 text-sm font-semibold"
          >
            View Projects
          </Link>

          <Link
            href="/writing"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
          >
            Read Writing
          </Link>
        </div>
      </section>

      {/* Focus areas */}
      <section className="mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10">
        <h2 className="text-lg font-semibold text-slate-900">What I focus on</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Backend & fintech systems
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Designing secure payment flows, ledgered state transitions, and
              backend services that operate reliably under real-world constraints.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Reliability & scalability
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Building systems that tolerate failure, scale predictably, and
              remain observable and debuggable in production.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Full-stack product delivery
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Shipping end-to-end features by connecting backend APIs, data models,
              and clean user interfaces into cohesive products.
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
