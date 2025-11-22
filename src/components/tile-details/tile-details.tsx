"use client";
/* eslint-disable */

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Tile } from "@/types/types";
import { Breadcrumbs } from "../bread-scrums/bread-scrums";

interface TileDetailsProps {
  tile: Tile;
}

export default function TileDetails({ tile }: TileDetailsProps) {
  const t = useTranslations("names");
  const to = useTranslations("options");

  return (
    <div className="w-full space-y-6">
      <Breadcrumbs />

      {/* Title */}
      <h1 className="text-3xl font-semibold">{t(tile.name)}</h1>

      {/* Large image */}
      <div className="relative   rounded-md overflow-hidden">
        <Image
          src={tile.imageUrl ?? "/placeholder.png"}
          alt={tile.name}
          width={300}
          height={300}
          className="object-cover"
        />
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800 text-lg">
        <div>
          <h2 className="font-semibold mb-2">{to("collections")}</h2>
          <p>{to(tile.collection?.name || "")}</p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">{to("sizes")}</h2>
          <p>
            {tile?.sizes && tile.sizes.map((s: any) => s.size.name).join(", ")}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">{to("surfaces")}</h2>
          <p>
            {tile?.surfaces &&
              tile?.surfaces.map((s: any) => to(s.surface.name)).join(", ")}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">{to("features")}</h2>
          <p>
            {tile?.features &&
              tile.features.map((f: any) => to(f.feature.name)).join(", ")}
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">{to("colors")}</h2>
          <div className="flex gap-2">
            {tile.colors &&
              tile.colors.map((c: any) => (
                <div
                  key={c.color.id}
                  className="w-8 h-8 rounded border"
                  style={{ backgroundColor: c.color.hex }}
                />
              ))}
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">{to("outdoorIndoor")}</h2>
          <p>{to(tile.outdoorIndoor?.name || "")}</p>
        </div>
      </div>
    </div>
  );
}
