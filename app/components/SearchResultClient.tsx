"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { File } from "../types/Files";
import { escapeRegex } from "../lib/search-helper";
import FileIcon from "../components/FileIcon";

function getSnippet(content: string, query: string): string {
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

function highlight(text: string, query: string) {
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

export default function SearchResultClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (!initialQuery) return;

      setLoading(true);

      const res = await fetch(`/api/search?q=${encodeURIComponent(initialQuery)}`);
      const data = await res.json();

      setFiles(data.files || []);
      setLoading(false);
    }

    fetchResults();
  }, [initialQuery]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <main className="bg-slate-950 text-emerald-100 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      <Navbar />

      <div className="relative z-10 border-b border-emerald-900/30 py-6 px-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div onClick={() => router.push("/")} className="text-emerald-500 font-bold text-lg cursor-pointer whitespace-nowrap">
          DOCUMENT FILE SEARCH
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex items-center bg-slate-900 border border-emerald-900/40 rounded-full px-5 h-12 shadow-lg">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter file name or content..."
              className="flex-1 bg-transparent outline-none text-emerald-100 placeholder-emerald-700 font-mono"
            />

            <button type="submit" className="text-emerald-400 hover:text-emerald-300">
              🔍
            </button>
          </div>
        </form>
      </div>

      <div className="relative z-10 py-10 w-[90%] mr-6 ml-6">
        {loading && (
          <p className="text-emerald-500 font-mono">
            Searching...
          </p>
        )}

        {!loading && files.length === 0 && (
          <p className="text-emerald-600 font-mono">
            No results found for "{initialQuery}"
          </p>
        )}

        <div className="space-y-6">
          {!loading &&
            files.map((file, i) => {
              const snippet = getSnippet(file.content, initialQuery);

              return (
                <a
                  key={i}
                  href={file.path}
                  className="block p-5 rounded-xl border border-emerald-900/40 bg-slate-900/60 hover:bg-slate-900 hover:border-emerald-700/60 transition group shadow-lg"
                >
                  <div className="flex gap-4">
                    <div className="text-2xl mt-1">
                      <FileIcon path={file.path} />
                    </div>

                    <div className="flex-1 space-y-1">

                      <h2 className="text-lg text-emerald-400 group-hover:underline font-semibold">
                        {file.title}
                      </h2>

                      <p className="text-xs text-emerald-700 font-mono">
                        {file.path}
                      </p>

                      {snippet && (
                        <p className="text-sm text-emerald-300/80 leading-relaxed">
                          {highlight(snippet, initialQuery)}
                        </p>
                      )}

                      <div className="flex gap-4 text-xs text-emerald-600 font-mono pt-1">
                        <span>{file.size}</span>

                        <span>
                          {new Date(file.modified).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </main>
  );
}