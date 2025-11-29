'use client'
/* eslint-disable */

import { Tile, Option } from '@/types/types'
import { useState, useEffect, startTransition } from 'react'
import Image from 'next/image'
import { useFilterStore } from '@/store/useFilterStore'
import { useTileStore } from '@/store/useTileStore'
import { toast } from 'react-toastify'

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import { updateTileApi } from '../apis/apis'
import { getTileTranslations } from '../catalog/some'
import { useUpdateTileMutation } from '@/service/queries/use-tile-query'

interface UpdateTileModalProps {
  tile: Tile
  onClose: () => void
}

export const UpdateTileModal = ({ tile, onClose }: UpdateTileModalProps) => {
  const updateTileMutation = useUpdateTileMutation()

  const [file, setFile] = useState<File | null>(null)
  const collections = useFilterStore((state) => state.collectionsList)
  const sizes = useFilterStore((state) => state.sizesList)
  const surfaces = useFilterStore((state) => state.surfacesList)

  const t = useTranslations('names')
  const to = useTranslations('options')

  const [nameEn, setNameEn] = useState<string>('')
  const [nameNl, setNameNl] = useState<string>('')

  const [name, setName] = useState(tile.name)

  const features = useFilterStore((state) => state.featuresList)
  const colors = useFilterStore((state) => state.colorsList)
  const outdoorIndoor = useFilterStore((state) => state.outdoorIndoorList)

  const [loading, setLoading] = useState(false)

  const [selectedCollection, setSelectedCollection] = useState<number[]>(tile.collection ? [tile.collection.id] : [])
  const [selectedSizes, setSelectedSizes] = useState<number[]>(
    tile.sizes?.map((s: any) => s.size.id) || [], // FIXED
  )
  const [selectedSurface, setSelectedSurface] = useState<number[]>(
    tile.surfaces?.map((f: any) => f.surface.id) || [], // FIXED
  )

  const [selectedFeatures, setSelectedFeatures] = useState<number[]>(
    tile.features?.map((f: any) => f.feature.id) || [], // FIXED
  )
  const [selectedColors, setSelectedColors] = useState<number[]>(
    tile.colors?.map((c: any) => c.color.id) || [], // already correct
  )
  const [selectedOutdoorIndoor, setSelectedOutdoorIndoor] = useState<number[]>(
    tile.outdoorIndoor ? [tile.outdoorIndoor.id] : [],
  )

  useEffect(() => {
    setName(tile.name)
    setSelectedCollection(tile.collection ? [tile.collection.id] : [])
    setSelectedSizes(tile.sizes?.map((s: any) => s.size.id) || [])
    setSelectedSurface(tile.surfaces?.map((f: any) => f.surface.id) || [])
    setSelectedFeatures(tile.features?.map((f: any) => f.feature.id) || [])
    setSelectedColors(tile.colors?.map((c: any) => c.color.id) || [])
    setSelectedOutdoorIndoor(tile.outdoorIndoor ? [tile.outdoorIndoor.id] : [])

    const { en, nl } = getTileTranslations(tile.name)
    setNameEn(en)
    setNameNl(nl)
  }, [tile])

  const renderSelectWithTags = (
    single: boolean,
    label: string,
    options: Option[],
    selected: number[],
    setter: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    return (
      <div className='mb-2'>
        <label className='font-semibold mb-1 block'>{label}</label>
        <Select
          onValueChange={(value) => {
            const id = Number(value)
            if (single) setter([id])
            else if (!selected.includes(id)) setter([...selected, id])
          }}
          value=''
        >
          <SelectTrigger className='w-full mb-2 cursor-pointer'>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>

          <SelectContent>
            {options
              .filter((o) => !selected.includes(o.id)) // hide already selected
              .map((o) => (
                <SelectItem key={o.id} value={String(o.id)} className='cursor-pointer'>
                  {'hex' in o ? `${to(o.name || '')} (${o.hex})` : to(o.name || '')}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        <div className='flex flex-wrap gap-2'>
          {selected.map((id) => {
            const item = options.find((o) => o.id === id)!
            return (
              <div
                key={id}
                className='flex items-center gap-1 px-2 py-1 cursor-pointer rounded border bg-gray-200'
                onClick={() => setter(single ? [] : selected.filter((s) => s !== id))}
              >
                <span>{to(item?.name || '')}</span>
                <button type='button' className='ml-1 cursor-pointer font-bold text-sm'>
                  ×
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append('id', tile.id.toString())

    formData.append('name', name)
    if (file) formData.append('file', file)
    if (selectedCollection.length) formData.append('collection', selectedCollection[0].toString())

    if (selectedSizes.length) formData.append('sizes', JSON.stringify(selectedSizes))

    if (selectedSurface.length) formData.append('surfaces', JSON.stringify(selectedSurface))

    if (selectedFeatures.length) formData.append('features', JSON.stringify(selectedFeatures))

    if (selectedColors.length) formData.append('colors', JSON.stringify(selectedColors))

    if (selectedOutdoorIndoor.length) formData.append('outdoorIndoor', selectedOutdoorIndoor[0].toString())

    if (selectedColors.length) formData.append('colors', JSON.stringify(selectedColors))

    if (selectedOutdoorIndoor.length) formData.append('outdoorIndoor', selectedOutdoorIndoor[0].toString())

    formData.append('englishName', nameEn)
    formData.append('niderlandName', nameNl)

    try {
      startTransition(() => {
        updateTileMutation.mutate(formData)
        onClose()
      })
    } catch (err) {
      console.error(err)

      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='  flex items-center flex-col justify-center z-50'>
      {' '}
      <h2 className='text-center text-2xl'>{t(tile.name)}</h2>
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
        className=' p-6 rounded   relative overflow-y-auto max-h-[90vh]'
      >
        <form className='space-y-4' onSubmit={handleSubmit}>
          <label className='font-semibold mb-1 my-4 block'>Name - key</label>

          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border rounded cursor-pointer w-full px-2 py-1'
            placeholder='Tile name'
          />
          <label className='font-semibold mb-1 my-4 block'>En translation</label>

          <input
            type='text'
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className='border rounded cursor-pointer w-full px-2 py-1'
            placeholder='English name'
          />
          <label className='font-semibold mb-1 my-4 block'>Nl translation</label>

          <input
            type='text'
            value={nameNl}
            onChange={(e) => setNameNl(e.target.value)}
            className='border rounded cursor-pointer w-full px-2 py-1'
            placeholder='Dutch name'
          />

          <label className='font-semibold mb-1 my-4 block'>Image</label>

          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='border cursor-pointer rounded w-full px-2 py-1'
          />

          {tile.imageUrl && !file && (
            <div className='mt-2 relative w-full h-40'>
              <Image src={tile.imageUrl} alt={tile.name} fill className='object-contain rounded border' />
            </div>
          )}
          {file && (
            <div className='mt-2 relative w-full h-40'>
              <Image src={URL.createObjectURL(file)} alt='Preview' fill className='object-contain rounded border' />
            </div>
          )}

          {renderSelectWithTags(true, 'Collection', collections, selectedCollection, setSelectedCollection)}
          {renderSelectWithTags(false, 'Sizes', sizes, selectedSizes, setSelectedSizes)}
          {renderSelectWithTags(false, 'Surface', surfaces, selectedSurface, setSelectedSurface)}
          {renderSelectWithTags(false, 'Features', features, selectedFeatures, setSelectedFeatures)}

          {/* Colors as before */}
          <label className='font-semibold mb-1 my-4 block'>Color</label>

          <div className='flex flex-wrap gap-2 '>
            {colors.map((c) => (
              <div
                key={c.id}
                className={`w-6 h-6 rounded border cursor-pointer ${
                  selectedColors.includes(c.id) ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                onClick={() => {
                  if (selectedColors.includes(c.id)) {
                    setSelectedColors(selectedColors.filter((id) => id !== c.id))
                  } else {
                    setSelectedColors([...selectedColors, c.id])
                  }
                }}
              />
            ))}
          </div>

          {renderSelectWithTags(true, 'Outdoor/Indoor', outdoorIndoor, selectedOutdoorIndoor, setSelectedOutdoorIndoor)}

          <Button type='submit' className='w-full  cursor-pointer text-white py-2 rounded '>
            {loading ? 'Updating...' : 'Update Tile'}
          </Button>
        </form>
      </div>
    </div>
  )
}
