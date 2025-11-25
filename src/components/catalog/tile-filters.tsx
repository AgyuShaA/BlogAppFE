"use client";
import { useFilterStore } from "@/store/useFilterStore";
import { useTileStore } from "@/store/useTileStore";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function TileFilters() {
  const t = useTranslations("options");

  const setCollectionsList = useFilterStore((s) => s.setCollectionsList);
  const setSizesList = useFilterStore((s) => s.setSizesList);
  const setSurfacesList = useFilterStore((s) => s.setSurfacesList);
  const setFeaturesList = useFilterStore((s) => s.setFeaturesList);
  const setColorsList = useFilterStore((s) => s.setColorsList);
  const setOutdoorIndoorList = useFilterStore((s) => s.setOutdoorIndoorList);

  const tiles = useTileStore((s) => s.tiles);

  const filteredTiles = useFilterStore((s) => s.filteredTiles);

  const collections = useFilterStore((s) => s.collectionsList);
  const sizes = useFilterStore((s) => s.sizesList);
  const surfaces = useFilterStore((s) => s.surfacesList);
  const features = useFilterStore((s) => s.featuresList);
  const colors = useFilterStore((s) => s.colorsList);
  const outdoorIndoor = useFilterStore((s) => s.outdoorIndoorList);

  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await fetch("/api/catalog", { cache: "force-cache" });
        const data = await res.json();

        setCollectionsList(data.collections);
        setSizesList(data.sizes);
        setSurfacesList(data.surfaces);
        setFeaturesList(data.features);
        setColorsList(data.colors);
        setOutdoorIndoorList(data.outdoorIndoor);

        useTileStore.getState().setTiles(data.tiles);
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    }

    loadFilters();
  }, [
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
  const getCount = useFilterStore((s) => s.getCount);

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
        {t(item.name)} ({getCount(type, item.id, filteredTiles)})
      </span>
    </label>
  );

  return (
    <div className="space-y-6 mt-8 md:mt-0 w-full md:w-75  font-sans text-[16px] text-[#282828]">
      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">{t("collections")}</h3>

        {collections.map((c) =>
          renderCheckbox("collection", c, selectedCollections, toggleCollection)
        )}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">{t("sizes")}</h3>

        {sizes.map((s) => renderCheckbox("size", s, selectedSizes, toggleSize))}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">{t("surfaces")}</h3>

        {surfaces.map((s) =>
          renderCheckbox("surface", s, selectedSurfaces, toggleSurface)
        )}
      </div>

      <div className="pb-2 border-b">
        <h3 className="font-semibold mb-2">{t("colors")}</h3>

        <div className="flex flex-wrap gap-2">
          {colors.map((c) => {
            const isSelected = selectedColors.includes(c.id);
            return (
              <div
                key={c.id}
                className="relative w-8 h-8 rounded cursor-pointer hover:ring-2 hover:ring-red border border-gray-200"
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
        <h3 className="font-semibold mb-2">{t("outdoorIndoor")}</h3>

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
        <h3 className="font-semibold mb-2">{t("features")}</h3>

        {features.map((f) =>
          renderCheckbox("feature", f, selectedFeatures, toggleFeature)
        )}
      </div>
    </div>
  );
}
