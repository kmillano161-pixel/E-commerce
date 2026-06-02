import { useEffect, useReducer, useMemo } from 'react'
import { CartContext, cartReducer, loadCart, saveCart } from './store'

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [], () => loadCart())

  useEffect(() => {
    saveCart(cart)
  }, [cart])

  const value = useMemo(() => {
    const count = cart.reduce((sum, x) => sum + x.qty, 0)
    const subtotal = cart.reduce((sum, x) => sum + x.qty * x.priceNumber, 0)
    return { cart, dispatch, count, subtotal }
  }, [cart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

