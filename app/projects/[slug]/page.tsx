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

  if (!project) return {};

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getContentBySlug("projects", slug).catch(() => null);

  if (!project) notFound();

  return (
    <Container>
      <article className="kj-section mt-12 fade-up">
        <Link href="/projects" className="link-underline text-sm font-semibold text-slate-600">
          ← Back to works
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="accent-rule" />
          <p className="section-kicker">Project</p>
        </div>

        <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl">
          {project.frontmatter.title}
        </h1>
        <p className="section-copy mt-4 max-w-3xl text-sm sm:text-base">{project.frontmatter.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.frontmatter.date ? <span className="kj-meta">{project.frontmatter.date}</span> : null}
          {(project.frontmatter.tags ?? []).map((tag) => (
            <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
              {tag}
            </span>
          ))}
          {project.frontmatter.github ? (
            <a
              href={project.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-[#e45447]"
            >
              GitHub <span>↗</span>
            </a>
          ) : null}
        </div>

        <div
          className="markdown mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </article>
    </Container>
  );
}
