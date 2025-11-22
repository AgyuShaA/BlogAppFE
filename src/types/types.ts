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

export const TILE_NAMES = [
  "marmolino-silversonata-pearl",
  "itaka-cream",
  "itaka-cherry",
  "itaka-black",
  "itaka-grey",
  "itaka-cobalt",
  "picassa-white",
  "palazzo-white",
  "alpina-silver",
  "cristalina-white",
  "teo-onice-sky",
  "teo-onice-grey",
  "teo-onice-teal",
  "ashford-black",
  "ocean-blue",
  "vesuvio-anthracite",
  "nebula-blue",
  "pietra-taupe",
  "lunaria-silver",
  "lunaria-biege",
  "moon-grey",
  "moon-silver",
  "helen-white",
  "lago-grey",
  "sracciatella-white",
  "mira-white",
  "bella-white",
  "sonata-beari",
  "teo-onice-pearl",
  "majestic-cream",
  "majestic-pearl",
  "river-beige",
  "marmolino-grey",
  "marmolino-silver",
  "imperial-black",
  "marquina-black",
  "tesora-grey",
  "granito-grey",
  "granito-anthracite",
  "molika-silver",
  "molika-grey",
  "terra-grey",
  "terra-anthracite",
  "terra-griege",
  "terra-beige",
  "megalit-silver",
  "megalit-grey",
  "megalit-bronze",
  "mariya-anthracite",
  "mariya-brown",
  "mariya-grey",
  "arber-graphite",
  "arber-grey",
  "arber-silver",
  "slate-grey",
  "slate-anthracite",
  "flint-stone-gold",
  "treviso-silver",
  "treviso-beige",
  "treviso-ivory",
  "limestone-beige",
  "limestone-cream",
  "calypso-navi",
  "calypso-blue",
  "calypso-white",
  "calypso-brown",
  "calypso-biege",
  "soft-slate-athracite",
  "soft-slate-silver",
  "soft-slate-grey",
  "soft-slate-biege",
  "concrete-athracite",
  "concrete-grey",
  "concrete-white",
  "concrete-biege",
  "venecia-anthraciete",
  "venecia-grey",
  "venecia-white",
  "hannover-athracite",
  "hannover-grey",
  "hannover-silver",
  "art-anthracite",
  "art-grey",
  "art-white",
  "leon-anthracite",
  "leon-grey",
  "leon-silver",
  "leon-biege",
  "hamburg-biege",
  "hamburg-taupe",
  "hamburg-grey",
  "hamburg-graphite",
  "iron-rust",
  "iron-grey",
  "iron-biege",
  "iron-anthracite",
  "bavaria-grey",
  "bavaria-white",
  "bavarya-mocco",
  "bavarya-brown",
  "stefani-ivory",
  "stefani-biege",
  "stefani-brown",
  "krakow-white",
  "krakow-grey",
  "krakow-brown",
  "munchen-grey",
  "munchen-white",
  "munchen-gold",
  "munchen-brown",
  "nordic-white",
  "nordic-grey",
  "nordic-beige",
  "aurora-biege",
  "aurora-honey",
  "aurora-brown",
  "tavolina-beige",
  "tavolin-brown",
  "canyon-beige",
  "canyon-gold",
  "canyon-brown",
  "aspen-white",
  "fortezza-ivory",
  "fortezza-beige",
  "fortezza-gold",
  "fortezza-brown",
  "timber-ivory",
  "timber-beige",
  "timber-gold",
  "castello-ivory",
  "castello-honey",
  "munchen-wite",
  "albero-black",
  "taheo-beige",
  "taheo-gold",
  "alpha-honey",
  "alpha-nut",
  "ponte-grey",
  "armario-ivory",
  "saturio-white",
  "andora-brown",
  "boticcino-beige",
  "perfecto-dark-grey",
  "perfecto-grey",
  "perfecto-silver",
  "perfecto-biege",
  "onice-brown",
  "atlas-pearl",
  "romano-biege",
  "ardeza-grey",
  "ardeza-black",
  "ardeza-beige",
  "soft-slate-anthracite",
  "soft-slate-beige",
  "aura-light-grey",
  "betono-grey",
  "betono-anthracite",
  "dortmud-dark-grey",
  "dortmud-grey",
  "vulcano-anthracite",
  "vulcano-grey",
  "vulcano-beige",
  "vulcano-white",
  "hilton-graphite",
  "hilton-biege",
  "hilton-grey",
  "hilton-brown",
  "sonata-pearl",
  "marmolino-silverSonata Pearl", // ⛔ check this key, it's wrong
  "sicilia-white",
  "alcora-gold",
  "alcora-grey",
  "calacatta-gold",
  "snow-white",
];
