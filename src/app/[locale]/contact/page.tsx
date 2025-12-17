'use cache'

import { routing } from '@/i18n/routing'
import { Metadata } from 'next'
import { hasLocale } from 'next-intl'

import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Contact from './contact'

export const metadata: Metadata = {
  title: 'Contact ProBouwStore',
  description: 'Reach out to our team for product inquiries, quotes, or expert support.',
  openGraph: {
    title: 'Contact ProBouwStore',
    url: 'https://www.probouwstore.com/contact',
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

  return <Contact />
}
