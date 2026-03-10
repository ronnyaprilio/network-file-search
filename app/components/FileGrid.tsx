"use client"

import { File } from "../types/Files"
import FileCard from "./FileCard"
import { useEffect, useState } from "react"

export default function FileGrid() {
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/files')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        setFiles(data.files || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching files:', err)
        setFiles([])
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="text-center text-emerald-400">Loading files...</div>
      </div>
    )
  }

  if (error || files.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8">
        <div className="mb-6 border-b border-emerald-900/30 pb-2">
          <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest">
            LATEST FILES
          </h2>
        </div>
        <div className="text-center text-emerald-600">No files</div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">

      <div className="mb-6 border-b border-emerald-900/30 pb-2">
        <h2 className="text-sm font-mono text-emerald-400 uppercase tracking-widest">
          LATEST FILES
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {files.map((file, index) => (
          <FileCard key={index} {...file} />
        ))}
      </div>

    </div>
  )
}