import { useMemo } from 'react'

function ColorSwatch({ name, from, to }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/50 backdrop-blur p-4">
      <div
        className="h-12 w-12 rounded-lg shadow-inner"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <div>
        <p className="text-sm font-semibold text-slate-800">{name}</p>
        <p className="text-xs text-slate-600">{from} → {to}</p>
      </div>
    </div>
  )
}

function TypeSpecimen({ label, className, children, note }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/60 p-4 backdrop-blur">
      <div className="flex items-baseline justify-between">
        <div className={`text-slate-900 ${className}`}>{children}</div>
        <span className="text-xs font-medium text-slate-500">{label}</span>
      </div>
      {note && <p className="mt-2 text-xs text-slate-600">{note}</p>}
    </div>
  )
}

function UIShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="rounded-xl border border-white/10 bg-white/70 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 mb-3">Buttons</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] shadow hover:opacity-95 transition">Primary</button>
          <button className="px-4 py-2 rounded-lg bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 transition">Secondary</button>
          <button className="px-4 py-2 rounded-lg bg-slate-900/90 text-white hover:bg-slate-900 transition">Dark</button>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/70 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 mb-3">Inputs</p>
        <div className="space-y-3">
          <input className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-200" placeholder="Write a compelling Instagram caption about…" />
          <div className="flex gap-2">
            <select className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-200">
              <option>Tone: Professional</option>
              <option>Playful</option>
              <option>Formal</option>
              <option>Casual</option>
            </select>
            <select className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-200">
              <option>Sentiment: Positive</option>
              <option>Neutral</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/70 p-5 backdrop-blur">
        <p className="text-xs font-medium text-slate-500 mb-3">Cards</p>
        <div className="grid grid-cols-1 gap-3">
          <div className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition">
            <p className="text-xs font-medium text-slate-500">Template</p>
            <p className="mt-1 font-semibold text-slate-900">Twitter Thread</p>
            <p className="mt-1 text-sm text-slate-600">Structured multi-tweet output with hooks, insights, and CTA.</p>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition">
            <p className="text-xs font-medium text-slate-500">Template</p>
            <p className="mt-1 font-semibold text-slate-900">Blog Post</p>
            <p className="mt-1 text-sm text-slate-600">Long-form outline-first flow with tone and length control.</p>
          </div>
        </div>
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
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#F5F3FF] via-[#EEF2FF] to-white">
      {/* Hero with Spline */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-60">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
        </div>
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 md:pb-16">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#2563EB]" />
                ContentForge — Visual Style System
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                Confident, minimal, future-forward
              </h1>
              <p className="mt-4 text-slate-600 md:text-lg">
                A crisp design language for fast content creation. Neutral surfaces, electric accents, and calm motion.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#palette" className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] shadow hover:opacity-95 transition">View Palette</a>
                <a href="#components" className="px-5 py-2.5 rounded-lg bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 transition">Components</a>
              </div>
            </div>
            <div className="relative aspect-square w-full">
              <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/40 shadow-2xl backdrop-blur overflow-hidden">
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
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Color Palette</h2>
        <p className="mt-2 text-slate-600">Neutrals for content canvas; luminous gradients for actions and highlights.</p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {palette.map((p) => (
            <ColorSwatch key={p.name} {...p} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Typography</h2>
        <p className="mt-2 text-slate-600">Inter for clarity and efficiency. Large, legible inputs and confident headings.</p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <TypeSpecimen label="Display / 48–60" className="text-4xl md:text-5xl font-extrabold tracking-tight">Generate content, faster</TypeSpecimen>
          <TypeSpecimen label="Heading / 28–32" className="text-2xl md:text-3xl font-bold">Tone, sentiment, and length in one place</TypeSpecimen>
          <TypeSpecimen label="Body / 16" className="text-base">Designed for speed with accessible contrast and predictable spacing.</TypeSpecimen>
          <TypeSpecimen label="Mono / Meta" className="font-mono text-sm">CHAR COUNT: 142 | VARIANTS: 3</TypeSpecimen>
        </div>
      </section>

      {/* Components */}
      <section id="components" className="mx-auto max-w-7xl px-6 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Core Components</h2>
        <p className="mt-2 text-slate-600">Reusable building blocks for the dashboard, generator, and library.</p>
        <div className="mt-6 space-y-6">
          <UIShowcase />
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-xl border border-white/10 bg-white/60 p-4 text-sm text-slate-600 backdrop-blur">
          <p>
            Motion guidance: keep animations subtle and purposeful. Use gradient auras on primary actions and skeleton loaders during AI generation.
          </p>
        </div>
      </footer>
    </div>
  )
}
