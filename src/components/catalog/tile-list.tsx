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
import { Spinner } from "../spinner";
import { Figtree } from "next/font/google";

type Props = {
  data: Tile[];
};

const figtree = Figtree({ subsets: ["latin"], weight: "300" });

export const TileList = ({ data }: Props) => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { addToCart, removeFromCart, isInCart } = useCartStore();
  const t = useTranslations("names");
  const { filteredTiles, setFilteredTiles } = useFilterStore();
  const { setTiles } = useTileStore();
  const tp = useTranslations("pagination");

  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const tilesPerPage = 20;
  const totalPages = Math.ceil(filteredTiles.length / tilesPerPage);
  const startIndex = (currentPage - 1) * tilesPerPage;
  const currentTiles = filteredTiles.slice(
    startIndex,
    startIndex + tilesPerPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setIsLoading(true);
    setTiles(data);
    setFilteredTiles(data);
    setIsLoading(false);
  }, [data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredTiles]);

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

  const start = (currentPage - 1) * tilesPerPage + 1;
  const end = Math.min(start + tilesPerPage - 1, filteredTiles.length);

  return (
    <div className="flex flex-wrap justify-center gap-6 px-2 w-full items-start self-start">
      <div className="w-full flex flex-col gap-10 p-6">
        <h1
          className={`text-left w-full text-3xl md:text-5xl ${figtree.className}`}
        >
          {" "}
          {t("title")}
        </h1>

        <div className="flex items-center justify-start text-[#888888]">
          <h2>{tp("showing", { start, end, total: filteredTiles.length })}</h2>
        </div>
      </div>

      {isLoading && filteredTiles.length === 0 ? <Spinner /> : null}

      {currentTiles.map((tile) => {
        const inCart = isInCart(tile.id);

        return (
          <div
            key={tile.id}
            className="flex  flex-col border p-4 max-h-[500px] md:w-[230px] lg:w-[283px] w-[255px] border-gray-300 rounded shadow-sm"
          >
            {/* Tile Image fills width */}
            {tile.imageUrl && (
              <div className="flex w-full min-h-[250px] items-center justify-center ">
                <Image
                  src={tile.imageUrl}
                  alt={tile.name}
                  width={250}
                  height={250}
                  quality={100}
                  className="object-contain border-1 border-amber-50"
                />
              </div>
            )}

            {/* Tile Name */}
            <h4 className="mt-2 flex gap-2 font-sans px-2 font-semibold text-base text-[#282828]">
              {t(tile.name)}
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

            {pathname.endsWith("/panel") && (
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
              className="flex mt-2 items-center justify-center mb-2 w-[99%] h-[42px] bg-gray-900 text-white rounded text-sm font-medium self-center"
            >
              {inCart ? (
                <>{t("removeFromCart")}</>
              ) : (
                <>
                  <StoreIcon />
                  {t("addToCart")}
                </>
              )}
            </button>
          </div>
        );
      })}

      <div className="w-full flex justify-center items-c">
        {totalPages > 1 && (
          <div className="flex items-center gap-2 mt-6 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-md  border rounded disabled:opacity-50"
            >
              ← {tp("prev")}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-lg text-md ${
                  currentPage === i + 1
                    ? "border-1 border-black text-black"
                    : "bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 text-md py-1 border rounded disabled:opacity-50"
            >
              {" "}
              {tp("next")} →
            </button>
          </div>
        )}
      </div>
      {selectedTile && pathname.endsWith("/panel") && (
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
