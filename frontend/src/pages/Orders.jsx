import { useEffect, useMemo, useState } from 'react'
import Card from '../components/ui/Card'
import { loadOrders } from '../utils/localStorageDb'

function formatMoney(n) {
  return `$${Number(n || 0).toFixed(2)}`
}

export default function Orders() {
  const [orders, setOrders] = useState(() => loadOrders())

  // Update in real-time when localStorage changes (other tabs/windows) and on this tab.
  useEffect(() => {
    const refresh = () => setOrders(loadOrders())

    refresh() // initial load

    window.addEventListener('storage', (e) => {
      if (e.key === 'devstore_orders_v1') refresh()
    })

    // Also refresh right after this tab places an order (same tab won't fire `storage` event)
    const intervalId = window.setInterval(refresh, 1000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])


  const sorted = useMemo(() => {
    return [...(orders || [])].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [orders])

  return (
    <div className="bb-page">
      <div className="bb-container bb-section">
        <div className="mb-8">
          <h1 className="bb-page-title">Orders</h1>
          <p className="bb-page-subtitle">View your full order history (stored in localStorage).</p>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
            No orders yet.
          </div>
        ) : (
          <div className="space-y-4">
            {sorted.map((o) => (
              <Card key={o.id} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-blue-200 text-sm">Order</div>
                    <div className="text-xl font-semibold">{o.id}</div>
                    <div className="mt-2 text-sm text-slate-400">{new Date(o.createdAt).toLocaleString()}</div>
                    <div className="mt-2 text-sm text-slate-300">Customer: {o.customer?.name || '—'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Total</div>
                    <div className="text-xl font-semibold">{formatMoney(o?.totals?.total)}</div>
                    <div className="mt-2 text-xs text-slate-400">Status: {o.status || 'paid'}</div>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-slate-200">Items</div>
                    <div className="text-xs text-slate-400">{o.items?.length || 0} item(s)</div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {(o.items || []).map((i, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
                      >
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-slate-200 truncate">{i.name}</div>
                          <div className="text-xs text-slate-400">Qty: {i.qty}</div>
                        </div>
                        <div className="text-sm font-semibold text-slate-100">{formatMoney(i.qty * i.unitPrice)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


