import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { getContentBySlug, getContentList } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getContentList("writing").map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getContentList("writing").find((item) => item.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getContentBySlug("writing", slug).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <Container>
      <article className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <p className="eyebrow">Writing</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">
          {post.frontmatter.title}
        </h1>
        <p className="mt-3 text-sm text-slate-600">{post.frontmatter.date}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {post.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="pill px-3 py-1 text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <div
          className="markdown mt-10 space-y-6"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Container>
  );
}
