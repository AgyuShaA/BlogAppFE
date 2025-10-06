"use client";
import { useFilterStore } from "@/store/useFilterStore";
import { useTileStore } from "@/store/useTileStore";
import { useEffect } from "react";

interface TileFiltersProps {
  outdoorIndoor: { id: number; name: string }[];
  collections: { id: number; name: string }[];
  surfaces: { id: number; name: string }[];
  sizes: { id: number; name: string }[];
  features: { id: number; name: string }[];
  colors: { id: number; name: string; hex: string }[];
}

export default function TileFilters({
  collections,
  surfaces,
  sizes,
  features,
  colors,
  outdoorIndoor,
}: TileFiltersProps) {
  const tiles = useTileStore((s) => s.tiles);

  // --- Initialize lists in store
  const setCollectionsList = useFilterStore((s) => s.setCollectionsList);
  const setSizesList = useFilterStore((s) => s.setSizesList);
  const setSurfacesList = useFilterStore((s) => s.setSurfacesList);
  const setFeaturesList = useFilterStore((s) => s.setFeaturesList);
  const setColorsList = useFilterStore((s) => s.setColorsList);
  const setOutdoorIndoorList = useFilterStore((s) => s.setOutdoorIndoorList);

  useEffect(() => {
    setCollectionsList(collections);
    setSizesList(sizes);
    setSurfacesList(surfaces);
    setFeaturesList(features);
    setColorsList(colors);
    setOutdoorIndoorList(outdoorIndoor);
  }, [
    collections,
    sizes,
    surfaces,
    features,
    colors,
    outdoorIndoor,
    setCollectionsList,
    setSizesList,
    setSurfacesList,
    setFeaturesList,
    setColorsList,
    setOutdoorIndoorList,
  ]);

  // --- Selected filters from store
  const selectedCollections = useFilterStore((s) => s.selectedCollections);
  const selectedSizes = useFilterStore((s) => s.selectedSizes);
  const selectedSurfaces = useFilterStore((s) => s.selectedSurfaces);
  const selectedFeatures = useFilterStore((s) => s.selectedFeatures);
  const selectedColors = useFilterStore((s) => s.selectedColors);
  const selectedOutdoorIndoor = useFilterStore((s) => s.selectedOutdoorIndoor);

  // --- Toggle functions that recalc filtered tiles
  const toggleCollection = (id: number) => {
    useFilterStore.getState().toggleCollection(id, tiles);
  };
  const toggleSize = (id: number) => {
    useFilterStore.getState().toggleSize(id, tiles);
  };
  const toggleSurface = (id: number) => {
    useFilterStore.getState().toggleSurface(id, tiles);
  };
  const toggleFeature = (id: number) => {
    useFilterStore.getState().toggleFeature(id, tiles);
  };
  const toggleColor = (id: number) => {
    useFilterStore.getState().toggleColor(id, tiles);
  };
  const toggleOutdoorIndoor = (id: number) => {
    useFilterStore.getState().toggleOutdoorIndoor(id, tiles);
  };

  const getCount = (type: string, id: number) => {
    const state = useFilterStore.getState();

    return tiles.filter((tile) => {
      const matchCollection =
        type === "collection"
          ? true
          : state.selectedCollections.length === 0 ||
            (tile.collection?.id != null &&
              state.selectedCollections.includes(tile.collection.id));

      const matchSize =
        type === "size"
          ? true
          : state.selectedSizes.length === 0 ||
            tile.sizes?.some(
              (s) =>
                s.size.id != null && state.selectedSizes.includes(s.size.id)
            );

      const matchSurface =
        type === "surface"
          ? true
          : state.selectedSurfaces.length === 0 ||
            (tile.surface?.id != null &&
              state.selectedSurfaces.includes(tile.surface.id));

      const matchFeature =
        type === "feature"
          ? true
          : state.selectedFeatures.length === 0 ||
            tile.features?.some(
              (f) =>
                f.featureId != null &&
                state.selectedFeatures.includes(f.featureId)
            );

      const matchColor =
        type === "color"
          ? true
          : state.selectedColors.length === 0 ||
            tile.colors?.some(
              (c) =>
                c.color.id != null && state.selectedColors.includes(c.color.id)
            );

      const matchOutdoorIndoor =
        type === "outdoorIndoor"
          ? true
          : state.selectedOutdoorIndoor.length === 0 ||
            (tile.outdoorIndoor?.id != null &&
              state.selectedOutdoorIndoor.includes(tile.outdoorIndoor.id));

      // Now check if this tile matches the current id of the filter type
      let matchesTypeId = false;
      switch (type) {
        case "collection":
          matchesTypeId = tile.collection?.id === id;
          break;
        case "size":
          matchesTypeId = tile.sizes?.some((s) => s.size.id === id) ?? false;
          break;
        case "surface":
          matchesTypeId = tile.surface?.id === id;
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
  };

  // --- Checkbox renderer
  const renderCheckbox = (
    type: string,
    item: { id: number; name: string },
    selected: number[],
    toggle: (id: number) => void
  ) => (
    <label key={item.id} className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={selected.includes(item.id)}
        onChange={() => toggle(item.id)}
      />
      <span>
        {item.name} ({getCount(type, item.id)})
      </span>
    </label>
  );

  return (
    <div className="space-y-6 w-full md:w-80 pl-5 font-sans text-[16px] text-[#282828]">
      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">Collections</h3>
        {collections.map((c) =>
          renderCheckbox("collection", c, selectedCollections, toggleCollection)
        )}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">Sizes</h3>
        {sizes.map((s) => renderCheckbox("size", s, selectedSizes, toggleSize))}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">Surfaces</h3>
        {surfaces.map((s) =>
          renderCheckbox("surface", s, selectedSurfaces, toggleSurface)
        )}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const isSelected = selectedColors.includes(c.id);
            return (
              <div
                key={c.id}
                className="relative w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-red-500 border border-gray-200"
                style={{ backgroundColor: c.hex }}
                onClick={() => toggleColor(c.id)}
              >
                {isSelected && (
                  <svg
                    className="absolute inset-0 w-full h-full text-white p-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">OutdoorIndoor</h3>
        {outdoorIndoor.map((o) =>
          renderCheckbox(
            "outdoorIndoor",
            o,
            selectedOutdoorIndoor,
            toggleOutdoorIndoor
          )
        )}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">Features</h3>
        {features.map((f) =>
          renderCheckbox("feature", f, selectedFeatures, toggleFeature)
        )}
      </div>
    </div>
  );
}
