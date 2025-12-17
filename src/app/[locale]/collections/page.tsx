'use cache'

import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import Collections from './collections'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Tile Categories — ProBouwStore',
  description:
    'Browse all tile categories: ceramic, marble, wood-look, concrete and more. Find the perfect tiles for your project.',
  openGraph: {
    title: 'Tile Categories — ProBouwStore',
    description: 'Choose from a wide variety of tile categories for all styles and budgets.',
    url: 'https://www.probouwstore.com/collections',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },
  twitter: { card: 'summary_large_image' },
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

  return <Collections />
}
