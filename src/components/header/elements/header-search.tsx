"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { useTileStore } from "@/store/useTileStore";

import { useRouter } from "@/i18n/navigation";
import { COLLECTIONS } from "@/types/types";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function SearchDialog() {
  const router = useRouter();
  const tiles = useTileStore((s) => s.tiles);
  const t = useTranslations("names");
  const [open, setOpen] = useState(false);

  const handleSelect = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      {/* Button that opens search */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center justify-start w-full max-w-[60%] h-[50px] px-4 rounded-md bg-[#F3F3F3] text-gray-700"
      >
        Search...
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tiles or collections..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {/* Collections */}
          <CommandGroup heading="Collections">
            {COLLECTIONS.map((c) => (
              <CommandItem
                key={c.slug}
                value={c.label}
                onSelect={() => handleSelect(`/collections/${c.slug}`)}
              >
                {c.label}
              </CommandItem>
            ))}
          </CommandGroup>

          {/* Tiles */}
          <CommandGroup heading="Tiles">
            {tiles.map((tile) => (
              <CommandItem
                key={tile.id}
                value={tile.name}
                onSelect={() => handleSelect(`/catalog/${tile.name}`)}
                className="flex justify-between p-2!"
              >
                <span>{t(tile.name)} </span>
                <Image
                  src={tile.imageUrl || ""}
                  width={25}
                  height={25}
                  alt={tile.name}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
