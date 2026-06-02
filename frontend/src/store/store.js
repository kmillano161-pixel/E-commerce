const STORAGE_KEY = 'devstore_cart_v1'

import { createContext } from 'react'


export function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveCart(cart) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // ignore
  }
}

export const CartContext = createContext(null)

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const item = action.item
      const existing = state.find((x) => x.name === item.name)
      if (existing) {
        return state.map((x) => (x.name === item.name ? { ...x, qty: x.qty + 1 } : x))
      }
      return [...state, { ...item, qty: 1 }]
    }
    case 'REMOVE': {
      const name = action.name
      return state.filter((x) => x.name !== name)
    }
    case 'SET_QTY': {
      const name = action.name
      const qty = action.qty
      if (qty <= 0) return state.filter((x) => x.name !== name)
      return state.map((x) => (x.name === name ? { ...x, qty } : x))
    }
    case 'CLEAR':
      return []
    default:
      return state
  }
}

