const HAS_TAGS = /<\/?[a-z][\s\S]*>/i;

function escapeText(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Blog content is HTML from the admin rich text editor (sanitized by the API).
 * Older posts hold plain text, which becomes escaped paragraphs here.
 */
export function toRichTextHtml(value: string | null | undefined): string {
  const input = (value ?? "").trim();
  if (!input) return "";
  if (HAS_TAGS.test(input)) return input;
  return input
    .split(/\r?\n\s*\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => `<p>${escapeText(block).replace(/\r?\n/g, "<br>")}</p>`)
    .join("");
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/**
 * Prepares article HTML for display: gives h2/h3 headings anchor ids, lists
 * them for an "On this page" menu, and estimates the reading time.
 */
export function prepareArticle(value: string | null | undefined): {
  html: string;
  headings: ArticleHeading[];
  readingMinutes: number;
} {
  const headings: ArticleHeading[] = [];
  const used = new Set<string>();
  const html = toRichTextHtml(value).replace(
    /<h([23])>([\s\S]*?)<\/h\1>/gi,
    (_match, level: string, inner: string) => {
      const text = decodeEntities(inner.replace(/<[^>]+>/g, "")).trim();
      const base = slugify(text) || "section";
      let id = base;
      for (let n = 2; used.has(id); n += 1) id = `${base}-${n}`;
      used.add(id);
      headings.push({ id, text, level: Number(level) as 2 | 3 });
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );
  const words = decodeEntities(html.replace(/<[^>]+>/g, " ")).split(/\s+/).filter(Boolean).length;
  return { html, headings, readingMinutes: Math.max(1, Math.round(words / 200)) };
}

/** Builds the public URL for a blog post: readable title + stable id. */
export function blogPostPath(post: { id: string | number; title: string }): string {
  const slug = slugify(post.title);
  return `/blogs/${slug ? `${slug}-` : ""}${post.id}`;
}

const UUID_AT_END = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

/** Extracts the post id from a `/blogs/[slug]` segment. */
export function blogIdFromSlug(slug: string): string | null {
  return UUID_AT_END.exec(slug)?.[1] ?? null;
}
