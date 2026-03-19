"use client";

import { useRouter } from "next/navigation";
import { useState, KeyboardEvent, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSearch() {
    const q = query.trim();
    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="w-full max-w-3xl text-center space-y-8">

      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
          <span className="text-emerald-500">DOCUMENT FILE SEARCH</span>
        </h1>

        <p className="hidden md:block text-emerald-600/80 font-mono text-sm md:text-base">
          Lightweight Access Network Document File Search
        </p>
      </div>

      <div className="relative group">

        <div className="absolute -inset-0.5 bg-linear-to-r from-emerald-600 to-teal-600 rounded-lg blur opacity-30 group-hover:opacity-75 transition duration-500"></div>

        <div className="relative flex items-center bg-slate-900 rounded-lg border border-emerald-900/50 shadow-2xl">

          <div className="pl-4 pr-2 text-emerald-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isMobile 
              ? "Search..." 
              : "Enter File name or content..."
            }
            className={`
              w-full
              bg-transparent
              border-none
              text-emerald-100
              placeholder-emerald-700/50
              font-mono
              text-lg
              focus:ring-0
              focus:outline-none
              h-14
            `}
          />

          <div className="pr-4">
            <button
              onClick={handleSearch}
              className={`
                bg-emerald-600
                hover:bg-emerald-500
                text-white
                font-mono
                text-sm
                px-4 sm:px-6
                py-2
                rounded-md
                transition-colors
                border border-emerald-400/30
                shadow-[0_0_15px_rgba(16,185,129,0.3)]
              `}
            >
              SEARCH
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}