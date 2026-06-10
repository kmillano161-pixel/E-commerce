import { useContext, useEffect, useMemo, useState } from 'react'

import { CartContext } from '../store/store'
import { createOrder } from '../utils/localStorageDb'

import Card from '../components/ui/Card'

function formatMoney(n) {
  return `$${n.toFixed(2)}`
}

export default function Checkout() {
  const ctx = useContext(CartContext)
  const { cart, dispatch, subtotal } = ctx || {}

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: 'NG',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  const items = useMemo(() => {
    const list = (cart || []).map((x) => ({
      name: x.name,
      qty: x.qty,
      priceNumber: x.priceNumber,
      lineTotal: x.qty * x.priceNumber,
    }))
    return list
  }, [cart])

  const tax = useMemo(() => {
    const s = subtotal || 0
    return s * 0.07
  }, [subtotal])

  const total = (subtotal || 0) + tax


  const canCheckout = items.length > 0

  // If the cart changes (e.g., user orders again), re-enable the form.
  // This prevents the "Place order" button staying disabled after a previous success.
  useEffect(() => {
    if (!canCheckout) setSuccess(null)
  }, [canCheckout])

  const onSubmit = (e) => {

    e.preventDefault()
    setError('')

    if (!canCheckout) {
      setError('Your cart is empty.')
      return
    }

    if (!customer.name.trim()) return setError('Name is required.' )
    if (!customer.email.trim() || !customer.email.includes('@')) return setError('Valid email is required.')
    if (!customer.address.trim()) return setError('Address is required.')
    if (!customer.city.trim()) return setError('City is required.')

    try {
      const order = createOrder({
        customer,
        items: items.map((i) => ({ name: i.name, qty: i.qty, unitPrice: i.priceNumber })),
        subtotal: subtotal || 0,
        tax,
        total,
      })

      dispatch?.({ type: 'CLEAR' })
      setSuccess(order)
    } catch (e) {
      console.error('Failed to place order:', e)
      setError('Could not place order. Please try again.')
    }
  }

  return (
    <div className="bb-page">
      <div className="bb-container bb-section" style={{ paddingTop: 40, paddingBottom: 40 }}>


        <div className="mb-8">
          <h1 className="bb-title">Checkout</h1>
          <p className="bb-subtitle text-sm">Complete your order. Data is saved to localStorage.</p>
        </div>


        {success ? (
          <Card className="p-6">
            <div className="text-sm text-blue-700 font-semibold">Order placed ✅</div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{success.id}</div>
            <div className="mt-2 text-slate-600">Total: ${success.totals.total.toFixed(2)}</div>
          </Card>
        ) : null}


        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 text-sm">
            {error}
          </div>
        ) : null}


        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 mt-6">
          <form onSubmit={onSubmit} className="lg:col-span-7">
            <Card className="p-6">
              <div className="text-lg font-semibold text-slate-900">Customer details</div>

              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  value={customer.name}
                  onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))}
                  placeholder="Full name"
                  className="bb-input"
                />
                <input
                  value={customer.email}
                  onChange={(e) => setCustomer((c) => ({ ...c, email: e.target.value }))}
                  placeholder="Email"
                  className="bb-input"
                />
                <input
                  value={customer.city}
                  onChange={(e) => setCustomer((c) => ({ ...c, city: e.target.value }))}
                  placeholder="City"
                  className="bb-input"
                />
                <input
                  value={customer.country}
                  onChange={(e) => setCustomer((c) => ({ ...c, country: e.target.value }))}
                  placeholder="Country"
                  className="bb-input"
                />
                <input
                  value={customer.address}
                  onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                  placeholder="Address"
                  className="sm:col-span-2 bb-input"
                />
              </div>


              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 disabled:opacity-60"
                disabled={!canCheckout || !!success}
              >
                Place order
              </button>
            </Card>
          </form>


          <div className="lg:col-span-5">
            <div className="bb-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">Order summary</div>
                  <div className="mt-1 text-sm text-slate-500">Review items before placing your order.</div>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {(items || []).map((i) => (
                  <div key={i.name} className="flex items-start justify-between gap-3 text-sm">
                    <div>
                      <div className="font-medium text-slate-800">{i.name}</div>
                      <div className="text-slate-500">Qty: {i.qty}</div>
                    </div>
                    <div className="font-medium text-slate-900">{formatMoney(i.lineTotal)}</div>
                  </div>
                ))}

                {items.length === 0 ? (
                  <div className="text-slate-500">Cart is empty.</div>
                ) : null}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-800">{formatMoney(subtotal || 0)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Tax (7%)</span>
                  <span className="font-medium text-slate-800">{formatMoney(tax)}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-base font-semibold text-slate-900">{formatMoney(total)}</span>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-500">
                Checkout is simulated. The order is stored in localStorage.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

