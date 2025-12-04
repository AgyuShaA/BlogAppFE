import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import TileFilters from '@/components/catalog/tile-filters'
import { TileList } from '@/components/catalog/tile-list'
import { routing } from '@/i18n/routing'
import { catalogQueryOptions, tilesQueryOptions } from '@/service/queries/use-tile-query'
import { getQueryClient } from '@/service/tanstack/get-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// app/categories/page.tsx

export const metadata: Metadata = {
  title: 'Tile Categories — ProBouwStore',
  description:
    'Browse all tile categories: ceramic, marble, wood-look, concrete and more. Find the perfect tiles for your project.',
  openGraph: {
    title: 'Tile Categories — ProBouwStore',
    description: 'Choose from a wide variety of tile categories for all styles and budgets.',
    url: 'https://www.probouwstore.com/catalog',
    images: ['https://www.probouwstore.com/1.webp'],
  },
  twitter: { card: 'summary_large_image' },
}

export const dynamic = 'force-static'

export const revalidate = 600

export default async function CatalogPage() {
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(catalogQueryOptions)
  await queryClient.prefetchQuery(tilesQueryOptions)

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className='max-w-[1280px] w-full'>
        <Breadcrumbs className='px-[5%] md:px-[2%]' />

        <div className='relative flex md:flex-row px-[2%] flex-col'>
          <div className='hidden lg:block'>
            <TileFilters />
          </div>

          <TileList />
        </div>
      </div>
    </HydrationBoundary>
  )
}
