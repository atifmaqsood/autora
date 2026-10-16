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

/** Builds the public URL for a blog post: readable title + stable id. */
export function blogPostPath(post: { id: string | number; title: string }): string {
  const slug = post.title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return `/blogs/${slug ? `${slug}-` : ""}${post.id}`;
}

const UUID_AT_END = /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;

/** Extracts the post id from a `/blogs/[slug]` segment. */
export function blogIdFromSlug(slug: string): string | null {
  return UUID_AT_END.exec(slug)?.[1] ?? null;
}
