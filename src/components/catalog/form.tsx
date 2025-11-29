'use client'
import { useState, useTransition, useEffect, useRef } from 'react'

import { ColorOption, Option } from '@/types/types'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { useFilterStore } from '@/store/useFilterStore'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import { useCreateTileMutation } from '@/service/queries/use-tile-query'

function isColorOption(o: Option | ColorOption): o is ColorOption {
  return (o as ColorOption).hex !== undefined
}

interface IProps {
  onClose: () => void
}

export default function CreatePostForm({ onClose }: IProps) {
  const createTileMutation = useCreateTileMutation()

  const to = useTranslations('options')

  const [name, setName] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [englishName, setEnglishName] = useState<string>('')
  const [niderlandName, setNiderlandName] = useState<string>('')

  const [isPending, startTransition] = useTransition()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const collections = useFilterStore((s) => s.collectionsList)
  const sizes = useFilterStore((s) => s.sizesList)
  const surfaces = useFilterStore((s) => s.surfacesList)
  const features = useFilterStore((s) => s.featuresList)
  const colors = useFilterStore((s) => s.colorsList)
  const outdoorIndoor = useFilterStore((s) => s.outdoorIndoorList)

  const [selectedCollections, setSelectedCollections] = useState<number[]>([])
  const [selectedSizes, setSelectedSizes] = useState<number[]>([])
  const [selectedSurfaces, setSelectedSurfaces] = useState<number[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>([])
  const [selectedColors, setSelectedColors] = useState<number[]>([])
  const [selectedOutdoorIndoor, setSelectedOutdoorIndoor] = useState<number[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url) // cleanup previous preview
  }, [file])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log()

    if (!name || !file || !englishName || !niderlandName) {
      toast.error('Names, translations and image are required')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('file', file)
    formData.append('collections', JSON.stringify(selectedCollections))
    formData.append('sizes', JSON.stringify(selectedSizes))
    formData.append('surfaces', JSON.stringify(selectedSurfaces))
    formData.append('features', JSON.stringify(selectedFeatures))
    formData.append('colors', JSON.stringify(selectedColors))
    formData.append('outdoorIndoor', JSON.stringify(selectedOutdoorIndoor))
    formData.append('englishName', englishName)
    formData.append('niderlandName', niderlandName)

    formData.append('colors', JSON.stringify(selectedColors))
    formData.append('outdoorIndoor', JSON.stringify(selectedOutdoorIndoor))

    startTransition(async () => {
      try {
        startTransition(() => {
          createTileMutation.mutate(formData)
          setFile(null)
          onClose()
        })

        if (fileInputRef.current) fileInputRef.current.value = ''

        // eslint-disable-next-line
      } catch (error: any) {
        toast.error(error.message || 'Something went wrong')
      }
    })
  }

  const renderSelectWithTags = (
    single: boolean,
    label: string,
    options: Option[] | ColorOption[],
    selected: number[],
    setter: React.Dispatch<React.SetStateAction<number[]>>,
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value)
      if (single) setter([value])
      else if (!selected.includes(value)) setter([...selected, value])
    }

    return (
      <div className='mb-2'>
        <label className='font-semibold mb-1 block'>{label}</label>
        <select
          onChange={handleChange}
          value={single ? selected[0] ?? '' : ''}
          className='w-full border px-2 py-1 rounded mb-1'
        >
          <option value='' disabled>
            Select {label}
          </option>
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {'hex' in o ? `${to(o.name)} (${o.hex})` : to(o.name)}
            </option>
          ))}
        </select>

        <div className='flex flex-wrap gap-2'>
          {selected.map((id) => {
            const item = options.find((o) => o.id === id)!
            const isColor = isColorOption(item)

            return (
              <div
                key={id}
                className={`flex items-center gap-1 px-2 py-1 cursor-pointer rounded border ${
                  isColor ? '' : 'bg-gray-200'
                }`}
                style={isColor ? { backgroundColor: item.hex, color: '#fff' } : {}}
                onClick={() => setter(single ? [] : selected.filter((s) => s !== id))}
              >
                <span>{to(item.name)}</span>
                <button type='button' className='ml-1 font-bold text-sm'>
                  ×
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className='p-4 w-full font-sans space-y-4'>
      <form onSubmit={handleSubmit} className='flex  flex-col p-2 gap-4 items-start justify-center'>
        <label className='font-semibold mb-1 block'>Name - key</label>

        <div className='w-full'>
          <input
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='border px-2 py-1 rounded w-full'
          />
        </div>

        <label className='font-semibold mb-1 block'>En translation</label>

        <div className='w-full '>
          <input
            type='text'
            placeholder='English Name'
            value={englishName}
            onChange={(e) => setEnglishName(e.target.value)}
            className='border px-2 py-1 rounded w-full'
          />
        </div>

        <label className='font-semibold mb-1 block'>Nl translation</label>

        <div className='w-full '>
          <input
            type='text'
            placeholder='Dutch Name'
            value={niderlandName}
            onChange={(e) => setNiderlandName(e.target.value)}
            className='border px-2 py-1 rounded w-full'
          />
        </div>
        {/* File */}
        <label className='font-semibold mb-1 block'>Image</label>

        <div className='w-full '>
          <input
            type='file'
            ref={fileInputRef}
            accept='image/*'
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className='border px-2 py-1 rounded w-full'
          />
          {previewUrl && (
            <Image
              src={previewUrl}
              width={500}
              height={500}
              alt='Preview'
              className='mt-2 max-h-40 object-contain border rounded'
            />
          )}
        </div>

        {/* Selects */}
        <div className='w-full '>
          {renderSelectWithTags(true, 'Collection', collections, selectedCollections, setSelectedCollections)}
        </div>
        <div className='w-full '>{renderSelectWithTags(false, 'Sizes', sizes, selectedSizes, setSelectedSizes)}</div>
        <div className='w-full '>
          {renderSelectWithTags(false, 'Surface', surfaces, selectedSurfaces, setSelectedSurfaces)}
        </div>
        <div className='w-full '>
          {renderSelectWithTags(false, 'Features', features, selectedFeatures, setSelectedFeatures)}
        </div>
        <div className='w-full  flex flex-col flex-wrap '>
          <label className='font-semibold mb-1 block'>Colors</label>
          <div className='flex flex-row flex-wrap'>
            {colors.map((c) => (
              <div
                key={c.id}
                className={`w-6 h-6 flex flex-row rounded m-1 border cursor-pointer ${
                  selectedColors.includes(c.id) ? 'ring-3 ring-green-600' : ''
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
        </div>

        <div className='w-full '>
          {renderSelectWithTags(true, 'Outdoor/Indoor', outdoorIndoor, selectedOutdoorIndoor, setSelectedOutdoorIndoor)}
        </div>

        <div className='w-full flex items-center justify-center px-5'>
          <Button
            type='submit'
            disabled={isPending}
            className='bg-blue-500 w-full text-white px-3 py-1 rounded hover:bg-blue-600 mt-2 flex items-center gap-2'
          >
            {isPending ? 'Creating...' : 'Create Tile'}
          </Button>
        </div>
      </form>
    </div>
  )
}
