import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";
import TileFilters from "@/components/catalog/tile-filters";
import { TileList } from "@/components/catalog/tile-list";
import { routing } from "@/i18n/routing";
import { prisma } from "@/lib/prisma-client";

import { unstable_cache } from "next/cache";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const revalidate = 600;

export default async function CatalogPage() {
  const [collections, surfaces, sizes, features, color, outdoorIndoor] =
    await Promise.all([
      getCollectionsCached(),
      getSurfacesCached(),
      getSizesCached(),
      getFeaturesCached(),
      getColorsCached(),
      getOutdoorIndoorCached(),
    ]);

  return (
    <div>
      <Breadcrumbs />

      <div className="relative flex flex-row">
        <div className="hidden lg:block">
          <TileFilters
            outdoorIndoor={outdoorIndoor}
            colors={color}
            collections={collections}
            surfaces={surfaces}
            sizes={sizes}
            features={features}
          />
        </div>

        <TileList />
      </div>
    </div>
  );
}

const getCollectionsCached = unstable_cache(
  () => prisma.collection.findMany({ orderBy: { name: "asc" } }),
  ["collections"],
  { revalidate: 86400 }
);

const getSurfacesCached = unstable_cache(
  () => prisma.surface.findMany({ orderBy: { name: "asc" } }),
  ["surfaces"],
  { revalidate: 86400 }
);

const getSizesCached = unstable_cache(
  () => prisma.size.findMany({ orderBy: { name: "asc" } }),
  ["sizes"],
  { revalidate: 86400 }
);

const getFeaturesCached = unstable_cache(
  () => prisma.feature.findMany({ orderBy: { name: "asc" } }),
  ["features"],
  { revalidate: 86400 }
);

const getColorsCached = unstable_cache(
  () => prisma.color.findMany({ orderBy: { name: "asc" } }),
  ["colors"],
  { revalidate: 86400 }
);

const getOutdoorIndoorCached = unstable_cache(
  () => prisma.outdoorIndoor.findMany({ orderBy: { name: "asc" } }),
  ["outdoorIndoor"],
  { revalidate: 86400 }
);
