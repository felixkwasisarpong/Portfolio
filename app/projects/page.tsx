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
      <section className="py-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Projects</h1>
        <p className="mt-4 text-base text-slate-600">
          Case studies and engineering notes from systems I have built or led.
        </p>
        <div className="mt-8 space-y-6">
          {projects.map((project) => (
            <article
              key={project.slug}
              className="rounded-lg border border-slate-200 p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="transition hover:text-slate-700"
                    >
                      {project.frontmatter.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {project.frontmatter.summary}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {project.frontmatter.date}
                </span>
              </div>
              {project.frontmatter.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
