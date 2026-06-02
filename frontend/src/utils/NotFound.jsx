import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-slate-400">Try going back to the homepage.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}

