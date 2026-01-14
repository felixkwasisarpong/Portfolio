import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export type ContentFrontmatter = {
  title: string;
  summary?: string;
  date?: string;
  tags?: string[];
};

export type ContentListItem = {
  slug: string;
  frontmatter: ContentFrontmatter;
};

export type ContentItem = ContentListItem & {
  content: string;
  html: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function getContentDir(type: "projects" | "writing") {
  return path.join(CONTENT_ROOT, type);
}

function parseFrontmatter(filePath: string): { frontmatter: ContentFrontmatter; content: string } {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const dateValue = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;

  return {
    frontmatter: {
      title: data.title ?? "Untitled",
      summary: data.summary ?? "",
      date: typeof dateValue === "string" ? dateValue : "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    },
    content,
  };
}

export function getContentList(type: "projects" | "writing"): ContentListItem[] {
  const dir = getContentDir(type);
  const files = fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""))
    : [];

  const items = files.map((slug) => {
    const { frontmatter } = parseFrontmatter(path.join(dir, `${slug}.md`));
    return { slug, frontmatter };
  });

  return items.sort((a, b) => {
    const aDate = a.frontmatter.date ?? "";
    const bDate = b.frontmatter.date ?? "";
    return bDate.localeCompare(aDate);
  });
}

export async function getContentBySlug(
  type: "projects" | "writing",
  slug: string,
): Promise<ContentItem> {
  const dir = getContentDir(type);
  const { frontmatter, content } = parseFrontmatter(path.join(dir, `${slug}.md`));
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  return {
    slug,
    frontmatter,
    content,
    html: processed.toString(),
  };
}
