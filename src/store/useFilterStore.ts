import { SortOption, Tile } from "@/types/types";
import { create } from "zustand";

export interface Option {
  id: number;
  name: string;
}

export interface ColorOption extends Option {
  hex: string;
}

interface FilterStore {
  sortBy: SortOption | null;
  setSortBy: (sortBy: SortOption | null) => void;

  collectionsList: Option[];
  sizesList: Option[];
  surfacesList: Option[];
  featuresList: Option[];
  colorsList: ColorOption[];
  outdoorIndoorList: Option[];

  setFilteredTiles: (tiles: Tile[]) => void;

  selectedCollections: number[];
  selectedSizes: number[];
  selectedSurfaces: number[];
  selectedFeatures: number[];
  selectedColors: number[];
  selectedOutdoorIndoor: number[];
  recalcFilteredTiles: (tiles: Tile[]) => void;
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

  getCount: (type: string, id: number, tiles: Tile[]) => number;

  // reset all selections
  resetFilters: () => void;
}

const matchAll = (selected: number[], values: number[] = []) => {
  if (selected.length === 0) return true;
  return selected.every((sel) => values.includes(sel));
};

function filterTiles(state: FilterStore, tiles: Tile[]) {
  return tiles.filter((tile) => {
    const matchCollection = matchAll(state.selectedCollections, [
      tile.collection?.id ?? -1,
    ]);

    const matchSize = matchAll(
      state.selectedSizes,
      tile.sizes?.map((s) => s.size.id) ?? []
    );

    const matchSurface = matchAll(
      state.selectedSurfaces,
      tile.surfaces?.map((s) => s.surfaceId) ?? []
    );

    const matchFeature = matchAll(
      state.selectedFeatures,
      tile.features?.map((f) => f.featureId) ?? []
    );

    const matchColor = matchAll(
      state.selectedColors,
      tile.colors?.map((c) => c.color.id) ?? []
    );

    const matchOutdoorIndoor = matchAll(state.selectedOutdoorIndoor, [
      tile.outdoorIndoor?.id ?? -1,
    ]);

    return (
      matchCollection &&
      matchSize &&
      matchSurface &&
      matchFeature &&
      matchColor &&
      matchOutdoorIndoor
    );
  });
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  getCount: (type, id, tiles) => {
    const state = get();

    return tiles.filter((tile) => {
      const ignore = (category: string) => category === type;

      const matchCollection = ignore("collection")
        ? true
        : matchAll(state.selectedCollections, [tile.collection?.id ?? -1]);

      const matchSize = ignore("size")
        ? true
        : matchAll(
            state.selectedSizes,
            tile.sizes?.map((s) => s.size.id) ?? []
          );

      const matchSurface = ignore("surface")
        ? true
        : matchAll(
            state.selectedSurfaces,
            tile.surfaces?.map((s) => s.surfaceId) ?? []
          );

      const matchFeature = ignore("feature")
        ? true
        : matchAll(
            state.selectedFeatures,
            tile.features?.map((f) => f.featureId) ?? []
          );

      const matchColor = ignore("color")
        ? true
        : matchAll(
            state.selectedColors,
            tile.colors?.map((c) => c.color.id) ?? []
          );

      const matchOutdoorIndoor = ignore("outdoorIndoor")
        ? true
        : matchAll(state.selectedOutdoorIndoor, [tile.outdoorIndoor?.id ?? -1]);

      let matchesTypeId = false;
      switch (type) {
        case "collection":
          matchesTypeId = tile.collection?.id === id;
          break;
        case "size":
          matchesTypeId = tile.sizes?.some((s) => s.size.id === id) ?? false;
          break;
        case "surface":
          matchesTypeId =
            tile.surfaces?.some((s) => s.surfaceId === id) ?? false;
          break;
        case "feature":
          matchesTypeId =
            tile.features?.some((f) => f.featureId === id) ?? false;
          break;
        case "color":
          matchesTypeId = tile.colors?.some((c) => c.color.id === id) ?? false;
          break;
        case "outdoorIndoor":
          matchesTypeId = tile.outdoorIndoor?.id === id;
          break;
      }

      return (
        matchesTypeId &&
        matchCollection &&
        matchSize &&
        matchSurface &&
        matchFeature &&
        matchColor &&
        matchOutdoorIndoor
      );
    }).length;
  },

  recalcFilteredTiles: (tiles: Tile[]) => {
    const state = get();
    let matches = tiles.filter((tile) => {
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
            state.selectedSurfaces.includes(f.surfaceId)
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
    if (state.sortBy) {
      matches = matches.slice();
      switch (state.sortBy) {
        case "newest":
          matches.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
          break;
        case "oldest":
          matches.sort((a, b) => {
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          });
          break;
        case "a-z":
          matches.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-a":
          matches.sort((a, b) => b.name.localeCompare(a.name));
          break;
      }
    }
    set({ filteredTiles: matches });
  },
  sortBy: null,
  setSortBy: (sortBy) => set({ sortBy }),
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
  setFilteredTiles: (tiles: Tile[]) => set({ filteredTiles: tiles }),

  toggleCollection: (id, tiles) =>
    set((state) => {
      const selected = state.selectedCollections.includes(id)
        ? state.selectedCollections.filter((i) => i !== id)
        : [...state.selectedCollections, id];

      const newState = { ...state, selectedCollections: selected };
      return {
        selectedCollections: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

  toggleSize: (id, tiles) =>
    set((state) => {
      const selected = state.selectedSizes.includes(id)
        ? state.selectedSizes.filter((i) => i !== id)
        : [...state.selectedSizes, id];

      const newState = { ...state, selectedSizes: selected };
      return {
        selectedSizes: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

  toggleSurface: (id, tiles) =>
    set((state) => {
      const selected = state.selectedSurfaces.includes(id)
        ? state.selectedSurfaces.filter((i) => i !== id)
        : [...state.selectedSurfaces, id];

      const newState = { ...state, selectedSurfaces: selected };
      return {
        selectedSurfaces: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

  toggleFeature: (id, tiles) =>
    set((state) => {
      const selected = state.selectedFeatures.includes(id)
        ? state.selectedFeatures.filter((i) => i !== id)
        : [...state.selectedFeatures, id];

      const newState = { ...state, selectedFeatures: selected };
      return {
        selectedFeatures: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

  toggleColor: (id, tiles) =>
    set((state) => {
      const selected = state.selectedColors.includes(id)
        ? state.selectedColors.filter((i) => i !== id)
        : [...state.selectedColors, id];

      const newState = { ...state, selectedColors: selected };
      return {
        selectedColors: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

  toggleOutdoorIndoor: (id, tiles) =>
    set((state) => {
      const selected = state.selectedOutdoorIndoor.includes(id)
        ? state.selectedOutdoorIndoor.filter((i) => i !== id)
        : [...state.selectedOutdoorIndoor, id];

      const newState = { ...state, selectedOutdoorIndoor: selected };
      return {
        selectedOutdoorIndoor: selected,
        filteredTiles: filterTiles(newState, tiles),
      };
    }),

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
