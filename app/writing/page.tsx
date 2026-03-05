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
      <section className="kj-section mt-12 fade-up">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">{isWeeklyFilter ? "Weekly" : "Shelf"}</p>
            <h1 className="section-title mt-3">
              {isWeeklyFilter ? "Weekly AI x Fintech posts." : "Notes, essays, and weekly signals."}
            </h1>
            <p className="section-copy mt-3 max-w-3xl text-sm sm:text-base">
              {isWeeklyFilter
                ? "Source-backed weekly posts generated from public feeds and curated for AI + fintech signals."
                : "Writing on backend systems, fintech infrastructure, reliability, and agent tooling."}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-sm">
          <Link
            href="/writing"
            className={`rounded-full border px-3 py-1 font-medium transition ${
              !tagFilter
                ? "border-[var(--accent)] bg-[var(--accent)] text-[#08121f]"
                : "border-[var(--border)] bg-[var(--surface)] text-muted hover:border-[var(--accent)]"
            }`}
          >
            all
          </Link>
          <Link
            href="/writing?tag=Weekly"
            className={`rounded-full border px-3 py-1 font-medium transition ${
              isWeeklyFilter
                ? "border-[var(--accent)] bg-[var(--accent)] text-[#08121f]"
                : "border-[var(--border)] bg-[var(--surface)] text-muted hover:border-[var(--accent)]"
            }`}
          >
            weekly
          </Link>
          {tagFilter && !isWeeklyFilter ? (
            <span className="text-xs text-muted-light">
              Filter: <span className="font-semibold text-foreground">{tagFilter}</span>
            </span>
          ) : null}
        </div>

        <div className="kj-list mt-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <article key={post.slug} className={`kj-row fade-up fade-up-delay-${(index % 3) + 1}`}>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    {isWeeklyWritingPost(post) ? (
                      <span className="pill px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]">
                        Weekly
                      </span>
                    ) : null}
                    {post.frontmatter.date ? <span className="kj-meta">{post.frontmatter.date}</span> : null}
                  </div>
                  <h2 className="mt-2 text-2xl leading-tight">
                    <Link href={`/writing/${post.slug}`} className="kj-title-link">
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{post.frontmatter.summary}</p>
                  {(post.frontmatter.tags ?? []).length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.frontmatter.tags?.map((tag) => (
                        <span key={tag} className="pill px-2.5 py-1 text-[11px] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="sm:pt-1">
                  <Link href={`/writing/${post.slug}`} className="kj-arrow-link text-sm">
                    Read <span>→</span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="card p-5 text-sm text-muted">
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
