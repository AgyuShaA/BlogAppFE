'use cache'

import TileListPage from '@/components/catalog/viwer'
import { routing } from '@/i18n/routing'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Page({ params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <div className=' w-screen max-w-7xl flex flex-col items-center justify-center '>
      <div className='relative py-20'>
        <TileListPage />
      </div>
    </div>
  )
}
