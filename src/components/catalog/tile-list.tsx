"use client";

import { StoreIcon } from "@/assets/icons/store";
import Image from "next/image";
import { useState } from "react";
import { UpdateTileModal } from "../modals/update-modal";
import { DeleteTileModal } from "../modals/delete-modal";
import { Tile } from "@/types/types";

interface TileListProps {
  tiles: Tile[];
}

export const TileList = ({ tiles }: TileListProps) => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleOpenUpdate = (tile: Tile) => {
    setSelectedTile(tile);
    setIsUpdateOpen(true);
  };

  const handleOpenDelete = (tile: Tile) => {
    setSelectedTile(tile);
    setIsDeleteOpen(true);
  };

  const handleUpdate = async (formData: FormData, tileId: number) => {
    const res = await fetch(`/api/tiles?id=${tileId}`, {
      method: "PATCH",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to update tile");
    }

    setIsUpdateOpen(false);
    setSelectedTile(null);
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {tiles.map((tile) => (
        <div
          key={tile.id}
          className="flex flex-col border p-4 md:w-[330px] lg:w-[280] w-[335px] border-gray-300 rounded shadow-sm"
        >
          {/* Tile Image fills width */}
          {tile.imageUrl && (
            <div className="w-full h-[250px] relative">
              <Image
                src={tile.imageUrl}
                alt={tile.name}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Tile Name */}
          <h4 className="mt-2 font-sans px-2 font-semibold text-base text-[#282828]">
            {tile.name}
          </h4>

          {/* Info Row */}
          <div className=" w-full mt-2 px-2 ">
            {tile.sizes && (
              <div className="flex w-full mt-2 px-2 flex-row gap-2">
                {tile.sizes.slice(0, 2).map((i, idx) => (
                  <div
                    key={idx}
                    className="flex-1 border border-gray-200 rounded px-2 py-1 text-center text-sm text-gray-600"
                  >
                    {i.size.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          {tile.colors?.length && (
            <div className="flex gap-2 mt-2 px-2">
              {tile.colors.map((c) => (
                <span
                  key={c.color.id}
                  className="w-5 h-5 rounded border border-gray-200"
                  style={{ backgroundColor: c.color.hex }}
                  title={c.color.name}
                />
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 px-2">
            {/* Edit button opens update modal page */}
            <button
              onClick={() => handleOpenUpdate(tile)}
              className="flex-1 bg-blue-600 cursor-pointer text-white py-2 rounded text-sm font-medium"
            >
              Edit
            </button>

            {/* Delete button triggers delete */}
            <button
              onClick={() => handleOpenDelete(tile)}
              className="flex-1 bg-red-600 text-white cursor-pointer py-2 rounded text-sm font-medium"
            >
              Delete
            </button>
          </div>

          {/* Add Cart Button */}
          <button className="flex mt-2 items-center justify-center mb-2 w-[90%] h-[42px] bg-gray-900 text-white rounded text-sm font-medium self-center">
            <StoreIcon /> Add Cart
          </button>
        </div>
      ))}

      {selectedTile && (
        <>
          <UpdateTileModal
            tile={selectedTile}
            isOpen={isUpdateOpen}
            onClose={() => setIsUpdateOpen(false)}
            onUpdated={handleUpdate}
          />
          <DeleteTileModal
            tile={selectedTile}
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
          />
        </>
      )}
    </div>
  );
};
