import { createContext, useContext, useState, useEffect } from 'react'
import { api, setToken, getStoredToken, clearToken } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getStoredToken()
    if (token) {
      api('/auth/profile', { auth: true })
        .then(res => setUser(res.data))
        .catch(() => clearToken())
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  async function login(email, password) {
    const res = await api('/auth/login', { method: 'POST', body: { email, password } })
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }

  async function register(email, password, name) {
    const res = await api('/auth/register', { method: 'POST', body: { email, password, name } })
    setToken(res.data.token)
    setUser(res.data.user)
    return res.data
  }

  function logout() {
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
