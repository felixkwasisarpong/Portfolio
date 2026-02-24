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
    "Strawberry GraphQL",
    "LangGraph",
    "CrewAI",
    "MCP",
    "Agent Security",
    "Neo4j",
    "GraphRAG",
    "Pinecone",
    "AWS",
    "Kafka",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
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
      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">About</p>
          </div>
          <h1 className="section-title mt-4">
            Backend-first engineer with a bias for clarity, reliability, and production ownership.
          </h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4 text-sm leading-7 text-slate-700 sm:text-base">
            <p className="fade-up fade-up-delay-1">
              I build and support production systems for payments/fintech and
              data-driven platforms. My core stack is Java (Spring Boot) and Python
              (FastAPI) on AWS, with event-driven workflows using Kafka, plus
              full-stack delivery with Angular/React (TypeScript) when needed.
            </p>

            <p className="fade-up fade-up-delay-2">
              I’ve shipped services operating under uptime and regulatory constraints,
              including systems processing 1M+ transactions/day and platforms
              handling 20M+ transactions/month. I’ve reduced MTTR by 35%, supported
              frequent deploys, and kept performance predictable through SQL tuning,
              Redis caching, and strong observability.
            </p>

            <p className="fade-up fade-up-delay-3">
              Recently, I’ve been building in the agent-safety space, designing
              control-plane patterns for tool-using AI systems (policy gates,
              audit-grade decision traces, and safe-by-default execution). I care
              about explicit data models, clear failure modes, and boring recovery
              paths in production.
            </p>
          </div>

          <aside className="card fade-up p-5">
            <p className="section-kicker">Open to</p>
            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              Backend Engineer / Software Engineer II / Full-Stack (backend-leaning)
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Especially interested in payments, distributed workflows, reliability,
              and teams building high-trust systems.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="pill px-3 py-1 text-xs font-medium">Payments</span>
              <span className="pill px-3 py-1 text-xs font-medium">Distributed Systems</span>
              <span className="pill px-3 py-1 text-xs font-medium">Reliability</span>
              <span className="pill px-3 py-1 text-xs font-medium">Agent Tooling</span>
            </div>
          </aside>
        </div>

        <div className="fade-up fade-up-delay-2 mt-10 border-t border-slate-200/80 pt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Stack highlights</h2>
              <p className="mt-1 text-sm text-slate-600">
                Hover to pause the stack strip.
              </p>
            </div>
          </div>

          <div
            className="logo-marquee mt-5"
            aria-label="Technology stack logos carousel"
          >
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
