import { notFound } from "next/navigation";
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
      <article className="py-12 sm:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
          Project
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          {project.frontmatter.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          {project.frontmatter.summary}
        </p>
        {project.frontmatter.github && (
  <a
    href={project.frontmatter.github}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-block text-sm font-semibold text-slate-700 transition hover:text-slate-900"
  >
    GitHub Repository →
  </a>
)}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="markdown mt-10 space-y-6"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
      </article>
    </Container>
  );
}
