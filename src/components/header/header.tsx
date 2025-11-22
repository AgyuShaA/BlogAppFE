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

        <SearchDialog className="md:max-w-[50%] lg:max-w-[60%] " />

        <HeaderLanguageSelector locale={locale} />

        <HeaderCartButton
          itemsCount={items.length}
          onClick={() => setIsCartOpen(true)}
        />
      </div>

      <div className="w-full md:hidden flex items-center gap-4  pb-2 px-[5%] md:px-[2%">
        <MobileMenu locale={locale} />

        <SearchDialog className="flex! " />
      </div>

      <HeaderNavigation />
    </header>
  );
}
