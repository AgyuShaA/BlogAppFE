import { prisma } from "@/lib/prisma-client";
import { unstable_cache } from "next/cache";

export const getTileFilterData = unstable_cache(
  async () => {
    const [collections, surfaces, sizes, features, colors, outdoorIndoor] =
      await Promise.all([
        prisma.collection.findMany({ orderBy: { name: "asc" } }),
        prisma.surface.findMany({ orderBy: { name: "asc" } }),
        prisma.size.findMany({ orderBy: { name: "asc" } }),
        prisma.feature.findMany({ orderBy: { name: "asc" } }),
        prisma.color.findMany({ orderBy: { name: "asc" } }),
        prisma.outdoorIndoor.findMany({ orderBy: { name: "asc" } }),
      ]);

    return {
      collections,
      surfaces,
      sizes,
      features,
      colors,
      outdoorIndoor,
    };
  },
  ["tile_filters_all"],
  { revalidate: 86400 }
);
