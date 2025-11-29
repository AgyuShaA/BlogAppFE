'use client'

import { useState, useMemo } from 'react'
import TileModals from './admin-modals'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'

import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'
import { useQuery } from '@tanstack/react-query'
import { tilesQueryOptions } from '@/service/queries/use-tile-query'
import Image from 'next/image'

const ITEMS_PER_PAGE = 30

const TileListPage = () => {
  const { data: tiles = [] } = useQuery(tilesQueryOptions)

  const tn = useTranslations('names')
  const to = useTranslations('options')

  const [page, setPage] = useState(1)
  const [modal, setModal] = useState<'view' | 'edit' | 'create' | 'delete' | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [sortBy, setSortBy] = useState<'name' | 'collection' | null>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const toggleSort = (column: 'name' | 'collection') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const sortedTiles = useMemo(() => {
    const sorted = [...tiles]

    if (sortBy === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name) * (sortOrder === 'asc' ? 1 : -1))
    }

    if (sortBy === 'collection') {
      sorted.sort((a, b) => {
        const colA = a.collection?.name || ''
        const colB = b.collection?.name || ''
        return colA.localeCompare(colB) * (sortOrder === 'asc' ? 1 : -1)
      })
    }

    return sorted
  }, [tiles, sortBy, sortOrder])

  const closeModal = () => setModal(null)

  // total pages
  const totalPages = Math.ceil(tiles.length / ITEMS_PER_PAGE)

  // slice only visible tiles
  const paginatedTiles = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE
    return sortedTiles.slice(start, start + ITEMS_PER_PAGE)
  }, [sortedTiles, page])

  const nextPage = () => page < totalPages && setPage(page + 1)
  const prevPage = () => page > 1 && setPage(page - 1)

  const openModal = (type: 'view' | 'edit' | 'create' | 'delete', id?: number) => {
    setSelectedId(id ?? null)
    setModal(type)
  }

  return (
    <div className='w-screen max-w-5xl'>
      <TileModals modal={modal} selectedId={selectedId} onClose={closeModal} />

      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-center text-4xl'>Admin Panel</h2>

        <Button className='cursor-pointer' onClick={() => openModal('create')}>
          Add Tile
        </Button>
      </div>

      <table className='w-full border-collapse'>
        <thead>
          <tr className='border-b mb-4'>
            <th>Image</th>

            <th className='cursor-pointer' onClick={() => toggleSort('name')}>
              Name {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>

            <th className='cursor-pointer' onClick={() => toggleSort('collection')}>
              Collection {sortBy === 'collection' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
            </th>

            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTiles.map((tile) => (
            <tr key={tile.id} className='border-b'>
              <td className='p-2 text-center flex w-full items-center justify-center'>
                <Image
                  width={48}
                  height={48}
                  src={tile.imageUrl || ''}
                  className='h-12 w-12 object-cover rounded border'
                  alt={tile.name}
                />
              </td>

              <td className='p-2 truncate text-center'>{tn(tile.name)}</td>

              <td className='p-2 truncate text-center'>{to(tile.collection?.name || '') ?? '-'}</td>

              <td className='p-2 text-center'>
                <div className='h-full w-full flex items-center justify-center'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className=' cursor-pointer
      flex items-center gap-1 px-3 py-1.5 
      rounded-md border border-gray-200 
      text-sm text-gray-600 
      hover:bg-gray-100 transition
    '
                      >
                        Actions
                        <MoreHorizontal className='h-4 w-4' />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='center' className='w-32'>
                      <DropdownMenuItem className='cursor-pointer' onClick={() => openModal('view', tile.id)}>
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem className='cursor-pointer' onClick={() => openModal('edit', tile.id)}>
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => openModal('delete', tile.id)}
                        className='text-red-600 focus:text-red-600 cursor-pointer'
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className='flex justify-center items-center mt-6 gap-4'>
        <button
          onClick={prevPage}
          disabled={page === 1}
          className='px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50'
        >
          Prev
        </button>

        <span className='font-medium'>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={page === totalPages}
          className='px-3 py-1 cursor-pointer bg-gray-200 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default TileListPage
