import { useContext, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../store/store'
import { AuthContext } from '../store/AuthProvider'
import CartItemRow from './ui/CartItemRow'
import CartSummaryRow from './ui/CartSummaryRow'
import Button from './ui/Button'

export default function CartDrawer() {
  const auth = useContext(AuthContext)
  const user = auth?.user

  const ctx = useContext(CartContext)
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const dispatch = ctx?.dispatch
  const subtotal = ctx?.subtotal || 0

  const count = ctx?.count || 0
  const totalItems = count || 0

  const lineItems = useMemo(() => {
    return (ctx?.cart || []).map((item) => {
      const priceNumber = Number(item.priceNumber) || 0
      const qty = Number(item.qty) || 0
      const lineTotal = qty * priceNumber
      return {
        ...item,
        qty,
        priceNumber,
        lineTotal,
      }
    })
  }, [ctx?.cart])

  if (!user) {
    return (
      <Button
        className="bb-btn-primary"
        onClick={() => navigate('/login')}
        aria-label="Login to use cart"
      >
        Cart
      </Button>
    )
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button className="bb-btn-primary" onClick={handleOpen} aria-haspopup="dialog" aria-expanded={open}>
        Cart ({totalItems})
      </Button>

      {/* overlay */}
      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-slate-900/40" onClick={handleClose} />

          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            className="absolute right-0 top-0 h-full w-full max-w-xl bg-gray-500 text-slate-900 shadow-2xl border-l border-slate-200"
          >
            <div className="p-5 flex items-center justify-between border-b border-slate-200">
              <div className="sr-only" aria-live="polite">
                Cart drawer {open ? 'opened' : 'closed'}.
              </div>

              <div>
                <div className="text-lg font-semibold text-slate-900">Your cart</div>
                <div className="text-sm text-slate-500">{totalItems} item(s)</div>
              </div>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>

            <div className="p-30 overflow-auto h-[calc(100%-140px)] bg-gray-500 mt-0 ">
              {lineItems.length === 0 ? (
                <div className="text-slate-500">Your cart is empty.</div>
              ) : (
                <div className="space-y-4">
                  {lineItems.map((item) => (
                    <CartItemRow
                      key={item.name}
                      name={item.name}
                      qty={item.qty}
                      unitPrice={item.priceNumber}
                      lineTotal={item.lineTotal}
                      image={item.image}
                      onDec={() => dispatch({ type: 'SET_QTY', name: item.name, qty: item.qty - 1 })}
                      onInc={() => dispatch({ type: 'SET_QTY', name: item.name, qty: item.qty + 1 })}
                      onRemove={() => dispatch({ type: 'REMOVE', name: item.name })}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 border-t border-slate-200 bg-gray-500">
              <CartSummaryRow label="Subtotal" value={`$${(subtotal || 0).toFixed(2)}`} />

              <Button
                className="mt-4 w-full disabled:opacity-60"
                disabled={lineItems.length === 0}
                onClick={() => {
                  setOpen(false)
                  navigate('/checkout')
                }}
              >
                Checkout
              </Button>

              <Button
                variant="secondary"
                className="mt-2 w-full disabled:opacity-60"
                disabled={lineItems.length === 0}
                onClick={() => dispatch({ type: 'CLEAR' })}
              >
                Clear cart
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  )
}

