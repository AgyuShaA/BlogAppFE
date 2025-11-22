import { prisma } from "@/lib/prisma-client";
import { notFound } from "next/navigation";

import { Metadata } from "next";
import TileDetails from "@/components/tile-details/tile-details";
import { Tile } from "@/types/types";

interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;

  const tile = await prisma.tile.findFirst({
    where: { name },
    select: { name: true },
  });

  if (!tile) return {};

  return {
    title: tile.name,
    description: tile.name,
  };
}

export default async function TilePage({ params }: PageProps) {
  const { name } = await params;

  const tileDb = await prisma.tile.findFirst({
    where: { name },
    include: {
      collection: true,
      outdoorIndoor: true,
      colors: { include: { color: true } },
      features: { include: { feature: true } },
      sizes: { include: { size: true } },
      surfaces: { include: { surface: true } },
    },
  });

  if (!tileDb) return notFound();

  const tile: Tile = {
    ...tileDb,

    // Fix nullable primitives
    imageUrl: tileDb.imageUrl ?? undefined,

    // Fix nullable relations
    collection: tileDb.collection ?? undefined,
    outdoorIndoor: tileDb.outdoorIndoor ?? undefined,

    // Fix nested lists if needed
    features: tileDb.features ?? [],
    surfaces: tileDb.surfaces ?? [],
    sizes: tileDb.sizes ?? [],
    colors: tileDb.colors ?? [],

    // Fix dates
    createdAt: tileDb.createdAt.toISOString(),
    updatedAt: tileDb.updatedAt.toISOString(),
  };

  if (!tile) return notFound();

  return (
    <div className="max-w-[1280px] mx-auto px-[2%] py-8">
      <TileDetails tile={tile as Tile} />
    </div>
  );
}
