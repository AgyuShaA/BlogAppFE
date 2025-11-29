'use client'

import Image from 'next/image'

import { useTranslations } from 'next-intl'
import { Tile } from '@/types/types'
import { getTileTranslations } from './some'

interface Props {
  tile: Tile
}

export default function ViewTile({ tile }: Props) {
  const tn = useTranslations('names')
  const to = useTranslations('options')

  const name = getTileTranslations(tile.name)

  return (
    <div className='space-y-6'>
      {/* IMAGE */}
      <div className='flex w-full items-center justify-center'>
        <Image
          src={tile.imageUrl || ''}
          alt={tile.name}
          width={300}
          height={300}
          className='object-contain rounded border'
        />
      </div>

      {/* NAME */}
      <div>
        <h3 className='text-xl font-semibold'>{tn(tile.name)}</h3>
        <p className='text-gray-500 text-sm'>Original name: {tile.name}</p>

        {/* FORCED TRANSLATIONS */}
        <div className='mt-2 space-y-1 text-sm'>
          <p>
            <span className='font-semibold'>English:</span> {name.en}
          </p>
          <p>
            <span className='font-semibold'>Dutch:</span> {name.nl}
          </p>
        </div>
      </div>

      {/* COLLECTION */}
      {tile.collection && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Collection</h4>
          <div className='px-3 py-1 rounded border inline-block'>{to(tile.collection.name)}</div>
        </div>
      )}

      {/* SIZES */}
      {!!tile.sizes?.length && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Sizes</h4>
          <div className='flex flex-wrap gap-2'>
            {tile.sizes.map((s) => (
              <span key={s.size.id} className='px-3 py-1 border rounded text-sm bg-gray-50'>
                {to(s.size.name)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SURFACES */}
      {!!tile.surfaces?.length && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Surface</h4>
          <div className='flex flex-wrap gap-2'>
            {tile.surfaces.map((s) => (
              <span key={s.surface.id} className='px-3 py-1 border rounded text-sm bg-gray-50'>
                {to(s.surface.name)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* FEATURES */}
      {!!tile.features?.length && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Features</h4>
          <div className='flex flex-wrap gap-2'>
            {tile.features.map((f) => (
              <span key={f.feature.id} className='px-3 py-1 border rounded text-sm bg-gray-50'>
                {to(f.feature.name)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* COLORS */}
      {!!tile.colors?.length && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Colors</h4>
          <div className='flex gap-2 flex-wrap'>
            {tile.colors.map((c) => (
              <span
                key={c.color.id}
                className='w-6 h-6 rounded border'
                style={{ backgroundColor: c.color.hex }}
                title={c.color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* OUTDOOR / INDOOR */}
      {tile.outdoorIndoor?.name && (
        <div>
          <h4 className='font-semibold text-sm mb-1'>Outdoor / Indoor</h4>
          <span className='px-3 py-1 border rounded text-sm bg-gray-50'>{to(tile.outdoorIndoor.name)}</span>
        </div>
      )}
    </div>
  )
}
