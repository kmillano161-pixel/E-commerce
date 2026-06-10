import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadOrders } from '../utils/localStorageDb'

function formatMoney(n) {
  return `$${Number(n || 0).toFixed(2)}`
}

export default function OrdersHistoryDropdown({ open, onClose }) {
  const ref = useRef(null)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!open) return
    // always refresh from localStorage when opening
    setOrders(loadOrders())
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDocMouseDown = (e) => {
      const el = ref.current
      if (!el) return
      if (!el.contains(e.target)) onClose?.()
    }
    document.addEventListener('mousedown', onDocMouseDown)
    return () => document.removeEventListener('mousedown', onDocMouseDown)
  }, [open, onClose])

  const sorted = useMemo(() => {
    return [...(orders || [])].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [orders])

  if (!open) return null

  return (
    <div
      ref={ref}
      className="absolute right-0 mt-2 w-[360px] max-w-[calc(100vw-32px)] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-50"
      role="menu"
      aria-label="Order history"
    >
      <div className="px-4 py-3 border-b border-slate-200">
        <div className="text-sm font-semibold text-slate-900">Order history</div>
        <div className="text-xs text-slate-500">Latest purchases from localStorage</div>
      </div>

      {sorted.length === 0 ? (
        <div className="px-4 py-6 text-sm text-slate-500">No orders yet.</div>
      ) : (
        <div className="max-h-[360px] overflow-auto px-2 py-2">
          {sorted.slice(0, 10).map((o) => (
            <Link
              key={o.id}
              to="/orders"
              onClick={onClose}
              className="block px-3 py-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-500">{new Date(o.createdAt).toLocaleDateString()}</div>
                  <div className="font-semibold text-slate-900">{o.id}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {o.items?.length || 0} item(s)
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-900">{formatMoney(o?.totals?.total)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="px-4 py-3 border-t border-slate-200">
        <Link
          to="/orders"
          onClick={onClose}
          className="block text-center text-sm font-semibold text-blue-700 hover:underline"
        >
          View all orders
        </Link>
      </div>
    </div>
  )
}

