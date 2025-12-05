import { routing } from '@/i18n/routing'
import { COLLECTIONS } from '@/types/types'

import { prisma } from '@/lib/prisma-client'
import { TileCard } from '@/components/catalog/tile-card'
import { Breadcrumbs } from '@/components/bread-scrums/bread-scrums'

import { unstable_cache } from 'next/cache'
import { Metadata } from 'next'

interface IProps {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-static'

export const revalidate = 600

const getTiles = (dbName: string) =>
  unstable_cache(async () => {
    return prisma.tile.findMany({
      where: { collection: { name: dbName } },
      include: {
        sizes: { include: { size: true } },
        colors: { include: { color: true } },
      },
    })
  })()

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COLLECTIONS.map((item) => ({
      locale,
      slug: item.slug,
    })),
  )
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const { slug } = await params

  const collection = COLLECTIONS.find((c) => c.slug === slug)

  if (!collection) {
    return { title: 'Collection Not Found — ProBouwStore' }
  }

  return {
    title: `${collection.label} Tiles — ProBouwStore`,
    description: `Explore ${collection.label.toLowerCase()} tiles in all sizes, styles, and finishes.`,
    openGraph: {
      title: `${collection.label} Tiles — ProBouwStore`,
      description: `Discover premium ${collection.label.toLowerCase()} tiles suitable for any interior or exterior project.`,
      url: `https://www.probouwstore.com/collections/${slug}`,
      images: ['https://www.probouwstore.com/main-page/1.webp'],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://www.probouwstore.com/main-page/1.webp'],
    },
  }
}

export default async function Page({ params }: IProps) {
  const { slug } = await params

  const collection = COLLECTIONS.find((c) => c.slug === slug)

  if (!collection) {
    return <div>Not found</div>
  }

  const tiles = await getTiles(collection.dbName)

  return (
    <div className='flex flex-col items-center  w-full px-[5%] md:px-[2%]'>
      <Breadcrumbs />

      <h1 className='text-3xl md:text-5xl mb-8'>{collection.label}</h1>
      {tiles.length === 0 ? (
        <p>No tiles found.</p>
      ) : (
        <div className='flex mb-20 flex-wrap justify-center gap-6 w-full'>
          {tiles.map((tile) => (
            /* eslint-disable */
            <TileCard key={tile.id} tile={tile as any} />
          ))}
        </div>
      )}
    </div>
  )
}
