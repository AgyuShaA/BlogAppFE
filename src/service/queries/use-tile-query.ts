import { createTile, deleteTileApi, fetchCatalog, fetchTiles, updateTileApi } from '@/components/apis/apis'
import { queryOptions, useMutation } from '@tanstack/react-query'
import { getQueryClient } from '../tanstack/get-query'
import { toast } from 'react-toastify'
import { CatalogResponse, Tile } from '@/types/types'

/* eslint-disable */
export const catalogQueryOptions = queryOptions<CatalogResponse>({
  queryKey: ['catalog'],
  queryFn: fetchCatalog,
})

export const tilesQueryOptions = queryOptions<Tile[]>({
  queryKey: ['tiles'],
  queryFn: fetchTiles,
})

export const useCreateTileMutation = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: createTile,
    onSuccess: () => {
      toast.success('Tile created')
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
    onError: (err: any) => toast.error(err.message),
  })
}

export const useUpdateTileMutation = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: updateTileApi,
    onSuccess: () => {
      toast.success('Tile updated')
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
    onError: (err: any) => toast.error(err.message),
  })
}

export const useDeleteTileMutation = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: deleteTileApi,
    onSuccess: () => {
      toast.success('Tile deleted')
      queryClient.invalidateQueries({ queryKey: ['tiles'] })
    },
    onError: (err: any) => toast.error(err.message),
  })
}
