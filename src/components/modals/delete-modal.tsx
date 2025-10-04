"use client";

import { useTileStore } from "@/store/useTileStore";
import { Tile } from "@/types/types";
import { useState } from "react";
import { toast } from "react-toastify";

interface DeleteTileModalProps {
  tile: Tile;
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteTileModal = ({
  tile,
  isOpen,
  onClose,
}: DeleteTileModalProps) => {
  const [loading, setLoading] = useState(false);
  const { deleteTile } = useTileStore();
  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteTile(tile.id); // call the delete function
      deleteTile(tile.id);
      toast.success("Tile deleted");
      onClose();
    } catch (error) {
      console.error("Failed to delete tile:", error);
      // optionally show toast/error notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[350px] relative">
        <h2 className="text-lg font-semibold mb-4">Delete Tile {tile.name}?</h2>

        <p className="mb-4 text-gray-600">
          Are you sure you want to delete this tile? This action cannot be
          undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
