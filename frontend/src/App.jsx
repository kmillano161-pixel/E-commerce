
import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import CartProvider from './store/CartProvider'
import Router from './routes/Router'
import { buildRoutes } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './store/AuthProvider'


function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products')
        const jsonData = await response.json()
        setProducts(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Router routes={buildRoutes({ products })} />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}


export default App







