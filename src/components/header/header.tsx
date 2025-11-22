"use client";

import { CartSidebar } from "../sidebar/sidebar";

import { useCartStore } from "@/store/useCartStore";
import useWindowSize from "@/hooks/UseWindowsSize";
import { useEffect, useState } from "react";
import { HeaderLanguageSelector } from "./elements/header-language-selector";
import { HeaderCartButton } from "./elements/header-cart-button";
import { HeaderNavigation } from "./elements/header-navigation";
import { HeaderLogo } from "./elements/header-logo";
import { SearchDialog } from "./elements/header-search";
import { MobileMenu } from "./elements/mobile-menu";
import { SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTileStore } from "@/store/useTileStore";

export default function Header({ locale }: { locale: string }) {
  const { isMobile } = useWindowSize();
  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const t = useTranslations("header");
  const { fetchCatalog } = useTileStore();

  useEffect(() => {
    const fetch = () => {
      fetchCatalog();
    };

    fetch();
  }, []);
  return (
    <header className="mx-auto sticky top-0 max-w-[1280px] h-[172px] flex flex-col gap-5">
      <div className="flex items-center justify-between h-[74px] px-[5%] md:px-[2%]">
        <HeaderLogo isMobile={isMobile} />

        <SearchDialog />

        <HeaderLanguageSelector locale={locale} />

        <HeaderCartButton
          itemsCount={items.length}
          onClick={() => setIsCartOpen(true)}
        />
      </div>

      <div className="w-full md:hidden flex items-center gap-4  pb-2 px-[5%] md:px-[2%">
        <MobileMenu locale={locale} />

        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            className="w-full h-[40px] px-3 rounded-[4px] bg-[#F3F3F3] outline-none text-gray-700"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon />
          </div>
        </div>
      </div>

      <HeaderNavigation />
    </header>
  );
}
