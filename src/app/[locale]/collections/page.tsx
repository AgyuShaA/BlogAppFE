import { routing } from '@/i18n/routing'
import { getTranslations } from 'next-intl/server'
import { CollectionItem, COLLECTIONS } from '@/types/types'
import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import { Link } from '@/i18n/navigation'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-static'

export const revalidate = 600

export const metadata: Metadata = {
  title: 'Tile Categories — ProBouwStore',
  description:
    'Browse all tile categories: ceramic, marble, wood-look, concrete and more. Find the perfect tiles for your project.',
  openGraph: {
    title: 'Tile Categories — ProBouwStore',
    description: 'Choose from a wide variety of tile categories for all styles and budgets.',
    url: 'https://www.probouwstore.com/collections',
    images: ['https://www.probouwstore.com/1.webp'],
  },
  twitter: { card: 'summary_large_image' },
}

export default async function CollectionsPage() {
  const t = await getTranslations('names')

  return (
    <div className='flex flex-col mx-auto mb-20 md:mb-0 items-center max-w-[1280px] px-[5%] md:px-[2%]  w-full min-h-[75vh]'>
      <Breadcrumbs />
      <h1 className='text-3xl md:text-5xl mb-8'>{t('collections')}</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 w-full'>
        {COLLECTIONS.map((item: CollectionItem, idx) => (
          <Link
            key={idx}
            href={`/collections/${item.slug}`}
            className='border rounded-lg p-6 shadow-sm hover:shadow-md transition group'
          >
            <h2 className='text-xl font-semibold group-hover:text-[#AE2526]'>{item.label}</h2>
            <p className='text-sm text-gray-500 mt-1'>{t('viewTiles')}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
