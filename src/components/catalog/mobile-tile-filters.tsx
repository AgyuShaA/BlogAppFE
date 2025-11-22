"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import TileFilters from "./tile-filters";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";

export function TileFiltersMobile() {
  const t = useTranslations("options");
  return (
    <div className="md:hidden w-fit h-9!">
      <Sheet>
        <SheetTrigger asChild>
          <button className="w-full h-9! border-gray-300 flex items-center text-sm text-gray-900 justify-center border px-3 gap-2 py-2 rounded-md ">
            <SlidersHorizontal className="w-5 h-5" /> {t("filters")}
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <VisuallyHidden>{t("filters")}</VisuallyHidden>
            </SheetTitle>
          </SheetHeader>

          <div className="p-4">
            <span className="text-3xl md:text-4xl py-20">
              {" "}
              {t("filtersTitle")}
            </span>
            <TileFilters />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
