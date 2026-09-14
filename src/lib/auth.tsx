import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useStore } from './store'
import type { Member, MemberRole } from '../data/types'
import { readJson, writeJson } from './storage'

const SESSION_KEY = 'jsr.session.v1'
const PERSONAL_KEY = 'jsr.personal.v1'

/** Per-member state the prototype keeps outside the CMS tables. */
type Personal = {
  bookmarks: Record<string, string[]>
  registrations: Record<string, string[]>
  redeemed: Record<string, string[]>
}

const emptyPersonal: Personal = { bookmarks: {}, registrations: {}, redeemed: {} }

type PendingSignup = {
  name: string
  email: string
  phone: string
  city: string
  password: string
}

type AuthValue = {
  user: Member | null
  role: MemberRole | 'guest'
  isPremium: boolean
  isAdmin: boolean
  login: (email: string, password: string) => { ok: true } | { ok: false; reason: 'invalid' }
  logout: () => void
  /** Step 1 of sign-up: stash the form, then send the user to OTP. */
  startSignup: (data: PendingSignup) => void
  pendingSignup: PendingSignup | null
  /** Step 2: verify the demo OTP and create the account. */
  confirmSignup: (code: string) => { ok: true } | { ok: false; reason: 'otp' | 'expired' }
  upgradeToPremium: () => void
  bookmarks: string[]
  toggleBookmark: (contentId: string) => void
  registrations: string[]
  registerKajian: (kajianId: string) => void
  redeemed: string[]
  redeemVoucher: (voucherId: string) => void
}

const DEMO_OTP = '123456'

const AuthContext = createContext<AuthValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { db, create, update } = useStore()
  const [userId, setUserId] = useState<string | null>(() => readJson<string | null>(SESSION_KEY, null))
  const [personal, setPersonal] = useState<Personal>(() => readJson<Personal>(PERSONAL_KEY, emptyPersonal))
  const [pendingSignup, setPendingSignup] = useState<PendingSignup | null>(null)

  useEffect(() => {
    writeJson(SESSION_KEY, userId)
  }, [userId])

  useEffect(() => {
    writeJson(PERSONAL_KEY, personal)
  }, [personal])

  const user = useMemo(() => db.members.find((m) => m.id === userId) ?? null, [db.members, userId])

  const login = useCallback<AuthValue['login']>(
    (email, password) => {
      const found = db.members.find(
        (m) => m.email.toLowerCase() === email.trim().toLowerCase() && m.password === password,
      )
      if (!found) return { ok: false, reason: 'invalid' }
      setUserId(found.id)
      return { ok: true }
    },
    [db.members],
  )

  const logout = useCallback(() => setUserId(null), [])

  const startSignup = useCallback((data: PendingSignup) => setPendingSignup(data), [])

  const confirmSignup = useCallback<AuthValue['confirmSignup']>(
    (code) => {
      if (!pendingSignup) return { ok: false, reason: 'expired' }
      if (code.trim() !== DEMO_OTP) return { ok: false, reason: 'otp' }
      const id = `m-${Math.random().toString(36).slice(2, 8)}`
      const year = new Date().getFullYear()
      const member: Member = {
        id,
        memberNo: `JSR-${year}-${String(Math.floor(Math.random() * 900000) + 100000)}`,
        name: pendingSignup.name,
        email: pendingSignup.email,
        password: pendingSignup.password,
        phone: pendingSignup.phone,
        city: pendingSignup.city,
        role: 'member',
        joinedAt: new Date().toISOString().slice(0, 10),
        validUntil: `${year + 1}-${new Date().toISOString().slice(5, 10)}`,
        points: 0,
        avatarColor: '#2ea06e',
        state: 'active',
      }
      create('members', member)
      setUserId(id)
      setPendingSignup(null)
      return { ok: true }
    },
    [create, pendingSignup],
  )

  const upgradeToPremium = useCallback(() => {
    if (!user) return
    update('members', user.id, { role: 'premium' })
  }, [update, user])

  const mutatePersonal = useCallback(
    (bucket: keyof Personal, id: string) => {
      if (!userId) return
      setPersonal((prev) => {
        const current = prev[bucket][userId] ?? []
        const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
        return { ...prev, [bucket]: { ...prev[bucket], [userId]: next } }
      })
    },
    [userId],
  )

  const addPersonal = useCallback(
    (bucket: keyof Personal, id: string) => {
      if (!userId) return
      setPersonal((prev) => {
        const current = prev[bucket][userId] ?? []
        if (current.includes(id)) return prev
        return { ...prev, [bucket]: { ...prev[bucket], [userId]: [...current, id] } }
      })
    },
    [userId],
  )

  const value = useMemo<AuthValue>(() => {
    const bookmarks = userId ? (personal.bookmarks[userId] ?? []) : []
    const registrations = userId ? (personal.registrations[userId] ?? []) : []
    const redeemed = userId ? (personal.redeemed[userId] ?? []) : []
    return {
      user,
      role: user?.role ?? 'guest',
      isPremium: user?.role === 'premium' || user?.role === 'admin',
      isAdmin: user?.role === 'admin',
      login,
      logout,
      startSignup,
      pendingSignup,
      confirmSignup,
      upgradeToPremium,
      bookmarks,
      toggleBookmark: (id) => mutatePersonal('bookmarks', id),
      registrations,
      registerKajian: (id) => addPersonal('registrations', id),
      redeemed,
      redeemVoucher: (id) => addPersonal('redeemed', id),
    }
  }, [
    addPersonal,
    confirmSignup,
    login,
    logout,
    mutatePersonal,
    pendingSignup,
    personal,
    startSignup,
    upgradeToPremium,
    user,
    userId,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}

export { DEMO_OTP }
