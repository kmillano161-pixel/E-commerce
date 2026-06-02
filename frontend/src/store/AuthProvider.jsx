import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

export { AuthContext };


import { loadSession, loginUser, logout, registerUser } from '../utils/authDb'

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const session = loadSession()
    // avoid react state update inside effect body by updating in the next microtask
    queueMicrotask(() => {
      setUser(session?.user ?? null)
      setHydrated(true)
    })
  }, [])

  const login = ({ email, password }) => {
    const res = loginUser({ email, password })
    if (!res.ok) return res
    setUser(res.session?.user ?? null)
    return res
  }

  const register = ({ name, email, password }) => {
    const res = registerUser({ name, email, password })
    if (!res.ok) return res
    return res
  }

  const doLogout = () => {
    logout()
    setUser(null)
  }

  const value = useMemo(() => {
    return { user, hydrated, login, register, logout: doLogout }
  }, [user, hydrated])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


