import { useContext, useMemo, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { AuthContext } from '../store/AuthProvider'

export default function Login() {
  const auth = useContext(AuthContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.trim().length > 0
  }, [email, password])

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!canSubmit) {
      setError('Email and password are required.')
      return
    }

    setSubmitting(true)
    try {
      const res = auth?.login?.({ email, password })
      if (res?.ok === false) {
        setError(res.error || 'Login failed.')
        return
      }
      navigate('/orders')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bb-page">
      <div
        className="bb-container bb-section"
        style={{
          paddingTop: 40,
          paddingBottom: 40,
        }}
      >
        <div className="min-h-[calc(100svh-80px)] flex flex-col items-center justify-center text-center">
          <div className="mb-6 w-full max-w-md">
            <h1 className="bb-title">Login</h1>
            <p className="bb-subtitle text-sm">Sign in to view your orders (saved locally).</p>
          </div>

          <div className="w-full max-w-md">
            <Card className="p-6">
              {error ? (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="mt-2 w-full"
                    required
                  />
                </div>

                <Button className="mt-2 w-full" type="submit" disabled={!canSubmit || submitting}>
                  {submitting ? 'Signing in...' : 'Login'}
                </Button>

                <div className="text-sm text-slate-600">
                  Don’t have an account?{' '}
                  <Link to="/register" className="font-semibold text-blue-700 hover:underline">
                    Register
                  </Link>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

