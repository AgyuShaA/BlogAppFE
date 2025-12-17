import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'
import { Link } from '@/i18n/navigation'
import { CollectionItem, COLLECTIONS } from '@/types/types'

import { useTranslations } from 'next-intl'

export default function Collections() {
  const t = useTranslations('names')

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
