import { Navigate, Route, Routes } from 'react-router-dom'
import NotFound from '../utils/NotFound'

function renderRoute(routes, key, fallback) {
  const value = routes?.[key]
  if (!value) return fallback
  return typeof value === 'function' ? value() : value
}

export default function Router({ routes }) {
  return (
    <Routes>
      <Route path="/" element={renderRoute(routes, '/', <NotFound />)} />
      <Route path="/shop" element={renderRoute(routes, '/shop', <NotFound />)} />
      <Route path="/checkout" element={renderRoute(routes, '/checkout', <NotFound />)} />
      <Route path="/orders" element={renderRoute(routes, '/orders', <NotFound />)} />
      <Route path="/about" element={renderRoute(routes, '/about', <NotFound />)} />
      <Route path="/login" element={renderRoute(routes, '/login', <NotFound />)} />
      <Route path="/register" element={renderRoute(routes, '/register', <NotFound />)} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}










