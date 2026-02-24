import Link from "next/link";
import { Container } from "@/components/Container";
import { getLatestWeeklyWritingPost } from "@/lib/content";

export default function HomePage() {
  const latestWeeklyPost = getLatestWeeklyWritingPost();

  return (
    <Container>
      {/* Hero */}
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <p className="eyebrow">Felix Sarpong</p>

        <h1 className="gradient-text mt-4 text-3xl font-semibold sm:text-4xl">
          Backend-first Full-Stack Software Engineer
        </h1>

        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
  Java/Spring Boot • Python/FastAPI • AWS • Kafka • React/Angular • Agent tooling (HITL) • MCP
        </p>

        <p className="mt-6 max-w-2xl text-lg text-slate-700">
 I build production systems for fintech and product teams: reliable APIs,
  event-driven services, and full-stack features that stay predictable under
  real-world load, plus safe, human-in-the-loop workflows for tool-using agents.
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

      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Weekly Trends</h2>
            <p className="text-sm text-slate-600">
              Auto-curated every Monday (source-backed).
            </p>
          </div>
        </div>

        <div className="mt-6">
          {latestWeeklyPost ? (
            <article className="card p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-2 inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                    Weekly
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    <Link
                      href={`/writing/${latestWeeklyPost.slug}`}
                      className="transition hover:text-sky-600"
                    >
                      {latestWeeklyPost.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {latestWeeklyPost.frontmatter.summary}
                  </p>
                </div>
                <span className="shrink-0 text-xs uppercase tracking-[0.2em] text-slate-400">
                  {latestWeeklyPost.frontmatter.date}
                </span>
              </div>

              {latestWeeklyPost.frontmatter.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {latestWeeklyPost.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="pill px-3 py-1 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ) : (
            <div className="card p-5 text-sm text-slate-600">
              No weekly posts yet — check back Monday.
            </div>
          )}
        </div>

        <div className="mt-5">
          <Link
            href="/writing?tag=Weekly"
            className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          >
            View all weekly posts →
          </Link>
        </div>
      </section>

{/* Focus areas */}
<section className="mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-8 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10">
  <h2 className="text-lg font-semibold text-slate-900">What I focus on</h2>
  <p className="mt-2 max-w-2xl text-sm text-slate-600">
    Backend-first delivery with strong product instincts: build the API, ship the
    UI, and keep production boring — with clear safety and auditability when
    systems take actions.
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
        Agentic platforms & governance
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Tool-using agents with{" "}
        <span className="font-semibold text-slate-700">
          human-in-the-loop approvals
        </span>, policy gates, and audit trails, deployed across cloud and local
        runtimes.
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
