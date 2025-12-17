'use cache'

import AboutSection from '@/components/about/about'
import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import { routing } from '@/i18n/routing'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'About ProBouwStore — Your Trusted Tile Partner',
  description:
    'Learn about ProBouwStore, our mission, our experience in tile distribution, and our commitment to quality and customer satisfaction.',
  openGraph: {
    title: 'About ProBouwStore — Your Trusted Tile Partner',
    url: 'https://www.probouwstore.com/about',
    images: ['/og/about.jpg'],
  },
}

export default async function CatalogPage() {
  return (
    <div className='max-w-7xl w-full px-[5%] md:px-[2%]'>
      <Breadcrumbs />
      <AboutSection />
    </div>
  )
}
