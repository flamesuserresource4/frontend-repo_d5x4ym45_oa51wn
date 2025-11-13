import React from 'react'

const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition focus:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:pointer-events-none active:scale-[.99]"

const variants = {
  primary: "text-white bg-gradient-to-r from-[#6D28D9] to-[#2563EB] hover:opacity-95 focus-visible:ring-indigo-300/50 dark:focus-visible:ring-indigo-600/25",
  secondary: "bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 focus-visible:ring-slate-200/70 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800/80 dark:focus-visible:ring-slate-700/40",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent dark:text-slate-200 dark:hover:bg-slate-800",
  outline: "bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-50 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
}

const sizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-5 text-base"
}

export default function Button({
  as: As = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  leadingIcon: Leading,
  trailingIcon: Trailing,
  children,
  loading = false,
  ...props
}) {
  const content = (
    <>
      {loading && (
        <span className="h-4 w-4 inline-block rounded-full border-2 border-white/30 border-t-white animate-spin" />
      )}
      {!loading && Leading && <Leading className="h-4 w-4" />}
      <span className="truncate">{children}</span>
      {!loading && Trailing && <Trailing className="h-4 w-4" />}
    </>
  )

  return (
    <As className={[base, variants[variant], sizes[size], className].join(' ')} {...props}>
      {content}
    </As>
  )
}
