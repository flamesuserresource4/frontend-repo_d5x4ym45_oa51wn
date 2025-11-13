import { useEffect, useMemo, useState } from 'react'
import Button from '../Button'
import Input from '../Input'

function useBackendBase() {
  const baseUrl = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '')
  return baseUrl || ''
}

export default function LibraryPanel() {
  const base = useBackendBase()
  const [limit, setLimit] = useState(24)
  const endpoint = base ? `${base}/api/recent?limit=${limit}` : `/api/recent?limit=${limit}`

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('newest') // newest | oldest | az | za

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(endpoint)
        if (!res.ok) throw new Error('Failed to load library')
        const data = await res.json()
        if (!mounted) return
        setItems(Array.isArray(data) ? data : [])
      } catch (e) {
        if (!mounted) return
        setError(e.message || 'Failed to load library')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [endpoint])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = items
    if (q) list = list.filter(it => (it.prompt || '').toLowerCase().includes(q))
    const byDate = (a, b) => {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0
      const db = b.created_at ? new Date(b.created_at).getTime() : 0
      return db - da
    }
    const byTitle = (a, b) => (a.prompt || '').localeCompare(b.prompt || '')

    if (sort === 'newest') list = [...list].sort(byDate)
    if (sort === 'oldest') list = [...list].sort((a, b) => -byDate(a, b))
    if (sort === 'az') list = [...list].sort(byTitle)
    if (sort === 'za') list = [...list].sort((a, b) => -byTitle(a, b))
    return list
  }, [items, search, sort])

  const alignedSelect = "w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus-visible:ring-4 transition border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-200/60 dark:focus-visible:ring-indigo-500/20"

  return (
    <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Your recent generations</p>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Library</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="flex-1">
            <Input placeholder="Search by prompt…" value={search} onChange={(e)=>setSearch(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full sm:w-auto">
            <select className={alignedSelect} value={sort} onChange={(e)=>setSort(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
            </select>
            <select className={alignedSelect} value={limit} onChange={(e)=>setLimit(parseInt(e.target.value))}>
              {[9, 12, 24, 36, 48].map(n => <option key={n} value={n}>{n} items</option>)}
            </select>
            <Button variant="primary" size="md">New</Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-300/60 bg-red-50/60 dark:border-red-800/50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <div className="aura-shimmer absolute inset-0 opacity-20" />
              <div className="h-3 w-16 bg-slate-200/70 dark:bg-slate-700/70 rounded mb-2 animate-pulse" />
              <div className="h-4 w-2/3 bg-slate-200/70 dark:bg-slate-700/70 rounded animate-pulse" />
            </div>
          ))
        ) : (
          filtered.map((it, idx) => {
            const colorFrom = ['#0EA5E9', '#6D28D9', '#F59E0B'][idx % 3]
            const colorTo = ['#6366F1', '#2563EB', '#EF4444'][idx % 3]
            const date = it.created_at ? new Date(it.created_at) : null
            const meta = date ? date.toLocaleString() : 'Recent'
            return (
              <div key={it.id || it.prompt + idx} className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 p-4 transition hover:shadow">
                <div className="absolute inset-0 opacity-[0.08]" style={{ background: `linear-gradient(135deg, ${colorFrom}, ${colorTo})` }} />
                <p className="relative text-xs font-medium text-slate-500 dark:text-slate-400">{meta}</p>
                <p className="relative mt-1 font-semibold text-slate-900 dark:text-slate-100 line-clamp-3">{it.prompt || 'Untitled'}</p>
                <div className="relative mt-3 flex items-center gap-2">
                  <Button as="button" size="sm" variant="ghost">Open</Button>
                  <Button as="button" size="sm" variant="outline">Duplicate</Button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {!loading && filtered.length === 0 && (
        <div className="mt-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 p-4 text-sm text-slate-600 dark:text-slate-400">
          No results. Try adjusting your search or sort.
        </div>
      )}
    </div>
  )
}
