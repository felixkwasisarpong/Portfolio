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
      <section className="panel mt-10 px-8 py-10 sm:px-12 sm:py-12">
        <div className="fade-up">
          <div className="flex items-center gap-3">
            <span className="accent-rule" />
            <p className="section-kicker">{isWeeklyFilter ? "Weekly" : "Writing"}</p>
          </div>
          <h1 className="section-title mt-4">
            {isWeeklyFilter ? "Weekly AI x Fintech digests." : "Notes, essays, and engineering write-ups."}
          </h1>
          <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
            {isWeeklyFilter
              ? "Source-backed weekly posts generated from public feeds and curated for AI + fintech signals."
              : "Writing on backend systems, fintech infrastructure, agent tooling, and reliability."}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
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

        <div className="mt-8 space-y-5">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article
                key={post.slug}
                className="card fade-up p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      {isWeeklyWritingPost(post) ? (
                        <span className="rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-700">
                          Weekly
                        </span>
                      ) : null}
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      <Link
                        href={`/writing/${post.slug}`}
                        className="transition hover:text-rose-700"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {post.frontmatter.summary}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                    {post.frontmatter.date}
                  </span>
                </div>
                {post.frontmatter.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
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
