import { escapeRegex } from "../lib/search-helper";

export function highlight(text: string, query: string) {
  if (!query) return text;

  const safeQuery = escapeRegex(query);
  const regex = new RegExp(`(${safeQuery})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-emerald-700/40 text-emerald-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      part
    )
  );
}