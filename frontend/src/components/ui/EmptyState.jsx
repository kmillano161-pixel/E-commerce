export default function EmptyState({ title = 'Nothing here yet', description = '' }) {
  return (
    <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
      <div className="text-sm font-semibold">{title}</div>
      {description ? <div className="mt-2 text-sm">{description}</div> : null}
    </div>
  )
}

