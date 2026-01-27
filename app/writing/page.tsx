import Link from "next/link";
import { Container } from "@/components/Container";
import { getContentList } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description: "Writing on fintech, backend systems, and reliability.",
};

export default function WritingPage() {
  const posts = getContentList("writing");

  return (
    <Container>
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Writing</h1>
        <p className="mt-4 text-base text-slate-600">
          Notes on building reliable systems and financial infrastructure.
        </p>
        <div className="mt-8 space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="card p-5"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    <Link
                      href={`/writing/${post.slug}`}
                      className="transition hover:text-sky-600"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-slate-600">
                    {post.frontmatter.summary}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  {post.frontmatter.date}
                </span>
              </div>
              {post.frontmatter.tags?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.frontmatter.tags.map((tag) => (
                    <span
                      key={tag}
                      className="pill px-3 py-1 text-xs font-medium"
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
