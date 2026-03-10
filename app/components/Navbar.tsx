export default function Navbar() {
  return (
    <nav className="w-full border-b border-emerald-900/40 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

        <div className="flex items-center gap-3 font-mono text-emerald-400">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="tracking-wider">
            NETWORK<span className="text-emerald-700">://</span>FILE SEARCH
          </span>
        </div>

        <div className="text-xs font-mono text-emerald-600">
          VERSION: v.1.0 DEMO
        </div>

      </div>
    </nav>
  )
}