export type Lang = 'id' | 'en'

/** A piece of content authored in both languages. */
export type L = { id: string; en: string }

export const L = (id: string, en: string): L => ({ id, en })
