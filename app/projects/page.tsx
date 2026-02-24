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
      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Works</p>
          </div>
          <h1 className="section-title mt-4">Selected systems and engineering case studies.</h1>
          <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
            Backend platforms, fintech workflows, and reliability-focused builds. Each
            project page documents tradeoffs, architecture, and implementation details.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="card fade-up p-5"
            >
              <div className="flex h-full flex-col">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold text-slate-900">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-amber-300 align-middle" />
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition hover:text-rose-700"
                    >
                      {project.frontmatter.title}
                    </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {project.frontmatter.summary}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {project.frontmatter.date}
                  </span>
                </div>

                {project.frontmatter.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.frontmatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="pill px-3 py-1 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="font-semibold text-slate-700 transition hover:text-slate-900"
                  >
                    Read case study →
                  </Link>
                  {project.frontmatter.github ? (
                    <a
                      href={project.frontmatter.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 transition hover:text-rose-700"
                    >
                      GitHub ↗
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
