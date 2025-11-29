import { Tile } from '@/types/types'

export function getBaseUrl() {
  // If running in the browser → relative URL works
  if (typeof window !== 'undefined') return ''

  // Running on server → must use absolute URL
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
}

export async function createTile(formData: FormData): Promise<Tile> {
  const base = getBaseUrl()

  const res = await fetch(`${base}/api/tiles`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.error || 'Failed to create tile')
  }

  return res.json()
}
export async function updateTileApi(formData: FormData): Promise<Tile> {
  const base = getBaseUrl()

  const res = await fetch(`${base}/api/tiles`, {
    method: 'PATCH',
    body: formData,
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.error || 'Failed to update tile')
  }

  return res.json()
}
export async function deleteTileApi(tileId: number) {
  const base = getBaseUrl()

  const res = await fetch(`${base}/api/tiles?id=${tileId}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    const error = await res.json().catch(() => null)
    throw new Error(error?.error || 'Failed to delete tile')
  }

  return res.json()
}
export async function fetchTiles(): Promise<Tile[]> {
  const base = getBaseUrl()

  const res = await fetch(`${base}/api/tiles`, {
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch tiles')

  return res.json()
}

export async function fetchCatalog() {
  const base = getBaseUrl()

  const res = await fetch(`${base}/api/catalog`, {
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to fetch catalog')

  return res.json()
}
