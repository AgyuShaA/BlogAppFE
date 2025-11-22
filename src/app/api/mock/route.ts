import { prisma } from "@/lib/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const tiles = await prisma.tile.findMany({
    select: {
      id: true,
      name: true,
      imageUrl: true,
      collectionId: true,
      outdoorIndoorId: true,
      createdAt: true,
      updatedAt: true,

      collection: {
        select: {
          id: true,
          name: true,
        },
      },
      sizes: {
        select: {
          size: true, // assuming `size` is a relation field
        },
      },
      surfaces: {
        select: {
          surface: true, // assuming `surface` is a relation field
        },
      },
      features: {
        select: {
          feature: true, // assuming `feature` is a relation field
        },
      },
      colors: {
        select: {
          color: true, // assuming `color` is a relation field
        },
      },
      outdoorIndoor: {
        select: {
          id: true,
          name: true,
          // any other fields
        },
      },
    },
  });

  return NextResponse.json(tiles);
}
