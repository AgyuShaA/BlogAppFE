import { create } from "zustand";
import { Tile } from "@/types/types";
import { useFilterStore } from "./useFilterStore";

interface TileState {
  tiles: Tile[];
  selectedTile: Tile | null;
  isUpdateOpen: boolean;
  isDeleteOpen: boolean;
  setTiles: (tiles: Tile[]) => void;
  addTile: (tile: Tile) => void;
  updateTile: (tile: Tile) => void;
  deleteTile: (id: number) => void;
  setSelectedTile: (tile: Tile | null) => void;
  openUpdateModal: (tile: Tile) => void;
  closeUpdateModal: () => void;
  openDeleteModal: (tile: Tile) => void;
  closeDeleteModal: () => void;
  fetchCatalog: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useTileStore = create<TileState>((set) => ({
  loading: false,
  error: null,
  fetchCatalog: async () => {
    set({ loading: true, error: null });

    try {
      const res = await fetch("/api/mock", { cache: "force-cache" });

      if (!res.ok) throw new Error("Failed to fetch catalog data");
      const data: Tile[] = await res.json();
      const setFilteredTiles = useFilterStore.getState().setFilteredTiles;

      setFilteredTiles(data);
      set({ tiles: data, loading: false });
    } catch (error: unknown) {
      set({ error: "error", loading: false });
      console.error("Error fetching catalog:", error);
    }
  },

  tiles: [],
  selectedTile: null,
  isUpdateOpen: false,
  isDeleteOpen: false,
  setTiles: (tiles) => set({ tiles }),
  addTile: (tile) => set((state) => ({ tiles: [...state.tiles, tile] })),
  updateTile: (updatedTile) =>
    set((state) => ({
      tiles: state.tiles.map((t) =>
        t.id === updatedTile.id ? updatedTile : t
      ),
    })),
  deleteTile: (id) =>
    set((state) => ({ tiles: state.tiles.filter((t) => t.id !== id) })),
  setSelectedTile: (tile) => set({ selectedTile: tile }),
  openUpdateModal: (tile) => set({ selectedTile: tile, isUpdateOpen: true }),
  closeUpdateModal: () => set({ selectedTile: null, isUpdateOpen: false }),
  openDeleteModal: (tile) => set({ selectedTile: tile, isDeleteOpen: true }),
  closeDeleteModal: () => set({ selectedTile: null, isDeleteOpen: false }),
}));
