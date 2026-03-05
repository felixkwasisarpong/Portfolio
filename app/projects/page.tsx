import Link from "next/link";
import { Container } from "@/components/Container";
import { getContentList } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Selected fintech and distributed systems projects.",
};

export default function ProjectsPage() {
  const projects = getContentList("projects");

  return (
    <Container>
      <section className="kj-section mt-12 fade-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Works</p>
            <h1 className="section-title mt-3">Selected systems and engineering case studies.</h1>
            <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
              Backend platforms, fintech workflows, and reliability-focused builds. Each project page documents architecture, tradeoffs, and implementation details.
            </p>
          </div>
          <Link href="/contact" className="kj-arrow-link text-sm">
            Let&apos;s talk <span>→</span>
          </Link>
        </div>

        <div className="kj-list mt-8">
          {projects.map((project, index) => (
            <article key={project.slug} className={`kj-row fade-up fade-up-delay-${(index % 3) + 1}`}>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {project.frontmatter.date ? <span className="kj-meta">{project.frontmatter.date}</span> : null}
                  {(project.frontmatter.tags ?? []).slice(0, 4).map((tag) => (
                    <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-2xl leading-tight">
                  <Link href={`/projects/${project.slug}`} className="kj-title-link">
                    {project.frontmatter.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
                  {project.frontmatter.summary}
                </p>
                {project.frontmatter.github ? (
                  <a
                    href={project.frontmatter.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-muted transition hover:text-[var(--accent)]"
                  >
                    GitHub <span>↗</span>
                  </a>
                ) : null}
              </div>
              <div className="sm:pt-1">
                <Link href={`/projects/${project.slug}`} className="kj-arrow-link text-sm">
                  Read <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
