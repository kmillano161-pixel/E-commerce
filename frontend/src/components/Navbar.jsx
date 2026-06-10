import { Link } from 'react-router-dom'
import { useContext, useMemo, useState } from 'react'
import CartDrawer from './CartDrawer'
import { AuthContext } from '../store/AuthProvider'
import Button from './ui/Button'
import OrdersHistoryDropdown from './OrdersHistoryDropdown'

function Icon({ children }) {
  return <span className="inline-flex items-center justify-center">{children}</span>
}

function Navbar() {
  const auth = useContext(AuthContext)
  const user = auth?.user
  const [profileOpen, setProfileOpen] = useState(false)

  const profileLabel = useMemo(() => {
    return user?.name ? user.name : 'Profile'
  }, [user])

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/90 border-b border-slate-200">
      <div className="p-4">
        <nav className="bb-container flex flex-col gap-3">
          {/* Row 1: logo + profile/search/cart */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-lg font-semibold text-slate-900 hover:underline inline-flex items-center gap-2"
                aria-label="Go to homepage"
              >
                <Icon>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7" />
                    <path d="M9 22V12h6v10" />
                  </svg>
                </Icon>
                DevStore
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Profile */}
              {!user ? (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    className="inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
                    to="/login"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21V7" />
                      <path d="M7 21H3V3h4" />
                      <path d="M21 7a2 2 0 0 0-2-2H7" />
                      <path d="M12 11l-3-3 3-3" />
                      <path d="M9 8h6" />
                    </svg>
                    Login
                  </Link>
                  <Link
                    className="hidden md:inline-flex rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 inline-flex items-center gap-2"
                    to="/register"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                    Register
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {profileLabel}
                  </button>

                  <OrdersHistoryDropdown open={profileOpen} onClose={() => setProfileOpen(false)} />

                  <Button variant="secondary" className="px-3" onClick={() => auth?.logout?.()}>
                    Logout
                  </Button>
                </div>
              )}

              {/* Search */}
              <form
                className="flex items-center gap-2"
                onSubmit={(e) => {

                  e.preventDefault()
                  const fd = new FormData(e.currentTarget)
                  const q = (fd.get('q') || '').toString().trim()
                  try {
                    window.sessionStorage.setItem('shopQuery', q)
                  } catch {
                    // ignore
                  }
                  window.location.assign('/shop')
                }}
              >
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.3-4.3" />
                    </svg>
                  </span>
                  <input
                    name="q"
                    placeholder="Search"
                    className="w-[240px] rounded-xl border border-slate-200 bg-white px-9 py-2 text-sm font-medium text-slate-700 placeholder:text-slate-400 outline-none focus:border-blue-500/50"
                    aria-label="Search"
                    defaultValue={''}
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Go
                </button>
              </form>

              {/* Cart */}
              <CartDrawer />
            </div>
          </div>

          {/* Row 2: categories */}
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm" aria-label="Category navigation">
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/shop">Shop</Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/about">About</Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/orders">Orders</Link>
            </li>
            <li>
              <Link className="text-slate-600 hover:text-slate-900 hover:underline" to="/checkout">Checkout</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Navbar


