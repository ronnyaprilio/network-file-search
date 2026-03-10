export default function FileIcon({path}: {path: string}) {
  const ext = path.split(".").pop()?.toLowerCase()

  const base = "w-6 h-6"

  switch (ext) {
    case "pdf":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#DC2626"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">PDF</text>
        </svg>
      )

    case "txt":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#374151"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="#E5E7EB" fontFamily="monospace">TXT</text>
        </svg>
      )

    case "docx":
      return (
        <svg className={base} viewBox="0 0 24 24">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#2563EB"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">DOC</text>
        </svg>
      )

    case "pptx":
      return (
        <svg className={base} viewBox="0 0 24 24">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#EA580C"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">PPT</text>
        </svg>
      )

    case "xlsx":
      return (
        <svg className={base} viewBox="0 0 24 24">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#16A34A"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">XLS</text>
        </svg>
      )

    default:
      return (
        <svg className={base} viewBox="0 0 24 24">
          <rect x="3" y="2" width="18" height="20" rx="2" fill="#475569"/>
          <text x="12" y="15" fontSize="8" textAnchor="middle" fill="white" fontFamily="sans-serif">FILE</text>
        </svg>
      )
  }
}