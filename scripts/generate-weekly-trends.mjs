import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HN_URL = "https://hn.algolia.com/api/v1/search?tags=front_page";
const ARXIV_AI_URL =
  "https://export.arxiv.org/api/query?search_query=cat:cs.AI&sortBy=submittedDate&sortOrder=descending&max_results=12";
const ARXIV_LG_URL =
  "https://export.arxiv.org/api/query?search_query=cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=12";
const MIT_AI_RSS_URL = "https://www.technologyreview.com/topic/artificial-intelligence/feed/";
const FINEXTRA_RSS_URL = "https://www.finextra.com/rss/finextra.xml";
const FINEXTRA_RSS_FALLBACK_URL = "https://www.finextra.com/rss/headlines.aspx";

const FETCH_TIMEOUT_MS = 15000;
const MAX_LINKS = 10;

const FINTECH_KEYWORDS = [
  "payment",
  "payments",
  "fraud",
  "risk",
  "kyc",
  "aml",
  "pci",
  "iso8583",
  "iso 8583",
  "iso20022",
  "iso 20022",
  "settlement",
  "reconciliation",
  "ledger",
  "card",
  "cards",
  "banking",
  "bank",
  "fintech",
  "compliance",
  "transaction",
  "transactions",
  "merchant",
  "chargeback",
];

const AI_KEYWORDS = [
  "agent",
  "agents",
  "agentic",
  "eval",
  "evaluation",
  "benchmark",
  "benchmarks",
  "guardrail",
  "guardrails",
  "inference",
  "rag",
  "reasoning",
  "llm",
  "llms",
  "model",
  "models",
  "embedding",
  "embeddings",
  "fine-tuning",
  "fine tuning",
  "tool use",
  "tooling",
  "prompt",
  "prompts",
];

const SIGNAL_BUCKETS = [
  {
    name: "Agents & tooling",
    keywords: ["agent", "agents", "agentic", "tool", "tooling", "workflow", "orchestration", "mcp"],
  },
  {
    name: "Model eval & reliability",
    keywords: ["eval", "evaluation", "benchmark", "guardrail", "guardrails", "safety", "reliability"],
  },
  {
    name: "Payments & rails",
    keywords: ["payment", "payments", "card", "cards", "settlement", "reconciliation", "rail", "rails", "iso20022", "iso8583"],
  },
  {
    name: "Risk & compliance",
    keywords: ["fraud", "risk", "kyc", "aml", "compliance", "audit", "regulation", "regulatory"],
  },
  {
    name: "Inference & efficiency",
    keywords: ["inference", "latency", "quantization", "optimization", "throughput", "efficient", "efficiency"],
  },
];

function nowUtcDate() {
  return new Date().toISOString().slice(0, 10);
}

function decodeXmlEntities(input = "") {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)));
}

function normalizeWhitespace(text = "") {
  return decodeXmlEntities(text).replace(/\s+/g, " ").trim();
}

function stripTags(text = "") {
  return normalizeWhitespace(text.replace(/<[^>]+>/g, " "));
}

function extractBlocks(xml, tag) {
  const regex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "gi");
  const blocks = [];
  let match;
  while ((match = regex.exec(xml)) !== null) {
    blocks.push(match[1]);
  }
  return blocks;
}

function extractTag(block, tag) {
  const regex = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = regex.exec(block);
  return match ? normalizeWhitespace(match[1]) : "";
}

function extractAtomLink(block) {
  const linkRegex = /<link\b([^>]+?)\/?>/gi;
  let match;
  let fallback = "";
  while ((match = linkRegex.exec(block)) !== null) {
    const attrs = match[1];
    const hrefMatch = /\bhref=["']([^"']+)["']/i.exec(attrs);
    if (!hrefMatch) continue;
    const relMatch = /\brel=["']([^"']+)["']/i.exec(attrs);
    const rel = relMatch ? relMatch[1].toLowerCase() : "";
    if (!fallback) fallback = hrefMatch[1];
    if (!rel || rel === "alternate") return hrefMatch[1];
  }
  return fallback;
}

