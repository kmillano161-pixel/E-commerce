export default function Badge({ children, tone = 'blue' }) {
  const cls =
    tone === 'blue'
      ? 'inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700'
      : tone === 'green'
        ? 'inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'
        : 'inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700'

  return <div className={cls}>{children}</div>
}

