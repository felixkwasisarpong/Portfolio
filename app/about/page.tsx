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
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">About</h1>

<div className="mt-6 space-y-6 text-base text-slate-700">
  <p>
    I’m a backend-first software engineer who builds and supports production systems for payments/fintech and
    data-driven platforms. My core stack is Java (Spring Boot) and Python (FastAPI) on AWS, with event-driven
    workflows using Kafka—plus full-stack delivery with Angular/React (TypeScript) when needed.
  </p>

  <p>
    I’ve shipped services operating under uptime and regulatory constraints, including systems processing 1M+
    transactions/day and platforms handling 20M+ transactions/month. I’ve reduced MTTR by 35%, supported 2–3
    deploys/week, and kept performance predictable (p95 ~140ms) through SQL tuning, Redis caching, and strong
    observability (Prometheus/Grafana).
  </p>

  <p>
    Lately, I’ve been building in the agent-safety space—designing control-plane patterns that govern tool-using
    AI systems (policy gates, audit-grade decision traces, and safe-by-default execution). My approach is grounded
    in ownership and clarity: explicit data models and state transitions, well-defined failure modes, and recovery
    paths that are boring in production. I care about end-to-end delivery APIs, internal tools, and full-stack
    features that connect backend logic to clean, usable interfaces.
  </p>


          <div className="pt-2">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Stack highlights
              </h2>
              <span className="text-sm text-slate-500">
                Logos scroll left to right. Hover to pause.
              </span>
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

          <p>
I’m open to Backend Engineer / Software Engineer II and Full-Stack Engineer roles (backend-leaning), especially in payments, distributed workflows, and reliability-focused teams.
          </p>

      
        </div>
      </section>
    </Container>
  );
}

