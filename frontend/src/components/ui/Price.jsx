export default function Price({ amount, className = '' }) {
  return <div className={`text-sm font-semibold text-slate-900 ${className}`.trim()}>{amount}</div>
}

