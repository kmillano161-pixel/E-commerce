export default function About() {
  return (
    <div className="bb-page">
      <div className="bb-container bb-section">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h1 className="bb-title">About Us</h1>
            <p className="bb-subtitle text-sm">
              DevStore is a simple ecommerce demo focused on clean UI and practical front-end
              functionality. Cart and orders are saved to{' '}
              <span className="font-medium text-blue-700">localStorage</span> so everything works
              without a server.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="bb-card p-6">
              <div className="text-blue-700 text-sm font-semibold">Local-first</div>
              <div className="mt-2 text-lg font-semibold">Works offline</div>
              <div className="mt-2 text-sm text-slate-600">Cart and orders persist in your browser.</div>
            </div>

            <div className="bb-card p-6">
              <div className="text-blue-700 text-sm font-semibold">Fast UI</div>
              <div className="mt-2 text-lg font-semibold">Simple + clean</div>
              <div className="mt-2 text-sm text-slate-600">Straightforward state logic, easy to maintain.</div>
            </div>

            <div className="bb-card p-6">
              <div className="text-blue-700 text-sm font-semibold">Developer friendly</div>
              <div className="mt-2 text-lg font-semibold">Easy to extend</div>
              <div className="mt-2 text-sm text-slate-600">Add real APIs later without rewriting UI.</div>
            </div>
          </div>

          <div className="mt-10 bb-card p-6">
            <div className="text-lg font-semibold">Next steps</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-700 list-disc list-inside">
              <li>Connect Shop items to a real product API</li>
              <li>Replace mock checkout with payment provider</li>
              <li>Add an order details page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


