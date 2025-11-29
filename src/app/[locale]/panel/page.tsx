import TileFilters from '@/components/catalog/tile-filters'
import { TileList } from '@/components/catalog/tile-list'
import TileListPage from '@/components/catalog/viwer'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function catalogPage() {
  return (
    <div className=' w-screen max-w-7xl flex flex-col items-center justify-center '>
      <div className='relative '>
        <TileListPage />
      </div>

      <div className='relative flex flex-row pt-20'>
        <TileFilters />
        <h2 className='text-lg font-semibold mb-2'>Tiles</h2>

        <TileList />
      </div>
    </div>
  )
}
