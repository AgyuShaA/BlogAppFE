export type Option = { id: number; name: string };
export type ColorOption = { id: number; name: string; hex: string };
export type ColorTileOption = {
  color: { id: number; name: string; hex: string };
};

export type Tile = {
  id: number;
  name: string;
  imageUrl?: string;
  collection?: Option;
  sizes?: { sizeId: number; tileId: number; size: Option }[];
  surfaces?: { surfaceId: number; tileId: number; surface: Option }[];
  outdoorIndoor?: Option;
  features?: { featureId: number; tileId: number; feature: Option }[];
  colors?: { tileId: number; colorId: number; color: ColorOption }[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateTile = {
  id: number;
  file?: File; // instead of imageUrl
  name: string;
  imageUrl?: string;
  collection?: Option;
  sizes?: { sizeId: number; tileId: number; size: Option }[];
  surface?: { surfaceId: number; tileId: number; surface: Option }[];
  outdoorIndoor?: Option;
  features?: { featureId: number; tileId: number; feature: Option }[];
  colors?: { tileId: number; colorId: number; color: ColorOption }[];
};

export type SortOption = "newest" | "oldest" | "a-z" | "z-a" | null;

export type CollectionSlug =
  | "shine-glossy"
  | "classic-marbles"
  | "stones-mixes"
  | "urban-style"
  | "wood-tiles";

export interface CollectionItem {
  label: string;
  slug: CollectionSlug;
  dbName: string; // <-- name in the DB
}

export const COLLECTIONS: CollectionItem[] = [
  {
    label: "Shine & Glossy",
    slug: "shine-glossy",
    dbName: "shine_g-glossy",
  },
  {
    label: "Classic Marbles",
    slug: "classic-marbles",
    dbName: "classic_marbles",
  },
  {
    label: "Stones & Mixes",
    slug: "stones-mixes",
    dbName: "stones_g-mixes",
  },
  {
    label: "Urban Style",
    slug: "urban-style",
    dbName: "urban_style",
  },
  {
    label: "Wood Tiles",
    slug: "wood-tiles",
    dbName: "wood_selection",
  },
] as const;
