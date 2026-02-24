import Link from "next/link";
import { Container } from "@/components/Container";
import { getContentList, hasTag, isWeeklyWritingPost } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description: "Writing on fintech, backend systems, and reliability.",
};

type PageProps = {
  searchParams?: Promise<{ tag?: string | string[] }>;
};

function getTagFilterValue(raw: string | string[] | undefined): string {
  if (Array.isArray(raw)) return raw[0] ?? "";
  return raw ?? "";
}

export default async function WritingPage({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const tagFilter = getTagFilterValue(resolvedSearchParams?.tag).trim();
  const posts = getContentList("writing");
  const isWeeklyFilter = tagFilter.toLowerCase() === "weekly";
  const filteredPosts = tagFilter
    ? posts.filter((post) => (isWeeklyFilter ? isWeeklyWritingPost(post) : hasTag(post, tagFilter)))
    : posts;

  return (
    <Container>
      <section className="panel mt-10 px-8 py-12 sm:px-12 sm:py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Writing</h1>
        <p className="mt-4 text-base text-slate-600">
          Notes on building reliable systems and financial infrastructure.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/writing"
            className={`rounded-full border px-3 py-1 font-medium transition ${
              !tagFilter
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            All posts
          </Link>
          <Link
            href="/writing?tag=Weekly"
            className={`rounded-full border px-3 py-1 font-medium transition ${
              isWeeklyFilter
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 text-slate-700 hover:border-slate-300"
            }`}
          >
            Weekly
          </Link>
          {tagFilter && !isWeeklyFilter ? (
            <span className="text-slate-500">
              Filtering by tag: <span className="font-medium text-slate-700">{tagFilter}</span>
            </span>
          ) : null}
        </div>
        <div className="mt-8 space-y-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
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
            ))
          ) : (
            <div className="card p-5 text-sm text-slate-600">
              {isWeeklyFilter
                ? "No weekly posts yet — check back Monday."
                : tagFilter
                  ? `No posts found for tag “${tagFilter}”.`
                  : "No posts yet."}
            </div>
          )}
        </div>
      </section>
    </Container>
  );
}
