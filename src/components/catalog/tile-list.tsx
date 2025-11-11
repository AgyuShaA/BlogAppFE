"use client";

import { StoreIcon } from "@/assets/icons/store";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { UpdateTileModal } from "../modals/update-modal";
import { DeleteTileModal } from "../modals/delete-modal";
import { SortOption, Tile } from "@/types/types";
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
  const {
    filteredTiles,
    setFilteredTiles,
    sortBy,
    setSortBy,
    recalcFilteredTiles,
  } = useFilterStore();
  const { setTiles } = useTileStore();
  const tp = useTranslations("pagination");

  const OPTIONS = [
    { value: "newest", label: "From Newest to Oldest" },
    { value: "oldest", label: "From Oldest to Newest" },
    { value: "a-z", label: "A - Z" },
    { value: "z-a", label: "Z - A" },
  ];

  const currentLabel =
    OPTIONS.find((opt) => opt.value === sortBy)?.label || "Sort by";

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", onClick);
    } else {
      document.removeEventListener("mousedown", onClick);
    }

    return () => {
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

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

  function onSelect(value: SortOption): void {
    setSortBy(value);
    recalcFilteredTiles(filteredTiles);
    setOpen(false);
  }

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
        <div className="flex items-center justify-between w-full flex-col md:flex-row gap-4">
          <div className="flex items-center justify-start text-[#888888]">
            <h2>
              {tp("showing", { start, end, total: filteredTiles.length })}
            </h2>
          </div>

          <div className="relative w-fit px-2">
            <button
              onClick={() => setOpen((o) => !o)}
              className="w-full flex justify-between items-center px-3 py-2 text-gray-900 font-normal text-sm bg-white border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              Filter: {OPTIONS.find((opt) => opt.value === sortBy)?.label}
              <svg
                width="16"
                height="5"
                viewBox="0 0 16 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2"
              >
                <path
                  d="M2.39062 4.78125C1.73438 4.78125 1.17188 4.54948 0.703125 4.08594C0.234375 3.6224 0 3.05729 0 2.39062C0 1.73438 0.231771 1.17188 0.695312 0.703125C1.15885 0.234375 1.72396 0 2.39062 0C3.04688 0 3.61198 0.231771 4.08594 0.695312C4.5599 1.15885 4.79688 1.72396 4.79688 2.39062C4.79688 3.04688 4.5599 3.60938 4.08594 4.07812C3.61198 4.54688 3.04688 4.78125 2.39062 4.78125ZM8 4.78125C7.34375 4.78125 6.78125 4.54948 6.3125 4.08594C5.84375 3.6224 5.60938 3.05729 5.60938 2.39062C5.60938 1.73438 5.84115 1.17188 6.30469 0.703125C6.76823 0.234375 7.33333 0 8 0C8.65625 0 9.21875 0.231771 9.6875 0.695312C10.1562 1.15885 10.3906 1.72396 10.3906 2.39062C10.3906 3.04688 10.1562 3.60938 9.6875 4.07812C9.21875 4.54688 8.65625 4.78125 8 4.78125ZM13.6094 4.78125C12.9531 4.78125 12.388 4.54948 11.9141 4.08594C11.4401 3.6224 11.2031 3.05729 11.2031 2.39062C11.2031 1.73438 11.4375 1.17188 11.9062 0.703125C12.375 0.234375 12.9427 0 13.6094 0C14.2656 0 14.8281 0.231771 15.2969 0.695312C15.7656 1.15885 16 1.72396 16 2.39062C16 3.04688 15.7682 3.60938 15.3047 4.07812C14.8411 4.54688 14.276 4.78125 13.6094 4.78125Z"
                  fill="#282828"
                />
              </svg>
            </button>

            {open && (
              <ul
                className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
                role="listbox"
                tabIndex={-1}
              >
                {OPTIONS.map(({ value, label }) => (
                  <li
                    key={value}
                    role="option"
                    tabIndex={0}
                    aria-selected={sortBy === value}
                    className={`cursor-pointer px-3 py-2 text-sm ${
                      sortBy === value
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => onSelect(value as SortOption)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelect(value as SortOption);
                      }
                    }}
                  >
                    {label}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
