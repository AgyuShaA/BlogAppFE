// stores/useTileStore.ts
import { create } from "zustand";
import { Tile } from "@/types/types";

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
}

export const useTileStore = create<TileState>((set) => ({
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
