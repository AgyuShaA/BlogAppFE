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
