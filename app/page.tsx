import Link from "next/link";
import { Container } from "@/components/Container";
import { getContentList, getLatestWeeklyWritingPost } from "@/lib/content";

const skillSections = [
  {
    title: "backend systems",
    body: "Spring Boot and FastAPI services for payment flows, partner integrations, and event-driven platform work.",
  },
  {
    title: "reliability & operations",
    body: "Observability, incident response, performance tuning, and recovery design across AWS, SQL, Redis, and queues.",
  },
  {
    title: "agent tooling (HITL)",
    body: "MCP-based workflows with approvals, audit trails, and policy gates so automation stays safe in production.",
  },
  {
    title: "full-stack delivery",
    body: "Backend-first product delivery with React/Angular frontends when teams need end-to-end ownership.",
  },
];

export default function HomePage() {
  const latestWeeklyPost = getLatestWeeklyWritingPost();
  const featuredProjects = getContentList("projects").slice(0, 3);

  return (
    <Container>
      <section className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="fade-up">
          <p className="section-kicker">Backend Software Engineer • Fintech Systems • Agent Tooling</p>
          <h1 className="kj-hero-name mt-4">
            Felix
            <span className="offset">Sarpong</span>
          </h1>
          <p className="kj-subline mt-6">
            Backend-first full-stack engineer building reliable payment systems,
            operationally safe automation, and production workflows that stay predictable under load.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary px-5 py-2.5 text-sm font-semibold">
              View works
            </Link>
            <Link href="/resume" className="btn-secondary px-5 py-2.5 text-sm font-semibold">
              Resume
            </Link>
            <Link href="/writing?tag=Weekly" className="btn-secondary px-5 py-2.5 text-sm font-semibold">
              Weekly trends
            </Link>
          </div>
        </div>

        <aside className="panel fade-up fade-up-delay-1 p-6">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Current focus</p>
          </div>
          <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] text-slate-950">
            High-trust backend delivery for products that move money and decisions.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              I work at the backend/core platform layer: transaction correctness,
              resilience, incident recovery, and integration-heavy workflows.
            </p>
            <p>
              Recent work includes payment infrastructure, observability-driven triage,
              and human-in-the-loop agent execution with policy and audit boundaries.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "1M+ tx/day systems",
              "20M+ tx/month platforms",
              "MTTR ↓ 35%",
              "p95 ~140ms",
              "2–3 deploys/week",
            ].map((item) => (
              <span key={item} className="pill px-3 py-1 text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="kj-section fade-up fade-up-delay-1">
        <div className="flex items-center gap-3">
          <span className="accent-rule" />
          <p className="section-kicker">Top skills</p>
        </div>
        <h2 className="section-title mt-4">Built for product delivery and production operations.</h2>
        <div className="kj-highlight-grid mt-7">
          {skillSections.map((item, index) => (
            <div key={item.title} className={`kj-skill-card fade-up fade-up-delay-${(index % 3) + 1}`}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="kj-section fade-up fade-up-delay-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">My works</p>
            <h2 className="section-title mt-3">Selected projects and engineering case studies.</h2>
          </div>
          <Link href="/projects" className="kj-arrow-link">
            View all works <span>→</span>
          </Link>
        </div>

        <div className="kj-list mt-6">
          {featuredProjects.map((project) => (
            <article key={project.slug} className="kj-row fade-up">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="kj-meta">{project.frontmatter.date}</span>
                  {project.frontmatter.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-2 text-xl leading-tight">
                  <Link href={`/projects/${project.slug}`} className="kj-title-link">
                    {project.frontmatter.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                  {project.frontmatter.summary}
                </p>
              </div>
              <div className="sm:pt-1">
                <Link href={`/projects/${project.slug}`} className="kj-arrow-link text-sm">
                  Open <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="kj-section fade-up fade-up-delay-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Weekly trends</p>
            <h2 className="section-title mt-3">Auto-curated every Monday (source-backed).</h2>
          </div>
          <Link href="/writing?tag=Weekly" className="kj-arrow-link">
            View all weekly posts <span>→</span>
          </Link>
        </div>

        <div className="mt-6">
          {latestWeeklyPost ? (
            <article className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="pill px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Weekly
                </span>
                <span className="kj-meta">{latestWeeklyPost.frontmatter.date}</span>
              </div>
              <h3 className="mt-3 text-2xl leading-tight">
                <Link href={`/writing/${latestWeeklyPost.slug}`} className="kj-title-link">
                  {latestWeeklyPost.frontmatter.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                {latestWeeklyPost.frontmatter.summary}
              </p>
              {latestWeeklyPost.frontmatter.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {latestWeeklyPost.frontmatter.tags.map((tag) => (
                    <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
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
      </section>
    </Container>
  );
}
