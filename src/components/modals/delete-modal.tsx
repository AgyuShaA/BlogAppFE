'use client'

import { Tile } from '@/types/types'
import { startTransition, useState } from 'react'
import { useDeleteTileMutation } from '@/service/queries/use-tile-query'

interface DeleteTileModalProps {
  tile: Tile | undefined
  onClose: () => void
}

export const DeleteTileModal = ({ tile, onClose }: DeleteTileModalProps) => {
  const [loading, setLoading] = useState(false)
  const deleteTileMutation = useDeleteTileMutation()
  if (!tile) return null

  const handleDelete = async () => {
    setLoading(true)
    try {
      startTransition(() => {
        deleteTileMutation.mutate(tile.id)
        onClose()
      })
    } catch (error) {
      console.error('Failed to delete tile:', error)
      // optionally show toast/error notification here
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=' p-6 relative'>
      <h2 className='text-lg font-semibold mb-4'>Delete Tile {tile.name}?</h2>

      <p className='mb-4 text-gray-600'>Are you sure you want to delete this tile? This action cannot be undone.</p>

      <div className='flex justify-end gap-2'>
        <button className='px-4 py-2 cursor-pointer bg-gray-300 rounded hover:bg-gray-400' disabled={loading}>
          Cancel
        </button>
        <button
          className='px-4 py-2 bg-red-600 cursor-pointer text-white rounded hover:bg-red-700'
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}
