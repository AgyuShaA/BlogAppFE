import TileDetails from '@/components/tile-details/tile-details'
import { routing } from '@/i18n/routing'
import { getTiles, getTileByName } from '@/lib/get-tiles-list'
import { notFound } from 'next/navigation'
import { Tile } from '@/types/types'

interface IProps {
  params: Promise<{ locale: string; name: string }>
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
