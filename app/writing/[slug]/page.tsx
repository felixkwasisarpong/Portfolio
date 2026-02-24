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
      <article className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <Link
            href="/writing"
            className="link-underline text-sm font-semibold text-slate-600"
          >
            ← Back to writing
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">Writing</p>
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            {post.frontmatter.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {post.frontmatter.date ? (
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                {post.frontmatter.date}
              </span>
            ) : null}
            {(post.frontmatter.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="pill px-3 py-1 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className="markdown fade-up fade-up-delay-1 mt-10 rounded-2xl border border-slate-200/70 bg-white/70 p-6 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.35)] sm:p-8"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </Container>
  );
}
