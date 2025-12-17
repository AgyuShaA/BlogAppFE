'use cache'

import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'

import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Returns from './delivery'

export const metadata: Metadata = {
  title: 'Delivery & Returns — ProBouwStore',
  description:
    'Learn about shipping times, delivery methods, return conditions, damaged goods policy, and how ProBouwStore ensures a smooth ordering experience.',
  openGraph: {
    title: 'Delivery & Returns — ProBouwStore',
    description: 'Information about shipping, order processing, returns, and replacements at ProBouwStore.',
    url: 'https://www.probouwstore.com/delivery-and-returns',
    type: 'article',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delivery & Returns — ProBouwStore',
    description: 'Read about our delivery process and return conditions.',
    images: ['https://www.probouwstore.com/1.webo'],
  },
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Page({ params }: Props) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return <Returns />
}
