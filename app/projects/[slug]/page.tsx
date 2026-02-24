import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getContentBySlug, getContentList } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getContentList("projects").map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getContentList("projects").find((item) => item.slug === slug);

  if (!project) {
    return {};
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug).catch(() => null);

  if (!project) {
    notFound();
  }

  return (
    <Container>
      <article className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <Link
            href="/projects"
            className="link-underline text-sm font-semibold text-slate-600"
          >
            ← Back to works
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Project</p>
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            {project.frontmatter.title}
          </h1>
          <p className="section-copy mt-4 max-w-3xl text-sm sm:text-base">
            {project.frontmatter.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.frontmatter.date ? (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {project.frontmatter.date}
              </span>
            ) : null}
            {project.frontmatter.github ? (
              <a
                href={project.frontmatter.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 transition hover:border-slate-300 hover:text-rose-700"
              >
                GitHub ↗
              </a>
            ) : null}
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
        </div>

        <div
          className="markdown fade-up fade-up-delay-1 mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.35)] sm:p-8"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </article>
    </Container>
  );
}
