"use client";

import { useEffect, useRef, useState } from "react";
import { UpdateTileModal } from "../modals/update-modal";
import { DeleteTileModal } from "../modals/delete-modal";
import { SortOption, Tile } from "@/types/types";

import { useFilterStore } from "@/store/useFilterStore";
import { useTileStore } from "@/store/useTileStore";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Spinner } from "../spinner";
import { Figtree } from "next/font/google";
import { Pagination } from "./pagination";
import { TileCard } from "./tile-card";
import { TileFiltersMobile } from "./mobile-tile-filters";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const figtree = Figtree({ subsets: ["latin"], weight: "300" });

export const TileList = () => {
  const [selectedTile, setSelectedTile] = useState<Tile | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const t = useTranslations("names");
  const ft = useTranslations("filters");

  const { filteredTiles, sortBy, setSortBy, recalcFilteredTiles } =
    useFilterStore();
  const { loading } = useTileStore();
  const tp = useTranslations("pagination");

  const OPTIONS = [
    { value: "newest", label: ft("newest") },
    { value: "oldest", label: ft("oldest") },
    { value: "a-z", label: ft("a_z") },
    { value: "z-a", label: ft("z_a") },
  ];

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const tilesPerPage = 20;
  const totalPages = Math.ceil(filteredTiles.length / tilesPerPage);
  const startIndex = (currentPage - 1) * tilesPerPage;
  const currentTiles = filteredTiles.slice(
    startIndex,
    startIndex + tilesPerPage
  );

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
      <div className="w-full flex flex-col gap-5 md:gap-10 p-6">
        <h1
          className={`text-left w-full text-3xl md:text-5xl ${figtree.className}`}
        >
          {t("title")}
        </h1>
        <div className="flex items-center justify-between w-full flex-col md:flex-row gap-4">
          <div className="flex items-center justify-start text-[#888888]">
            <h2>
              {tp("showing", { start, end, total: filteredTiles.length })}
            </h2>
          </div>

          <div className="relative w-full gap-2 flex flex-row-reverse justify-between">
            <Select
              value={sortBy ?? undefined}
              onValueChange={(val) => onSelect(val as SortOption)}
            >
              <SelectTrigger className="w-fit flex justify-between items-center px-3 py-2 text-black! font-normal text-sm bg-white border border-gray-300 rounded-md">
                <span className="mr-2 text-black">Filter:</span>
                <SelectValue placeholder={ft("sortBy")} />
              </SelectTrigger>

              <SelectContent>
                {OPTIONS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <TileFiltersMobile />
          </div>
        </div>
      </div>

      {loading && filteredTiles.length === 0 ? <Spinner /> : null}

      {currentTiles.map((tile, idx) => {
        return (
          <div key={idx}>
            <TileCard key={idx} tile={tile} />
          </div>
        );
      })}
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={setCurrentPage}
          tp={tp}
        />
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
