import { useMemo, useState } from 'react'
import { loadOrders } from '../utils/localStorageDb'

function formatMoney(n) {
  return `$${n.toFixed(2)}`
}

export default function Orders() {
  const [orders] = useState(() => loadOrders())


  const sorted = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }, [orders])

  return (
    <div className="bb-page">
      <div className="bb-container bb-section">
        <div className="mb-8">
          <h1 className="bb-page-title">Orders</h1>
          <p className="bb-page-subtitle">Stored in localStorage. Refresh to see latest.</p>

        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((o) => (
              <div key={o.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-blue-200 text-sm">Order</div>
                    <div className="text-xl font-semibold">{o.id}</div>
                    <div className="mt-2 text-sm text-slate-400">
                      {new Date(o.createdAt).toLocaleString()}
                    </div>
                    <div className="mt-2 text-sm text-slate-300">Customer: {o.customer?.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="text-xl font-semibold">{formatMoney(o.totals.total)}</div>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4 text-sm text-slate-300">
                  <div className="font-medium text-slate-200">Items</div>
                  <ul className="mt-2 space-y-2">
                    {o.items.map((i, idx) => (
                      <li key={idx} className="flex items-center justify-between gap-4">
                        <span>
                          {i.name} <span className="text-slate-400">× {i.qty}</span>
                        </span>
                        <span>{formatMoney(i.qty * i.unitPrice)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

