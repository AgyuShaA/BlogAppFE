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
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation"; // <-- NEW

import { MobileCategorySection } from "./mobile-category";
import { MobileLanguageSelector } from "./mobile-language-selector";

export function MobileMenu({ locale }: { locale: string }) {
  const t = useTranslations("header");
  const pathname = usePathname(); // <-- NEW
  const cleanedPath = pathname.replace(`/${locale}`, "") || "/";

  const isActive = (href: string) => {
    console.log(href, cleanedPath);
    return cleanedPath === href;
  };

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

        {/* HOME */}
        <SheetClose asChild>
          <Link
            href={`/`}
            className={`block text-lg ${
              isActive("/") ? "text-red-500!" : "text-gray-800"
            }`}
          >
            Home
          </Link>
        </SheetClose>

        <div className="mt-6 space-y-6">
          <MobileCategorySection
            locale={locale}
            category="Collections"
            items={[
              { label: "shineGlossy", href: "/collections/shine-glossy" },
              { label: "classicMarbles", href: "/collections/classic-marbles" },
              { label: "stonesMixes", href: "/collections/stones-mixes" },
              { label: "urbanStyle", href: "/collections/urban-style" },
              { label: "woodCollection", href: "/collections/wood-tiles" },
            ]}
          />

          {/* CATALOG */}
          <SheetClose asChild>
            <Link
              href={`/catalog`}
              className={`block text-lg ${
                isActive("/catalog") ? "text-red-500" : "text-gray-800"
              }`}
            >
              {t("nav.catalog")}
            </Link>
          </SheetClose>

          {/* ABOUT */}
          <SheetClose asChild>
            <Link
              href={`/about`}
              className={`block text-lg ${
                isActive("/about") ? "text-red-500" : "text-gray-800"
              }`}
            >
              {t("nav.about")}
            </Link>
          </SheetClose>

          <MobileLanguageSelector locale={locale} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
