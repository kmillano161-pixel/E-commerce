import Home from '../components/Home'
import Shop from '../pages/Shop'
import Checkout from '../pages/Checkout'
import Orders from '../pages/Orders'
import About from '../pages/About'
import Register from '../pages/Register'
import Login from '../pages/Login'
import { createElement } from 'react'

export function buildRoutes({ products } = {}) {
  return {
    '/register': Register,
    '/login': Login,
    '/': Home,
    '/shop': () => createElement(Shop, { products }),
    '/checkout': Checkout,
    '/orders': Orders,
    '/about': About,
    
  }
}





