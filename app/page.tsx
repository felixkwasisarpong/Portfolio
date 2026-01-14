import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <section className="py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Felix Sarpong
        </p>

        <h1 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Backend & Full-Stack Software Engineer
        </h1>

        <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
          Fintech • Distributed Systems • Product Engineering
        </p>

        <p className="mt-6 max-w-2xl text-lg text-slate-700">
          I design and build reliable backend systems and full-stack applications,
          with a focus on correctness, scalability, and real-world impact.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-md bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-300"
          >
            View Projects
          </Link>

          <Link
            href="/writing"
            className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Read Writing
          </Link>
        </div>
      </section>

      {/* Focus areas */}
      <section className="border-t border-slate-200 py-12">
        <h2 className="text-lg font-semibold text-slate-900">
          What I focus on
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Backend & fintech systems
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Designing secure payment flows, ledgered state transitions, and
              backend services that operate reliably under real-world constraints.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Reliability & scalability
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Building systems that tolerate failure, scale predictably, and
              remain observable and debuggable in production.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 p-5">
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