"use client";
/* eslint-disable */

import { Tile, Option } from "@/types/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useFilterStore } from "@/store/useFilterStore";
import { useTileStore } from "@/store/useTileStore";
import { toast } from "react-toastify";

interface UpdateTileModalProps {
  tile: Tile;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: (formData: FormData, tileId: number) => void;
}

export const UpdateTileModal = ({
  tile,
  isOpen,
  onClose,
}: UpdateTileModalProps) => {
  const [name, setName] = useState(tile.name);
  const [file, setFile] = useState<File | null>(null);

  const collections = useFilterStore((state) => state.collectionsList);
  const sizes = useFilterStore((state) => state.sizesList);
  const surfaces = useFilterStore((state) => state.surfacesList);
  const features = useFilterStore((state) => state.featuresList);
  const colors = useFilterStore((state) => state.colorsList);
  const outdoorIndoor = useFilterStore((state) => state.outdoorIndoorList);
  const [loading, setLoading] = useState(false);

  const { updateTile } = useTileStore();

  const [selectedCollection, setSelectedCollection] = useState<number[]>(
    tile.collection ? [tile.collection.id] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<number[]>(
    tile.sizes?.map((s: any) => s.size.id) || [] // FIXED
  );
  const [selectedSurface, setSelectedSurface] = useState<number[]>(
    tile.surface ? [tile.surface.id] : []
  );
  const [selectedFeatures, setSelectedFeatures] = useState<number[]>(
    tile.features?.map((f: any) => f.feature.id) || [] // FIXED
  );
  const [selectedColors, setSelectedColors] = useState<number[]>(
    tile.colors?.map((c: any) => c.color.id) || [] // already correct
  );
  const [selectedOutdoorIndoor, setSelectedOutdoorIndoor] = useState<number[]>(
    tile.outdoorIndoor ? [tile.outdoorIndoor.id] : []
  );

  // sync on prop change
  useEffect(() => {
    setName(tile.name);
    setSelectedCollection(tile.collection ? [tile.collection.id] : []);
    setSelectedSizes(tile.sizes?.map((s: any) => s.size.id) || []);
    setSelectedSurface(tile.surface ? [tile.surface.id] : []);
    setSelectedFeatures(tile.features?.map((f: any) => f.feature.id) || []);
    setSelectedColors(tile.colors?.map((c: any) => c.color.id) || []);
    setSelectedOutdoorIndoor(tile.outdoorIndoor ? [tile.outdoorIndoor.id] : []);
  }, [tile]);

  const renderSelectWithTags = (
    single: boolean,
    label: string,
    options: Option[],
    selected: number[],
    setter: React.Dispatch<React.SetStateAction<number[]>>
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const value = Number(e.target.value);
      if (single) setter([value]);
      else if (!selected.includes(value)) setter([...selected, value]);
    };

    return (
      <div className="mb-2">
        <label className="font-semibold mb-1 block">{label}</label>
        <select
          onChange={handleChange}
          value="" // always empty so placeholder shows
          className="w-full border px-2 py-1 rounded mb-1"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options
            .filter((o) => !selected.includes(o.id)) // 👈 hide already chosen
            .map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
        </select>

        <div className="flex flex-wrap gap-2">
          {selected.map((id) => {
            const item = options.find((o) => o.id === id)!;
            return (
              <div
                key={id}
                className="flex items-center gap-1 px-2 py-1 cursor-pointer rounded border bg-gray-200"
                onClick={() =>
                  setter(single ? [] : selected.filter((s) => s !== id))
                }
              >
                <span>{item?.name}</span>
                <button type="button" className="ml-1 font-bold text-sm">
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("file", file);
    if (selectedCollection.length)
      formData.append("collection", selectedCollection[0].toString());
    formData.append("sizes", JSON.stringify(selectedSizes));
    if (selectedSurface.length)
      formData.append("surface", selectedSurface[0].toString());
    formData.append("features", JSON.stringify(selectedFeatures));
    formData.append("colors", JSON.stringify(selectedColors));
    if (selectedOutdoorIndoor.length)
      formData.append("outdoorIndoor", selectedOutdoorIndoor[0].toString());

    try {
      const res = await fetch(`/api/tiles/?id=${tile.id}`, {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to update tile");

      const updatedTile = await res.json();
      updateTile(updatedTile);
      toast.success("Tile updated");

      onClose();
    } catch (err) {
      console.error(err);

      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[400px] relative overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-lg font-semibold mb-4">Update Tile</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded w-full px-2 py-1"
            placeholder="Tile name"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border rounded w-full px-2 py-1"
          />

          {tile.imageUrl && !file && (
            <div className="mt-2 relative w-full h-40">
              <Image
                src={tile.imageUrl}
                alt={tile.name}
                fill
                className="object-contain rounded border"
              />
            </div>
          )}
          {file && (
            <div className="mt-2 relative w-full h-40">
              <Image
                src={URL.createObjectURL(file)}
                alt="Preview"
                fill
                className="object-contain rounded border"
              />
            </div>
          )}

          {renderSelectWithTags(
            true,
            "Collection",
            collections,
            selectedCollection,
            setSelectedCollection
          )}
          {renderSelectWithTags(
            false,
            "Sizes",
            sizes,
            selectedSizes,
            setSelectedSizes
          )}
          {renderSelectWithTags(
            true,
            "Surface",
            surfaces,
            selectedSurface,
            setSelectedSurface
          )}
          {renderSelectWithTags(
            false,
            "Features",
            features,
            selectedFeatures,
            setSelectedFeatures
          )}

          {/* Colors as before */}
          <div className="flex flex-wrap gap-2">
            {colors.map((c) => (
              <div
                key={c.id}
                className={`w-6 h-6 rounded border cursor-pointer ${
                  selectedColors.includes(c.id) ? "ring-2 ring-blue-500" : ""
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                onClick={() => {
                  if (selectedColors.includes(c.id)) {
                    setSelectedColors(
                      selectedColors.filter((id) => id !== c.id)
                    );
                  } else {
                    setSelectedColors([...selectedColors, c.id]);
                  }
                }}
              />
            ))}
          </div>

          {renderSelectWithTags(
            true,
            "Outdoor/Indoor",
            outdoorIndoor,
            selectedOutdoorIndoor,
            setSelectedOutdoorIndoor
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Tile"}
          </button>
        </form>
      </div>
    </div>
  );
};
