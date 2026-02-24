import Link from "next/link";
import { Container } from "@/components/Container";
import { getLatestWeeklyWritingPost } from "@/lib/content";

const proofPoints = [
  "1M+ tx/day systems",
  "20M+ tx/month platforms",
  "MTTR ↓ 35%",
  "p95 ~140ms",
  "2–3 deploys/week",
  "HITL + audit-first agent tooling",
];

const focusAreas = [
  {
    title: "Backend & payment flows",
    accent: "from-rose-400 to-orange-300",
    body:
      "APIs and event-driven services for payment journeys, state transitions, and partner integrations using Spring Boot and FastAPI.",
  },
  {
    title: "Reliability engineering",
    accent: "from-amber-300 to-lime-300",
    body:
      "Production debugging, performance tuning, and incident recovery design across AWS, SQL, Redis, and queue-backed systems.",
  },
  {
    title: "Agent platforms with guardrails",
    accent: "from-teal-300 to-cyan-300",
    body:
      "Tool-using agent workflows with policy gates, approvals, and audit trails so automation stays useful and safe in production.",
  },
];

export default function HomePage() {
  const latestWeeklyPost = getLatestWeeklyWritingPost();

  return (
    <Container>
      <section className="panel paper-grid fade-up relative mt-10 overflow-hidden px-8 py-10 sm:px-12 sm:py-12">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-rose-300/30 to-orange-200/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-gradient-to-br from-teal-300/25 to-cyan-200/15 blur-2xl" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="fade-up fade-up-delay-1">
            <p className="eyebrow">Felix Sarpong</p>
            <div className="mt-4 inline-flex -rotate-1 items-center rounded-full border border-slate-900 bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
              Backend • Fintech • Agent Tooling
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[0.95] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Building reliable fintech systems and safe agent workflows.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              I build production systems for fintech and product teams: reliable APIs,
              event-driven services, and full-stack features that stay predictable under
              real-world load, plus human-in-the-loop workflows for tool-using agents.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="btn-primary px-6 py-2.5 text-sm font-semibold"
                aria-label="View projects"
              >
                View Projects
              </Link>
              <Link
                href="/writing"
                className="btn-secondary px-6 py-2.5 text-sm font-semibold"
                aria-label="Read writing"
              >
                Read Writing
              </Link>
              <Link
                href="/resume"
                className="btn-secondary px-6 py-2.5 text-sm font-semibold"
                aria-label="View resume"
              >
                Resume
              </Link>
              <Link
                href="/contact"
                className="btn-secondary px-6 py-2.5 text-sm font-semibold"
                aria-label="Contact"
              >
                Contact
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <span className="accent-rule" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Production signals
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {proofPoints.map((point) => (
                <div
                  key={point}
                  className="rounded-xl border border-white/80 bg-white/85 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_12px_28px_-26px_rgba(15,23,42,0.5)]"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <aside className="card fade-up fade-up-delay-2 relative overflow-hidden border-2 border-slate-900/85 bg-slate-950 p-0 text-slate-100 shadow-[0_24px_55px_-36px_rgba(15,23,42,0.8)]">
            <div className="h-2 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Current focus
                  </p>
                  <h2 className="mt-2 text-2xl font-bold leading-tight text-white">
                    Backend-first delivery for high-trust products.
                  </h2>
                </div>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                  Live
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Stack
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    Java / Spring Boot, Python / FastAPI, Kafka, AWS, SQL/Redis,
                    React/Angular, and MCP-based agent control planes.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                    What I optimize
                  </p>
                  <ul className="mt-2 space-y-2 text-sm text-slate-200">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-300" />
                      Transaction correctness and system predictability
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                      Operational visibility and recovery speed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-300" />
                      Safe automation with approvals and auditability
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  Lagos, Nigeria
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
                  Backend + Full-stack delivery
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="panel fade-up mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="accent-rule" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Writing signal
              </p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">Weekly Trends</h2>
            <p className="mt-1 text-sm text-slate-600">
              Auto-curated every Monday (source-backed).
            </p>
          </div>
          <Link
            href="/writing?tag=Weekly"
            className="text-sm font-semibold text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
          >
            View all weekly posts →
          </Link>
        </div>

        <div className="mt-6">
          {latestWeeklyPost ? (
            <article className="card overflow-hidden border-2 border-slate-900/10 p-0">
              <div className="h-1.5 bg-gradient-to-r from-rose-400 via-amber-300 to-teal-300" />
              <div className="p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                      Weekly
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      <Link
                        href={`/writing/${latestWeeklyPost.slug}`}
                        className="transition hover:text-rose-700"
                      >
                        {latestWeeklyPost.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {latestWeeklyPost.frontmatter.summary}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
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
              </div>
            </article>
          ) : (
            <div className="card p-5 text-sm text-slate-600">
              No weekly posts yet — check back Monday.
            </div>
          )}
        </div>
      </section>

      <section className="fade-up mt-10 rounded-3xl border border-slate-200/70 bg-white/65 p-8 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.45)] backdrop-blur sm:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="accent-rule" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                What I focus on
              </p>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
              Backend-first delivery with product and operations discipline.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Build the API, ship the UI, and keep production boring. The goal is
              delivery speed without sacrificing observability, recovery paths, or
              safe action boundaries.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {focusAreas.map((area) => (
            <div
              key={area.title}
              className="card fade-up overflow-hidden p-0"
            >
              <div className={`h-2 bg-gradient-to-r ${area.accent}`} />
              <div className="p-5">
                <h3 className="text-base font-semibold text-slate-900">{area.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{area.body}</p>
              </div>
            </div>
          ))}
        </div>

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
