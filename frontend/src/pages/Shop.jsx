import { useMemo, useState, useContext, useEffect } from 'react'
import { AuthContext } from '../store/AuthProvider'
import { useNavigate } from 'react-router-dom'

import ecommerce from '../assets/ecomerce.png'

import { categories } from '../data/catalog'
import { CartContext } from '../store/store'

function mapApiProductToAppProduct(p) {
  // fakestoreapi.com categories are like: "electronics", "jewelery", "men's clothing", "women's clothing"
  // UI categories in this app are: electronics, fashion

  // We map API -> UI categories so the category filter works.
  const apiToUiCategory = {
    electronics: 'electronics',
    jewelery: 'fashion',
    "men's clothing": 'fashion',
    "women's clothing": 'fashion',
    home: 'home',
  }

  const uiCategory = apiToUiCategory[p.category] || 'all'

  return {
    id: p.id,
    name: p.title,
    priceNumber: Number(p.price) || 0,
    price: `$${(Number(p.price) || 0).toFixed(2)}`,
    image: p.image || ecommerce,
    tag: uiCategory,
    category: uiCategory,
  }
}


export default function Shop({ products: apiProducts }) {
  const auth = useContext(AuthContext)
  const user = auth?.user

  const ctx = useContext(CartContext)
  const { dispatch } = ctx || {}

  const navigate = useNavigate()


  const [selectedCategory, setSelectedCategory] = useState(() => {
    // Allow Home category cards to pre-select a category
    try {
      const v = window.sessionStorage.getItem('shopCategory')
      return v || 'all'
    } catch {
      return 'all'
    }
  })


  const [query, setQuery] = useState(() => {
    try {
      return window.sessionStorage.getItem('shopQuery') || ''
    } catch {
      return ''
    }
  })

  useEffect(() => {
    // clear after first load so it doesn't keep forcing search when navigating back
    try {
      window.sessionStorage.removeItem('shopQuery')
    } catch {
      // ignore
    }
  }, [])

  const q = query.trim().toLowerCase()

  const [sort, setSort] = useState('featured')

  const products = useMemo(() => {
    const safeList = (apiProducts || []).map(mapApiProductToAppProduct)

    let list = safeList
    if (selectedCategory && selectedCategory !== 'all') {
      list = safeList.filter((p) => p.category === selectedCategory)
    }


    if (q) {
      list = list.filter((p) => p.name.toLowerCase().includes(q))
    }

    if (sort === 'price_asc') list = [...list].sort((a, b) => a.priceNumber - b.priceNumber)
    if (sort === 'price_desc') list = [...list].sort((a, b) => b.priceNumber - a.priceNumber)

    return list
  }, [selectedCategory, query, sort])

  const addToCart = (p) => {
    if (!user) {
      navigate('/login')
      return
    }
    if (!dispatch) return
    dispatch({
      type: 'ADD',
      item: {
        name: p.name,
        price: p.price,
        priceNumber: p.priceNumber,
        image: ecommerce,
      },
    })
  }


  return (
    <div className="bb-page">
      <div className="bb-container py-10">
        <div className="mb-8">
          <h1 className="bb-title">Shop</h1>
          <p className="bb-subtitle text-sm">Browse our best sellers. Add to cart to see it in the cart drawer.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <div className="bb-card p-5">
              <div className="text-sm font-semibold">Categories</div>
              <div className="mt-4 grid grid-cols-1 gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selectedCategory === 'all'
                      ? 'border-blue-500/50 bg-blue-500/15 text-blue-700'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setSelectedCategory(category.key)}
                    className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                      selectedCategory === category.key
                      ? 'border-blue-500/50 bg-blue-500/15 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <div className="text-sm font-semibold">Search</div>
                <div className="relative">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                    placeholder="Search products"
                    className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-blue-500/50"
                  />

                  {/* Quick suggestions: match first word exactly and show up to 3 */}
                  {(() => {
                    const firstWord = q.split(' ')[0]
                    if (!firstWord) return null
                    const suggestion = (apiProducts || [])
                      .map(mapApiProductToAppProduct)
                      .filter((p) => (p.name || '').split(' ')[0]?.toLowerCase() === firstWord)
                      .slice(0, 3)

                    if (!suggestion.length) return null

                    return (
                      <div className="absolute left-0 right-0 mt-2 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden z-20">
                        {suggestion.map((p) => (
                          <button
                            key={p.id ?? p.name}
                            type="button"
                            onClick={() => setQuery(p.name.split(' ')[0])}
                            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left text-sm hover:bg-slate-50"
                          >
                            <span className="truncate">{p.name}</span>
                            <span className="shrink-0 text-slate-700 font-semibold">{p.price}</span>
                          </button>
                        ))}
                      </div>
                    )
                  })()}
                </div>
              </div>


              <div className="mt-6">
                <div className="text-sm font-semibold">Sort</div>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-blue-500/50"
                >
                  <option value="featured">Featured</option>
                  <option value="price_asc">Price: low to high</option>
                  <option value="price_desc">Price: high to low</option>
                </select>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-9">
            <div className="flex items-center justify-between gap-4">
              <div className="text-sm text-slate-400">
                Showing <span className="text-slate-200">{products.length}</span> result(s)
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => (
                <div key={p.id ?? p.name} className="group bb-card bb-card-hover p-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      {p.tag}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{p.price}</div>
                  </div>

                  <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img src={p.image || ecommerce} alt={p.name} className="h-full w-full object-cover opacity-80 transition group-hover:scale-105" />
                  </div>


                  <div className="mt-4">
<div className="text-base font-semibold text-slate-900">{p.name}</div>
                    <div className="mt-3 flex items-center justify-between gap-3">
<div className="text-xs text-slate-600">Free returns</div>
                      <button
                        onClick={() => addToCart(p)}
                        className="rounded-lg bg-blue-500 px-4 py-2 text-xs font-medium text-white hover:bg-blue-600"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {products.length === 0 ? (
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400">
                No products found.
              </div>
            ) : null}
          </main>
        </div>
      </div>

      <footer className="border-t border-slate-200 bg-white">
        <div className="bb-container py-10 text-slate-500">
          © {new Date().getFullYear()} DevStore. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


