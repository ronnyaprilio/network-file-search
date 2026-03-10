"use client"

import { useState } from "react"

export default function SyncButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSync = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('dashboard/api/files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        setMessage(data.message || 'Files synced successfully!')
      } else {
        setMessage(data.error || 'Failed to sync files')
      }
    } catch (error) {
      setMessage('Error syncing files')
      console.error('Sync error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleSync}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-mono py-2 px-4 rounded-md transition-colors"
      >
        {loading ? 'Syncing...' : 'Sync Files'}
      </button>
      {message && (
        <p className="text-sm text-emerald-400 font-mono">{message}</p>
      )}
    </div>
  )
}