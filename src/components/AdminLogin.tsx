
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({ password }),
      })

      const data = await result.json()

      if (!result.ok) {
        setError(data.error || 'Authentication failed.')
        return
      }

      window.location.replace('/admin')
    } catch {
      setError('Unable to connect. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#101010] px-6 text-[#f3f0e9]">
      <div className="w-full max-w-md">
        <p className="text-xs tracking-[0.3em] text-[#e5232d]">
          PORTFOLIO CONTROL CENTER
        </p>

        <h1 className="mt-5 text-5xl font-bold tracking-tight">
          PKG / ADMIN<span className="text-[#e5232d]">.</span>
        </h1>

        <div className="mt-10 border border-white/10 bg-white/[0.02] p-7 md:p-9">
          <p className="text-xs tracking-[0.25em] text-[#d6ad54]">
            PRIVATE ACCESS
          </p>

          <h2 className="mt-4 text-2xl">Welcome back.</h2>

          <p className="mt-2 text-sm leading-6 text-white/45">
            Authenticate to access your portfolio management dashboard.
          </p>

          <form onSubmit={handleSubmit} className="mt-8">
            <label
              htmlFor="admin-password"
              className="mb-3 block text-xs uppercase tracking-widest text-white/60"
            >
              Admin password
            </label>

            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full border border-white/15 bg-black/40 px-4 py-4 text-sm outline-none transition focus:border-[#e5232d]"
              placeholder="Enter your password"
            />

            {error && (
              <p role="alert" className="mt-4 text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#e5232d] px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#bd1c25] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Access dashboard →'}
            </button>
          </form>
        </div>

        <Link
          to="/"
          className="mt-8 inline-block text-xs uppercase tracking-widest text-white/40 transition hover:text-white"
        >
          ← Return to portfolio
        </Link>
      </div>
    </main>
  )
}
