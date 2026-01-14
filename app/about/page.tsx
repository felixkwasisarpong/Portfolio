import { Container } from "@/components/Container";

export const metadata = {
  title: "About",
  description: "Engineering philosophy and background of Felix Sarpong.",
};

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">About</h1>

        <div className="mt-6 space-y-6 text-base text-slate-700">
          <p>
            I’m a backend-first software engineer with experience building and
            supporting production systems for financial products, payments, and
            data-driven platforms. I’ve worked on services that process real
            transactions, integrate with external networks, and operate under
            regulatory and uptime constraints.
          </p>

          <p>
            My approach to engineering is grounded in ownership and clarity. I
            focus on making system behavior explicit from state transitions
            and data models to failure modes and recovery paths. I value designs
            that are easy to reason about, observable in production, and resilient
            under real-world load.
          </p>

          <p>
            While my background is backend-heavy, I care deeply about end-to-end
            product delivery. I’ve built APIs, internal tools, and full-stack
            features that connect backend logic with clean, usable interfaces.
            Good systems aren’t just correct, they’re understandable to the
            people who build, operate, and rely on them.
          </p>

          <p>
            I’m especially interested in systems where correctness matters:
            payments, distributed workflows, and infrastructure that supports
            high-confidence decision making. In these environments, reliability
            isn’t a feature, it’s a baseline. A payment either moves or it does
            not, and the engineering work is about respecting that constraint
            while keeping latency predictable and recovery boring.
          </p>

          <p>
            Outside of day-to-day development, I enjoy writing and thinking about
            engineering tradeoffs, how systems fail, how teams scale, and how
            technical decisions intersect with product and business outcomes.
            I’m continuously refining how I build software by learning from
            production incidents, code reviews, and real customer feedback.
          </p>
        </div>
      </section>
    </Container>
  );
}