import { Container } from "@/components/Container";

export const metadata = {
  title: "About",
  description: "Engineering philosophy and background of Felix Sarpong.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">About</h1>

        <div className="mt-6 space-y-6 text-base text-slate-700">
          <p>
I’m a backend-first software engineer who builds and supports production systems for payments/fintech and data-driven platforms. My core stack is Java (Spring Boot) and Python (FastAPI) on AWS, with event-driven workflows using Kafka, plus full-stack delivery with Angular/React (TypeScript) when needed.
          </p>

          <p>
I’ve worked on services operating under uptime and regulatory constraints, including systems processing 1M+ transactions/day and platforms handling 20M+ transactions/month. I’ve improved MTTR by 35%, supported 2–3 deploys/week, and helped maintain predictable performance (p95 ~140ms) through SQL tuning, Redis caching, and strong observability (Prometheus/Grafana).

          </p>

          <p>
My approach is grounded in ownership and clarity: explicit data models and state transitions, well-defined failure modes, and recovery paths that are boring in production. I care about end-to-end delivery—APIs, internal tools, and full-stack features that connect backend logic to clean, usable interfaces.
          </p>

          <p>
I’m open to Backend Engineer / Software Engineer II and Full-Stack Engineer roles (backend-leaning), especially in payments, distributed workflows, and reliability-focused teams.
          </p>

      
        </div>
      </section>
    </Container>
  );
}
