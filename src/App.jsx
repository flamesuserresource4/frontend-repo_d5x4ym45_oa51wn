import { useEffect, useMemo, useState } from 'react'

function useTheme() {
  const [theme, setTheme] = useState('system')

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored) setTheme(stored)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = (mode) => {
      const isDark = mode === 'dark' || (mode === 'system' && media.matches)
      root.classList.toggle('dark', isDark)
    }

    apply(theme)
    localStorage.setItem('theme', theme)

    const onChange = () => theme === 'system' && apply('system')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [theme])

  return { theme, setTheme }
}

function DarkModeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 px-1 py-1 text-xs shadow-sm backdrop-blur">
      {['light','system','dark'].map((m) => (
        <button
          key={m}
          onClick={() => setTheme(m)}
          className={`px-2 py-1 rounded-full transition text-slate-700 dark:text-slate-200 ${theme===m ? 'bg-slate-900/5 dark:bg-white/10 font-medium' : ''}`}
        >
          {m}
        </button>
      ))}
    </div>
  )
}

function ColorSwatch({ name, from, to }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/60 backdrop-blur p-4">
      <div
        className="h-12 w-12 rounded-lg shadow-inner"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{name}</p>
        <p className="text-xs text-slate-600 dark:text-slate-400">{from} → {to}</p>
      </div>
    </div>
  )
}

function TypeSpecimen({ label, className, children, note }) {
  return (
    <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/60 p-4 backdrop-blur">
      <div className="flex items-baseline justify-between">
        <div className={`text-slate-900 dark:text-slate-100 ${className}`}>{children}</div>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      </div>
      {note && <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{note}</p>}
    </div>
  )
}

function UIShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">Buttons</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] shadow hover:opacity-95 active:scale-[.99] transition">
            Primary
          </button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 active:scale-[.99] transition dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/80">
            Secondary
          </button>
          <button className="px-4 py-2 rounded-lg bg-slate-900/90 text-white hover:bg-slate-900 active:scale-[.99] transition dark:bg-slate-700 dark:hover:bg-slate-600">
            Dark
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">Inputs</p>
        <div className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200/60 dark:focus:ring-indigo-500/20" placeholder="Write a compelling Instagram caption about…" />
          <div className="flex gap-2">
            <select className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-200/60 dark:focus:ring-indigo-500/20">
              <option>Tone: Professional</option>
              <option>Playful</option>
              <option>Formal</option>
              <option>Casual</option>
            </select>
            <select className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-200/60 dark:focus:ring-indigo-500/20">
              <option>Sentiment: Positive</option>
              <option>Neutral</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">Cards</p>
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Template</p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">Twitter Thread</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Structured multi-tweet output with hooks, insights, and CTA.</p>
          </div>
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Template</p>
            <p className="mt-1 font-semibold text-slate-900 dark:text-slate-100">Blog Post</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Long-form outline-first flow with tone and length control.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function LibraryPreview() {
  const items = [
    { title: 'Product Launch Tweet', tag: 'Twitter', colorFrom: '#0EA5E9', colorTo: '#6366F1' },
    { title: 'Feature Update Email', tag: 'Email', colorFrom: '#6D28D9', colorTo: '#2563EB' },
    { title: 'SEO Blog Outline', tag: 'Blog', colorFrom: '#F59E0B', colorTo: '#EF4444' },
  ]
  return (
    <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/70 dark:bg-slate-900/60 p-5 backdrop-blur">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Content Library</p>
        <button className="text-xs px-3 py-1.5 rounded-md text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] hover:opacity-95 transition">New</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.title} className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 p-4 transition hover:shadow">
            <div className="absolute inset-0 opacity-[0.08]" style={{ background: `linear-gradient(135deg, ${it.colorFrom}, ${it.colorTo})` }} />
            <p className="relative text-xs font-medium text-slate-500 dark:text-slate-400">{it.tag}</p>
            <p className="relative mt-1 font-semibold text-slate-900 dark:text-slate-100">{it.title}</p>
            <button className="relative mt-3 text-xs text-indigo-600 dark:text-indigo-300 group-hover:underline">Open</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const palette = useMemo(
    () => [
      { name: 'Aura Primary', from: '#6D28D9', to: '#2563EB' },
      { name: 'Accent Glow', from: '#F59E0B', to: '#EF4444' },
      { name: 'Cool Depth', from: '#0EA5E9', to: '#6366F1' },
    ],
    []
  )

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5F3FF] via-[#EEF2FF] to-white dark:from-[#0B1020] dark:via-[#0F172A] dark:to-[#0B1020]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 backdrop-blur bg-white/60 dark:bg-slate-900/50 border-b border-slate-200/70 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#2563EB]" />
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">ContentForge</span>
          </div>
          <DarkModeToggle />
        </div>
      </div>

      {/* Hero with Spline */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white dark:via-slate-900/40 dark:to-slate-950" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-12 pb-10 md:pb-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 dark:border-indigo-800/40 bg-white/70 dark:bg-slate-900/60 px-3 py-1 text-xs text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#2563EB]" />
                Visual Style System
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Confident, minimal, future-forward
              </h1>
              <p className="mt-4 text-slate-600 md:text-lg dark:text-slate-300">
                A crisp design language for fast content creation. Neutral surfaces, electric accents, and calm motion.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#palette" className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] shadow hover:opacity-95 active:scale-[.99] transition">View Palette</a>
                <a href="#components" className="px-5 py-2.5 rounded-lg bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 active:scale-[.99] transition dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/80">Components</a>
              </div>
            </div>
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 rounded-3xl border border-slate-200/70 dark:border-slate-700/70 bg-white/40 dark:bg-slate-900/50 shadow-2xl backdrop-blur overflow-hidden">
                <iframe
                  title="Spline Aura"
                  src="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode"
                  className="h-full w-full"
                  frameBorder="0"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Palette */}
      <section id="palette" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Color Palette</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Neutrals for the content canvas; luminous gradients for actions and highlights.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palette.map((p) => (
            <ColorSwatch key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Typography</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Inter for clarity and efficiency. Large, legible inputs and confident headings.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TypeSpecimen label="Display / 48–60" className="text-4xl md:text-5xl font-extrabold tracking-tight">Generate content, faster</TypeSpecimen>
          <TypeSpecimen label="Heading / 28–32" className="text-2xl md:text-3xl font-bold">Tone, sentiment, and length in one place</TypeSpecimen>
          <TypeSpecimen label="Body / 16" className="text-base">Designed for speed with accessible contrast and predictable spacing.</TypeSpecimen>
          <TypeSpecimen label="Mono / Meta" className="font-mono text-sm">CHAR COUNT: 142 | VARIANTS: 3</TypeSpecimen>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Core Components</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Reusable building blocks for the dashboard, generator, and library.</p>
        <div className="mt-6 space-y-6">
          <UIShowcase />
          <LibraryPreview />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-white/60 dark:bg-slate-900/60 p-4 text-sm text-slate-600 dark:text-slate-400 backdrop-blur">
          <p>
            Motion: subtle, purposeful. Use gradient auras on primary actions and skeleton loaders during AI generation. Target WCAG AA contrast for text and key surfaces.
          </p>
        </div>
      </footer>
    </div>
  )
}
