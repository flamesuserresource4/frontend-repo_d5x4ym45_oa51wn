import React from 'react'

const base = "w-full rounded-lg border bg-white dark:bg-slate-800 px-3 py-2 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus-visible:ring-4 transition"

const variants = {
  default: "border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-200/60 dark:focus-visible:ring-indigo-500/20",
  subtle: "border-slate-200/70 dark:border-slate-700/70 focus-visible:ring-slate-200/60 dark:focus-visible:ring-slate-700/20"
}

export default function Input({ variant = 'default', className = '', ...props }) {
  return <input className={[base, variants[variant], className].join(' ')} {...props} />
}
