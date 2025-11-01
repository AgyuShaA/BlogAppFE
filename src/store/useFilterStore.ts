import { Tile } from "@/types/types";
import { create } from "zustand";

export interface Option {
  id: number;
  name: string;
}

export interface ColorOption extends Option {
  hex: string;
}

interface FilterStore {
  collectionsList: Option[];
  sizesList: Option[];
  surfacesList: Option[];
  featuresList: Option[];
  colorsList: ColorOption[];
  outdoorIndoorList: Option[];
  recalcFilteredTiles: (tiles: Tile[]) => void;

  selectedCollections: number[];
  selectedSizes: number[];
  selectedSurfaces: number[];
  selectedFeatures: number[];
  selectedColors: number[];
  selectedOutdoorIndoor: number[];

  filteredTiles: Tile[];

  // setters for full lists
  setCollectionsList: (list: Option[]) => void;
  setSizesList: (list: Option[]) => void;
  setSurfacesList: (list: Option[]) => void;
  setFeaturesList: (list: Option[]) => void;
  setColorsList: (list: ColorOption[]) => void;
  setOutdoorIndoorList: (list: Option[]) => void;

  // togglers for selections
  toggleCollection: (id: number, tiles: Tile[]) => void;
  toggleSize: (id: number, tiles: Tile[]) => void;
  toggleSurface: (id: number, tiles: Tile[]) => void;
  toggleFeature: (id: number, tiles: Tile[]) => void;
  toggleColor: (id: number, tiles: Tile[]) => void;
  toggleOutdoorIndoor: (id: number, tiles: Tile[]) => void;

  // reset all selections
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  // full lists from DB
  collectionsList: [],
  sizesList: [],
  surfacesList: [],
  featuresList: [],
  colorsList: [],
  outdoorIndoorList: [],

  // selected items
  selectedCollections: [],
  selectedSizes: [],
  selectedSurfaces: [],
  selectedFeatures: [],
  selectedColors: [],
  selectedOutdoorIndoor: [],

  // filtered tiles
  filteredTiles: [],

  // setters for full lists
  setCollectionsList: (list) => set({ collectionsList: list }),
  setSizesList: (list) => set({ sizesList: list }),
  setSurfacesList: (list) => set({ surfacesList: list }),
  setFeaturesList: (list) => set({ featuresList: list }),
  setColorsList: (list) => set({ colorsList: list }),
  setOutdoorIndoorList: (list) => set({ outdoorIndoorList: list }),

  toggleCollection: (id, tiles) => {
    set((state) => {
      const selected = state.selectedCollections.includes(id)
        ? state.selectedCollections.filter((i) => i !== id)
        : [...state.selectedCollections, id];
      return { selectedCollections: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  toggleSize: (id, tiles) => {
    set((state) => {
      const selected = state.selectedSizes.includes(id)
        ? state.selectedSizes.filter((i) => i !== id)
        : [...state.selectedSizes, id];
      return { selectedSizes: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  toggleSurface: (id, tiles) => {
    set((state) => {
      const selected = state.selectedSurfaces.includes(id)
        ? state.selectedSurfaces.filter((i) => i !== id)
        : [...state.selectedSurfaces, id];
      return { selectedSurfaces: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  toggleFeature: (id, tiles) => {
    set((state) => {
      const selected = state.selectedFeatures.includes(id)
        ? state.selectedFeatures.filter((i) => i !== id)
        : [...state.selectedFeatures, id];
      return { selectedFeatures: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  toggleColor: (id, tiles) => {
    set((state) => {
      const selected = state.selectedColors.includes(id)
        ? state.selectedColors.filter((i) => i !== id)
        : [...state.selectedColors, id];
      return { selectedColors: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  toggleOutdoorIndoor: (id, tiles) => {
    set((state) => {
      const selected = state.selectedOutdoorIndoor.includes(id)
        ? state.selectedOutdoorIndoor.filter((i) => i !== id)
        : [...state.selectedOutdoorIndoor, id];
      return { selectedOutdoorIndoor: selected };
    });
    get().recalcFilteredTiles(tiles);
  },

  recalcFilteredTiles: (tiles: Tile[]) => {
    const state = get();
    const matches = tiles.filter((tile) => {
      const matchCollection =
        state.selectedCollections.length === 0 ||
        (tile.collection?.id !== undefined &&
          state.selectedCollections.includes(tile.collection.id));

      const matchSize =
        state.selectedSizes.length === 0 ||
        tile.sizes?.some(
          (s) =>
            s.size.id !== undefined && state.selectedSizes.includes(s.size.id)
        );

      const matchSurface =
        state.selectedSurfaces.length === 0 ||
        tile.surfaces?.some(
          (f) =>
            f.surfaceId !== undefined &&
            state.selectedFeatures.includes(f.surfaceId)
        );

      const matchFeature =
        state.selectedFeatures.length === 0 ||
        tile.features?.some(
          (f) =>
            f.featureId !== undefined &&
            state.selectedFeatures.includes(f.featureId)
        );

      const matchColor =
        state.selectedColors.length === 0 ||
        tile.colors?.some(
          (c) =>
            c.color.id !== undefined &&
            state.selectedColors.includes(c.color.id)
        );

      const matchOutdoorIndoor =
        state.selectedOutdoorIndoor.length === 0 ||
        (tile.outdoorIndoor?.id !== undefined &&
          state.selectedOutdoorIndoor.includes(tile.outdoorIndoor.id));

      return (
        matchCollection &&
        matchSize &&
        matchSurface &&
        matchFeature &&
        matchColor &&
        matchOutdoorIndoor
      );
    });

    set({ filteredTiles: matches });
  },

  // reset
  resetFilters: () =>
    set({
      selectedCollections: [],
      selectedSizes: [],
      selectedSurfaces: [],
      selectedFeatures: [],
      selectedColors: [],
      selectedOutdoorIndoor: [],
    }),
}));
