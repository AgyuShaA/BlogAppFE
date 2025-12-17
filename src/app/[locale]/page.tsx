'use cache'

import FirstSection from '@/components/MainPage/FirstSection/FirstSection'
import SecondSection from '@/components/MainPage/second-section/second-section'
import AboutSection from '@/components/MainPage/about-section/about-section'
import WhyUs from '@/components/MainPage/why-us/why-us'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ProBouwStore — Your professional building partner for floor & wall tiles',
  description:
    'ProBouwStore offers a wide selection of floor and wall tiles with great pricing, fast delivery, and expert advice. Shop ceramic, wood-look, marble, stone tiles and more.',

  keywords: [
    'tiles',
    'floor tiles',
    'wall tiles',
    'ceramic tiles',
    'wood-look tiles',
    'marble tiles',
    'stone tiles',
    'bathroom tiles',
    'kitchen tiles',
    'building materials',
    'tile store',
    'ProBouwStore',
  ],

  authors: [{ name: 'ProBouwStore' }],
  creator: 'ProBouwStore',

  openGraph: {
    title: 'ProBouwStore — Your professional building partner for floor & wall tiles',
    description:
      'Explore a wide selection of tiles — ceramic, marble, stone, wood-look — with sharp pricing and fast delivery.',
    url: 'https://www.probouwstore.com/',
    siteName: 'ProBouwStore',
    type: 'website',
    images: [
      {
        url: 'https://www.probouwstore.com/main-page/1.webp',
        width: 1200,
        height: 630,
        alt: 'ProBouwStore tiles catalog',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'ProBouwStore — Tiles for every room · Floor & Wall Solutions',
    description: 'Shop tiles with fast delivery and competitive prices. Ceramic, marble, stone, wood-look & more.',
    images: ['https://www.probouwstore.com/main-page/1.webp'],
  },

  metadataBase: new URL('https://www.probouwstore.com'),
}

export default async function Page({ params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <>
      <div className='relative'>
        <FirstSection />
        <SecondSection />
        <AboutSection />
        <WhyUs />
      </div>
    </>
  )
}
