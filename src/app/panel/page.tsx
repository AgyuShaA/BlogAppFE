import CreatePostForm from "@/components/catalog/form";
import TileFilters from "@/components/catalog/tile-filters";

import { prisma } from "@/lib/prisma-client";

export default async function catalogPage() {
  const [collections, surfaces, sizes, features, color, outdoorIndoor] =
    await Promise.all([
      prisma.collection.findMany({ orderBy: { name: "asc" } }),
      prisma.surface.findMany({ orderBy: { name: "asc" } }),
      prisma.size.findMany({ orderBy: { name: "asc" } }),
      prisma.feature.findMany({ orderBy: { name: "asc" } }),
      prisma.color.findMany({ orderBy: { name: "asc" } }),
      prisma.outdoorIndoor.findMany({ orderBy: { name: "asc" } }),
    ]);

  return (
    <div className="relative flex flex-row ">
      <div className="hidden md:block">
        <TileFilters
          outdoorIndoor={outdoorIndoor}
          colors={color}
          collections={collections}
          surfaces={surfaces}
          sizes={sizes}
          features={features}
        />
      </div>

      <CreatePostForm
        outdoorIndoor={outdoorIndoor}
        colors={color}
        collections={collections}
        surfaces={surfaces}
        sizes={sizes}
        features={features}
      />
    </div>
  );
}
