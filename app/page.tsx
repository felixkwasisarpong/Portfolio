import Link from "next/link";
import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <Container>
      {/* Hero */}
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <p className="eyebrow">Felix Sarpong</p>

        <h1 className="gradient-text mt-4 text-3xl font-semibold sm:text-4xl">
          Backend-first Full-Stack Software Engineer
        </h1>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Java/Spring Boot • Python/FastAPI • AWS • Kafka • React/Angular
        </p>

        <p className="mt-6 max-w-2xl text-lg text-slate-700">
          I build production systems for fintech and product teams reliable APIs,
          event-driven services, and full-stack features that stay predictable
          under real-world load.
        </p>

        {/* Proof/metrics row */}
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            1M+ tx/day systems
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            20M+ tx/month platforms
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            MTTR ↓ 35%
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            p95 ~140ms
          </span>
          <span className="rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700">
            2–3 deploys/week
          </span>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="btn-primary px-6 py-2 text-sm font-semibold"
            aria-label="View projects"
          >
            View Projects
          </Link>

          <Link
            href="/writing"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
            aria-label="Read writing"
          >
            Read Writing
          </Link>

          {/* Add high-intent CTAs */}
          <Link
            href="/resume"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
            aria-label="View resume"
          >
            Resume
          </Link>

          <Link
            href="/contact"
            className="btn-secondary px-6 py-2 text-sm font-semibold"
            aria-label="Contact"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Focus areas */}
      <section className="mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10">
        <h2 className="text-lg font-semibold text-slate-900">What I focus on</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Backend-first delivery with strong product instincts: build the API,
          ship the UI, and keep production boring.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Backend & fintech systems
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Payment flows, state transitions, and integrations built with{" "}
              <span className="font-semibold text-slate-700">
                Spring Boot/FastAPI
              </span>{" "}
              and event-driven messaging{" "}
              <span className="font-semibold text-slate-700">(Kafka)</span>.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Reliability & scalability
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Observability, incident response, and performance work across{" "}
              <span className="font-semibold text-slate-700">
                AWS + SQL/Redis
              </span>{" "}
              to keep latency predictable and recovery paths clear.
            </p>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Full-stack product delivery
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Shipping end-to-end features by connecting APIs, data models, and{" "}
              <span className="font-semibold text-slate-700">
                React/Angular (TypeScript)
              </span>{" "}
              into cohesive products.
            </p>
          </div>
        </div>

        {/* Optional: a small secondary CTA row */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          >
            See projects →
          </Link>
          <Link
            href="/resume"
            className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          >
            View resume →
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          >
            Contact →
          </Link>
        </div>
      </section>
    </Container>
  );
}