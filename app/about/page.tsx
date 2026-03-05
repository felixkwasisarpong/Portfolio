import { Container } from "@/components/Container";

export const metadata = {
  title: "About",
  description: "Engineering philosophy and background of Felix Sarpong.",
};

export default function AboutPage() {
  const stack = [
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "GraphQL",
    "LangGraph",
    "MCP",
    "AWS",
    "Kafka",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "OpenTelemetry",
    "Prometheus",
    "Grafana",
    "React",
    "Angular",
    "TypeScript",
  ];
  const stackLoop = [...stack, ...stack];

  return (
    <Container>
      <section className="kj-section mt-12 fade-up">
        <p className="section-kicker">About</p>
        <h1 className="section-title mt-3 max-w-4xl">
          Backend-first engineer focused on reliable systems, clear failure modes, and production ownership.
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-7 text-muted sm:text-base">
            <p>
              I build and support production systems for payments/fintech and data-driven platforms. My core stack is Java (Spring Boot) and Python (FastAPI) on AWS, with event-driven workflows using Kafka, plus full-stack delivery with Angular/React when needed.
            </p>
            <p>
              I&apos;ve shipped services operating under uptime and regulatory constraints, including systems processing 1M+ transactions/day and platforms handling 20M+ transactions/month. I care about keeping systems predictable under real-world load and incidents.
            </p>
            <p>
              More recently, I&apos;ve been building around agent safety and control planes: policy gates, human approvals, audit trails, and explicit data models for tool-using AI systems in production.
            </p>
          </div>

          <aside className="card p-5">
            <p className="section-kicker">Open to</p>
            <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-foreground">
              Backend Engineer / Software Engineer II / Full-Stack (backend-leaning)
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Especially interested in payments, distributed workflows, reliability engineering, and high-trust product teams.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Payments",
                "Distributed Systems",
                "Reliability",
                "Agent Tooling",
              ].map((tag) => (
                <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-10 border-t border-[var(--border)] pt-8">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Top skills</p>
          </div>
          <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-foreground">
            Tooling and platform stack
          </h2>
          <p className="mt-2 text-sm text-muted">Hover to pause the strip.</p>

          <div className="logo-marquee mt-5" aria-label="Technology stack carousel">
            <div className="logo-track">
              {stackLoop.map((item, index) => {
                const initials = item
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                return (
                  <div key={`${item}-${index}`} className="logo-card">
                    <span className="logo-mark" aria-hidden="true">
                      {initials}
                    </span>
                    <span className="logo-label">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
