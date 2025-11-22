import { routing } from "@/i18n/routing";
import { COLLECTIONS } from "@/types/types";

import { prisma } from "@/lib/prisma-client";
import { TileCard } from "@/components/catalog/tile-card";
import { Breadcrumbs } from "@/components/bread-scrums/bread-scrums";

interface IProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COLLECTIONS.map((item) => ({
      locale,
      slug: item.slug,
    }))
  );
}

export default async function Page({ params }: IProps) {
  const { slug } = await params;

  // Find collection data
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return <div>Not found</div>;
  }

  const tiles = await prisma.tile.findMany({
    where: {
      collection: {
        name: collection.dbName,
      },
    },
    include: {
      sizes: {
        include: {
          size: true,
        },
      },
      colors: {
        include: {
          color: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center  w-full px-[5%] md:px-[2%]">
      <Breadcrumbs />

      <h1 className="text-3xl md:text-5xl mb-8">{collection.label}</h1>
      {tiles.length === 0 ? (
        <p>No tiles found.</p>
      ) : (
        <div className="flex mb-20 flex-wrap justify-center gap-6 w-full">
          {tiles.map((tile) => (
            /* eslint-disable */
            <TileCard key={tile.id} tile={tile as any} />
          ))}
        </div>
      )}
    </div>
  );
}
