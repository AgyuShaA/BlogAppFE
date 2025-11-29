import enJson from '@/i18n/text/en.json'
import nlJson from '@/i18n/text/nl.json'

/* eslint-disable */

function deepFind(obj: Record<string, any>, key: string): string | undefined {
  for (const k in obj) {
    if (k === key) return obj[k]

    const value = obj[k]
    if (typeof value === 'object' && value !== null) {
      const found = deepFind(value, key)
      if (found !== undefined) return found
    }
  }

  return undefined
}

export function getTileTranslations(name: string) {
  const en = deepFind(enJson, name)
  const nl = deepFind(nlJson, name)

  return {
    en: en ?? name,
    nl: nl ?? name,
  }
}
