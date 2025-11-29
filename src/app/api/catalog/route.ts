import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma-client'

export const dynamic = 'force-static'

export const revalidate = 600

export async function GET() {
  try {
    const [tiles, collections, surfaces, sizes, features, colors, outdoorIndoor] = await Promise.all([
      prisma.tile.findMany({
        include: {
          collection: true,
          outdoorIndoor: true,
          colors: { include: { color: true } },
          features: { include: { feature: true } },
          sizes: { include: { size: true } },
          surfaces: { include: { surface: true } },
        },
        orderBy: { name: 'asc' },
      }),
      prisma.collection.findMany({ orderBy: { name: 'asc' } }),
      prisma.surface.findMany({ orderBy: { name: 'asc' } }),
      prisma.size.findMany({ orderBy: { name: 'asc' } }),
      prisma.feature.findMany({ orderBy: { name: 'asc' } }),
      prisma.color.findMany({ orderBy: { name: 'asc' } }),
      prisma.outdoorIndoor.findMany({ orderBy: { name: 'asc' } }),
    ])

    return NextResponse.json({
      tiles,
      collections,
      surfaces,
      sizes,
      features,
      colors,
      outdoorIndoor,
    })
  } catch (error) {
    console.error('Failed to fetch catalog data:', error)
    return NextResponse.json({ error: 'Failed to fetch catalog data' }, { status: 500 })
  }
}
