import { useContext, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ecommerce from '../assets/ecomerce.png'
import { categories, testimonials } from '../data/catalog'
import { CartContext } from '../store/store'

function mapApiProductToAppProduct(p) {
  return {
    id: p.id,
    name: p.title,
    priceNumber: Number(p.price) || 0,
    price: `$${(Number(p.price) || 0).toFixed(2)}`,
    image: p.image || ecommerce,
    tag: p.category,
    category: p.category,
  }
}

function Home() {
  const cart = useContext(CartContext)
  const navigate = useNavigate()
  const [apiProducts, setApiProducts] = useState(null)

  useEffect(() => {
    let mounted = true
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products')
        const data = await res.json()
        if (mounted) setApiProducts(data)
      } catch (e) {
        console.error('Error fetching data:', e)
      }
    }
    fetchProducts()
    return () => {
      mounted = false
    }
  }, [])

  // show up to 6 items per API category matching your Home category keys
  const bestSellers = useMemo(() => {
    const list = (apiProducts || []).map(mapApiProductToAppProduct)

    // map your catalog keys -> fakestore categories
    const keyToApiCategory = {
      electronics: 'electronics',
      fashion: 'jewelery',
    }

    // pick in stable order matching Home categories
    const out = []
    for (const cat of categories) {
      const apiCat = keyToApiCategory[cat.key]
      const matches = list.filter((p) => p.category === apiCat)
      out.push(...matches.slice(0, 2))
    }

    return out.slice(0, 6)
  }, [apiProducts])

  const goToShop = () => {
    navigate('/shop')
  }

  return (
    <div className="bb-page">
      {/* HERO */}
      <section className="border-b border-slate-200 bg-white">
        <div className="bb-container bb-section">

          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 pl-10 pr-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-slate-600">Free delivery on qualifying orders</span>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-5xl">
                Shop trusted deals—
                <span className="text-blue-600"> fast & easy</span>.
              </h1>

              <p className="mt-4 max-w-xl text-slate-600">
                Browse best sellers across electronics, fashion, home, and sports. Add to cart in seconds and check out when it fits.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={goToShop}
                  className="rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Shop best sellers
                </button>
                <Link
                  to="/shop"
                  className="rounded-md border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  Explore products
                </Link>
              </div>


              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-medium">Free shipping</div>
                  <div className="mt-1 text-xs text-slate-500">Over $50</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-medium">Secure payments</div>
                  <div className="mt-1 text-xs text-slate-500">Cards & online</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-sm font-medium">Easy returns</div>
                  <div className="mt-1 text-xs text-slate-500">30 days</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={ecommerce}
                  alt="Featured products"
                  className="h-[360px] w-full object-cover sm:h-[420px]"
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-medium text-slate-500">Today’s deal</div>
                  <div className="mt-1 text-sm font-semibold">Up to 25% off</div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="text-xs font-medium text-slate-500">Trending</div>
                  <div className="mt-1 text-sm font-semibold">Wireless picks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      {/*<section className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl text-center sm:text-left">
            <h2 className="text-2xl font-semibold ">Shop by category</h2>
            <p className="mt-2 text-slate-600">Quick entry to what you need.</p>
          </div>
          <a className="hidden text-sm font-medium text-blue-600 hover:text-blue-700 sm:block" href="#">
            View all
          </a>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <a
              key={c.title}
              href="#/shop"
              onClick={(e) => {
                e.preventDefault()
                window.location.hash = '#/shop'
                window.sessionStorage.setItem('shopCategory', c.key)
              }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-slate-600">{c.desc}</div>
                </div>
                <div className={`h-10 w-10 shrink-0 rounded-xl ${c.accent} flex items-center justify-center`}>
                  <span className="text-xs font-bold">{c.title.slice(0, 1)}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">Shop now</span>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">→</span>
              </div>
            </a>
          ))}
        </div>
      </section> */}

      {/* ELECTRONICS + FASHION CARDS */}
      {/*<section className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-10">
          <div>
            <h2 className="text-2xl font-semibold">Featured for you</h2>
            <p className="mt-2 text-slate-600">Two quick picks: Electronics and Fashion.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              {
                key: 'electronics',
                title: 'Electronics Deals',
                desc: 'Top gadgets and accessories.',
                tag: 'Electronics',
                // map to fakestore category: electronics
                apiCategory: 'electronics',
                accent: 'bg-cyan-500/20 text-cyan-200',
              },
              {
                key: 'fashion',
                title: 'Fashion Essentials',
                desc: 'Premium essentials & style.',
                tag: 'Fashion',
                // map to fakestore category: jewelery
                apiCategory: 'jewelery',
                accent: 'bg-pink-500/20 text-pink-200',
              },
            ].map((c) => {
              const picked = (apiProducts || [])
                .filter((p) => p.category === c.apiCategory)
                .slice(0, 1)
              const p = picked[0]

              const product = p
                ? {
                    name: p.title,
                    price: `$${(Number(p.price) || 0).toFixed(2)}`,
                    image: p.image || ecommerce,
                  }
                : {
                    name: c.title,
                    price: '$0.00',
                    image: ecommerce,
                  }

              return (
                <div
                  key={c.key}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${c.accent}`}>
                      {c.tag}
                    </div>
                    <div className="text-sm font-semibold text-slate-900">{product.price}</div>
                  </div>

                  <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover opacity-95 transition group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-4">
                    <div className="text-base font-semibold text-slate-900">{product.name}</div>
                    <div className="mt-1 text-sm text-slate-600">{c.desc}</div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          if (!p) return
                          cart?.dispatch?.({
                            type: 'ADD',
                            item: {
                              name: p.title,
                              price: `$${(Number(p.price) || 0).toFixed(2)}`,
                              priceNumber: Number(p.price) || 0,
                              image: ecommerce,
                            },
                          })
                        }}
                        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        disabled={!p}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>*/}

      {/* BEST SELLERS */}
      <section className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-10">
          <div>
            <h2 className="text-2xl font-semibold">Best sellers</h2>
            <p className="mt-2 text-slate-600">Popular picks—ready to add to cart.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((p) => (
              <div
                key={p.name}
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {p.tag}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{p.price}</div>
                </div>

                <div className="mt-4 aspect-[4/3] overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <img
                    src={p.image || ecommerce}
                    alt={p.name}
                    className="h-full w-full object-cover opacity-95 transition group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4">
                  <div className="text-base font-semibold text-slate-900">{p.name}</div>

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-600">★★★★★</span>
                      <span className="text-xs text-slate-500">4.6</span>
                    </div>
                    <span className="text-xs font-medium text-slate-600">Free returns</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      onClick={() =>
                        cart?.dispatch?.({
                          type: 'ADD',
                          item: {
                            name: p.name,
                            price: p.price,
                            priceNumber: p.priceNumber,
                            image: ecommerce,
                          },
                        })
                      }
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-700"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PROMO BANNER */}
      <section className="container mx-auto px-4 py-10">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:items-center md:p-10">
            <div>
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Limited-time offer
              </div>
              <h2 className="mt-4 text-2xl font-semibold md:text-3xl">Summer Sale</h2>
              <p className="mt-3 text-slate-600">
                Up to <span className="font-semibold text-blue-700">40% off</span> selected items. While supplies last.
              </p>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  onClick={goToShop}
                  className="rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Shop Sale
                </button>
                <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800">
                  Use code <span className="font-semibold text-blue-700">SAVE40</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <img
                src={ecommerce}
                alt="Sale promotion"
                className="h-56 w-full object-cover md:h-72"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 py-10">
          <div>
            <h2 className="text-2xl font-semibold">What customers say</h2>
            <p className="mt-2 text-slate-600">Real reviews from verified buyers.</p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="text-sm text-slate-900">★★★★★</div>
                <p className="mt-4 text-slate-700">“{t.quote}”</p>
                <div className="mt-5 text-sm font-semibold text-slate-900">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="bb-container bb-section" style={{ paddingTop: 40, paddingBottom: 40 }}>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="text-lg font-semibold">DevStore</div>
              <p className="mt-3 text-sm text-slate-600">Quality picks across your favorite categories.</p>
            </div>
            <div>
              <div className="text-sm font-semibold">Shop</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-blue-700" href="#">New Arrivals</a></li>
                <li><a className="hover:text-blue-700" href="#">Best Sellers</a></li>
                <li><a className="hover:text-blue-700" href="#">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Company</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-blue-700" href="#">About</a></li>
                <li><a className="hover:text-blue-700" href="#">Careers</a></li>
                <li><a className="hover:text-blue-700" href="#">Press</a></li>
              </ul>
            </div>
            <div>
              <div className="text-sm font-semibold">Support</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><a className="hover:text-blue-700" href="#">Help Center</a></li>
                <li><a className="hover:text-blue-700" href="#">Returns</a></li>
                <li><a className="hover:text-blue-700" href="#">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-10 mr-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} DevStore. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <a className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" href="#">
                Twitter
              </a>
              <a className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50" href="#">
                Instagram
              </a>
              <a className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 mr-16" href="#">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home


