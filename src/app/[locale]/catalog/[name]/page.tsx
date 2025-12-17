'use cache'

import TileDetails from '@/components/tile-details/tile-details'
import { routing } from '@/i18n/routing'
import { getTiles, getTileByName } from '@/lib/get-tiles-list'
import { notFound } from 'next/navigation'
import { Tile } from '@/types/types'
import { Metadata } from 'next'

interface IProps {
  params: Promise<{ locale: string; name: string }>
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const tile = await getTileByName((await params).name)

  if (!tile) {
    return {
      title: 'Product Not Found — ProBouwStore',
    }
  }

  return {
    title: `${tile.name} — Buy Premium Tiles | ProBouwStore`,
    description: tile.name || 'High-quality tile available at ProBouwStore.',
    keywords: tile.surfaces.map((e) => e.surface.name) || [],
    openGraph: {
      title: `${tile.name} — ProBouwStore`,
      description: tile.name,
      url: `https://www.probouwstore.com/products/${(await params).name}`,

      images: [
        {
          url: tile.imageUrl || 'https://www.probouwstore.com/main-page/1.webp',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: ['https://www.probouwstore.com/main-page/1.webp'],
    },
  }
}

export async function generateStaticParams() {
  const tiles = await getTiles()
  const locales = routing.locales

  return locales.flatMap((locale) =>
    tiles.map((tile) => ({
      locale,
      name: tile.name,
    })),
  )
}

export default async function TilePage({ params }: IProps) {
  const { name } = await params

  const tile = (await getTileByName(name)) as Tile
  if (!tile) return notFound()

  return (
    <div className='max-w-[1280px] mx-auto px-[2%] w-full py-8'>
      <TileDetails tile={tile} />
    </div>
  )
}
