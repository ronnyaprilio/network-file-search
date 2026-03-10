export function escapeRegex(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getSnippet(content: string, query: string): string {
  if (!content) return "";

  const clean = content.replace(/\s+/g, " ");
  const lower = clean.toLowerCase();
  const q = query.toLowerCase();

  const index = lower.indexOf(q);

  if (index === -1) {
    return clean.slice(0, 180) + "...";
  }

  const start = Math.max(0, index - 80);
  const end = Math.min(clean.length, index + 100);

  let snippet = clean.slice(start, end);

  if (start > 0) snippet = "..." + snippet;
  if (end < clean.length) snippet = snippet + "...";

  return snippet;
}