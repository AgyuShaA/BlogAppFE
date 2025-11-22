import { notFound } from "next/navigation";

import TileDetails from "@/components/tile-details/tile-details";
import { Tile } from "@/types/types";
import { routing } from "@/i18n/routing";
import tiles from "@/app/[locale]/data/tiles.json";

interface PageProps {
  params: Promise<{ name: string }>;
}

export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    tiles.map((t) => ({
      locale,
      name: t.name,
    }))
  );
}

export default async function TilePage({ params }: PageProps) {
  const { name } = await params;

  const tileDb = tiles.find((t) => t.name === name);

  if (!tileDb) return notFound();

  return (
    <div className="max-w-[1280px] mx-auto px-[2%] w-full py-8">
      <TileDetails tile={tileDb as Tile} />
    </div>
  );
}
