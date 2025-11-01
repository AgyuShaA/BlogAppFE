"use client";

import { StoreIcon } from "@/assets/icons/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { UpdateTileModal } from "../modals/update-modal";
import { DeleteTileModal } from "../modals/delete-modal";
import { Tile } from "@/types/types";
import { useCartStore } from "@/store/useCartStore";

import { useFilterStore } from "@/store/useFilterStore";
import { useTileStore } from "@/store/useTileStore";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export const TileList = () => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCartStore();
  const t = useTranslations("names");
  const { filteredTiles } = useFilterStore();
  const { setTiles, tiles } = useTileStore();
  const pathname = usePathname();
  const [activeTip, setActiveTip] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleTipToggle = (index: number) => {
    if (isMobile) {
      setActiveTip(activeTip === index ? null : index);
    }
  };

  const icons = [
    { src: "/1.png", tip: "Marble effect" },
    { src: "/2.png", tip: '"Super shine" lappato surface' },
    { src: "/3.png", tip: "For outdoor and indoor use" },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/tiles", { cache: "no-store" });

      const data = await res.json();

      setTiles(data);
    };
    fetchPosts();
  }, [setTiles]);

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

  const displayTiles = filteredTiles.length > 0 ? filteredTiles : tiles;

  return (
    <div className="flex flex-wrap justify-center gap-6 px-2 w-full items-start self-start">
      <h1 className="text-center w-full text-3xl md:text-5xl">Catalog</h1>
      {displayTiles.map((tile) => {
        const inCart = isInCart(tile.id);

        return (
          <div
            key={tile.id}
            className="flex  flex-col border p-4 max-h-[500px] md:w-[330px] lg:w-[283px] w-[335px] border-gray-300 rounded shadow-sm"
          >
            {/* Tile Image fills width */}
            {tile.imageUrl && (
              <div className="w-full h-[250px] relative">
                <Image
                  src={tile.imageUrl}
                  alt={tile.name}
                  width={250}
                  height={250}
                  className="object-contain"
                />
              </div>
            )}

            {/* Tile Name */}
            <h4 className="mt-2 flex gap-2 font-sans px-2 font-semibold text-base text-[#282828]">
              {t(tile.name)}
              <div className="flex items-center gap-4">
                {icons.map((icon, i) => (
                  <div
                    key={i}
                    className="relative group"
                    onClick={() => handleTipToggle(i)}
                  >
                    <Image
                      alt="icon"
                      className="w-6 h-6 rounded cursor-pointer"
                      src={icon.src}
                      width={24}
                      height={24}
                    />

                    {/* Tooltip */}
                    <div
                      className={`
              absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
              whitespace-nowrap bg-gray-800 text-white text-xs py-1 px-2 rounded 
              opacity-0 group-hover:opacity-100 transition-opacity duration-200
              ${activeTip === i ? "opacity-100" : ""}
            `}
                    >
                      {icon.tip}
                    </div>
                  </div>
                ))}
              </div>
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
            {tile.colors && tile.colors.length > 0 ? (
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
            ) : (
              <>
                <span className="w-5 h-5 mt-2 px-2" />
              </>
            )}

            {/* Action Buttons */}

            {pathname === "/panel" && (
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
            )}

            <button
              onClick={() =>
                inCart ? removeFromCart(tile.id) : addToCart(tile.id)
              }
              className="flex mt-2 items-center justify-center mb-2 w-[90%] h-[42px] bg-gray-900 text-white rounded text-sm font-medium self-center"
            >
              {inCart ? (
                <>Remove from cart</>
              ) : (
                <>
                  <StoreIcon />
                  Add to cart
                </>
              )}
            </button>
          </div>
        );
      })}

      {selectedTile && pathname === "/panel" && (
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
