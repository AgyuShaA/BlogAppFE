'use cache'

import TileListPage from '@/components/catalog/viwer'
import { routing } from '@/i18n/routing'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function adminPage() {
  return (
    <div className=' w-screen max-w-7xl flex flex-col items-center justify-center '>
      <div className='relative py-20'>
        <TileListPage />
      </div>
    </div>
  )
}
