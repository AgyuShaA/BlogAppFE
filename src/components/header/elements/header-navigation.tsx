"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { CategoryDropdown } from "./dropdown-menu";
import { useContactModalStore } from "@/store/useContactStore";

export function HeaderNavigation() {
  const t = useTranslations("header");
  const { toggle } = useContactModalStore();

  return (
    <nav className="hidden md:flex h-[54px] px-[2%] justify-between items-center ">
      <CategoryDropdown
        category="ceramic"
        items={[
          { label: "Shine & Glossy", href: "/collections/shine-glossy" },
          { label: "Classic Marbles", href: "/collections/classic-marbles" },
          { label: "Stones & Mixes", href: "/collections/stones-mixes" },
          { label: "Urban Style", href: "/collections/urban-style" },
        ]}
      />

      <CategoryDropdown
        category="wood"
        items={[{ label: "Wood Collection", href: "/collections/wood-tiles" }]}
      />

      {["catalog", "about"].map((item) => (
        <Link
          key={item}
          href={`/${item}`}
          className="text-[16px] w-[130px] flex items-center justify-center"
        >
          {t(`nav.${item}`)}
        </Link>
      ))}

      <button
        onClick={toggle}
        className="border-2 cursor-pointer border-red-600 px-4 h-[38px] text-red-600"
      >
        {t("contactUs")}
      </button>
    </nav>
  );
}
