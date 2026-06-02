import { Link } from 'react-router-dom'
import { useContext } from 'react'
import CartDrawer from './CartDrawer'
import { AuthContext } from '../store/AuthProvider'
import Button from './ui/Button'

function Navbar() {
  const auth = useContext(AuthContext)
  const user = auth?.user

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-slate-200">
      <div className="p-4">
        <nav className="bb-container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-lg font-semibold text-slate-900 hover:underline" aria-label="Go to homepage">
              DevStore
            </Link>
          </div>

          <ul className="hidden sm:flex items-center space-x-6 text-sm" aria-label="Primary navigation">
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/orders">
                Orders
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              className="hidden sm:inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              to="/orders"
            >
              Orders
            </Link>

            {!user ? (
              <>
                <Link
                  className="hidden sm:inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  to="/login"
                >
                  Login
                </Link>
                <Link
                  className="hidden md:inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  to="/register"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-700">{user.name}</span>
                <Button variant="secondary" className="px-3" onClick={() => auth?.logout?.()}>
                  Logout
                </Button>
              </div>
            )}

            <CartDrawer />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Navbar


