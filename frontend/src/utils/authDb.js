const USERS_KEY = 'devstore_users_v1'
const SESSION_KEY = 'devstore_session_v1'

function safeParse(raw, fallback) {
  try {
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch {
    return fallback
  }
}

function getUsers() {
  const raw = localStorage.getItem(USERS_KEY)
  const users = safeParse(raw, [])
  return Array.isArray(users) ? users : []
}

function setUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser({ name, email, password }) {
  const users = getUsers()

  const normalizedEmail = String(email || '').trim().toLowerCase()
  if (!normalizedEmail) return { ok: false, error: 'Email is required.' }

  if (users.some((u) => String(u.email).trim().toLowerCase() === normalizedEmail)) {
    return { ok: false, error: 'Email is already registered.' }
  }

  if (!String(password || '').trim() || String(password).length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' }
  }

  const user = {
    id: `USR-${Date.now().toString(36).toUpperCase()}`,
    name: String(name || '').trim() || 'Customer',
    email: normalizedEmail,
    // NOTE: this is a demo/local-only app. Never store plaintext passwords in production.
    password: String(password),
  }

  setUsers([user, ...users])
  return { ok: true, user: { id: user.id, name: user.name, email: user.email } }
}

export function loginUser({ email, password }) {
  const users = getUsers()

  const normalizedEmail = String(email || '').trim().toLowerCase()
  const found = users.find((u) => String(u.email).trim().toLowerCase() === normalizedEmail)

  if (!found) return { ok: false, error: 'Invalid email or password.' }
  if (found.password !== String(password)) return { ok: false, error: 'Invalid email or password.' }

  const session = {
    user: { id: found.id, name: found.name, email: found.email },
    token: `TOK-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  return { ok: true, session }
}

export function loadSession() {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  const session = safeParse(raw, null)
  return session && session.user ? session : null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

