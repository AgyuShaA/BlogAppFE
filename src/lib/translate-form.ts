import { getTranslations } from 'next-intl/server'

export async function translateFrom(locale: string, namespace: string, key: string) {
  const t = await getTranslations({ locale, namespace })
  return t(key)
}