function normalizeTitleKey(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeUrl(raw) {
  if (!raw) return "";
  try {
    const url = new URL(raw);
    url.hash = "";
    const removeParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "ref",
      "ref_src",
      "source",
      "fbclid",
      "gclid",
    ];
    for (const key of removeParams) {
      url.searchParams.delete(key);
    }
    const qs = url.searchParams.toString();
    url.search = qs ? `?${qs}` : "";
    return url.toString();
  } catch {
    return raw.trim();
  }
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "felix-portfolio-weekly-trends/1.0 (+https://github.com/felixkwasisarpong/Portfolio)",
      },
      signal: controller.signal,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchJson(url) {
  const text = await fetchText(url);
  return JSON.parse(text);
}

async function fetchTextWithFallback(urls) {
  let lastError;
  for (const url of urls) {
    try {
      return { url, text: await fetchText(url) };
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError ?? new Error("All fallback URLs failed");
}

function parseHnFrontPage(data) {
  const hits = Array.isArray(data?.hits) ? data.hits : [];
  return hits
    .map((hit) => {
      const title = normalizeWhitespace(hit.title || hit.story_title || "");
      if (!title) return null;
      const url = normalizeUrl(hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`);
      return {
        title,
        url,
        source: "Hacker News",
        publishedAt: hit.created_at || "",
        sourceRankHint: 5,
      };
    })
    .filter(Boolean);
}

function parseArxivAtom(xml, sourceLabel) {
  const entries = extractBlocks(xml, "entry");
  return entries
    .map((entry) => {
      const title = extractTag(entry, "title");
      const id = extractTag(entry, "id");
      const url = normalizeUrl(extractAtomLink(entry) || id);
      if (!title || !url) return null;
      return {
        title,
        url,
        source: sourceLabel,
        publishedAt: extractTag(entry, "published") || extractTag(entry, "updated") || "",
        sourceRankHint: 3,
      };
    })
    .filter(Boolean);
}

function parseRss(xml, sourceLabel) {
  const items = extractBlocks(xml, "item");
  return items
    .map((item) => {
      const title = stripTags(extractTag(item, "title"));
      const link = normalizeUrl(stripTags(extractTag(item, "link")));
      if (!title || !link) return null;
      return {
        title,
        url: link,
        source: sourceLabel,
        publishedAt: extractTag(item, "pubDate") || extractTag(item, "dc:date") || "",
        sourceRankHint: 2,
      };
    })
    .filter(Boolean);
}

function countMatches(text, keywords) {
  const lower = ` ${text.toLowerCase()} `;
  let count = 0;
  for (const keyword of keywords) {
    if (lower.includes(keyword.toLowerCase())) count += 1;
  }
  return count;
}

function scoreItem(item) {
  const title = item.title || "";
  const fintechMatches = countMatches(title, FINTECH_KEYWORDS);
  const aiMatches = countMatches(title, AI_KEYWORDS);
  let score = 0;

  score += item.sourceRankHint || 0;
  score += fintechMatches * 3;
  score += aiMatches * 2;
  if (fintechMatches > 0 && aiMatches > 0) score += 6;

  const ts = Date.parse(item.publishedAt || "");
  if (Number.isFinite(ts)) {
    const ageDays = (Date.now() - ts) / (1000 * 60 * 60 * 24);
    if (ageDays < 2) score += 2;
    else if (ageDays < 7) score += 1;
  }

  return {
    ...item,
    fintechMatches,
    aiMatches,
    score,
  };
}

function dedupeItems(items) {
  const byUrl = new Map();
  const byTitle = new Set();
  const output = [];

  for (const item of items) {
    const normalizedUrl = normalizeUrl(item.url);
    const normalizedTitle = normalizeTitleKey(item.title);
    if (!normalizedUrl || !normalizedTitle) continue;
    if (byUrl.has(normalizedUrl)) continue;
    if (byTitle.has(normalizedTitle)) continue;
    byUrl.set(normalizedUrl, true);
    byTitle.add(normalizedTitle);
    output.push({ ...item, url: normalizedUrl });
  }

  return output;
}

function sortRanked(items) {
  return [...items].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aTs = Date.parse(a.publishedAt || "") || 0;
    const bTs = Date.parse(b.publishedAt || "") || 0;
    if (bTs !== aTs) return bTs - aTs;
    return a.title.localeCompare(b.title);
  });
}

function buildSignals(items) {
  const signals = [];
  for (const bucket of SIGNAL_BUCKETS) {
    const matched = items.filter((item) => countMatches(item.title, bucket.keywords) > 0);
    if (matched.length === 0) continue;
    const sampleTitles = matched.slice(0, 3).map((x) => x.title);
    signals.push({
      name: bucket.name,
      count: matched.length,
      sampleTitles,
    });
  }
  return signals;
}

function renderMarkdown({ date, items, signals }) {
  const signalLines =
    signals.length > 0
      ? signals.map((signal) => {
          const samples = signal.sampleTitles.join("; ");
          return `- **${signal.name}** (${signal.count})${samples ? ` — ${samples}` : ""}`;
        })
      : ["- No strong keyword buckets were detected in the selected links this week."];

  const topLinkLines = items.map(
    (item) => `- **${item.title}** (${item.source}) — ${item.url}`,
  );

  return `---
title: "AI x Fintech Weekly — ${date}"
summary: "A weekly, source-backed digest of what’s trending across AI + fintech (auto-curated; no paid APIs)."
date: ${date}
tags: ["AI","Fintech","Payments","Agents","Weekly"]
---

## Signals this week

${signalLines.join("\n")}

## Top links (curated)

${topLinkLines.join("\n")}

## Notes on the ranking

- This post is auto-curated from public sources only (no LLMs, no paid APIs, no generated claims).
- Sources used this week:
  - Hacker News front page (Algolia API)
  - arXiv feeds for \`cs.AI\` and \`cs.LG\`
  - MIT Technology Review AI feed
  - Finextra RSS
- Ranking is title/link based only, using deterministic keyword heuristics:
  - fintech keyword boost (payments, fraud, risk, KYC/AML, settlement, reconciliation, ledger, etc.)
  - AI keyword boost (agents, eval, benchmark, guardrails, inference, RAG, etc.)
  - extra boost when both fintech and AI keywords appear in the same title
- Links are deduplicated by normalized URL and normalized title.
`;
}

async function collectItems() {
  const results = await Promise.allSettled([
    fetchJson(HN_URL).then((data) => ({ key: "hn", data })),
    fetchText(ARXIV_AI_URL).then((text) => ({ key: "arxiv-ai", text })),
    fetchText(ARXIV_LG_URL).then((text) => ({ key: "arxiv-lg", text })),
    fetchText(MIT_AI_RSS_URL).then((text) => ({ key: "mit", text })),
    fetchTextWithFallback([FINEXTRA_RSS_URL, FINEXTRA_RSS_FALLBACK_URL]).then(({ url, text }) => ({
      key: "finextra",
      url,
      text,
    })),
  ]);

  const raw = [];
  for (const result of results) {
    if (result.status === "rejected") {
      console.warn(`Warning: source fetch failed: ${result.reason?.message || result.reason}`);
      continue;
    }
    const payload = result.value;
    if (payload.key === "hn") raw.push(...parseHnFrontPage(payload.data));
    if (payload.key === "arxiv-ai") raw.push(...parseArxivAtom(payload.text, "arXiv cs.AI"));
    if (payload.key === "arxiv-lg") raw.push(...parseArxivAtom(payload.text, "arXiv cs.LG"));
    if (payload.key === "mit") raw.push(...parseRss(payload.text, "MIT Tech Review"));
    if (payload.key === "finextra") raw.push(...parseRss(payload.text, "Finextra"));
  }

  return dedupeItems(raw);
}

async function main() {
  const date = nowUtcDate();
  const items = await collectItems();
  if (items.length === 0) {
    throw new Error("No items were fetched from the configured public sources.");
  }

  const ranked = sortRanked(items.map(scoreItem));
  const selected = ranked.slice(0, Math.min(MAX_LINKS, ranked.length));
  const signals = buildSignals(selected);
  const markdown = renderMarkdown({ date, items: selected, signals });

  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const repoRoot = path.resolve(scriptDir, "..");
  const outDir = path.join(repoRoot, "content", "writing");
  const outPath = path.join(outDir, `${date}-ai-fintech-weekly.md`);

  await mkdir(outDir, { recursive: true });
  await writeFile(outPath, markdown, "utf8");

  console.log(`Wrote ${outPath}`);
  console.log(`Selected ${selected.length} links from ${items.length} normalized items.`);
}

main().catch((err) => {
  console.error(err?.stack || String(err));
  process.exitCode = 1;
});
