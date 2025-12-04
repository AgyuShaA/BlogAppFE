import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import TileFilters from '@/components/catalog/tile-filters'
import { TileList } from '@/components/catalog/tile-list'
import { routing } from '@/i18n/routing'
import { catalogQueryOptions, tilesQueryOptions } from '@/service/queries/use-tile-query'
import { getQueryClient } from '@/service/tanstack/get-query'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const dynamic = 'force-static'

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
