"use client";

export default function LoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-emerald-100">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500 border-solid mb-6"></div>
      <p className="text-emerald-400 font-mono text-lg">Loading…</p>
    </div>
  );
}