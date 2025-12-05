import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import type { Metadata } from 'next'

import { getTranslations } from 'next-intl/server'

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

export const dynamic = 'force-static'

export const revalidate = false

export default async function ReturnsPolicyPage() {
  const t = await getTranslations('returns')

  return (
    <main className='mx-auto max-w-7xl px-[5%] md:px-[2%] py-10 space-y-8'>
      <Breadcrumbs />

      <h1 className='text-3xl font-semibold mb-4'>{t('title')}</h1>

      <section className='space-y-4'>
        <p className='leading-relaxed'>{t('p1')}</p>
        <p className='leading-relaxed'>{t('p2')}</p>
        <p className='leading-relaxed'>{t('p3')}</p>
        <p className='leading-relaxed'>{t('p4')}</p>
        <p className='leading-relaxed'>{t('p5')}</p>
        <p className='leading-relaxed'>{t('p6')}</p>
        <p className='leading-relaxed'>{t('p7')}</p>
        <p className='leading-relaxed'>{t('p8')}</p>
        <p className='leading-relaxed font-medium'>{t('p9')}</p>
      </section>
    </main>
  )
}
