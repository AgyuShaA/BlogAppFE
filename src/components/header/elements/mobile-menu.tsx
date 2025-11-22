"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { MobileCategorySection } from "./mobile-category";
import { MobileLanguageSelector } from "./mobile-language-selector";

export function MobileMenu({ locale }: { locale: string }) {
  const t = useTranslations("header");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center w-10 h-10">
          <MenuIcon className="w-6 h-6 text-[#212C34]" />
        </button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85%] p-6">
        <SheetHeader>
          <SheetTitle className="text-xl">{t("navigation")}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <MobileCategorySection
            category="Collections"
            items={[
              { label: "shineGlossy", href: "/collections/shine-glossy" },
              { label: "classicMarbles", href: "/collections/classic-marbles" },
              { label: "stonesMixes", href: "/collections/stones-mixes" },
              { label: "urbanStyle", href: "/collections/urban-style" },
              { label: "woodCollection", href: "/collections/wood-tiles" },
            ]}
          />

          <SheetClose asChild>
            <Link href={`/catalog`} className="block text-lg text-gray-800">
              {t("nav.catalog")}
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href={`/about`} className="block text-lg text-gray-800">
              {t("nav.about")}
            </Link>
          </SheetClose>

          <MobileLanguageSelector locale={locale} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
