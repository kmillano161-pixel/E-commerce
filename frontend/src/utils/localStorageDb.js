const ORDER_KEY = 'devstore_orders_v1'

export function loadOrders() {
  try {
    const raw = localStorage.getItem(ORDER_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrders(orders) {
  try {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders))
  } catch {
    // ignore
  }
}

export function createOrder({ customer, items, subtotal, tax, total }) {
  const orders = loadOrders()
  const id = `ORD-${Date.now().toString(36).toUpperCase()}`

  const order = {
    id,
    createdAt: new Date().toISOString(),
    customer,
    items,
    totals: { subtotal, tax, total },
    status: 'paid',
  }

  saveOrders([order, ...orders])
  return order
}

export function LoginUser(email, password) {
  try{
    const users = JSON.parse(localStorage.getItem('users')) || []
    const user = users.find(u => u.email === email && u.password === password)
    return user ? { success: true, user } : { success: false, message: 'Invalid credentials' }
  }
  catch {
    return { success: false, message: 'An error occurred while logging in' }
  }
}

export function RegisterUser(email, password) {
  try {
    const users = JSON.parse(localStorage.getItem('users')) || []
    if (users.some(u => u.email === email)) {
      return { success: false, message: 'Email already exists' }
    }
    const newUser = { email, password }
    localStorage.setItem('users', JSON.stringify([...users, newUser]))
    return { success: true, user: newUser }
  } catch {
    return { success: false, message: 'An error occurred while registering' }
  }
}
