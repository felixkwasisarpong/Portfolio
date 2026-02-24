import { notFound } from "next/navigation";
import Link from "next/link";
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

  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
  };
}

export default async function WritingPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getContentBySlug("writing", slug).catch(() => null);

  if (!post) notFound();

  return (
    <Container>
      <article className="kj-section mt-12 fade-up">
        <Link href="/writing" className="link-underline text-sm font-semibold text-slate-600">
          ← Back to shelf
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="accent-rule" />
          <p className="section-kicker">Writing</p>
        </div>

        <h1 className="mt-4 max-w-4xl text-3xl font-semibold leading-[0.95] tracking-[-0.04em] text-slate-950 sm:text-5xl">
          {post.frontmatter.title}
        </h1>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {post.frontmatter.date ? <span className="kj-meta">{post.frontmatter.date}</span> : null}
          {(post.frontmatter.tags ?? []).map((tag) => (
            <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
              {tag}
            </span>
          ))}
        </div>

        <div
          className="markdown mt-10 rounded-xl border border-slate-200 bg-white p-6 sm:p-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Container>
  );
}
