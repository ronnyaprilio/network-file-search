"use client"

import { signIn } from "next-auth/react"
import { useState, useEffect } from "react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""

  useEffect(() => {
    if (!siteKey) return
    const id = "recaptcha-v3"
    if (document.getElementById(id)) return
    const script = document.createElement("script")
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    script.id = id
    document.head.appendChild(script)
  }, [siteKey])

  const [error, setError] = useState<string | null>(null)

  const handleLogin = async () => {
    setError(null)
    if (!siteKey) {
      console.error("reCAPTCHA site key not set")
      return
    }
    const grecaptcha = (window as any).grecaptcha
    if (!grecaptcha) {
      console.error("grecaptcha not yet available")
      return
    }
    try {
      const token = await grecaptcha.execute(siteKey, { action: "login" })
      const result = await signIn("credentials", {
        username,
        password,
        recaptchaToken: token,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (result?.error) {
        if (result.error === "RATE_LIMIT") {
          setError("Too many attempts. Please wait a minute and try again.")
        } else {
          setError("Invalid username or password.")
        }
        return
      }

      if (result?.ok && result.url) {
        window.location.href = result.url
      }
    } catch (err) {
      console.error("reCAPTCHA execution failed", err)
      setError("Unable to complete login. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-100 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/50 border border-emerald-900/30 rounded-lg p-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Login</h1>

        <div className="space-y-4">
          <input
            placeholder="username"
            onChange={e => setUsername(e.target.value)}
            className="w-full bg-slate-800 border border-emerald-900/50 rounded-md px-3 py-2 text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-500"
          />

          <input
            type="password"
            placeholder="password"
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-slate-800 border border-emerald-900/50 rounded-md px-3 py-2 text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-emerald-500"
          />

          <button 
            onClick={handleLogin}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-mono py-2 rounded-md transition-colors"
          >
            Login
          </button>
        </div>

        {error && (
          <p className="text-red-400 mt-4 text-center">{error}</p>
        )}
      </div>
    </div>
  )
}