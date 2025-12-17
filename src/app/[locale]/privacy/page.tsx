'use cache'

import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'

import { setRequestLocale } from 'next-intl/server'
import PrivacyPolicyPage from './privacy'

export const metadata: Metadata = {
  title: 'Privacy Policy — ProBouwStore',
  description:
    'Read how ProBouwStore collects, uses, and protects your personal data. Learn about cookies, data rights, and GDPR compliance.',
  openGraph: {
    title: 'Privacy Policy — ProBouwStore',
    description: 'Understand how we handle personal information and ensure data protection.',
    url: 'https://www.probouwstore.com/privacy',
    type: 'article',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — ProBouwStore',
    description: 'Learn about data privacy, cookies, and GDPR compliance.',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
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

  setRequestLocale(locale)

  return <PrivacyPolicyPage />
}
