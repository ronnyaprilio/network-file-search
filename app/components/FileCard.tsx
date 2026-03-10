import { File } from "../types/Files";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) {
    return "Less than 1h ago";
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else {
    return `${diffDays}d ago`;
  }
}

export default function FileCard({ title, path, size, modified }: File) {
  const fileUrl = path; // Since public/samples is served at /samples

  return (
    <a href={fileUrl} download={title} className="group block w-full bg-slate-900/50 border border-emerald-900/30 hover:border-emerald-500/50 rounded-lg p-4 transition-all hover:-translate-y-1">

      <div className="flex items-start justify-between gap-4">

        <div className="min-w-0 flex-1">

          <h3
            title={title}
            className="font-mono text-sm font-bold text-emerald-100 group-hover:text-emerald-400 truncate"
          >
            {title}
          </h3>

          <p
            title={path}
            className="text-xs text-emerald-600 truncate"
          >
            {path}
          </p>

        </div>

        <span className="text-[10px] text-emerald-700 font-mono whitespace-nowrap">
          {size}
        </span>

      </div>

      <div className="mt-3 flex items-center gap-2 text-xs text-emerald-600/70 font-mono">
        <span className="w-1 h-1 bg-emerald-700 rounded-full"></span>
        <span>MODIFIED: {formatTimeAgo(new Date(modified))}</span>
      </div>

    </a>
  )
}