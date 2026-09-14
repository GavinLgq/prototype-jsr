import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { kajianList, kajianVideos } from '../data/kajian'
import { communityEvents } from '../data/community'
import { dapurContents } from '../data/dapur'
import { activities, banners, members, vouchers } from '../data/members'
import type {
  Activity,
  Banner,
  CommunityEvent,
  DapurContent,
  Kajian,
  KajianVideo,
  Member,
  Voucher,
} from '../data/types'
import { readItem, removeItem, writeJson } from './storage'

/**
 * The prototype's stand-in for a backend. Seeded from src/data and persisted to
 * localStorage so CMS edits survive a reload without a server.
 */
export type DB = {
  kajian: Kajian[]
  videos: KajianVideo[]
  events: CommunityEvent[]
  contents: DapurContent[]
  vouchers: Voucher[]
  members: Member[]
  banners: Banner[]
  activities: Activity[]
}

export type Collection = keyof DB

const STORAGE_KEY = 'jsr.db.v1'
const SCHEMA_VERSION = 1

function seed(): DB {
  return {
    kajian: kajianList,
    videos: kajianVideos,
    events: communityEvents,
    contents: dapurContents,
    vouchers,
    members,
    banners,
    activities,
  }
}

function load(): DB {
  if (typeof window === 'undefined') return seed()
  try {
    const raw = readItem(STORAGE_KEY)
    if (!raw) return seed()
    const parsed = JSON.parse(raw) as { version: number; db: DB }
    if (parsed.version !== SCHEMA_VERSION) return seed()
    // Merge so a seed gaining new collections does not break an old snapshot.
    return { ...seed(), ...parsed.db }
  } catch {
    return seed()
  }
}

type StoreValue = {
  db: DB
  create: <K extends Collection>(collection: K, item: DB[K][number]) => void
  update: <K extends Collection>(collection: K, id: string, patch: Partial<DB[K][number]>) => void
  remove: (collection: Collection, id: string) => void
  reset: () => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [db, setDb] = useState<DB>(load)

  useEffect(() => {
    writeJson(STORAGE_KEY, { version: SCHEMA_VERSION, db })
  }, [db])

  const create = useCallback<StoreValue['create']>((collection, item) => {
    setDb((prev) => ({ ...prev, [collection]: [item, ...(prev[collection] as unknown[])] }) as DB)
  }, [])

  const update = useCallback<StoreValue['update']>((collection, id, patch) => {
    setDb(
      (prev) =>
        ({
          ...prev,
          [collection]: (prev[collection] as { id: string }[]).map((row) =>
            row.id === id ? { ...row, ...patch } : row,
          ),
        }) as DB,
    )
  }, [])

  const remove = useCallback<StoreValue['remove']>((collection, id) => {
    setDb(
      (prev) =>
        ({
          ...prev,
          [collection]: (prev[collection] as { id: string }[]).filter((row) => row.id !== id),
        }) as DB,
    )
  }, [])

  const reset = useCallback(() => {
    removeItem(STORAGE_KEY)
    setDb(seed())
  }, [])

  const value = useMemo(() => ({ db, create, update, remove, reset }), [db, create, update, remove, reset])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>')
  return ctx
}

/** Published rows only — what the public site should render. */
export function usePublic() {
  const { db } = useStore()
  return useMemo(
    () => ({
      kajian: db.kajian.filter((k) => k.state === 'published'),
      videos: db.videos.filter((v) => v.state === 'published'),
      events: db.events.filter((e) => e.state === 'published'),
      contents: db.contents.filter((c) => c.state === 'published'),
      vouchers: db.vouchers.filter((v) => v.state === 'published'),
      banners: db.banners.filter((b) => b.state === 'published'),
    }),
    [db],
  )
}

export function newId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`
}
