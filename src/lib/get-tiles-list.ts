import { prisma } from '@/lib/prisma-client'

export const getTileFilterData = async () => {
  const [collections, surfaces, sizes, features, colors, outdoorIndoor] = await Promise.all([
    prisma.collection.findMany({ orderBy: { name: 'asc' } }),
    prisma.surface.findMany({ orderBy: { name: 'asc' } }),
    prisma.size.findMany({ orderBy: { name: 'asc' } }),
    prisma.feature.findMany({ orderBy: { name: 'asc' } }),
    prisma.color.findMany({ orderBy: { name: 'asc' } }),
    prisma.outdoorIndoor.findMany({ orderBy: { name: 'asc' } }),
  ])

  return {
    collections,
    surfaces,
    sizes,
    features,
    colors,
    outdoorIndoor,
  }
}

export async function getTile(id: number) {
  return prisma.tile.findUnique({
    where: { id },
    include: {
      collection: true,
      sizes: {
        include: { size: true },
      },
      surfaces: {
        include: { surface: true },
      },
      features: {
        include: { feature: true },
      },
      colors: {
        include: { color: true },
      },
      outdoorIndoor: true,
    },
  })
}

export async function getTileByName(name: string) {
  return prisma.tile.findFirst({
    where: { name },
    include: {
      collection: true,
      sizes: { include: { size: true } },
      surfaces: { include: { surface: true } },
      features: { include: { feature: true } },
      colors: { include: { color: true } },
      outdoorIndoor: true,
    },
  })
}

export async function getTiles() {
  return prisma.tile.findMany({
    include: {
      collection: true,
      sizes: {
        include: { size: true },
      },
      surfaces: {
        include: { surface: true },
      },
      features: {
        include: { feature: true },
      },
      colors: {
        include: { color: true },
      },
      outdoorIndoor: true,
    },
  })
}
