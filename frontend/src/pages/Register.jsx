import { useContext, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { AuthContext } from '../store/AuthProvider'

function validate({ name, email, password }) {
  if (!String(name || '').trim()) return 'Name is required.'
  const normalizedEmail = String(email || '').trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) return 'Valid email is required.'
  if (!String(password || '').trim() || String(password).length < 6) return 'Password must be at least 6 characters.'
  return ''
}

export default function Register() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return form.name.trim() && form.email.trim() && form.password.trim()
  }, [form])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    const msg = validate(form)
    if (msg) {
      setError(msg)
      return
    }

    setSubmitting(true)
    try {
      const res = auth?.register?.({ name: form.name, email: form.email, password: form.password })
      if (res?.ok === false) {
        setError(res.error || 'Registration failed.')
        return
      }
      navigate('/login')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bb-page">
      <div className="bb-container bb-section" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <div className="mb-8">
          <h1 className="bb-title">Register</h1>
          <p className="bb-subtitle text-sm">Create an account (stored locally in your browser).</p>
        </div>

        <div className="max-w-md">
          <Card className="p-6">
            {error ? (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Full name"
                  className="mt-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@example.com"
                  className="mt-2 w-full"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">Password</label>
                <Input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="At least 6 characters"
                  className="mt-2 w-full"
                  required
                />
              </div>

              <Button className="mt-2 w-full" type="submit" disabled={!canSubmit || submitting}>
                {submitting ? 'Creating...' : 'Create account'}
              </Button>

              <div className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-700 hover:underline">
                  Login
                </Link>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  )
}

